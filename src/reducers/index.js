import { combineReducers } from 'redux';

function logoutUser(state = {}, action) {
  switch (action.type) {
    case 'LOGOUT':
      return {
        ...state,
        login: false,
      };

    default:
      return state;
  }
}

const rootReducer = combineReducers({ accountState: logoutUser });

export default rootReducer;
