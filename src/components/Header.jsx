import React, { useState, useEffect } from "react";
import { AppBar, Select, MenuItem } from "@mui/material";
import { Container } from "@mui/system";
import { Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CurrencyState } from "../CurrencyContext";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const Header = () => {
  // This hook is to return to the homepage whenever the crypto Tracker logo is cliked (Refer to onClick at Typography component)
  const navigate = useNavigate();

  // Import currency state from CurrencyContext
  const { currency, setCurrency } = CurrencyState();

  // Create state for Watchlist
  const { watchList, addWatchList } = useState([]);

  // Defined custom dark theme for the NavBar
  const darkMode = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkMode}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography
              sx={{
                flex: 1,
                color: "white",
                fontFamily: "Roboto",
                fontWeight: "bold",
                cursor: "pointer",
              }}
              variant={"h6"}
              onClick={() => navigate("/")}
            >
              CRYPTO TRACKER
            </Typography>
            <Stack spacing={2} direction="row">
              <Button
                variant="contained"
                sx={{ bgcolor: "orange", color: "black" }}
              >
                Watchlist
              </Button>
              <Select
                variant="outlined"
                style={{ width: 100, height: 40, marginRight: 15 }}
                defaultValue="SGD"
                onChange={(e) => setCurrency(e.target.value)}
              >
                <MenuItem value={"SGD"}>SGD</MenuItem>
                <MenuItem value={"USD"}>USD</MenuItem>
              </Select>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
