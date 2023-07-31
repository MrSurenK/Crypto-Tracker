import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { CurrencyState } from "../CurrencyContext";
import { TrendingCoins } from "../config/endpoints";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { Link } from "react-router-dom";

// regex string to add commas between dollar value: https://stackoverflow.com/questions/2901102/how-to-format-a-number-with-commas-as-thousands-separators
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

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
    // Calculating profit = true
    let profit = coin.price_change_percentage_24h >= 0;
    return (
      <Link
        style={{
          dislpay: "flex",
          flexDirection: "column",
          alignItems: "cemter",
          cursor: "pointer",
          textTransform: "uppercase",
          color: "white",
        }}
        to={`/coins/${coin.id}`}
      >
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        ></img>
        <span>
          {coin?.symbol}
          &nbsp;
          <span
            style={{
              color: profit > 0 ? "rgb(14,203,129)" : "red",
              fontWeight: 500,
            }}
          >
            {/* if profit disaply +, - alr displayed in dataset so just need to add + to positive price changes */}
            {/* Disaply 2dp with a % at the back */}
            {profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          ${numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });

  //Responsive object prop for Alice Carousell
  const responsive = {
    0: {
      items: 2,
    },
    1024: {
      items: 4,
    },
  };

  return (
    <Box
      sx={{
        width: "80%",
        margin: "0 auto",
        height: "50%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <AliceCarousel
        mouseTracking
        // infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        autoPlay
        items={items}
      />
    </Box>
  );
};

export default Carousel;
