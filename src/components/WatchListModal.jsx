import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

const WatchListModal = (props) => {
  // Modal open and close functionality
  const handleOpen = () => {
    props.setState(true);
  };
  const handleClose = () => {
    props.setState(false);
  };

  // Modal Styling
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#002244",
    border: "2px solid #000",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    color: "white",
    p: 4,
    textAlign: "center",
    fontFamily: "Roboto",
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        variant="contained"
        sx={{ bgcolor: "orange", color: "black" }}
      >
        Watchlist
      </Button>
      <Modal
        open={props.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            My Watchlist
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default WatchListModal;
