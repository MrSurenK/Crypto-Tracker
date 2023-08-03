import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const WatchListModal = () => {
  // Set modal states
  const [open, setOpen] = useState(false);
  // Modal open and close functionality
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return <div></div>;
};

export default WatchListModal;
