"use client";

import { CalendarDays } from "lucide-react";
import { format } from "date-fns";

const WellerInfo = ({
  selectedWeller,
  setSelectedWeller,
}: {
  selectedWeller: any;
  setSelectedWeller: (weller: any) => void;
}) => {
  const formatDate = (dateStr: string | null | undefined) => {
    if (!dateStr) return "NA";
    try {
      return format(new Date(dateStr), "MM/dd/yyyy");
    } catch {
      return "NA";
    }
  };

  const attendedDates: string[] =
    selectedWeller?.attendances?.length > 0
      ? selectedWeller.attendances.map((d: string) => formatDate(d))
      : [];

  const lastAttended = formatDate(selectedWeller?.lastAttended);
  const dropDate = formatDate(selectedWeller?.dropDate);
  const nwStartDate = formatDate(selectedWeller?.startDate);
  const notes = selectedWeller?.notes || "No notes available.";

  return (
    <div className="space-y-6">
      {/* Dates Section */}
      <div className="bg-white p-5 rounded-md shadow-sm space-y-4">
        <h2>Dates</h2>

        {/* Last Attended */}
        <div className="border rounded-md">
          <div className="bg-[#f8f9fb] p-3 rounded-md flex items-center gap-2 text-gray-800">
            <CalendarDays className="h-6 w-6 text-gray-600" />
            <span className="!font-bold">Last Attended: {lastAttended}</span>
          </div>

          {/* Start / Drop Dates */}
          <div className="space-y-1 p-4">
            <p className="flex justify-between">
              NW Start Date:{" "}
              <span className="font-medium text-gray-700">{nwStartDate}</span>
            </p>
            <p className="flex justify-between">
              Drop Date:{" "}
              <span className="font-medium text-gray-700">{dropDate}</span>
            </p>
          </div>
        </div>

        {/* All Dates Table */}
        <div className="border rounded-md overflow-hidden">
          <div className="bg-[#f8f9fb] px-4 py-2 font-semibold text-lg text-gray-800 border-b">
            All Dates Attended
          </div>
          <div className="grid grid-cols-3 gap-5 p-4 text-center font-medium text-gray-800">
            {attendedDates.length > 0 ? (
              attendedDates.map((date, i) => <div key={i}>{date}</div>)
            ) : (
              <div className="col-span-3">No attendance records</div>
            )}
          </div>
        </div>
      </div>

      {/* Notes Section */}
      <div className="bg-white p-5 rounded-md shadow-sm space-y-2">
        <h2>Notes</h2>
        <span className="leading-relaxed">{notes}</span>
      </div>
    </div>
  );
};

export default WellerInfo;
