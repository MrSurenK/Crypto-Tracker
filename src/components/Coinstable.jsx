import React, { useState, useEffect } from "react";
import { CoinList } from "../config/endpoints";
import { CurrencyState } from "../CurrencyContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import { Container } from "@mui/system";
import { CircularProgress, TextField, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import TableBody from "@mui/material/TableBody";

const Coinstable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  // Import from context API
  const { currency } = CurrencyState();

  const fetchCoins = async () => {
    setLoading(true);

    const res = await fetch(CoinList(currency));
    const data = await res.json();
    setCoins(data);

    setLoading(false);
  };

  //   console.log(coins);

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const darkMode = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark",
    },
  });

  //Handle search function for search bar
  //Search Logic: Searching for exact match with the coin name or the coin ticker
  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  return (
    <ThemeProvider theme={darkMode}>
      <Container sx={{ textAlign: "center" }}>
        <Typography variant="h4" sx={{ margin: 18, fontFamily: "Roboto" }}>
          Crypto Coins by Market Cap
        </Typography>
        <TextField
          label="Search"
          variant="outlined"
          sx={{ mb: 20, width: "100%" }}
          onChange={(e) => setSearch(e.target.value)}
        ></TextField>
        <TableContainer>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress sx={{ color: "gold" }} />
            </Box>
          ) : (
            <Table>
              <TableHead sx={{ bgcolor: "#EEBC1D" }}>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      sx={{
                        color: "black",
                        fontWeight: "700",
                        fontFamily: "Roboto",
                      }}
                      key={head}
                      align={head === "Coin" ? " " : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody></TableBody>
            </Table>
          )}
        </TableContainer>
      </Container>
    </ThemeProvider>
  );
};

export default Coinstable;
