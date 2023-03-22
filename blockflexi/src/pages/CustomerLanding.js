import Header from "../components/Header";
import React, { useEffect, useState, useRef } from "react";
import Carousel from "../components/CustomerLand/Carousel";
import JewellerHero from "../components/CustomerLand/JewellerHero";
import { useNavigate } from "react-router";
<<<<<<< HEAD
import {useCookies} from 'react-cookie';
import jwtDecode from 'jwt-decode';
=======
import {useCookies} from 'react-cookie'
import jwtDecode from 'jwt-decode'

>>>>>>> ed45431624bef1f5b2e9f5859a4fbe67601b2e03
function CustomerLanding() {
  //   const jewellerHeroRef = useRef(null);

<<<<<<< HEAD
  // const scrollToJewellerHero = () => {
  //   jewellerHeroRef.current.scrollIntoView({ behavior: 'smooth', block:'start' });
  // };
  const [cookies, setCookie, removeCookie] = useCookies(["sessionId"]);
=======
  const scrollToJewellerHero = () => {
    jewellerHeroRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  const [cookies, setCookie, removeCookie] = useCookies(["sessionId"]);

  const [showSection, setShowSection] = useState(false);
>>>>>>> ed45431624bef1f5b2e9f5859a4fbe67601b2e03
  const navigate = useNavigate();
  const token = jwtDecode(cookies.sessionId);

  console.log(token);

  useEffect(() => {
    if (!token) {
      alert("you are not logged in , please login");
      navigate("/");
    }
  }, [token]);
<<<<<<< HEAD
  const [showSection, setShowSection] = useState(false);
=======
  // const handleMouseEnter = () => {
  //     setShowSection(true);
  //   };

  //   const handleMouseLeave = () => {
  //     setShowSection(false);
  //   };
>>>>>>> ed45431624bef1f5b2e9f5859a4fbe67601b2e03
  useEffect(() => {
    setShowSection(true);
  }, []);
  return (
    <div style={{ height: "50vh", background: "white" }}>
      <Header />
      <div
        style={{
          display: "flex",
          flexDirection:"column",
          justifyContent: "center",
          backgroundSize: "cover",
          alignItems: "center",
          height: "550px", // set the height of the banner
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
            opacity: showSection ? 2 : 0,
            transition: "opacity 1s ease-in-out",
          }}
        >
          <h1
            style={{
              marginBottom: "20px",
              fontSize: "50px",
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
          <p
            style={{
              maxWidth: "700px",
              fontSize: "30px",
              transition: "all 0.3s ease-in-out",
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
                fontsize: "16px",
                cursor: "pointer",
                transition: "all 0.3s ease-in-out",
                fontSize: "20px",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
              }}
              // onClick={scrollToJewellerHero}
            >
              Explore
            </button>
          </div>
        </div>
      </div>
      <br />
      <br />
      <Carousel />
      <JewellerHero  />
      {/* ref={jewellerHeroRef} */}
      <br />
      <br />
      <br />
    </div>
  );
}
export default CustomerLanding;
