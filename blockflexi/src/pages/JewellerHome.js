import Header from '../components/Header';
import { Box, Card, CardContent, Typography, CardActions, Button } from '@mui/material'

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
    width: '300px',
    height: '350px',
    margin: '50px',
    alignSelf: 'flex-start',
    backgroundColor: '#b3e5fc', 
    boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',
    borderRadius: '10px',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px, rgba(0, 0, 0, 0.15) 0px 3px 8px',
    }
  },
};


const JewellerHome = () => {
  return (
    <div>
      <Header />
      <Box sx={{ bgGradient: 'linear( #fadecb 0%, #fff8e3 100%)' }}>
        <div style={styles.container}>
          <Card style={styles.card}>
            <CardContent>
              <Typography style={{ fontSize: '1.5rem', fontWeight: 'bold' }} gutterBottom variant='h5' component='div'>
                <b>SCHEMES</b>
              </Typography>
              <Typography style={styles.text} variant='body2' color='text.secondary'>
                If you're looking for a smart way to budget for your next jewellery purchase, consider a jewellery scheme. With a jewellery scheme, you can break down the cost of your dream jewellery piece into manageable payments over time. Jewellery schemes are the latest trend in budget-friendly jewellery shopping, offering customers a convenient way to acquire high-value items without breaking the bank.
              </Typography>
            </CardContent>
            <CardActions style={styles.button}>  
              <Button variant="outlined">ADD</Button>  
              <Button variant='outlined'>VIEW</Button>          
            </CardActions>
          </Card>
          <Card style={styles.card}>
            <CardContent>
              <Typography style={styles.title} gutterBottom variant='h5' component='div'>
                <b>LOAN REQUEST</b>
              </Typography>
              <Typography style={styles.text} variant='body2' color='text.secondary'>
                A financial option that allows customers to obtain funds to purchase jewellery without having to pay for it all upfront.
                Typically comes with flexible payment plans and competitive interest rates.
                Makes it easier for customers to manage the cost of their jewellery purchase over time.
              </Typography>
            </CardContent>
            <CardActions style={styles.button}>
              <Button variant="outlined">VIEW REQUEST</Button>
            </CardActions>
          </Card>
          <Card style={styles.card}>
            <CardContent>
            <Typography gutterBottom variant='h5' component='div'>
                <b>GOLD SETTLEMENT</b>
              </Typography>
              <Typography variant='body2' color='text.secondary'>
              Gold Settlement refers to a process where individuals or businesses can sell their gold to a gold dealer or refinery in exchange for payment. 
              The payment can be made in cash, check, or bank transfer, depending on the agreement between the parties involved.
              
              </Typography>
            </CardContent>
            <CardActions>
              <Button variant="outlined">VIEW SETTLE</Button>
            </CardActions>
          </Card>
        </div>
      </Box>
    </div>
  )

}

export default JewellerHome;

