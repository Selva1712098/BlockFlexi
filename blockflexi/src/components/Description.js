import React from 'react'
import {Grid,Typography,Stack,Button} from '@mui/material'
import {Card,CardContent,CardActions,CardMedia} from '@mui/material';


function Description() {
    const [activeButton, setActiveButton] = React.useState('customer');
  
  let cardTitle;
  let cardContent;
  let cardMedia;
  
  if (activeButton === 'customer') {
    cardTitle= <Typography variant="h4" component="h2" style={{marginRight:'320px',}}>Customer</Typography>
    cardContent = <Typography variant="body1" component="p" style={{textAlign:'justify',margin:'3px 8px 3px 15px'}}>Unlock the Power of Gold with our Platform - Buy Now and Invest in Timeless Value. With our Secure and Reliable System, You Can Own Your Very Own Piece of History Today.</Typography>;
    cardMedia=<CardMedia component='img' height='210' image='https://digitalmarketingdeal.com/blog/wp-content/uploads/2020/07/Top-10-Famous-Jewellers-in-India.jpg?x27618://img.etimg.com/thumb/msid-67738640,width-1200,height-900,imgsize-209853,overlay-economictimes/photo.jpg' alt='customer details'/>
  } else if (activeButton === 'jeweller') {
    cardTitle= <Typography variant="h4" component="h2" style={{marginRight:'340px'}}>Jeweller</Typography>
    cardContent = <Typography variant="body1" component="p" style={{margin:'3px 8px 3px 15px',textAlign:'justify'}}>Experience the Power of Blockchain Technology with Our Revolutionary Solution. Secure, Transparent and Trustworthy - Our Platform Provides a Cutting-Edge Solution for Your Gold Scheme Needs. Register Now and Discover a Better Way to Do Business!</Typography>;
    cardMedia=<CardMedia component='img' height='210' image='https://www.designhill.com/design-blog/wp-content/uploads/2015/11/1-min.jpg' alt='customer details'/>
  } else {
    cardTitle= <Typography variant="h4" component="h2" style={{marginLeft:'15px',marginRight:'410px'}}>Bank</Typography>
    cardContent = <Typography variant="body1" component="p" style={{margin:'3px 8px 3px 15px',textAlign:'justify'}}>Join the Blockchain Revolution with Our Platform - The Future of Secure and Profitable Investments. Partner with Us Today and Access a New World of Financial Opportunities</Typography>;
    cardMedia=<CardMedia component='img' height='210' image='https://thumbs.dreamstime.com/b/bank-building-icon-isolated-black-background-bank-building-icon-isolated-black-background-simple-vector-logo-161293296.jpg' alt='customer details'/>
  }
  return (
    <div>
        <div style={{ display: 'flex' ,flexWrap:'row wrap'}}>
    <Card style={{ display: 'flex' ,flexDirection:'column',margin:'120px 0 0 40px',maxHeight:'220px',backgroundColor:' rgb(240,234,220)'}} variant="outlined" >
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
          <Stack spacing={3} direction='row'>
            {/* <ToggleButtonGroup variant='contained'>
              <ToggleButton size="medium" variant="contained" onClick={()=>setActiveButton('customer')}  style={{width:"200px"  }} >Customer</ToggleButton>
              <ToggleButton size="medium"  variant="outlined" onClick={()=>setActiveButton('jeweller')}  style={{width:"200px"}}  >Jeweller</ToggleButton>
              <ToggleButton size="medium"  variant="outlined" onClick={()=>setActiveButton('bank')}  style={{width:"200px"}} >Bank</ToggleButton>
            </ToggleButtonGroup> */}
      <Button size="large" variant="outlined" onClick={()=>setActiveButton('customer')} value={activeButton} style={{width:"200px"  }}>
            Customer
          </Button>
          <Button size="large"  variant="outlined" onClick={()=>setActiveButton('jeweller')} value={activeButton} style={{width:"200px"}}>
            Jeweller
          </Button>
          <Button size="large"  variant="outlined" onClick={()=>setActiveButton('bank')} value={activeButton} style={{width:"200px"}}>
            Bank
          </Button>
          </Stack>
        </CardActions>
        
       
        
      </Card>
      <Card style={{width:'500px',maxHeight:'380px',margin:'120px 40px 0px 40px', backgroundColor:' rgb(240,234,220)'}}  variant='outlined' elevated>
        {cardMedia}
        {cardTitle}
        {cardContent}
      </Card>
      </div>
     <br/>
     <br/>
        <Grid container>
            <Grid item>
                <Typography variant='h4' component='h2' align='center'>
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