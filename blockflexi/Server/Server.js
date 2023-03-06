import express, { request } from 'express'

import cors from 'cors'
import session from 'express-session'
import passport from 'passport'
import jwt from 'jsonwebtoken';
import {customerMasterCollection,jewellerMasterCollection,bankMasterCollection} from './mongo.js'
// import bankMasterCollection from './mongo.js'
// import {jewellerMasterCollection} from './mongo.js'
import dotenv from 'dotenv'
dotenv.config()

import bcrypt from 'bcryptjs'

const app=express()

app.use(express.json())
app.use(session({
    secret:process.env.secret,
    resave:true,
    saveUninitialized:false
    
}))

app.use(cors({ origin: "http://localhost:3000", credentials: true }))


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

app.get('/',(req,res)=>{
    res.json({message:'success'})
})

app.post('/CustomerRegister',async(req,res)=>{
    const{name,address,mobile,email,password,PANNo}=req.body
   
    const salt=bcrypt.genSaltSync(10)
    const hash=bcrypt.hashSync(password,salt)

    const datas={
        CustomerName:name,
        Address:address,
        MobileNo:mobile,
        EmailID:email,
        Password:hash,
        PANno:PANNo,
        RowDate:new Date(Date.now()),
        Status:true
    }

    try{
        const check= await customerMasterCollection.findOne({EmailID:email})

        if(check){
            res.json({status:'exists'})
        }
        else{
            const check1= await customerMasterCollection.insertMany([datas])
            return res.json({message:"Customer Added",status:"ok"})
        }
    }
    catch(e){
        res.json('Something went wrong try again')
    }
})

app.post('/CustomerLogin',async(req,res)=>{
    const {email,password}=req.body


    try{
        const check= await customerMasterCollection.findOne({EmailID:email})
        
        if(check){
            const isPasswordValid= bcrypt.compareSync(password,check.Password)

            if(isPasswordValid){
                
                res.setHeader('Set-Cookie',`sessionId=${check.CustomerID}`)
                res.cookie('sessionId',check.CustomerID,{
                    httponly:true,
                    maxAge:24*60*60*1000
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
                    res.json({status:'ok'})
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
                res.setHeader('Set-Cookie',`sessionId=${check.BankID}`)
                res.cookie('sessionId',check.BankID,{
                    httponly:true,
                    maxAge:30000
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

app.post('/logout',async (req,res)=>{
    req.session.destroy(err=>{
        
        if(err){
            console.log(err)
            return res.status(500).send('Internal server error')
        }
       
        
       
        
    });
    res.clearCookie('sessionId').json({status:'cleared'})
    
})

app.listen(9000,()=>{
    console.log("Server Started!")
})



