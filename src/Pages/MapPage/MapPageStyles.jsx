import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    // paddingTop:20,
    display: "flex",
    height: "calc(100vh - 60px)",
    width: "100%",
  },
  list: {
    overflowY: "auto",
  },
  addBtn: {
    marginTop: 20,
  },
  heading: {
    fontWeight: 400,
    color: "wheat",
    fontSize: 25,
    marginBottom: 5,
  },
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
  mapContainer: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  menuBtn: {
    position: "absolute",
    zIndex: 1,
    height: 40,
    width: 40,
    borderRadius: 5,
    transform: "translateX(10px) translateY(10px)",
  },
  listText: {
    color: "wheat",
    "& .MuiTypography-root": {
      color: "wheat",
    },
  },
}));
export default useStyles;
