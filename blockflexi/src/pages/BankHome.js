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

function createData(Sno, name, Phone_No, Payment_Status, Months_paid, PANNo) {
  return { Sno, name, Phone_No, Payment_Status, Months_paid, PANNo };
}
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
const rows = [
  createData(1, "John", 9191919159, "No", 3, "ALD0901W"),
  createData(2, "Bob", 8181818137, "No", 5, "LOK114P"),
  createData(3, "Alice", 7474747262, "No", 6, "SCS00124O"),
  createData(4, "Logan", 9090990305, "No", 4, "SAQ999I"),
  createData(5, "Mike", 8918918936, "No", 3, "KIL913O"),
];
const highlightedRowStyle = {
 
  // transform: 'scale(1.00)',
  transition:'all 0.3s ease-in-out',

  boxShadow:'0 0px 10px 15px rgba(0,0,0,0.1)'
};
export default function BankHome() {
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const[cookies,setCookie,removeCookie]=useCookies(['sessionId'])
  const navigate=useNavigate()
  const token=jwt_decode(cookies.sessionId)
  
  console.log(token)

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
    removeCookie('sessionId');
    navigate('/',{replace:true});

  }

  // async function getusers(){
  //   await axios.get('/leads').then()
  // }
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
                Name: {selectedUser.name}
              </Typography>
              <Typography variant="h6"  gutterBottom>
                Phone: {selectedUser.Phone_No}
              </Typography>
              <Typography variant="h6"   gutterBottom>
                PAN: {selectedUser.PANNo}
              </Typography>
              <Typography variant="h6"  gutterBottom>
                Months Paid: {selectedUser.Months_paid}
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
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" sx={{fontWeight:'bold',marginLeft:'395px'}}>
          INCOMING REQUESTS
        </Typography>
        <Button variant="contained" onClick={handleLogout} sx={{margin:'0 0 0 400px'}}>Logout</Button>
      </div>
      
        
        <TableContainer component={Paper} sx={{ maxHeight: "400px",maxWidth:'1000px',margin:'auto',borderRadius:'15px',display:'grid'}} >
       
       <Table aria-label="simple table"  >
         <TableHead >
           <TableRow>
             <TableCell sx={{ fontWeight: "medium", fontSize: "18px",backgroundColor:'#9A1B56',color:'white' }}>
               S.No
             </TableCell>
             <TableCell
               align="left"
               sx={{ fontWeight: "medium", fontSize: "18px" ,backgroundColor:'#9A1B56',color:'white'}}
             >
               Name
             </TableCell>
             <TableCell
               align="left"
               sx={{ fontWeight: "medium", fontSize: "18px" ,backgroundColor:'#9A1B56',color:'white'}}
             >
               Phone No
             </TableCell>
             <TableCell
               align="left"
               sx={{ fontWeight: "medium", fontSize: "18px",backgroundColor:'#9A1B56',color:'white' }}
             >
               Payments
             </TableCell>
             <TableCell
               align='left'
               sx={{ fontWeight: "medium", fontSize: "18px",backgroundColor:'#9A1B56',color:'white'}}
             >
               Approval
             </TableCell>
             <TableCell
               align="center"
               sx={{ fontWeight: "medium", fontSize: "18px" ,backgroundColor:'#9A1B56',color:'white'}}
             >
               Payment Status
             </TableCell>
           </TableRow>
         </TableHead>
         <TableBody>
           {rows.map((row) => (
             <TableRow key={row.name} sx={{ '&:hover': highlightedRowStyle }} >
               <TableCell align="left" sx={{ fontSize: "16px" }}>
                 {row.Sno}
               </TableCell>
               <TableCell align="left" sx={{ fontSize: "16px" }}>
                 {row.name}
               </TableCell>
               <TableCell align="left" sx={{ fontSize: "16px" }}>
                 {row.Phone_No}
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
                   <Button variant="contained" size ="small" sx={{padding:'8px'}} color="success">
                     Approve
                   </Button>
                   <Button variant="contained" size ="small" sx={{padding:'8px'}} color="error">
                     Reject
                   </Button>
                 </Stack>
               </TableCell>
               <TableCell align="center" sx={{ fontSize: "16px" }}>
                 {row.Payment_Status}
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