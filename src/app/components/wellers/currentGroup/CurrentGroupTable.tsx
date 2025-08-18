"use client";

import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { DataTable } from "@/components/ui/DataTable";
// Legend styling logic
const getCellStyle = (name: string) => {
  const styleMap: { [key: string]: string } = {
    "Joshua Jones": "font-bold",
    "Stephanie Sharkey": "text-orange-500",
    "Judith Rodriguez": "text-green-600",
    "Chris Glasser": "text-orange-500",
    "Rodger Struck": "text-red-500",
    "Stephanie Nicol": "font-bold",
    "James Hall": "text-green-600",
    "Kurt Bates": "text-blue-500",
    "Daniel Hamilton": "text-blue-500",
    "Mary Freund": "text-blue-500",
    "Patricia Sanders (Notes)": "bg-yellow-100",
    "Kurt Bates (Notes)": "bg-yellow-100",
    "Megan Clark": "font-bold",
    "Olivia Graham": "text-red-500",
    "Samuel Ortiz": "text-green-600",
    "Larry Fisher": "font-bold",
    "Marlene Hayes": "text-orange-500",
    "Evelyn Rivera": "text-red-500",
    "Gregory Taylor": "font-bold",
    "Heather Long": "text-green-600",
    "Kimberly Mastrangelo": "font-bold",
    "Katie Sims": "text-blue-500",
    "Quentin Young": "text-red-500",
    "Justin Carter": "text-green-600",
  };

  return styleMap[name] || "";
};

// Table headers
const headers = ["#", "TUPM", "WAM", "TAM", "TPM"];

// Table data
const rows = [
  {
    id: 1,
    tupm: "Joshua Jones",
    wam: "Dennis Callis",
    tam: "Alex Buckmaster",
    tpm: "Patricia Sanders",
    where: "Upstairs, 1st Room on Right",
  },
  {
    id: 2,
    tupm: "Stephanie Sharkey",
    wam: "Ricky Smith",
    tam: "David Elson",
    tpm: "Paula Mora",
    where: "",
  },
  {
    id: 3,
    tupm: "Judith Rodriguez",
    wam: "Chris Glasser",
    tam: "Rodger Struck",
    tpm: "Lorri Wolf",
    where: "",
  },
  {
    id: 4,
    tupm: "Corinne McCoy",
    wam: "Kenneth Allen",
    tam: "Stephanie Nicol",
    tpm: "Rhonda Rhodes",
    where: "",
  },
  {
    id: 5,
    tupm: "Jerry Heffer",
    wam: "Iva Ryan",
    tam: "James Hall",
    tpm: "Bradley Lawlor",
    where: "",
  },
  {
    id: 6,
    tupm: "Kurt Bates",
    wam: "Kathy Pacheco",
    tam: "Autumn Phillips",
    tpm: "Kimberly Mastrangelo",
    where: "",
  },
  {
    id: 7,
    tupm: "John Dukes",
    wam: "Eddie Lake",
    tam: "Kathy Pacheco",
    tpm: "Katie Sims",
    where: "",
  },
  {
    id: 8,
    tupm: "Daniel Hamilton",
    wam: "Mary Freund",
    tam: "Corinne McCoy",
    tpm: "Chris Glasser",
    where: "",
  },
  {
    id: 9,
    tupm: "Katie Sims",
    wam: "Frances Swann",
    tam: "Daniel Hamilton",
    tpm: "Mary Freund",
    where: "",
  },
  {
    id: 10,
    tupm: "Alex Buckmaster",
    wam: "Frances Swann",
    tam: "Patricia Sanders (Notes)",
    tpm: "Kurt Bates (Notes)",
    where: "",
  },
  {
    id: 11,
    tupm: "Megan Clark",
    wam: "Howard Reed",
    tam: "Angelo Price",
    tpm: "Victor Horne",
    where: "",
  },
  {
    id: 12,
    tupm: "Olivia Graham",
    wam: "Larry Fisher",
    tam: "Jasmine Lee",
    tpm: "Tommy Bond",
    where: "",
  },
  {
    id: 13,
    tupm: "Samuel Ortiz",
    wam: "Marlene Hayes",
    tam: "Evelyn Rivera",
    tpm: "Quentin Young",
    where: "",
  },
  {
    id: 14,
    tupm: "Nathaniel Brooks",
    wam: "Wanda Wright",
    tam: "Gregory Taylor",
    tpm: "Natalie Stone",
    where: "",
  },
  {
    id: 15,
    tupm: "Samantha Green",
    wam: "Eugene Walker",
    tam: "Heather Long",
    tpm: "Justin Carter",
    where: "",
  },
];

