import React, { useState } from 'react';
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Grid,
  
} from '@mui/material';
// import {Alert} from '@mui/material'
import Swal from 'sweetalert2'
// import axios from 'axios'
import axios from '../../integration'

import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import MainHeader from './MainHeader';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const CustomerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword,setShowPassword]=useState(false)
  //const[wallet,setWallet]=useState('')
  
  const navigate=useNavigate()
  
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  // const openalert=()=>{
  //   setOpen(true)
  // }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  async function login(event){
    event.preventDefault();
    await axios.post('/CustomerLogin',
    {
      email,password
    },{withCredentials:true}).then((res)=>{
      if(res.data.status==='ok'){
        
        Swal.fire({
          icon: 'success',
          title: 'Login successful!',
          text: 'You are now logged in.',
          confirmButtonColor:"#9A1B56"
        }).then((result)=>{
          if(result.isConfirmed){
            const wallet=res.data.wallet
            navigate('/CustomerLanding',{state:{walletAddress:wallet}})
          }
        });
        
       
        //navigate('/CustomerLanding',{state:{walletAddress:res.data.wallet}})
      }
      else if(res.data.status==='error'){
       
        alert("wrong password")
      }
      else if(res.data.status==='not found'){
        Swal.fire({
          icon: 'error',
          title: 'Invalid Credentials',
          text: 'Please use Valid Credentials',
        }).then((result)=>{
          if(result.isConfirmed){
            window.location.reload();
          }
        })
      }
    }).catch(e=>{
      Swal.fire({
        icon: 'error',
        title: 'Something Went Wrong',
        text: 'Please Try Again later',
      }).then((result)=>{
        if(result.isConfirmed){
          window.location.reload();
        }
      })
    })
  }
 
    
  
  return (
    <>
    <MainHeader />
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '90vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      
     <Grid container style={{
      
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      flexWrap:'column wrap'
     }}>
      <Grid item >
      <Card
        style={{
         maxWidth: '400px',
          borderRadius: '10px',
          boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden', 
        }}
        elevated
      >
        <div
          style={{
            backgroundColor: '#9A1B56',
            height: '100px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="h5"
            component="h2"
            fontFamily="bold"
            style={{ color: 'white' , fontFamily:'Libre Baskerville,serif'}}
          >
          CUSTOMER  LOGIN
          </Typography>
        </div>
       
        <CardContent style={{ paddingTop: '40px' }}>
          <form onSubmit={login}>
            <TextField
            required
              id="email"
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={handleEmailChange}
              margin="normal"
              style={{ marginBottom: '20px' }}
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
              style={{ marginBottom: '30px' }}
            />
            <Button
              style={{
                margin: '10px 0px 30px',
                backgroundColor: '#9A1B56',
                color: 'white',
                borderRadius: '20px',
                width: '100%',
                fontFamily:'Libre Baskerville,serif'
              }}
              variant="contained"
              color="primary"
              type="submit"
            >
              Login
            </Button>
          </form>
          <Typography align='center' variant='body1'>Don't have an acount.<a href="/Customer/Register">Register here</a></Typography>
        </CardContent>
      </Card>
      </Grid>
      </Grid>
    </div>
    </>
  );
};

export default CustomerLogin;
