import React, { useEffect, useState, forwardRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import axios from "axios";
import "./Hero.css";

function Hero() {
  // const JewellerHero=forwardRef((props,ref)=>{
  const navigate = useNavigate();
  const handleButton = () => {
    navigate("/AllJewellers");
  };

  const [jewellerSchemes, setJewellerSchemes] = useState(false);

  const handleschemebody=()=>{
    setJewellerSchemes(true)
  }
  const closeschemebody=(event)=>{
    if (!event.target.closest('.wrapper')) {
      setJewellerSchemes(false)
  }
}

  const [jewellers, setJewellers] = useState("");
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:5000/viewjewellers");
        setJewellers(response.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);
  return (
    <div>
      <h1 style={{ textAlign: "center", fontFamily: "sans-serif" }}>
        Jewellers
      </h1>
      <h2 className="oneline">"Your investment is in safe hands with our trusted jewellers on BlockFlexi."</h2>
      <div className="row1">
        {jewellers &&
          jewellers.map((jeweller) => (
            <Link to={`/CustomerHome/${jeweller.JewellerID}`}>
              <div className="column1">
                <div className="card1">
                  <h2>{jeweller.JewellerName}</h2>
                  <p>Jeweller descriptions</p>
                  {/* <button className="button1" onClick={handleschemebody} >View Schemes</button> */}
            
                </div>
              </div>
            </Link>
          ))}
      </div>
      <br />
      <br />
      <button class="cta" onClick={handleButton}>
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
