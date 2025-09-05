"use client";
import React, { useEffect, useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { DataTable } from "@/components/ui/DataTable";
import {
  getSessionSummary,
  getChurchSummary,
} from "@/redux/slices/wellerSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import Spinner from "../../loader/Spinner";

const labelMap = [
  { key: "totalAttendees", label: "Total # of Attendees this Session" },
  { key: "activeAtStart", label: "Total # Active Attendees at Start" },
  { key: "activeAtFinish", label: "Total # Active Attendees at Finish" },
  { key: "doubleDippers", label: "Total # Double Dippers" },
  { key: "firstTimers", label: "Total # 1st Timers" },
  { key: "returnees", label: "Total # Returnees" },
  { key: "guests", label: "Total # Guests" },
  { key: "drops", label: "Total # of Drops" },
  { key: "attrition", label: "% Attrition of Total" },
  { key: "netGain", label: "% Net Gain" },
  { key: "dropsFirstTimers", label: "Total # of Drops that were 1st Timers" },
  { key: "attritionFirstTimers", label: "% Attrition of 1st Timers" },
  { key: "avgMorning", label: "Average Morning Attendance" },
  { key: "avgEvening", label: "Average Evening Attendance" },
  { key: "churches", label: "# of Churches" },
  { key: "projectedGrowth", label: "Projected Growth" },
];

const churchKeys = ["allDays", "tupm", "wam", "tam", "tpm"];
const churchSessionKeys = ["All Days", "TUPM", "WAM", "TAM", "TPM"];

const SessionOverview = () => {
  // SESSION SUMMARY DATA
  const { sessionSummary, loading, error } = useAppSelector(
    (state: any) => state.wellers
  );
  console.log("Session Summary: ", sessionSummary);

  const yearSum = Object.keys(sessionSummary || {})[0]; // e.g. "2025"

  const yearSummary = sessionSummary?.[yearSum] || {};
  const sessionKeys = [
    "All Days",
    ...Object.keys(yearSummary).filter((key) => key !== "All Days"),
  ];
  const headers = [`Session ${yearSum}`, ...sessionKeys];
  const data = labelMap.map(({ key, label }) => {
    const values = sessionKeys.map((session) => {
      const sessionData = yearSummary?.[session] || {};
      const val = sessionData[key];
      return val === undefined || val === null || val === "" ? "-" : val;
    });

    return { label, values };
  });

  // CHURCH SUMMARY DATA
  const { churchSummary } = useAppSelector((state: any) => state.wellers);
  console.log("Church Summary: ", churchSummary);

  const year = Object.keys(churchSummary || {})[0];
  const churchesHeaders = [
    `Session ${year}`,
    ...churchSessionKeys.map((s) => s.toUpperCase()),
  ];
  const churchData: { church: any; values: any[] }[] = Array.isArray(
    churchSummary?.[year]
  )
    ? churchSummary[year].map((church: any) => ({
        church: church.church,
        values: churchKeys.map((key) =>
          church[key] !== null && church[key] !== undefined ? church[key] : "-"
        ),
      }))
    : [];

  // SHOW HIDE CHURCH LOGIC
  const [showChurch, setShowChurch] = useState(false);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getSessionSummary());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getChurchSummary());
  }, [dispatch]);

  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="bg-white p-6 rounded-md shadow-sm overflow-x-auto">
          {loading ? (
            <div className="py-8 text-center">
              <Spinner />
            </div>
          ) : error ? (
            <div className="py-6 text-center text-red-500">
              ⚠️ {String(error)}
            </div>
          ) : (
            <DataTable
              headers={headers}
              rows={data}
              renderRow={(row, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{row.label}</TableCell>
                  {row.values.map((val, idx) => (
                    <TableCell key={idx}>{val}</TableCell>
                  ))}
                </TableRow>
              )}
            />
          )}
        </div>

        {/* // CHURCHES TABLE */}

        <div className="bg-white p-6 rounded-md shadow-sm overflow-x-auto">
          <p
            className="text-base !text-[var(--primary-color)] cursor-pointer underline mb-3"
            onClick={() => setShowChurch((prev) => !prev)}
          >
            Show / Hide Churches
          </p>

          {showChurch && (
            <>
              {loading ? (
                <div className="py-8 text-center">
                  <Spinner />
                </div>
              ) : error ? (
                <div className="py-6 text-center text-red-500">
                  ⚠️ {String(error)}
                </div>
              ) : (
                <DataTable
                  headers={churchesHeaders}
                  rows={churchData}
                  renderRow={(row: any, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">
                        {row.church}
                      </TableCell>
                      {row.values.map((val: any, idx: number) => (
                        <TableCell key={idx}>{val}</TableCell>
                      ))}
                    </TableRow>
                  )}
                />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SessionOverview;
