import React from "react";
import { IconButton, makeStyles, Paper } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import classNames from "classnames";

const useStyles = makeStyles((theme) => ({
  prompt: {
    width: "120px",
    height: 60,
    display: "flex",
    justifyContent: "space-evenly",
    position: "absolute",
    top: "calc(100% - 60px)",
    left: "calc(50% - 60px)",
    transition: "transform 300ms ease-in-out",
    "& .MuiIconButton-root": {
      padding: 0,
    },
  },
  paperUp: {
    transform: "scale(1)",
  },
  paperDown: {
    transform: "scale(0)",
  },
}));

const MapPinConfirmation = ({ open, cancel, save }) => {
  const classes = useStyles();

  return (
    <Paper
      className={classNames(
        classes.prompt,
        open ? classes.paperUp : classes.paperDown
      )}
    >
      <IconButton onClick={cancel}>
        <CancelIcon fontSize="large" style={{ color: "red" }} />
      </IconButton>
      <IconButton onClick={save}>
        <CheckCircleIcon fontSize="large" style={{ color: "green" }} />
      </IconButton>
    </Paper>
  );
};

export default MapPinConfirmation;
