import React, { useState, useEffect } from "react";
import { CurrencyState } from "../CurrencyContext";

const CoinInfo = () => {
  // Initialise historical data state
  const [historicalData, setHistoricalData] = useState();

  // Initialise state for day at 1
  const [days, setDays] = useState(1);

  // import Context API to get currency state
  const { currency } = CurrencyState();

  return <div>Coin Info</div>;
};

export default CoinInfo;
