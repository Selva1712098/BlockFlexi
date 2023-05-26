import express, { request } from "express";

 

import cors from "cors";
import session from "express-session";
import jwt from "jsonwebtoken";
import {
  customerMasterCollection,
  jewellerMasterCollection,
  bankMasterCollection,
  jewellerySchemeCollection,
  customerSchemeCollection
} from "./mongo.js";

 

import dotenv from "dotenv";

 

import bcrypt from "bcryptjs";
dotenv.config();

 

const app = express();

 


app.use(cors({ origin: "http://localhost:3000", credentials: true }));

 

app.use(function(req, res, next) {
res.header("Access-Control-Allow-Origin", ["http://localhost:3000"]);
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
next();
});

 


app.use(
  session({
    secret: process.env.secret,
    resave: true,
    saveUninitialized: false,
  })
);

 

app.use(express.json());

app.post("/CustomerRegister", async (req, res) => {
  const { name, address, mobile, email, password, PANNo,wallet } = req.body;

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const datas = {
    CustomerName: name,
    Address: address,
    MobileNo: mobile,
    EmailID: email,
    Password: hash,
    PANno: PANNo,
    RowDate: new Date(Date.now()),
    Status: true,
    WalletAddress:wallet
  };

  try {
    const check = await customerMasterCollection.findOne({ EmailID: email });

    if (check) {
      res.json({ status: "exists" });
    } else {
      const check1 = await customerMasterCollection.insertMany([datas]);
      console.log(check1)
      return res.json({ message: "Customer Added", status: "ok" });
    }
  } catch (e) {
    res.json("Something went wrong try again");
  }
});

app.post("/JewellerRegister", async (req, res) => {
  const { name, email, password,walletaddress} = req.body;

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const datas = {
    JewellerName: name,
   
    EmailID: email,
    Password: hash,
   JewellerWallet:walletaddress,
    RowDate: new Date(Date.now()),
    Status: true,
  };

  try {
    const check = await jewellerMasterCollection.findOne({ EmailID: email });

    if (check) {
      res.json({ status: "exists" });
    } else {
      const check1 = await jewellerMasterCollection.insertMany([datas]);
      return res.json({ message: "Jeweller Added", status: "ok" });
    }
  } catch (e) {
    console.log(e)
    res.json("Something went wrong try again");
  }
});

app.post('/CustomerLogin',async(req,res)=>{
  const {email,password}=req.body


  try{
      const check= await customerMasterCollection.findOne({EmailID:email})
      
      if(check){
          const isPasswordValid= bcrypt.compareSync(password,check.Password)
          
          if(isPasswordValid){
              const token=jwt.sign({
                  name:check.CustomerName,
                  id:check.CustomerID
              },process.env.secret)
              res.setHeader('Set-Cookie',`customer_sessionId=${token}`)
              res.cookie('customer_sessionId',token,{
                  httponly:true,
                  maxAge:24*60*60*365
              }).json({status:'ok',wallet:check.
              WalletAddress
              })
               
          }
          else{
              res.json({status:'error'})
          }
      }
      else{
          res.json({status:'not found'})
      }


  }
  catch(e){
      console.log("Something went Wrong.try again later")
  }
  
})
app.post('/JewellerLogin',async(req,res)=>{
    const {email,password}=req.body


    try{
        const check= await jewellerMasterCollection.findOne({EmailID:email})
        console.log(check)
        if(check){
            const isPasswordValid= bcrypt.compareSync(password,check.Password)

            if(isPasswordValid){
                const token=jwt.sign({
                    name:check.JewellerName,
                    id:check.JewellerID
                },process.env.secret)
                res.setHeader('Set-Cookie',`jeweller_sessionId=${token}`)
                res.cookie('jeweller_sessionId',token,{
                    httponly:true,
                    maxAge:24*60*60*365
                }).json({status:'ok'})
                 
            }
            else{
                res.json({status:'error'})
            }
        }
        else{
            res.json({status:'not found'})
        }


    }
    catch(e){
        console.log("Something went Wrong.try again later")
    }
    
})

app.post('/BankLogin',async(req,res)=>{
    const {email,password}=req.body

    try{
           const check= await bankMasterCollection.findOne({EmailID:email})
      
           if(check){
               const isPasswordValid= bcrypt.compareSync(password,check.Password)
   
               if(isPasswordValid){
                const token= jwt.sign({
                    name:check.BankName,
                    id:check.BankID,
                },process.env.secret)
                res.setHeader('Set-Cookie',`bank_sessionId=${token}`)
                req.session.authorized=true;
                res.cookie('bank_sessionId',token,{
                    httponly:true,
                    maxAge:24*60*60*365*1000
                }).json({status:'ok',authorized:true})
               }
               else{
                   res.json({status:'error'})
               }
           }
           else{
               res.json({status:'not found'})
           }
          }catch(e){
            console.log("Something Went wrong.Try again")
          }
        })

  
