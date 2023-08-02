import React, { useState, useEffect } from "react";
import { CurrencyState } from "../CurrencyContext";
import { HistoricalChart } from "../config/endpoints";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/system";
import { CircularProgress } from "@mui/material";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

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

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  const StyleContainer = styled("div")({
    width: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    padding: 40,
    [`@media(max-width:960px)`]: {
      width: "100%",
      marginTop: 0,
      padding: 20,
      paddingTop: 0,
    },
  });

  const labels = historicalPrice.map((coin) => {
    let date = new Date(coin[0]);
    // To display time in am/pm format
    // getHours returns the hour from 0 to 23

    let time =
      date.getHours() > 12
        ? `${date.getHours() - 12}:${date.getMinutes()} PM`
        : `${date.getHours()}:${date.getMinutes()} AM`;
    // If daily chart it will display the date, if less than daily then it will display the time
    return days === 1 ? time : date.toLocaleDateString();
  });

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: `Price (Past ${days} Days ) in ${currency}`,
        // From API data. Select the price in coin array
        data: historicalPrice.map((coin) => coin[1]),
        borderColor: "#EEBC1D",
      },
    ],
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <StyleContainer>
        {!historicalPrice ? (
          <CircularProgress sx={{ color: "gold" }} size={250} thickness={1} />
        ) : (
          <>
            <Chart data={chartData} />
          </>
        )}
      </StyleContainer>
    </ThemeProvider>
  );
};

export default CoinInfo;
