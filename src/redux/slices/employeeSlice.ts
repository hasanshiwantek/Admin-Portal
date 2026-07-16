import {
    createSlice,
    createAsyncThunk,
} from "@reduxjs/toolkit";

import axiosInstance from "@/lib/axiosInstance";

export const getEmployees = createAsyncThunk(
    "employee/getEmployees",
    async (params: any, thunkAPI) => {
        try {

            const res =
                await axiosInstance.get(
                    "/admin/employees",
                    {
                        params,
                    }
                );

            return res.data.data;

        } catch (err: any) {

            return thunkAPI.rejectWithValue(
                err.response?.data?.message
            );

        }
    }
);

export const getEmployee = createAsyncThunk(
    "employee/getEmployee",
    async (id: number, thunkAPI) => {

        try {

            const res =
                await axiosInstance.get(
                    `/admin/employees/${id}`
                );

            return res.data.data;

        } catch (err: any) {

            return thunkAPI.rejectWithValue(
                err.response?.data?.message
            );

        }

    }
);

export const storeEmployee = createAsyncThunk(
    "employee/storeEmployee",
    async (data: any, thunkAPI) => {

        try {

            const res =
                await axiosInstance.post(
                    "/admin/employees",
                    data
                );

            return res.data.data;

        } catch (err: any) {

            return thunkAPI.rejectWithValue(
                err.response?.data?.message
            );

        }

    }
);

export const updateEmployee = createAsyncThunk(
    "employee/updateEmployee",
    async (data: any, thunkAPI) => {

        try {

            const res =
                await axiosInstance.put(
                    `/admin/employees/${data.id}`,
                    data
                );

            return res.data.data;

        } catch (err: any) {

            return thunkAPI.rejectWithValue(
                err.response?.data?.message
            );

        }

    }
);

export const deleteEmployee = createAsyncThunk(
    "employee/deleteEmployee",
    async (id: number, thunkAPI) => {

        try {

            await axiosInstance.delete(
                `/admin/employees/${id}`
            );

            return id;

        } catch (err: any) {

            return thunkAPI.rejectWithValue(
                err.response?.data?.message
            );

        }

    }
);

export const getEmployeeRoles = createAsyncThunk(
    "employee/getEmployeeRoles",
    async (_, thunkAPI) => {

        try {

            const res =
                await axiosInstance.get(
                    "/admin/employee-roles"
                );

            return res.data.data;

        } catch (err: any) {

            return thunkAPI.rejectWithValue(
                err.response?.data?.message
            );

        }

    }
);

const initialState = {

    employees: [],

    employee: null,

    employeeRoles: [],

    loading: false,

    error: null,

    currentPage: 1,

    lastPage: 1,

};

const employeeSlice = createSlice({

    name: "employee",

    initialState,

    reducers: {

        clearEmployee(state) {

            state.employee = null;

        },

    },

    extraReducers: (builder) => {

        builder

        .addCase(
            getEmployees.pending,
            (state) => {

                state.loading = true;

            }
        )

        .addCase(
            getEmployees.fulfilled,
            (state, action) => {

                state.loading = false;

                state.employees =
                    action.payload.data;

                state.currentPage =
                    action.payload.current_page;

                state.lastPage =
                    action.payload.last_page;

            }
        )

        .addCase(
            getEmployees.rejected,
            (state, action: any) => {

                state.loading = false;

                state.error =
                    action.payload;

            }
        )

        .addCase(
            getEmployee.fulfilled,
            (state, action) => {

                state.employee =
                    action.payload;

            }
        )

        .addCase(
            getEmployeeRoles.fulfilled,
            (state, action) => {

                state.employeeRoles =
                    action.payload;

            }
        );

    },

});

export const {

    clearEmployee,

} = employeeSlice.actions;

export default employeeSlice.reducer;