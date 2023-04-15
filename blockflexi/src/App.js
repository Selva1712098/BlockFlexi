import './App.css';
import LandingPage from './pages/LandingPage';
import React from 'react';
import CustomerLogin from './components/Modals/CustomerLogin'
import JewellerLogin from './components/Modals/JewellerLogin'
import BankLogin from './components/Modals/BankLogin'
import JewellerHome from './pages/JewellerHome';
// import BankHome from './pages/BankHome';
import CustomerRegister from './components/Modals/CustomerRegister';
import JewellerRegister from './components/Modals/JewellerRegister';
import Request from './pages/Request';
import Settle from './pages/Settle';
import Pay from './pages/Pay';

import {Route,BrowserRouter as Router,Routes} from 'react-router-dom'
import CustomerHome from './pages/CustomerHome';
import CustomerScheme from './pages/CustomerScheme';
import CustomerLanding from './pages/CustomerLanding';
import AllJewellers from './pages/AllJewellers';
import JewellerProfile from './pages/JewellerProfile';



const LazyBankHome=React.lazy(()=>import ('./pages/BankHome'))

function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path={'/'} element={<LandingPage/>}/>
        <Route path={'/CustomerHome'} element={<CustomerHome/>}/>
        <Route path={'/CustomerScheme'} element={<CustomerScheme/>}/>
        <Route path={'/Customer/login'} element={<CustomerLogin/>}/>
        <Route path={'/Customer/Register'} element={<CustomerRegister/>}/>
        <Route path={'/Jeweller/login'} element={<JewellerLogin/>}/>
        <Route path={'/Bank/login'} element={<BankLogin/>}/>
        <Route path={'/Jeweller/Register'} element={<JewellerRegister/>}/>
        
      
        <Route path={'/BankHome'} element={<React.Suspense fallback='Loading ...'><LazyBankHome/></React.Suspense>}/>
        <Route path={'/jewellerhome'} element={<JewellerHome/>}/>
       
        <Route path={'/request'} element={<Request/>}/>
        <Route path={'/settle'} element={<Settle/>}/>
      
        <Route path={'/CustomerLanding'} element={<CustomerLanding/>}/>
        <Route path={'/CustomerHome/:JewellerID/:JewellerName'} element={<CustomerHome/>}/>
        <Route path={'/AllJewellers'} element={<AllJewellers />}/>
        <Route path={'/Pay/:CustomerID/:JewellerID/:SchemeID'} element={<Pay/>}></Route>
        <Route path={'/JewellerProfile'} element={<JewellerProfile/>}></Route>
       
        
      </Routes>
    </Router>
      
      
     </div>
  );
}

export default App;
