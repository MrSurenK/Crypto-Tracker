import React, { useState, useEffect } from "react";
import { CurrencyState } from "../CurrencyContext";
import { HistoricalChart } from "../config/endpoints";

const CoinInfo = ({ coin }) => {
  // Initialise historical data state
  const [historicalPrice, setHistoricalPrice] = useState();

  // Initialise state for day at 1
  const [days, setDays] = useState(1);

  // import Context API to get currency state
  const { currency } = CurrencyState();

  // call the API
  const fetchHistoricalPrices = async () => {
    const res = await fetch(HistoricalChart(coin.id, days, currency));
    const data = await res.json();
    console.log(data);
    setHistoricalPrice(data.prices);
  };

  // Call the data with useEffect on mount
  // Update state if currency or days changes
  useEffect(() => {
    fetchHistoricalPrices();
  }, [currency, days]);

  return <div>Coin Chart</div>;
};

export default CoinInfo;
