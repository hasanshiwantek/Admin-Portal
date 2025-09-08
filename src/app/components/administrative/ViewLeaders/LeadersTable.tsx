"use client";
import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { DataTable } from "@/components/ui/DataTable";
import { Button } from "@/components/ui/button";

const headers = ["PG", "PG leader", "Location"];
const bibleStudiesHeaders = ["Bible Study", "Teacher", "Location"];

const LeadersTable = ({
  data,
  tab,
  setTab,
}: {
  data: any;
  tab: string;
  setTab: (val: string) => void;
}) => {
  const tabOptions = ["prayer_groups", "bible_studies"];

  return (
    <div className="space-y-4">
      {/* Tab Switcher */}
      <div className="flex gap-2">
        {tabOptions.map((t) => (
          <Button
            key={t}
            variant={tab === t ? "default" : "outline"}
            onClick={() => setTab(t)}
            className={`!p-6 !text-lg ${
              tab === t ? "btn-primary" : "btn-outline-primary"
            }`}
          >
            {t === "prayer_groups" ? "Groups" : "Studies"}
          </Button>
        ))}
      </div>

      {/* Table Content */}
      {tab === "prayer_groups" ? (
        <div className="bg-white p-6 rounded-md shadow-sm">
          <DataTable
            headers={headers}
            rows={data?.prayer_groups || []}
            renderRow={(row: any, i: number) => (
              <TableRow key={i}>
                <TableCell>{row.pgNumber}</TableCell>
                <TableCell
                  className={row.notes ? "bg-yellow-100 font-medium" : ""}
                >
                  {row.name}
                </TableCell>
                <TableCell>{row.location}</TableCell>
              </TableRow>
            )}
          />
        </div>
      ) : (
        <div className="bg-white p-6 rounded-md shadow-sm">
          <DataTable
            headers={bibleStudiesHeaders}
            rows={data?.bible_studies || []}
            renderRow={(row: any, i: number) => (
              <TableRow key={i}>
                <TableCell>{row.bible_study}</TableCell>
                <TableCell>{row.teacher}</TableCell>
                <TableCell>{row.location}</TableCell>
              </TableRow>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default LeadersTable;
