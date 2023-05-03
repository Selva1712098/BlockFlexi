import React from "react";
import './MainHeader.css';
import Header from "../Header";
function MainHeader(){
    return(
        <div>
           <header className="headbar1">
  <div className="headbar1-left">
    <p style={{fontSize:"35px"}}>Blockflexi</p>
  </div>
  <div className="headbar1-right">
    <nav>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="https://www.blockedge.io/">Contact</a></li>
      </ul>
    </nav>
  </div>
  </header>
</div>


        
    )
}
export default MainHeader;