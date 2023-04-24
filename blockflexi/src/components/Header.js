import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';

import Button from '@mui/material/Button';

import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';




const pages = [ 'CONTACT', 'SCHEMES'];
const settings = [ 'Account', 'Dashboard', 'Logout'];

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const Navigate=useNavigate()
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // const goldprice=async ()=>{
   

  //   const data=await fetch(`https://api.metalpriceapi.com/v1/latest
  //   ?api_key=${process.env.privatekey}
  //   &base=USD
  //   &currencies=XAU`)
  //   const xau=await data.json()
  //   console.log(xau)


  // }
  return (
    <AppBar position="static" sx={{backgroundColor:'#9A1B56'}}>
      <Container maxWidth="xl" >
        <Toolbar >
          
          <Typography
            variant="h4"
           
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Montserrat', 
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            BLOCKFLEXI
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
                
              }}
            >   <MenuItem>
            <Typography textAlign="left" onClick={()=>Navigate('/')}>HOME</Typography>
            </MenuItem>
               
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                 
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'Montserrat',
              
              color: 'white',
              textDecoration: 'none',
            }}
          >
            BLOCKFLEXI
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' },marginLeft:'170px' }}>
            <Button color='inherit' sx={{fontFamily:'Montserrat',fontWeight:'bold'}} onClick={()=>Navigate('/')}>Home</Button>
            
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{  color: 'white', display: 'flex',marginLeft:'80px',fontFamily:'Montserrat',fontWeight:'bold' }}
              >
                {page}
              </Button>
              
            ))}
          <Button color='inherit' sx={{fontFamily:'Montserrat',fontWeight:'bold',marginLeft:'80px'}} >GOLD PRICE</Button>

          </Box>

          
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
