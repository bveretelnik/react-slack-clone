import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import firebase from "./firebase";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";
import "semantic-ui-css/semantic.min.css";

const Root = ({ history }) => {
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        history.push("/");
      }
    });
    // eslint-disable-next-line
  }, []);

  return (
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </Switch>
  );
};
const RootWithAuth = withRouter(Root);

ReactDOM.render(
  <Router>
    <RootWithAuth />
  </Router>,
  document.getElementById("root")
);
