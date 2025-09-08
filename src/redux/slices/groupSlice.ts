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

export const getWellersByClass = createAsyncThunk(
  "groups/getWellersByClass",
  async (
    { className, day, time }: { className: any; day: any; time: any },
    thunkAPI
  ) => {
    try {
      const res = await axiosInstance.get(
        `admin/teacher-roster?class=${className}&day=${day}_${time}`
      );
      console.log("Wellers by class Response : ", res.data);

      return res.data;
    } catch (err: any) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to get wellers by class"
      );
    }
  }
);

export const viewWellersByGroupsOrStudies = createAsyncThunk(
  "groups/viewWellersByGroupsOrStudies",
  async ({ tab, day, time }: { tab: any; day: any; time: any }, thunkAPI) => {
    try {
      const res = await axiosInstance.get(
        `admin/leaders-and-teachers?day=${day}&time=${time}&tab=${tab}`
      );
      console.log("Wellers by Tab Response : ", res.data);

      return res.data;
    } catch (err: any) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to get wellers "
      );
    }
  }
);

export const getWellersByPG = createAsyncThunk(
  "groups/getWellersByPG",
  async (
    {
      pg_number,
      day,
      time,
      perPage,
      page,
    }: { pg_number: any; day: any; time: any; perPage: any; page: any },
    thunkAPI
  ) => {
    try {
      const res = await axiosInstance.get(
        `admin/get-pg?day=${day}&time=${time}&pg_number=${pg_number}&perPage=${perPage}&page=${page}`
      );
      console.log("Wellers by Tab Response : ", res.data);

      return res.data;
    } catch (err: any) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to get wellers "
      );
    }
  }
);

// 2. Initial State
const initialState = {
  groups: [],
  wellersByClass: [],
  leaderData: [],
  loading: false,
  wellersByPG: [],
  error: null as string | null,
  pagination:null
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
      })
      .addCase(getWellersByClass.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWellersByClass.fulfilled, (state, action) => {
        state.loading = false;
        state.wellersByClass = action.payload;
      })
      .addCase(getWellersByClass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(viewWellersByGroupsOrStudies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(viewWellersByGroupsOrStudies.fulfilled, (state, action) => {
        state.loading = false;
        state.leaderData = action.payload;
      })
      .addCase(viewWellersByGroupsOrStudies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getWellersByPG.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWellersByPG.fulfilled, (state, action) => {
        state.loading = false;
        state.wellersByPG = action.payload;
        state.pagination=action.payload.pagination
      })
      .addCase(getWellersByPG.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default groupSlice.reducer;
