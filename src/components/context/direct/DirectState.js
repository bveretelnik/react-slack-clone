import React, { useReducer } from "react";
import firebase from "../../../firebase";
import { ADD_DIRECT, ADD_STATUS_TO_USER } from "../types";
import { DirectContext } from "./directContext";
import { directReducer } from "./directReducer";

export default function DirectState({ children }) {
  const initialState = {
    users: [],
    usersRef: firebase.database().ref("user"),
    connectedRef: firebase.database().ref(".info/connected"),
    presenceRef: firebase.database().ref("presence"),
  };
  const [state, dispatch] = useReducer(directReducer, initialState);

  const addListeners = (currentUserUid) => {
    const { usersRef, connectedRef, presenceRef } = state;
    let loadedUsers = [];
    usersRef.on("child_added", (snap) => {
      if (currentUserUid !== snap.key) {
        let usernet = snap.val();
        usernet["uid"] = snap.key;
        usernet["status"] = "offline";
        loadedUsers.push(usernet);
        return dispatch({
          type: ADD_DIRECT,
          payload: loadedUsers,
        });
      }
    });
    connectedRef.on("value", (snap) => {
      if (snap.val() === true) {
        const ref = presenceRef.child(currentUserUid);
        ref.set(true);
        ref.onDisconnect().remove((err) => {
          if (err !== null) {
            console.log(err);
          }
        });
      }
    });

    presenceRef.on("child_added", (snap) => {
      if (currentUserUid !== snap.key) {
        addStatusToUser(snap.key);
      }
    });
    presenceRef.on("child_removed", (snap) => {
      if (currentUserUid !== snap.key) {
        addStatusToUser(snap.key, false);
      }
    });
  };

  const addStatusToUser = (userId, connected = true) => {
    const updatedUsers = state.users.reduce((acc, user) => {
      if (user.uid === userId) {
        user["status"] = `${connected ? "online" : "offline"}`;
      }
      return acc.concat(user);
    }, []);
    dispatch({
      type: ADD_STATUS_TO_USER,
      payload: updatedUsers,
    });
  };

  return (
    <DirectContext.Provider
      value={{
        addListeners,
        direct: state,
      }}
    >
      {children}
    </DirectContext.Provider>
  );
}
