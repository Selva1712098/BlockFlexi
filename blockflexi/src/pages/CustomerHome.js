import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ChakraProvider, Stack } from "@chakra-ui/react";
import { SimpleGrid } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import './CustomerHome.css';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Button,
} from "@chakra-ui/react";
import Scheme from "../components/Modals/Scheme";
import jwtDecode from "jwt-decode";
import MySchemes from "../components/Modals/MySchemes";
import './CustomerHome.css'
import Header from "../components/Header";
import Web3 from 'web3'
function CustomerHome() {
  const {JewellerName,JewellerID}=useParams()
  const location=useLocation()
  console.log(location)
  const jewellerwallet=location.state.data.jewellerwallet
  const customerwallet=location.state.data.customerwallet
  console.log(JewellerID)
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setisModalOpen] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["customer_sessionId"]);
  const[loading,setLoading]=useState(false)
  const navigate=useNavigate()
  const [isActive, setIsActive] = useState(false);
  const[off,setOff]=useState(false)
  function handleLoader(){
    setLoading(!loading)
  }

  async function connect() {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.enable();
        const accounts = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();
        if (networkId !== 888) {
          alert("Please connect to XDC Wallet")
          setOff(true)
         
          throw new Error("Please connect to XDC network.");
         
        }
        return { web3, accounts };
      } catch (error) {
        alert("Please Create an account in the XDC Xinfin network")
        throw new Error("Please connect to Metamask to connect to XDC network.");
      }

    } else {
      setOff(true)
      alert("Please install XDC pay Extension")
      throw new Error("Please install Metamask to connect to XDC network.");
    }
  }
 useEffect(()=>{
 
  connect()
 },[])
    
  
  const token = jwtDecode(cookies.customer_sessionId);

  console.log(token);

  useEffect(() => {
    if (!token) {
      alert("you are not logged in , please login");
      navigate("/");
    }
  }, [token]);

  const handleSchemes = () => {
    setisModalOpen(true);
  };
  const handleCloseSchemes = () => {
    setisModalOpen(false);
  };

  const logout = () => {
    removeCookie('customer_sessionId');
    navigate('/',{replace:true});

  };
  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleButtonPay = () => {
    setIsActive(!isActive);
  };

 
  
      
   
  return (
    <>
      <div >
     <Header />
      <br/>
      <h1 className="tpb" style={{fontFamily:'Libre Baskerville,serif'}}>Welcome!!!</h1>

      </div>
     
        
        <ChakraProvider>
          <SimpleGrid
            mt="10"
           
            mx="auto"
            justifyContent="right"
            alignItems={"right"}
            spacing="60px"
          >
             <Button color={'white'} _hover={{backgroundColor:'white',color:'#9a1b56'}} sx={{margin:'0px 40px 20px 0',backgroundColor:'#9a1b56'}} onClick={logout}>LOGOUT</Button>
          </SimpleGrid>
        </ChakraProvider> 
        <ChakraProvider>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
            <Card
              size={"sm"}
              bgGradient="linear( #fadecb 0%, #fff8e3 100%)"
              h={"300px"}
              className="chcard"
              

            >
              <CardHeader>
                <Heading size="md" style={{fontSize:'30px'}}> Schemes</Heading>
              </CardHeader>
              <CardBody>
              <Text style={{fontSize:'20px', fontFamily:'Libre Baskerville,serif'}}>
                Join the future of finance with Blockflexi, pay and withdraw with the power of blockchain!
                </Text>
              </CardBody>
              <CardFooter>
              <div className="cht">
              <Button className="chbtt1" style={{fontFamily:'Libre Baskerville,serif'}}
                    bgGradient="linear(to-b, #BF8F91, #CAA2A3, #D4B5B5, #DFC7C8)"
                    onClick={handleOpenModal}
                    size="md"
                    
                  >
                    Join Scheme
                  </Button>
                  <Button className="chbtt" style={{fontFamily:'Libre Baskerville,serif'}}
                    bgGradient="linear(to-b, #BF8F91, #CAA2A3, #D4B5B5, #DFC7C8)"
                    onClick={handleSchemes}
                   
                  >
                    View Schemes
                  </Button>
                 


                  <MySchemes
                    isOpen={isModalOpen}
                    onClose={handleCloseSchemes}
                    jewellerid={JewellerID}
                    customerid={token.id}
                    customername={token.name}
                    jewellername={JewellerName}
                    
                  />
                  <Scheme isOpen={isOpen} onClose={handleCloseModal} handleLoader={handleLoader} jewellerid={JewellerID} jewellername={JewellerName} customername={token.name} customerwallet={customerwallet} jewellerwallet={jewellerwallet} customerid={token.id} />
                  </div>
              </CardFooter>
            </Card>
            </div>
           
         
        </ChakraProvider>
        {loading&& <div className={`overlay ${loading ? 'active' : ''}`}>
        <div className="processing-container">
          <div className="processing-icon"></div>
          {/* <div className="processing-text">Wait a Moment Please...</div> */}
        </div>
      </div>}

      {off && <div className={`overlay-1 ${off ? 'active' : ''}`}>
        <div className="processing-container-1">
         
          <div className="processing-text-1">Please Install XDCPAY Wallet and Refresh the page.</div>
        </div>
      </div>}
     
    </>
  );
}
export default CustomerHome;
