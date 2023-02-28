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

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your login logic here
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Card style={{ width: '400px' }}>
        <CardContent>
          <Typography
            variant="h5"
            component="h2"
            style={{
              fontSize: '22px',
              margin: '0px 0px 0px 140px',
              fontWeight: 'bold',
            }}
            gutterBottom
          >
            LOGIN
          </Typography>
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
            <Button
              style={{ margin: '10px 200px 60px 140px' }}
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
