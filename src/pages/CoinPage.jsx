import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CurrencyState } from "../CurrencyContext";
import { SingleCoin } from "../config/endpoints";
import { styled } from "@mui/system";
import CoinInfo from "../components/CoinInfo";
import { Typography } from "@mui/material";
import { numberWithCommas } from "../Banner/Carousel";
import LinearProgress from "@mui/material/LinearProgress";
import parse from "html-react-parser";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import MyModal from "../components/MyModal";

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  //Create state for watchlist
  const [watchlist, setWatchlist] = useState([]);

  const { currency } = CurrencyState();

  const fetchCoin = async () => {
    const response = await fetch(SingleCoin(id));
    const data = await response.json();

    setCoin(data);
  };

  // Call the API with useEffect

  useEffect(() => {
    fetchCoin();
  }, []);

  // Styling of components
  const StyledContainer = styled("div")({
    display: "flex",
    [`@media (max-width:960px)`]: {
      flexDirection: "column",
      alignItems: "center",
    },
  });

  const StyledSidebar = styled("div")({
    width: "30%",
    [`@media(max-width:960px)`]: {
      width: "100%",
    },

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
    borderRight: "2px solid grey",
  });

  const StyledHeading = styled("h1")({
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Roboto",
  });

  const StyledDescription = styled("p")({
    width: "100%",
    fontFamily: "Roboto",
    padding: 25,
    paddingBottom: 15,
    paddingTop: 0,
    textAlign: "justify",
  });

  const StyledMarketData = styled("div")({
    alignSelf: "start",
    padding: 25,
    paddingTop: 10,
    width: "100%",
    [`@media (max-width:960px)`]: {
      display: "flex",
      justifyContent: "space-around",
    },

    [`@media (max-width: 600px)`]: {
      flexDirection: "column",
      alignItems: "center",
    },

    [`@media (max-width:400px)`]: {
      alignItems: "start",
    },
  });

  // Chart styling

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  const StyleChartContainer = styled("div")(({ theme }) => ({
    width: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    padding: 40,
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginTop: 0,
      padding: 20,
      paddingTop: 0,
    },
  }));

  // Button function to send data up to WatchList Modal
  const addToWatchList = () => {
    const itemImage = coin?.image.small;
    const itemSymbol = coin?.symbol;
    const itemPrice =
      coin?.market_data.current_price[currency.toLowerCase()].toFixed(2);
    const itemPriceChange = coin?.price_change_percentage_24h?.toFixed(2);
    setWatchlist((prevWatchlist) => [
      ...prevWatchlist,
      { itemImage, itemSymbol, itemPrice, itemPriceChange },
    ]);
  };

  // Coin price might take some time to fetch, so if no coin it needs to load
  if (!coin) return <LinearProgress sx={{ bgcolor: "Gold" }}></LinearProgress>;
  return (
    <>
      <StyledContainer>
        <StyledSidebar>
          <img
            src={coin?.image.large}
            alt={coin?.name}
            height="200"
            style={{ marginBottom: 20 }}
          />
          <StyledHeading>
            <div>
              <Typography variant="h3">{coin?.name}</Typography>
            </div>
          </StyledHeading>
          <StyledDescription>
            <div>
              <Typography variant="subtitle1">
                {parse(coin?.description.en.split(". ")[0].toString())}
              </Typography>
            </div>
          </StyledDescription>
          <StyledMarketData>
            <StyledHeading>
              <span style={{ display: "flex" }}>
                <Typography variant="h5" sx={{ fontFamily: "Roboto" }}>
                  Rank:
                </Typography>
                &nbsp; &nbsp;
                <Typography variant="h5" sx={{ fontFamily: "Roboto" }}>
                  {coin?.market_cap_rank}
                </Typography>
              </span>
              <span style={{ display: "flex" }}>
                <Typography variant="h5" sx={{ fontFamily: "Roboto" }}>
                  Current Price:
                </Typography>
                &nbsp; &nbsp;
                <Typography variant="h5" sx={{ fontFamily: "Roboto" }}>
                  ${" "}
                  {coin?.market_data.current_price[
                    currency.toLowerCase()
                  ].toFixed(2)}
                </Typography>
              </span>
              <span style={{ display: "flex" }}>
                <Typography variant="h5" sx={{ fontFamily: "Roboto" }}>
                  Market Cap:
                </Typography>
                &nbsp; &nbsp;
                <Typography variant="h5" sx={{ fontFamily: "Roboto" }}>
                  $
                  {numberWithCommas(
                    coin?.market_data.market_cap[
                      currency.toLowerCase()
                    ].toString()
                  )}
                </Typography>
              </span>
            </StyledHeading>
            {/* <Box
              sx={{
                display: "flex",
                marginTop: 25,
              }}
            ></Box> */}
            <Button
              onClick={() => addToWatchList()}
              variant="contained"
              sx={{ color: "black", bgcolor: "orange" }}
            >
              Add to Watchlist
            </Button>
            <MyModal
              watchlist={watchlist}
              setWatchlist={setWatchlist}
            ></MyModal>
          </StyledMarketData>
        </StyledSidebar>
      </StyledContainer>
      {/* coin is being propped over to the coininfo component */}

      <CoinInfo coin={coin} />
    </>
  );
};
export default CoinPage;
