import { createStore } from 'redux';
import { HIDE_MEMO, SHOW_MEMO } from './constants';

function reducer(state = { isShow: false }, action) {
  switch (action.type) {
    case SHOW_MEMO:
      return { ...state, isShow: true };
    case HIDE_MEMO:
      return { ...state, isShow: false };
    default:
      return state;
  }
}

const store = createStore(reducer);

export default store;