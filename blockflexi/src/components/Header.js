import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Popover,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
 
} from "@mui/material";

function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isProfileOpen, setProfileOpen] = React.useState(null);
  

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleProfile=(event)=>{
    setProfileOpen(event.currentTarget);
      }
    
      const handleProfileClose=()=>{
        setProfileOpen(null);
          };

  const open = Boolean(anchorEl);
  const opened = Boolean(isProfileOpen);
  const id = open ? "dropdown-menu" : undefined;

  const listitemtext = {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#000",
  };

  
  
  return (
    <div className="header">
      <AppBar position="static" style={{ background: "#9A1B56",display:'flex',flexDirection:'column' }}>
        <Toolbar style={{display:'flex',flexFlow: 'row wrap',justifyContent:'center',alignItems:'center'}}>
          <Typography variant="h4" style={{ marginRight: "auto" }}>
            BLOCKFLEXI
          </Typography>
          <Button color="inherit">Home</Button>
          <Button color="inherit">Contact</Button>
          <Button color="inherit">Schemes </Button>
          <Button color="inherit" onClick={handleClick}>
            Gold Price
          </Button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <List>
              <ListItem>
                <ListItemText
                  primary="Current Gold Price per gm"
                  style={listitemtext}
                />
              </ListItem>
              <ListItem>
                <ListItemText primary="Rs.22,500" style={listitemtext} />
              </ListItem>
            </List>
          </Popover>

          <Button color="inherit" id="basic-button"
        aria-controls={opened ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={opened ? 'true' : undefined}
        onClick={handleProfile}
      >
        
            Profile
          </Button>
          <Menu
        id="basic-menu"
        anchorEl={isProfileOpen}
        open={opened}
        onClose={handleProfileClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}>
          <p fontSize="50%" > Welcome to BLOCKFLEXI!</p>
        <MenuItem onClick={handleProfileClose}>Login</MenuItem>
        <MenuItem onClick={handleProfileClose}>Register</MenuItem>
      </Menu>
        </Toolbar>
      </AppBar>
   
    
    </div>
  );
}

export default Header;
