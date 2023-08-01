import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CurrencyState } from "../CurrencyContext";
import { SingleCoin } from "../config/endpoints";
import { styled } from "@mui/system";
import CoinInfo from "../components/CoinInfo";
import { Typography } from "@mui/material";

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency } = CurrencyState();

  const fetchCoin = async () => {
    const { data } = await fetch(SingleCoin(id));

    setCoin(data);
  };

  // Call the API with useEffect

  useEffect(() => {
    fetchCoin();
  }, []);

  // Styling of components
  const StyledContainer = styled("div")({
    display: "flex",
    [`media (max-width:960px)`]: {
      flexDirection: "column",
      alignItems: "center",
    },
  });

  const StyledSidebar = styled("div")({
    width: "30%",
    [`media(max-width:960px)`]: {
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

  return (
    <>
      <StyledContainer>
        <StyledSidebar>
          <img
            src={coin?.image}
            alt={coin?.name}
            height="200"
            style={{ marginBottom: 20 }}
          />
          <StyledHeading>
            <Typography variant="h3">{coin?.name}</Typography>
          </StyledHeading>
          <StyledDescription>
            <Typography></Typography>
          </StyledDescription>
        </StyledSidebar>
      </StyledContainer>

      <CoinInfo coin={coin} />
    </>
  );
};
export default CoinPage;
