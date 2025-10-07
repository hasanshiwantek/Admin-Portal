"use client";
import React, { useMemo, useState, useEffect } from "react";
import { ChevronDown, User, MapPin, CircleUserRound } from "lucide-react";
import { getPrayersGroup } from "@/redux/slices/homeSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import Spinner from "../loader/Spinner";
import Link from "next/link";
type Group = {
  id: number;
  members: number | string;
  address: string;
  room: string;
  leader: string;
};

const DayPill: React.FC<{
  active?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}> = ({ active, children, onClick }) => (
  <button
    onClick={onClick}
    className={[
      "rounded-lg px-6 py-3 text-lg font-medium transition",
      active
        ? "bg-[#008696] text-white"
        : "bg-gray-100 text-gray-700 hover:bg-gray-200",
    ].join(" ")}
  >
    {children}
  </button>
);

const PrayersGroup: React.FC = () => {
  // const [period, setPeriod] = useState<"AM" | "PM">("AM");
  // const [day, setDay] = useState<keyof typeof dayMap>("Tue");
  // const groups = useMemo(() => dayMap[day] || [], [day]);
  const dispatch = useAppDispatch();
  const { groups, loading, error } = useAppSelector((state: any) => state.home);
  const [period, setPeriod] = useState<"AM" | "PM">("PM");
  const [day, setDay] = useState<"Tue" | "Wed" | "Thu">("Tue");
  console.log("Groupds data:", groups);

  useEffect(() => {
    const timeParam = period.toLowerCase(); // "am" or "pm"
    const dayParam = day.toLowerCase(); // "tue", "wed", etc.

    dispatch(getPrayersGroup({ day: dayParam, time: timeParam }));
  }, [day, period, dispatch]);

  return (
    <div className="w-[67%] rounded-md bg-white p-5 shadow-sm ring-1 ring-gray-100">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-semibold text-gray-800">Total groups</h2>
        <Link href={"/info-leaders/current-groups"}>
          <button className="text-lg font-semibold text-[#008696] underline">
            View all
          </button>
        </Link>
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        {/* AM/PM pill with chevron */}
        <div className="relative">
          <button
            className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-3 text-lg font-medium text-gray-700 shadow-sm"
            onClick={() => setPeriod((p) => (p === "AM" ? "PM" : "AM"))}
            aria-label="Toggle AM/PM"
          >
            {period}
            <ChevronDown className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* Day pills */}
        <div className="flex flex-wrap gap-2">
          {["Tue", "Wed", "Thu"].map((d) => (
            <DayPill
              key={d}
              active={day === (d as any)}
              onClick={() => setDay(d as any)}
            >
              {d}
            </DayPill>
          ))}
        </div>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {error ? (
          <div className="col-span-full text-center text-red-600 py-10 text-lg">
            {error}
          </div>
        ) : loading ? (
          <div className="col-span-full flex justify-center py-10">
            <Spinner />
          </div>
        ) : groups?.data?.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-10 text-lg">
            No prayer groups found for this session.
          </div>
        ) : (
          groups?.data?.map((g: any, index: number) => (
            <div
              key={index}
              className="rounded-xl border shadow-xs border-gray-200 bg-white"
            >
              <div className="flex gap-4">
                <div className="flex w-36 items-start justify-center bg-gray-100/70">
                  <div className="text-2xl font-extrabold text-gray-800 p-2 m-auto">
                    {g.groupNumber}
                  </div>
                </div>
                <div className="min-w-0 flex-1 p-4">
                  <div className="flex items-center gap-2 text-gray-700">
                    <User className="h-6 w-6 text-gray-600" />
                    <span className="truncate !text-gray-800">
                      {g.locationAddress}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-gray-500">
                    <MapPin className="h-6 w-6 text-gray-600" />
                    <span className="truncate !text-gray-800">
                      {g.locationDescription || "No Description"}
                    </span>
                  </div>
                  <div className="mt-3 border-b border-gray-200" />
                  <div className="mt-3 text-base text-gray-800">
                    Group leader:
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full">
                      <CircleUserRound className="h-8 w-8 text-[#008696]" />
                    </span>
                    <span className="!text-xl !font-semibold !text-gray-800">
                      {g.leaderName}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PrayersGroup;
