import { SET_COLORS } from "../types";

export const setColor = (primaryColor, secondaryColor) => {
  return {
    type: SET_COLORS,
    payload: {
      primaryColor,
      secondaryColor,
    },
  };
};
