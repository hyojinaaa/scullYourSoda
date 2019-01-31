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

function trolly(state = {}, action) {
  const { userId, value, type } = action;
  switch (type) {
    case 'UPDATE_TROLLY':
      return {
        ...state,
        [userId]: value,
      };

    default:
      return state;
  }
}

const rootReducer = combineReducers({
  accountState: logoutUser,
  trolly: trolly,
});

export default rootReducer;
