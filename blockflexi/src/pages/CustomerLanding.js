import Header from "../components/Header";
import React, { useEffect, useState, useRef } from "react";
import Carousel from "../components/CustomerLand/Carousel";
import JewellerHero from "../components/CustomerLand/JewellerHero";
import { useNavigate } from "react-router";
import {useCookies} from 'react-cookie';
import jwtDecode from 'jwt-decode';
import JewellerHero2 from "../components/CustomerLand/JewellerHero2";
import Hero from "../components/CustomerLand/Hero";

import './CustomerLanding.css';

function CustomerLanding() {
    const HeroRef = useRef(null);

  const scrollToHero = () => {
    
      HeroRef.current.scrollIntoView({ behavior: 'smooth' });
    
  };
  const [cookies, setCookie, removeCookie] = useCookies(["sessionId"]);
  const navigate = useNavigate();
  const token = jwtDecode(cookies.customer_sessionId);

  console.log(token);

  useEffect(() => {
    if (!token) {
      alert("you are not logged in , please login");
      navigate("/");
    }
  }, [token]);
  // useEffect(() => {
  //   setShowSection(true);
  // }, []);
  return (
    <div style={{ height: "50vh", background: "white"}}>
      <Header />
      <div
        style={{
          display: "flex",
          flexDirection:"column",
          justifyContent: "center",
          backgroundSize: "cover",
          alignItems: "center",
          height: "300px", // set the height of the banner
          backgroundImage: `url("../images/banner2.png")`,
          zIndex: "1",
          //   #9A1B56
          color: "Black",
          padding: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "-350px",
            zIndex: "5",
            transition: "opacity 1s ease-in-out",
          }}
        >
          <h1 className="header"
            style={{
              
              marginBottom: "20px",
              fontSize: "40px",
              transition: "all 0.3s ease-in-out",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
            }}
          >
            Hello!
          </h1>
          <p className="para"
            style={{
              marginTop:"1px",
              maxWidth: "700px",
              fontSize: "25px",
              transition: "all 0.3s ease-in-out",
              fontFamily: "Shantell Sans', cursive"
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
            }}
          >
            "Explore a world of verified jewellers and flexible gold investment
            options on Blockflexi, where transparency and security come first
            for your peace of mind."
          </p>
          <div style={{ marginTop: "auto" }}>
            <button 
              style={{
                backgroundColor: "#D1B6B6",
                color: "black",
                padding: "10px 20px",
                borderRadius: "50px",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease-in-out",
                fontSize: "20px",
                outline:"none"
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
              }}
              onClick={scrollToHero}
            >
              Explore
            </button>
          </div>
        </div>
      </div>
      <br />
      <br />
      {/* <Carousel /> */}
      {/* <JewellerHero  /> */}
      <div ref={HeroRef}>
      <Hero  />
      </div>
      <br/>
      <br />
      <JewellerHero2 />
      {/* ref={jewellerHeroRef} */}
      <br />
      <br />
      <br />
    
    </div>
  );
}
export default CustomerLanding;
