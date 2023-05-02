import React,{useEffect,useState} from "react";
import { useLocation ,useParams,useNavigate} from "react-router-dom";
// import jwt_Decode from 'jwt-decode'
import Web3 from'web3';
// import axios from 'axios'
import axios from '../integration'

import Swal from 'sweetalert2'

import abi from "../contracts/FlexiScheme.json"
import './BankPay.css';
function BankPayment(){
    const contractaddress="0xfEdB6cbf8a55D553eECc93dE4e7839C81266379e"
    const location=useLocation();
    const navigate=useNavigate();
    const{CustomerID,JewellerID,SchemeID}=useParams()
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
            if (networkId !== 51) {
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
    }catch(e){
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
           
    <div className="payment-container">
    <div className="payment-card">
      <div className="customer-details">
        <div className="detail">
          <span className="label">Name:</span>
          <span className="value">{customername}</span>
        </div>
        <div className="detail">
          <span className="label">Scheme Name:</span>
          <span className="value">{schemename}</span>
        </div>
        <div className="detail">
          <span className="label">Jeweler Name:</span>
          <span className="value">{jewellername}</span>
        </div>
        <div className="detail">
          <span className="label">Amount to be Paid:</span>
          <span className="value">{balance}</span>
        </div>
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