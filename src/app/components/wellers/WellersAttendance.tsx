"use client";

import * as React from "react";
import { CalendarDays, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type AttendanceItem = {
  date: string; // MM/DD/YYYY
  label: string; // Family/Group name
  value: number; // Main count
  cw: string; // CW as string (like '0')
};

export default function WellersAttendance({
  wellersByDay,
}: {
  wellersByDay: any;
}) {
  // ✅ Extracted and formatted attendanceSummary data
  const summaryData: AttendanceItem[] =
    wellersByDay?.attendanceSummary?.map((item: any) => {
      const dateObj = new Date(item.createdAt);
      const formattedDate = `${(dateObj.getMonth() + 1)
        .toString()
        .padStart(2, "0")}/${dateObj
        .getDate()
        .toString()
        .padStart(2, "0")}/${dateObj.getFullYear()}`;

      return {
        date: formattedDate,
        label: "Wellers:",
        value: item.wellers,
        cw: item.cw || "0",
      };
    }) || [];

  return (
    <section className="rounded-md bg-white p-5 shadow-sm w-[50%]">
      {/* Title row */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="">Attendance</h2>

        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-full border bg-white shadow-sm hover:bg-white"
          aria-label="Next"
        >
          <ChevronRight className="!h-6 !w-6" />
        </Button>
      </div>

      {/* Cards grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {summaryData.map((item, idx) => (
          <Card key={idx} className="rounded-lg border border-slate-200 p-0">
            {/* Date bar */}
            <div className="flex items-center gap-2 rounded-t-md bg-gray-100 px-3 py-2 text-sm font-semibold">
              <CalendarDays className="h-5 w-5" />
              <span>{item.date}</span>
            </div>

            <CardContent className="px-3 py-3">
              <div className="flex items-center justify-between leading-6">
                <span>{item.label}</span>
                <span>{item.value}</span>
              </div>
              <div className="flex items-center justify-between text-[15px] leading-6">
                <span>CW:</span>
                <span>{item.cw}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
