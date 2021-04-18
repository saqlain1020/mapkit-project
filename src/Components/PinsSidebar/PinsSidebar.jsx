import React from "react";
import {
  Button,
  Divider,
  List,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { connect } from "react-redux";
import PerfectScrollbar from "react-perfect-scrollbar";
import classNames from "classnames";
import { v4 as uuid } from "uuid";
import PinListItem from "../PinListItem/PinListItem";

const useStyles = makeStyles((theme) => ({
  pinContainer: {
    height: "100%",
    overflow: "hidden",
    position: "relative",
    transition: "all 300ms ease-in-out",
    background: "rgb(32,31,35)",
    boxShadow: "-5px 0px 35px rgb(0 0 0 / 31%)",
    zIndex: 1,
    overflowY: "auto",
  },
  pinContainerOpen: {
    width: 300,
    minWidth: 220,
    padding: 16,
    left: 0,
  },
  pinContainerClose: {
    width: 0,
    left: -300,
    padding: 0,
  },

  list: {
    overflowY: "auto",
  },
  addBtn: {
    marginTop: 20,
    marginBottom: 20,
  },
  heading: {
    fontWeight: 400,
    color: "wheat",
    fontSize: 25,
    marginBottom: 5,
  },
}));

const PinsSidebar = ({ setDialog, listItemClick, open, pins }) => {
  const classes = useStyles();

  return (
    <PerfectScrollbar
      className={classNames(
        classes.pinContainer,
        open ? classes.pinContainerOpen : classes.pinContainerClose
      )}
    >
      <Typography variant="h4" className={classes.heading}>
        <b>Your Pins</b>
      </Typography>
      <Divider style={{ background: "wheat" }} />
      <Button
        fullWidth
        variant="outlined"
        color="secondary"
        className={classes.addBtn}
        onClick={() => setDialog(true)}
      >
        Add Pin
      </Button>
      <Divider style={{ background: "wheat" }} />
      <List className={classes.list}>
        {pins.map((item, index) => (
          <PinListItem
            key={uuid()}
            handleClick={() => listItemClick(item.id)}
            item={item}
            index={index}
          />
        ))}
      </List>
    </PerfectScrollbar>
  );
};

const mapState = (store) => ({
  pins: store.pins.allPins,
});

export default connect(mapState)(PinsSidebar);
