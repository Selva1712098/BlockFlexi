import React,{useState,useEffect} from "react";
import Header from "../components/Header";
import axios from "axios";
import './pay.css';
import { useParams } from "react-router-dom";
import Web3 from 'web3'
import { Button } from "@mui/material";
import contract from '../contracts/Flexi.json'
// import dotenv from 'dotenv'

// import {getWeb3Modal, createWeb3Provider,  createContractInstance, log } from 'react-solidity-xdc3'
// dotenv.config()

function Pay(){
  const{CustomerID,JewellerID,SchemeID}=useParams()
  console.log(CustomerID,JewellerID,SchemeID)
  const[schemeId,setSchemeId]=useState([])
  const[schemes,setSchemes]=useState([])

  // const connectOptions = {
  //   rpcObj: {
  //     50: "https://erpc.xinfin.network",
  //     51: "https://erpc.apothem.network"
  //   },
  //   network: "mainnet",
  //   toDisableInjectedProvider: true
  // }

  
  
  // const [ethereumContext, setethereumContext] = useState({});
  // const web3Modal = getWeb3Modal(connectOptions);

  // const connect = async (event) => {
  //   event.preventDefault();
  //   const instance = await web3Modal.connect();
  //   const { provider, signer } = await createWeb3Provider(instance);
  //   const Contract= await createContractInstance(process.env.contractaddress, contract.abi, provider);
    
  //   const account = signer.getAddress();
  //   setethereumContext({ provider,  account,Contract})
  //   console.log(" Contract:", Contract)
  //   log("Connect", "Get Address", await signer.getAddress());
   
  // }
  const connect=async()=>{
    const web3 = new Web3('https://rpc.apothem.network');

    web3.eth.net.getId().then(console.log);

    web3.eth.getBalance('0xa8eab7a263b2da64143d27e2770539609960a386').then(console.log);

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
// useEffect(()=>{
//  connect() 
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
            <Button variant='contained' size='sm' style={{backgroundColor:'#9A1B56'}} onClick={connect} >Connect </Button>
              </div>
             
            <div className="row">
            {schemes && schemes.map((scheme)=>(
  <div className="column">
    <div className="card">
      <input value={scheme.SchemeName}/>
    <p>{scheme.MonthlyPayment}</p>
    <button>Pay</button>
    </div>
  </div>
             ))} 
  </div>
  </div>
    )
}
export default Pay;