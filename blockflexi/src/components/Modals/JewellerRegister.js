import React, { useState } from 'react';
import {
Card,
CardContent,
TextField,
Button,
Typography,
} from '@mui/material';
import {useNavigate} from 'react-router-dom'

import MainHeader from './MainHeader';
// import axios from 'axios'
import axios from '../../integration'
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const JewellerRegister = () => {
const [name, setName] = useState('');
const [showPassword,setShowPassword]=useState(false)
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const[walletaddress,setWallet] = useState('');
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
  await axios.post("/JewellerRegister",{
    name,
    email,password,walletaddress
  }).then(res=>{
    if(res.data.status==='ok'){
      alert("Your account has been created successfully")
      navigate('/Jeweller/login')
}
    else if(res.data.status==='exists'){
      alert("You are already a part of us")
     window.location.reload()
    }
  }).catch(e=>{
    alert("wrong details")
  })
}
return (
    <>
    <MainHeader/>
    <br/>
    <br/>
    <br/>
<div style={{ display: 'flex', flexWrap: 'column wrap', justifyContent: 'center',height:'92vh' }}>
    

<Card sx={{ bgcolor: 'white', maxWidth: '400px', margin: '30px' }}>
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
<Typography variant="h5" component="h2" style={{ textAlign: 'center',color:'white',fontFamily:'Libre Baskerville,serif' }}>
JEWELLER REGISTRATION
</Typography>
</div>
<CardContent>


<form onSubmit={register} action="POST">
<TextField
required
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
required
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
required
           id="password"
           label="Password"
           type={showPassword?"text":"password"}
           variant="outlined"
           fullWidth
           value={password}
           onChange={handlePasswordChange}
           margin="normal"
           InputProps={{endAdornment:<InputAdornment position="end"> <IconButton
           onClick={()=>setShowPassword(!showPassword)}>
           {showPassword ? <VisibilityOff /> : <Visibility />}
           </IconButton></InputAdornment>}}
         />
        
        

         <TextField
         required
           id="wallet"
           label="WalletAddress"
           type="text"
           variant="outlined"
           fullWidth
           value={walletaddress}
           helpertext="put 0x instead of xdc"
           onChange={handleWalletChange}
           margin="normal"
         />

<Button  style={{ margin: '10px 0px 0px 120px', backgroundColor: '#9A1B56', fontFamily:'Libre Baskerville,serif' }} variant="contained"  type="submit">
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