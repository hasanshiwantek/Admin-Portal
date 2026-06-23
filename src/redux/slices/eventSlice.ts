import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axiosInstance";

export const getEvents = createAsyncThunk(
  "events/getEvents",
  async (params: any, thunkAPI) => {
    try {
      const res = await axiosInstance.get(
        "admin/events",
        {
          params,
        }
      );

      console.log("✅ Events Response:", res.data);

      return res.data;
    } catch (err: any) {
      console.error("❌ Error Fetching Events:", err);

      return thunkAPI.rejectWithValue(
        err.response?.data?.message ||
          "Failed to fetch events"
      );
    }
  }
);

interface EventState {
  events: any[];
  registrations: any[];
  registrationCurrentPage: number;
  registrationLastPage: number;
   registrationStats: {
    total_registrations: number;
    registered_count: number;
    cancelled_count: number;
    checked_in_count: number;
  };
  selectedEvent: {
    id: 0,
    title: "",
    status: "",
    },
  stats: any;
  totalRecords: number;
  registrationTotal: number;
  currentPage: number;
  lastPage: number;
  loading: boolean;
  error: any;
}

const initialState: EventState = {
  events: [],
  registrations: [],
  registrationCurrentPage: 1,
  registrationLastPage: 1,
  stats: {},
  registrationStats: {
    total_registrations: 0,
    registered_count: 0,
    cancelled_count: 0,
    checked_in_count: 0,
  },
  totalRecords: 0,
  registrationTotal: 0,
  currentPage: 1,
  lastPage: 1,
  loading: false,
  error: null,
};

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEvents.fulfilled, (state, action) => {
        state.loading = false;

        state.events = action.payload.data || [];

        state.totalRecords = action.payload.total || 0;

        state.currentPage =
            action.payload.current_page || 1;

        state.lastPage =
            action.payload.last_page || 1;
        })
        .addCase(getEventStats.fulfilled, (state, action) => {
        state.stats = action.payload;
        })
        .addCase(
            getEventRegistrations.fulfilled,
            (state, action) => {
                state.registrations =
                action.payload.registrations.data;

                state.registrationCurrentPage =
                action.payload.registrations.current_page;

                state.registrationLastPage =
                action.payload.registrations.last_page;

                state.selectedEvent =
                action.payload.event;
            }
            )
            .addCase(
            getRegistrationStats.fulfilled,
            (state, action) => {
                state.registrationStats =
                action.payload;
            }
            )
      .addCase(getEvents.rejected, (state, action) => {
        state.loading = false;

        state.error =
          (action.payload as string) ||
          action.error.message ||
          "Failed";
      });
  },
});

export const getEventStats = createAsyncThunk(
  "events/getEventStats",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get(
        "admin/events-stats"
      );

      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message ||
        "Failed to fetch stats"
      );
    }
  }
);

export const getEventRegistrations = createAsyncThunk(
  "events/getEventRegistrations",
  async (
    {
      eventId,
      page = 1,
      search = "",
      checked_in = "",
      payment_status = "",
    }: any,
    thunkAPI
  ) => {
    try {
      const res = await axiosInstance.get(
        `admin/events/${eventId}/registrations`,
        {
          params: {
            page,
            search,
            checked_in,
            payment_status,
          },
        }
      );

      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message
      );
    }
  }
);

export const getRegistrationStats =
  createAsyncThunk(
    "events/getRegistrationStats",
    async (
      eventId: string,
      thunkAPI
    ) => {
      try {
        const res =
          await axiosInstance.get(
            `admin/events/${eventId}/registrations/stats`
          );

        return res.data;
      } catch (err: any) {
        return thunkAPI.rejectWithValue(
          err.response?.data?.message
        );
      }
    }
  );

export default eventSlice.reducer;