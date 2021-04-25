import { SET_COLORS } from "../types";

const initialColorsState = {
  primaryColor: "#350d36",
  secondaryColor: "#3F0E40",
};

const handlers = {
  [SET_COLORS]: (state, { payload }) => ({
    ...state,
    primaryColor: payload.primaryColor,
    secondaryColor: payload.secondaryColor,
  }),
  DEFAULT: (state) => state,
};

export const colorReducer = (state = initialColorsState, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};
