import React, { useState } from "react";
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
import Scheme from "./Scheme";

function MySchemes({ isOpen, onClose }){
  const[isSchemeOpen,setSchemeOpen]=useState(false);
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
    
    return (
  
<div>
<Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay/>
    <ModalContent maxW="50%">
          <ModalHeader>My Schemes</ModalHeader>
          <ModalCloseButton />
          <ModalBody maxHeight="400px" overflowY="scroll">
          <Card
  direction={{ base: 'column', sm: 'row' }}
  overflow='hidden'
  variant='outline'
>
<Stack>
    <CardBody>
      <Heading size='md'>Budget value(11 months)</Heading>

      <Text py='2'>
       Monthly= 5000/month
       Total= 55000
      </Text>
    </CardBody>

    <CardFooter>
      <Button variant='solid' mr={4} bgColor={"#c17171"} color={"#fff"}>
        Pay
      </Button>
      <Button variant='solid' bgColor={"#c17171"} color={"#fff"}>
        Withdraw
      </Button>
    </CardFooter>
  </Stack>
</Card>
<Card
  direction={{ base: 'column', sm: 'row' }}
  overflow='hidden'
  variant='outline'
>
<Stack>
    <CardBody>
      <Heading size='md'>Saver value(11 months)</Heading>

      <Text py='2'>
       Monthly= 10000/month
       Total= 110000
      </Text>
    </CardBody>

    <CardFooter>
      <Button variant='solid' mr={4} bgColor={"#c17171"} color={"#fff"}>
        Pay
      </Button>
      <Button variant='solid' bgColor={"#c17171"} color={"#fff"}>
        Withdraw
      </Button>
    </CardFooter>
  </Stack>
</Card>

          </ModalBody>
          <ModalFooter>
            <Button variant='ghost'mr={3} onClick={handleCloseAndOpenScheme}>Join New Scheme</Button>
            
            <Button bgColor={"#9A1B56"} color={"#fff"}  onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
        
    </Modal>
    <Scheme isOpen={isSchemeOpen} onClose={handleCloseScheme}/>
</div>

    )
}
export default MySchemes;