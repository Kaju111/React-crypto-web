import React, { useEffect } from 'react';
import {
  Box,
  Container,
  HStack,
  Radio,
  RadioGroup,
  VStack,
  Text,
  Image,
  Stat,
  StatLabel,

} from '@chakra-ui/react';
import Loader from './Loader';
 import { useState } from 'react';
 import { useParams } from 'react-router-dom';
 import axios from 'axios';
 import { server } from '../index';
import ErrorComponents from './ErrorComponents';

  const CoinDetails = () => {
   const [Coin, setCoin] = useState({});
   const [loading, setloading] = useState(true);
   const [error, setError] = useState(false);
   const [currency, setCurrency] = useState('inr');
   const currencySymbol = currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const params = useParams();

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);
        console.log(data)
        setCoin(data);
        setloading(false);
      } catch (error) {
        setError(true);
        setloading(false);
      }
    };

    fetchCoin();
  }, [params.id]);


  if (error)
  return <ErrorComponents message={'Error while Fetching Coin'} />;


  return (
    <Container maxW={'container.xl'}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box width={'full'} borderWidth={1}>
            kaj
          </Box>

          <RadioGroup value={currency} onChange={setCurrency} p={'8'}>
            <HStack spacing={'4'}>
              <Radio value="inr">INR</Radio>
              <Radio value="usd">USD</Radio>
              <Radio value="eur">EUR</Radio>
            </HStack>
          </RadioGroup>

          <VStack spacing={'4'} p="16" alignItems={'flex-start'}>
            <Text fontSize={'small'} alignSelf={'center'} opacity={'0.7'}>
              Last Updated On{""} {Date(Coin.market_data.last_updated).split('G')[0]}
            </Text>

            <Image src={Coin.image.large} 
              w={"16"}
              h={"16"}
             objectFit={"contain"} 
            />
            <Stat>

          <StatLabel>{Coin.name}</StatLabel>
          <statNumber>{currencySymbol}</statNumber>

            </Stat>
          </VStack>
        </>
      )}
    </Container>
  );
 };

export default CoinDetails;
