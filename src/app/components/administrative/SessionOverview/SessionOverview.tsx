import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { DataTable } from "@/components/ui/DataTable";
const data = [
  {
    label: "Total # of Attendees this Session",
    values: [626, 135, 25, 180, 75],
  },
  {
    label: "Total # Active Attendees at Start",
    values: [15, 423, 451, 213, 123],
  },
  {
    label: "Total # Active Attendees at Finish",
    values: [145, 356, 412, 74, 56],
  },
  { label: "Total # Double Dippers", values: [542, 24, 65, 123, 254] },
  { label: "Total # 1st Timers", values: [241, 425, 44, 44, 22] },
  { label: "Total # Returnees", values: [22, 32, 12, 42, 74] },
  { label: "Total # Guests", values: [23, 85, 65, 14, 52] },
  { label: "Total # of Drops", values: [626, 135, 25, 180, 75] },
  {
    label: "% Attrition of Total",
    values: ["%32", "%32", "%25", "%28", "%25"],
  },
  { label: "% Net Gain", values: ["%54", "%54", "%54", "%54", "%54"] },
  {
    label: "Total # of Drops that were 1st Timers",
    values: [365, 135, 25, 180, 45],
  },
  {
    label: "% Attrition of 1st Timers",
    values: ["%5", "%16", "%23", "%45", "%4"],
  },
  { label: "Average Morning Attendance", values: [25, 135, 25, 180, 45] },
  { label: "Average Evening Attendance", values: [21, 135, 25, 180, 42] },
  { label: "# of Churches", values: [52, 135, 25, 180, 65] },
  { label: "Projected Growth", values: [504, 203, 54, 165, 123] },
];

const headers = [
  "Session: FEB 2017 – JUN 2017",
  "All Days",
  "TUPM",
  "WAM",
  "TAM",
  "TPM",
];

// CHURCHES DATA

const churchData = [
  { church: "Agape Fellowship", values: [626, 135, 25, 180, 75] },
  { church: "Hope Community Church", values: [540, 110, 30, 200, 90] },
  { church: "Unity Grace Center", values: [720, 145, 20, 250, 85] },
  { church: "Lighthouse of Faith", values: [480, 95, 15, 150, 70] },
  { church: "Covenant Life Church", values: [600, 120, 35, 220, 80] },
];

const churchesHeaders = [
  "Session: FEB 2017 - JUN 2017",
  "All Days",
  "TUPM",
  "WAM",
  "TAM",
  "TPM",
];

const SessionOverview = () => {
  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="bg-white p-6 rounded-md shadow-sm overflow-x-auto">
          <DataTable
            headers={headers}
            rows={data}
            renderRow={(row, i) => (
              <TableRow key={i}>
                <TableCell>{row.label}</TableCell>
                {row.values.map((val, idx) => (
                  <TableCell key={idx}>{val}</TableCell>
                ))}
              </TableRow>
            )}
          />
        </div>

        {/* // CHURCHES TABLE */}

        <div className="bg-white p-6 rounded-md shadow-sm overflow-x-auto">
          <p className="text-base !text-[var(--primary-color)] cursor-pointer underline mb-3">
            Show / Hide Churches
          </p>
          <DataTable
            headers={churchesHeaders}
            rows={churchData}
            renderRow={(row, i) => (
              <TableRow key={i}>
                <TableCell>{row.church}</TableCell>
                {row.values.map((val, idx) => (
                  <TableCell key={idx}>{val}</TableCell>
                ))}
              </TableRow>
            )}
          />
        </div>
      </div>
    </>
  );
};

export default SessionOverview;
