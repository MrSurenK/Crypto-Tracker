import React from "react";
import { Box, Container, Typography } from "@mui/material";
import Carousel from "./Carousel";

const Banner = () => {
  return (
    <>
      <Box
        sx={{
          backgroundImage: "URL(./stars.jpg)",
          backgroundRepeat: "none",
          backgroundSize: "cover",
        }}
      >
        <Container
          sx={{
            height: 400,
            display: "flex",
            felxDirection: "column",
            paddingTop: 15,
            justifyContent: "space-around",
          }}
        >
          <Box
            sx={{
              display: "flex",
              height: "40%",
              flexDirection: "column",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: "bold",
                fontFamily: "Roboto",
                mb: 5,
              }}
            >
              CRYPTO TRACKER
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                color: "darkgrey",
                textTransform: "capitalize",
                fontFamily: "Roboto",
              }}
            >
              One small step for Man. One giant leap for mankind.
            </Typography>
            <Carousel></Carousel>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Banner;
