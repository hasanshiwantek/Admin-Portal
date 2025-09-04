import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axiosInstance";

export const getCurrentGroups = createAsyncThunk(
  "groups/getCurrentGroups",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`admin/current-prayer-groups`);
      console.log("Current Groups Response : ", res.data);

      return res.data;
    } catch (err: any) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to current groups"
      );
    }
  }
);



// 2. Initial State
const initialState = {
  groups: [],
  loading: false,
  error: null as string | null,
};

// 3. Slice
const groupSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getCurrentGroups.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCurrentGroups.fulfilled, (state, action) => {
        state.loading = false;
        state.groups = action.payload.data;
      })
      .addCase(getCurrentGroups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default groupSlice.reducer;
