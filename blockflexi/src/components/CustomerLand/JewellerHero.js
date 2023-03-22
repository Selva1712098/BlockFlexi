import React, { useEffect, useState, forwardRef, useNavigate } from "react";
import { Link } from 'react-router-dom';
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
// const JewellerHero=forwardRef((props,ref)=>{

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
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    transform: translateY(-2px);
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
          <ArticleCard>
          <Link to={`/CustomerHome/${jeweller.JewellerID}`}>
            <CardHeader>
              <Heading size='md'>{jeweller.JewellerID}</Heading>
            </CardHeader>
            <CardBody>
              <Text>hello</Text>
            </CardBody>
            {/* <CardFooter>
              <Button>View here</Button>
            </CardFooter> */}
          </Link>
          </ArticleCard>
          
        ))}
      </Box>
    </div>
  );

}
export default JewellerHero;
