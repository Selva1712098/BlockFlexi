import React, { useState } from "react";
import Header from "../Header";

import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Grid,
} from "@mui/material";
import Swal from "sweetalert2";

import { useNavigate } from "react-router-dom";
import axios from "axios";

function BankLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[open,setOpen]=useState(false)
  const navigate=useNavigate()

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  async function login(event){
    event.preventDefault();
    await axios.post("http://localhost:5000/BankLogin",{
      email,
      password
    },{withCredentials:true}).then((res)=>{
      if(res.data.status==='ok' && res.data.authorized){
        setOpen(true)
        
       
        
      }
      else if(res.data.status==='error'){
        alert("wrong password")
      }
      else if(res.data.status==='not found'){
        alert('No user found.Contact us to create an account')
        navigate('/')
      }
    }).catch(e=>{
      alert('wrong details')

    })  }
    if(open){
      Swal.fire({
        icon: 'success',
      title: 'Login successful!',
      text: 'You are now logged in.',
      confirmButtonColor:"#9A1B56"
      }).then((result)=>{
        if(result.isConfirmed){
          navigate('/BankHome',{replace:true})
        }
      })
    }
  return (
    <>
      <Header />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "90vh",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Grid
          container
          spacing={1}
          style={{
            display:'flex',
      alignItems:'center',
      justifyContent:'center',
      flexWrap:'column wrap'
          }}
        >
          <Grid item>
            <Card
              style={{
                maxWidth: "400px",
                borderRadius: "10px",
                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  backgroundColor: "#9A1B56",
                  height: "100px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="h5"
                  component="h2"
                  fontFamily="bold"
                  style={{ color: "white" }}
                >
                  BANK LOGIN
                </Typography>
              </div>
              <CardContent style={{ paddingTop: "40px" }}>
                <form onSubmit={login} action="POST">
                  <TextField
                    id="email"
                    label="Email"
                    type="email"
                    variant="outlined"
                    fullWidth
                    value={email}
                    onChange={handleEmailChange}
                    margin="normal"
                    style={{ marginBottom: "20px" }}
                  />
                  <TextField
                    id="password"
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    value={password}
                    onChange={handlePasswordChange}
                    margin="normal"
                    style={{ marginBottom: "30px" }}
                  />
                  <Button
                    style={{
                      margin: "10px 0px 30px",
                      backgroundColor: "#9A1B56",
                      color: "white",
                      borderRadius: "20px",
                      width: "100%",
                    }}
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    Login
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default BankLogin;
