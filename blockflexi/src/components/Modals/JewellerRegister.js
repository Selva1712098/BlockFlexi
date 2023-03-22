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

const JewellerRegister = () => {
const [name, setName] = useState('');

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const navigate=useNavigate()
const handleNameChange = (event) => {
setName(event.target.value);
};


const handleEmailChange = (event) => {
setEmail(event.target.value);
};

const handlePasswordChange = (event) => {
setPassword(event.target.value);
};



 async function register(event){
  event.preventDefault();
  await axios.post("http://localhost:5000/JewellerRegister",{
    name,
    email,password
  }).then(res=>{
    if(res.data.status==='ok'){
      alert("Your account has been created successfully")
      navigate('/Jeweller/login')
}
    else if(res.data.status==='exists'){
      alert("You are already a part of us")
      navigate('/Jeweller/login')
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
<Typography variant="h5" component="h2" style={{ textAlign: 'center',color:'white',fontFamily:'roboto' }}>
JEWELLER REGISTRATION
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
<Button  sx={{ margin: '10px 0px 0px 120px', bgcolor: '#9A1B56' }} variant="contained" color="primary" type="submit">
Register
</Button>
</form>
</CardContent>
</Card>
</div>
</>
);
};

export default JewellerRegister;