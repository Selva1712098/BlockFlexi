import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
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
import Pay from "./Pay";
function CustomerHome() {
  const {JewellerID}=useParams()
  console.log(JewellerID)
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setisModalOpen] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["customer_sessionId"]);
  const navigate=useNavigate()
  const [isActive, setIsActive] = useState(false);

  

  // const handleSchemeidChange=(sid)=>{
  //   setSchemeId(sid)
  //   console.log(sid)
  // }
  
  
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
      <br/>

      
        
      <h1 className="tpb">Welcome!!!</h1>
      {/* <Button className="btn1" bgColor={"blue"} color="white"_hover={{bgColor:'white',color:'blue'}}  onClick={logout}>Logout</Button> */}
      </div>
      <br/>
      <br/>
        {/* <ChakraProvider>
          <SimpleGrid
            mt="20"
           
            mx="auto"
            justifyContent="right"
            alignItems={"right"}
            spacing="60px"
          >
            
          </SimpleGrid>
        </ChakraProvider> */}
        <ChakraProvider>
          {/* <SimpleGrid
            mt="20"
            mx="auto"
            mr={25}
            ml={25}
            justifyContent="center"
            alignItems={"center"}
            spacing="60px"
            templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
            style={{ margin: "60px 100px 145px 90px" }} */}
          
            <Card className="chcard"
              size={"lg"}
              bgGradient="linear( #fadecb 0%, #fff8e3 100%)"
              h={"300px"}
            >
              <CardHeader>
                <Heading size="md"> Schemes</Heading>
              </CardHeader>
              <CardBody>
                <Text>
                Join the future of finance with Blockflexi, pay and withdraw with the power of blockchain!
                </Text>
              </CardBody>
              <CardFooter>
                {/* <Stack direction="row"> */}
                <div className="cht">
                  <Button className="chbtt"
                    bgGradient="linear(to-b, #BF8F91, #CAA2A3, #D4B5B5, #DFC7C8)"
                    onClick={handleSchemes}
                   
                  >
                    View all your Schemes
                  </Button>
                  <Button className="chbtt1"
                    bgGradient="linear(to-b, #BF8F91, #CAA2A3, #D4B5B5, #DFC7C8)"
                    onClick={handleOpenModal}
                    size="md"
                    
                  >
                    Join Scheme
                  </Button>


                  <MySchemes
                    isOpen={isModalOpen}
                    onClose={handleCloseSchemes}
                    jewellerid={JewellerID}
                    customerid={token.id}
                    
                  />
                  <Scheme isOpen={isOpen} onClose={handleCloseModal} jewellerid={JewellerID} customerid={token.id} />
                {/* </Stack> */}
             </div>
              </CardFooter>
            </Card>
            {/* <Card
              size={"lg"}
              bgGradient="linear( #fadecb 0%, #fff8e3 100%)"
              h={"300px"}
            >
              <CardHeader>
                <Heading size="md"> Pay Installment</Heading>
              </CardHeader>
              <CardBody>
                <Text>Pay your monthly payment</Text>
              </CardBody>
              <CardFooter justifyContent="center">
                
                <Button
                  bgGradient="linear(to-b, #BF8F91, #CAA2A3, #D4B5B5, #DFC7C8)"
                  alignContent={"center"} onClick={handleButtonPay}
                >
                  Pay
                </Button>
                <section className={`${isActive ? 'active' : ''}`}>
                  <Pay />
                  </section>
               
              </CardFooter>
            </Card>
            <Card
              size={"lg"}
              bgGradient="linear( #fadecb 0%, #fff8e3 100%)"
              h={"300px"}
            >
              <CardHeader>
                <Heading size="md"> Request Loan</Heading>
              </CardHeader>
              <CardBody>
                <Text>Ready to withdraw your goal? Request for it.</Text>
              </CardBody>
              <CardFooter justifyContent="center">
                <Button bgGradient="linear(to-b, #BF8F91, #CAA2A3, #D4B5B5, #DFC7C8)">
                  Request
                </Button>
              </CardFooter>
            </Card>
            <Card
              size={"lg"}
              bgGradient="linear( #fadecb 0%, #fff8e3 100%)"
              h={"300px"}
            >
              <CardHeader>
                <Heading size="md"> Claim Gold</Heading>
              </CardHeader>
              <CardBody>
                <Text>
                  Are you done with the installments? Withdraw your gold.
                </Text>
              </CardBody>
              <CardFooter justifyContent="center">
                <Button bgGradient="linear(to-b, #BF8F91, #CAA2A3, #D4B5B5, #DFC7C8)">
                  Claim
                </Button>
              </CardFooter>
            </Card> */}
          {/* </SimpleGrid> */}
        </ChakraProvider>
    
    </>
  );
}
export default CustomerHome;
