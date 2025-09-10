"use client";

import React, { useEffect } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { DataTable } from "@/components/ui/DataTable";
import { getCurrentGroups } from "@/redux/slices/groupSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import Spinner from "../../loader/Spinner";

const headers = ["#", "TUPM", "WAM", "TAM", "TPM"];

const CurrentGroupTable = () => {
  const { groups, loading, error } = useAppSelector(
    (state: any) => state.groups
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCurrentGroups());
  }, [dispatch]);

  // Helper: Get styled name cell
  const getNameWithStyles = (member: any) => {
    if (!member) return "—";

    const {
      firstName,
      lastName,
      mentorLead,
      mentorRelationship,
      isNewMember,
      isReturningMember,
      notes,
    } = member;

    const classes: string[] = [];
    const dotColor = [];

    // Dot logic
    if (mentorLead) {
      dotColor.push("bg-black");
    } else if (mentorRelationship && !mentorLead) {
      dotColor.push("bg-orange-500");
    } else if (isNewMember && !isReturningMember) {
      dotColor.push("bg-blue-800");
    } else if (isNewMember) {
      dotColor.push("bg-blue-400");
    } else if (mentorRelationship && isNewMember) {
      dotColor.push("bg-green-500");
    }

    // Bold name if mentorLead
    if (mentorLead) {
      classes.push("font-bold");
    }

    // Yellow background if notes
    if (notes) {
      classes.push("bg-yellow-100");
    }

    return (
      <div
        className={`flex items-center gap-2 px-2 py-1 rounded ${classes.join(
          " "
        )}`}
      >
        {dotColor.length > 0 && (
          <span
            className={`inline-block h-2.5 w-2.5 rounded-full ${dotColor[0]}`}
          />
        )}
        <span className="whitespace-nowrap">
          {firstName} {lastName}
        </span>
      </div>
    );
  };

  // Loading
  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Spinner />
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="text-center text-red-500 font-medium py-10">
        Error fetching groups. Please try again later.
      </div>
    );
  }

  // No data
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
        const sessions = group.sessions || {};

        const maxRows = Math.max(
          sessions.TUE_PM?.length || 0,
          sessions.WED_AM?.length || 0,
          sessions.THU_AM?.length || 0,
          sessions.THU_PM?.length || 0
        );

        const rows = Array.from({ length: maxRows }).map((_, i) => ({
          id: i + 1,
          tupm: getNameWithStyles(sessions.TUE_PM?.[i]),
          wam: getNameWithStyles(sessions.WED_AM?.[i]),
          tam: getNameWithStyles(sessions.THU_AM?.[i]),
          tpm: getNameWithStyles(sessions.THU_PM?.[i]),
        }));

        // Extract location from first member with address
        const allMembers = [
          ...(sessions.TUE_PM || []),
          ...(sessions.WED_AM || []),
          ...(sessions.THU_AM || []),
          ...(sessions.THU_PM || []),
        ];

        const memberWithAddress = allMembers.find(
          (m) =>
            m?.addressStreet ||
            m?.addressCity ||
            m?.addressState ||
            m?.addressZip
        );

        const location = memberWithAddress
          ? [
              memberWithAddress.addressStreet,
              memberWithAddress.addressCity,
              memberWithAddress.addressState,
              memberWithAddress.addressZip,
            ]
              .filter(Boolean)
              .join(", ")
          : "No address provided";

        return (
          <div
            key={`team-${index}`}
            className="flex rounded-md border bg-white p-5 shadow-sm"
          >
            {/* Left: Team label */}
            <div className="flex flex-col relative items-center justify-start rounded-md border min-w-[100px] h-[150px]">
              <span className="text-sm font-medium text-gray-500 bg-[#F5F5F5] w-full py-2 px-4 text-center">
                Team
              </span>
              <span className="text-5xl font-semibold text-gray-800 absolute inset-x-0 top-1/2 -translate-y-1/2 text-center">
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
                    <TableCell>{row.tupm}</TableCell>
                    <TableCell>{row.wam}</TableCell>
                    <TableCell>{row.tam}</TableCell>
                    <TableCell>{row.tpm}</TableCell>
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
