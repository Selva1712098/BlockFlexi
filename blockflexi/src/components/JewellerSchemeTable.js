import React, { useState,useEffect } from "react";

import {  Card, CardContent, Typography, CardActions, Button,Paper,Grid } from '@mui/material';

import axios from "axios";

function JewellerSchemeTable({jewellerid}) {
  
  const[schemes,setSchemes]=useState('');
  async function deletescheme(scheme){
    const schemeid=scheme.SchemeID
    console.log(jewellerid,schemeid)
    await axios.delete('http://localhost:5000/DeleteScheme',{data:{
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
        // Make a GET request to the /schemes API endpoint
        const response = await axios.post("http://localhost:5000/JewellerScheme",{jewellerid}).then(res=>{
          if(res.data.status==='success'){
            setSchemes(res.data.schemes)
          }
          else{
            alert("There is no jeweller ")
          }
        });

        // Set the retrieved schemes in the state
       
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, [jewellerid]);

  return (
    <Box style={{backgroudImage:'linear-gradient(to bottom, #BF8F91, #CAA2A3, #D4B5B5, #DFC7C8)',borderRadius:'16px'}} sx={{ padding:"0px" }}>
      <Button
        style={{ margin:'0px 0px 30px 120px', fontWeight: "bold" }}
        variant="contained"
        color="success"
        onClick={handleAddJewel}
      >
        ADD SCHEMES
      </Button>
      <TableContainer component={Paper} variant="outlined" style={{backgroundImage:'linear-gradient(to bottom, #BF8F91, #CAA2A3, #D4B5B5, #DFC7C8)'}}>
        <Table>
          <TableHead>
            <TableRow >
              <TableCell style={{ fontWeight: "bold" }}>SCHEMES</TableCell>
              <TableCell style={{ fontWeight: "bold",margin:'0px 0px 0px 200px' }}>DELETE SCHEME</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[...Array(5)].map((_, index) => (
              <TableRow key={index}>
                <TableCell style={{ fontSize: "16px" }}></TableCell>
                <TableCell>
                  {index > -1 && (
                    <Button
                      style={{
                        fontSize: "13px",
                        fontWeight: "bold",
                        margin:'0px 0px 0px 100px',
                        
                      }}
                      variant="contained"
                      color="error"
                      onClick={() => handleDeleteJewel(index)}
                    >
                      Delete
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default JewellerSchemeTable;
