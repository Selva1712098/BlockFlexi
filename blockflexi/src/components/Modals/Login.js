import React, { useState } from 'react';
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
} from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
const [address, setAddress] = useState('');
const [mobile, setMobile] = useState('');
const [PANNo, setPANNo] = useState('');


  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Card
        style={{
          width: '400px',
          borderRadius: '10px',
          boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden', 
        }}
      >
        <div
          style={{
            backgroundColor: '#2196f3',
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
            LOGIN
          </Typography>
        </div>
        <CardContent style={{ paddingTop: '40px' }}>
          <form onSubmit={handleSubmit}>
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
                backgroundColor: '#2196f3',
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
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
