import React from "react";
import {
  Button,
  Dialog,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 20,
  },
  form: {
    display: "flex",
    flexFlow: "column",
    justifyContent: "space-between",
    width: 300,
    height: 350,
  },
  cancelBtn: {
    color: "red",
    borderColor: "red",
  },
}));

const AddPinDIalog = ({ open, onClose, callback, cancel }) => {
  const classes = useStyles();

  const [state, setState] = React.useState({
    title: "",
    color: "#2ecc71",
    subtitle: "",
    glyphText: "",
  });

  const handleClick = (e) => {
    e.preventDefault();
    callback(state);
    onClose();
  };

  const handleInput = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleClose = () => {
    cancel();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{ className: classes.root }}
    >
      <form onSubmit={handleClick} className={classes.form}>
        <Typography variant="h4" align="center">
          <b>Pin Info</b>
        </Typography>
        <TextField
          name="title"
          label="title"
          type="text"
          value={state.title}
          onChange={handleInput}
        />
        <TextField
          label="subtitle"
          type="text"
          name="subtitle"
          value={state.subtitle}
          onChange={handleInput}
        />
        <TextField
          label="color"
          name="color"
          type="text"
          value={state.color}
          onChange={handleInput}
          required
        />
        <TextField
          label="glyphText"
          type="text"
          name="glyphText"
          placeholder="Optional"
          onChange={handleInput}
          value={state.glyphText}
        />
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: 20 }}
          type="submit"
        >
          Add
        </Button>
        <Button
          variant="outlined"
          className={classes.cancelBtn}
          style={{ marginTop: 5 }}
          onClick={handleClose}
        >
          Cancel
        </Button>
      </form>
    </Dialog>
  );
};

export default AddPinDIalog;
