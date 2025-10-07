"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Pill = {
  label: string;
  note?: string;
  variant?: "default" | "bold" | "yellow";
  dot?: "blue" | "darkBlue" | "pink";
};

const PILLS: Pill[] = [
  // { label: "BLUE", note: "New This Session", dot: "blue" },
  { label: "DARK BLUE", note: "First Time Weller", dot: "darkBlue" },
  // { label: "BOLD", note: "Group Leader", variant: "bold" },
  // { label: "PINK", note: "Backup PG Leader", dot: "pink" },
  { label: "YELLOW BACKGROUND", note: "Has Notes", variant: "yellow" },
  { label: "Bible Study Teacher" },
];

export default function WellersStats({ wellersByDay }: { wellersByDay: any }) {
  const stats = wellersByDay?.statistics || {};

  return (
    <section className="rounded-md bg-white p-5 shadow-sm w-[50%]">
      {/* Header */}
      <div className="flex flex-col space-y-4">
        <h2 className="">
          Total Active All Days: {stats.totalActiveAllDays ?? 0} | DD: {stats.dayDropped ?? 0} | TD: {stats.dayActive ?? 0}
        </h2>
        <span>
          Total Dropped: {stats.totalDropped ?? 0}, of which {stats.totalDroppedNew ?? 0} were new.
        </span>
      </div>

      {/* Legend pills */}
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {PILLS.map((p, i) => (
          <div
            key={i}
            className={cn(
              "flex items-center gap-2 rounded-md border px-3 py-2 text-sm",
              "bg-slate-100 border-slate-200 text-slate-700",
              p.variant === "yellow" &&
                "bg-yellow-100 border-yellow-200 text-slate-700",
              p.variant === "bold" && "font-semibold"
            )}
          >
            {p.dot && (
              <span
                className={cn(
                  "inline-block h-3 w-3 rounded-full",
                  p.dot === "blue" && "bg-blue-500",
                  p.dot === "darkBlue" && "bg-blue-800",
                  p.dot === "pink" && "bg-pink-500"
                )}
              />
            )}
            <span className="whitespace-nowrap">
              {p.label}
              {p.variant === "bold" && ":"}
            </span>
            {p.note && (
              <span
                className={cn(
                  "text-slate-500",
                  p.variant === "bold" && "font-normal"
                )}
              >
                – {p.note}
              </span>
            )}
          </div>
        ))}
      </div>

  
    </section>
  );
}
