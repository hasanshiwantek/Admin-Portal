"use client";

import React, { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";

import {
  getEvents,
  getEventStats,
} from "@/redux/slices/eventSlice";

import EventStats from "./EventStats";
import EventTable from "./EventTable";

const EventList = () => {
  const dispatch = useAppDispatch();

  const {
    events,
    stats,
    currentPage,
    lastPage,
    loading,
    error,
  } = useAppSelector(
    (state: any) => state.events
  );

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(
      getEvents({
        page,
      })
    );
  }, [dispatch, page]);

  useEffect(() => {
    dispatch(getEventStats());
  }, [dispatch]);

  return (
    <div>
      <div className="text-lg flex items-center p-4 text-gray-500 mt-10">
        Home
        <ChevronRight className="h-5 w-5" />
        <span className="text-[var(--primary-color)]">
          Events
        </span>
      </div>

      <div className="my-5">
        <EventStats stats={stats} />
      </div>

      <EventTable
        events={events}
        loading={loading}
        error={error}
        currentPage={currentPage}
        lastPage={lastPage}
        setPage={setPage}
      />
    </div>
  );
};

export default EventList;