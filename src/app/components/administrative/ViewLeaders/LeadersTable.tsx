"use client";
import React, { useState } from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { DataTable } from "@/components/ui/DataTable";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
const leaders = [
  {
    pg: 1,
    leader: "John doe",
    location: "Downstairs, Storage Area",
  },
  {
    pg: 2,
    leader: "Jane Smith",
    location: "Upstairs, Living Room",
  },
  {
    pg: 3,
    leader: "Mike Johnson (Notes)",
    location: "Basement, Utility Room",
    hasNotes: true,
  },
  {
    pg: 4,
    leader: "Emily Davis",
    location: "Ground Floor, Kitchen",
  },
  {
    pg: 5,
    leader: "Chris Lee",
    location: "Second Floor, Bedroom",
  },
];

const headers = ["PG", "PG leader", "Location"];
const tabOptions = ["Groups", "Studies"];
const LeadersTable = () => {
  const [activeTab, setActiveTab] = useState("Groups"); // default tab
  const tabOptions = ["Groups", "Studies"];

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex gap-2">
        {tabOptions.map((tab) => (
          <Button
            key={tab}
            variant={activeTab === tab ? "default" : "outline"}
            onClick={() => setActiveTab(tab)}
            className={`!p-6 !text-lg ${
              activeTab === tab ? "btn-primary" : "btn-outline-primary"
            }`}
          >
            {tab}
          </Button>
        ))}
      </div>

      {/* Table View */}
      {activeTab === "Groups" ? (
        <div className="bg-white p-6 rounded-md shadow-sm">
          <DataTable
            headers={headers}
            rows={leaders}
            renderRow={(row, i) => (
              <TableRow key={i}>
                <TableCell>{row.pg}</TableCell>
                <TableCell
                  className={row.hasNotes ? "bg-yellow-100 font-medium" : ""}
                >
                  {row.leader}
                </TableCell>
                <TableCell>{row.location}</TableCell>
              </TableRow>
            )}
          />
        </div>
      ) : (
        <div className="bg-white p-6 rounded-md shadow-sm">
          <div>
            <span>Studies tab content goes here.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadersTable;
