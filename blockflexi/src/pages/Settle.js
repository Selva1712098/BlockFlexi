import React, { useState,useEffect } from 'react';
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { useCookies } from 'react-cookie';


import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Paper,
  Typography
} from "@mui/material";


import { Circles } from  'react-loader-spinner'


function Settle() {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const[userid,setUserId]=useState([])
  const [cookies]=useCookies(['jeweller_sessionId'])
  const token=jwtDecode(cookies.jeweller_sessionId)
  const jewellerid=token.id
  const [isloading,setisLoading]=useState(true)

  const[user,setUser]=useState([])
  const handleSettleClick = (row) => {
    setSelectedRow(row);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const [hoveredRow, setHoveredRow] = useState(null);

  const settlegold=async(row)=>{
    console.log('settlegold',row)
   
    const schemeid=userid.find(user=>user.CustomerID===row.CustomerID )
    console.log(row.CustomerID,jewellerid,schemeid.SchemeID)
    await axios.put("http://localhost:5000/CustomerSchemeEdit",{
  customerid:row.CustomerID,
  jewellerid,
  schemeid:schemeid.SchemeID,
  goldsettle_status:"yes",
  
  }).then(res=>{
  if(res.data.status==='approved'){
    console.log(res.data.response4)
    alert(`${row.CustomerName}'s Gold has been Settled`)
    window.location.reload()
  }
  else{
    alert(`No change has been made to ${row.CustomerName}`)
    window.location.reload()
  
  }
  })
  }
  const handleRowHover = (row) => {
    setHoveredRow(row);
  };
  function handleuserid(data){
    setUserId(data)
  }
  const handleUsers=(data)=>{
    setUser(data)
  }
  const handleRowHoverLeave = () => {
    setHoveredRow(null);
  };
  useEffect(()=>{
    
    async function getUserID(){
      try{
      await axios.get("http://localhost:5000/CustomerSchemesBankStatus").then(res=>{
        if(res.data.response){
          console.log('id',res.data.response)
          const response= res.data.response.filter(user=>user.JewellerID===jewellerid)
          handleuserid(response)
          
          
        }
        else{
          alert('no new leads')
        }
       })
     
  }catch(e){
      console.log(e)
  }
}
 getUserID()
},[])
useEffect(()=>{
  async function getUsers() {
    setisLoading(true)
    try {
      const userIds=userid.map(user=>user.CustomerID)
     
     await axios.get('http://localhost:5000/GetUsers').then(res=>{
        const response =res.data.usercheck
        
        console.log(response)
        const users = response.filter(user => userIds.includes(user.CustomerID));

          console.log(users)
    handleUsers(users)
    setisLoading(false)
   
      })
    
      
    //const users = responses.map(res => res.data.usercheck);
    
  } catch (e) {
    console.log(e);
  }
  }
  getUsers();
}, [userid])

      
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
    <div>
      

      <Typography 
        variant="h4" 
        align="center" 
        style={{ 
          marginTop: '2rem', 
          marginBottom: '2rem',
          fontFamily: 'Montserrat, sans-serif',
          fontSize: '2.5rem',
          fontWeight: 'bold',
          color: 'black',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          padding: '1rem'
        }}
      >
        Approved Customers
      </Typography>

      <TableContainer component={Paper} style={{ maxWidth: '90%', margin: 'auto', borderRadius: '10px' }}>
        <Table>
          <TableHead>
        
          
            <TableRow>
              <TableCell style={{  backgroundColor: '#9a1b56', color: 'white', fontSize: '1.2rem' }}>S.NO</TableCell>
              <TableCell style={{  backgroundColor: '#9a1b56', color: 'white', fontSize: '1.2rem' }}>CUSTOMER NAME</TableCell>
              <TableCell style={{ backgroundColor: '#9a1b56', color: 'white', fontSize: '1.2rem'}}>LOAN APPROVED</TableCell>
              <TableCell style={{  backgroundColor: '#9a1b56', color: 'white', fontSize: '1.2rem' }} align='left'>BANK PAYMENT</TableCell>
              <TableCell style={{  backgroundColor: '#9a1b56', color: 'white', fontSize: '1.2rem' }}>SETTLE GOLD</TableCell>
            </TableRow>
           
          </TableHead>
          
          <TableBody>
            
             
            {user.map((row,index) => (
              <TableRow
                
                style={{ boxShadow: hoveredRow === row ? '0px 0px 10px 5px rgba(0, 0, 0, 0.1)' : 'none' }}
                onMouseEnter={() => handleRowHover(row)}
                onMouseLeave={() => handleRowHoverLeave()}
          >
            <TableCell>{index+1}</TableCell>
            <TableCell>{row.CustomerName}</TableCell>
          

            <TableCell>Yes</TableCell>
            <TableCell>Done</TableCell>
            <TableCell>
              <Button
                variant="contained"
                fontWeight="bold"
                backgroundColor="#9a1b56"
                
                disabled={!hoveredRow || hoveredRow.id !== row.id}
                onClick={() => handleSettleClick(row)}
              >
                SETTLE GOLD
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>

  {selectedRow && (
    <Dialog  open={openDialog} onClose={handleCloseDialog} maxWidth='40px'>
    <DialogTitle style={{ textAlign: 'center' }}>
      <strong>SETTLE GOLD FOR {selectedRow.CustomerName}</strong>
    </DialogTitle>
    <DialogContent>
      <DialogContentText style={{ textAlign: 'center' }}>
        Are you sure you want to settle gold for {selectedRow.CustomerName}?
      </DialogContentText>
    </DialogContent>
    <DialogActions style={{ justifyContent: 'center' }}>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleCloseDialog}
        style={{
          backgroundColor: '#f44336',
          color: '#fff',
          fontWeight: 'bold',
          borderRadius: '4px',
          padding: '8px 16px',
          marginRight: '16px',
        }}
      >
        Cancel
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={()=>settlegold(selectedRow)}
        style={{
          backgroundColor: '#4caf50',
          color: '#fff',
          fontWeight: 'bold',
          borderRadius: '4px',
          padding: '8px 16px',
        }}

       
      >
        Confirm
      </Button>
    </DialogActions>
  </Dialog>
  
  
  )}
</div>
);
}

export default Settle;