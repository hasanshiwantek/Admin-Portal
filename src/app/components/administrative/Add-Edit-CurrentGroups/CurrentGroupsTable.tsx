"use client";
import React, { useState, useEffect } from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { DataTable } from "@/components/ui/DataTable";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { updatePrayerGroup } from "@/redux/slices/groupSlice";
import Spinner from "../../loader/Spinner";
const headers = [
  "PG Number",
  "Group Study",
  "Group Leader",
  "Location",
  "More Info",
  "Duration",
  "Action",
];

interface CurrentGroupsTableProps {
  groupData: any;
  selectedDay?: "tue" | "wed" | "thu";
  selectedPeriod?: "am" | "pm";
  loading: boolean;
  error: any;
}

// ✅ Utility to normalize values
const normalize = (val: any) =>
  val && typeof val === "string" ? val.trim() : "N/A";

const CurrentGroupsTable = ({
  groupData,
  selectedDay,
  selectedPeriod,
  loading,
  error,
}: CurrentGroupsTableProps) => {
  const dispatch = useAppDispatch();
  const groups = groupData?.groups || [];

  // ✅ Group by pgNumber
  const groupedByPG = groups.reduce((acc: any, g: any) => {
    const pg = g.pgNumber || "N/A";
    if (!acc[pg]) acc[pg] = [];
    acc[pg].push(g);
    return acc;
  }, {});

  // 🔹 State as array instead of object
  const [formData, setFormData] = useState<any[]>([]);

  // ✅ Reinitialize state when groupData changes
  useEffect(() => {
    if (!groups.length) return;
    const initialData = Object.keys(groupedByPG).map((pgNumber: string) => {
      const pgGroup = groupedByPG[pgNumber];
      return {
        pgNumber: pgGroup[0]?.pgNumber || "N/A",
        bibleStudyName: normalize(pgGroup[0]?.bibleStudyName),
        leaderName: normalize(pgGroup[0]?.leaderName),
        location: normalize(pgGroup[0]?.location),
        notes: pgGroup[0]?.notes || "N/A",
        duration: pgGroup[0]?.duration || "N/A",
      };
    });
    setFormData(initialData);
  }, [groupData]);

  // ✅ Update field inside array
  const updateField = (pgNumber: string, field: string, value: string) => {
    setFormData((prev: any[]) => {
      const index = prev.findIndex((item) => item.pgNumber === pgNumber);

      if (index !== -1) {
        // update existing
        const updated = [...prev];
        updated[index] = {
          ...updated[index],
          [field]: value,
        };
        return updated;
      } else {
        // add new
        return [
          ...prev,
          {
            pgNumber,
            [field]: value,
          },
        ];
      }
    });
  };

  return (
    <div className="space-y-4">
      <div className="bg-white p-6 rounded-md shadow-sm">
        {loading ? (
          <div className="flex items-center justify-center">
            <Spinner />
          </div>
        ) : error ? (
          <p className="text-red-500 flex items-center justify-center font-semibold">
            Error: {error?.message || "Something went wrong!"}
          </p>
        ) : !groupData?.groups?.length ? (
          <p className="text-gray-500 flex items-center justify-center">
            No groups found.
          </p>
        ) : (
          <DataTable
            headers={headers}
            rows={Object.keys(groupedByPG)}
            renderRow={(pgNumber: string) => {
              const pgGroup = groupedByPG[pgNumber];
              const rowData = formData.find((f) => f.pgNumber === pgNumber);

              // unique dropdown options per PG
              const studies = [
                ...new Set(
                  pgGroup.map((g: any) => normalize(g.bibleStudyName))
                ),
              ];
              const leaders = [
                ...new Set(pgGroup.map((g: any) => normalize(g.leaderName))),
              ];
              const locations = [
                ...new Set(pgGroup.map((g: any) => normalize(g.location))),
              ];

              return (
                <TableRow key={pgNumber}>
                  {/* PG Number */}
                  <TableCell>{pgNumber}</TableCell>

                  {/* Group Study */}
                  <TableCell>
                    <Select
                      value={rowData?.bibleStudyName}
                      onValueChange={(val) =>
                        updateField(pgNumber, "bibleStudyName", val)
                      }
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select study" />
                      </SelectTrigger>
                      <SelectContent>
                        {studies.map((s: any, i) => (
                          <SelectItem key={i} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>

                  {/* Group Leader */}
                  <TableCell>
                    <Select
                      value={rowData?.leaderName}
                      onValueChange={(val) =>
                        updateField(pgNumber, "leaderName", val)
                      }
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select leader" />
                      </SelectTrigger>
                      <SelectContent>
                        {leaders.map((l: any, i) => (
                          <SelectItem key={i} value={l}>
                            {l}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>

                  {/* Location */}
                  <TableCell>
                    <Select
                      value={rowData?.location}
                      onValueChange={(val) =>
                        updateField(pgNumber, "location", val)
                      }
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        {locations.map((loc: any, i) => (
                          <SelectItem key={i} value={loc}>
                            {loc}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>

                  {/* More Info */}
                  <TableCell>
                    <Input
                      type="text"
                      value={rowData?.notes}
                      onChange={(e) =>
                        updateField(pgNumber, "notes", e.target.value)
                      }
                    />
                  </TableCell>

                  {/* Duration */}
                  <TableCell>
                    <Input
                      type="text"
                      value={rowData?.duration}
                      onChange={(e) =>
                        updateField(pgNumber, "duration", e.target.value)
                      }
                    />
                  </TableCell>

                  {/* Action */}
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      className="!p-4 text-lg"
                      onClick={() => {
                        dispatch(
                          updatePrayerGroup({
                            data: {
                              session: `${selectedDay}_${selectedPeriod}`,
                              groups: [rowData],
                            },
                          })
                        );
                      }}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              );
            }}
          />
        )}
      </div>
    </div>
  );
};

export default CurrentGroupsTable;
