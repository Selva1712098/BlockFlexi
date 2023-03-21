import React from 'react'
import {Grid,Typography,Stack,Button} from '@mui/material'
import {Card,CardContent,CardActions,CardMedia} from '@mui/material';
import {useNavigate} from 'react-router-dom'

function Description() {
    const [activeButton, setActiveButton] = React.useState('customer');
    const Navigate= useNavigate()
  
  let cardTitle;
  let cardContent;
  let cardMedia;
  
  if (activeButton === 'customer') {
    cardTitle= <Typography variant="h5" component="h2" style={{marginRight:'370px',}}>Customer</Typography>
    cardContent = <Typography variant="body1" component="p" style={{textAlign:'justify',margin:'3px 8px 3px 15px'}}>Unlock the Power of Gold with our Platform - Buy Now and Invest in Timeless Value. With our Secure and Reliable System, You Can Own Your Very Own Piece of History Today.</Typography>;
    cardMedia=<CardMedia component='img' height='210' image='https://digitalmarketingdeal.com/blog/wp-content/uploads/2020/07/Top-10-Famous-Jewellers-in-India.jpg?x27618://img.etimg.com/thumb/msid-67738640,width-1200,height-900,imgsize-209853,overlay-economictimes/photo.jpg' alt='customer details'/>
  } else if (activeButton === 'jeweller') {
    cardTitle= <Typography variant="h5" component="h2" style={{marginRight:'380px'}}>Jeweller</Typography>
    cardContent = <Typography variant="body1" component="p" style={{margin:'3px 8px 3px 15px',textAlign:'justify'}}>Revolutionize Your Gold Schemes with Our Secure and Transparent Blockchain Solution. Register Now for a Better Way to Do Business</Typography>;
    cardMedia=<CardMedia component='img' height='210' image='https://www.designhill.com/design-blog/wp-content/uploads/2015/11/1-min.jpg' alt='customer details'/>
  } else {
    cardTitle= <Typography variant="h5" component="h2" style={{marginLeft:'15px',marginRight:'440px'}}>Bank</Typography>
    cardContent = <Typography variant="body1" component="p" style={{margin:'3px 8px 3px 15px',textAlign:'justify'}}>Join the Blockchain Revolution with Our Platform - The Future of Secure and Profitable Investments. Partner with Us Today and Access a New World of Financial Opportunities</Typography>;
    cardMedia=<CardMedia component='img' height='210' image='https://thumbs.dreamstime.com/b/bank-building-icon-isolated-black-background-bank-building-icon-isolated-black-background-simple-vector-logo-161293296.jpg' alt='customer details'/>
  }
  const customerActive=()=>{
    setActiveButton('customer')
    //Navigate('/Customer/login')
    setTimeout(()=>{
        Navigate('/Customer/login')
    },1000)
  }
  const jewellerActive=()=>{
    setActiveButton('jeweller')
    //Navigate('/Jeweller/login')

    setTimeout(()=>{
        Navigate('/Jeweller/login')
    },1000)
  }
  const bankActive=()=>{
    setActiveButton('bank')
    //Navigate('/Bank/login')
    setTimeout(()=>{
        Navigate('/Bank/login')
    },1000)
  }
  return (
    <div>
        
        <Grid container >
      <Grid item>    
    <Card style={{ display: 'flex' ,flexDirection:'column',margin:'120px 0 0 40px',maxHeight:'248px',backgroundColor:' rgb(240,234,220)'}} variant="outlined" >
        <CardContent>
          <Typography variant="h4" component="h2" align='left' gutterBottom>
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
          <Stack spacing={3} direction='row'>
            {/* <ToggleButtonGroup variant='contained'>
              <ToggleButton size="medium" variant="contained" onClick={()=>setActiveButton('customer')}  style={{width:"200px"  }} >Customer</ToggleButton>
              <ToggleButton size="medium"  variant="outlined" onClick={()=>setActiveButton('jeweller')}  style={{width:"200px"}}  >Jeweller</ToggleButton>
              <ToggleButton size="medium"  variant="outlined" onClick={()=>setActiveButton('bank')}  style={{width:"200px"}} >Bank</ToggleButton>
            </ToggleButtonGroup> */}
      <Button size="large" variant="outlined" onClick={customerActive} value={activeButton} style={{width:"200px"  }}>
            Customer
          </Button>
          <Button size="large"  variant="outlined" onClick={jewellerActive} value={activeButton} style={{width:"200px"}}>
            Jeweller
          </Button>
          <Button size="large"  variant="outlined" onClick={bankActive} value={activeButton} style={{width:"200px"}}>
            Bank
          </Button>
          </Stack>
        </CardActions>
        
      </Card>
      </Grid>
      
      <Grid item>
      <Card style={{width:'500px',maxHeight:'380px',margin:'120px 0px 0px 80px', backgroundColor:' rgb(240,234,220)'}}  variant='outlined' >
        {cardMedia}
        {cardTitle}
        {cardContent}
      </Card>
      </Grid>
      </Grid>
      
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <Grid container >
            <Grid item>
                <Typography variant='h4' component='h2' align='center' gutterBottom>
                    What is BlockFlexi
                </Typography>
                <Typography variant='h6' component='h3'>
                Block-Flexi is a blockchain-based solution designed to facilitate a flexible jewellery scheme. The system integrates with jewellery and banking institutions to provide customers with a secure and trustworthy way to acquire jewellery. 
                </Typography>
            </Grid>
            
        </Grid>
    </div>
  )
}

export default Description