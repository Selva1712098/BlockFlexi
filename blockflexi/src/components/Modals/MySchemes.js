import React, { useState,useEffect } from "react";
import { Stack } from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Text,
    Button,
  } from '@chakra-ui/react'
  import { Card, CardBody, CardFooter, Heading } from '@chakra-ui/react'
import axios from "axios";


function MySchemes({ isOpen, onClose,jewellerid,customerid }){
  const[isSchemeOpen,setSchemeOpen]=useState(false);
  
  const[schemeId,setSchemeId]=useState([])
  const[schemes,setSchemes]=useState([])
  
  const handleScheme=()=>{
    setSchemeOpen(true);
  };
  const handleCloseScheme=()=>{
    setSchemeOpen(false);
  }
  const handleCloseAndOpenScheme = () => {
    onClose()
    handleScheme()
}
async function getScheme() {
  const schemeIds = schemeId.map(scheme => scheme.SchemeID);
  try {
    const promises = schemeIds.map(id =>
      axios.post('http://localhost:5000/GetScheme', { schemeid: id })
    );
    const responses = await Promise.all(promises);
    const schemes = responses.map(res => res.data.schemecheck);
    handleSchemeName(schemes);
  } catch (e) {
    console.log(e);
  }
}
const handleSchemes =
 (data) => {
  console.log('id',data)
  if (data && data.length > 0) {
    setSchemeId([...data]);
  } else {
    setSchemeId([]);
  }
};

const handleSchemeName=(data)=>{
console.log('datas:',data)
if (data && data.length > 0) {
  setSchemes([...data]);
} else {
  setSchemes([]);
}

}

useEffect(()=>{
      async function getSchemeID(){
        try{
          await axios.post('http://localhost:5000/GetSchemeID',{
            jewellerid,
            customerid
            }).then(res=>{
              if(res.data ){
               // console.log('inside use effect', res.data.schemecheck)
                handleSchemes(res.data.schemecheck)
            
              
              }
             
              else{
                console.log("Could not get your Scheme")
              }
             
            })
        }catch(e){
          console.log(e)
        }
       
        
      }
      getSchemeID()})
      useEffect(() => {
       
        getScheme();
      }, [schemeId]);

      const loanRequest=async(scheme)=>{
        const schemeid=scheme.SchemeID
        await axios.put('http://localhost:5000/CustomerSchemeEdit',{
          customerid,
          schemeid,
          loanreq:true

        }).then(res=>{
          try{
            if(res.data.Status==='done'){
              alert("Your Request has been sent successfully")
            }
            else{
              alert("Something went wrong.Try Again later")
            }
          }catch(e){
            console.log(e)
          }
          
        })
      }
         
    return (
  
<div>
<Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay/>
    <ModalContent maxW="50%">
          <ModalHeader>My Schemes</ModalHeader>
          <ModalCloseButton />
          <Button variant='contained' onClick={()=>getScheme()} >Refresh</Button>
          <ModalBody maxHeight="400px" overflowY="scroll">
         
          
  {Array.isArray(schemes) && schemes.map((scheme,index)=>(
    <Card
    direction={{ base: 'column', sm: 'row' }}
    overflow='hidden'
    variant='outline'
    key={scheme.SchemeID}
  >
    <Stack >
    <CardBody >
      <Heading size='md'>{scheme.SchemeName}</Heading>

      <Text py='2'>
       Monthly= {scheme.MonthlyPayment}
       Total= {scheme.MonthlyPayment * 11} 
      </Text>
    </CardBody>

    <CardFooter>
      <Button variant='solid' mr={4} bgColor={"#c17171"} color={"#fff"}>
        Pay
      </Button>
      <Button variant='solid' bgColor={"#c17171"} color={"#fff"} onClick={()=>loanRequest(scheme)}>
        Withdraw
      </Button>
    </CardFooter>
    </Stack>
    </Card>
  ))}
  
 
    

          </ModalBody>
          <ModalFooter>
            <Button variant='ghost'mr={3} onClick={handleCloseAndOpenScheme}>Join New Scheme</Button>
            
            <Button bgColor={"#9A1B56"} color={"#fff"}  onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
        
    </Modal>
    
</div>

    )
}
export default MySchemes;