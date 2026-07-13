import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axiosInstance";

interface ChildWatchState {
    dashboard: any;
    classrooms: any[];
    parents: any[];
    children: any[];
    checkIns: any[];
    currentChildren: any[];
    selectedParent: any | null;
    selectedChild: any | null;
    selectedCheckIn: any | null;
    loading: boolean;
    error: string | null;
    report: null;
    childCurrentPage: 1;
    childLastPage: 1;
    parentCurrentPage: 1;
    parentLastPage: 1;
}

const initialState: ChildWatchState = {
    dashboard: null,
    classrooms: [],
    parents: [],
    children: [],
    checkIns: [],
    currentChildren: [],
    selectedParent: null,
    selectedChild: null,
    selectedCheckIn: null,
    loading: false,
    error: null,
    report:null,
    childCurrentPage: 1,
    childLastPage: 1,
    parentCurrentPage: 1,
    parentLastPage: 1,
};

export const getDashboard = createAsyncThunk(
    "childWatch/dashboard",
    async (_, thunkAPI) => {
        try {
            const res = await axiosInstance.get(
                "/admin/child-watch/checkin-screen"
            );

            return res.data.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message ||
                    "Unable to load dashboard."
            );
        }
    }
);

export const searchFamilies = createAsyncThunk(
    "childWatch/searchFamilies",
    async (search: string, thunkAPI) => {
        try {

            const res = await axiosInstance.get(
                `/admin/parents?search=${search}`
            );

            return res.data.data.data;

        } catch (err: any) {

            return thunkAPI.rejectWithValue(
                err.response?.data?.message
            );

        }
    }
);

