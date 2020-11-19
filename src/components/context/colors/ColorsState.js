import React, { useReducer } from "react";
import { SET_COLORS } from "../types";
import { ColorsContext } from "./colorsContext";
import { colorsReducer } from "./colorsReducer";

export default function ColorsState({ children }) {
  const initialState = {
    primaryColor: "#4c3c4c",
    secondaryColor: "#eee",
  };
  const [state, dispatch] = useReducer(colorsReducer, initialState);

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
    <ColorsContext.Provider value={{ setColors, colors: state }}>
      {children}
    </ColorsContext.Provider>
  );
}
