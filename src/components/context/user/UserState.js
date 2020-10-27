import React from "react";
import { UserContext } from "./userContext";
import { userReducer } from "./userReducer";

export default function UserState({ children }) {
  const initialState = {};

  const [state, dispatch] = useReducer(userReducer, initialState);

  return <UserContext.Provider>{children}</UserContext.Provider>;
}
