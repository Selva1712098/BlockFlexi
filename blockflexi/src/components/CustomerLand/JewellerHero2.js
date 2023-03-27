import React,{useState} from "react";
import './JewellerHero2.css';
function JewellerHero2(){
  const [yourscheme, setYourscheme] = useState("");
    return(
        <div>
          <h1 style={{textAlign:"center"}}>Your schemes</h1>
          <div className="row2">
        {/* {yourscheme &&
          yourscheme.map((scheme) => ( */}
            {/* // <Link to={`/CustomerHome/${jeweller.JewellerID}`}> */}
              <div className="column2">
                <div className="card2">
                  <h2>hello</h2>
                  <p>Scheme descriptions</p>
                  {/* <button className="button1" onClick={handleschemebody} >View Schemes</button> */}
            
                </div>
              </div>
            {/* // </Link> */}
          {/* ))} */}
      </div>
        </div>
    )
}
export default JewellerHero2;