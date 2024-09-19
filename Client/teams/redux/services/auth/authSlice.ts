import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {setAuthToken} from '../../../middleware/axiosConfig/axiosConfig';

import {Token} from '../../../constants/type';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthState = {
  loginDetails: null | Token;
  loading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  loginDetails: null,
  loading: false,
  error: null,
};

export const fetchToken = createAsyncThunk('auth/fetchToken', async () => {
  try {
    const response = await AsyncStorage.getItem('token');
    return response;
  } catch (error) {
    return error;
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoginDetails: (state: AuthState, action: PayloadAction<string>) => {
      if (state.loginDetails) {
        state.loginDetails.token = action.payload;
      }
    },
    setToken: (state: AuthState, action: PayloadAction<string>) => {
      setAuthToken(action.payload);
    },
    clearToken: (state: AuthState) => {
      if (state.loginDetails) {
        state.loginDetails.token = null;
      }
      setAuthToken(null);
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchToken.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchToken.fulfilled, (state, action) => {
      if (state.loginDetails) {
        state.loginDetails.token = action.payload as string | null;
      }
    });
    builder.addCase(fetchToken.rejected, (state, action) => {
      state.error = action.error.message as string;
    });
  },
});

export const {setToken, clearToken} = authSlice.actions;

export default authSlice.reducer;
