import React from 'react';
// import { makeStyles } from '@mui/material/styles';
import { Container, Typography, Link } from '@mui/material';

const Styles = {
  root: {
    backgroundColor: '#9A1B56',
    padding: '6px',
  },
}
function Footer() {
  

  return (
    <footer className={Styles}>
      <Container maxWidth="lg">
        <Typography variant="h6" align="center" gutterBottom>
         SecureKloud
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
        &copy; 2019 Something. All rights reserved
        </Typography>
        <Typography variant="body2" align="center" color="textSecondary" component="p">
          <Link color="inherit" href="#">
           About us
          </Link>{' '}
          {'| '}
          <Link color="inherit" href="#">
            Contact Us
          </Link>{' '}
          {'| '}
          <Link color="inherit" href="#">
            Email
          </Link>
        </Typography>
      </Container>
    </footer>
  );
}

export default Footer;
