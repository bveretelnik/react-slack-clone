import { ADD_DIRECT, ADD_STATUS_TO_USER } from "../types";

const handlers = {
  [ADD_DIRECT]: (state, { payload }) => ({
    ...state,
    users: payload,
  }),
  [ADD_STATUS_TO_USER]: (state, { payload }) => ({
    ...state,
    users: payload,
  }),
  DEFAULT: (state) => state,
};
export const directReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};
