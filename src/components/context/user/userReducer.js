import { CLEAR_USER, SET_USER } from "../types";

const handlers = {
  [SET_USER]: (state, { payload }) => ({
    ...state,
    currentUser: payload,
    isLoading: false,
  }),
  [CLEAR_USER]: (state) => ({ ...state, isLoading: false }),
  DEFAULT: (state) => state,
};
export const userReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};
