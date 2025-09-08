import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axiosInstance";

export const getWellerStats = createAsyncThunk(
  "home/getWellerStats",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`admin/weller-stats`);
      console.log("Count stats data: ", res.data);

      return res.data;
    } catch (err: any) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch count"
      );
    }
  }
);

export const getPrayersGroup = createAsyncThunk(
  "home/getPrayersGroup",
  async ({ day, time }: { day: any; time: any }, thunkAPI) => {
    try {
      const res = await axiosInstance.get(
        `admin/prayer-groups?day=${day}&time=${time}`
      );
      console.log("Prayers Group Response: ", res.data);
      return res.data;
    } catch (err: any) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch count"
      );
    }
  }
);

export const getWellerStatus = createAsyncThunk(
  "home/getWellerStatus",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`admin/wellers-status`);
      console.log("Weller status data: ", res.data);

      return res.data;
    } catch (err: any) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch count"
      );
    }
  }
);

// 2. Initial State
const initialState = {
  statistics: null,
  groups: [],
  wellerStatus: [],
  loading: false,
  error: null as string | null,
};

// 3. Slice
const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      // Statistics
      .addCase(getWellerStats.fulfilled, (state, action) => {
        state.statistics = action.payload;
      })
      .addCase(getPrayersGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPrayersGroup.fulfilled, (state, action) => {
        state.loading = false;
        state.groups = action.payload;
      })
      .addCase(getPrayersGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getWellerStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.wellerStatus = action.payload;
      });
  },
});

export default homeSlice.reducer;
