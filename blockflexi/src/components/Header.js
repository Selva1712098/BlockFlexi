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
  MenuItem
} from "@mui/material";
import React from 'react';
import { AppBar, Toolbar, Typography, Button,Popover,List,ListItem,ListItemText,Card,CardContent,CardActions} from '@mui/material';

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
      <AppBar position="static" style={{ background: "#9A1B56" }}>
        <Toolbar>
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
    <AppBar position="static" style={{ background: '#9A1B56' }}>
      <Toolbar>
        <Typography variant="h4" style={{ marginRight:"auto" }}>
          BLOCKFLEXI
        </Typography>
        <Button color="inherit">Home</Button>
        <Button color="inherit">Contact</Button>
        <Button color="inherit" >Schemes </Button>
        <Button color="inherit" onClick={handleClick}>Gold Price</Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <List>
            <ListItem >
              <ListItemText primary="Current Gold Price per gm" style={listitemtext}/>
            </ListItem>
            <ListItem >
              <ListItemText primary="Rs.22,500" style={{fontSize:'14px',
        fontWeight:'bold',
        color:'#000'}}/>
            </ListItem>
            
          </List>
        </Popover>
        <Button color="inherit">Profile</Button>
      </Toolbar>
    </AppBar>
    <Card style={{ margin: '150px  550px 0  70px',Width:'400px'}} variant="outlined" raised="true">
        <CardContent>
          <Typography variant="h4" component="h2" style={{ marginRight:"320px",marginBottom:"12px"  }}>
            Welcome to BlockFlexi
          </Typography>
          <Typography variant="h6" component="h2" style={{ marginRight:"130px" }}>
          Introducing Block-Flexi: The Future of Jewellery Ownership. 
          </Typography>
          <Typography variant="h6" component="h2" style={{ marginRight:"20px" }}>
            A Revolutionary Blockchain Solution for a Flexible Jewellery Acquisition.
          </Typography>
        </CardContent>
        <CardActions style={{ display: 'flex' }}>
          <Button size="large" variant="outlined"  style={{marginLeft:"30px",width:"200px"}}>
            Customer
          </Button>
          <Button size="large"  variant="outlined"   style={{marginLeft:"20px",width:"200px"}}>
            Jeweller
          </Button>
          <Button size="large"  variant="outlined"   style={{marginLeft:"20px",width:"200px"}}>
            Bank
          </Button>
        </CardActions>
      </Card>
    
    </div>
  );
}

export default Header;
