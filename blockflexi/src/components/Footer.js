import React from 'react';
import { Container, Grid, Typography, Link } from '@mui/material';

function Footer() {
  return (
    <footer style={{backgroundColor: '#9a1b56', color:"white"}}>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <img style={{margin:'0px 0px 0px 0px',width: "100%", maxWidth: "200px", marginBottom: "1rem"}}src="https://www.blockedge.io/images/home/blockedge-logo.svg" alt="BlockEdge Logo"  />
            <Typography variant="body1" style={{ fontWeight: 'bold', marginBottom: "1rem"}}>
              ABOUT US
            </Typography>
            <Typography variant="body2" style={{ margin:"0px 0px 40px 0px",fontSize:'17px' }}>
              Pay-as-you-go scalable & managed blockchain solutions for businesses eager to embrace blockchains
            </Typography>
            <Typography variant="subtitle1" style={{
  
  margin: '0',
  color: 'white',
  textAlign: 'left',
  display:'block',
 
  
}}>
  &copy; All Rights Reserved 2023 | SecureKloud Technologies
</Typography>

          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="body1" style={{ fontWeight: 'bold', marginBottom: "1rem"}}>
              CONTACT US
            </Typography>
            <Typography variant="body2" style={{ marginBottom: "1rem",fontSize:'17px' }}>
              Email: <Link style={{color:"white"}} href="blockedge@example.com">blockedge@example.com</Link>
            </Typography> 
            <Typography variant="body2" style={{ marginBottom: "1rem",fontSize:'17px' }}>
              Phone: <Link style={{color:"white"}} href="tel:+15555555555">+1 844-838-3800</Link>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="body1" style={{ fontWeight: 'bold', marginBottom: "1rem"}}>
              FOLLOW US
            </Typography>
            <Typography variant="body2" style={{ marginBottom: "1rem" }}>
              <Link style={{color:"white",fontSize:'17px'}} href="#"><i style={{}}className="fab fa-facebook"></i> Facebook</Link>
            </Typography>
            <Typography variant="body2" style={{ marginBottom: "1rem" }}>
              <Link style={{color:"white",fontSize:'17px'}}  href="#"><i className="fab fa-twitter"></i> Twitter</Link>
            </Typography>
            <Typography variant="body2" style={{ marginBottom: "1rem" }}>
              <Link style={{color:"white",fontSize:'17px'}} href="#"><i className="fab fa-instagram"></i> Instagram</Link>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="body1" style={{ fontWeight: 'bold', marginBottom: "1rem"}}>
              NEWSLETTER
            </Typography>
            <Typography variant="body2" style={{ marginBottom: "1rem",fontSize:"17px" }}>
              Subscribe to our newsletter to receive updates and news about BlockEdge
            </Typography>
            <form>
              <input type="email" placeholder="Your email address" style={{width: "100%", padding: "0.5rem", marginBottom: "1rem", border: "none", borderRadius: "4px"}} />
              <button type="submit" style={{backgroundColor: "white", color: "#9a1b56", border: "none", padding: "0.5rem 1rem", borderRadius: "4px", cursor: "pointer"}}>
                SUBSCRIBE
              </button>
              
             

            </form>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
}

export default Footer;
