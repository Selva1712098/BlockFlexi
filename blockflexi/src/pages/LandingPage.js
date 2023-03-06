import React from 'react'

import Header from '../components/Header'
import Footer from '../components/Footer'
import Description from '../components/Description'
import axios from 'axios'
import { Button } from '@mui/material'

function LandingPage() {
  async function logout(){
    await axios.post("http://localhost:5000/logout").then((res)=>{
    if(res.data.status==='cleared'){
      window.location.href='/Customer/Login'
    }
    }).catch((err)=>{
      console.log(err)
    })
  }

  return (
    <div>
        <Header/>
        <Button onClick={logout}>logout</Button>
        <Description/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <Footer/>

    </div>
  )
}

export default LandingPage

