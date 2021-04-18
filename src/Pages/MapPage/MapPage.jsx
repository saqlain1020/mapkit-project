import {
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  Slide,
} from "@material-ui/core";
import classNames from "classnames";
import React from "react";
import { AppleMaps, Annotation } from "react-apple-mapkitjs";
import useStyles from "./MapPageStyles";
import MenuIcon from "@material-ui/icons/Menu";
import PerfectScrollbar from "react-perfect-scrollbar";
import getToken from "src/Util/getToken";
import mapkit from "mapkit.js";
import { v4 as uuid } from "uuid";
import AddPinDIalog from "src/Components/AddPinDialog/AddPinDIalog";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";


const pins = [
  {
    id: uuid(),
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
    id: uuid(),
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
    id: uuid(),
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
    id: uuid(),
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
let span = new mapkit.CoordinateSpan(0.0125, 0.0125);

let regionStart = new mapkit.CoordinateRegion(
  new mapkit.Coordinate(
    pins[0] ? pins[0].location.latitude : 37.3327,
    pins[0] ? pins[0].location.longitude : -122.0053
  ),
  span
);

var mapRef;

const MapPage = () => {
  const [allAnnos, setAllAnnos] = React.useState(pins);
  const [dialog, setDialog] = React.useState(false);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const mapDivRef = React.createRef();
  
  const [region, setRegion] = React.useState(regionStart);
  const [slide,setSlide] = React.useState(false);

  React.useEffect(() => {
    renderMap();
  }, [allAnnos]);

  mapkit.init({
    authorizationCallback: async (done) => {
      done(await getToken());
    },
  });

  const changeRegion = ({ latitude, longitude }) => {
    let reg = new mapkit.CoordinateRegion(
      new mapkit.Coordinate(latitude, longitude),
      new mapkit.CoordinateSpan(0.0125, 0.0125)
    );
    setRegion(reg);
  };

  const initAnnotations = () => {
    console.log(allAnnos);
    allAnnos.forEach((item) => {
      addAnnotation(item);
    });
  };

  const addAnnotation = ({
    title,
    subtitle,
    glyphText = "",
    color = "#2ecc71",
    location: { latitude, longitude },
    selected = false,
    draggable = false,
    id,
  }) => {
    const annotation = new mapkit.MarkerAnnotation(
      new mapkit.Coordinate(latitude, longitude),
      {
        title,
        subtitle,
        glyphText,
        color,
        draggable,
        selected,
        data: {
          id,
        },
      }
    );
    mapRef.addAnnotation(annotation);
  };

  const renderMap = () => {
    if (mapDivRef.current) {
      document.querySelector("#map").innerHTML = "";
      var map = new mapkit.Map("map", {
        region: region,
        showsCompass: mapkit.FeatureVisibility.Visible,
        showsZoomControl: true,
        showsMapTypeControl: true,
        isRotationEnabled: true,
        showsScale: mapkit.FeatureVisibility.Visible,
      });
      console.log(map);
      mapRef = map;
      initAnnotations();
      console.log(map.annotations);
    }
  };

  React.useEffect(() => {
    let int = setInterval(() => {
      if (mapDivRef.current) {
        renderMap();
        clearInterval(int);
      }
    }, 300);
  }, []);

  //Add pin menu btn after entry
  const addPin = ({ title, subtitle, glyphText, color }) => {
    console.log(mapRef);
    let { latitude, longitude } = mapRef.center;
    let obj = {
      id: uuid(),
      title,
      subtitle,
      glyphText,
      color,
      draggable: true,
      selected: true,
      location: {
        latitude: latitude + 1,
        longitude: longitude + 1,
      },
    };
    setAllAnnos([...allAnnos, obj]);
    changeRegion(obj.location);
    setSlide(true);
  };

  //List menu click
  const listItemClick = (id) => {
    let anno = allAnnos.map((item) => {
      console.log(item);
      if (item.id === id) {
        changeRegion(item.location);
        item.selected = true;
        return item;
      } else {
        item.selected = false;
        return item;
      }
    });
    setAllAnnos(anno);
  };

  const cancelPin= ()=>{
    let anno = allAnnos
    anno.pop();
    setAllAnnos([...anno]);
    setSlide(false);
  }

  const savePin = ()=>{
    // sendPin to db
    setSlide(true);
  }

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
          {allAnnos.map((item, index) => (
            <ListItem
              button
              key={uuid()}
              onClick={() => listItemClick(item.id)}
            >
              <ListItemText
                className={classes.listText}
                primary={`${index + 1}. ${item.title}`}
                secondary={`Lat: ${item.location.latitude} Lon: ${item.location.longitude}`}
              />
            </ListItem>
          ))}
        </List>
      </PerfectScrollbar>
      <div className={classNames(classes.mapContainer)}>
        <IconButton className={classes.menuBtn} onClick={() => setOpen(!open)}>
          <MenuIcon fontSize="large" style={{ color: "#222" }} />
        </IconButton>
        <div id="map" ref={mapDivRef}></div>
        
        <Paper className={classNames(classes.prompt,slide?classes.paperUp:classes.paperDown)}>
          <IconButton onClick={cancelPin}>
            <CancelIcon fontSize="large" style={{ color: "red" }} />
          </IconButton>
          <IconButton>
            <CheckCircleIcon fontSize="large" style={{ color: "green" }} />
          </IconButton>        
        </Paper>
        
      </div>
      <AddPinDIalog
        open={dialog}
        onClose={() => setDialog(false)}
        callback={addPin}
      />
    </div>
  );
};

export default MapPage;
