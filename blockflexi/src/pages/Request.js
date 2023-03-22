import Header from "../components/Header";
import React, { useEffect, useState } from "react";
import jwt_Decode from 'jwt-decode'
import { useCookies } from "react-cookie";
import axios from "axios";
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
  Typography,
} from "@mui/material";

const rows = [
  { id: 1, name: "SELVA KUMAR", phone: "8976567453",panno:"JCP54367",address:"BHARATHI NAGAR",payment:"5000"},
  { id: 2, name: "ASHWATH KUMAR", phone: "6787653546" },
  { id: 3, name: "SAURAV", phone: "7865430071" },
  { id: 4, name: "DIWAKAR", phone: "9045387965" },
  { id: 5, name: "VAITHEES", phone: "6334498760" },
];



const MoreDetailsButton = ({ name, row }) => {
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);
  const handleRowHover = (row) => {
    setHoveredRow(row);
  };

  const handleRowHoverLeave = () => {
    setHoveredRow(null);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = (user) => {
    setOpen(true);
    setSelectedUser(user);
  };

  return (
    <>
      <Button
        style={{ fontWeight: "bold", margin: "0px 0px 0px 30px" }}
        variant="contained"
        onClick={() => handleOpen(row)}
      >
        DETAILS
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
  const [hoveredRow, setHoveredRow] = useState(null);
  const[userid,setUserId]=useState([])
  const[user,setUser]=useState([])
  const[cookies,setCookie,removeCookie]=useCookies(['jeweller_sessionId'])
  const token=jwt_Decode(cookies.jeweller_sessionId)
  const jewellerid=token.id
  const setrows=(data)=>{
    setUserId(data)
  }
  useEffect(()=>{
    
    async function getUserID(){
      console.log(jewellerid)
      try{
      await axios.post("http://localhost:5000/CustomerSchemesLoanReq",{
         jewellerid
       }).then(res=>{
        if(res.data.response1){
          console.log(res.data.response1)
          setrows(res.data.response1)
          
        }
        else{
          console.log("No CustomerLoanRequest")
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
          const userIds =userid.map(user => user.CustomerID);
          try {
            const promises = userIds.map(id =>
              axios.post('http://localhost:5000/GetUsers', { customerid: id })
            );
            const responses = await Promise.all(promises);
            
            const users = responses.map(res => res.data.usercheck);
            console.log(users)
            handleUsers(users)
          } catch (e) {
            console.log(e);
          }
        }
        getUsers();
      }, [userid])
const fwdrequest=async(row)=>{
  console.log(row)
  const schemeid=userid.find(user=>user.CustomerID===row.CustomerID)
  await axios.put("http://localhost:5000/CustomerSchemeEdit",{
customerid:row.CustomerID,
jewellerid,
schemeid:schemeid.SchemeID,
loanstatus_jw:"yes"
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
  const schemeid=userid.find(user=>user.CustomerID===row.CustomerID)
  await axios.put("http://localhost:5000/CustomerSchemeEdit",{
  customerid:row.CustomerID,
  jewellerid,
  schemeid:schemeid.SchemeID,
loanstatus_jw:"no"
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
const handleUsers=(data)=>{
  setUser(data)
}
 
  const handleRowHover = (row) => {
    setHoveredRow(row);
  };

  const handleRowHoverLeave = () => {
    setHoveredRow(null);
  };

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
