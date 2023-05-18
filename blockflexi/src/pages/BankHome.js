import React, { useState ,useEffect} from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  
  DialogActions,Slide, DialogContentText, Grid
} from "@mui/material";
import {useCookies }from 'react-cookie'
import {useNavigate} from 'react-router-dom'
import jwt_decode from 'jwt-decode'
// import axios from "axios";
import axios from '../integration'

import { Circles } from  'react-loader-spinner'
import Web3 from'web3';
import abi from "../contracts/FlexiScheme.json"
import Header from "../components/Header";
import BankHeader from "../components/BankHeader";
function createData(Sno, name, Phone_No, Payment_Status, Months_paid, PANNo) {
  return { Sno, name, Phone_No, Payment_Status, Months_paid, PANNo };
}
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const highlightedRowStyle = {
 
  // transform: 'scale(1.00)',
  transition:'all 0.3s ease-in-out',

  boxShadow:'0 0px 10px 15px rgba(0,0,0,0.1)'
};
export default function BankHome() {
  const [open, setOpen] = useState(false);
  
  const [selectedUser, setSelectedUser] = useState(null);
  const[userid,setUserId]=useState([])
  const[user,setUser]=useState([])
  const[customername,setcusname]=useState(null)
  const[jeweller,setjeweller] = useState(null)
  const[schemename,setscheme]=useState(null)
  const[balance,setBalance]=useState(null)
  const[cookies,setCookie,removeCookie]=useCookies(['bank_sessionId'])
  const navigate=useNavigate()
  const token=jwt_decode(cookies.bank_sessionId)
  const bankid=token.id
  const [isloading,setisLoading]=useState(true)
  const contractaddress="0xfEdB6cbf8a55D553eECc93dE4e7839C81266379e"
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
  useEffect(()=>{
    if(token.name!=='YourBank'){
      alert('you are not logged in , please login')
      navigate('/')
    }
  },[token,navigate])
  function handleDialogOpen(user) {
    setOpen(true);
    getdetails(user)
    setSelectedUser(user);
    
  }
  function handleLogout(){
    removeCookie('bank_sessionId');
    navigate('/',{replace:true});

  }
  function handleuserid(data){
    setUserId(data)
  }
  const handleUsers=(data)=>{
    setUser(data)
  }
  const passdata=(data)=>{
    const blockdata=userid.find(user=>user.CustomerID===data.CustomerID)
    const jewellername=blockdata.JewellerName
    const schemename=blockdata.SchemeName
    const customerid=blockdata.CustomerID
    const jewellerid=blockdata.JewellerID
    const schemeid=blockdata.SchemeID

    navigate(`/BankPayment/${customerid}/${jewellerid}/${schemeid}`,{state:{customername:data.CustomerName,jewellername:jewellername,schemename:schemename,bankid:bankid}})
  }
  const getdetails=async (data)=>{
    const { web3, accounts } = await connect();
    
      
     
        const bfcontract = new web3.eth.Contract(abi, contractaddress);
    console.log(bfcontract);
    const blockdata=userid.find(user=>user.CustomerID===data.CustomerID)
    const jewellername=blockdata.JewellerName
    const schemename=blockdata.SchemeName
    console.log(jewellername,schemename)
    setjeweller(jewellername)
      setscheme(schemename)
    try{
      const _customername=data.CustomerName

      const _jewellername=jewellername
      const _schemename=schemename
      setcusname(_customername)
      

      const getBalance= await bfcontract.methods.getBalance(_customername,_jewellername,_schemename).call()
      console.log(getBalance)
      setBalance(getBalance)

    }catch(e){
      console.log(e)
    }


  }
  const apprequest=async(row)=>{
    console.log(row)
    const schemeid=userid.find(user=>user.CustomerID===row.CustomerID)
    await axios.put("/CustomerSchemeEdit",{
  customerid:row.CustomerID,
  jewellerid:schemeid.JewellerID,
  schemeid:schemeid.SchemeID,
  loanstatus_bank:"yes",
  bankid
  }).then(res=>{
  if(res.data.status==='approved'){
    alert(`${row.CustomerName}'s request has been approved`)
    window.location.reload()
  }
  else{
    alert(`No change has been made to ${row.CustomerName}`)
    window.location.reload()
  
  }
  })
  }
  const rjtrequest=async(row)=>{
   // console.log(row)
    const schemeid=userid.find(user=>user.CustomerID===row.CustomerID)
    console.log(schemeid)
    await axios.put("/CustomerSchemeEdit",{
    customerid:row.CustomerID,
    jewellerid:schemeid.JewellerID,
    schemeid:schemeid.SchemeID,
  loanstatus_bank:"no",
  bankid
    }).then(res=>{
    if(res.data.status==='rejected'){
      alert(`${row.CustomerName}'s request has been rejected`)
      window.location.reload()
  
    }
    else{
      alert(`No change has been made to ${row.CustomerName}`)
      window.location.reload()
  
    }
    })
    }
  useEffect(()=>{
    
    async function getUserID(){
      try{
      await axios.get("/CustomerSchemesJwStatus").then(res=>{
        if(res.data.response3){
          console.log('id',res.data.response3)
          handleuserid(res.data.response3)
          
          
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
           
           await axios.get('/GetUsers').then(res=>{
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
      
       
       /></div>
        }
       
 
  return (
    <>
      <BankHeader />

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        maxWidth="xs"
        fullWidth
        TransitionComponent={Transition}
        scroll='paper'
        
      >
        <DialogTitle>
            <Typography variant='h5' sx={{fontWeight:'bold',fontFamily:'Roboto'}}>CUSTOMER DETAILS</Typography></DialogTitle>
            
        <DialogContent>
          
           <DialogContentText>
              <Typography variant="h6"  gutterBottom>
                Name: {customername}
              </Typography>
              <Typography variant="h6"  gutterBottom>
                JewellerName: {jeweller}
              </Typography>
              <Typography variant="h6"   gutterBottom>
                SchemeName: {schemename}
              </Typography>
              <Typography variant="h6"   gutterBottom>
                Amount to be paid:{balance}
              </Typography>
              
              </DialogContentText>
         
        </DialogContent>
            <DialogActions>
          <Button variant='contained'  size='small'  onClick={() => setOpen(false)}>Ok</Button>
          </DialogActions>
      </Dialog>
      <br/>
      <br/>
      <br/>
      <br/>
      <div
        style={{
          height: "140px",
          display: "flex",
          fontFamily:'Libre Baskerville,serif',
          justifyContent: "center",
          alignItems: "center",
          
        }}
      >
        <h1><b>INCOMING REQUESTS</b></h1>
        <Button variant="contained" onClick={handleLogout} style={{backgroundColor:'#9A1B56',right:'20%',left:'19%',top:'6%'}}><b>Logout</b></Button>
      </div>
      <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexFlow:'column'}}>
      
      
        
        <TableContainer component={Paper} sx={{ maxHeight: "400px",maxWidth:'900px',margin:'auto',borderRadius:'15px'}} >
       
       <Table aria-label="simple table"  >
         <TableHead >
           <TableRow>
             <TableCell sx={{ fontWeight: "medium", fontSize: "18px",fontFamily:'Libre Baskerville,serif',backgroundColor:'#9A1B56',color:'white' }}>
               S.NO
             </TableCell>
             <TableCell
               align="left"
               sx={{ fontWeight: "medium", fontSize: "18px" ,fontFamily:'Libre Baskerville,serif',backgroundColor:'#9A1B56',color:'white'}}
             >
               NAME
             </TableCell>
             <TableCell
               align="left"
               sx={{ fontWeight: "medium", fontSize: "18px" ,fontFamily:'Libre Baskerville,serif',backgroundColor:'#9A1B56',color:'white'}}
             >
              PHONE NO
             </TableCell>
             <TableCell
               align="left"
               sx={{ fontWeight: "medium", fontSize: "18px",fontFamily:'Libre Baskerville,serif',backgroundColor:'#9A1B56',color:'white' }}
             >
              DETAILS
             </TableCell>
             <TableCell
               align='left'
               sx={{ fontWeight: "medium", fontSize: "18px",fontFamily:'Libre Baskerville,serif',backgroundColor:'#9A1B56',color:'white'}}
             >
              APPROVAL
             </TableCell>
            
           </TableRow>
         </TableHead>
         <TableBody>
           {user.map((row,index) => (
             <TableRow key={row.CustomerName} sx={{ '&:hover': highlightedRowStyle }} >
               <TableCell align="left" sx={{ fontSize: "16px" }}>
                 {index+1}
               </TableCell>
               <TableCell align="left" sx={{ fontSize: "16px" }}>
                 {row.CustomerName}
               </TableCell>
               <TableCell align="left" sx={{ fontSize: "16px" }}>
                 {row.MobileNo}
               </TableCell>
               <TableCell align="left">
                 <Button style={{fontFamily:'Libre Baskerville,serif'}}
                   variant="contained"
                   size="small"
                   sx={{padding:'8px'}}
                   onClick={() => handleDialogOpen(row)}
                 >
                   <b>See Details</b>
                 </Button>
               </TableCell>
               <TableCell align="center">
                 <Stack direction="row" alignItems="center" spacing={3}>
                   <Button style={{fontFamily:'Libre Baskerville,serif'}} variant="contained" size ="small" sx={{padding:'8px'}} color="success" onClick={()=>{passdata(row)}}>
                     <b>Approve</b>
                   </Button>
                   <Button style={{fontFamily:'Libre Baskerville,serif'}} variant="contained" size ="small" sx={{padding:'8px'}} color="error" onClick={()=>{rjtrequest(row)}}>
                     <b>Reject</b>
                   </Button>
                 </Stack>
               </TableCell>
              
             </TableRow>
           ))}
         </TableBody>
       </Table>
       
     </TableContainer>
     </div>
       
      
    </>
  );
}