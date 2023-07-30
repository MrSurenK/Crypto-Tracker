import React, { createContext, useContext, useState } from "react";

// Store the context
const CurrencyCountry = createContext();

const CurrencyContext = ({ children }) => {
  const [currency, setCurrency] = useState("SGD");
  // Currency.Provider refers to the createContext().provider object in React
  return (
    //states stored in the value prop of provider to be accessed in other components
    <CurrencyCountry.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyCountry.Provider>
  );
};

export default CurrencyContext;

// To export the states out to the relevant components
export const CurrencyState = () => {
  return useContext(CurrencyCountry);
};
