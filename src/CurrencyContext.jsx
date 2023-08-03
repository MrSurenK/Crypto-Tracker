import React, { createContext, useContext, useState, useEffect } from "react";

// Store the context
const CurrencyCountry = createContext();

const CurrencyContext = ({ children }) => {
  const [currency, setCurrency] = useState("SGD");
  const [symbol, setSymbol] = useState("€");

  // useEffect to update changes in currency and update states
  useEffect(() => {
    if (currency === "SGD" || currency === "USD") setSymbol("$");
    else if (currency === "EUR") setSymbol("€");
  }, [currency]);

  // Currency.Provider refers to the createContext().provider object in React
  return (
    //states stored in the value prop of provider to be accessed in other components
    <CurrencyCountry.Provider value={{ currency, symbol, setCurrency }}>
      {children}
    </CurrencyCountry.Provider>
  );
};

export default CurrencyContext;

// To export the states out to the relevant components
export const CurrencyState = () => {
  return useContext(CurrencyCountry);
};
