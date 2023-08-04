import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import { numberWithCommas } from "../Banner/Carousel";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import TableBody from "@mui/material/TableBody";

const Coinstable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // Import from context API
  const { currency, symbol } = CurrencyState();

  const navigate = useNavigate();

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
        <Typography variant="h4" sx={{ margin: 10, fontFamily: "Roboto" }}>
          Crypto Coins By Market Cap
        </Typography>
        <TextField
          label="Search Crypto Coins..."
          variant="outlined"
          sx={{ mb: 5, width: "100%" }}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
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
                      align={head === "Coin" ? "left" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch()
                  // slice(0,10) if page === 1 ---> so each page will only show 10 coins (This is dynamic as the slice method will slice the appropriate index item based of the page state)
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  // If no search is done, all coins will be mapped as filter function in handleSearch will return a new array with all the coins as all of the coins have string value === true
                  .map((row) => {
                    const profit = row.price_change_percentage_24h >= 0;

                    return (
                      <TableRow
                        onClick={() => navigate(`/coins/${row.id}`)}
                        sx={{
                          cursor: "pointer",
                          "&:hover": { bgcolor: "#131111" }, //Check on this syntax
                          fontFamily: "Roboto",
                        }}
                        key={row.name}
                      >
                        {/* Table data column for the coin logo and name */}
                        <TableCell
                          component="th"
                          scope="row"
                          sx={{ display: "flex", gap: 2 }}
                        >
                          <img
                            src={row.image}
                            alt={row.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span style={{ color: "darkgrey" }}>
                              {row.name}
                            </span>
                          </div>
                        </TableCell>
                        {/* Table data column for the price */}
                        <TableCell align="right">
                          {symbol}
                          {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "rgb(14,203,129)" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right">
                          {symbol}
                          {numberWithCommas(row.market_cap.toString())}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <Stack spacing={2}>
          <Pagination
            count={(handleSearch().length / 10).toFixed(0)}
            style={{
              padding: 20,
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
            onChange={(_, value) => {
              setPage(value);
              window.scroll(0, 450);
            }}
          />
        </Stack>
      </Container>
    </ThemeProvider>
  );
};
export default Coinstable;
