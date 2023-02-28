import React, { useState } from 'react';
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Grid,
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
     <Grid container style={{
      margin:'120px 10px 10px 300px'
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
        </CardContent>
      </Card>
      </Grid>
      <Grid item >
      <Card sx={{ bgcolor: '#f5f5f5', width: '400px', margin: '0px 10px 0px 40px',borderRadius: '10px' }} elevated>
      <div  style={{
            backgroundColor: '#9A1B56',
            height: '100px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }} >
      <Typography variant="h5" component="h2" style={{ textAlign: 'center',color:'white' }}>
REGISTER
</Typography>
</div>
<CardContent>
  


<form onSubmit>
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
<Button sx={{ margin: '10px 0px 0px 120px', bgcolor: '#9A1B56' }} variant="contained" color="primary" type="submit">
Register
</Button>
</form>
</CardContent>
</Card>
</Grid>
</Grid>
    </div>
  );
};

export default Login;
