import { configureStore } from '@reduxjs/toolkit';
import homeReducer from './slices/homeSlice';
import authReducer from './slices/authSlice'
import configReducer from './slices/configSlice'
import wellersReducer from "./slices/wellerSlice"
import groupReducer from "./slices/groupSlice"
 
export const store = configureStore({
  reducer: {
    home: homeReducer,
    auth: authReducer,
    config: configReducer,
    wellers:wellersReducer,
    groups:groupReducer
  },
});

// Infer types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
