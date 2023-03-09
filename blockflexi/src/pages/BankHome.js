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
  
  DialogActions,Slide, DialogContentText
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
  },[token])
  function handleDialogOpen(user) {
    setOpen(true);
    setSelectedUser(user);
    
  }
  function handleLogout(){
    removeCookie('sessionId');
    navigate('/',{replace:true});

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
      <div
        style={{
          height: "140px",
          display: "flex",
          flexFlow: "row wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography align="center" variant="h4" sx={{fontWeight:'bold',margin:'0 0 0 395px'}}>
          INCOMING REQUESTS
        </Typography>
        <Button variant="contained" onClick={handleLogout} sx={{margin:'0 0 0 400px'}}>Logout</Button>
      </div>
      
      <TableContainer component={Paper} sx={{ maxHeight: "400px"}}>
       
        <Table aria-label="simple table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", fontSize: "22px" }}>
                S.No
              </TableCell>
              <TableCell
                align="left"
                sx={{ fontWeight: "bold", fontSize: "22px" }}
              >
                Name
              </TableCell>
              <TableCell
                align="left"
                sx={{ fontWeight: "bold", fontSize: "22px" }}
              >
                Phone No
              </TableCell>
              <TableCell
                align="left"
                sx={{ fontWeight: "bold", fontSize: "22px" }}
              >
                Payments
              </TableCell>
              <TableCell
                align='left'
                sx={{ fontWeight: "bold", fontSize: "22px"}}
              >
                Approval
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold", fontSize: "22px" }}
              >
                Payment Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell align="left" sx={{ fontSize: "18px" }}>
                  {row.Sno}
                </TableCell>
                <TableCell align="left" sx={{ fontSize: "18px" }}>
                  {row.name}
                </TableCell>
                <TableCell align="left" sx={{ fontSize: "18px" }}>
                  {row.Phone_No}
                </TableCell>
                <TableCell align="left">
                  <Button
                    variant="contained"
                    size="medium"
                    onClick={() => handleDialogOpen(row)}
                  >
                    See Payments{" "}
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Stack direction="row" alignItems="center" spacing={3}>
                    <Button variant="contained" color="success">
                      Approve
                    </Button>
                    <Button variant="contained" color="error">
                      Reject
                    </Button>
                  </Stack>
                </TableCell>
                <TableCell align="center" sx={{ fontSize: "18px" }}>
                  {row.Payment_Status}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
      </TableContainer>
      
    </>
  );
}