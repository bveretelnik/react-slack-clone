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
  useHistory,
} from "react-router-dom";
import Spinner from "./components/Spinner/Spinner";
import "semantic-ui-css/semantic.min.css";
import { Provider, useDispatch, connect, useSelector } from "react-redux";
import { compose, createStore } from "redux";
import { setUser, clearUser } from "./components/redux/user/UserActions";
import { rootReducer } from "./components/redux/rootReducer";

const store = createStore(
  rootReducer,
  compose(
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

const Root = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.user.isLoading);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(setUser(user));
        history.push("/");
      } else {
        dispatch(clearUser());
        history.push("/login");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      )}
    </>
  );
};

const mapdispatchToProps = {
  setUser,
  clearUser,
};

connect(null, mapdispatchToProps)(Root);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Root />
    </Router>
  </Provider>,
  document.getElementById("root")
);
