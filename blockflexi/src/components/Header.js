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
  Stack
} from "@mui/material";
import {Card,CardContent,CardActions} from '@mui/material';

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
   
    <div style={{ display: 'flex' ,flexWrap:'row wrap'}}>
    <Card style={{ Width:'400px',display: 'flex' ,flexDirection:'column',margin:'120px 0 0 40px'}} variant="outlined" >
        <CardContent>
          <Typography variant="h4" component="h2" style={{ marginRight:"320px",marginBottom:"12px"  }}>
            Welcome to BlockFlexi
          </Typography>
          <Typography variant="h6" component="h2" style={{ textAlign:'justify'  }}>
          Introducing Block-Flexi: The Future of Jewellery Ownership. 
          </Typography>
          <Typography variant="h6" component="h2" style={{ textAlign:'justify'  }}>
            A Revolutionary Blockchain Solution for a Flexible Jewellery Acquisition.
          </Typography>
  
        </CardContent>
        <CardActions>
          <Stack spacing={2} direction='row'>
      <Button size="large" variant="outlined"  style={{width:"200px"  }}>
            Customer
          </Button>
          <Button size="large"  variant="outlined"   style={{width:"200px"}}>
            Jeweller
          </Button>
          <Button size="large"  variant="outlined"   style={{width:"200px"}}>
            Bank
          </Button>
          </Stack>
        </CardActions>
       
        
      </Card>
      </div>
    </div>
  );
}

export default Header;
