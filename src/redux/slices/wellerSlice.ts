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

// 2. Initial State
const initialState = {
  wellers: [],
  loading: false,
  error: null as string | null,
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
      });
  },
});
export const {} = wellerSlice.actions;
export default wellerSlice.reducer;
