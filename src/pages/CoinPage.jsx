import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CurrencyState } from "../CurrencyContext";
import { SingleCoin } from "../config/endpoints";
import { Box } from "@mui/system";

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency } = CurrencyState();

  const fetchCoin = async () => {
    const { data } = await fetch(SingleCoin(id));

    setCoin(data);
  };

  // Call the API with useEffect

  useEffect(() => {
    fetchCoin();
    console.log(coin);
  }, []);

  return <Box sx={{}}></Box>;
};

export default CoinPage;
