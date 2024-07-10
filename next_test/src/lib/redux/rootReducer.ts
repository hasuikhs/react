import { combineReducers } from '@reduxjs/toolkit';

const createRootReducer = async () => {
  const counterReducer = (await import('./slices/counterSlice')).default;

  return combineReducers({
    counter: counterReducer
  });
};

export default createRootReducer;