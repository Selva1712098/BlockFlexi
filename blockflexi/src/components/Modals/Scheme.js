import React, { useState, useEffect } from "react";
import { Stack } from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Alert,
  AlertIcon,
    ModalCloseButton,
    Text,
    Button,
    Box
  } from '@chakra-ui/react'
  import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
  } from '@chakra-ui/react'
  import { Card, CardBody, CardFooter, Heading } from '@chakra-ui/react'
  import axios from "axios";
function Scheme({isOpen, onClose,jewellerid,customerid }){
  const[schemes,setSchemes]=useState('');
  // const[selectedScheme,setSelectedScheme]=useState(null);
  const [isJoined, setIsJoined] = useState(false);
  // const[schemeid,setSchemeId]=useState('')

 
  async function joinscheme(schemes){
    console.log(schemes)
    const schemeid=schemes.SchemeID
    console.log(schemeid)
    

    await axios.post('http://localhost:5000/JoinScheme',{
    jewellerid,
    customerid,schemeid
    }).then(res=>{
      if(res.data.status==='exists'){
        alert("You have already joined this scheme")
      }
      else if(res.data.status==='success'){
        alert("You have joined this scheme successfully.Go to your schemes to view them")
        
      }
    })
  }
  useEffect(() => {
    async function fetchData() {
      try {
        // Make a GET request to the /schemes API endpoint
        const response = await axios.post("http://localhost:5000/JewellerScheme",{jewellerid}).then(res=>{
          if(res.data.status==='success'){
            setSchemes(res.data.schemes)
          }
          else{
            alert("There is no jeweller ")
          }
        });

        // Set the retrieved schemes in the state
        setSchemes(response.data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, []);
    return(
<div>
<Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay/>
    <ModalContent maxW="50%">
          <ModalHeader>Schemes</ModalHeader>
          <ModalCloseButton />
          <ModalBody maxHeight="400px" overflowY="scroll">
            {schemes && schemes.map((scheme,index)=>(
 
          <Card
  direction={{ base: 'column', sm: 'row' }}
  overflow='hidden'
  variant='outline'
>

    <Stack>
      <CardBody>
        <Heading size='md'>{scheme.SchemeName}</Heading>

        <Text py='2'>
          {scheme.MonthlyPayment}
        </Text>
      </CardBody>

      <CardFooter>
        {/* {scheme.isJoined ? (
          <Button variant="solid" bgColor={"#c17171"} color={"#fff"} >
            Joined
          </Button>
        ) : ( */}
          <Button variant='solid' onClick={()=>joinscheme(scheme)} bgColor={"#c17171"} mr={'4'} color={"#fff"}>
            Join
          </Button>

        
        <Accordion allowToggle>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex='1' textAlign='left'>
                  See details
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              {scheme.SchemeDetails}

            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </CardFooter>
    </Stack>
  
</Card>
            ))}
      
{/* <Card
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
      <Button variant='solid' bgColor={"#c17171"} color={"#fff"}>
        Join
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
      <Heading size='md'>Budget value(11 months)</Heading>

      <Text py='2'>
       Monthly= 5000/month
       Total= 55000
      </Text>
    </CardBody>

    <CardFooter>
      <Button variant='solid' bgColor={"#c17171"} color={"#fff"}>
        Join
      </Button>
    </CardFooter>
  </Stack>
</Card> */}
<Alert status='success' variant='left-accent' hidden={!isJoined}>
              <AlertIcon />
              You have successfully joined the scheme!
            </Alert>

          </ModalBody>
          <ModalFooter>
            <Button variant='ghost'mr={3} >Go to MySchemes</Button>
            
            <Button bgColor={"#9A1B56"} color={"#fff"}  onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
        
    </Modal>
</div>
    )
}
export default Scheme;