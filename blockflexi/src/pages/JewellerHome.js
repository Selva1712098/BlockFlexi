import Header from '../components/Header';
import {useNavigate} from 'react-router-dom';

import { useState } from 'react';
import { Box, Card, CardContent, Typography, CardActions, Button, Modal,TextField } from '@mui/material';
import JewellerSchemeTable from '../components/JewellerSchemeTable';



// style

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    margin: '100px',
  },
  text: {
    fontFamily: 'Arial, sans-serif', 
  },
  card: {
    width: '310px',
    height: '460px',
    margin: '50px',
    alignSelf: 'flex-start',
    backgroundImage: 'linear-gradient(to bottom, #fadecb 0%, #fff8e3 100%)',

    boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',
    borderRadius: '10px',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px, rgba(0, 0, 0, 0.15) 0px 3px 8px',
    }
  },
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    backgroundColor:'#c89e9f'
  },
};
// use state variable

const JewellerHome = () => {
  const [open, setOpen] = useState(false);
  const [view,setView] = useState(false);
  const[monthlyInstallment,setMonthlyInstallment]=useState(0)
  const[total,setTotal]=useState(0)
  const navigate=useNavigate()
  const handleOpen = () => {
    setOpen(true);
  };
  
  const handleClick=()=>{
    
    navigate('/request')
  }

  const handleClose = () => {
    setOpen(false);
  };
  const viewOpen = () => {
    setView(true);
  };
  const viewClose = () => {
    setView(false);
  };
  const calculateTotal = (event) => {
    event.preventDefault()
   
   
    
    setTotal(monthlyInstallment*11);
    
  }
// react code
  return (
    <div>
      <Header/>
      <Box sx={{ bgGradient:'linear( #00000 0%, #00000 100%)' }}>
        <div style={styles.container}>
          <Card style={styles.card}>
            <CardContent style={{fontWeight:'bold'}}>
            <Typography style={{ 
  fontSize: '2rem', 
  fontWeight: 'bold', 
  margin: '0px 0px 0px 5px',
  fontFamily: 'Arial, sans-serif',
  color: '#333',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  textAlign: 'center',
  padding: '20px 0'
}} 
variant='h1' 
component='div'>
  SCHEME
</Typography>
<div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
  <Typography style={{fontWeight:'bold',fontFamily:'Raleway, sans-serif',textAlign:'left',marginBottom:'10px'}}>
    &#9733; Financial plan/ investment program
  </Typography>
  <Typography style={{fontWeight:'bold',fontFamily:'Raleway, sans-serif',textAlign:'left',marginBottom:'10px'}}>
    &#9733; Good way to save money and acquire high-quality jewelry
  </Typography>
  <Typography style={{fontWeight:'bold',fontFamily:'Raleway, sans-serif',textAlign:'left',marginBottom:'10px'}}>
    &#9733; Credit accumulates towards Jewellery purchase
  </Typography>
  <Typography style={{fontWeight:'bold',fontFamily:'Raleway, sans-serif',textAlign:'left',marginBottom:'10px'}}>
    &#9733; Additional benefits like discounts/rewards
  </Typography>
  <Typography style={{fontWeight:'bold',fontFamily:'Raleway, sans-serif',textAlign:'left',marginBottom:'10px'}}>
    &#9733; Review terms and conditions before participating
  </Typography>
</div>


              <Typography style={styles.text} variant='body2' color='text.secondary'>
                
              </Typography>
            </CardContent>
            <CardActions style={styles.button}>  
            <Button style={{backgroundImage:'linear-gradient(to bottom, #BF8F91, #CAA2A3, #D4B5B5, #DFC7C8)', color:'#000000', borderRadius: '30px', padding: '10px 20px',fontWeight:'bold',margin:'0px 0px 0px 60px',fontSize:'15px'}} variant="contained" onClick={handleOpen}>ADD</Button>
            
            <Button style={{backgroundImage:'linear-gradient(to bottom, #BF8F91, #CAA2A3, #D4B5B5, #DFC7C8)', color:'#000000', borderRadius: '30px', padding: '10px 20px',fontWeight:'bold',fontSize:'15px'}} variant="contained" onClick={viewOpen}>VIEW</Button>
            
              </CardActions>
      </Card>
      

      <Card style={styles.card}>
        <CardContent>
        <Typography style={{ 
          

  fontWeight: 'bold',
  fontSize:'30px',
  margin: '0px 0px 0px 0px',
  fontFamily: 'Arial, sans-serif',
  color: '#333',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  textAlign: 'center',
  padding: '20px 0'
}} 
variant='h1' 
component='div'>
   LOAN REQUEST
</Typography>
<div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
  <Typography style={{fontWeight:'bold',fontFamily:'Raleway, sans-serif',textAlign:'left',marginBottom:'10px'}}>
    &#9733; Purpose of loan - Reason for taking the loan
  </Typography>
  <Typography style={{fontWeight:'bold',fontFamily:'Raleway, sans-serif',textAlign:'left',marginBottom:'10px'}}>
    &#9733; Desired loan amount - The amount of money needed
  </Typography>
  <Typography style={{fontWeight:'bold',fontFamily:'Raleway, sans-serif',textAlign:'left',marginBottom:'10px'}}>
    &#9733; Preferred tenure - The duration of the loan repayment
  </Typography>
  <Typography style={{fontWeight:'bold',fontFamily:'Raleway, sans-serif',textAlign:'left',marginBottom:'10px'}}>
    &#9733; Interest rate information - The interest rate charged on the loan
  </Typography>
  <Typography style={{fontWeight:'bold',fontFamily:'Raleway, sans-serif',textAlign:'left',marginBottom:'10px'}}>
    &#9733; Flexibility options - Any options to modify the loan repayment terms
  </Typography>
</div>

          <Typography style={styles.text} variant='body2' color='text.secondary'>
            
            
          </Typography>
        </CardContent>
        <CardActions style={styles.button}>  
          
        <Button style={{backgroundImage:'linear-gradient(to bottom, #BF8F91, #CAA2A3, #D4B5B5, #DFC7C8)', color:'#000000', borderRadius: '30px', padding: '10px 20px',fontWeight:'bold',margin:'0px 0px 0px 85px',fontSize:'15px'}} variant="contained" onClick={handleClick} >REQUEST</Button> 
        </CardActions>
      </Card>

      <Card style={styles.card}>
        <CardContent>
        <Typography style={{ 
  fontSize: '2rem',
  fontWeight: 'bold',
  fontSize:'30px',
  margin: '0px 0px 0px 0px',
  fontFamily: 'Arial, sans-serif',
  color: '#333',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  textAlign: 'center',
  padding: '20px 0'
}} 
variant='h1' 
component='div'>
   GOLD SETTLE
</Typography>
          <Typography style={styles.text} variant='body2' color='text.secondary'>
              
          </Typography>
        </CardContent>
        <CardActions style={styles.button}>  
          
        <Button style={{backgroundImage:'linear-gradient(to bottom, #BF8F91, #CAA2A3, #D4B5B5, #DFC7C8)',margin:'0px 0px 0px 85px', color:'#000000', borderRadius: '30px', padding: '10px 20px',fontWeight:'bold',fontSize:'15px'}} variant="contained" >SETTLE</Button>          
        </CardActions>
      </Card>
    </div>
  </Box>

  {/* Modal */}
  <Modal 
    open={open}
    onClose={handleClose}
    aria-labelledby='modal-title'
    aria-describedby='modal-description'
  >
    

    

    <Box style={{backgroundImage:'linear-gradient(to bottom, #BF8F91, #CAA2A3, #D4B5B5, #DFC7C8)',borderRadius: '16px' }} sx={styles.modal}>
    <Typography style={{fontSize:'20px',fontWeight:'bold'}}id='modal-title' variant='h6'  component='h2'>
        SCHEME NAME</Typography>
        <TextField
  id="outlined-basic"
  variant="outlined"
  style={{
    width: '40%',
    margin: '10px 0',
    borderRadius: '4px',
    backgroundColor: '#f4f4f4',
    boxShadow: '0 2px 4px 0 rgba(0,0,0,0.10)',
    padding: '6px 6px',
    fontSize: '40px',
  }}
  InputLabelProps={{
    style: {
      fontSize: '14px',
      color: '#666',
    },
  }}
  InputProps={{
    style: {
      fontSize: '14px',
    },
  }}
  
  
/>
      
      <Typography style={{fontSize:'20px',fontWeight:'bold'}}id='modal-title' variant='h6'  component='h2'>
        MONTHLY INSTALLMENT</Typography>
        <form onSubmit={calculateTotal}>
        <TextField
  id="outlined-basic"
  type="number"
  variant="outlined"
  style={{width: '40%',margin: '10px 0',borderRadius: '4px',backgroundColor: '#f4f4f4',
    boxShadow: '0 2px 4px 0 rgba(0,0,0,0.10)',
    padding: '6px 6px',
    fontSize: '40px',
  }}
  InputLabelProps={{
    style: {
      fontSize: '14px',
      color: '#666',
    },
  }}
  InputProps={{
    style: {
      fontSize: '14px',
    },
  }}
 value={monthlyInstallment}
 onChange={(e)=>setMonthlyInstallment(e.target.value)}

/>
<Button style={{margin:'25px 0px 0px 40px',fontWeight:'bold'}} variant="contained" type="submit" >submit</Button>
</form>
      
      <Typography style={{fontSize:'20px',fontWeight:'bold'}}id='modal-title' variant='h6'  component='h1'>
        TOTAL
       </Typography>
      <TextField
  id="outlined-basic"
  variant="outlined"
  style={{
    width: '40%',
    margin: '10px 0',
    borderRadius: '4px',
    backgroundColor: '#f4f4f4',
    boxShadow: '0 2px 4px 0 rgba(0,0,0,0.10)',
    padding: '6px 6px',
    fontSize: '100px',
  }}
  InputLabelProps={{
    style: {
      fontSize: '14px',
      color: '#666',
    },
  }}
  InputProps={{
    style: {
      fontSize: '14px',
    },
  }}
  defaultValue='0'
  value={total}
/>
      
      <Typography id='modal-description' sx={{ mt: 2 }}>
      <Button 
  variant="contained"
  style={{fontWeight:"bold",margin:"0px 0px 0px 55px"
  }}
>
  ADD
</Button>
        {/* Add a form here to collect information about the new scheme */}
      </Typography>
    </Box>
  </Modal>

  <Modal
    open={view}
    onClose={viewClose}
    aria-labelledby='modal-title'
    aria-describedby='modal-description'
    
   
  >
    
    
    <Box sx={styles.modal} style={{borderRadius:'16px'}} >
      <JewellerSchemeTable/>
     <Typography id='modal-description' sx={{ mt: 2 }}>
      {/* <Button variant="contained" style={{fontWeight:"bold",margin:"0px 0px 0px 330px"}}>
        ADD</Button> */}
        
      </Typography>
    </Box>
  </Modal>
  
  
</div>
 );
};

export default JewellerHome;