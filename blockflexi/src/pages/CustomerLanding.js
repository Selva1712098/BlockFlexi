import Header from "../components/Header";
import React, { useEffect, useState, useRef } from "react";
import Carousel from "../components/CustomerLand/Carousel";
import JewellerHero from "../components/CustomerLand/JewellerHero";
function CustomerLanding() {
    const jewellerHeroRef = useRef(null);

  const scrollToJewellerHero = () => {
    jewellerHeroRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  const [showSection, setShowSection] = useState(false);

  // const handleMouseEnter = () => {
  //     setShowSection(true);
  //   };

  //   const handleMouseLeave = () => {
  //     setShowSection(false);
  //   };
  useEffect(() => {
    setShowSection(true);
  }, []);
  return (
    <div style={{ height: "50vh", background: "white" }}>
      <Header />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundSize: "cover",
          alignItems: "center",
          height: "450px", // set the height of the banner
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
            >
              Explore
            </button>
          </div>
        </div>
      </div>
      <br />
      <br />
      <Carousel />
      <JewellerHero />
      <br />
      <br />
      <br />
    </div>
  );
}
export default CustomerLanding;
