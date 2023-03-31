import Header from '../components/Header';
import {useNavigate} from 'react-router-dom';
import { useState } from 'react';
import { Box, Card, CardContent, Typography, CardActions, Button, Modal,TextField } from '@mui/material';
import JewellerSchemeTable from '../components/JewellerSchemeTable';
import axios from 'axios';
import jwt_decode from 'jwt-decode'
import {useCookies} from 'react-cookie'



// style

const styles = {
  text: {
    fontFamily: 'Arial, sans-serif', 
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
    backgroundColor:'white'
  },
};
// use state variable

const JewellerHome = () => {
  const [open, setOpen] = useState(false);
  const [view,setView] = useState(false);
  const [SchemeName, setSchemeName] = useState("");
  const [SchemeDetails, setSchemeDetails] = useState("");
  const [MonthlyPayment, setMonthlyPayment] = useState("");
  const[cookies,setCookie,removeCookie]=useCookies(['jeweller_sessionId'])
  
  const token=jwt_decode(cookies.jeweller_sessionId)
  const JewellerID=token.id
 
  const navigate=useNavigate()
  const handleOpen = () => {
    setOpen(true);
  };
  
  
  
  const handleClick=()=>{
    
    navigate('/request')
    
  }
  const handleClick1=()=>{
    
    navigate('/settle')
    
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
  const handleName = (event) => {
    setSchemeName(event.target.value);
    };
    
    const handleDetails = (event) => {
    setSchemeDetails(event.target.value);
    };
    
    const handleMonthlyPayment = (event) => {
    setMonthlyPayment(event.target.value);
    };
    async function scheme(event){
      event.preventDefault();
      await axios.post("http://localhost:5000/scheme",{
        JewellerID,
        SchemeName,
        SchemeDetails,
        MonthlyPayment
      }).then(res=>{
        if(res.data.status==='ok'){
          console.log(res.data)
          alert("Scheme Added")
          // navigate('/Customer/login')
    }
        else if(res.data.status==='exists'){
          alert("You are already a part of us")
          // navigate('/Customer/login')
        }
      }).catch(e=>{
        alert("wrong details")
        console.log(e);
      })
    }
  
    return (
      <div>
        <Header/>
        <br/> <br/><br/>
        <Box sx={{ display: 'flex',flexDirection: 'column', gap: '16px' }}>
    <Card sx={{ flex: 1}}>
      <CardContent>
      <Typography 
  variant='h4' 
  component='div'  style={{fontFamily:'Poppins'}} gutterBottom>
    SCHEMES
  </Typography>
  
  <div>
    <Typography variant='h5' sx={{fontStyle:'italic',fontFamily:'Popins'}}>Add your wonderful schemes here.</Typography>
    
  
  </div>
      </CardContent>
      <CardActions sx={{display:'flex',justifyContent:'flex-end',alignItems:'flex-end'}}>  
              <Button sx={{backgroundColor:'#9A1B56',fontWeight:'bold',color:'white','&:hover':{
                backgroundColor:'#9A1B56'
              }}} variant='standard'  onClick={handleOpen}>ADD SCHEMES</Button>
              
              <Button sx={{backgroundColor:'#9A1B56',fontWeight:'bold',color:'white','&:hover':{
                backgroundColor:'#9A1B56'}}}  variant="contained" onClick={viewOpen}>VIEW SCHEMES</Button>
              
                </CardActions>
    </Card>
    <Card sx={{ flex: 1}}>
    <CardContent>
              <Typography 
  variant='h4' 
  component='div'  style={{fontFamily:'Poppins',}} gutterBottom>
    LOAN REQUESTS
  </Typography>
  
  <div>
    <Typography variant='h5' sx={{fontStyle:'italic',fontFamily:'Popins'}}> View the loan requests made by the customer</Typography>
    
  </div>
  
              </CardContent>
              <CardActions sx={{display:'flex',justifyContent:'flex-end',alignItems:'flex-end'}}>  
             
              <Button sx={{backgroundColor:'#9A1B56',fontWeight:'bold',color:'white','&:hover':{
              backgroundColor:'#9A1B56'}}}  variant="contained" onClick={()=>{navigate('/request')}}>VIEW REQUESTS</Button>
              </CardActions>
             
    </Card>
    <Card sx={{ flex: 1 }}>
      <CardContent>
      <Typography 
  variant='h4' 
  component='div'  style={{fontFamily:'Poppins'}} gutterBottom>
    SETTLE GOLD
  </Typography>
  
  <div>
    <Typography variant='h5' sx={{fontStyle:'italic',fontFamily:'Popins'}}>Click here to settle the gold for customers</Typography>
  
  </div>
  
               </CardContent>
               <CardActions sx={{display:'flex',justifyContent:'flex-end',alignItems:'flex-end'}}>  
               <Button sx={{backgroundColor:'#9A1B56',fontWeight:'bold',color:'white','&:hover':{
               backgroundColor:'#9A1B56'}}}  variant="contained" onClick={()=>{navigate('/settle')}}>SETTLE GOLD</Button>
               </CardActions>
      
    </Card>
  </Box>
      
      <Modal 
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-title'
      aria-describedby='modal-description'
    >
      
      <Box style={{borderRadius: '16px' }} sx={styles.modal}>
      <form onSubmit={scheme} action='POST'>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
        <Typography style={{fontSize:'20px',fontWeight:'bold'}}id='modal-title' variant='h'  component='h2'>
          SCHEME NAME</Typography>
          <TextField 
    id="outlined-basic"
    variant="outlined"
    name='SchemeName'
    value={SchemeName}
    onChange={handleName}
    style={{
      marginLeft:'36px',
      borderRadius: '4px',
      boxShadow: '0 2px 4px 0 rgba(0,0,0,0.10)',
      fontSize: '40px',
      
    }}
    InputLabelProps={{
      style: {
        fontSize: '14px',
        color: 'red',
      },
    }}
    InputProps={{
      style: {
        fontSize: '14px',
      },
    }}/>
  
      </div>
      <div style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:'30px'}}>
      <Typography style={{fontSize:'20px',fontWeight:'bold'}}id='modal-title' variant='h'  component='h2'>
          SCHEME DETAILS</Typography>
          <TextField
    id="outlined-basic"
    variant="outlined"
    name='SchemeDetails'
    value={SchemeDetails}
    onChange={handleDetails}
    style={{
      marginLeft:'20px',
      borderRadius: '4px',
      boxShadow: '0 2px 4px 0 rgba(0,0,0,0.10)',
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
      </div>
  
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:'30px'}}>
        <Typography style={{fontSize:'20px',fontWeight:'bold',}}id='modal-title' align='center' variant='h'  component='h1'>
          TOTAL
         </Typography>
        <TextField
    id="outlined-basic"
    variant="outlined"
    name='MonthlyPayment'
    value={MonthlyPayment}
   onChange={handleMonthlyPayment}
    style={{ marginLeft:'120px', borderRadius: '4px', boxShadow: '0 2px 4px 0 rgba(0,0,0,0.10)', fontSize: '100px',
    }}
    InputLabelProps={{
      style: {
        fontSize: '20px',
        color: '#666',
      },
    }}
    InputProps={{
      style: {
        fontSize: '14px',
      },
    }}/>
  
        </div>
        <Typography id='modal-description' sx={{ mt: 6 }}>
        <Button type='submit'
    variant="contained"
    style={{fontWeight:"bold",margin:"0px 0px 0px 160px",backgroundColor:'#81b735',padding:'8px 30px 8px 30px',fontSize:'15px'
    }}
  >
    ADD
  </Button>
          
        </Typography>
        </form>
      </Box>
    </Modal>
    <Modal
      open={view}
      onClose={viewClose}
      aria-labelledby='modal-title'
      aria-describedby='modal-description'>
  
      <Box sx={styles.modal} style={{borderRadius:'16px'}} >
        <JewellerSchemeTable jewellerid={JewellerID}/>
       <Typography id='modal-description' sx={{ mt: 2 }}>
       </Typography>
      </Box>
    </Modal>
  </div>
   );
  };
  export default JewellerHome;
  