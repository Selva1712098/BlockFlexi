import React, { useState } from 'react';
import {
Card,
CardContent,
TextField,
Button,
Typography,
} from '@mui/material';

const Register = () => {
const [name, setName] = useState('');
const [address, setAddress] = useState('');
const [mobile, setMobile] = useState('');
const [PANNo, setPANNo] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

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

const handleSubmit = (event) => {
event.preventDefault();
// Add your registration logic here
};

return (
<div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
<Card sx={{ bgcolor: '#f5f5f5', width: '400px', margin: '50px' }}>
<CardContent>
<Typography variant="h5" component="h2" style={{ textAlign: 'center', fontWeight: 'bold' }}>
REGISTER
</Typography>
<form onSubmit={handleSubmit}>
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
<Button sx={{ margin: '10px 0px 0px 120px', bgcolor: '#1E88E5' }} variant="contained" color="primary" type="submit">
Register
</Button>
</form>
</CardContent>
</Card>
</div>
);
};

export default Register;