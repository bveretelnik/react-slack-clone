import { ADD_MESSEGE_LISTENER } from "../types";

const handlers = {
  [ADD_MESSEGE_LISTENER]: (state, { payload }) => ({
    ...state,
    messages: payload,
    messagesLoading: false,
  }),
  DEFAULT: (state) => state,
};
export const messegesReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};
