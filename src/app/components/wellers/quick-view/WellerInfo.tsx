"use client";

import { CalendarDays } from "lucide-react";

const WellerInfo = () => {
  const attendedDates = [
    "05-17-2017",
    "05-17-2017",
    "05-17-2017",
    "05-17-2017",
    "05-17-2017",
    "05-17-2017",
    "05-17-2017",
    "05-17-2017",
    "05-17-2017",
  ];

  return (
    <div className="space-y-6">
      {/* Dates Section */}
      <div className="bg-white p-5 rounded-md shadow-sm space-y-4">
        <h2>Dates</h2>

        {/* Last Attended */}
        <div className="border rounded-md">
          <div className="bg-[#f8f9fb] p-3 rounded-md flex items-center gap-2  text-gray-800">
            <CalendarDays className="h-6 w-6 text-gray-600" />
            <span className="!font-bold">Last Attended:06/12/2017</span>
          </div>

          {/* Start / Drop Dates */}
          <div className=" space-y-1 p-4">
            <p className="flex justify-between">
              NW Start Date:{" "}
              <span className="font-medium text-gray-700">NA</span>
            </p>
            <p className="flex justify-between">
              Drop Date: <span className="font-medium text-gray-700">NA</span>
            </p>
          </div>
        </div>

        {/* All Dates Table */}
        <div className="border rounded-md overflow-hidden">
          <div className="bg-[#f8f9fb] px-4 py-2 font-semibold text-lg text-gray-800 border-b">
            All Dates Attended
          </div>
          <div className="grid grid-cols-3 gap-5 p-4  text-center font-medium  text-gray-800">
            {attendedDates.map((date, i) => (
              <div key={i} className="">
                {date}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Notes Section */}
      <div className="bg-white p-5 rounded-md shadow-sm space-y-2">
        <h2>Notes</h2>
        <span className=" leading-relaxed">
          Abby Beita (abbybeita@me.com) has been an active participant in our
          prayer groups, consistently sharing her insights and uplifting others
          with her positive spirit. Her contributions have greatly enriched our
          community.
        </span>
      </div>
    </div>
  );
};

export default WellerInfo;
