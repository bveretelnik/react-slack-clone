import { ADD_MESSAGES } from "../types";

const handlers = {
  [ADD_MESSAGES]: (state, { payload }) => ({
    ...state,
    messages: payload,
    messagesLoading: false,
  }),
  DEFAULT: (state) => state,
};
export const messagesReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};
