import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Blockflexi
        </Typography>
        <Button color="inherit">Home</Button>
        <Button color="inherit">Contact</Button>
        <Button color="inherit">Schemes</Button>
        <Button color="inherit">Profile</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
