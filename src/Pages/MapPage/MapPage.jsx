import { IconButton } from "@material-ui/core";
import classNames from "classnames";
import React from "react";
import useStyles from "./MapPageStyles";
import MenuIcon from "@material-ui/icons/Menu";
import getToken from "src/Util/getToken";
import mapkit from "mapkit.js";
import { v4 as uuid } from "uuid";
import AddPinDIalog from "src/Components/AddPinDialog/AddPinDIalog";
import { connect } from "react-redux";
import { setAllPins, sendApiPin } from "src/Redux/pins/pinsActions";
import PinsSidebar from "src/Components/PinsSidebar/PinsSidebar";
import getGeolocation from "src/Util/getGeolocation";
import MyLocationIcon from "@material-ui/icons/MyLocation";

var mapRef;
//initialize mapkit
mapkit.init({
  authorizationCallback: async (done) => {
    done(await getToken());
  },
});

const MapPage = ({ pins, setAllPins }) => {
  const [dialog, setDialog] = React.useState(false);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const mapDivRef = React.createRef();
  const [id, setId] = React.useState("");

  //Initializes pins when pins state change
  React.useEffect(() => {
    // renderMap();
    initAnnotations();
  }, [pins]);

  const tapEvent = (e) => {
    let { latitude, longitude } = mapRef.convertPointOnPageToCoordinate(
      e.pointOnPage
    );
    let id = uuid();
    addAnnotation({
      location: {
        latitude,
        longitude,
      },
      selected: true,
      id,
    });
    setDialog(true);
    setId(id);
  };

  //change center of map
  const changeRegion = ({ latitude, longitude }) => {
    let reg = new mapkit.CoordinateRegion(
      new mapkit.Coordinate(latitude, longitude),
      new mapkit.CoordinateSpan(0.1, 0.1)
    );
    mapRef.setRegionAnimated(reg);
  };

  //add all initial pins on map
  const initAnnotations = () => {
    if (mapRef?.annotations) mapRef.removeAnnotations(mapRef.annotations);
    pins.forEach((item) => {
      addAnnotation(item);
    });
  };

  //Add new pin on map
  const addAnnotation = ({
    title = "",
    subtitle = "",
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

  //render map with new pins
  const renderMap = () => {
    if (mapDivRef.current) {
      document.querySelector("#map").innerHTML = "";
      var map = new mapkit.Map("map", {
        // region: region,
        showsCompass: mapkit.FeatureVisibility.Visible,
        showsZoomControl: true,
        showsMapTypeControl: true,
        isRotationEnabled: true,
        showsScale: mapkit.FeatureVisibility.Visible,
        padding: new mapkit.Padding(20, 20, 20, 50),
      });
      mapRef = map;
      setRegionCurrent();
      initAnnotations();
      map.addEventListener("single-tap", tapEvent);
    }
  };

  //set map to current location
  const setRegionCurrent = async () => {
    let currentLocation = await getGeolocation();
    changeRegion(currentLocation);
  };

  React.useEffect(() => {
    renderMap();
  }, []);

  //Add pin menu btn after entry
  const addPin = ({ title, subtitle, glyphText, color }) => {
    setOpen(false);
    let coordinate;
    mapRef.annotations.some((item) => {
      if (item.data.id === id) {
        coordinate = item.coordinate;
        return true;
      }
      return false
    });
    let obj = {
      id,
      title,
      subtitle,
      glyphText,
      color,
      draggable: false,
      selected: false,
      location: {
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
      },
    };
    setAllPins([...pins, obj]);
    changeRegion(obj.location);
    savePin();
  };

  //List menu click
  const listItemClick = (id) => {
    mapRef.annotations.forEach((item) => {
      if (item.data.id === id) {
        console.log(item);
        item.selected = true;
        changeRegion(item.coordinate);
      }
    });
  };

  //Don't save current pin
  const cancelPin = () => {
    initAnnotations();
  };

  // sendPin to db
  const savePin = () => {
    sendApiPin(id);
  };

  return (
    <div className={classes.root}>
      <PinsSidebar
        setDialog={setDialog}
        listItemClick={listItemClick}
        open={open}
      />
      <div className={classNames(classes.mapContainer)}>
        <IconButton className={classes.menuBtn} onClick={() => setOpen(!open)}>
          <MenuIcon fontSize="large" style={{ color: "#222" }} />
        </IconButton>
        <div id="map" ref={mapDivRef} onClick={() => setOpen(false)}></div>
      </div>
      <AddPinDIalog
        open={dialog}
        onClose={() => setDialog(false)}
        callback={addPin}
        cancel={cancelPin}
      />
      <MyLocationIcon
        className={classes.myLocationIco}
        fontSize="large"
        onClick={setRegionCurrent}
      />
    </div>
  );
};

const mapState = (store) => ({
  pins: store.pins.allPins,
});

const actions = {
  // getApiPins,
  setAllPins,
  sendApiPin,
};

export default connect(mapState, actions)(MapPage);
