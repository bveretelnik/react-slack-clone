import { ADD_MESSEGE_LISTENER, NUM_UNIQUE_USERS } from "../types";

const handlers = {
  [ADD_MESSEGE_LISTENER]: (state, { payload }) => ({
    ...state,
    messages: payload,
    messagesLoading: false,
  }),
  [NUM_UNIQUE_USERS]: (state, { payload }) => ({
    ...state,
    numUniqueUsers: payload,
  }),
  DEFAULT: (state) => state,
};
export const messegesReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};
