<<<<<<< HEAD
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
=======
import React from 'react'
import './Footer.css'


function Footer() {
  return (
    <body className='Footer'>
    <div>
      <header>
 
</header>

<main>
 
</main>

<footer class="footer">
  <div class="footer__addr">
    <img className='Logo' src = 'https://www.linkpicture.com/q/SecureKloud_Technologies_Limited_Logo.jpg' />
        
    <h2>Contact</h2>
    
    <address>
      5534 Somewhere In. The World 22193-10212<br />
          
      <a class="footer__btn" href="mailto:example@gmail.com">Email Us</a>
    </address>
  </div>
  
  <ul class="footer__nav">
    <li class="nav__item">
      <h2 class="nav__title">Media</h2>

      <ul class="nav__ul">
        <li>
          <a href="#">Online</a>
        </li>

        <li>
          <a href="#">Print</a>
        </li>
            
        <li>
          <a href="#">Alternative Ads</a>
        </li>
      </ul>
    </li>
    
    <li class="nav__item nav__item--extra">
      <h2 class="nav__title">Technology</h2>
      
      <ul class="nav__ul nav__ul--extra">
        <li>
          <a href="#">Hardware Design</a>
        </li>
        
        <li>
          <a href="#">Software Design</a>
        </li>
        
        <li>
          <a href="#">Digital Signage</a>
        </li>
        
        <li>
          <a href="#">Automation</a>
        </li>
        
        <li>
          <a href="#">Artificial Intelligence</a>
        </li>
        
        <li>
          <a href="#">IoT</a>
        </li>
      </ul>
    </li>
    
    <li class="nav__item">
      <h2 class="nav__title">Legal</h2>
      
      <ul class="nav__ul">
        <li>
          <a href="#">Privacy Policy</a>
        </li>
        
        <li>
          <a href="#">Terms of Use</a>
        </li>
        
        <li>
          <a href="#">Sitemap</a>
        </li>
      </ul>
    </li>
  </ul>
  
  <div class="legal">
    <p>&copy; 2019 Something. All rights reserved.</p>
    
    <div class="legal__links">
      <span>Made with <span class="heart">♥</span> remotely from Anywhere</span>
    </div>
  </div>
</footer>
    </div>
    </body>
  )
}

export default Footer
>>>>>>> 27af3e9b4fe93feb402e0555ca011d5975545637
