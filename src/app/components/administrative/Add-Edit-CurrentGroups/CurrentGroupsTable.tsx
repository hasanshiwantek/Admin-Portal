"use client";
import React, { useState } from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { DataTable } from "@/components/ui/DataTable";
import { 
  Select, 
  SelectTrigger, 
  SelectValue, 
  SelectContent, 
  SelectItem 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const groups = [
  {
    groupStudy: "Discipleship",
    leader: "Kimberly Mastrangelo",
    location: "Online",
    moreInfo: "Upstairs, 1st room on right",
    duration: "Aug 23 - Aug 27",
  },
  {
    groupStudy: "Quite Prayer",
    leader: "John Doe",
    location: "Downstairs",
    moreInfo: "Storage Area",
    duration: "Sep 1 - Sep 5",
  },
  {
    groupStudy: "Revelation",
    leader: "Jane Smith",
    location: "Upstairs",
    moreInfo: "Living Room",
    duration: "Sep 10 - Sep 14",
  },
  {
    groupStudy: "Prayer",
    leader: "Mike Johnson",
    location: "Basement",
    moreInfo: "Utility Room",
    duration: "Sep 20 - Sep 25",
  },
  {
    groupStudy: "Fellowship",
    leader: "Emily Davis",
    location: "Ground Floor",
    moreInfo: "Kitchen",
    duration: "Oct 2 - Oct 6",
  },
];

const headers = ["Group Study", "Group Leader", "Location", "More Info", "Duration"];

const CurrentGroupsTable = () => {

  return (
    <div className="space-y-4">
      <div className="bg-white p-6 rounded-md shadow-sm">
        <DataTable
          headers={headers}
          rows={groups}
          renderRow={(row, i) => (
            <TableRow key={i}>
              <TableCell>
                <Select defaultValue={row.groupStudy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select group study" />
                  </SelectTrigger>
                  <SelectContent>
                    {groups.map(g => (
                      <SelectItem key={g.groupStudy} value={g.groupStudy}>
                        {g.groupStudy}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>

              <TableCell>
                <Select defaultValue={row.leader}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select group leader" />
                  </SelectTrigger>
                  <SelectContent>
                    {groups.map(g => (
                      <SelectItem key={g.leader} value={g.leader}>
                        {g.leader}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>

              <TableCell>
                <Select defaultValue={row.location}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select group leader" />
                  </SelectTrigger>
                  <SelectContent>
                    {groups.map(g => (
                      <SelectItem key={g.location} value={g.location}>
                        {g.location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>

              <TableCell>
                <Input 
                type="text"
                defaultValue={row.moreInfo}
                />
                </TableCell>
                <TableCell>
                <Input 
                type="text"
                defaultValue={row.duration}
                />
                </TableCell>
            </TableRow>
          )}
        />
      </div>
    </div>
  );
};

export default CurrentGroupsTable;
