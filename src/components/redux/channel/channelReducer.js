import {
  SET_CURRENT_CHANNEL,
  SET_PRIVATE_CHANNEL,
  SET_USER_POSTS,
} from "../types";

const initialChannelState = {
  currentChannel: null,
  isPrivateChannel: false,
  userPosts: null,
};

const handlers = {
  [SET_CURRENT_CHANNEL]: (state, { payload }) => ({
    ...state,
    currentChannel: payload.currentChannel,
  }),
  [SET_PRIVATE_CHANNEL]: (state, { payload }) => ({
    ...state,
    isPrivateChannel: payload.isPrivateChannel,
  }),
  [SET_USER_POSTS]: (state, { payload }) => ({
    ...state,
    userPosts: payload.userPosts,
  }),
  DEFAULT: (state) => state,
};

export const channelReducer = (state = initialChannelState, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};
