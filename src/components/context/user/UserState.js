import React, { useReducer } from "react";
import { SET_USER } from "../types";
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
      payload: user,
    });
  };

  return (
    <UserContext.Provider value={{ setUser, state }}>
      {children}
    </UserContext.Provider>
  );
}
