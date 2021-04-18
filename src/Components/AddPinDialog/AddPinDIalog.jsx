import React from "react";
import { Button, Dialog, makeStyles, TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 20,
  },
  form: {
    display: "flex",
    flexFlow: "column",
    justifyContent: "space-between",
    height: 300,
  },
}));

const AddPinDIalog = ({ open, onClose, callback }) => {
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

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{ className: classes.root }}
    >
      <form onSubmit={handleClick} className={classes.form}>
        <TextField
          name="title"
          label="title"
          type="text"
          value={state.title}
          onChange={handleInput}
          required
        />
        <TextField
          label="subtitle*"
          type="text"
          name="subtitle"
          value={state.subtitle}
          onChange={handleInput}
          required
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
      </form>
    </Dialog>
  );
};

export default AddPinDIalog;
