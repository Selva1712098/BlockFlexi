import React ,{useState} from 'react'
import {
    Card,
    CardContent,
    TextField,
    Button,
    Typography,
    Grid,
  } from '@mui/material';

function BankLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const[branch,setBranch] = useState('');
    const [name, setName] = useState('');
    const[ifsc,setIfsc] = useState('');
  
  
  
    const handleEmailChange = (event) => {
      setEmail(event.target.value);
    };
  
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };
  
    const handleNameChange = (event) => {
      setName(event.target.value);
      };

    const handleifscChange= (event) => {
        setIfsc(event.target.value);
    }
      
   const handleBranchChange=(event)=>{
    setBranch(event.target.value);
   }
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
       <Grid container spacing={1} style={{
        margin:'20px 10px 10px 300px'
       }}>
        <Grid item >
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
        <Card sx={{ bgcolor: '#f5f5f5', width: '400px', margin: '0px 10px 0px 40px',borderRadius: '10px' }}>
        <div  style={{
              backgroundColor: '#9A1B56',
              height: '100px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
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
             id="ifscno"
             label="IFSC Code"
             type="text"
             variant="outlined"
             fullWidth
             value={ifsc}
             onChange={handleifscChange}
             margin="normal"
           />
           <TextField
             id="branch-name"
             label="Branch Name"
             type="text"
             variant="outlined"
             fullWidth
             value={branch}
             onChange={handleBranchChange}
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
  
  )
}

export default BankLogin