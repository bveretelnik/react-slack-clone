import React, { useReducer } from "react";
import { ChannelContext } from "./channelContext";
import { SET_CURRENT_CHANNEL } from "../types";
import { channelReducer } from "./channelReducer";

export default function ChannelState({ children }) {
  const initialState = {
    currentChannel: null,
  };
  const [state, dispatch] = useReducer(channelReducer, initialState);

  const setCurrentChannel = (channel) => {
    dispatch({
      type: SET_CURRENT_CHANNEL,
      payload: {
        currentChannel: channel,
      },
    });
    // console.log(state);
  };
  return (
    <ChannelContext.Provider value={{ setCurrentChannel, channel: state }}>
      {children}
    </ChannelContext.Provider>
  );
}
