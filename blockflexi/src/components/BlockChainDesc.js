import React from 'react'
import {Grid,Typography} from '@mui/material'
import wave from './images/wave.png'
import image from './images/shubham-dhage-_rZnChsIFuQ-unsplash.jpg'
import './BlockChainDesc.css'

function BlockChainDesc() {
 
  return (
    <Grid container>
      <div style={{display:'flex',justifyContent:'center',alignItems:'center',flex:1}}>
        <Typography  align='center' style={{fontSize:'40px',fontFamily: 'Libre Baskerville,serif'}}>How Blockchain helps?</Typography>
        </div>
        <Grid item sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
            
            <Typography variant='h5' align='left' sx={{margin:'25px 200px 100px 45px',fontFamily: 'Montserrat'}}>Blockchain technology enables our platform to provide a secure and transparent solution for gold acquisition. This technology also enables fast and efficient processing, reducing wait times and allowing for a seamless user experience. Join our platform now and experience the benefits of blockchain technology for yourself!</Typography>
            <div className='container'>
            <img src={image} width="450" height="280" alt='blockchain' style={{
    margin:'30px 25px 0 0'}}/> 
            </div>
           
           
            
        </Grid>
       
       
    </Grid>
  )
}

export default BlockChainDesc