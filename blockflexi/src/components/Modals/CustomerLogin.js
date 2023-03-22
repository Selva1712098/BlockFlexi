import React, { useState } from 'react';
import Header from '../Header';
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Grid,
} from '@mui/material';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const CustomerLogin = () => {
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
    await axios.post('http://localhost:5000/CustomerLogin',
    {
      email,password
    },{withCredentials:true}).then((res)=>{
      if(res.data.status==='ok'){
        alert('login was successful')
        navigate('/CustomerLanding')
      }
      else if(res.data.status==='error'){
        alert("wrong password")
      }
      else if(res.data.status==='not found'){
        alert('user not found')
      }
    }).catch(e=>{
      alert('wrong details')
    })
  }

  return (
    <>
    <Header/>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      
     <Grid container style={{
      margin:'120px 10px 10px 470px',
      display:'flex',
      flexWrap:'column wrap'
     }}>
      <Grid item >
      <Card
        style={{
          width: '400px',
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
            style={{ color: 'white' }}
          >
          CUSTOMER  LOGIN
          </Typography>
        </div>
        <CardContent style={{ paddingTop: '40px' }}>
          <form onSubmit={login}>
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
              value={password}
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
