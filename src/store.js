import { createStore } from 'redux';
import rootReducer from './reducers';

export const defaultState = {
  accountState: {
    login: true,
  },
};

const store = createStore(rootReducer, defaultState);
export default store;
