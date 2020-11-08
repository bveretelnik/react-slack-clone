import { UPLOAD_FILE } from "../types";
const handlers = {
  [UPLOAD_FILE]: (state, { payload }) => ({
    ...state,
    uploadTask: payload,
    uploadState: "uploading",
  }),
  DEFAULT: (state) => state,
};
export const fileReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};
