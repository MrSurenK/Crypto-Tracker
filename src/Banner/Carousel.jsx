import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { CurrencyState } from "../CurrencyContext";
import { TrendingCoins } from "../config/endpoints";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";

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

  // Map the coins into the AliceCarousel Compononent library
  const items = trending.map((coin) => {
    return (
      <Link to={`/coins/${coin.id}`}>
        <img
          src={coin.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        ></img>
      </Link>
    );
  });

  //Responsive object prop for Alice Carousell
  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <Box sx={{ height: "50%", display: "flex", alignItems: "center" }}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlay
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        responsive={responsive}
        items={items}
      ></AliceCarousel>
    </Box>
  );
};

export default Carousel;
