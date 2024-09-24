import {configureStore} from '@reduxjs/toolkit';
import authReducer from './services/auth/authSlice';
import userReducer from './services/userSlice';
import languageReducer from './services/languageSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    language: languageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
