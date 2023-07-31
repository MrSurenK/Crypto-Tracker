import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { CurrencyState } from "../CurrencyContext";
import { TrendingCoins } from "../config/endpoints";

const Carousel = () => {
  // Create new states to store the data of the top coins
  const [trending, setTrending] = useState([]);

  // Get state of currency
  const { currency } = CurrencyState();
  //Fetch top 7 coins with default Get Method
  const topCoins = async () => {
    const res = await fetch(TrendingCoins(currency));
    const data = await res.json();
    setTrending(data);
  };

  console.log(trending);

  // Call the topCoins function when it is rendered
  useEffect(() => {
    topCoins();
  }, [currency]);

  return (
    <Box sx={{ height: "50%", display: "flex", alignItems: "center" }}>
      Carousell
    </Box>
  );
};

export default Carousel;
