import React,{useEffect,useState} from "react";
import { useLocation ,useParams,useNavigate} from "react-router-dom";
// import jwt_Decode from 'jwt-decode'
import Web3 from'web3';
import {useCookies }from 'react-cookie'
import jwt_decode from 'jwt-decode'

import { Typography } from "@mui/material";
// import axios from 'axios'
import axios from '../integration'

import Swal from 'sweetalert2'

import abi from "../contracts/FlexiScheme.json"
import './BankPay.css';
import Header from "../components/Header";
import BankHeader from "../components/BankHeader";
function BankPayment(){
    const contractaddress="0x8B9Ce2D6A5b472F1B8A96d859bDCE88b254435F8"
    const location=useLocation();
    const navigate=useNavigate();
    const{CustomerID,JewellerID,SchemeID}=useParams()
    const[cookies,setCookie,removeCookie]=useCookies(['bank_sessionId'])
  const token=jwt_decode(cookies.bank_sessionId)
    const customername=location.state.customername
    const jewellername=location.state.jewellername
    const schemename=location.state.schemename
    // const balance=location.state.balance
    const[balance,setBalance]=useState('')
    const bankid=location.state.bankid
    const[loading,setLoading]=useState(false)
    
    async function connect() {
        if (window.ethereum) {
          const web3 = new Web3(window.ethereum);
          try {
            await window.ethereum.enable();
            const accounts = await web3.eth.getAccounts();
            const networkId = await web3.eth.net.getId();
            if (networkId !== 888) {
              alert("Please connect to XDC Wallet")
              throw new Error("Please connect to XDC network.");
             
            }
            return { web3, accounts };
          } catch (error) {
            alert("Please Create an account in the XDC Xinfin network")
            throw new Error("Please connect to Metamask to connect to XDC network.");
          }
    
        } else {
          alert("Please install XDC pay Extension")
          throw new Error("Please install Metamask to connect to XDC network.");
        }
      }
     useEffect(()=>{
     
      connect()
     },[]) 
     const getdetails=async()=>{
      const{web3,accounts} = await connect()

      const bfcontract = new web3.eth.Contract(abi, contractaddress);
  console.log(bfcontract);
  const getBalance= await bfcontract.methods.getBalance(customername,jewellername,schemename).call()
  setBalance(getBalance)
     }
     useEffect(()=>{
      getdetails()
     })
     
     const payJeweller=async()=>{
        const{web3,accounts} = await connect()

        const bfcontract = new web3.eth.Contract(abi, contractaddress);
    console.log(bfcontract);
    try{
        const _customername=customername
        const _jewellername=jewellername
        const _schemename=schemename
        const _bankaddress=accounts[0]
        const value1=balance.toString()
        const value=web3.utils.toWei(value1,'wei')
        setLoading(true)
        const payment=await bfcontract.methods.payBalance(_customername,_jewellername,_schemename,_bankaddress).send({from:accounts[0],gas:1000000,value})
        console.log(payment)

        if(payment.status ===true ){
           setLoading(false)
            apprequest()
        }
        else{
          setLoading(false)
          Swal.fire({
            icon: 'error',
            title: 'Payment Failed',
            text: 'Please try again later.',
          }).then((result)=>{
            if(result.isConfirmed){
              window.location.reload();
            }
          })  
        }
    }catch(e){
      setLoading(false)
      if(e.code==-32603)
      Swal.fire({
        icon: 'error',
        title: 'Payment Rejected',
       
      }).then((result)=>{
        if(result.isConfirmed){
          window.location.reload();
        }
      })
        console.log(e)
    }
     }

     async function apprequest(){
        await axios.put("/CustomerSchemeEdit",{
  customerid:CustomerID,
  jewellerid:JewellerID,
  schemeid:SchemeID,
  loanstatus_bank:"yes",
  bankid
  }).then(res=>{
  if(res.data.status==='approved'){
    Swal.fire({
        icon: 'success',
        title: 'Payment Successful!',
        text: `You have Paid ${customername}'s Balance Successfully to ${jewellername} .`,
        confirmButtonColor:"#9A1B56"
      }).then((result)=>{
        if(result.isConfirmed){
          navigate('/BankHome')
        }
      })
   
  }
  else{
    alert(`No change has been made to ${customername}`)
    window.location.reload()
  
  }
  })

    return (
      <div className={`overlay-1 ${loading ? 'active' : ''}`}>
        <div className="processing-container-1">
          <div className="processing-icon-1"></div>
          <div className="processing-text-1">Processing Payment...</div>
        </div>
      </div>
    );
  
     }
    return(
        <div>
         < BankHeader />  
    <div className="payment-container">
    <div className="payment-card">
      <div className="customer-details">
      <table>
                <tbody>
                <tr>
                  <td >
                  <Typography variant="h6"  gutterBottom><b>Name</b></Typography></td>
                 
                  <td style={{padding:'0 20px',textTransform:'capitalize'}}><Typography variant="h6"  gutterBottom>{customername}</Typography></td>
                </tr>
                <tr>
                  <td>
                  <Typography variant="h6"  gutterBottom><b>Jeweller Name</b></Typography></td>
                
                  <td style={{padding:'0 20px',textTransform:'capitalize'}}><Typography variant="h6"  gutterBottom>{jewellername}</Typography></td>
                </tr>
                <tr>
                  <td>
                  <Typography variant="h6"  gutterBottom><b>Scheme Name</b></Typography></td>
                  
                  <td style={{padding:'0 20px',textTransform:'capitalize'}}><Typography variant="h6"  gutterBottom>{schemename}</Typography></td>
                </tr>
                <tr>
                  <td>
                  <Typography variant="h6" style={{marginTop:'1px'}} gutterBottom ><b>Amount to be paid</b></Typography></td>
                  
                  <td style={{padding:'0 20px'}}><Typography variant="h6"  gutterBottom>{balance}</Typography></td>
                </tr>
                
               

              
                </tbody>
              </table>
      </div>
      <button className="pay-button" onClick={payJeweller}>Pay</button>
     { loading && <div className={`overlay-1 ${loading ? 'active' : ''}`}>
        <div className="processing-container-1">
          <div className="processing-icon-1"></div>
          <div className="processing-text-1">Processing Payment...</div>
        </div>
      </div>}
        </div>
        </div>
        </div>
    )
}
export default BankPayment;