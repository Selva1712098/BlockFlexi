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
import Header from "../components/Header";
import {useCookies }from 'react-cookie'
import {useNavigate} from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import axios from "axios";
import { Circles } from  'react-loader-spinner'

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
  const[cookies,setCookie,removeCookie]=useCookies(['bank_sessionId'])
  const navigate=useNavigate()
  const token=jwt_decode(cookies.bank_sessionId)
  const bankid=token.id
  const [isloading,setisLoading]=useState(true)
  
  useEffect(()=>{
    if(token.name!=='YourBank'){
      alert('you are not logged in , please login')
      navigate('/')
    }
  },[token,navigate])
  function handleDialogOpen(user) {
    setOpen(true);
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
  const apprequest=async(row)=>{
    console.log(row)
    const schemeid=userid.find(user=>user.CustomerID===row.CustomerID)
    await axios.put("http://localhost:5000/CustomerSchemeEdit",{
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
    await axios.put("http://localhost:5000/CustomerSchemeEdit",{
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
      await axios.get("http://localhost:5000/CustomerSchemesJwStatus").then(res=>{
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
      
       
       /></div>
        }
       
 
  return (
    <>
      <Header />

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
          {selectedUser && (
           <DialogContentText>
              <Typography variant="h6"  gutterBottom>
                Name: {selectedUser.CustomerName}
              </Typography>
              <Typography variant="h6"  gutterBottom>
                Phone: {selectedUser.MobileNo}
              </Typography>
              <Typography variant="h6"   gutterBottom>
                PAN: {selectedUser.PANno}
              </Typography>
              <Typography variant="h6"   gutterBottom>
                Months Paid:3
              </Typography>
              
              </DialogContentText>
          )}
        </DialogContent>
            <DialogActions>
          <Button variant='contained'  size='small'  onClick={() => setOpen(false)}>Ok</Button>
          </DialogActions>
      </Dialog>
      <br/>
      <br/>
      <br/>
      <br/>
      <Grid container  direction="row"
  justifyContent="center"
  alignItems="center">
      <Grid item xs={12}>
      <div
        style={{
          height: "140px",
          display: "flex",
          flexFlow: "row wrap",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" sx={{fontWeight:'bold',marginLeft:'395px'}}>
          INCOMING REQUESTS
        </Typography>
        <Button variant="contained" onClick={handleLogout} style={{backgroundColor:'#9A1B56'}}><b>Logout</b></Button>
      </div>
      
        
        <TableContainer component={Paper} sx={{ maxHeight: "400px",maxWidth:'1000px',margin:'auto',borderRadius:'15px',display:'grid'}} >
       
       <Table aria-label="simple table"  >
         <TableHead >
           <TableRow>
             <TableCell sx={{ fontWeight: "medium", fontSize: "18px",backgroundColor:'#9A1B56',color:'white' }}>
               S.NO
             </TableCell>
             <TableCell
               align="left"
               sx={{ fontWeight: "medium", fontSize: "18px" ,backgroundColor:'#9A1B56',color:'white'}}
             >
               NAME
             </TableCell>
             <TableCell
               align="left"
               sx={{ fontWeight: "medium", fontSize: "18px" ,backgroundColor:'#9A1B56',color:'white'}}
             >
              PHONE NO
             </TableCell>
             <TableCell
               align="left"
               sx={{ fontWeight: "medium", fontSize: "18px",backgroundColor:'#9A1B56',color:'white' }}
             >
              PAYMENTS
             </TableCell>
             <TableCell
               align='left'
               sx={{ fontWeight: "medium", fontSize: "18px",backgroundColor:'#9A1B56',color:'white'}}
             >
              APPROVAL
             </TableCell>
             <TableCell
               align="center"
               sx={{ fontWeight: "medium", fontSize: "18px" ,backgroundColor:'#9A1B56',color:'white'}}
             >
               PAYMENT STATUS
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
                 <Button
                   variant="contained"
                   size="small"
                   sx={{padding:'8px'}}
                   onClick={() => handleDialogOpen(row)}
                 >
                   See Payments
                 </Button>
               </TableCell>
               <TableCell align="center">
                 <Stack direction="row" alignItems="center" spacing={3}>
                   <Button variant="contained" size ="small" sx={{padding:'8px'}} color="success" onClick={()=>{apprequest(row)}}>
                     Approve
                   </Button>
                   <Button variant="contained" size ="small" sx={{padding:'8px'}} color="error" onClick={()=>{rjtrequest(row)}}>
                     Reject
                   </Button>
                 </Stack>
               </TableCell>
               <TableCell align="center" sx={{ fontSize: "16px" }}>
                 TBD
               </TableCell>
             </TableRow>
           ))}
         </TableBody>
       </Table>
       
     </TableContainer>
        </Grid>
      </Grid>
      
      
    </>
  );
}