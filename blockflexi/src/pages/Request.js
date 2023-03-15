import Header from '../components/Header';
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

const rows = [
  { id: 1, name: "SELVA KUMAR", phone: "8976567453",panno:"JCP54367",address:"BHARATHI NAGAR",payment:"5000"},
  { id: 2, name: "ASHWATH KUMAR", phone: "6787653546" },
  { id: 3, name: "SAURAV", phone: "7865430071" },
  { id: 4, name: "DIWAKAR", phone: "9045387965" },
  { id: 5, name: "VAITHEES", phone: "6334498760" },
];

const ApprovalButtons = () => {
  return (

    <>
    
      <Button variant="contained" color="success">
        Forward
      </Button>{" "}
      <Button variant="contained" color="error">
        Reject
      </Button>
    </>
  );
};

const MoreDetailsButton = ({ name ,row}) => {
  const [open, setOpen] = useState(false);
  const[selectedUser,setSelectedUser]=useState(null)

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = (user) => {
    setOpen(true);
    setSelectedUser(user)
  };

  return (
    <>
   
      <Button style={{fontWeight:'bold'}} variant="contained" onClick={()=>handleOpen(row)}>
        More details
      </Button>
      {selectedUser &&
      <Dialog  open={open} onClose={handleClose}>
        <DialogTitle style={{fontWeight:'bold',margin:'0px 0px 0px 90px'}}>DETAILS</DialogTitle>
        <DialogContent>
          <DialogContentText style={{fontWeight:'bold'}}>
            CUSTOMER NAME : {selectedUser.name}<br/>
            PAN NO : {selectedUser.panno}<br/>
            ADDRESS : {selectedUser.address}<br/>
            PAYMENT : {selectedUser.payment}<br/>
            
          </DialogContentText>
        
        </DialogContent>
        <DialogActions>
          <Button style={{fontWeight:'bold'}} onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>}
    </>
  );
};

const TableExample = () => {
  return (
   <>
   <Header/>
    <TableContainer style={{marginTop:'150px',width:"1000px", marginLeft:"200px",borderRadius:"20px"}} component={Paper}>
      <Table>
        <TableHead>
          <TableRow >
            <TableCell style={{fontWeight:'bold',backgroundColor: '#9a1b56', color: 'white', fontSize: '1.5rem'}}>S.NO</TableCell>
            <TableCell style={{fontWeight:'bold',backgroundColor: '#9a1b56', color: 'white', fontSize: '1.5rem'}}>CUSTOMER NAME</TableCell>
            <TableCell style={{fontWeight:'bold',backgroundColor: '#9a1b56', color: 'white', fontSize: '1.5rem'}}>PHONE NO</TableCell>
            <TableCell style={{fontWeight:'bold',backgroundColor: '#9a1b56', color: 'white', fontSize: '1.5rem'}}>MORE DETAILS</TableCell>
            <TableCell style={{fontWeight:'bold',backgroundColor: '#9a1b56', color: 'white', fontSize: '1.5rem'}}>APPROVAL</TableCell>
          </TableRow>
        </TableHead>
        
        <TableBody>

          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.phone}</TableCell>
              <TableCell>
                <MoreDetailsButton name={row.name} row={row} />
              </TableCell>
              <TableCell>
                <ApprovalButtons />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
   
  );
};

export default TableExample;
