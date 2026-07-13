"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";

import { getDashboard } from "@/redux/slices/childWatchSlice";

import DashboardCards from "@/components/child-watch/Dashboard/DashboardCards";
import ClassroomCards from "@/components/child-watch/Dashboard/ClassroomCards";
import CurrentChildrenTable from "@/components/child-watch/Dashboard/CurrentChildrenTable";
import RecentFamilies from "@/components/child-watch/Dashboard/RecentFamilies";

export default function ChildWatchDashboard() {
    const dispatch = useAppDispatch();

    const {
        dashboard,
        loading,
    } = useAppSelector(
        (state: any) => state.childWatch
    );

    useEffect(() => {
        dispatch(getDashboard());
    }, [dispatch]);

    if (loading) {
        return (
            <div className="p-10">
                Loading...
            </div>
        );
    }

    return (
        <div className="space-y-6">

            <h1 className="text-3xl font-bold">
                Child Watch
            </h1>

            <DashboardCards
                stats={dashboard?.stats}
            />

            <ClassroomCards
                classrooms={dashboard?.classrooms}
            />

            <CurrentChildrenTable
                children={
                    dashboard?.current_children
                }
            />

            <RecentFamilies
                families={
                    dashboard?.recent_families
                }
            />

        </div>
    );
}