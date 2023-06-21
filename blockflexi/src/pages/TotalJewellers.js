import React, { useState,useEffect } from "react";
import axios from '../integration.js';

import './AllJewellers.css';
import Header from "../components/Header.js";
import { Link,useLocation } from "react-router-dom";
function TotalJewellers(){
    const[scheme, setscheme]= useState([]);
    const location=useLocation()
    const customerWallet=location.state.walletAddress
    console.log(customerWallet)
    const jeweller=(data)=>{
      console.log(data)
        setscheme(data)
    }
    useEffect(() => {
      async function getAllSchemes() {
        try {
          const response = await axios.get("/viewjewellers");
          
          jeweller(response.data.jeweller);
        } catch (error) {
          console.error(error);
        }
      }
      getAllSchemes();
    }, []);

    return(

        <div>
           <h1 style={{textAlign:"center",fontFamily:'Libre Baskerville,serif'}}>All jewellers</h1>
         
         <div className="row3">
         {Array.isArray(scheme) && scheme.map((schemes) =>( 
            <Link to= {`/CustomerHome/${schemes.JewellerID}/${schemes.JewellerName}`} 
            state={{data:{jewellerwallet:schemes.JewellerWallet,customerwallet:customerWallet}}}> 
               <div className="card3">
                 <h2 style={{fontFamily:'Libre Baskerville,serif'}}>{schemes.JewellerName}</h2>
                 <p style={{fontFamily:'Libre Baskerville,serif'}}>{schemes.JewellerID}</p>
               
        </div>
        </Link>
        ))}
        </div>
        </div>
    )
}
export default TotalJewellers;