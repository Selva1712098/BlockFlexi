import React, { useEffect, useState, forwardRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import axios from "axios";
import "./Hero.css";
import { Circles } from "react-loader-spinner";
function Hero({customerWallet}) {
  // const JewellerHero=forwardRef((props,ref)=>{
  const navigate = useNavigate();
  console.log(customerWallet)
  const [jewellers, setJewellers] = useState([]);
  const [isloading,setLoading]=useState(true)
  const handleButton = () => {
    navigate("/AllJewellers");
  };

  const [jewellerSchemes, setJewellerSchemes] = useState(false);
  const jeweller=(data)=>{
    setJewellers(data)
    console.log(jewellers)
  }
  const handleschemebody=()=>{
    setJewellerSchemes(true)
  }
  const closeschemebody=(event)=>{
    if (!event.target.closest('.wrapper')) {
      setJewellerSchemes(false)
  }
}

  
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const response = await axios.get("http://localhost:5000/viewjewellers");
        jeweller(response.data.jeweller);
        setLoading(false)
       
      } catch (err) {
        console.error(err);
        setLoading(false)
      }
    }
    fetchData();
  }, []);
  if(isloading){
    return <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
     <Circles
   height="40"
   width="40"
   color="#9A1B56"
   ariaLabel="circles-loading"
   wrapperStyle={{}}
   wrapperClass=""
   visible={true}
  
   
   /></div>
    
}
  return (
    <div>
      <h1 style={{ textAlign: "center", fontFamily:'Libre Baskerville,serif' }}>
        Jewellers
      </h1>
      <h2 className="oneline" style={{fontFamily:'Libre Baskerville,serif'}}>"Your investment is in safe hands with our trusted jewellers on BlockFlexi."</h2>
      <div className="row1">
        {Array.isArray(jewellers) &&
          jewellers.map((jeweller) => (
            <Link to={`/CustomerHome/${jeweller.JewellerID}/${jeweller.JewellerName}`} 
            state={{data:{jewellerwallet:jeweller.JewellerWallet,customerwallet:customerWallet}}}>
              <div className="column1">
                <div className="card1">
                  <h2 style={{fontFamily:'Libre Baskerville,serif'}}>{jeweller.JewellerName}</h2>
                  <p>{jeweller.JewellerID}</p>
                  
                  {/* <button className="button1" onClick={handleschemebody} >View Schemes</button> */}
            
                </div>
              </div>
            </Link>
          ))}
      </div>
      <br />
      <br />
      <button class="cta" style={{fontFamily:'Libre Baskerville,serif'}} onClick={handleButton}>
        <span>View more</span>
        <svg viewBox="0 0 13 10" height="10px" width="15px">
          <path d="M1,5 L11,5"></path>
          <polyline points="8 1 12 5 8 9"></polyline>
        </svg>
      </button>
    </div>
  );
}
export default Hero;
