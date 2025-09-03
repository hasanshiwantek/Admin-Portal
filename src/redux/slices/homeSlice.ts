import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/lib/axiosInstance';


export const getWellerStats = createAsyncThunk(
  'home/getWellerStats',
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`admin/weller-stats`);
      console.log("Count stats data: ",res.data);
      
      return res.data;
    } // eslint-disable-next-line @typescript-eslint/no-explicit-any 
    catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch count');
    }
  }
);

// 2. Initial State
const initialState = {
  statistics: null,
  loading: false,
  error: null as string | null,
};

// 3. Slice
const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      // Statistics
      .addCase(getWellerStats.fulfilled, (state, action) => {
        state.statistics = action.payload;
      })


  },
});

export default homeSlice.reducer;
