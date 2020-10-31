import { SET_CURRENT_CHANNEL } from "../types";

const handlers = {
  [SET_CURRENT_CHANNEL]: (state, { payload }) => ({
    ...state,
    currentChannel: payload,
  }),
  DEFAULT: (state) => state,
};
export const channelReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};
