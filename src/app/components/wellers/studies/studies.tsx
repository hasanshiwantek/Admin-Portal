"use client";

import React, { useState } from "react";
import WellerColumn from "./WellerColumn";
import { ChevronRight } from "lucide-react";
import StudiesStats from "./StudiesStats";
import ViewWellersClass from "./ViewWellersClass";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { getWellersByClass } from "@/redux/slices/groupSlice";

const Studies = () => {
  const dispatch = useAppDispatch();
  const { wellersByClass, loading, error } = useAppSelector(
    (state: any) => state.groups
  );

  const wellers = wellersByClass?.data;

  // ✅ Initialize default values
  const [className, setClassName] = useState("");
  const [day, setDay] = useState("tue"); // default "tue"
  const [time, setTime] = useState("pm"); // default "pm"

  const handleClassChange = (val: string) => setClassName(val);
  const handleDayChange = (val: string) => setDay(val);
  const handleTimeChange = (val: string) => setTime(val);

  const handleSubmit = () => {
    if (className && day && time) {
      dispatch(getWellersByClass({ className, day, time }));
    } else {
      alert("Please select class, day and time");
    }
  };

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
            onClassChange={handleClassChange}
            onDayChange={handleDayChange}
            onPeriodChange={handleTimeChange}
            onSubmit={handleSubmit}
          />
          <StudiesStats />
        </div>

        <div className="my-5">
          <WellerColumn wellers={wellers} loading={loading} error={error} day={day} currentClass={className} period={time} />
        </div>
      </div>
    </>
  );
};

export default Studies;
