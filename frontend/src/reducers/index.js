import { combineReducers } from 'redux';

function updateUserData(state = {}, action) {
  switch (action.type) {
    case 'USERS':
      return {
        ...state,
        ...action.data,
      };

    default:
      return state;
  }
}

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

function checkoutPrice(state = {}, action) {
  switch (action.type) {
    case 'CHECKOUT_PRICE':
      return {
        ...state,
        price: action.price,
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
  userData: updateUserData,
  accountState: logoutUser,
  trolly: trolly,
  checkout: checkoutPrice,
});

export default rootReducer;
