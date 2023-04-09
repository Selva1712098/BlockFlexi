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
import axios from "axios";


function MySchemes({ isOpen, onClose, jewellerid, customerid }) {
  const [isSchemeOpen, setSchemeOpen] = useState(false);
 
  const [schemeId, setSchemeId] = useState([]);
  const [schemes, setSchemes] = useState([]);
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
  async function getSchemeID() {
    try {
      await axios.get("http://localhost:5000/GetSchemeID").then((res) => {
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
     
      axios.get("http://localhost:5000/GetScheme").then((res) => {
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

  const loanRequest = async (scheme) => {
    const schemeid = scheme.SchemeID;
    await axios
      .put("http://localhost:5000/CustomerSchemeEdit", {
        customerid,
        schemeid,
        loanreq: true,
      })
      .then((res) => {
        try {
          if (res.data.Status === "done") {
            alert("Your Request has been sent successfully");
          } else {
            alert(
              "You have already requested to withdraw, Please wait for confirmation"
            );
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
          <ModalHeader>My Schemes</ModalHeader>
          <ModalCloseButton />
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
                      <Heading size="md">{scheme.SchemeName}</Heading>

                      <Text py="2">
                        Monthly= {scheme.MonthlyPayment}
                        Total= {scheme.MonthlyPayment * 11}
                      </Text>
                    </CardBody>

                    <CardFooter>
                      <Button
                        variant="solid"
                        mr={4}
                        bgColor={"#c17171"}
                        color={"#fff"}
                      >
                        Pay
                      </Button>
                      <Button
                        variant="solid"
                        bgColor={"#c17171"}
                        color={"#fff"}
                        onClick={() => loanRequest(scheme)}
                      >
                        Withdraw
                      </Button>
                    </CardFooter>
                  </Stack>
                </Card>
              ))}
          </ModalBody>
          <ModalFooter>
           
            <Button bgColor={"#9A1B56"} color={"#fff"} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
export default MySchemes;
