import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axiosInstance";
import { headers } from "next/headers";

// ADD WELLERS THUNK
export const addWellers = createAsyncThunk(
  "wellers/addWellers",
  async ({ data }: { data: any }, thunkAPI) => {
    try {
      const res = await axiosInstance.post(`admin/add-wellers`, data);
      console.log("✅ Add Wellers Response Data:", res.data);
      return res.data;
    } catch (err: any) {
      console.error("❌ Error in Adding wellers:", err);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to add wellers"
      );
    }
  }
);

// GET ALL WELLERS THUNK
export const getAllWellers = createAsyncThunk(
  "wellers/getAllWellers",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`admin/get-wellers`);
      console.log("✅ Get Wellers Response Data:", res.data);
      return res.data;
    } catch (err: any) {
      console.error("❌ Error in Fetching wellers:", err);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch wellers"
      );
    }
  }
);

// GET  WELLERS BY DAY THUNK
export const getWellersByDay = createAsyncThunk(
  "wellers/getWellersByDay",
  async ({ day, time }: { day: any; time: any }, thunkAPI) => {
    try {
      const res = await axiosInstance.get(
        `admin/wellers-by-day?day=${day}&time=${time}`
      );
      console.log("✅ Get Wellers By Day Response Data:", res.data);
      return res.data;
    } catch (err: any) {
      console.error("❌ Error in Fetching wellers by day:", err);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch wellers"
      );
    }
  }
);

// UPDATE WELLER THUNK
export const updateWeller = createAsyncThunk(
  "wellers/updateWeller",
  async ({ wellerId, data }: { wellerId: any; data: any }, thunkAPI) => {
    try {
      const res = await axiosInstance.put(
        `admin/update-wellers/${wellerId}`,
        data
      );
      console.log("✅ Update Weller Response:", res.data);
      return res.data;
    } catch (err: any) {
      console.error("❌ Error in Updating Weller:", err);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to update weller"
      );
    }
  }
);

// GET ALL WELLERS THUNK
export const getWellerById = createAsyncThunk(
  "wellers/getWellerById",
  async (wellerId, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`admin/get-wellers${wellerId}`);
      console.log("✅ Get Weller Response Data By Id:", res.data);
      return res.data;
    } catch (err: any) {
      console.error("❌ Error in Fetching weller By Id:", err);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch weller By Id"
      );
    }
  }
);

// GET SESSION SUMMARY THUNK
export const getSessionSummary = createAsyncThunk(
  "wellers/getSessionSummary",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`admin/session-summary`);
      console.log("✅ Session Overview Response Data:", res.data);
      return res.data;
    } catch (err: any) {
      console.error("❌ Error Fetching Session Summary:", err);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch session summary"
      );
    }
  }
);

// GET CHURCH SESSION SUMMARY THUNK
export const getChurchSummary = createAsyncThunk(
  "wellers/getChurchSummary",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`admin/church-summary`);
      console.log("✅ Church Semmary Response Data:", res.data);
      return res.data;
    } catch (err: any) {
      console.error("❌ Error Fetching Church Summary:", err);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch church summary"
      );
    }
  }
);

// ASSIGN USER ROLE THUNK
export const assignRole = createAsyncThunk(
  "wellers/assignRole",
  async ({ wellerId, data }: { wellerId: any; data: any }, thunkAPI) => {
    try {
      const res = await axiosInstance.post(
        `admin/assign-role/${wellerId}`,
        data
      );
      console.log("✅ Assign Role Response:", res.data);
      return res.data;
    } catch (err: any) {
      console.error("❌ Error in Assigning Role:", err);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to assign Id"
      );
    }
  }
);

export const adminRoles = createAsyncThunk(
  "wellers/adminRoles",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`admin/administrators`);
      console.log("✅ Get Admins Response Data:", res.data);
      return res.data;
    } catch (err: any) {
      console.error("❌ Error in Fetching wellers:", err);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch wellers"
      );
    }
  }
);

export const updateRole = createAsyncThunk(
  "wellers/updateRole",
  async ({ roleId, data }: { roleId: any; data: any }, thunkAPI) => {
    try {
      const res = await axiosInstance.put(`admin/update-role/${roleId}`, data);
      console.log("✅  Admin Role updated:", res.data);
      return res.data;
    } catch (err: any) {
      console.error("❌ Error in Updating role:", err);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to update role"
      );
    }
  }
);

export const removeRole = createAsyncThunk(
  "wellers/removeRole",
  async ({ adminId }: { adminId: any }, thunkAPI) => {
    try {
      const res = await axiosInstance.delete(`admin/remove-role/${adminId}`);
      console.log("✅  Admin Role Removed:", res.data);
      return res.data;
    } catch (err: any) {
      console.error("❌ Error in Updating role:", err);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to update role"
      );
    }
  }
);

// 2. Initial State
const initialState = {
  wellers: [],
  loading: false,
  error: null as string | null,
  admins: [],
  weller: [],
  sessionSummary: [],
  churchSummary: [],
  wellersByDay: [],
};

// 3. Slice
const wellerSlice = createSlice({
  name: "wellers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllWellers.pending, (state) => {
        state.loading = true;
        state.error = null; // reset error
      })
      .addCase(getAllWellers.fulfilled, (state, action) => {
        state.loading = false;
        state.wellers = action.payload;
      })
      .addCase(getAllWellers.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || action.error.message || "Failed";
      })
      .addCase(getWellerById.pending, (state) => {
        state.loading = true;
        state.error = null; // reset error
      })
      .addCase(getWellerById.fulfilled, (state, action) => {
        state.loading = false;
        state.weller = action.payload;
      })
      .addCase(getWellerById.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || action.error.message || "Failed";
      })
      .addCase(getSessionSummary.pending, (state) => {
        state.loading = true;
        state.error = null; // reset error
      })
      .addCase(getSessionSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.sessionSummary = action.payload.data;
      })
      .addCase(getSessionSummary.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || action.error.message || "Failed";
      })
      .addCase(getChurchSummary.pending, (state) => {
        state.loading = true;
        state.error = null; // reset error
      })
      .addCase(getChurchSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.churchSummary = action.payload.data;
      })
      .addCase(getChurchSummary.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || action.error.message || "Failed";
      })
      .addCase(getWellersByDay.pending, (state) => {
        state.loading = true;
        state.error = null; // reset error
      })
      .addCase(getWellersByDay.fulfilled, (state, action) => {
        state.loading = false;
        state.wellersByDay = action.payload.data;
      })
      .addCase(getWellersByDay.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || action.error.message || "Failed";
      })
      .addCase(adminRoles.pending, (state) => {
        state.loading = true;
        state.error = null; // reset error
      })
      .addCase(adminRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.admins = action.payload.data;
      })
      .addCase(adminRoles.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || action.error.message || "Failed";
      });
  },
});
// export const {} = wellerSlice.actions;
export default wellerSlice.reducer;
