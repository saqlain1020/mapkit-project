import React, { Fragment } from "react";
import "./Navbar.css";
import { Container, makeStyles, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signout } from "./../../Redux/auth/authActions";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#222",
    height: 60,
    position: "absolute",
    top: 0,
    width: "100%",
  },
  container: {
    height: 60,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: "white",
    letterSpacing: 5,
    fontWeight: 700,
    fontSize: 40,
  },
  text: {
    color: "white",
    fontWeight: 500,
    letterSpacing: 2,
    fontSize: 18,
    cursor: "pointer",
  },
}));

const Navbar = ({ auth, signout }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="lg" className={classes.container}>
        <div>
          <Typography variant="h3" className={classes.title}>
            MapKit
          </Typography>
        </div>
        <div>
          {auth ? (
            <Typography className={classes.text} onClick={signout}>
              Signout
            </Typography>
          ) : (
            <Typography className={classes.text}>
              <Link to="/authentication">Login</Link>
            </Typography>
          )}
        </div>
      </Container>
    </div>
  );
};

var actions = {
  signout,
};

var mapState = (state) => ({
  auth: state.auth,
});

export default connect(mapState, actions)(Navbar);
