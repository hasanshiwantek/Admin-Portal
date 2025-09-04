"use client";

import React, { useEffect } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { DataTable } from "@/components/ui/DataTable";
import { getCurrentGroups } from "@/redux/slices/groupSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import Spinner from "../../loader/Spinner";
const headers = ["#", "TUPM", "WAM", "TAM", "TPM"];
const sessionKeys = ["TUE_PM", "WED_AM", "THU_AM", "THU_PM"];

const CurrentGroupTable = () => {
  const { groups, loading, error } = useAppSelector(
    (state: any) => state.groups
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCurrentGroups());
  }, [dispatch]);

  // Loading spinner
  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Spinner />
      </div>
    );
  }

  // Error message
  if (error) {
    return (
      <div className="text-center text-red-500 font-medium py-10">
        Error fetching groups. Please try again later.
      </div>
    );
  }

  // Empty state
  if (!groups || groups.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No group data found.
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {groups.map((group: any, index: number) => {
        const teamLabel = group.team || `N/A`;
        const location = group.location || "No location set";

        // Determine max number of rows across the 4 sessions
        const maxRows = Math.max(
          group.sessions.TUE_PM?.length || 0,
          group.sessions.WED_AM?.length || 0,
          group.sessions.THU_AM?.length || 0,
          group.sessions.THU_PM?.length || 0
        );

        // Build rows
        const rows = Array.from({ length: maxRows }).map((_, i) => ({
          id: i + 1,
          tupm: group.sessions.TUE_PM?.[i]?.name || "",
          wam: group.sessions.WED_AM?.[i]?.name || "",
          tam: group.sessions.THU_AM?.[i]?.name || "",
          tpm: group.sessions.THU_PM?.[i]?.name || "",
        }));

        return (
          <div
            key={`team-${index}`}
            className="flex rounded-md border bg-white p-5 shadow-sm"
          >
            {/* Left: Team label */}
            <div className="flex flex-col relative items-center justify-start rounded-md border min-w-[100px]">
              <span className="text-sm font-medium text-gray-500 mb-2 bg-[#F5F5F5] w-full py-2 px-4 text-center">
                Team
              </span>
              <span className="text-5xl font-semibold text-gray-800 p-5 absolute top-24">
                {teamLabel}
              </span>
            </div>

            {/* Center: Data Table */}
            <div className="flex-1 pl-6">
              <DataTable
                headers={headers}
                rows={rows}
                renderRow={(row: any, i: number) => (
                  <TableRow key={i}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.tupm || "—"}</TableCell>
                    <TableCell>{row.wam || "—"}</TableCell>
                    <TableCell>{row.tam || "—"}</TableCell>
                    <TableCell>{row.tpm || "—"}</TableCell>
                  </TableRow>
                )}
              />
            </div>

            {/* Right: Location */}
            <div className="flex flex-col ml-5 rounded-md justify-start border min-w-[250px] max-w-[300px]">
              <span className="text-sm font-medium text-gray-500 mb-2 bg-[#F5F5F5] py-2 px-4">
                Where
              </span>
              <span className="text-md text-gray-800 p-5 leading-relaxed">
                {location}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CurrentGroupTable;
