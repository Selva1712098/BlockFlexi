import React,{useState,useEffect} from "react";
import './JewellerHero2.css';
import axios from "axios";

function JewellerHero2({customerid}){
  const [yourschemeid, setyourSchemeid] = useState([]);
  const [yourscheme, setyourScheme] = useState([]);
  
  useEffect(()=>{
    async function getSchemeId(){
      try{
        await axios.get("http://localhost:5000/GetSchemeID").then(res=>{
          if(res.data.schemecheck){
            const id=res.data.schemecheck.filter(r=>r.CustomerID === customerid)
            setyourSchemeid(id)
            console.log(id)
          }
        })
      }catch(e){
        console.error(e)
      }
    }
    getSchemeId()
  },[])
  useEffect(()=>{
    async function getScheme(){

      try{
        await axios.get("http://localhost:5000/GetScheme").then(res=>{
          if(res.data.schemecheck){
            const response = res.data.schemecheck;
            const schemes = response.filter((res) => {
              return yourschemeid.some((res2) => res2.SchemeID === res.SchemeID);
            });
            //const scheme=res.data.schemecheck.filter(r=>r.SchemeID === yourschemeid.SchemeID)
            setyourScheme(schemes)

          }
        })
      }catch(e){
        console.error(e)
      }
    }
    getScheme()
  },[yourschemeid])
    return(
        <div>
          <h1 style={{textAlign:"center"}}>Your schemes</h1>
         
          <div className="row2">
          {Array.isArray(yourscheme) && yourscheme.map(scheme =>      
                <div className="card2">
                  <h2>{scheme.SchemeName}</h2>
                  <p>{scheme.MonthlyPayment}</p>
                
            
                </div>)}
          
             
           
      </div>
        </div>
    )
}
export default JewellerHero2;