const CurrentGroupTable = () => {
  return (
    <>
    
    <div className="flex rounded-md border bg-white p-5 shadow-sm">
      {/* Left Container */}
      <div className="flex flex-col relative items-center justify-start  rounded-md border">
        <span className="text-sm font-medium text-gray-500 mb-2 bg-[#F5F5F5] h-15 py-2 px-4">
          Team
        </span>
        <span className="!text-5xl absolute top-80 !font-semibold text-gray-800 p-5">1</span>
      </div>

      {/* Center Table */}
      <div className="flex-1 pl-6">
        <DataTable
          headers={headers}
          rows={rows}
          renderRow={(row, i) => (
            <TableRow key={i}>
              <TableCell className="text-muted-foreground font-medium">
                {row.id}
              </TableCell>
              <TableCell className={cn(getCellStyle(row.tupm))}>
                {row.tupm}
              </TableCell>
              <TableCell className={cn(getCellStyle(row.wam))}>
                {row.wam}
              </TableCell>
              <TableCell className={cn(getCellStyle(row.tam))}>
                {row.tam}
              </TableCell>
              <TableCell className={cn(getCellStyle(row.tpm))}>
                {row.tpm}
              </TableCell>
            </TableRow>
          )}
        />
      </div>
      {/* Right Container */}
      <div className="flex flex-col ml-5  rounded-md justify-start   border">
        <span className="text-sm font-medium text-gray-500 mb-2 bg-[#F5F5F5] h-15 py-2 px-4">
          Where
        </span>
        <span className="text-5xl font-semibold text-gray-800 p-5">
          Upstairs, 1st Room on Right
        </span>
      </div>
    </div>


    <div className="flex rounded-md border bg-white p-5 shadow-sm">
      {/* Left Container */}
      <div className="flex flex-col relative items-center justify-start  rounded-md border">
        <span className="text-sm font-medium text-gray-500 mb-2 bg-[#F5F5F5] h-15 py-2 px-4">
          Team
        </span>
        <span className="!text-5xl absolute top-80 !font-semibold text-gray-800 p-5">2</span>
      </div>

      {/* Center Table */}
      <div className="flex-1 pl-6">
        <DataTable
          headers={headers}
          rows={rows}
          renderRow={(row, i) => (
            <TableRow key={i}>
              <TableCell className="text-muted-foreground font-medium">
                {row.id}
              </TableCell>
              <TableCell className={cn(getCellStyle(row.tupm))}>
                {row.tupm}
              </TableCell>
              <TableCell className={cn(getCellStyle(row.wam))}>
                {row.wam}
              </TableCell>
              <TableCell className={cn(getCellStyle(row.tam))}>
                {row.tam}
              </TableCell>
              <TableCell className={cn(getCellStyle(row.tpm))}>
                {row.tpm}
              </TableCell>
            </TableRow>
          )}
        />
      </div>
      {/* Right Container */}
      <div className="flex flex-col ml-5  rounded-md justify-start   border">
        <span className="text-sm font-medium text-gray-500 mb-2 bg-[#F5F5F5] h-15 py-2 px-4">
          Where
        </span>
        <span className="text-5xl font-semibold text-gray-800 p-5">
          Upstairs, 1st Room on Right
        </span>
      </div>
    </div>
    </>
    
  );
};

export default CurrentGroupTable;
