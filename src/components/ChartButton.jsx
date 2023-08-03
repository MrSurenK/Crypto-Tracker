import React from "react";
import { styled } from "@mui/system";

const ChartButton = ({ children, selected, onClick }) => {
  const StyledChartButton = styled("span")({
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
    "&hover": {
      backgroundColor: "gold",
      color: "black",
    },
    width: "10%",
    margin: 5,
    textAlign: "center",
  });

  return <StyledChartButton onClick={onClick}>{children}</StyledChartButton>;
};

export default ChartButton;
