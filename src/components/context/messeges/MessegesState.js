import React, { useReducer } from "react";
import firebase from "../../../firebase";
import { messegesReducer } from "./messagesReducer";
import { ADD_MESSEGE_LISTENER, NUM_UNIQUE_USERS } from "../types";
import { MessegesContext } from "./messegesContext";

export default function MessegesState({ children }) {
  const initialState = {
    messagesRef: firebase.database().ref("messages"),
    messages: [],
    messagesLoading: true,
    numUniqueUsers: " ",
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
      countUniqueUsers(loadedMessages);
    });
  };

  const countUniqueUsers = (messeges) => {
    const uniqueUsers = messeges.reduce((acc, message) => {
      if (!acc.includes(message.user.name)) {
        acc.push(message.user.name);
      }
      return acc;
    }, []);
    const plural = uniqueUsers.length > 1 || uniqueUsers.length === 0;
    const numUniqueUsers = `${uniqueUsers.length} user${plural ? "s" : ""}`;
    dispatch({
      type: NUM_UNIQUE_USERS,
      payload: numUniqueUsers,
    });
  };

  // const displayMessages = messages =>
  // messages.length > 0 &&
  // messages.map(message => (
  //   <Message
  //     key={message.timestamp}
  //     message={message}
  //     user={user}
  //   />
  // ));

  const displayChannelName = (channel) => (channel ? `#${channel.name}` : "");

  return (
    <MessegesContext.Provider
      value={{
        addMessageListener,
        displayChannelName,
        countUniqueUsers,
        messege: state,
      }}
    >
      {children}
    </MessegesContext.Provider>
  );
}
