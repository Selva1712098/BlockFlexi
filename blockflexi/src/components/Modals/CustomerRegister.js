import React, { useState } from 'react';
import {
Card,
CardContent,
TextField,
Button,
Typography,
} from '@mui/material';
import {useNavigate} from 'react-router-dom'
import Header from '../Header'
import axios from 'axios'

const CustomerRegister = () => {
const [name, setName] = useState('');
const [address, setAddress] = useState('');
const [mobile, setMobile] = useState('');
const [PANNo, setPANNo] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const navigate=useNavigate()
const handleNameChange = (event) => {
setName(event.target.value);
};

const handleAddressChange = (event) => {
setAddress(event.target.value);
};

const handleMobileChange = (event) => {
setMobile(event.target.value);
};

const handlePANNoChange = (event) => {
setPANNo(event.target.value);
};

const handleEmailChange = (event) => {
setEmail(event.target.value);
};

const handlePasswordChange = (event) => {
setPassword(event.target.value);
};



 async function register(event){
  event.preventDefault();
  await axios.post("http://localhost:5000/CustomerRegister",{
    name,
    address,
    mobile,PANNo,email,password
  }).then(res=>{
    if(res.data.status==='ok'){
      alert("Your account has been created successfully")
      navigate('/Customer/login')
}
    else if(res.data.status==='exists'){
      alert("You are already a part of us")
      navigate('/Customer/login')
    }
  }).catch(e=>{
    alert("wrong details")
  })
}
return (
    <>
    <Header/>
    <br/>
    <br/>
    <br/>
<div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
    

<Card sx={{ bgcolor: '#f5f5f5', width: '400px', margin: '50px' }}>
<div
          style={{
            backgroundColor: '#9A1B56',
            height: '100px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
<Typography variant="h5" component="h2" style={{ textAlign: 'center',color:'white' }}>
CUSTOMER REGISTRATION
</Typography>
</div>
<CardContent>


<form onSubmit={register} action="POST">
<TextField
           id="name"
           label="Name"
           type="text"
           variant="outlined"
           fullWidth
           value={name}
           onChange={handleNameChange}
           margin="normal"
         />
<TextField
           id="address"
           label="Address"
           type="text"
           variant="outlined"
           fullWidth
           value={address}
           onChange={handleAddressChange}
           margin="normal"
         />
<TextField
           id="mobile"
           label="Mobile No"
           type="text"
           variant="outlined"
           fullWidth
           value={mobile}
           onChange={handleMobileChange}
           margin="normal"
         />
<TextField
           id="PAN No"
           label="PAN No"
           type="text"
           variant="outlined"
           fullWidth
           value={PANNo}
           onChange={handlePANNoChange}
           margin="normal"
         />
<TextField
           id="email"
           label="Email ID"
           type="email"
           variant="outlined"
           fullWidth
           value={email}
           onChange={handleEmailChange}
           margin="normal"
         />
<TextField
           id="password"
           label="Password"
           type="password"
           variant="outlined"
           fullWidth
           value={password}
           onChange={handlePasswordChange}
           margin="normal"
         />
<Button  sx={{ margin: '10px 0px 0px 120px', backgroundColor: '#9AB156' }} variant="contained"  type="submit">
Register
</Button>
</form>
</CardContent>
</Card>
</div>
</>
);
};

export default CustomerRegister;