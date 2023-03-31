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
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import "./Request.css";



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
      {selectedUser && (
        <Dialog open={open} onClose={handleClose} >
          <DialogTitle
            style={{ fontWeight: "bold", margin: "0px 0px 0px 150px" }}
          >
            DETAILS
          </DialogTitle>
          <DialogContent sx={{height:'200px',width:'400px'}}>
            <DialogContentText style={{ fontWeight: "bold"  }}>
              <div style={{margin:'5px 0px 0px 60px'}}>
              CUSTOMER NAME : {selectedUser.CustomerName}
              <br /> <br /></div>
              <div style={{margin:'0px 0px 0px 60px'}}>
              PAN NO : {selectedUser.PANno}
              <br /><br/></div>
              <div style={{margin:'0px 0px 0px 60px'}}>
              ADDRESS : {selectedUser.Address}
              <br /><br/></div>
              {/* <div style={{margin:'0px 0px 0px 60px'}}>
              PAYMENT : {selectedUser.payment}
              <br /><br/></div> */}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
          <Button style={{
  fontWeight: "bold",
  padding: "8px 25px",
  fontSize:"14px",
  borderRadius: "5px",
  backgroundColor: "#f34642",
  color: "white"
}} onClick={handleClose}>
  Close
</Button>

          </DialogActions>
        </Dialog>
      )}
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
    <div style={{ display: "flex", flexDirection: "column"   }}>
      <Header />
      <Typography
        variant="h4"
        align="center"
        style={{
          marginTop: "5rem",
          marginBottom: "0rem",
          fontFamily: "Montserrat, sans-serif",
          fontSize: "2.5rem",
          fontWeight: "bold",
          color: "black",
          textTransform: "uppercase",
          letterSpacing: "2px",
          padding: "1rem",
          
        }}
      >
        WITHDRAW REQUESTS
      </Typography>
      <br/>
      <br/>
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TableContainer
          style={{ maxWidth: "80%", borderRadius: "20px", margin: "auto" }}
          component={Paper}
        >
          <Table>
            <TableHead>
            <TableRow className="requestfont">
  <TableCell style={{  backgroundColor: "#9a1b56", color: "white", fontSize: "1.2rem", fontFamily: "Poppins, sans-serif" }}>S.NO</TableCell>
  <TableCell style={{  backgroundColor: "#9a1b56", color: "white", fontSize: "1.2rem", fontFamily: "Poppins, sans-serif" }}>CUSTOMER NAME</TableCell>
  <TableCell style={{ backgroundColor: "#9a1b56", color: "white", fontSize: "1.2rem", fontFamily: "Poppins, sans-serif" }}>PHONE NO</TableCell>
  <TableCell style={{  backgroundColor: "#9a1b56", color: "white", fontSize: "1.2rem", fontFamily: "Poppins, sans-serif" }}>MORE DETAILS</TableCell>
  <TableCell style={{  backgroundColor: "#9a1b56", color: "white", fontSize: "1.2rem", fontFamily: "Poppins, sans-serif" }}>APPROVAL</TableCell>
</TableRow>

            </TableHead>
            <TableBody>
              {user.map((row,index) => (
                <TableRow
                  key={row._id}
                  sx={{
                    "&:hover": {
                      boxShadow:
                        hoveredRow === row
                          ? "0px 0px 10px 5px rgba(0, 0, 0, 0.1)"
                          : "none",
                    },
                  }}
                  onMouseEnter={() => handleRowHover(row)}
                  onMouseLeave={() => handleRowHoverLeave()}
                >
                  <TableCell>{index+1}</TableCell>
                  <TableCell>{row.CustomerName}</TableCell>
                  <TableCell>{row.MobileNo}</TableCell>
                  <TableCell>
                    <MoreDetailsButton name={row.CustomerName} row={row} />
                  </TableCell>
                  <TableCell>
                  <div style={{ display: "flex" }}>
  <Button
    style={{ fontWeight: "bold" }}
    variant="contained"
    disabled={!hoveredRow || hoveredRow.id !== row.id}
    color="success"
    onClick={()=>fwdrequest(row)}
  >
    FORWARD <ArrowForwardIcon />
  </Button>
  <Button
    style={{ fontWeight: "bold", marginLeft: "20px" }}
    variant="contained"
    disabled={!hoveredRow || hoveredRow.id !== row.id}
    color="error"
    onClick={()=>rjtrequest(row)}
  >
    REJECT<CancelRoundedIcon />
  </Button>
</div>

                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default TableExample;