export const createParent = createAsyncThunk(
    "childWatch/createParent",
    async (data: any, thunkAPI) => {
        try {
            const res = await axiosInstance.post(
                "/admin/parents",
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

export const updateParent = createAsyncThunk(
    "childWatch/updateParent",
    async (
        {
            id,
            data,
        }: {
            id: number;
            data: any;
        },
        thunkAPI
    ) => {
        try {
            const res = await axiosInstance.put(
                `/admin/parents/${id}`,
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

export const deleteParent =
createAsyncThunk(

    "childWatch/deleteParent",

    async(id:number,thunkAPI)=>{

        try{

            await axiosInstance.delete(

                `/admin/parents/${id}`

            );

            return id;

        }catch(err:any){

            return thunkAPI.rejectWithValue(

                err.response?.data?.message

            );

        }

    }

);

export const getChildren =
createAsyncThunk(

    "childWatch/getChildren",

    async(

        params:{

            page?:number;

            search?:string;

        },

        thunkAPI

    )=>{

        try{

            const res=
            await axiosInstance.get(

                "/admin/children",

                {

                    params,

                }

            );

            return res.data.data;

        }catch(err:any){

            return thunkAPI.rejectWithValue(

                err.response?.data?.message

            );

        }

    }

);

export const createChild = createAsyncThunk(
    "childWatch/createChild",

    async (data: any, thunkAPI) => {

        try {

            const res = await axiosInstance.post(
                "/admin/children",
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

export const updateChild = createAsyncThunk(
    "childWatch/updateChild",

    async (
        {
            id,
            data,
        }: {
            id: number;
            data: any;
        },
        thunkAPI
    ) => {

        try {

            const res = await axiosInstance.put(
                `/admin/children/${id}`,
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

export const deleteChild = createAsyncThunk(
    "childWatch/deleteChild",

    async (
        id: number,
        thunkAPI
    ) => {

        try {

            await axiosInstance.delete(
                `/admin/children/${id}`
            );

            return id;

        } catch (err: any) {

            return thunkAPI.rejectWithValue(
                err.response?.data?.message
            );

        }

    }
);

export const checkInChildren = createAsyncThunk(
    "childWatch/checkIn",
    async (data: any, thunkAPI) => {
        try {
            const res = await axiosInstance.post(
                "/admin/child-checkins",
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

export const checkoutFamily =
createAsyncThunk(

    "childWatch/checkoutFamily",

    async(
        id:number,
        thunkAPI
    )=>{

        try{

            const res=
            await axiosInstance.post(

                `/admin/child-checkins/${id}/checkout`

            );

            return res.data;

        }catch(err:any){

            return thunkAPI.rejectWithValue(

                err.response?.data?.message

            );

        }

    }

);

export const checkoutChild =
createAsyncThunk(

    "childWatch/checkoutChild",

    async(
        id:number,
        thunkAPI
    )=>{

        try{

            const res=
            await axiosInstance.post(

                `/admin/child-checkins/item/${id}/checkout`

            );

            return res.data;

        }catch(err:any){

            return thunkAPI.rejectWithValue(

                err.response?.data?.message

            );

        }

    }

);
export const searchPickupCode =
createAsyncThunk(

    "childWatch/searchPickupCode",

    async(
        pickupCode:string,
        thunkAPI
    )=>{

        try{

            const res=
            await axiosInstance.get(

                `/admin/child-watch/pickup/${pickupCode}`

            );

            return res.data.data;

        }catch(err:any){

            return thunkAPI.rejectWithValue(

                err.response?.data?.message

            );

        }

    }

);

export const getTodayReport =
createAsyncThunk(

    "childWatch/getTodayReport",

    async(_,thunkAPI)=>{

        try{

            const res=
            await axiosInstance.get(

                "/admin/child-watch/report/today"

            );

            return res.data.data;

        }catch(err:any){

            return thunkAPI.rejectWithValue(

                err.response?.data?.message

            );

        }

    }

);

export const getDateRangeReport =
createAsyncThunk(

    "childWatch/getDateRangeReport",

    async(filters:any,thunkAPI)=>{

        try{

            const res=
            await axiosInstance.get(

                "/admin/child-watch/report/date-range",

                {

                    params:filters,

                }

            );

            return res.data.data;

        }catch(err:any){

            return thunkAPI.rejectWithValue(

                err.response?.data?.message

            );

        }

    }

);

export const getParents = createAsyncThunk(
    "childWatch/getParents",
    async (
        params: {
            page?: number;
            search?: string;
        },
        thunkAPI
    ) => {

        try {

            const res =
                await axiosInstance.get(
                    "/admin/parents",
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

export const getClassrooms = createAsyncThunk(
    "childWatch/getClassrooms",

    async (_, thunkAPI) => {

        try {

            const res = await axiosInstance.get(
                "/admin/classrooms"
            );

            return res.data.data;

        } catch (err: any) {

            return thunkAPI.rejectWithValue(
                err.response?.data?.message
            );

        }

    }
);


const childWatchSlice = createSlice({
    name: "childWatch",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder

            .addCase(getDashboard.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(
                getDashboard.fulfilled,
                (state, action) => {
                    state.loading = false;
                    state.dashboard = action.payload;
                }
            )

            .addCase(
                getDashboard.rejected,
                (state, action: any) => {
                    state.loading = false;
                    state.error = action.payload;
                }
            ).addCase(
                getTodayReport.fulfilled,
                (state,action)=>{

                    state.report=
                        action.payload;

                }
            )

            .addCase(
                getDateRangeReport.fulfilled,
                (state,action)=>{

                    state.report=
                        action.payload;

                }
            ).addCase(
                getParents.pending,
                (state) => {

                    state.loading = true;

                }
            )

            .addCase(
                getParents.fulfilled,
                (state, action) => {

                    state.loading = false;

                    state.parents =
                        action.payload.data;

                    state.parentCurrentPage =
                        action.payload.current_page;

                    state.parentLastPage =
                        action.payload.last_page;

                }
            )

            .addCase(
                getParents.rejected,
                (state, action: any) => {

                    state.loading = false;

                    state.error =
                        action.payload;

                }
            ).addCase(
                getChildren.pending,
                (state)=>{

                    state.loading=true;

                }
            )

            .addCase(
                getChildren.fulfilled,
                (state,action)=>{

                    state.loading=false;

                    state.children=
                        action.payload.data;

                    state.childCurrentPage=
                        action.payload.current_page;

                    state.childLastPage=
                        action.payload.last_page;

                }
            )

            .addCase(
                getChildren.rejected,
                (state,action:any)=>{

                    state.loading=false;

                    state.error=
                        action.payload;

                }
            ).addCase(
                createChild.pending,
                (state) => {

                    state.loading = true;

                }
            )

            .addCase(
                createChild.fulfilled,
                (state) => {

                    state.loading = false;

                }
            )

            .addCase(
                createChild.rejected,
                (state, action: any) => {

                    state.loading = false;

                    state.error = action.payload;

                }
            ).addCase(
                updateChild.pending,
                (state) => {

                    state.loading = true;

                }
            )

            .addCase(
                updateChild.fulfilled,
                (state) => {

                    state.loading = false;

                }
            )

            .addCase(
                updateChild.rejected,
                (state, action: any) => {

                    state.loading = false;

                    state.error = action.payload;

                }
            ).addCase(
                deleteChild.pending,
                (state) => {

                    state.loading = true;

                }
            )

            .addCase(
                deleteChild.fulfilled,
                (state) => {

                    state.loading = false;

                }
            )

            .addCase(
                deleteChild.rejected,
                (state, action: any) => {

                    state.loading = false;

                    state.error = action.payload;

                }
            ).addCase(
                getClassrooms.fulfilled,
                (state, action) => {

                    state.classrooms = action.payload;

                }
            )
    },
});





export default childWatchSlice.reducer;