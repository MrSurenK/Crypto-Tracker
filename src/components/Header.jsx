import React, { useState, useEffect } from "react";
import { AppBar, Select, MenuItem } from "@mui/material";
import { Container } from "@mui/system";
import { Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CurrencyState } from "../CurrencyContext";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import MyModal from "./MyModal";
import Box from "@mui/material/Box";

const Header = () => {
  // This hook is to return to the homepage whenever the crypto Tracker logo is cliked (Refer to onClick at Typography component)
  const navigate = useNavigate();

  // Modal states and functions to open
  const [showModal, setShowModal] = useState(false);

  // Modal styling
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#536878",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    color: "White",
    textAlign: "center",
    fontFamily: "Roboto",
  };

  // Import currency state from CurrencyContext
  const { currency, setCurrency } = CurrencyState();

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
              onClick={() => setShowModal(true)}
              variant="contained"
              sx={{ color: "black", bgcolor: "orange" }}
            >
              Watchlist
            </Button>
            <MyModal
              open={showModal}
              onClose={() => setShowModal(false)}
            ></MyModal>

            <Select
              variant="outlined"
              style={{ width: 100, height: 40, marginRight: 15 }}
              defaultValue="SGD"
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"SGD"}>SGD</MenuItem>
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"EUR"}>EUR</MenuItem>
            </Select>
          </Stack>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
