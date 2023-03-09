import React, { useState } from "react";
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
function Scheme({isOpen, onClose }){
  const [isJoined, setIsJoined] = useState(false);
  const handleJoinClick = () => {
    setIsJoined(true);
  };
    return(
<div>
<Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay/>
    <ModalContent maxW="50%">
          <ModalHeader>Schemes</ModalHeader>
          <ModalCloseButton />
          <ModalBody maxHeight="400px" overflowY="scroll">
          <Card
  direction={{ base: 'column', sm: 'row' }}
  overflow='hidden'
  variant='outline'
>
<Stack>
    <CardBody>
      <Heading size='md'>Standard Gold Scheme(11 months)</Heading>

      <Text py='2'>
       Monthly= 5000/month
       Total= 55000
      </Text>
    </CardBody>

    <CardFooter>
    {isJoined ? (
                    <Button variant="solid" bgColor={"#c17171"} color={"#fff"} disabled>
                      Joined
                    </Button>
                  ) : (
      <Button variant='solid' bgColor={"#c17171"} mr={'4'} color={"#fff"} onClick={handleJoinClick} >
        Join
      </Button>  
        
                  )}      
      {/* <Button variant='solid' bgColor={"#c17171"} color={"#fff"} onClick={()=>setShow(true)} >
        Show More
      </Button>    */}
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
    "Get ready to strike gold with our Standard Golden Scheme! Make monthly payments of just Rs. 5000 for 11 months and receive gold worth Rs. 55,000 at the end of the scheme.
     It's the perfect way to save money while investing in gold - the ultimate symbol of wealth and prosperity.
      So why wait? Sign up for the Standard Golden Scheme today and let your savings shine!"

    </AccordionPanel>
  </AccordionItem>
  </Accordion>       
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
</Card>
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