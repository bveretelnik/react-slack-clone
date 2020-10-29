import { CLEAR_USER, SET_USER } from "../types";

const handlers = {
  [SET_USER]: (state, { payload }) => ({
    currentUser: payload.currentUser,
    isLoading: false,
  }),
  [CLEAR_USER]: (state) => ({ currentUser: null, isLoading: false }),
  DEFAULT: (state) => state,
};
export const userReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};