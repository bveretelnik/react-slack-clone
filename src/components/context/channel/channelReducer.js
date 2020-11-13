import { SET_CURRENT_CHANNEL, SET_PRIVATE_CHANNEL } from "../types";

const handlers = {
  [SET_CURRENT_CHANNEL]: (state, { payload }) => ({
    ...state,
    currentChannel: payload,
  }),
  [SET_PRIVATE_CHANNEL]: (state, { payload }) => ({
    ...state,
    isPrivateChannel: payload,
  }),
  DEFAULT: (state) => state,
};
export const channelReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};
