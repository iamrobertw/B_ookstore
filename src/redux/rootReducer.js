import { combineReducers } from "redux";

import shoppingReducer from "./Bookstore/bookstore-reducer";

const rootReducer = combineReducers({
  shop: shoppingReducer,
});

export default rootReducer;
