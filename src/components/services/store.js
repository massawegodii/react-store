import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import rootReducer from "../services/rootReducer";
import authToken from "./utils/authToken";

const store = createStore(rootReducer, applyMiddleware(thunk));

if (localStorage.jwtToken) {
  authToken(localStorage.jwtToken);
}

export default store;
