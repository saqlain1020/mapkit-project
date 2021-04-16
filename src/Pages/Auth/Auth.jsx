import {
  Button,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import ImageSrc from "src/Assets/Images/bg.jpg";
import { connect } from "react-redux";
import { signin, signup } from "src/Redux/auth/authActions";

const useStyle = makeStyles((theme) => ({
  root: {
    height: "calc(100vh - 60px)",
    maxHeight: 1080,
    background: `url(${ImageSrc})`,
    backgroundSize: "cover",
  },
  container: {
    width: "80%",
    maxWidth: 450,
    background: "white",
    padding: "30px 30px",
    boxShadow: "4px 4px 10px rgba(0,0,0,0.1)",
    borderRadius: 20,
    [theme.breakpoints.down("xs")]: {
      padding: "30px 20px",
    },
  },
  bottomText: {
    color: "rgba(0,0,0,0.5)",
    "& span": {
      cursor: "pointer",
    },
    "& span:hover": {
      color: "rgba(0,0,0,0.7)",
    },
  },
  heading: {
    marginBottom: 20,
    fontWeight: 600,
  },
}));

const Auth = ({ signin }) => {
  const classes = useStyle();
  const [signState, setSignState] = React.useState(false);
  const [state, setState] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //in or up
    let type = e.nativeEvent.submitter.name;

    let { email, password, name } = state;

    if (type === "in") {
      signin(email, password);
    } else if (type === "up") {
      signup(email, password, name);
    }
  };

  return (
    <div className={classes.root + " center"}>
      <form className={classes.container} onSubmit={handleSubmit}>
        <Typography variant="h2" align="center" className={classes.heading}>
          {signState ? "Sign up" : "Sign in"}
        </Typography>
        <Grid container spacing={2}>
          {signState && (
            <Grid item xs={12}>
              <Typography>
                <b>Name</b>
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                placeholder="Enter Name"
                name="name"
                onChange={handleInput}
                required
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <Typography>
              <b>Email</b>
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              type="email"
              placeholder="Enter email"
              name="email"
              onChange={handleInput}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <b>Password</b>
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              type="password"
              placeholder="Enter password"
              name="password"
              onChange={handleInput}
              required
            />
          </Grid>
          <Grid item xs={12}>
            {signState && (
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                name="up"
              >
                Sign Up
              </Button>
            )}
            {!signState && (
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                name="in"
              >
                Sign In
              </Button>
            )}
          </Grid>
          <Grid item xs={12}>
            {!signState && (
              <Typography className={classes.bottomText} align="center">
                Not a member?{" "}
                <span onClick={() => setSignState(true)}>Sign up now</span>
              </Typography>
            )}
            {signState && (
              <Typography className={classes.bottomText} align="center">
                Already a member?{" "}
                <span onClick={() => setSignState(false)}>Sign in now</span>
              </Typography>
            )}
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

const actions = {
  signin,
  signup,
};

export default connect(null, actions)(Auth);
