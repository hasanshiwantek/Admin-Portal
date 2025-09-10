"use client";

import React, { useState, useEffect } from "react";
import WellerColumn from "./WellerColumn";
import { ChevronRight } from "lucide-react";
import StudiesStats from "./StudiesStats";
import ViewWellersClass from "./ViewWellersClass";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import {
  getWellersByClass,
  clearWellersByClass,
} from "@/redux/slices/groupSlice";

const Studies = () => {
  const dispatch = useAppDispatch();
  const { wellersByClass, loading, error } = useAppSelector(
    (state: any) => state.groups
  );

  const wellers = wellersByClass?.data;
  const pagination = wellersByClass?.pagination || {};

  const [className, setClassName] = useState("");
  const [day, setDay] = useState("tue");
  const [time, setTime] = useState("pm");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState("20");

  // Fetch on filter or pagination change
  useEffect(() => {
    if (className && day && time) {
      dispatch(
        getWellersByClass({ className, day, time, page: currentPage, perPage })
      );
    }
  }, [className, day, time, currentPage, perPage]);

  useEffect(() => {
    return () => {
      // 👇 dispatch an action to clear data
      console.log("Unmount! Cleared Data ");

      dispatch(clearWellersByClass());
    };
  }, [dispatch]);

  return (
    <>
      <div>
        <div className="text-lg flex justify-start items-center font-light p-4 text-gray-500">
          Home <ChevronRight className="h-5 w-6" />
          <span className="!font-light !text-[var(--primary-color)]">
            Studies
          </span>
        </div>

        <div className="flex justify-between gap-10 mt-5">
          <ViewWellersClass
            currentClass={className}
            onClassChange={(val) => {
              setClassName(val);
              setCurrentPage(1);
            }}
            onDayChange={(val) => {
              setDay(val);
              setCurrentPage(1);
            }}
            onPeriodChange={(val) => {
              setTime(val);
              setCurrentPage(1);
            }}
            onSubmit={() => {
              dispatch(
                getWellersByClass({
                  className,
                  day,
                  time,
                  page: currentPage,
                  perPage,
                })
              );
            }}
            wellers={wellers}
            day={day}
            period={time}
          />
          <StudiesStats />
        </div>

        <div className="my-5">
          <WellerColumn
            wellers={wellers}
            loading={loading}
            error={error}
            currentClass={className}
            day={day}
            period={time}
            currentPage={currentPage}
            perPage={perPage}
            totalPages={pagination?.lastPage || 1}
            onPageChange={setCurrentPage}
            onPerPageChange={setPerPage}
          />
        </div>
      </div>
    </>
  );
};

export default Studies;
