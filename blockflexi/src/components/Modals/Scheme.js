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
  import abi from '../../contracts/FlexiScheme.json'
  // import {ethers} from 'ethers';
  import Web3 from 'web3'
  // import { Snackbar } from "@mui/material";
  //import {utils} from 'ethers'
  //import {Web3Provider} from '@ethersproject/providers'
  

function Scheme({isOpen, onClose,jewellerid,customerid,jewellername,customerwallet,jewellerwallet,customername}){
  const[schemes,setSchemes]=useState('');
  
  // const[selectedScheme,setSelectedScheme]=useState(null);
  const [isJoined, setIsJoined] = useState(false);
  // const[schemeid,setSchemeId]=useState('')
   const[isLoading, setIsLoading] = useState(false)
   const contractaddress="0x13207eaFb0Db808e55d8C3FD9Fe3F7168AF9A929"
  
  console.log(contractaddress,abi)

  async function connect() {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.enable();
        const accounts = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();
        if (networkId !== 51) {
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
  async function joinscheme(schemes){
   
    const schemeid=schemes.SchemeID
    // console.log(schemeid,jewellerid,customerid)
    await axios.post('http://localhost:5000/JoinScheme',{
    jewellerid:jewellerid,customerid:customerid,
    schemeid:schemeid
    },).then(res=>{
      if(res.data.status==='exists'){
        alert("You have already joined this scheme")
      window.location.reload()
      }
      else if(res.data.status==='success'){
        console.log("Added to DB ")
       // alert("You have joined this scheme successfully.Go to your schemes to view them")
     //   window.location.reload()
        
      }
    })
  }
  async function addschemebc(scheme){
    try{
      const { web3, accounts } = await connect();
    
      
     
        const bfcontract = new web3.eth.Contract(abi, contractaddress);
    console.log(bfcontract);
        
        
        const _customerName=customername
        const _customerAddress=customerwallet
        const _jewellerName=jewellername
        const _jewellerAddress=jewellerwallet
        const _schemeName=scheme.SchemeName
        const _totalAmount=scheme.MonthlyPayment * 11
        const _monthlyAmount=scheme.MonthlyPayment
      
       
        try{
          const addscheme = await bfcontract.methods.addCustomerScheme(
            _customerName,
            _customerAddress,
            _jewellerName,
            _jewellerAddress,
            _schemeName,
            _totalAmount,
            _monthlyAmount
          ).send({from:accounts[0],gas:1000000});
          console.log('addscheme',addscheme)
          if(addscheme.status){
            alert("You have joined the scheme Successfully!")
            window.location.reload()
          }
          else{
            alert("Try again Later")
          }
          // const viewscheme=await bfcontract.methods.schemes(1).call()
          // console.log(viewscheme)
        }catch(e){
          console.log(e)
        }
       
        
          // let getscheme=await bfcontract.getScheme(1)
          // console.log(getscheme)
       
       
        
      
    }catch(e){
      console.error(e)
    }
  }
  useEffect(() => {
    async function fetchData() {
     
      try {
        // Make a GET request to the /schemes API endpoint
        await axios.get("http://localhost:5000/JewellerScheme").then(res=>{
          if(res.data.status==='success'){
            const sc1=res.data.schemes.filter(sc=>sc.JewellerID===jewellerid)
            console.log(sc1)
            setSchemes(sc1)
            
          }
          else{
            alert("There is no jeweller ")
          }
        });

        // Set the retrieved schemes in the state
       
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, [jewellerid]);
  
 
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
  key={scheme.SchemeID}
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
          <Button variant='solid' onClick={()=>{addschemebc(scheme); joinscheme(scheme)}} bgColor={"#c17171"} mr={'4'} color={"#fff"}>
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
            {/* <Button variant='ghost'mr={3} >Go to MySchemes</Button> */}
            
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