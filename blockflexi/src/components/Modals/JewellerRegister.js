import React, { useState } from 'react';
import {
Card,
CardContent,
TextField,
Button,
Typography,
} from '@mui/material';
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const JewellerRegister = () => {
const [name, setName] = useState('');

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const[wallet,setWallet] = useState('');
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
const handleWalletChange = (event) => {
setWallet(event.target.value);
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
    
    <br/>
    <br/>
    <br/>
<div style={{ display: 'flex', flexWrap: 'column wrap', justifyContent: 'center',height:'92vh' }}>
    

<Card sx={{ bgcolor: 'white', maxWidth: '400px', margin: '50px' }}>
<div
          style={{
            backgroundColor: '#9A1B56',
            height: '100px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '10px',
          boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
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
         <TextField
           id="wallet"
           label="WalletAddress"
           type="text"
           variant="outlined"
           fullWidth
           value={wallet}
           helpertext="put 0x instead of xdc"
           onChange={handleWalletChange}
           margin="normal"
         />

<Button  style={{ margin: '10px 0px 0px 120px', backgroundColor: '#9A1B56' }} variant="contained"  type="submit">
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