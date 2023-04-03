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
import { Circles } from "react-loader-spinner";



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
  const[isloading,setisLoading]=useState(true);
  const[cookies,setCookie,removeCookie]=useCookies(['jeweller_sessionId'])
  const token=jwt_Decode(cookies.jeweller_sessionId)
  const jewellerid=token.id
  const setrows=(data)=>{
    setUserId(data)
  }
  useEffect(()=>{
    
    async function getUserID(){
      
      try{
      await axios.get("http://localhost:5000/CustomerSchemesLoanReq").then(res=>{
        if(res.data.response1){
          console.log('loanreq',res.data.response1)
          const row=res.data.response1.filter(r=>r.JewellerID === jewellerid)
          console.log('filtered',row)
          setrows(row)
          
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
          
          try {
            setisLoading(true)
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
  alert(`${row.CustomerName}'s Loan request for ${schemeid.SchemeID} has been approved`)
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
    alert(`${row.CustomerName}'s request for ${schemeid.SchemeID} has been rejected`)
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
