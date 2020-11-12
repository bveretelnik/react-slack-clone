import React, { useEffect, useContext } from "react";
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
import Spinner from "./components/Spiner/Spiner";
import "semantic-ui-css/semantic.min.css";
import UserState from "./components/context/user/UserState";
import { UserContext } from "./components/context/user/userContext";
import ChannelState from "./components/context/channel/ChannelState";

const Root = ({ history }) => {
  const { setUser, clearUser, user } = useContext(UserContext);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        history.push("/");
      } else {
        history.push("/login");
        clearUser();
      }
    });
  }, [user.currentUser]);

  return user.isLoading ? (
    <Spinner />
  ) : (
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </Switch>
  );
};
const RootWithAuth = withRouter(Root);

ReactDOM.render(
  <ChannelState>
    <UserState>
      <Router>
        <RootWithAuth />
      </Router>
    </UserState>
  </ChannelState>,
  document.getElementById("root")
);
