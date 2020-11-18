import React, { useReducer } from "react";
import { ChannelContext } from "./channelContext";
import {
  SET_CURRENT_CHANNEL,
  SET_PRIVATE_CHANNEL,
  SET_USER_POSTS,
} from "../types";
import { channelReducer } from "./channelReducer";

export default function ChannelState({ children }) {
  const initialState = {
    currentChannel: null,
    isPrivateChannel: false,
    userPosts: null,
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

  const setUserPost = (userPosts) => {
    dispatch({
      type: SET_USER_POSTS,
      payload: userPosts,
    });
  };

  return (
    <ChannelContext.Provider
      value={{
        setCurrentChannel,
        setPrivateChannel,
        setUserPost,
        channel: state,
      }}
    >
      {children}
    </ChannelContext.Provider>
  );
}
