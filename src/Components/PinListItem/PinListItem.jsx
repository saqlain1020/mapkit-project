import React from "react";
import { ListItem, ListItemText, makeStyles } from "@material-ui/core";
import { deletePin } from "./../../Redux/pins/pinsActions";
import {
  ContextMenu,
  MenuItem as ContextMenuItem,
  ContextMenuTrigger,
} from "react-contextmenu";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  listText: {
    color: "wheat",
    "& .MuiTypography-root": {
      color: "wheat",
    },
  },
  contextMenu: {
    background: "white",
    padding: "5px 10px",
  },
  contextItem: {
    cursor: "pointer",
  },
}));

const PinListItem = ({ handleClick, item, index, deletePin }) => {
  const classes = useStyles();
  return (
    <>
      <ContextMenuTrigger id={`${item.id}`}>
        <ListItem button onClick={handleClick}>
          <ListItemText
            className={classes.listText}
            primary={`${index + 1}. ${item.title}`}
            secondary={`Lat: ${item.location.latitude} Lon: ${item.location.longitude}`}
          />
        </ListItem>
      </ContextMenuTrigger>
      <ContextMenu id={`${item.id}`} className={classes.contextMenu}>
        <ContextMenuItem
          className={classes.contextItem}
          onClick={() => deletePin(item.id)}
        >
          Delete
        </ContextMenuItem>
      </ContextMenu>
    </>
  );
};

const actions = {
  deletePin,
};

export default connect(null, actions)(PinListItem);
