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
import MapPinConfirmation from "src/Components/MapPinConfirmation/MapPinConfirmation";
import PinsSidebar from "src/Components/PinsSidebar/PinsSidebar";

let span = new mapkit.CoordinateSpan(0.0125, 0.0125);

let regionStart = new mapkit.CoordinateRegion(
  new mapkit.Coordinate(37.3327, -122.0053),
  span
);

var mapRef;

const MapPage = ({ pins, setAllPins }) => {
  const [dialog, setDialog] = React.useState(false);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const mapDivRef = React.createRef();
  const [region, setRegion] = React.useState(regionStart);
  const [slide, setSlide] = React.useState(false);

  //Render map wheneven new pins update
  React.useEffect(() => {
    renderMap();
  }, [pins]);

  //initialize mapkit
  mapkit.init({
    authorizationCallback: async (done) => {
      done(await getToken());
    },
  });

  //change center of map
  const changeRegion = ({ latitude, longitude }) => {
    let reg = new mapkit.CoordinateRegion(
      new mapkit.Coordinate(latitude, longitude),
      new mapkit.CoordinateSpan(0.0125, 0.0125)
    );
    setRegion(reg);
  };

  //add all initial pins on map
  const initAnnotations = () => {
    pins.forEach((item) => {
      addAnnotation(item);
    });
  };

  //Add new pin on map
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

  //render map with new pins
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
      mapRef = map;
      initAnnotations();
    }
  };

  React.useEffect(() => {
    // getApiPins();
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
    setAllPins([...pins, obj]);
    changeRegion(obj.location);
    setSlide(true);
  };

  //List menu click
  const listItemClick = (id) => {
    let anno = pins.map((item) => {
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
    setAllPins(anno);
  };

  const cancelPin = () => {
    let anno = pins;
    anno.pop();
    setAllPins([...anno]);
    setSlide(false);
  };

  // sendPin to db
  const savePin = () => {
    let pin = pins[pins.length - 1];
    sendApiPin(pin);
    setSlide(false);
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
        <div id="map" ref={mapDivRef}></div>

        <MapPinConfirmation cancel={cancelPin} save={savePin} open={slide} />
      </div>
      <AddPinDIalog
        open={dialog}
        onClose={() => setDialog(false)}
        callback={addPin}
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
