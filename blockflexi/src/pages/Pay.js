import React,{useState,useEffect} from "react";
import Header from "../components/Header";
import axios from "axios";
import './pay.css';
import { useParams,useLocation } from "react-router-dom";
import abi from '../contracts/FlexiScheme.json'
import Web3 from 'web3'
//import { Button } from "@mui/material";

//  import dotenv from 'dotenv'

// import {getWeb3Modal, createWeb3Provider,  createContractInstance, log } from 'react-solidity-xdc3'
 //dotenv.config()

function Pay(){
  const{CustomerID,JewellerID,SchemeID}=useParams()

 const location=useLocation()
 const customername=location.state.data.customername
 const jewellername=location.state.data.jewellername
 console.log(customername,jewellername)
  const[schemeId,setSchemeId]=useState([])
  const[schemes,setSchemes]=useState([])
  //const[currentAccount,setCurrentAccount]=useState(null)
  const contractaddress="0x13207eaFb0Db808e55d8C3FD9Fe3F7168AF9A929";
  
  console.log(abi,contractaddress)
  
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

 async function Pay(scheme){
  try{
    const { web3, accounts } = await connect();
    const bfcontract = new web3.eth.Contract(abi, contractaddress);
console.log(bfcontract);
      const value1=scheme.MonthlyPayment.toString()
      const value=web3.utils.toWei(value1,'wei')
      
      const _customerName=customername
      const _jewellerName=jewellername
      const _schemeName=scheme.SchemeName
      
        const pay= await bfcontract.methods.makeMonthlyPayment(_customerName,_jewellerName,_schemeName).send({from:accounts[0],gas:1000000,value})
      console.log( pay)

      if(pay.status){
        alert("Your payment has been recorded Successfully")
      }
      else{
        alert("Payment Unsuccessful")
      }
      
  }catch(err){
    console.log(err)
  }
 }
  
  const handleSchemes = (data) => {
    console.log('id',data)
    if (data && data.length > 0) {
      setSchemeId([...data]);
    } else {
      setSchemeId([]);
    }
  };
  
  const handleSchemeName=(data)=>{
  console.log('datas:',data)
  if (data && data.length > 0) {
    setSchemes([...data]);
  } else {
    setSchemes([]);
  }
  
  }
     
  

  async function getSchemeID() {
    try {
      await axios.get("http://localhost:5000/GetSchemeID").then((res) => {
        if (res.data) {
          const sc1 = res.data.schemecheck.filter(
            (sc) => sc.JewellerID === JewellerID && sc.CustomerID === CustomerID && sc.SchemeID === SchemeID
          );
          console.log("get scheme id", sc1);
          handleSchemes(sc1);
        } else {
          console.log("Could not get your Scheme");
        }
      });
    } catch (e) {
      console.log(e);
    }
  }
  async function getScheme() {
    try {
     
      axios.get("http://localhost:5000/GetScheme").then((res) => {
        console.log(res.data.schemecheck);
        const response = res.data.schemecheck;
        const schemes = response.filter((res) => {
          return schemeId.some((res2) => res2.SchemeID === res.SchemeID);
        });
        console.log("necessary", schemes);
        handleSchemeName(schemes);
       
      });
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getSchemeID();
  }, []);
  useEffect(() => {
    getScheme();
  }, [schemeId]);
    return(
     
        <div>
             <Header/>
            <div style={{display:'flex',justifyContent:'flex-end',marginTop:'13px',marginRight:'10px'}}>
            {/* <Button variant='contained' size='sm' style={{backgroundColor:'#9A1B56'}} onClick={connect} >Connect </Button> */}
              </div>
             
            <div className="row">
            {schemes && schemes.map((scheme)=>(
  <div className="column">
    <div className="card">
     <h2>{scheme.SchemeName}</h2>
    <p>{scheme.MonthlyPayment}</p>
    
    <button onClick={()=>Pay(scheme)}>Pay</button>
    </div>
  </div>
             ))} 
  </div>
  </div>
    )
}
export default Pay;