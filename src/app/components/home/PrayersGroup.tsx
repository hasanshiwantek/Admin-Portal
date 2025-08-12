"use client";
import React, { useMemo, useState } from "react";
import { ChevronDown, User, MapPin, CircleUserRound } from "lucide-react";

type Group = {
  id: number;
  members: number | string;
  address: string;
  room: string;
  leader: string;
};

const mondayGroups: Group[] = [
  {
    id: 1,
    members: 32,
    address: "32 Wellers",
    room: "Downstairs, Storage Area",
    leader: "John smith",
  },
  {
    id: 2,
    members: "45 Oakridge",
    address: "45 Oakridge",
    room: "Main Floor, Conference Room",
    leader: "Sarah Johnson",
  },
  {
    id: 3,
    members: "28 Maple Street",
    address: "28 Maple Street",
    room: "Upstairs, Break Room",
    leader: "Michael Lee",
  },
  {
    id: 4,
    members: "60 Pine Avenue",
    address: "60 Pine Avenue",
    room: "Ground Floor, Kitchen",
    leader: "Emily Davis",
  },
  {
    id: 5,
    members: "77 Elm Road",
    address: "77 Elm Road",
    room: "Second Floor, Meeting Room",
    leader: "David Brown",
  },
  {
    id: 6,
    members: "50 Birch Lane",
    address: "50 Birch Lane",
    room: "Basement, Game Room",
    leader: "Anna White",
  },
];

const dayMap: Record<string, Group[]> = {
  Mon: mondayGroups,
  Tue: mondayGroups,
  Wed: mondayGroups,
  Thu: mondayGroups,
  Fri: mondayGroups,
  Sat: mondayGroups,
  Sun: mondayGroups,
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
  const [period, setPeriod] = useState<"AM" | "PM">("AM");
  const [day, setDay] = useState<keyof typeof dayMap>("Mon");

  const groups = useMemo(() => dayMap[day] || [], [day]);

  return (
    <div className="w-[67%] rounded-md bg-white p-5 shadow-sm ring-1 ring-gray-100">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-semibold text-gray-800">Prayers groups</h2>
        <button className="text-lg font-semibold text-[#008696] underline">
          View all
        </button>
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
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
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
        {groups.map((g) => (
          <div
            key={g.id}
            className="rounded-xl border shadow-xs border-gray-200 bg-white "
          >
            <div className="flex gap-4">
              {/* Left number badge */}
              <div className="flex w-20 items-start justify-center bg-gray-100/70">
                <div className="text-3xl font-extrabold text-gray-800 p-2 m-auto">
                  #{g.id}
                </div>
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1 p-4">
                <div className="flex items-center gap-2 text-gray-700">
                  <User className="h-6 w-6 text-gray-600" />
                  <span className="truncate !text-gray-800">{g.address}</span>
                </div>
                <div className="mt-1 flex items-center gap-2 text-gray-500">
                  <MapPin className="h-6 w-6 text-gray-600" />
                  <span className="truncate !text-gray-800">{g.room}</span>
                </div>

                <div className="mt-3 border-b border-gray-200" />

                <div className="mt-3 text-base text-gray-800">
                  Group leader:
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full ">
                    <CircleUserRound className="h-8 w-8 text-[#008696]" />
                  </span>
                  <span className="!text-xl !font-semibold !text-gray-800">
                    {g.leader}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrayersGroup;
