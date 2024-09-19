import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {setAuthToken} from '../../../middleware/axiosConfig/axiosConfig';

import {User} from '../../../constants/type';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthState = {
  user: null | User;
  loading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const fetchUser = createAsyncThunk('auth/fetchUser', async () => {
  try {
    const response = await AsyncStorage.getItem('user');
    if (response) {
      const data = await JSON.parse(response);
      return data;
    }
  } catch (error) {
    return error;
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state: AuthState, action: PayloadAction<User>) => {
      state.user = action.payload;
    },

    setToken: (state: AuthState, action: PayloadAction<string>) => {
      setAuthToken(action.payload);
    },
    clearToken: (state: AuthState) => {
      if (state.user) {
        state.user.token = null;
      }
      setAuthToken(null);
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchUser.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.error = action.error.message as string;
    });
  },
});

export const {setToken, clearToken} = authSlice.actions;

export default authSlice.reducer;
