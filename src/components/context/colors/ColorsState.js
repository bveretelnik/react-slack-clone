import React, { useReducer } from "react";
import firebase from "../../../firebase";
import { ADD_COLORS, SET_COLORS } from "../types";
import { ColorsContext } from "./colorsContext";
import { colorsReducer } from "./colorsReducer";

export default function ColorsState({ children }) {
  const initialState = {
    primaryColor: "#4c3c4c",
    secondaryColor: "#eee",
    usersRef: firebase.database().ref("user"),
    userColors: [],
  };
  const [state, dispatch] = useReducer(colorsReducer, initialState);

  const addListener = (userId) => {
    let userColors = [];
    state.usersRef.child(`${userId}/colors`).on("child_added", (snap) => {
      userColors.unshift(snap.val());
      dispatch({
        type: ADD_COLORS,
        payload: userColors,
      });
    });
  };

  const setColors = (primaryColor, secondaryColor) => {
    dispatch({
      type: SET_COLORS,
      payload: {
        primaryColor,
        secondaryColor,
      },
    });
  };

  return (
    <ColorsContext.Provider
      value={{
        setColors,
        addListener,
        colors: state,
      }}
    >
      {children}
    </ColorsContext.Provider>
  );
}
