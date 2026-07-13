"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";

import {
    getTodayReport,
    getDateRangeReport,
} from "@/redux/slices/childWatchSlice";

import ReportSummary from "@/components/child-watch/Reports/ReportSummary";
import DateRangeFilter from "@/components/child-watch/Reports/DateRangeFilter";
import ReportTable from "@/components/child-watch/Reports/ReportTable";
import ChildrenReportTable from "@/components/child-watch/Reports/ChildrenReportTable";

export default function ReportsPage() {

    const dispatch = useAppDispatch();

    const {
        report,
        loading,
    } = useAppSelector(
        (state:any)=>state.childWatch
    );

    const [filters,setFilters]=useState({

        start:"",

        end:"",

    });

    useEffect(()=>{

        dispatch(
            getTodayReport()
        );

    },[]);

    const handleFilter=()=>{

        dispatch(

            getDateRangeReport(
                filters
            )

        );

    };

    return(

        <div className="space-y-6">

            <h1 className="text-3xl font-bold">

                Reports

            </h1>

            <DateRangeFilter

                filters={filters}

                setFilters={setFilters}

                onSearch={handleFilter}

            />

            <ReportSummary

                report={report}

            />

            <ReportTable

                report={report}

                loading={loading}

            />

            <ChildrenReportTable

                report={report}

                loading={loading}

            />

        </div>

    );

}