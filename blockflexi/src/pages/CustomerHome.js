import React, { useState } from "react";
import Header from "../components/Header";
import { ChakraProvider,  Stack } from "@chakra-ui/react";
import { SimpleGrid } from "@chakra-ui/react";
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
import MySchemes from "../components/Modals/MySchemes";
function CustomerHome() {
  const [isOpen, setIsOpen] = useState(false);
  const[isModalOpen,setisModalOpen]=useState(false);
  const handleSchemes=()=>{
    setisModalOpen(true);
  };
  const handleCloseSchemes=()=>{
    setisModalOpen(false);
  }

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <Header />
      <>
        <ChakraProvider>
          <SimpleGrid
            mt="20"
            mx="auto"
            mr={25}
            ml={25}
            justifyContent="center"
            alignItems={"center"}
            spacing="60px"
            templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
            style={{ margin: "120px 100px 145px 90px" }}
          >
            <Card
              size={"lg"}
              bgGradient="linear( #fadecb 0%, #fff8e3 100%)"
              h={"300px"}
            >
              <CardHeader>
                <Heading size="md"> Schemes</Heading>
              </CardHeader>
              <CardBody>
                <Text>
                  View all the schemes and join the scheme of your wish
                </Text>
              </CardBody>
              <CardFooter>
                <Stack spacing={1} direction="row">
                  <Button bgGradient="linear(to-b, #BF8F91, #CAA2A3, #D4B5B5, #DFC7C8)" 
                  onClick={handleSchemes} sx=
                {{margin:'0 0 0 -15px'}}>
                    View
                  </Button>
                  <Button
                    bgGradient="linear(to-b, #BF8F91, #CAA2A3, #D4B5B5, #DFC7C8)"
                    onClick={handleOpenModal} size='md'>
                    Join Scheme
                  </Button>
                  
                  <MySchemes isOpen={isModalOpen} onClose={handleCloseSchemes}/>
                  <Scheme isOpen={isOpen} onClose={handleCloseModal} />
                </Stack>
              </CardFooter>
            </Card>
            <Card
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
                  alignContent={"center"}
                >
                  Pay
                </Button>
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
            </Card>
          </SimpleGrid>
        </ChakraProvider>
      </>
    </div>
  );
}
export default CustomerHome;
