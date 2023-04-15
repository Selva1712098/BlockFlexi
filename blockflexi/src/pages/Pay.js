import React,{useState,useEffect} from "react";
import Header from "../components/Header";
import axios from "axios";
import './pay.css';
import { useParams } from "react-router-dom";
import contract from '../contracts/FlexiScheme.json'
//import { Button } from "@mui/material";

//  import dotenv from 'dotenv'

// import {getWeb3Modal, createWeb3Provider,  createContractInstance, log } from 'react-solidity-xdc3'
 //dotenv.config()

function Pay(){
  const{CustomerID,JewellerID,SchemeID}=useParams()
  console.log(CustomerID,JewellerID,SchemeID)
  const[schemeId,setSchemeId]=useState([])
  const[schemes,setSchemes]=useState([])
  //const[currentAccount,setCurrentAccount]=useState(null)
  const contractaddress="0x90A1499CC18aB124813BDa3F96daC66741f39F6b";
  const abi=contract.abi
  console.log(abi,contractaddress)
  // const connectOptions = {
  //   rpcObj: {
  //     50: "https://erpc.xinfin.network",
  //     51: "https://erpc.apothem.network"
  //   },
  //   network: "mainnet",
  //   toDisableInjectedProvider: true
  // }

  
  // const connect=async()=>{
  //   const {ethereum}=window

  //   if(!ethereum){
  //     alert("Please install metamask")
  //   }
  //   try{
  //     const accounts=await ethereum.request({method:'eth_requestAccounts'})
  //     console.log(accounts[0])
  //     setCurrentAccount(accounts[0])

  //   }catch(err){
  //     console.log(err)
  //   }
  // }
  
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
// useEffect(()=>{
//  connect() 
// },[])
// useEffect(()=>{
//   const checkWallet=()=>{
//     const {ethereum}= window

//     if(!ethereum){
//       alert("Please connect your wallet")
//     }
//     else{
//       alert("Wallet exists")
//     }
//   }
//   checkWallet()
// },[])
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
    <input placeholder='Enter amount'/>
    <button>Pay</button>
    </div>
  </div>
             ))} 
  </div>
  </div>
    )
}
export default Pay;