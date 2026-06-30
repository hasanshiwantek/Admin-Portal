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
  selectedEvent: any,
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
  selectedEvent: {},
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

        const events = action.payload.data;

        state.events = events.data || [];

        state.totalRecords = events.total || 0;

        state.currentPage = events.current_page || 1;

        state.lastPage = events.last_page || 1;
        })
        .addCase(getEventStats.fulfilled, (state, action) => {
        state.stats = action.payload.data;
        })
        .addCase(
            getEventRegistrations.fulfilled,
            (state, action) => {
                const data = action.payload.data;

                state.selectedEvent = data.event;

                state.registrations =
                    data.registrations.data || [];

                state.registrationCurrentPage =
                    data.registrations.current_page || 1;

                state.registrationLastPage =
                    data.registrations.last_page || 1;
            }
            )
            .addCase(
            getRegistrationStats.fulfilled,
            (state, action) => {
                state.registrationStats =
                action.payload.data;
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

  export const updateRegistration = createAsyncThunk(
  "events/updateRegistration",
  async (
    {
      registrationId,
      data,
    }: {
      registrationId: number;
      data: any;
    },
    thunkAPI
  ) => {
    try {
      const res = await axiosInstance.put(
        `admin/registrations/${registrationId}`,
        data
      );

      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message ||
          "Failed to update registration"
      );
    }
  }
);

export const deleteRegistration =
  createAsyncThunk(
    "events/deleteRegistration",
    async (
      registrationId: number,
      thunkAPI
    ) => {
      try {
        const res =
          await axiosInstance.delete(
            `admin/registrations/${registrationId}`
          );

        return res.data;
      } catch (err: any) {
        return thunkAPI.rejectWithValue(
          err.response?.data?.message ||
            "Failed to delete registration"
        );
      }
    }
  );

  export const checkInRegistration =
  createAsyncThunk(
    "events/checkInRegistration",
    async (
      registrationId: number,
      thunkAPI
    ) => {
      try {
        const res =
          await axiosInstance.post(
            `admin/registrations/${registrationId}/check-in`
          );

        return res.data;
      } catch (err: any) {
        return thunkAPI.rejectWithValue(
          err.response?.data?.message ||
            "Failed to check in"
        );
      }
    }
  );

  export const undoCheckInRegistration =
  createAsyncThunk(
    "events/undoCheckInRegistration",
    async (
      registrationId: number,
      thunkAPI
    ) => {
      try {
        const res =
          await axiosInstance.post(
            `admin/registrations/${registrationId}/undo-check-in`
          );

        return res.data;
      } catch (err: any) {
        return thunkAPI.rejectWithValue(
          err.response?.data?.message ||
            "Failed to undo check in"
        );
      }
    }
  );

  export const bulkCheckInRegistrations =
  createAsyncThunk(
    "events/bulkCheckIn",
    async (
      registrationIds: number[],
      thunkAPI
    ) => {
      try {
        const res =
          await axiosInstance.post(
            "admin/registrations/bulk-check-in",
            {
              registration_ids:
                registrationIds,
            }
          );

        return res.data;
      } catch (err: any) {
        return thunkAPI.rejectWithValue(
          err.response?.data?.message ||
            "Bulk check in failed"
        );
      }
    }
  );

  export const addWalkInRegistration =
  createAsyncThunk(
    "events/addWalkInRegistration",
    async (
      {
        eventId,
        data,
      }: {
        eventId: number;
        data: any;
      },
      thunkAPI
    ) => {
      try {
        const res =
          await axiosInstance.post(
            `admin/events/${eventId}/registrations`,
            data
          );

        return res.data;
      } catch (err: any) {
        return thunkAPI.rejectWithValue(
          err.response?.data?.message ||
            "Failed to add walk in"
        );
      }
    }
  );

  export const bulkUndoCheckInRegistrations =
  createAsyncThunk(
      "events/bulkUndoCheckInRegistrations",
      async (
          registrationIds: number[],
          thunkAPI
      ) => {
          try {

              const res =
                  await axiosInstance.post(
                      "admin/registrations/bulk-undo-check-in",
                      {
                          registration_ids:
                              registrationIds,
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

export default eventSlice.reducer;