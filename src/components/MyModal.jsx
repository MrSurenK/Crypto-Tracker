import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import styles from "./MyModal.module.css";
import ReactDOM from "react-dom";

const MyModal = ({ open, onClose, setWatchlist, watchlist }) => {
  if (!open) {
    return null;
  }
  return (
    <>
      {ReactDOM.createPortal(
        <div onClick={onClose} className={styles.overlay}>
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className={styles.modalContainer}
          >
            <h1>My Watchlist</h1>
            <div className="modalRight">
              <p onClick={onClose} className={styles.closeBtn}>
                X
              </p>
              <div className={styles.content}></div>
              <div>{JSON.stringify(watchlist)}</div>
              <Button variant="contained">Remove</Button>
            </div>
          </div>
        </div>,
        document.querySelector("#modal")
      )}
    </>
  );
};

export default MyModal;
