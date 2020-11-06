import React, { useReducer } from "react";
import firebase from "../../../firebase";
import { messegesReducer } from "./messagesReducer";
import { ADD_MESSEGE_LISTENER } from "../types";
import { MessegesContext } from "./messegesContext";

export default function MessegesState({ children }) {
  const initialState = {
    messagesRef: firebase.database().ref("messages"),
    messages: [],
    messagesLoading: true,
  };
  const [state, dispatch] = useReducer(messegesReducer, initialState);

  const addMessageListener = (channelId) => {
    let loadedMessages = [];
    state.messagesRef.child(channelId).on("child_added", (snap) => {
      loadedMessages.push(snap.val());
      dispatch({
        type: ADD_MESSEGE_LISTENER,
        payload: loadedMessages,
      });
    });
  };

  return (
    <MessegesContext.Provider value={{ addMessageListener, messege: state }}>
      {children}
    </MessegesContext.Provider>
  );
}
