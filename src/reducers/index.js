import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import userReducer from "./user.reducer";
import boardReducer from "./board.reducer";
import commentReducer from "./comment.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  board: boardReducer,
  comment: commentReducer,
});
export default rootReducer;
