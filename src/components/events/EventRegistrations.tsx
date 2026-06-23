"use client";

import { useEffect, useState } from "react";
import RegistrationStats from "./RegistrationStats";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { getEventRegistrations, getRegistrationStats } from "@/redux/slices/eventSlice";

import RegistrationTable from "./RegistrationTable";

const EventRegistrations = ({
  eventId,
}: {
  eventId: string;
}) => {
  const dispatch = useAppDispatch();

  const {
    registrations,
    selectedEvent,
    registrationStats,
    registrationCurrentPage,
    registrationLastPage,
    loading,
    error,
  } = useAppSelector(
    (state: any) => state.events
  );

  const [filters, setFilters] =
    useState({
        search: "",
        checked_in: "",
    });

  const [page, setPage] = useState(1);

//   useEffect(() => {
//     dispatch(
//       getEventRegistrations({
//         eventId,
//         page,
//         ...filters,
//       })
//     );
//   }, [dispatch, page, filters, eventId]);

  useEffect(() => {
    if (!eventId) return;

    dispatch(
        getEventRegistrations({
        eventId,
        page,
        search: filters.search,
        checked_in:
            filters.checked_in,
        })
    );

    dispatch(
        getRegistrationStats(eventId)
    );
    }, [
    dispatch,
    eventId,
    page,
    filters,
    ]);

  return (
    <div>
        <div className="mb-3 mt-17">
        <h1 className="text-2xl font-bold">
            Event: {selectedEvent?.title}
        </h1>

        <p className="text-gray-500">
            Start Date: {selectedEvent?.event_start &&
            new Date(
                selectedEvent.event_start
            ).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
            })}
        </p>
        </div>
        <div className="mt-5">
        <RegistrationStats
            stats={registrationStats}
        />
        </div>

        <RegistrationTable
        registrations={registrations}
        loading={loading}
        error={error}
        currentPage={
            registrationCurrentPage
        }
        lastPage={
            registrationLastPage
        }
        setPage={setPage}
        filters={filters}
        setFilters={setFilters}
        />
    </div>
    );
};

export default EventRegistrations;