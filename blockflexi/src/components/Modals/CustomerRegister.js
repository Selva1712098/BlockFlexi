import React, { useState } from 'react';
import {
Card,
CardContent,
TextField,
Button,
Typography,
} from '@mui/material';
import {useNavigate} from 'react-router-dom'
import axios from '../../integration'
import MainHeader from './MainHeader';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const CustomerRegister = () => {
const [name, setName] = useState('');
const [address, setAddress] = useState('');
const [mobile, setMobile] = useState('');
const [PANNo, setPANNo] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const[wallet,setWallet]=useState('')
const navigate=useNavigate()
const [showPassword,setShowPassword]=useState(false)
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
const handleWalletChange = (event) => {
setWallet(event.target.value);
};

const validateEmail=(email)=>{
  const regex=/^\w+([\.-]?\w+)*@(gmail\.com|hotmail\.com|yahoo\.com|outlook\.com|aol\.com)$/

  // console.log(regex.test(email))
  return regex.test(email)
 

}

 async function register(event){
  event.preventDefault();
    if(validateEmail(email)){
      await axios.post("/CustomerRegister",{
        name,
        address,
        mobile,PANNo,email,password,wallet
      }).then(res=>{
        if(res.data.status==='ok'){
          alert("Your account has been created successfully")
          navigate('/Customer/login')
    }
        else if(res.data.status==='exists'){
          alert("You are already a part of us")
          window.location.reload()
         
        }
      }).catch(e=>{
        alert("wrong details")
      })
    }
    else{
      alert("Invalid Email ID")
    }
  }

 
  



const data=()=>{
  console.log(name,address,email,password,wallet,PANNo,mobile)
}
return (
    <>
  <MainHeader />
    <br/>
    <br/>
    <br/>
<div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
    

<Card sx={{ bgcolor: '#ffffff', width: '400px', margin: '50px' }}>
<div
          style={{
            backgroundColor: '#9A1B56',
            height: '100px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
<Typography variant="h5" component="h2" style={{ textAlign: 'center',color:'white', fontFamily:'Libre Baskerville,serif' }}>
CUSTOMER REGISTRATION
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
required
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
required
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
required
           id="email"
           label="Email ID"
           type="email"
           variant="outlined"
           fullWidth
           value={email}
           onChange={handleEmailChange}
           margin="normal"
           
      helperText="Please enter a valid email address"
         />
<TextField
required
           id="password"
           label="Password"
           type={showPassword?"text":"password"}
           variant="outlined"
           fullWidth
           InputProps={{endAdornment:<InputAdornment position="end"> <IconButton
           onClick={()=>setShowPassword(!showPassword)}>
           {showPassword ? <VisibilityOff /> : <Visibility />}
           </IconButton></InputAdornment>}}
           onChange={handlePasswordChange}
           margin="normal"
         />
         <TextField
         required
           id="wallet"
           label="Wallet Address"
           type="text"
           variant="outlined"
           fullWidth
           value={wallet}
           onChange={handleWalletChange}
           margin="normal"
         />
         
        

        
<Button  style={{ margin: '10px 0px 0px 120px', backgroundColor: '#9A1B56', fontFamily:'Libre Baskerville,serif' }} variant="contained" onClick={data} type="submit">
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