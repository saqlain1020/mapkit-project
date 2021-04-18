import React from "react";
import { ListItem, ListItemText, makeStyles } from "@material-ui/core";
import { v4 as uuid } from "uuid";
import {
  ContextMenu,
  MenuItem as ContextMenuItem,
  ContextMenuTrigger,
} from "react-contextmenu";

const useStyles = makeStyles((theme) => ({
  listText: {
    color: "wheat",
    "& .MuiTypography-root": {
      color: "wheat",
    },
  },
  contextMenu:{
      background: "white",
      padding:"5px 10px",
      
  },
  contextItem:{
      cursor:"pointer"
  }
}));

const PinListItem = ({ handleClick, item, index }) => {
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
        <ContextMenuItem className={classes.contextItem}>Delete</ContextMenuItem>
      </ContextMenu>
    </>
  );
};

export default PinListItem;
