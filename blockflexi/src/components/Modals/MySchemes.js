import React, { useState, useEffect } from "react";
import { Stack } from "@chakra-ui/react";
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
} from "@chakra-ui/react";
import { Card, CardBody, CardFooter, Heading } from "@chakra-ui/react";
// import axios from "axios";
import axios from '../../integration'

import { Link } from "react-router-dom";
import Web3 from "web3";
import abi from '../../contracts/FlexiScheme.json'
import Swal from "sweetalert2";

function MySchemes({ isOpen, onClose, jewellerid, customerid,customername,jewellername }) {
  const [isSchemeOpen, setSchemeOpen] = useState(false);
  const contractaddress="0x8B9Ce2D6A5b472F1B8A96d859bDCE88b254435F8"
  const [schemeId, setSchemeId] = useState([]);
  const [schemes, setSchemes] = useState([]);
  //const[open,setOpen]=useState(false)
  const handleSchemes = (data) => {
    //console.log('id',data)
    if (data && data.length > 0) {
      setSchemeId([...data]);
    } else {
      setSchemeId([]);
    }
  };

  const handleSchemeName = (data) => {
    console.log("datas:", data);
    if (data && data.length > 0) {
      setSchemes([...data]);
    } else {
      setSchemes([]);
    }
  };
  const handleScheme = () => {
    setSchemeOpen(true);
  };
  const handleCloseScheme = () => {
    setSchemeOpen(false);
  };
  const handleCloseAndOpenScheme = () => {
    onClose();
    handleScheme();
  };
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
  async function getSchemeID() {
    try {
      await axios.get("/GetSchemeID").then((res) => {
        if (res.data) {
          const sc1 = res.data.schemecheck.filter(
            (sc) => sc.JewellerID === jewellerid && sc.CustomerID === customerid
          );
          console.log("get scheme id", sc1);
          handleSchemes(sc1);
        } else {
          console.log("Could not get your Scheme");
        }
      });
    } catch (e) {
      console.log(e);
    }
  }
  async function getScheme() {
    try {
     
      axios.get("/GetScheme").then((res) => {
        console.log(res.data.schemecheck);
        const response = res.data.schemecheck;
        const schemes = response.filter((res) => {
          return schemeId.some((res2) => res2.SchemeID === res.SchemeID);
        });
        console.log("necessary", schemes);
        handleSchemeName(schemes);
       
      });
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getSchemeID();
  }, []);
  useEffect(() => {
    getScheme();
  }, [schemeId]);

  const checkbalance=async (scheme)=>{
   
    const { web3, accounts } = await connect();
    
      
     
        const bfcontract = new web3.eth.Contract(abi, contractaddress);
    console.log(bfcontract);
    try{
      const _customerName=customername
      const _jewellerName=jewellername
      const _schemeName=scheme.SchemeName

      const getbal=await bfcontract.methods.getMonthsPaid(_customerName,_jewellerName, _schemeName).call()
      console.log(getbal)
      

      if( getbal>=3){
        loanRequest(scheme)
      }
      else{
        // alert(`You have paid for ${Math.ceil(monthsPaid)} months.Please Pay Consecutively for 3 months and apply for Loan.`)
      Swal.fire({
        icon:'warning',
        title:'Not Paid enough ',
        text:`You have paid for ${getbal} months.Please Pay Consecutively for 3 months and apply for Loan.`,
        confirmButtonColor:"#9A1B56"
      })
      }
      
    }catch(err){
      console.log(err)
    }
    onClose()
  }

  const loanRequest = async (scheme) => {
    const schemeid = scheme.SchemeID;
    await axios
      .put("/CustomerSchemeEdit", {
        customerid,
        schemeid,
        loanreq: true,
        jewellerid
      })
      .then((res) => {
        try {
          if (res.data.Status === "done") {
           Swal.fire({
            icon:'success',
            title:'Request Sent',
            text:'Your request has been sent successfully',
            confirmButtonColor:"#9A1B56"
           })
          } else {
            Swal.fire({
              icon:'warning',
              title:'Waiting for Confirmation',
              text:'You have already requested to withdraw, Please wait for confirmation',
             confirmButtonColor:"#9A1B56"
             })
            // alert(
            //   "You have already requested to withdraw, Please wait for confirmation"
            // );
          }
        } catch (e) {
          alert("Something went Wrong.Try again later");
          console.log(e);
        }
      });
  };

  

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW="50%">
          <ModalHeader style={{fontFamily:'Libre Baskerville,serif',backgroundColor:'#9a1b56',color:'white'}}>My Schemes</ModalHeader>
          <ModalCloseButton  style={{color:'white'}}/>
          {/* <Button variant="contained" onClick={() => getScheme()}>
            Refresh
          </Button> */}
          <ModalBody maxHeight="400px" overflowY="scroll">
            {Array.isArray(schemes) &&
              schemes.map((scheme, index) => (
                <Card
                  direction={{ base: "column", sm: "row" }}
                  overflow="hidden"
                  variant="outline"
                  key={scheme.SchemeID}
                >
                  <Stack>
                    <CardBody>
                      <Heading size="md" style={{fontFamily:'Libre Baskerville,serif'}}>{scheme.SchemeName}</Heading>

                      <Text py="2" style={{fontFamily:'Libre Baskerville,serif'}}>
                        Monthly= {scheme.MonthlyPayment} {"  "}
                        Total= {scheme.MonthlyPayment * 11}
                      </Text>
                    </CardBody>

                    <CardFooter>
                      <Link to={`/Pay/${customerid}/${jewellerid}/${scheme.SchemeID}` } state={{data:{customername:customername,jewellername:jewellername}}}>
                      <Button style={{fontFamily:'Libre Baskerville,serif'}}
                        variant="solid"
                        mr={4}
                        bgColor={"#c17171"}
                        color={"#fff"}
                      >
                        Pay
                      </Button>
                      </Link>
                      <Button style={{fontFamily:'Libre Baskerville,serif'}}
                        variant="solid"
                        bgColor={"#c17171"}
                        color={"#fff"}
                        onClick={() => checkbalance(scheme)}
                      >
                        Withdraw
                      </Button>
                    </CardFooter>
                  </Stack>
                </Card>
              ))}
          </ModalBody>
          <ModalFooter>
           
            <Button style={{fontFamily:'Libre Baskerville,serif'}} bgColor={"#9A1B56"} color={"#fff"} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
export default MySchemes;
