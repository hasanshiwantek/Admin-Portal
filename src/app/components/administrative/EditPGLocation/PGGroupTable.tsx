"use client";

import React, { useEffect, useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { DataTable } from "@/components/ui/DataTable";
import { getCurrentGroups } from "@/redux/slices/groupSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import Spinner from "../../loader/Spinner";
import { Loader2 } from "lucide-react";
import { saveNotesAndLocation } from "@/redux/slices/groupSlice";
const headers = ["#", "TUPM", "WAM", "TAM", "TPM"];

const PGGroupTable = () => {
  const { groups, loading, error } = useAppSelector(
    (state: any) => state.groups
  );
  const dispatch = useAppDispatch();

  const [locationInput, setLocationInput] = useState<string[]>([]);
  const [notesInput, setNotesInput] = useState<string[]>([]);
  const [saving, setSaving] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    dispatch(getCurrentGroups());
  }, [dispatch]);

  useEffect(() => {
    if (groups && groups.length > 0) {
      setLocationInput(groups.map(() => ""));
      setNotesInput(groups.map(() => ""));
    }
  }, [groups]);

  const autoSave = (
    pgNumber: string,
    location: string,
    notes: string,
    index: number
  ) => {
    setSaving((prev) => ({ ...prev, [index]: true }));

    // Debounce using setTimeout
    setTimeout(() => {
      const payload = {
        pgNumber,
        location: location || "",
        notes: notes || "",
      };

      console.log("Auto-saving payload:", payload);
      dispatch(saveNotesAndLocation({ data: payload })).finally(() => {
        setSaving((prev) => ({ ...prev, [index]: false }));
      });

      // Simulate API delay
      setTimeout(() => {
        setSaving((prev) => ({ ...prev, [index]: false }));
      }, 500); // fake 500ms API delay
    }, 500); // debounce delay
  };

  const handleLocationChange = (
    value: string,
    index: number,
    pgNumber: string
  ) => {
    const updated = [...locationInput];
    updated[index] = value;
    setLocationInput(updated);
    autoSave(pgNumber, value, notesInput[index] || "", index);
  };

  const handleNotesChange = (
    value: string,
    index: number,
    pgNumber: string
  ) => {
    const updated = [...notesInput];
    updated[index] = value;
    setNotesInput(updated);
    autoSave(pgNumber, locationInput[index] || "", value, index);
  };

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

    if (mentorLead) dotColor.push("bg-black");
    else if (mentorRelationship && !mentorLead) dotColor.push("bg-orange-500");
    else if (isNewMember && !isReturningMember) dotColor.push("bg-blue-800");
    else if (isNewMember) dotColor.push("bg-blue-400");
    else if (mentorRelationship && isNewMember) dotColor.push("bg-green-500");

    if (mentorLead) classes.push("font-bold");
    if (notes) classes.push("bg-yellow-100");

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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 font-medium py-10">
        Error fetching groups. Please try again later.
      </div>
    );
  }

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
        const pgNumber = group.pgNumber || `${index + 1}`; // Fallback
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

        return (
          <div
            key={`team-${index}`}
            className="flex rounded-md border bg-white p-5 shadow-sm"
          >
            {/* Left: Team Label */}
            <div className="flex flex-col relative items-center justify-start rounded-md border min-w-[100px] h-[150px]">
              <span className="text-sm font-medium text-gray-500 bg-[#F5F5F5] w-full py-2 px-4 text-center">
                Team
              </span>
              <span className="text-5xl font-semibold text-gray-800 absolute inset-x-0 top-1/2 -translate-y-1/2 text-center">
                {group.team || "N/A"}
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

            {/* Right: Editable Location + Notes */}
            <div className="flex p-4 flex-col ml-5 rounded-md justify-start border min-w-[250px] max-w-[300px]">
              <label className="text-lg font-medium text-gray-600 bg-[#F5F5F5] py-2 px-4 flex items-center gap-2">
                Where
                {saving[index] && (
                  <Loader2 className="animate-spin w-6 h-6 text-gray-700" />
                )}
              </label>

              <textarea
                className="text-lg text-gray-800 p-3 m-3 border rounded h-[80px]"
                value={locationInput[index] || ""}
                onChange={(e) =>
                  handleLocationChange(
                    e.target.value,
                    index,
                    String(group.team)
                  )
                }
                placeholder="Enter location"
              />
              <label className="text-lg font-medium text-gray-600 bg-[#F5F5F5] py-2 px-4 flex items-center gap-2">
                Notes
                {saving[index] && (
                  <Loader2 className="animate-spin w-6 h-6 text-gray-700" />
                )}
              </label>

              <textarea
                className="text-lg text-gray-800 p-3 m-3 border rounded h-[80px]"
                value={notesInput[index] || ""}
                onChange={(e) =>
                  handleNotesChange(e.target.value, index, String(group.team))
                }
                placeholder="Enter notes"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PGGroupTable;
