import {React} from "react";
import './BankHeader.css';
import {useNavigate} from 'react-router-dom';
import { Link } from "react-router-dom";
function BankHeader(){
    const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/JewellerHome");
  };
    return(
        <div>
           <header className="headbar1">
  <div className="headbar1-left">
    <p style={{fontSize:"35px"}}>Blockflexi</p>
  </div>
  <div className="headbar1-right">
    <nav>
      <ul>
        <li>
        {/* <button onClick={handleNavigate}>Home</button> */}
            <Link to={'/BankHome'}>Home</Link>
            </li>
        <li><a href="https://www.blockedge.io/">Contact</a></li>
      </ul>
    </nav>
  </div>
  </header>
</div>


        
    )
}
export default BankHeader;