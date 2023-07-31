import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import CurrencyContext from "./CurrencyContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CurrencyContext>
      <App />
    </CurrencyContext>
  </React.StrictMode>
);
