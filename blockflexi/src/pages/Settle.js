import React, { useState,useEffect } from 'react';
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { useCookies } from 'react-cookie';
import Web3 from'web3';
import abi from "../contracts/FlexiScheme.json"

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
  const jewellername=token.name
  const[customername,setcusname]=useState(null)
  // const[months,setMonths]=useState(null)
  const[balance,setBalance]=useState(null)
  const [isloading,setisLoading]=useState(true)
  const[open,setOpen]=useState(false)
  const contractaddress="0xfEdB6cbf8a55D553eECc93dE4e7839C81266379e"
  const[scheme,setScheme]=useState(null)
  const[user,setUser]=useState([])
  const handleSettleClick = (row) => {
    setSelectedRow(row);
    setOpenDialog(true);
  };
  async function connect() {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.enable();
        const accounts = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();
        if (networkId !== 51) {
          alert("Please connect to XDC Wallet")
          throw new Error("Please connect to XDC network.");
         
        }
        return { web3, accounts };
      } catch (error) {
        alert("Please Create an account in the XDC Xinfin network")
        throw new Error("Please connect to Metamask to connect to XDC network.");
      }

    } else {
      alert("Please install XDC pay Extension")
      throw new Error("Please install Metamask to connect to XDC network.");
    }
  }
 useEffect(()=>{
 
  connect()
 },[]) 
  const opendetails=(row)=>{
    setOpen(true)
    getdetails(row)

  }
  
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const getdetails=async (data)=>{
    const { web3 } = await connect();
    
      
     
        const bfcontract = new web3.eth.Contract(abi, contractaddress);
    console.log(bfcontract);
    const blockdata=userid.find(user=>user.CustomerID===data.CustomerID)
    console.log(blockdata);
    const schemeName=blockdata.SchemeName
    setScheme(schemeName)
    console.log(jewellername,schemeName)
    try{
      const _customername=data.CustomerName

      const _jewellername=jewellername
      const _schemename=schemeName
      setcusname(_customername)
      

      const getBalance= await bfcontract.methods.getBalance(_customername,_jewellername,_schemename).call()
      // const monthspaid=await bfcontract.methods.getMonthsPaid(_customername,_jewellername,_schemename).call()
      console.log(getBalance)
      setBalance(getBalance)
      // setMonths(monthspaid)

    }catch(e){
      console.log(e)
    }




  }
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
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        maxWidth="xs"
        fullWidth
       
        scroll='paper'
        
      >
        <DialogTitle>
            <Typography variant='h5' sx={{fontWeight:'bold',fontFamily:'Libre Baskerville,serif'}}>CUSTOMER DETAILS</Typography></DialogTitle>
            
        <DialogContent>
          
           <DialogContentText>
              <Typography style={{fontFamily:'Libre Baskerville,serif'}} variant="h6"  gutterBottom>
                Name: {customername}
              </Typography>
             
              <Typography style={{fontFamily:'Libre Baskerville,serif'}} variant="h6"   gutterBottom>
                SchemeName: {scheme}
              </Typography>
              <Typography style={{fontFamily:'Libre Baskerville,serif'}} variant="h6"   gutterBottom>
                Amount to be paid:{balance}
              </Typography>
              <Typography style={{fontFamily:'Libre Baskerville,serif'}} variant="h6"   gutterBottom>
                Bank Payment Status :Completed
              </Typography>
              
              </DialogContentText>
         
        </DialogContent>
            <DialogActions>
          <Button style={{fontFamily:'Libre Baskerville,serif'}} variant='contained'  size='small'  onClick={() => setOpen(false)}>Ok</Button>
          </DialogActions>
      </Dialog>

      <Typography 
        variant="h4" 
        align="center" 
        style={{ 
          marginTop: '2rem', 
          marginBottom: '2rem',
          fontFamily:'Libre Baskerville,serif',
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
              <TableCell style={{  backgroundColor: '#9a1b56', color: 'white', fontSize: '1.2rem',fontFamily:'Libre Baskerville,serif' }}><b>S.NO</b></TableCell>
              <TableCell style={{  backgroundColor: '#9a1b56', color: 'white', fontSize: '1.2rem',fontFamily:'Libre Baskerville,serif' }}><b>CUSTOMER NAME</b></TableCell>
              <TableCell style={{ backgroundColor: '#9a1b56', color: 'white', fontSize: '1.2rem',fontFamily:'Libre Baskerville,serif'}}><b>LOAN APPROVED</b></TableCell>
              <TableCell style={{  backgroundColor: '#9a1b56', color: 'white', fontSize: '1.2rem',fontFamily:'Libre Baskerville,serif' }} align='left'><b>BANK PAYMENT</b></TableCell>
              <TableCell style={{  backgroundColor: '#9a1b56', color: 'white', fontSize: '1.2rem',fontFamily:'Libre Baskerville,serif' }}><b>SETTLE GOLD</b></TableCell>
            </TableRow>
           
          </TableHead>
          
          <TableBody>
            
             
            {user.map((row,index) => (
              <TableRow
                
               
          >
            <TableCell>{index+1}</TableCell>
            <TableCell>{row.CustomerName}</TableCell>
          

            <TableCell>Yes</TableCell>
            <TableCell><Button variant ='contained' style={{backgroundColor:'#9a1b56'}} onClick={()=>{
              opendetails(row)
            }}><b>See Details</b></Button></TableCell>
            <TableCell>
              <Button
                variant="contained"
               
                
                onClick={() => handleSettleClick(row)}
                style={{backgroundColor:'#9a1b56'}}
              ><b>
                SETTLE GOLD</b>
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