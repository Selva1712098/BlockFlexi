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

app.use(
  session({
    secret: process.env.secret,
    resave: true,
    saveUninitialized: false,
  })
);

app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/CustomerRegister", async (req, res) => {
  const { name, address, mobile, email, password, PANNo } = req.body;

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
  };

  try {
    const check = await customerMasterCollection.findOne({ EmailID: email });

    if (check) {
      res.json({ status: "exists" });
    } else {
      const check1 = await customerMasterCollection.insertMany([datas]);
      return res.json({ message: "Customer Added", status: "ok" });
    }
  } catch (e) {
    res.json("Something went wrong try again");
  }
});

app.post("/JewellerRegister", async (req, res) => {
  const { name, email, password} = req.body;

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const datas = {
    JewellerName: name,
   
    EmailID: email,
    Password: hash,
   
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
app.post('/JewellerLogin',async(req,res)=>{
    const {email,password}=req.body


    try{
        const check= await jewellerMasterCollection.findOne({EmailID:email})
        
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
app.post('/GetScheme',async(req,res)=>{
  const{schemeid}=req.body
 
  
  try{
    const schemecheck=await jewellerySchemeCollection.findOne({SchemeID:schemeid},{RowDate:0,Status:0,JewellerID:0,__v:0})
   
    if(schemecheck){
      
      res.json({schemecheck })
    }
    
  }
  catch(e){
    console.log(e)
  }

})
app.post('/GetSchemeID',async(req,res)=>{
  const { jewellerid, customerid } = req.body;
  
  
  try {
    const schemecheck = await customerSchemeCollection.find({
      JewellerID: jewellerid,
     
      CustomerID: customerid
    },{SchemeID:1});
    

      res.json({ schemecheck});
    
  } catch (e) {
    console.log('Something Went Wrong. Try Again', e);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})
app.post('/JoinScheme', async (req, res) => {
  const { jewellerid, schemeid, customerid } = req.body;
  const schemes = {
    JewellerID: jewellerid,
    SchemeID: schemeid,
    CustomerID: customerid,
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
app.post('/CustomerSchemesLoanReq',async(req,res)=>{
  const{jewellerid}=req.body;
  try{
    const response1= await customerSchemeCollection.find({JewellerID:jewellerid,LoanReq:true,LoanStatus_Jw:null},{CustomerID:1,SchemeID:1,LoanReq:1})
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
app.post('/CustomerSchemesJwStatus',async(req,res)=>{
  const {bankid}=req.body
  try{
    if(bankid){
    const response3= await customerSchemeCollection.find({LoanReq:true,LoanStatus_Jw:"Approved",LoanStatus_Bank:null},{CustomerID:1,JewellerID:1,SchemeID:1,LoanStatus_Jw:1})
    if(response3){
      res.json({
        response3
      })
    }
  else{
    res.json({status:'not found'})
  }}
    else{
      throw new Error('Required Fields missing')
    }
  }
  catch(e){
    console.log(e)
  }
})
app.post('/GetUsers',async(req,res)=>{
  const{customerid}=req.body
  try{
    const usercheck=await customerMasterCollection.findOne({CustomerID: customerid})
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
  const{customerid,jewellerid,bankid,schemeid,loanreq,loanstatus_jw,loanstatus_bank,goldclaimstatus,goldsettledstatus}=req.body

  if(loanreq){
      const response=await customerSchemeCollection.findOneAndUpdate({CustomerID:customerid,SchemeID:schemeid,LoanReq:false},{$set:{LoanReq:true,LoanRegDate:new Date(Date.now())}})
      console.log(response)
      if(response){
        res.json({Status:'done'})
      }
      else{
        res.json({Status:'error',Message:response})
      }
  }
 

   else if(jewellerid && customerid && schemeid && loanstatus_jw ){
      try{
        if(loanstatus_jw==='yes'){
        const response2 =await customerSchemeCollection.findOneAndUpdate({JewellerID:jewellerid ,CustomerID:customerid,SchemeID:schemeid,LoanReq:true},{$set:{LoanStatus_Jw:"Approved",LoanStatus_Jw_Date:new Date(Date.now())}})
        if(response2){
          res.json({response2,status:"approved"})
        }
      }
      else if(loanstatus_jw==='no'){
        const response2 =await customerSchemeCollection.findOneAndUpdate({JewellerID:jewellerid ,CustomerID:customerid,SchemeID:schemeid,LoanReq:true},{$set:{LoanStatus_Jw:"Rejected",LoanReq:false,LoanStatus_Jw_Date:new Date(Date.now())}})
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



    

})
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
app.post('/JewellerScheme',async(req,res)=>{
  const{jewellerid}=req.body

  try{
    const schemes = await jewellerySchemeCollection.find({JewellerID:jewellerid})
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
