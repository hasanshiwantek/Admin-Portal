"use client";

import React, { useState } from "react";
import { DayTabs } from "@/components/ui/DayTabs";
import { Button } from "@/components/ui/button";
import { TableRow, TableCell } from "@/components/ui/table";
import { DataTable } from "@/components/ui/DataTable";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import Pagination from "@/components/ui/pagination";
import BackupGreeters from "./BackupGreeters";
// Sample data with 3 volunteer slots
const VOLUNTEERS = [
  {
    date: "09-17-2017",
    slots: [
      { name: "Mary Friend", status: "confirmed" },
      { name: "Lori Pratt" },
    ],
  },
  {
    date: "09-17-2017",
    slots: [{ name: "Patricia Sandoval" }, { name: "Rodger Struck" }],
  },
  {
    date: "09-17-2017",
    slots: [
      { name: "Cathy Pratt (exc)" },
      { name: "Lynn Hicks", status: "confirmed" },
    ],
  },
  {
    date: "09-17-2017",
    slots: [
      { name: "Cynthia Childs", status: "declined" },
      { name: "Julie Friend", status: "declined" },
    ],
  },
  {
    date: "09-17-2017",
    slots: [
      { name: "Stephanie Wood", status: "declined" },
      { name: "Kathy Pratt", status: "confirmed" },
    ],
  },
  {
    date: "09-17-2017",
    slots: [
      { name: "Linda Green" },
      { name: "Calvin Ernst", status: "needs-response" },
    ],
  },
];

const getStatusClass = (status?: string) => {
  switch (status) {
    case "confirmed":
      return "bg-green-200";
    case "declined":
      return "bg-red-100 text-red-600";
    case "needs-response":
      return "text-red-500";
    default:
      return "";
  }
};

export default function VolunteerInfo() {
  const [activeTab, setActiveTab] = useState("Greeters");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState("20");
  const totalPages = 10;
  const handleDayChange = (day: string) => console.log("Day changed:", day);
  const handlePeriodChange = (period: string) =>
    console.log("Period changed:", period);

  return (
    <div>
      <div className="flex justify-between gap-5 space-y-6 ">
        {/* Day Selector */}
        <div className="bg-white p-5 rounded-md shadow-sm space-y-5 w-[50%] h-[22vh]">
          <Label className=" mb-1">Select Day</Label>
          <div className="mt-8">
            <DayTabs
              onDayChange={handleDayChange}
              onPeriodChange={handlePeriodChange}
            />
          </div>
        </div>

        {/* Legend */}
        <div className="bg-white p-5 rounded-md shadow-sm space-y-5 h-[22vh] w-[50%]">
          <div className="flex items-center gap-2 bg-gray-100 w-fit p-2 rounded-lg">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span>RED – Weller is Inactive</span>
          </div>
          <div className="flex items-center gap-2 bg-orange-100 w-fit p-2 rounded-lg">
            <div className="w-3 h-3 rounded-full bg-orange-200" />
            <span>DECLINED</span>
          </div>
          <div className="flex items-center gap-2 bg-green-100 w-fit p-2 rounded-lg">
            <div className="w-3 h-3 rounded-full bg-green-300" />
            <span>CONFIRMED</span>
          </div>
        </div>
      </div>

      <div className="bg-white p-5 rounded-md shadow-sm space-y-5">
        {/* Tab switcher */}
        <div className="flex gap-2">
          {["Greeters", "Snacks", "Devotion"].map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? "default" : "outline"}
              onClick={() => setActiveTab(tab)}
              className={`!p-6 !text-lg ${
                activeTab === tab ? "btn-primary" : "btn-outline-primary"
              } `}
            >
              {tab}
            </Button>
          ))}
        </div>

        {/* Table Title */}
        <h2>{`TUE PM ${activeTab}`}</h2>

        {/* Volunteer Table using reusable component */}
        <DataTable
          headers={["TUE_PM", "Name:", "Name:"]}
          rows={VOLUNTEERS}
          renderRow={(row, index) => (
            <TableRow key={index}>
              <TableCell>{row.date}</TableCell>
              {row.slots.map((slot, i) => (
                <TableCell key={i} className={cn(getStatusClass(slot.status))}>
                  {slot.name}
                </TableCell>
              ))}
            </TableRow>
          )}
        />
        {/* Pagination */}

        <div className="flex justify-end">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            perPage={perPage}
            onPerPageChange={setPerPage}
          />
        </div>
      </div>
      <div className="my-5">
        <BackupGreeters />
      </div>
    </div>
  );
}
