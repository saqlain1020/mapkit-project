import {
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
import classNames from "classnames";
import React from "react";
import { AppleMaps, Annotation } from "react-apple-mapkitjs";
import { v4 as uuid } from "uuid";
import useStyles from "./MapPageStyles";
import MenuIcon from "@material-ui/icons/Menu";
import PerfectScrollbar from "react-perfect-scrollbar";
import getToken from "src/Util/getToken";
import mapkit from "mapkit.js";

const pins = [
  {
    title: "Apple Park Visitor Center",
    subtitle: "10600 North Tantau Avenue, Cupertino, CA 95014",
    glyphText: "",
    color: "#2ecc71",
    displayPriority: 1000,
    location: {
      latitude: 37.3327,
      longitude: -122.0053,
    },
  },
  {
    title: "Apple Park Visitor Center",
    subtitle: "10600 North Tantau Avenue, Cupertino, CA 95014",
    glyphText: "",
    color: "#2ecc71",
    displayPriority: 1000,
    location: {
      latitude: 34.3327,
      longitude: -122.0053,
    },
  },
  {
    title: "Apple Park Visitor Center",
    subtitle: "10600 North Tantau Avenue, Cupertino, CA 95014",
    glyphText: "",
    color: "#2ecc71",
    displayPriority: 1000,
    location: {
      latitude: 38.3327,
      longitude: -120.0053,
    },
  },
  {
    title: "Apple Park Visitor Center",
    subtitle: "10600 North Tantau Avenue, Cupertino, CA 95014",
    glyphText: "",
    color: "#2ecc71",
    displayPriority: 1000,
    location: {
      latitude: 34.3327,
      longitude: -112.0053,
    },
  },
];

const MapPage = () => {
  const [selected, setSelected] = React.useState({});
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const mapDivRef = React.createRef(null);
  const mapRef = React.createRef(null);

  const center = new mapkit.Coordinate(
      pins[0] ? pins[0].location.latitude : 37.3327,
      pins[0] ? pins[0].location.longitude : -122.0053
    ),
    span = new mapkit.CoordinateSpan(0.0125, 0.0125),
    region = new mapkit.CoordinateRegion(center, span);

  console.log(center);

  mapkit.init({
    authorizationCallback: async (done) => {
      done(await getToken());
    },
  });

  const initAnnotations = () => {
    pins.forEach((item, index) => {
      addAnnotation(item, index);
    });
  };

  const callback = (e) => {
    console.log(e);
  };

  const addAnnotation = (
    {
      title,
      subtitle,
      glyphText = "",
      color = "#2ecc71",
      location: { latitude, longitude },
    },
    index
  ) => {
    const annotation = new mapkit.MarkerAnnotation(
      new mapkit.Coordinate(latitude, longitude),
      {
        title,
        subtitle,
        glyphText,
        color,
        draggable: true,
        data: {
          index,
        },
      }
    );
    mapRef.current.addAnnotation(annotation);
  };

  React.useEffect(() => {
    if (mapDivRef.current) {
      var map = new mapkit.Map("map", {
        region: region,
        showsCompass: mapkit.FeatureVisibility.Visible,
        showsZoomControl: true,
        showsMapTypeControl: true,
        isRotationEnabled: true,
        showsScale: mapkit.FeatureVisibility.Visible,
      });
      mapRef.current = map;
      initAnnotations();
      console.log(map.annotations);
    }
  }, [mapDivRef]);

  console.log(mapkit.FeatureVisibility);

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
                secondary={`Lat: ${item.location.latitude} Lon: ${item.location.longitude}`}
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
        <div id="map" ref={mapDivRef}></div>
        {/* {t && (
          <AppleMaps
            longitude={30.8008}
            latitude={-1.5491}
            zoomLevel={4}
            ref={ano1Ref}
            token={t}
          >
            <Annotation
              longitude={30.8008}
              latitude={-1.5491}
              color="#969696"
              title="Apple"
              subtitle="work"
              selected={true}
              glyphText=""
              // ref={}
            />
            <Annotation
              longitude={35.8008}
              latitude={-1.5491}
              color="#349576"
              title="New Annotation"
              subtitle="work"
              selected={false}              
            />
          </AppleMaps> */}
        {/* )} */}
      </div>
    </div>
  );
};

export default MapPage;
