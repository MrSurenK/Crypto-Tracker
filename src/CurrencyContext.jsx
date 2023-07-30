import { createContext, useState, useEffect } from "react";

// Define currency context
const currency = createContext({});

// Allow just this function to be imported as a module from this file
const CurrencyContext = ({ children }) => {
  return <CurrencyContext.Provider>{children}</CurrencyContext.Provider>;
};

// Exports this file
export default CurrencyContext;
