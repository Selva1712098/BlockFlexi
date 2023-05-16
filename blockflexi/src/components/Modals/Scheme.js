import React, { useState, useEffect } from "react";
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
    Box
  } from '@chakra-ui/react'
  import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
   
  } from '@chakra-ui/react'
  import Swal from "sweetalert2";
  import { Card, CardBody, CardFooter, Heading } from '@chakra-ui/react'
  // import axios from "axios";
  import axios from '../../integration'

  import abi from '../../contracts/FlexiScheme.json'
  // import {ethers} from 'ethers';
  import Web3 from 'web3'
  // import { Snackbar } from "@mui/material";
  //import {utils} from 'ethers'
  //import {Web3Provider} from '@ethersproject/providers'
  

function Scheme({isOpen, onClose,jewellerid,customerid,jewellername,customerwallet,jewellerwallet,customername}){
  const[schemes,setSchemes]=useState('');
  // const[open,setOpen]=useState(false)
  // const[selectedScheme,setSelectedScheme]=useState(null);
  const [isJoined, setIsJoined] = useState(false);
 
  // const[schemeid,setSchemeId]=useState('')
  
  //  const[isLoading, setIsLoading] = useState(false)
   const contractaddress="0xfEdB6cbf8a55D553eECc93dE4e7839C81266379e"
  
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
    onClose()
    const schemeid=schemes.SchemeID
    const schemename=schemes.SchemeName
    // console.log(schemeid,jewellerid,customerid)
    await axios.post('/JoinScheme',{
    jewellerid:jewellerid,customerid:customerid,
    schemeid:schemeid,
    schemename:schemename,
   
    },).then(res=>{
      if(res.data.status==='exists'){

         Swal.fire({
        icon:'warning',
        title:'Already Enrolled',
        text:'You have already enrolled to this Scheme',
        confirmButtonColor:"#9A1B56"
       }).then(result=>{
        if(result.isConfirmed){
          window.location.reload();
        }
       })
       
        
         
        
      
    
      }
      else{
        addschemebc(schemes)
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
          
       
        statuschange(scheme)
        
          
           
            
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
  const statuschange = async(scheme)=>{
    await axios.put('/StatusChange',{
            customerid,jewellerid,schemeid:scheme.SchemeID
          }).then(
            res =>{
              if(res.data.status == 200){
                Swal.fire({
                  icon: 'success',
                  title: 'Scheme Added!',
                  text: 'You have Joined the Scheme',
                  confirmButtonColor:"#9A1B56"
                }).then((result)=>{
                  if(result.isConfirmed){
                    window.location.reload()
                  }
                });  
                //alert("You have joined the scheme successfully")
              }
            }
          )

        

  }
  useEffect(() => {
    async function fetchData() {
     
      try {
        // Make a GET request to the /schemes API endpoint
        await axios.get("/JewellerScheme").then(res=>{
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
  
// if(open){
//   Swal.fire({
//     icon: 'success',
//     title: 'Scheme Added!',
//     text: 'You have Joined the Scheme',
//     confirmButtonColor:"#9A1B56"
//   }).then((result)=>{
//     if(result.isConfirmed){
//       window.location.reload()
//     }
//   });  
// }
 
  

 
    return(
<div>
<Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay/>
    <ModalContent maxW="50%">
          <ModalHeader style={{fontFamily:'Libre Baskerville,serif',backgroundColor:'#9a1b56',color:'white'}}>Schemes</ModalHeader>
          <ModalCloseButton style={{color:'white'}} />
         
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
        <Heading size='md' style={{fontFamily:'Libre Baskerville,serif'}}>{scheme.SchemeName}</Heading>

        <Text py='2' style={{fontFamily:'Libre Baskerville,serif'}}>
          {scheme.MonthlyPayment}
        </Text>
      </CardBody>

      <CardFooter>
        {/* {scheme.isJoined ? (
          <Button variant="solid" bgColor={"#c17171"} color={"#fff"} >
            Joined
          </Button>
        ) : ( */}
          <Button variant='solid' onClick={()=>{ joinscheme(scheme)}} bgColor={"#c17171"} mr={'4'} color={"#fff"}>
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
      

          </ModalBody>
          <ModalFooter>
            {/* <Button variant='ghost'mr={3} >Go to MySchemes</Button> */}
            
            <Button style={{fontFamily:'Libre Baskerville,serif'}} bgColor={"#9A1B56"} color={"#fff"}  onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
        
    </Modal>
</div>
    )
}
export default Scheme;