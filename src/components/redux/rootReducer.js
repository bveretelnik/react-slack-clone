import { combineReducers } from "redux";
import { channelReducer } from "./channel/channelReducer";
import { userReducer } from "./user/userReducer";

export const rootReducer = combineReducers({
  user: userReducer,
  channel: channelReducer,
});
