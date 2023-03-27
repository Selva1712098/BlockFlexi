import React from "react";
import Header from "../components/Header";
import './pay.css';
function Pay(){
    return(
        <div>
            <Header />
            <div className="row">
  <div className="column">
    <div className="card"><h2>your scheme 1</h2>
    <p>scheme details</p>
    <button>Pay</button>
    </div>
  </div>
  <div className="column">
    <div className="card"><h2>your scheme 1</h2></div>
  </div>
  <div className="column">
    <div className="card"><h2>your scheme 1</h2></div>
  </div>
  <div className="column">
    <div className="card"><h2>your scheme 1</h2></div>
  </div>
</div>
        </div>
    )
}
export default Pay;