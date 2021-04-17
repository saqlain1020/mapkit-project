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
import { AppleMaps } from "react-apple-mapkitjs";
import { v4 as uuid } from "uuid";
import useStyles from "./MapPageStyles";
import MenuIcon from "@material-ui/icons/Menu";
import PerfectScrollbar from 'react-perfect-scrollbar'

const token =
  "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Iks2U1VZNjI1RjcifQ.eyJpYXQiOjE1NjAyOTIxNTMuMTYxLCJpc3MiOiJVNEE0WEY3UVJQIn0.mPSIqDGn9hUUByrg7EGo9mZ0nkfOj4Zade0yoJOhdcggGfqT-mXyJ-cMimS8Fy2DBsLsyS4m18ILKigMHLtsyA";

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
    const [open,setOpen] = React.useState(false);

  return (
    <div className={classes.root}>
      <PerfectScrollbar className={classNames(classes.pinContainer,open?classes.pinContainerOpen:classes.pinContainerClose)}>
        <Typography variant="h4" className={classes.heading}>
          <b>Your Pins</b>
        </Typography>
        <Divider style={{background:"wheat"}}/>
        <List className={classes.list}>
          {pins.map((item, index) => (
            <ListItem button key={uuid()} onCLick={() => setSelected(item)}>
              <ListItemText
              className={classes.listText}
                primary={`${index + 1}. ${item.title}`}
                secondary={`Lat: ${item.lat} Lon: ${item.lon}`}
              />
            </ListItem>
          ))}
        </List>
        <Button fullWidth variant="outlined" color="secondary" className={classes.addBtn}>
          Add Pin
        </Button>
      </PerfectScrollbar>
      <div className={classNames(classes.mapContainer)}>
        <IconButton className={classes.menuBtn} onClick={()=>setOpen(!open)}>
          <MenuIcon fontSize="large" style={{color:"#222"}}/>
        </IconButton>
        <AppleMaps
          longitude={30.8008}
          latitude={-1.5491}
          zoomLevel={1}
          //from id map css
          // height='500px'
          // width='100%'
          token={token}
        />
      </div>
      {/* <Typography variant="h2" className={classes.heading}>
        Map
      </Typography> */}
      {/* <Typography style={{ marginBottom: 20 }}>Manage your pins..</Typography> */}
      {/* <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={8}>
          <AppleMaps
            longitude={30.8008}
            latitude={-1.5491}
            zoomLevel={1}
            //from id map css
            // height='500px'
            // width='100%'
            token={token}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}></Grid>
      </Grid> */}
    </div>
  );
};

export default MapPage;
