import {
  ADD_LISTENER,
  CLOSE_MODAL,
  OPEN_MODAL,
  SET_ACTIVE_CHANNEL,
  SET_CURRENT_CHANNEL,
} from "../types";

const handlers = {
  [SET_CURRENT_CHANNEL]: (state, { payload }) => ({
    ...state,
    currentChannel: payload.currentChannel,
  }),
  [ADD_LISTENER]: (state, { payload }) => ({
    ...state,
    channels: payload,
  }),
  [OPEN_MODAL]: (state) => ({ ...state, modal: true }),
  [CLOSE_MODAL]: (state) => ({ ...state, modal: false }),
  [SET_ACTIVE_CHANNEL]: (state, { payload }) => ({
    ...state,
    activeChannel: payload,
    firstLoad: false,
  }),
  DEFAULT: (state) => state,
};
export const channelReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};
