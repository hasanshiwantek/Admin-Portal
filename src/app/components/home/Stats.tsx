"use client";
import React, { useEffect } from "react";
import { getWellerStats } from "@/redux/slices/homeSlice";
import { useAppSelector, useAppDispatch } from "@/hooks/useReduxHooks";
import { Users, User, User2 } from "lucide-react";

const numberFmt = (n?: number) =>
  typeof n === "number" ? new Intl.NumberFormat().format(n) : "0";

const Stats = () => {
  const { statistics, loading, error } = useAppSelector(
    (state: any) => state.home
  );
  const data = statistics?.data;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getWellerStats());
  }, [dispatch]);

  const stats = [
    {
      label: "Total  Groups",
      value: numberFmt(data?.totalPrayerGroups),
      icon: Users,
    },
    {
      label: "Total Wellers",
      value: numberFmt(data?.totalWellers),
      icon: User,
    },
    {
      label: "Total Group Leaders",
      value: numberFmt(data?.totalGroupLeaders),
      icon: User2,
    },
  ];

  // if (error)
  //   return <div className="px-4 text-red-600">Failed to load stats.</div>;

  return (
    <div className="mt-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map(({ label, value, icon: Icon }, idx) => (
          <div
            key={idx}
            className="rounded-md bg-white shadow-sm ring-1 ring-gray-100 p-10 h-45"
          >
            <div className="flex items-start justify-between">
              <div className="text-xl text-gray-500">{label}</div>
              <Icon className="h-8 w-8 text-gray-400 fill-gray-400 stroke-gray-400" />
            </div>
            <div className="mt-2 text-3xl font-extrabold text-gray-800 tracking-tight">
              {value}
            </div>
          </div>
        ))}
      </div>

      {/* {loading && (
        <div className="mt-3 text-sm text-gray-500">Loading statistics…</div>
      )} */}
    </div>
  );
};

export default Stats;
