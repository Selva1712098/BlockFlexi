import React,{useState} from 'react'
import {Grid,Typography,Button} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore,{ Navigation, Pagination, Scrollbar, A11y,Autoplay } from 'swiper'
// import image from './images/banking-finance-technologyisometric-illustration-bank-600w-1982321081-transformed.jpg'
import 'swiper/css'
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay'
import 'swiper/swiper.min.css'
import 'swiper/swiper-bundle.min.css'

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);
function Description() {
    // const [activeButton, setActiveButton] = React.useState('customer');
    const Navigate= useNavigate()
    //const [activeIndex, setActiveIndex] = useState(0);

  //   function goToNextSlide() {
  //     console.log('nextslide')
  //     if (activeIndex < 2) {
  //       setActiveIndex(activeIndex + 1);
      
  //     }
      
  //   }
  
  //   function goToPrevSlide() {
  //     console.log('prevslide')
  //     if (activeIndex > 0) {
  //       setActiveIndex(activeIndex - 1);
  //     }

  //   }
  //   function onSlideChange(swiper){
  //     console.log('Active index:', activeIndex);
  // console.log('Swiper active index:', swiper.activeIndex);
  // setActiveIndex(swiper.activeIndex);
  //   }
  return (
    <div>
      

     
       
       
     
    <Swiper
    //key={activeIndex}
    modules={[ Pagination, Scrollbar, A11y,Autoplay]}
    spaceBetween={100}
    disableOnInteraction= {true}
    // initialSlide={activeIndex}    
   autoplay={
    {delay:3000,
      disableOnInteraction: true,
      pauseOnMouseEnter: true,

    }
   }
   navigation
   // onSlideChange={onSlideChange}
   
   pagination={{clickable:true}}
    scrollbar={{ draggable: true }}
    grabCursor={true}>
      
      <SwiperSlide> <Grid container>
        <Grid item sx={{backgroundImage:'url(https://wallpaperaccess.com/full/3713543.jpg)',backgroundSize:'cover',backgroundPosition: 'right',height:'550px',width:'100%', ':hover':{opacity:'1',transform: 'scale(1.01)', transition:'all 0.3s ease-in-out'}}} >
        <div style={{margin:'4px 510px 0 10px',}}>
        <Typography sx={{color:'white',fontFamily: 'Libre Baskerville,serif',fontStyle:'ital'}} variant='h4' align='left' >Customer</Typography>
       
        <Typography sx={{color:'white',fontFamily: 'Montserrat',fontStyle:'italic'}} variant='h5' align='left'>Invest in Timeless value with Secure Gold Ownership Through 
        Our Reliable Platform.
        <br/>
        Buy Now and Own your Piece 
       of History.</Typography>

        </div>
        <Button variant='standard' sx={{marginLeft:'12px',marginTop:'15px',color:'white',fontFamily:'Libre Baskerville,serif',border:'solid 1px','&:hover':{
        color:'black',
        
        backgroundColor:'White',
        transition:'all 0.3s linear'
      }}} onClick={()=>{Navigate('/Customer/Login')}} >Login</Button>

        </Grid>
        </Grid>
        
 </SwiperSlide>
        <SwiperSlide>
        <Grid container>
      <Grid item sx={{backgroundImage:'url(https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1633&q=80)',height:'550px',width:'100%',backgroundSize:'cover',backgroundPosition: 'center', ':hover':{opacity:'1',transform: 'scale(1.01)', transition:'all 0.3s ease-in-out'}}} >
       
        <div style={{margin:'10px 0px 0 25px',}}>
        <Typography sx={{color:'white',fontFamily:'Libre Baskerville,serif',}} variant='h4' align='left' gutterbottom>Jeweller</Typography>
        <Typography sx={{color:'white',fontFamily: 'Montserrat',fontStyle:'italic'}} variant='h5' align='left'>Revolutionize Your Gold Schemes with Our Secure and Transparent Blockchain Solution. 
        <br/>Register Now for a Better Way to Do Business</Typography>

        </div>
      <Button variant='standard' sx={{marginLeft:'25px',marginTop:'15px',color:'white',fontFamily:'Libre Baskerville,serif',border:'solid 1px','&:hover':{
        color:'black',
        backgroundColor:'white',
        transition:'all 0.3s linear'
      }}} onClick={()=>{Navigate('/Jeweller/Login')}}>Login</Button>

       
        </Grid>
        </Grid>
       
        </SwiperSlide>
        <SwiperSlide>  
        <Grid container>
      <Grid item sx={{backgroundImage:`url(https://www.shutterstock.com/image-vector/internet-banking-technology-conceptisometric-illustration-260nw-1960426480.jpg)`,backgroundSize:'cover',height:'550px',width:'100%', ':hover':{opacity:'1',transform: 'scale(1.01)', transition:'all 0.3s ease-in-out'}}} >
        <div style={{margin:'10px 320px 0 10px',backgroundColor:'rgba(0,0,0,0.1)'}}>
        <Typography sx={{color:'white',fontFamily:'Libre Baskerville,serif'}} variant='h4' align='left' gutterbottom>Bank</Typography>
        <Typography sx={{color:'white',fontFamily: 'Montserrat',fontStyle:'italic'}} variant='h5' align='left'>Join the Blockchain Revolution with Our Platform - The Future of Secure and Profitable Investments. Partner with Us Today and Access a New World of Financial Opportunities</Typography>
        </div>
        <Button variant='standard' sx={{marginLeft:'15px',marginTop:'15px',color:'white',fontFamily:'Libre Baskerville,serif',border:'solid 1px','&:hover':{
        color:'black',
        backgroundColor:'white',
        transition:'all 0.3s linear'
      }}} onClick={()=>{Navigate('/Bank/Login')}}>Login</Button>

        </Grid>
        </Grid> 
                </SwiperSlide>
      
        .
    </Swiper>
       
            
      
      
     
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <Grid container >
            <Grid item sx={{'&:hover':{ transform: 'scale(1.03)',
  transition:'all 0.3s ease-in-out'}}}>
                <Typography variant='h4' component='h2' align='center' gutterBottom sx={{fontFamily:'Libre Baskerville,serif'}}>
                    What is BlockFlexi
                </Typography>
                <Typography variant='h5' component='h3' align='center' sx={{fontFamily:'Montserrat'}}>
                Block-Flexi is a blockchain-based solution designed to facilitate a flexible jewellery scheme. The system integrates with jewellery and banking institutions to provide customers with a secure and trustworthy way to acquire jewellery. 
                </Typography>
               
            </Grid>
            {/* <Grid item sx={{display:'flex',justifyContent:'center',alignSelf:'center'}}>
            <Typography  variant='h4' align='center'>
              What is BlockChain?
            </Typography>
            
            </Grid> */}
           
           
        </Grid>
    </div>
  )
}

export default Description