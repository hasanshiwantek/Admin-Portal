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
    {
      className,
      day,
      time,
      page,
      perPage,
    }: { className: any; day: any; time: any; page: any; perPage: any },
    thunkAPI
  ) => {
    try {
      const res = await axiosInstance.get(
        `admin/teacher-roster?class=${className}&day=${day}_${time}&page=${page}&perPage=${perPage}`
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

export const getNewWellers = createAsyncThunk(
  "groups/getNewWellers",
  async ({ from, to }: { from: any; to: any }, thunkAPI) => {
    try {
      const res = await axiosInstance.get(
        `admin/new-wellers?from=${from}&to=${to}`
      );
      console.log("New Wellers Response: ", res.data);

      return res.data;
    } catch (err: any) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to get new wellers "
      );
    }
  }
);

export const getGuestWellers = createAsyncThunk(
  "groups/getGuestWellers",
  async ({ from, to }: { from: any; to: any }, thunkAPI) => {
    try {
      const res = await axiosInstance.get(
        `admin/guest-wellers?from=${from}&to=${to}`
      );
      console.log("Guest Wellers Response: ", res.data);

      return res.data;
    } catch (err: any) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to get Guest wellers "
      );
    }
  }
);

export const getReturneeWellers = createAsyncThunk(
  "groups/getReturneeWellers",
  async ({ from, to }: { from: any; to: any }, thunkAPI) => {
    try {
      const res = await axiosInstance.get(
        `admin/returnee-wellers?from=${from}&to=${to}`
      );
      console.log("Returnee Wellers Response: ", res.data);

      return res.data;
    } catch (err: any) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to get Returnee wellers "
      );
    }
  }
);

export const getDroppedWellers = createAsyncThunk(
  "groups/getDroppedWellers",
  async ({ from, to }: { from: any; to: any }, thunkAPI) => {
    try {
      const res = await axiosInstance.get(
        `admin/drop-wellers?from=${from}&to=${to}`
      );
      console.log("Drop Wellers Response: ", res.data);

      return res.data;
    } catch (err: any) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to get Drop wellers "
      );
    }
  }
);

export const printPrayerGroups = createAsyncThunk(
  "groups/printPrayerGroups",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`admin/print-prayer-groups`, {
        responseType: "blob", // 👈 Important for files
      });

      // Create a downloadable link
      const blob = new Blob([res.data], { type: res.headers["content-type"] });
      const url = window.URL.createObjectURL(blob);

      // Trigger download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "prayer-groups.pdf"); // or .xlsx based on backend
      document.body.appendChild(link);
      link.click();
      link.remove();

      return true; // success
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to print prayer groups"
      );
    }
  }
);

export const printBibleClassUsers = createAsyncThunk(
  "groups/printBibleClassUsers",
  async ({ data }: { data: any }, thunkAPI) => {
    try {
      const res = await axiosInstance.post(
        `admin/print-bible-class-users`,
        data, // 👈 send data directly, not nested under `data`
        {
          responseType: "blob", // 👈 this goes in the config
        }
      );

      const blob = new Blob([res.data], { type: res.headers["content-type"] });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "bible-class.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();

      return true;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to print bible studies users"
      );
    }
  }
);

export const printPgMembers = createAsyncThunk(
  "groups/printPgMembers",
  async ({ data }: { data: any }, thunkAPI) => {
    try {
      const res = await axiosInstance.post(
        `admin/print-pg-members`,
        data, // 👈 send data directly, not nested under `data`
        {
          responseType: "blob", // 👈 this goes in the config
        }
      );

      const blob = new Blob([res.data], { type: res.headers["content-type"] });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "pg-wellers.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();

      return true;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to print bible studies users"
      );
    }
  }
);

export const getPgNumbers = createAsyncThunk(
  "groups/getPgNumbers",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`admin/pg-numbers`);
      console.log("Pg Numbers Response: ", res.data);

      return res.data;
    } catch (err: any) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to get Pg Numbers "
      );
    }
  }
);

export const saveNotesAndLocation = createAsyncThunk(
  "groups/getDroppedWellers",
  async ({ data }: { data: any }, thunkAPI) => {
    try {
      const res = await axiosInstance.post(`admin/add-notes-location`, data);
      console.log("Saved Notes and location response : ", res.data);

      return res.data;
    } catch (err: any) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to save Notes and location  "
      );
    }
  }
);

// 2. Initial State
const initialState = {
  groups: [],
  wellersByClass: [],
  leaderData: [],
  wellersByPG: [],
  newWellers: [],
  pgNumbers: [],
  loading: false,
  error: null as string | null,
  pagination: null,
};

// 3. Slice
const groupSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    clearWellersByClass: (state: any) => {
      state.wellersByClass = { data: [], pagination: {} };
    },
    clearNewWellers: (state: any) => {
      state.newWellers = { data: [], pagination: {} };
    },
  },

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
        state.pagination = action.payload.pagination;
      })
      .addCase(getWellersByPG.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getNewWellers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNewWellers.fulfilled, (state, action) => {
        state.loading = false;
        state.newWellers = action.payload;
      })
      .addCase(getNewWellers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getGuestWellers.fulfilled, (state, action) => {
        state.loading = false;
        state.newWellers = action.payload;
      })
      .addCase(getReturneeWellers.fulfilled, (state, action) => {
        state.loading = false;
        state.newWellers = action.payload;
      })
      .addCase(getDroppedWellers.fulfilled, (state, action) => {
        state.loading = false;
        state.newWellers = action.payload;
      })
      .addCase(getPgNumbers.fulfilled, (state, action) => {
        state.loading = false;
        state.pgNumbers = action.payload.data;
      });
  },
});
export const { clearWellersByClass, clearNewWellers } = groupSlice.actions;
export default groupSlice.reducer;
