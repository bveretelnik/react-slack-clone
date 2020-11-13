import React, { useReducer } from "react";
import { ChannelContext } from "./channelContext";
import { SET_CURRENT_CHANNEL, SET_PRIVATE_CHANNEL } from "../types";
import { channelReducer } from "./channelReducer";

export default function ChannelState({ children }) {
  const initialState = {
    currentChannel: null,
    isPrivateChannel: false,
  };
  const [state, dispatch] = useReducer(channelReducer, initialState);

  const setCurrentChannel = (channel) => {
    dispatch({
      type: SET_CURRENT_CHANNEL,
      payload: channel,
    });
  };
  const setPrivateChannel = (isPrivateChannel) => {
    dispatch({
      type: SET_PRIVATE_CHANNEL,
      payload: isPrivateChannel,
    });
  };
  return (
    <ChannelContext.Provider
      value={{
        setCurrentChannel,
        setPrivateChannel,
        channel: state,
      }}
    >
      {children}
    </ChannelContext.Provider>
  );
}
