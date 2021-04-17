import { SET_CURRENT_CHANNEL } from "../types";

const initialChannelState = {
  currentChannel: null,
};

const handlers = {
  [SET_CURRENT_CHANNEL]: (state, { payload }) => ({
    ...state,
    currentChannel: payload.currentChannel,
  }),
  DEFAULT: (state) => state,
};

export const channelReducer = (state = initialChannelState, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};
