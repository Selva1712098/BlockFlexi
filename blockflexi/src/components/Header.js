import React from 'react';
import { AppBar, Toolbar, Typography, Button,Popover,List,ListItem,ListItemText } from '@mui/material';

function Header() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };

      const open = Boolean(anchorEl);
      const id = open ? 'dropdown-menu' : undefined;
    
  return (
    <div className="header">
    <AppBar position="static" style={{ background: '#9A1B56' }}>
      <Toolbar>
        <Typography variant="h4" style={{ marginRight:"auto" }}>
          BLOCKFLEXI
        </Typography>
        <Button color="inherit">Home</Button>
        <Button color="inherit">Contact</Button>
        <Button color="inherit">Schemes</Button>
        
        <Button color="inherit">Profile</Button>
      </Toolbar>
    </AppBar>
    
    </div>
  );
}

export default Header;
