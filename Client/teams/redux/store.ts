import {configureStore} from '@reduxjs/toolkit';
import authReducer from './services/auth/authSlice';
import userReducer from './services/userSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
