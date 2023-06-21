import React, { useEffect, useState } from "react";
import jwt_Decode from 'jwt-decode'
import { useCookies } from "react-cookie";
// import axios from "axios";
import axios from '../integration'

import Web3 from'web3';
import abi from "../contracts/FlexiScheme.json"
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
import Swal from "sweetalert2";
import { Circles } from "react-loader-spinner";
import Header from "../components/Header";
import JewellerHeader from "../components/JewellerHeader";

const TableExample = () => {
  const [hoveredRow, setHoveredRow] = useState(null);
  const[userid,setUserId]=useState([])
  const [open, setOpen] = useState(false);
   const[customername,setcusname]=useState(null)
  const[months,setMonths]=useState(null)
  const[balance,setBalance]=useState(null)
  const [selectedUser, setSelectedUser] = useState(null);
  const[user,setUser]=useState([])
  const[isloading,setisLoading]=useState(true);
  const[schemename,setSchemename]=useState([])
  const[scheme,setScheme]=useState(null)
  const[cookies,setCookie,removeCookie]=useCookies(['jeweller_sessionId'])
  const token=jwt_Decode(cookies.jeweller_sessionId)
  const jewellerid=token.id
  const jewellername=token.name
  const contractaddress="0x8B9Ce2D6A5b472F1B8A96d859bDCE88b254435F8"
  async function connect() {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.enable();
        const accounts = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();
        if (networkId !== 888) {
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
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = (user) => {
    setOpen(true);
    getdetails(user)
    setSelectedUser(user);
  };
  
  const setrows=(data)=>{
    setUserId(data)
  }
  const setschemename=(data)=>{
    setSchemename(data)
    console.log(schemename)
  }
  const getdetails=async (data)=>{
     const { web3, accounts } = await connect();
    
      
     
        const bfcontract = new web3.eth.Contract(abi, contractaddress);
    console.log(bfcontract);
    const blockdata=userid.find(user=>user.CustomerID===data.CustomerID)
    console.log(blockdata)
    const schemeName=blockdata.SchemeName
    setScheme(schemeName)
    console.log(jewellername,schemename)
    
    try{
      const _customername=data.CustomerName

      const _jewellername=jewellername
      const _schemename=schemeName
      setcusname(_customername)
      

      const getBalance= await bfcontract.methods.getBalance(_customername,_jewellername,_schemename).call()
      const monthspaid=await bfcontract.methods.getMonthsPaid(_customername,_jewellername,_schemename).call()
      console.log(getBalance)
      setBalance(getBalance)
      setMonths(monthspaid)

    }catch(e){
      console.log(e)
    }


  
  }
  useEffect(()=>{
    
    async function getUserID(){
      
      try{
      await axios.get("/CustomerSchemesLoanReq").then(res=>{
        if(res.data.response1){
          console.log('loanreq',res.data.response1)
          const row=res.data.response1.filter(r=>r.JewellerID === jewellerid)
          console.log('filtered',row)
          setrows(row)
          setschemename(row.SchemeName)
          
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
const fwdrequest=async(row)=>{
  console.log(row)
  const schemeid=userid.find(user=>user.CustomerID===row.CustomerID)
  await axios.put("/CustomerSchemeEdit",{
customerid:row.CustomerID,
jewellerid,
schemeid:schemeid.SchemeID,
loanstatus_jw:"yes",
jewellername:jewellername
}).then(res=>{
if(res.data.status==='approved'){
  Swal.fire({
    icon: 'success',
    title: 'Request Forwarded to Bank',
    text: `${row.CustomerName}'s Loan request for ${schemeid.SchemeName} has been approved`,
    confirmButtonColor:"#9A1B56"
  }).then((result)=>{
    if(result.isConfirmed){
      window.location.reload();
    }
  })
  //alert(`${row.CustomerName}'s Loan request for ${schemeid.SchemeName} has been approved`)
 // window.location.reload()
}
else{
  Swal.fire({
    icon: 'error',
    title: 'Something went wrong',
    text: `No change has been made to ${row.CustomerName}`,
    confirmButtonColor:"#9A1B56"
  }).then((result)=>{
    if(result.isConfirmed){
      window.location.reload();
    }
  })

}
})
}
const rjtrequest=async(row)=>{
  const schemeid=userid.find(user=>user.CustomerID===row.CustomerID)
  await axios.put("/CustomerSchemeEdit",{
  customerid:row.CustomerID,
  jewellerid,
  schemeid:schemeid.SchemeID,
  
loanstatus_jw:"no",
jewellername:jewellername
  }).then(res=>{
  if(res.data.status==='rejected'){
  Swal.fire({
    icon: 'success',
    title: 'Request Rejected',
    text: `${row.CustomerName}'s Loan request for ${schemeid.SchemeName} has been rejected`,
    confirmButtonColor:"#9A1B56"
  }).then((result)=>{
    if(result.isConfirmed){
      window.location.reload();
    }
  })

  }
  else{
    Swal.fire({
      icon: 'error',
      title: 'Something went wrong',
      text: `No change has been made to ${row.CustomerName}`,
      confirmButtonColor:"#9A1B56"
    }).then((result)=>{
      if(result.isConfirmed){
        window.location.reload();
      }
    })
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
    <div style={{ display: "flex", flexDirection: "column"   }}>
      <JewellerHeader/>
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
          fontFamily:'Libre Baskerville,serif'
          
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
  <TableCell style={{  backgroundColor: "#9a1b56", color: "white", fontSize: "1.2rem", fontFamily:'Libre Baskerville,serif' }}>S.NO</TableCell>
  <TableCell style={{  backgroundColor: "#9a1b56", color: "white", fontSize: "1.2rem", fontFamily:'Libre Baskerville,serif' }}>CUSTOMER NAME</TableCell>
  <TableCell style={{ backgroundColor: "#9a1b56", color: "white", fontSize: "1.2rem", fontFamily:'Libre Baskerville,serif' }}>PHONE NO</TableCell>
  <TableCell style={{  backgroundColor: "#9a1b56", color: "white", fontSize: "1.2rem", fontFamily:'Libre Baskerville,serif' }}>MORE DETAILS</TableCell>
  <TableCell style={{  backgroundColor: "#9a1b56", color: "white", fontSize: "1.2rem", fontFamily:'Libre Baskerville,serif' }}>APPROVAL</TableCell>
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
                  <Button
        style={{ fontWeight: "bold", margin: "0px 0px 0px 30px", fontFamily:'Libre Baskerville,serif',backgroundColor:'#9a1b56' }}
        variant="contained"
        onClick={() => handleOpen(row)}
      >
        DETAILS
      </Button>
                    
                  </TableCell>
                  <TableCell>
                  <div style={{ display: "flex" }}>
  <Button
    style={{ fontWeight: "bold",fontFamily:'Libre Baskerville,serif',backgroundColor:'#9a1b56' }}
    variant="contained"
    disabled={!hoveredRow || hoveredRow.id !== row.id}
    
    onClick={()=>fwdrequest(row)}
  >
    FORWARD <ArrowForwardIcon />
  </Button>
  <Button
    style={{ fontWeight: "bold", marginLeft: "20px",fontFamily:'Libre Baskerville,serif',backgroundColor:'#9a1b56' }}
    variant="contained"
    disabled={!hoveredRow || hoveredRow.id !== row.id}
    
    onClick={()=>rjtrequest(row)}
  >
    REJECT<CancelRoundedIcon />
  </Button>
</div>
<Dialog open={open} onClose={handleClose} >
          <DialogTitle
            style={{ fontWeight: "bold", margin: "0px 0px 0px 150px",fontFamily:'Libre Baskerville,serif' }}
          >
            DETAILS
          </DialogTitle>
         
          <DialogContent sx={{height:'200px',width:'400px'}}>
          {selectedUser && (
            <DialogContentText style={{ fontWeight: "bold", fontFamily:'Libre Baskerville,serif'  }}>
    

              <table>
                <tbody>
                <tr>
                  <td >
                  <Typography variant="h6"  gutterBottom>Name</Typography></td>
                 
                  <td style={{padding:'0 20px',textTransform:'capitalize'}}><Typography variant="h6"  gutterBottom>{customername}</Typography></td>
                </tr>
                <tr>
                  <td>
                  <Typography variant="h6"  gutterBottom>Jeweller Name</Typography></td>
                
                  <td style={{padding:'0 20px',textTransform:'capitalize'}}><Typography variant="h6"  gutterBottom>{scheme}</Typography></td>
                </tr>
                <tr>
                  <td>
                  <Typography variant="h6"  gutterBottom>Months Paid</Typography></td>
                  
                  <td style={{padding:'0 20px',textTransform:'capitalize'}}><Typography variant="h6"  gutterBottom>{months}</Typography></td>
                </tr>
                <tr>
                  <td>
                  <Typography variant="h6" style={{marginTop:'1px'}} gutterBottom >Amount to be paid</Typography></td>
                  
                  <td style={{padding:'0 20px'}}><Typography variant="h6"  gutterBottom>{balance}</Typography></td>
                </tr>
                
               

              
                </tbody>
              </table>
              
             
            </DialogContentText>)}
          </DialogContent>
         
          
           
         
          <DialogActions>
          <Button style={{
  fontWeight: "bold",
  padding: "8px 25px",
  fontSize:"14px",
  fontFamily:'Libre Baskerville,serif',
  borderRadius: "5px",
  backgroundColor: "#9a1b56",
  color: "white"
}} onClick={handleClose}>
  Close
</Button>

          </DialogActions>
         
        </Dialog>

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