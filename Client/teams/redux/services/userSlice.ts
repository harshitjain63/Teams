import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {User} from '../../constants/type';
import axiosInstance from '../../middleware/axiosConfig/axiosConfig';

type UserState = {
  userDetails: User;
  loading: boolean;
  error: string | null;
};

const initialState: UserState = {
  userDetails: {
    id: '',
    name: '',
    email: '',
    designation: '',
  },
  loading: false,
  error: null,
};

export const fetchDetails = createAsyncThunk('user/fetchDetails', async () => {
  try {
    const response = await axiosInstance.get('/user/profile');
    // console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    return (error as any).message;
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchDetails.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchDetails.fulfilled, (state, action) => {
      if (state.userDetails) {
        state.userDetails.name = action.payload.name;
        state.userDetails.email = action.payload.email;
        state.userDetails.id = action.payload.id;
        state.userDetails.designation = action.payload.designation;
        state.loading = false;
        state.error = null;
      }
    });
    builder.addCase(fetchDetails.rejected, (state, action) => {
      state.error = action.error.message as string;
    });
  },
});

export const actions = userSlice.actions;

export default userSlice.reducer;
