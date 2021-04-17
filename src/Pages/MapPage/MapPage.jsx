import {
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
import classNames from "classnames";
import React from "react";
// import { AppleMaps } from "react-apple-mapkitjs";
import { v4 as uuid } from "uuid";
import useStyles from "./MapPageStyles";
import MenuIcon from "@material-ui/icons/Menu";
import PerfectScrollbar from "react-perfect-scrollbar";
import getToken from "src/Util/getToken";

const pins = [
  {
    title: "Title",
    lat: 3000,
    lon: 3000,
  },
  {
    title: "Title",
    lat: 3000,
    lon: 4000,
  },
  {
    title: "Title",
    lat: 3000,
    lon: 4000,
  },
  {
    title: "Title",
    lat: 3000,
    lon: 4000,
  },
  {
    title: "Title",
    lat: 3400,
    lon: 3000,
  },
  {
    title: "Title",
    lat: 3400,
    lon: 3000,
  },
  {
    title: "Title",
    lat: 3400,
    lon: 3000,
  },
  {
    title: "Title",
    lat: 3400,
    lon: 3000,
  },
  {
    title: "Title",
    lat: 3400,
    lon: 3000,
  },
  {
    title: "Title",
    lat: 3400,
    lon: 3000,
  },
  {
    title: "Title",
    lat: 3400,
    lon: 3000,
  },
  {
    title: "Title",
    lat: 3400,
    lon: 3000,
  },
  {
    title: "Title",
    lat: 3400,
    lon: 3000,
  },
  {
    title: "Title",
    lat: 3400,
    lon: 3000,
  },
  {
    title: "Title",
    lat: 3400,
    lon: 3000,
  },
  {
    title: "Title",
    lat: 3400,
    lon: 3000,
  },
  {
    title: "Title",
    lat: 3400,
    lon: 3000,
  },
  {
    title: "Title",
    lat: 3400,
    lon: 3000,
  },
  {
    title: "Title",
    lat: 3400,
    lon: 3000,
  },
  {
    title: "Title",
    lat: 3400,
    lon: 3000,
  },
  {
    title: "Title",
    lat: 3400,
    lon: 3000,
  },
];

const MapPage = () => {
  // var map = new mapkit.Map();
  const [selected, setSelected] = React.useState({});
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  console.log(window.mapkit);

  window.mapkit.init({
    authorizationCallback: function (done) {
      done(getToken());
    },
  });

  return (
    <div className={classes.root}>
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
        <List className={classes.list}>
          {pins.map((item, index) => (
            <ListItem button key={uuid()} onClick={() => setSelected(item)}>
              <ListItemText
                className={classes.listText}
                primary={`${index + 1}. ${item.title}`}
                secondary={`Lat: ${item.lat} Lon: ${item.lon}`}
              />
            </ListItem>
          ))}
        </List>
        <Button
          fullWidth
          variant="outlined"
          color="secondary"
          className={classes.addBtn}
        >
          Add Pin
        </Button>
      </PerfectScrollbar>
      <div className={classNames(classes.mapContainer)}>
        <IconButton className={classes.menuBtn} onClick={() => setOpen(!open)}>
          <MenuIcon fontSize="large" style={{ color: "#222" }} />
        </IconButton>

        <AppleMaps
          longitude={30.8008}
          latitude={-1.5491}
          zoomLevel={1}
          //from id map css
          // height='500px'
          // width='100%'
          token={getToken()}
        />
      </div>
    </div>
  );
};

export default MapPage;
