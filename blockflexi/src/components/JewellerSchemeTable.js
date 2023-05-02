import React, { useState,useEffect } from "react";

import {  Card, CardContent, Typography, CardActions, Button,Paper,Grid } from '@mui/material';

// import axios from "axios";
import axios from '../integration'
import { Circles } from "react-loader-spinner";

function JewellerSchemeTable({jewellerid}) {
  const[isloading,setisLoading]=useState(true)
  const[schemes,setSchemes]=useState('');
  async function deletescheme(scheme){
    const schemeid=scheme.SchemeID
    console.log(jewellerid,schemeid)
    await axios.delete('/DeleteScheme',{data:{
    jewellerid:jewellerid,schemeid:schemeid
    }}).then(res=>{
      try{
      if(res.data.status==='Deleted'){
        alert('Your scheme has been deleted')
        window.location.reload()
        
      }
      else{
        console.log(res.data.response)
        alert('Something went wrong.Try again')
      }}catch(e){
        console.log(e)
      }
    })
  }
  useEffect(() => {
    async function fetchData() {
      try {
        setisLoading(true)
        // Make a GET request to the /schemes API endpoint
        await axios.get("/JewellerScheme",).then(res=>{
          if(res.data.status==='success'){
            const scheme=res.data.schemes.filter(sc=>sc.JewellerID === jewellerid)
            setSchemes(scheme)
            setisLoading(false)
          }
          else{
            alert("There is no jeweller ")
            setisLoading(false)
          }
        });

        // Set the retrieved schemes in the state
       
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, [jewellerid]);
  if(isloading){
    return <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
     <Circles
   height="40"
   width="40"
   color="#9A1B56"
   ariaLabel="circles-loading"
   wrapperStyle={{}}
   wrapperClass=""
   visible={true}
   value={isloading}
   
   
   /></div>
    }

  return (
    <div >
      <Paper style={{overflow:'auto',maxHeight:'400px',maxWidth:'400px',minWidth:'300px'}}>
      <Grid container  >
      <Typography variant='h5' align='center' mb={2} sx={{fontWeight:'bold'}}>MY SCHEMES</Typography>
      {Array.isArray(schemes) && schemes.map((scheme)=>(
        
        <Grid item >
         
         <Card variant='outlined' spacing={3} style={{minWidth:'400px',marginBottom:'15px'}}>
         <CardContent>
          <Typography variant='subtitle1' sx={{fontWeight:'bold',textTransform:'uppercase'}} gutterbottom>{scheme.SchemeName}
          </Typography>
          

          <Typography variant='subtitle1' sx={{fontWeight:'medium-bold',textTransform:'uppercase'}} >Monthly Installment: {scheme.MonthlyPayment}
            </Typography>
          <Typography variant='subtitle1' sx={{fontWeight:'medium-bold',textTransform:'uppercase'}}  >Total : {scheme.MonthlyPayment*11}
            </Typography></CardContent>
     <CardActions >
      <div style={{position:'relative',top:'0%',bottom:'0%',left:'75%'}}>
      <Button variant='contained' size="small" sx={{padding:'7px'}} color='error' onClick={()=>deletescheme(scheme)}><Typography sx={{fontWeight:'medium-bold'}} variant='body2'>
        DELETE</Typography></Button>
        </div>
     </CardActions>
     
     </Card>
     </Grid>
    
      ))}
       </Grid>
      </Paper>
      
     
</div>
  )
  }
export default JewellerSchemeTable;
