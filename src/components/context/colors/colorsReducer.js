import { ADD_COLORS, SET_COLORS } from "../types";

const handlers = {
  [SET_COLORS]: (state, { payload }) => ({
    ...state,
    primaryColor: payload.primaryColor,
    secondaryColor: payload.secondaryColor,
  }),
  [ADD_COLORS]: (state, { payload }) => ({
    ...state,
    userColors: payload,
  }),
  DEFAULT: (state) => state,
};
export const colorsReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};
