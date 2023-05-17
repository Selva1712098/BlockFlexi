import React, { useState,useEffect } from "react";
import axios from '../integration.js';

import './AllJewellers.css';
function AllJewellers(){
    const[scheme, setscheme]= useState([]);
    useEffect(() => {
      async function getAllSchemes() {
        try {
          const response = await axios.get("/AllSchemes");
          const { schemescheck } = response.data;
          setscheme(schemescheck);
        } catch (error) {
          console.error(error);
        }
      }
      getAllSchemes();
    }, []);

    return(
        <div>
           <h1 style={{textAlign:"center",fontFamily:'Libre Baskerville,serif'}}>All schemes</h1>
         
         <div className="row3">
         {Array.isArray(scheme) && scheme.map(schemes =>      
               <div className="card3">
                 <h2 style={{fontFamily:'Libre Baskerville,serif'}}>{schemes.SchemeName}</h2>
                 <p style={{fontFamily:'Libre Baskerville,serif'}}>{schemes.MonthlyPayment}</p>
               
        </div>)}
        </div>
        </div>
    )
}
export default AllJewellers;