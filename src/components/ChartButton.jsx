import React from "react";
import { styled } from "@mui/system";

const ChartButton = ({ children, selected, onClick }) => {
  const StyledChartButton = styled("span")(({ theme }) => ({
    border: "1px solid gold",
    borderRadius: 5,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    fontFamily: "Roboto",
    cursor: "pointer",
    backgroundColor: selected ? "gold" : "",
    color: selected ? "black" : "",
    fontWeight: selected ? 700 : 500,
    "&:hover": {
      backgroundColor: "gold",
      color: "black",
    },
    width: "auto",
    margin: 5,
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      // Adjust the width for smaller screens (width will be 100%)
      width: "100%",
    },
  }));

  return <StyledChartButton onClick={onClick}>{children}</StyledChartButton>;
};

export default ChartButton;
