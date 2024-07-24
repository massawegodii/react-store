import { LOGIN_REQUEST, SUCCESS, FAILURE, LOGOUT_REQUEST } from "./authTypes";
const initialState = {
  isLoggedIn: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
      };

    case LOGOUT_REQUEST:
      return {
        ...state,
          };
      
    case SUCCESS:
    case FAILURE:
      return {
        username: action.payload.username,
        isLoggedIn: action.payload.isLoggedIn,
      };
    default:
      return state;
  }
};

export default reducer;