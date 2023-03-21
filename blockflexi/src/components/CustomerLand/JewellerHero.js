import React, { useEffect, useState } from "react";
import jewellers from './jewellers.json'
import { 
  Box, 
  Flex, 
  Heading, 
  Text, 
  Button,
  Card,
  SimpleGrid,
  CardBody,
  CardHeader,
  CardFooter
} from '@chakra-ui/react'
import styled from "@emotion/styled";
import axios from "axios";

function JewellerHero(){
  const[jewellers,setJewellers]=useState('');
  useEffect(()=>{
    async function fetchData(){
      try{
        const response= await axios.get("http://localhost:5000/viewjewellers");
        setJewellers(response.data);
      }catch(err){
        console.error(err);
      }
    }
    fetchData();
  },[]);
  const ArticleCard = styled(Card)`
  background: #FFF;
  margin: 0 0 20px;
  padding: 20px;
  border-radius: 2px;
  box-shadow: 0 2px 4px rgba(#000, 0.2);
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    box-shadow: 0 2px 4px rgba(#000, 0.2), 0 4px 8px rgba(#000, 0.2);
  }

  &:active {
    box-shadow: none;
    transform-origin: center;
    transform: scale(0.98);
  }
`;
  return (
     <div style={{textAlign: 'center'}}>
      <h1>Trusted Jewellers</h1>
      <Box maxWidth="960px" margin="0 auto" display="grid" gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={10}>
        {jewellers && jewellers.map((jeweller) => (
          <ArticleCard key={jeweller.JewellerID} h={"300px"}>
            <CardHeader>
              <Heading size='md'>{jeweller.JewellerName}</Heading>
            </CardHeader>
            <CardBody>
              <Text>hello</Text>
            </CardBody>
            <CardFooter>
              <Button>View here</Button>
            </CardFooter>
          </ArticleCard>
        ))}
      </Box>
    </div>
  );
}

export default JewellerHero;
