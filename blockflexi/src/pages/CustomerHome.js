import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { useCookies } from "react-cookie";
import { ChakraProvider, Stack } from "@chakra-ui/react";
import { SimpleGrid } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
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
function CustomerHome() {
  const {JewellerID}=useParams()
  console.log(JewellerID)
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setisModalOpen] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["customer_sessionId"]);
  const navigate=useNavigate()
  // const [schemeid,setSchemeId]=useState('')

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
  return (
    <>
      <div >
      <Header />
      <br/>
      <h1 className="tpb">Welcome!!!</h1>

      </div>
     
        
        <ChakraProvider>
          <SimpleGrid
            mt="20"
           
            mx="auto"
            justifyContent="right"
            alignItems={"right"}
            spacing="60px"
          >
            <Button bgColor={"blue"} color="white"_hover={{bgColor:'white',color:'blue'}} sx={{margin:'10px 20px 0 0'}} onClick={logout}>Logout</Button>
          </SimpleGrid>
        </ChakraProvider>
        <ChakraProvider>
        
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
              <Text style={{fontSize:'20px'}}>
                Join the future of finance with Blockflexi, pay and withdraw with the power of blockchain!
                </Text>
              </CardBody>
              <CardFooter>
              <div className="cht">
                  <Button className="chbtt"
                    bgGradient="linear(to-b, #BF8F91, #CAA2A3, #D4B5B5, #DFC7C8)"
                    onClick={handleSchemes}
                   
                  >
                    View Schemes
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
                  </div>
              </CardFooter>
            </Card>
           
           
         
        </ChakraProvider>
     
    </>
  );
}
export default CustomerHome;
