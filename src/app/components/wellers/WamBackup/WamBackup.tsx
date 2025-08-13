// app/components/BackupPgLeaders.tsx
"use client";

import React, { useState } from "react";
import { DayTabs } from "@/components/ui/DayTabs";
import { DataTable } from "@/components/ui/DataTable";
import { TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/ui/pagination";
type Leader = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

const LEADERS: Leader[] = [
  {
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    phone: "123-456-7890",
    address: "123 Maple St, Springfield",
  },
  {
    name: "Bob Smith",
    email: "bob.smith@example.com",
    phone: "234-567-8901",
    address: "456 Oak Ave, Metropolis",
  },
  {
    name: "Charlie Brown",
    email: "charlie.brown@example.com",
    phone: "345-678-9012",
    address: "789 Pine Rd, Gotham",
  },
  {
    name: "Diana Prince",
    email: "diana.prince@example.com",
    phone: "456-789-0123",
    address: "321 Cedar Blvd, Themyscira",
  },
  {
    name: "Edward Elric",
    email: "edward.elric@example.com",
    phone: "567-890-1234",
    address: "654 Birch Ln, Amestris",
  },
  {
    name: "Fiona Gallagher",
    email: "fiona.gallagher@example.com",
    phone: "678-901-2345",
    address: "987 Willow Dr, Chicago",
  },
  {
    name: "George Costanza",
    email: "george.costanza@example.com",
    phone: "789-012-3456",
    address: "159 Elm St, New York",
  },
  {
    name: "Hannah Baker",
    email: "hannah.baker@example.com",
    phone: "890-123-4567",
    address: "753 Chestnut Way, Los Angeles",
  },
  {
    name: "Ian Malcolm",
    email: "ian.malcolm@example.com",
    phone: "901-234-5678",
    address: "852 Spruce St, Isla Nublar",
  },
  {
    name: "Jack Sparrow",
    email: "jack.sparrow@example.com",
    phone: "012-345-6789",
    address: "999 Treasure Island, Caribbean",
  },
];

const HEADERS = ["Name", "Email", "Phone", "Address"];

export default function BackupPgLeaders() {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState("20");
  const totalPages = 10;

  const handleDayChange = (day: string) => console.log("Day changed:", day);
  const handlePeriodChange = (period: string) =>
    console.log("Period changed:", period);

  return (
    <div className="bg-white p-5 rounded-md shadow-sm space-y-5">
      <h2 className="text-lg font-semibold text-slate-800">
        WAM Backup PG Leaders
      </h2>

      {/* Day Selector */}
      <div>
        <p className="text-sm text-slate-600 mb-4">Select Day</p>
        <DayTabs
          onDayChange={handleDayChange}
          onPeriodChange={handlePeriodChange}
        />
      </div>

      {/* Table */}
      <DataTable
        headers={HEADERS}
        rows={LEADERS}
        renderRow={(leader, i) => (
          <TableRow key={i}>
            <TableCell>{leader.name}</TableCell>
            <TableCell>{leader.email}</TableCell>
            <TableCell>{leader.phone}</TableCell>
            <TableCell>{leader.address}</TableCell>
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
  );
}
