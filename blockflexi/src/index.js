import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import CustomerLogin from './components/Modals/CustomerLogin'
import JewellerLogin from './components/Modals/JewellerLogin'
import BankLogin from './components/Modals/BankLogin'
import JewellerHome from './pages/JewellerHome';

import {Route,BrowserRouter as Router,Routes} from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path={'/'} element={<App/>}/>
        <Route path={'/Customer/login'} element={<CustomerLogin/>}/>
        <Route path={'/Jeweller/login'} element={<JewellerLogin/>}/>
        <Route path={'/Bank/login'} element={<BankLogin/>}/>
        
        
        <Route path={'/jewellerhome'} element={<JewellerHome/>}/>
      </Routes>
    </Router>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

