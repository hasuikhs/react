import { configureStore } from '@reduxjs/toolkit';
import createRootReducer from './rootReducer';

const setupStore = async () => {
  const rootReducer = await createRootReducer();

  return configureStore({
    reducer: rootReducer,
  });
};

const storePromise = setupStore();

export const getStore = async () => {
  return await storePromise;
};

// 타입 정의
export type AppStore = Awaited<ReturnType<typeof setupStore>>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