app.post("/scheme", async (req, res) => {
  const { JewellerID, SchemeID, SchemeName, SchemeDetails, MonthlyPayment } =
    req.body;
  const scheme = {
    JewellerID: JewellerID,
    SchemeID,
    SchemeName: SchemeName,
    SchemeDetails: SchemeDetails,
    MonthlyPayment: MonthlyPayment,
    RowDate: new Date(Date.now()),
    Status: true,
  };
  try {
    if(!JewellerID) {
      throw new Error("Missing Required field")
    }
    const check1 = await jewellerySchemeCollection.findOne({
      SchemeName: SchemeName,
    });
    if (check1) {
      res.json({ status: "exists" });
    } else {
      const check = await jewellerySchemeCollection.insertMany([scheme]);
      console.log(check);
      res.json({ status: "ok" });
    }
  } catch (err) {
    res.json({ message: err.message, status: 400 });
  }
})


app.get("/viewjewellers", async (req, res) => {
  try {
    const jeweller = await jewellerMasterCollection.find({});
    res.json({jeweller});
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});
app.get('/GetScheme',async(req,res)=>{
  
 
  
  try{
    const schemecheck=await jewellerySchemeCollection.find({},{RowDate:0,Status:0,JewellerID:0,__v:0})
   
    if(schemecheck){
      
      res.json({schemecheck })
    }
    
  }
  catch(e){
    console.log(e)
  }

})
app.get('/GetSchemeID',async(req,res)=>{
 
  
  
  try {
    const schemecheck = await customerSchemeCollection.find({
      Status:"Completed"
    },{SchemeID:1,JewellerID:1,CustomerID:1,});
    

      res.json({ schemecheck});
    
  } catch (e) {
    console.log('Something Went Wrong. Try Again', e);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})
app.post('/JoinScheme', async (req, res) => {
  const { jewellerid, schemeid, customerid,schemename } = req.body;
  const schemes = {
    JewellerID: jewellerid,
    SchemeID: schemeid,
    CustomerID: customerid,
    SchemeName:schemename,
    DOJ: new Date(Date.now())
  };
  console.log(schemes);
  try {
    const schemecheck = await customerSchemeCollection.findOne({
      JewellerID: jewellerid,
      SchemeID: schemeid,
      CustomerID: customerid,
      
    });
    console.log(schemecheck);
    if (schemecheck !== null) {
      res.json({ status: 'exists' ,schemecheck});
    } else {
      const addscheme = await customerSchemeCollection.insertMany([schemes]);
      console.log(addscheme);
      res.json({ status: 'success',addscheme });
    }
  } catch (e) {
    console.log('Something Went Wrong. Try Again', e);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/CustomerSchemesBankStatus',async(req,res)=>{
  

  try{
    
    const response= await customerSchemeCollection.find({LoanReq:true,LoanStatus_Bank:"Approved",GoldSettledStatus:false},{CustomerID:1,JewellerID:1,SchemeID:1,LoanStatus_Bank:1,SchemeName:1})
    if(response){
      console.log(response)
      res.json({
        response
      })
    }
  else{
    res.json({status:'not found'})}
  
  }catch(e){

  }
})
app.get('/AllSchemes', async(req,res)=>{
  try{
    const schemescheck = await jewellerySchemeCollection.find()
    if(schemescheck){
      res.json({schemescheck})
    }
  }
  catch(e){
    console.log(e)
  }
})
app.put('/StatusChange',async (req,res)=>{
  const{customerid,schemeid,jewellerid}=req.body
  try{
    const change=await customerSchemeCollection.findOneAndUpdate({CustomerID:customerid,SchemeID:schemeid,JewellerID:jewellerid,Status:'Pending'},{$set:{
      Status:"Completed"
    }})

    if(change){
      res.json({status:200})
    }
  }catch(err){
    console.log(err)
  }
})

app.get('/CustomerHome/:JewellerID',async (req, res) => {
  console.log(req.params.JewellerID)
  try{
  const schemes = await jewellerySchemeCollection.find({JewellerID:req.params.JewellerID});
  console.log(schemes)
  res.json(schemes);
  }catch(err){
    console.error(err);
    res.status(500).send("Internal Error");
  }
});
app.get('/CustomerSchemesLoanReq',async(req,res)=>{
  
  try{
    const response1= await customerSchemeCollection.find({LoanReq:true,LoanStatus_Jw:null,LoanStatus_Bank:null,GoldSettledStatus:false})
    console.log(response1)
   
    if(response1){
      
      res.json({response1})
    }
    else{
      res.json({message:'no new requests'})
    }
    }catch(e){
      console.log(e)
    }
})
app.get('/CustomerSchemesJwStatus',async(req,res)=>{
 
  try{
    
    const response3= await customerSchemeCollection.find({LoanReq:true,LoanStatus_Jw:"Approved",LoanStatus_Bank:null},{CustomerID:1,JewellerID:1,SchemeID:1,LoanStatus_Jw:1,SchemeName:1,JewellerName:1})
    if(response3){
      res.json({
        response3
      })
    }
  else{
    res.json({status:'not found'})
  }
    
  }
  catch(e){
    console.log(e)
  }
})
app.get('/GetUsers',async(req,res)=>{
  
  try{
    const usercheck=await customerMasterCollection.find({})
    if(usercheck){
      res.json({usercheck})
    }
    else{
      res.json({
      status:'not found'
      })
    }
  }catch(e){
    console.log(e)
  }
})
app.put('/CustomerSchemeEdit',async(req,res)=>{
  const{customerid,jewellerid,bankid,jewellername,schemeid,loanreq,loanstatus_jw,loanstatus_bank,goldclaimstatus,goldsettle_status}=req.body

  if(loanreq){
      const response=await customerSchemeCollection.findOneAndUpdate({LoanReq:false,CustomerID:customerid,JewellerID:jewellerid,SchemeID:schemeid},{$set:{LoanReq:true,LoanRegDate:new Date(Date.now())}})
      console.log(response)
      if(response){
        res.json({Status:'done'})
      }
      else{
        res.json({Status:'error',Message:response})
      }
  }
 

   else if(jewellerid && customerid && schemeid && loanstatus_jw && jewellername ){
      try{
        if(loanstatus_jw==='yes'){
        const response2 =await customerSchemeCollection.findOneAndUpdate({JewellerID:jewellerid ,CustomerID:customerid,SchemeID:schemeid,LoanReq:true},{$set:{LoanStatus_Jw:"Approved",LoanStatus_Jw_Date:new Date(Date.now()),JewellerName:jewellername}})
        if(response2){
          res.json({response2,status:"approved"})
        }
      }
      else if(loanstatus_jw==='no'){
        const response2 =await customerSchemeCollection.findOneAndUpdate({JewellerID:jewellerid ,CustomerID:customerid,SchemeID:schemeid,LoanReq:true},{$set:{LoanStatus_Jw:"Rejected",LoanReq:false,LoanStatus_Jw_Date:new Date(Date.now()),JewellerName:jewellername}})
        if(response2){
          res.json({response2,status:"rejected"})
        }
      }
        else{
          throw new Error('Required Fields missing')
        }
      }catch(e){
        console.log(e)
      }
    }
  

 
   else if(loanstatus_bank && bankid && jewellerid && schemeid && customerid){
      try{
       
        if(loanstatus_bank==='yes'){
          const response4=await customerSchemeCollection.findOneAndUpdate({JewellerID:jewellerid, SchemeID: schemeid,CustomerID:customerid,LoanStatus_Jw:"Approved"},{$set:{LoanStatus_Bank:"Approved",BankID:bankid,LoanStatus_Bank_Date:new Date(Date.now())}})
         
        if(response4){
          res.json({response4,status:"approved"})

        }
        else{
          
          res.json({status:'not found'})
        }

        }
        else if(loanstatus_bank==='no'){
          const response4=await customerSchemeCollection.findOneAndUpdate({JewellerID:jewellerid, SchemeID: schemeid,CustomerID:customerid,LoanStatus_Jw:"Approved"},{$set:{LoanStatus_Bank:"Rejected",BankID:bankid,LoanStatus_Bank_Date:new Date(Date.now())}})
          if(response4){
            res.json({response4,status:"rejected"})
          }
          else{
          res.json({status:'not found'})
        }
        }
        
      }catch(e){
        console.log(e)
      }
    }
    else if(goldsettle_status && jewellerid && schemeid && customerid){
      try{
        if(goldsettle_status==='yes'){
          
          const response4=await customerSchemeCollection.findOneAndUpdate({JewellerID:jewellerid, SchemeID: schemeid,CustomerID:customerid,LoanStatus_Bank:"Approved"},{$set:{GoldSettledStatus:true,GoldSettledDate:new Date(Date.now())}})
          console.log(response4)
          if(response4){
          res.json({response4,status:"approved"})
        }
        else{
          res.json({status:'not found'})
        }}}catch(e){
          console.log(e)
        }
}})
app.delete('/DeleteScheme',async(req,res)=>{
  const {jewellerid,schemeid}=req.body;
   console.log(jewellerid,schemeid)

  try{
   
    const response =await jewellerySchemeCollection.findOneAndDelete({JewellerID:jewellerid,SchemeID:schemeid})
    if(response){
      res.json({status:'Deleted'})
    }
    else{
      res.json({status:'error',response})
    }
  }catch(e){
    console.log(e)
  }

})
app.get('/JewellerScheme',async(req,res)=>{
  
  try{
    const schemes = await jewellerySchemeCollection.find({})
  if(schemes){
    res.json({schemes,status:'success'})

  }
else{
  res.json({status:'error'})
}}catch(e){
      console.log(e)
    }
})
app.listen(5000, () => {
  console.log("Server Started!");
})