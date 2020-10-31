import React, { useReducer } from "react";
import { CLEAR_USER, SET_USER } from "../types";
import { UserContext } from "./userContext";
import { userReducer } from "./userReducer";

export default function UserState({ children }) {
  const initialState = {
    currentUser: null,
    isLoading: true,
  };

  const [state, dispatch] = useReducer(userReducer, initialState);

  const setUser = (user) => {
    dispatch({
      type: SET_USER,
      payload: {
        currentUser: user,
      },
    });
    // console.log(state);
  };

  const clearUser = () => {
    dispatch({
      type: CLEAR_USER,
    });
    // console.log(state);
  };

  return (
    <UserContext.Provider value={{ setUser, clearUser, state: state }}>
      {children}
    </UserContext.Provider>
  );
}
