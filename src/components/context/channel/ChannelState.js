import React, { useReducer, useEffect } from "react";
import firebase from "../../../firebase";
import { ChannelContext } from "./channelContext";
import {
  ADD_LISTENER,
  CLOSE_MODAL,
  OPEN_MODAL,
  SET_CURRENT_CHANNEL,
  SET_ACTIVE_CHANNEL,
} from "../types";
import { channelReducer } from "./channelReducer";

export default function ChannelState({ children }) {
  const initialState = {
    activeChannel: "",
    currentChannel: null,
    channels: [],
    channelsRef: firebase.database().ref("channels"),
    modal: false,
    firstLoad: true,
  };
  const [state, dispatch] = useReducer(channelReducer, initialState);
  useEffect(() => {
    addListeners();
    //eslint-disable-next-line
  }, []);
  const addListeners = () => {
    let loadedChannels = [];
    state.channelsRef.on("child_added", (snap) => {
      loadedChannels.push(snap.val());
      dispatch({
        type: ADD_LISTENER,
        payload: loadedChannels,
      });
    });
  };

  const removeListeners = () => {
    initialState.channelsRef.off();
  };

  const setActiveChannel = (channel) => {
    dispatch({ type: SET_ACTIVE_CHANNEL, payload: channel.id });
    console.log(state);
  };

  const setCurrentChannel = (channel) => {
    dispatch({
      type: SET_CURRENT_CHANNEL,
      payload: {
        currentChannel: channel,
      },
    });
  };

  const openModal = () => dispatch({ type: OPEN_MODAL });
  const closeModal = () => dispatch({ type: CLOSE_MODAL });

  return (
    <ChannelContext.Provider
      value={{
        addListeners,
        setCurrentChannel,
        setActiveChannel,
        openModal,
        closeModal,
        channel: state,
      }}
    >
      {children}
    </ChannelContext.Provider>
  );
}
