"use client";
import React, { useEffect, useState } from "react";
import WellersAttendance from "./WellersAttendance";
import WellersStats from "./WellersStats";
import WellersTable from "./WellersTable";
import { ChevronRight } from "lucide-react";
import { getWellersByDay } from "@/redux/slices/wellerSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";

const ViewWellers = () => {
  const dispatch = useAppDispatch();
  const { wellersByDay, loading, error } = useAppSelector(
    (state: any) => state.wellers
  );

  const [selectedDay, setSelectedDay] = useState<"tue" | "wed" | "thu">("tue");
  const [selectedPeriod, setSelectedPeriod] = useState<"am" | "pm">("pm");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState("20");

  useEffect(() => {
    dispatch(
      getWellersByDay({
        day: selectedDay,
        time: selectedPeriod,
        page: currentPage,
        perPage,
      })
    );
  }, [dispatch, selectedDay, selectedPeriod, currentPage, perPage]);

  return (
    <div>
      <div className="text-lg flex justify-start items-center font-light p-4 text-gray-500">
        Home <ChevronRight className="h-5 w-6" />
        <span className="!font-light !text-[var(--primary-color)]">
          View Wellers by day
        </span>
      </div>

      <div className="flex justify-between gap-10 mt-5">
        <WellersAttendance wellersByDay={wellersByDay} />
        <WellersStats wellersByDay={wellersByDay} />
      </div>

      <div className="my-5">
        <WellersTable
          wellersByDay={wellersByDay}
          error={error}
          loading={loading}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={setSelectedPeriod}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          perPage={perPage}
          setPerPage={setPerPage}
        />
      </div>
    </div>
  );
};

export default ViewWellers;
