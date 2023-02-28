import Header from '../components/Header';
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  
} from '@mui/material'

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    margin:'100px 100px 100px 100px'
    
  },
  card: {
    width: '300px',
    margin: '50px',
    alignSelf: 'flex-start',
    
  },
};

const JewellerHome = () => {
  return(
    <Box>
      <div style={styles.container}>
        <Header/>
        <Card style={styles.card}>
          
          <CardContent>
            <Typography gutterBottom variant='h5' component='div'>
              Schemes
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              an organized plan for doing something, especially something dishonest or illegal that will bring a good result for you: He has a hare-brained/crazy scheme for getting rich before he's 20
            </Typography>
          </CardContent>
          <CardActions>
            
            {/* <Button size='small'>Share</Button> */}
            <Button variant="outlined">View here</Button>
            
          </CardActions>
        </Card>

        <Card style={styles.card}>
          
          <CardContent>
            <Typography gutterBottom variant='h5' component='div'>
              Loan Request
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              A popular React UI framework that provides a set of reusable and customizable components for building modern web applications.Leoleoleoleoleoleo
            </Typography>
          </CardContent>
          <CardActions>
            <div>
            {/* <Button size='small' style={{margin:'10px 10px 10px 10px'}}>Share</Button> */}
            <Button variant="outlined">View here</Button>
            </div>
            
          </CardActions>
        </Card>

        <Card style={styles.card}>
          
          <CardContent>
            <Typography gutterBottom variant='h5' component='div'>
             Gold Settlement
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              A design language created by Google that combines principles of classic design with innovation and technology. MUI is based on Material Design.leoleoleoleoleoleoleoleo
            </Typography>
          </CardContent>
          <CardActions>
            {/* <Button size='small'>Share</Button> */}
            <Button variant="outlined">View here</Button>
            
          </CardActions>
        </Card>
      </div>
    </Box>
  )
}

export default JewellerHome;
