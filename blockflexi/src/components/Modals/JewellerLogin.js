import React, { useState } from 'react';

import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Grid,
} from '@mui/material';
// import axios from 'axios';
import axios from '../../integration'

import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

const JewellerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 
  const navigate=useNavigate()
  



  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  async function login(event){
    event.preventDefault();
    await axios.post("/JewellerLogin",{
      email,
      password
    },{withCredentials:true}).then((res)=>{
      if(res.data.status==='ok'){
        Swal.fire({
          icon: 'success',
          title: 'Login successful!',
          text: 'You are now logged in.',
          confirmButtonColor:"#9A1B56"
        }).then((result)=>{
          if(result.isConfirmed){
            navigate('/jewellerhome')
          }
        })
        
        
      }
      else if(res.data.status==='error'){
        alert("wrong password")
      }
      else if(res.data.status==='not found'){
       
        
          Swal.fire({
            icon: 'error',
            title: 'User Not Found!',
            text: 'Please Create an account',
          }).then((result)=>{
            if(result.isConfirmed){
              navigate('/Jeweller/Register')
            }
          })
        
        
      }
    }).catch(e=>{
      alert('wrong details')

    })  }
    
  return (
    <>
    
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '90vh',
        backgroundColor: '#f5f5f5',
        
      }}
    >
     <Grid container spacing={1} style={{
       display:'flex',
       alignItems:'center',
       justifyContent:'center',
       
       
      
     }}>
      <Grid item >
      <Card
        style={{
         
          maxWidth: '400px',
          borderRadius: '10px',
          boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden', 
        }}
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
            style={{ color: 'white', fontFamily:'Libre Baskerville,serif' }}
          >
           JEWELLER LOGIN
          </Typography>
        </div>
        <CardContent style={{ paddingTop: '40px' }}>
          <form onSubmit={login} action="POST">
            <TextField
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
              id="password"
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
             
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
          <Typography align='center' variant='body1'>Don't have an acount.<a href="/Jeweller/Register">Register here</a></Typography>

        </CardContent>
      </Card>
      </Grid>
      
</Grid>
    </div>
    </>
  );
};

export default JewellerLogin;
