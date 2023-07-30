import React from "react";
import { Box, Container, Typography } from "@mui/material";

const Banner = () => {
  return (
    <>
      <Box
        sx={{
          backgroundImage: "URL(./public/stars.jpg)",
          backgroundRepeat: "none",
          backgroundSize: "cover",
        }}
      >
        <Container
          sx={{
            height: 400,
            display: "flex",
            felxDirection: "column",
            paddingTop: 25,
            justifyContent: "space-around",
          }}
        >
          <div>
            <Typography
              variant="h2"
              sx={{
                fontWeight: "bold",
                fontFamily: "Roboto",
              }}
            >
              CRYPTO TRACKER
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                color: "darkgrey",
                textTransform: "capitalize",
                fontFamily: "Roboto",
              }}
            >
              One small step for Man. One giant leap for mankind.
            </Typography>
          </div>
        </Container>
      </Box>
    </>
  );
};

export default Banner;
