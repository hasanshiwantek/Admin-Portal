"use client";
import React, { useState, useEffect } from "react";
import ViewLeadersTab from "./ViewLeadersTab";
import LeadersTable from "./LeadersTable";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { viewWellersByGroupsOrStudies } from "@/redux/slices/groupSlice";
import Spinner from "../../loader/Spinner";

const ViewLeadersPage = () => {
  const dispatch = useAppDispatch();
  const { leaderData, loading, error } = useAppSelector(
    (state: any) => state.groups
  );

  const [day, setDay] = useState("tue");
  const [time, setTime] = useState("pm");
  const [tab, setTab] = useState("prayer_groups");

  useEffect(() => {
    if (tab && day && time) {
      dispatch(viewWellersByGroupsOrStudies({ tab, day, time }));
    }
  }, [tab, day, time, dispatch]);

  const handleDayChange = (val: string) => setDay(val);
  const handleTimeChange = (val: string) => setTime(val);
  const handleTabChange = (val: string) => setTab(val);

  return (
    <div className="flex flex-col gap-5">
      <ViewLeadersTab
        onDayChange={handleDayChange}
        onPeriodChange={handleTimeChange}
      />

      {loading ? (
        <div className="text-center text-lg font-medium">
          <Spinner />
        </div>
      ) : error ? (
        <div className="text-center text-red-600 font-medium">{error}</div>
      ) : (
        <LeadersTable data={leaderData} tab={tab} setTab={handleTabChange} />
      )}
    </div>
  );
};

export default ViewLeadersPage;
