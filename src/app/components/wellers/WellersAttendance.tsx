// app/components/WellersAttendance.tsx
"use client";

import * as React from "react";
import { CalendarDays, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type AttendanceItem = {
  date: string; // MM/DD/YYYY
  label: string; // Family/Group name
  value: number; // Main count
  cw: number; // CW count
};

const DATA: AttendanceItem[] = [
  { date: "02/08/2017", label: "Wellers:", value: 65, cw: 32 },
  { date: "03/15/2017", label: "Andersons:", value: 78, cw: 29 },
  { date: "04/22/2017", label: "Thomas:", value: 55, cw: 41 },
  { date: "05/30/2017", label: "Browns:", value: 90, cw: 38 },
  { date: "06/12/2017", label: "Smiths:", value: 80, cw: 35 },
  { date: "06/12/2017", label: "Smiths:", value: 80, cw: 35 },
];

export default function WellersAttendance() {
  return (
    <section className=" rounded-md bg-white p-5 shadow-sm w-[50%]">
      {/* Title row */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="">Attendance</h2>

        {/* right-edge round chevron (as in screenshot) */}
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
        {DATA.map((item, idx) => (
          <Card key={idx} className="rounded-lg border border-slate-200 p-0">
            {/* Date bar */}
            <div className="flex items-center gap-2 rounded-t-md bg-gray-100 px-3 py-2 text-sm font-semibold ">
              <CalendarDays className="h-5 w-5" />
              <span className="">{item.date}</span>
            </div>

            <CardContent className="px-3 py-3">
              {/* Stat rows */}
              <div className="flex items-center justify-between  leading-6">
                <span className="">{item.label}</span>
                <span className="">
                  {item.value}
                </span>
              </div>
              <div className="flex items-center justify-between text-[15px] leading-6">
                <span className="">CW:</span>
                <span className="lg">{item.cw}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
