import { useEffect } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import MapPage from "./Pages/MapPage/MapPage";
import Auth from "./Pages/Auth/Auth";
import Navbar from "./Components/Navbar/Navbar";
import { authListener } from "./Redux/auth/authActions";
import { connect } from "react-redux";
import { Container } from "@material-ui/core";
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';

function App({ authListener }) {

  useEffect(() => {
    authListener();
  }, [authListener]);

  return (
    <Container maxWidth="xl" disableGutters className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={MapPage} />
        <Route exact path="/authentication" component={Auth} />
      </Switch>
    </Container>
  );
}

var actions = {
  authListener,
};

export default connect(null, actions)(App);
