// app/components/ScreenNameStats.tsx
"use client";

import React from "react";
import { cn } from "@/lib/utils";

type LegendItem = {
  label: string;
  note?: string;
  type?: "dot" | "bold" | "yellow";
  color?: "blue" | "darkBlue" | "pink" | "black";
};

const LEGEND_ITEMS: LegendItem[] = [
  { label: "BLUE", note: "New This Session", type: "dot", color: "blue" },
  {
    label: "DARK BLUE",
    note: "First Time Weller",
    type: "dot",
    color: "darkBlue",
  },
  { label: "GRAY BG", note: "Teacher", color: "black" },
  { label: "YELLOW BACKGROUND", note: "Has Notes", type: "yellow" },
  // { label: "Bible Study Teacher" },
];

export default function StudiesStats() {
  return (
    <div className="bg-white p-5 rounded-md shadow-sm w-[50%]">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {LEGEND_ITEMS.map((item, i) => (
          <div
            key={i}
            className={cn(
              "flex items-center gap-2 rounded-md px-3 py-2 text-sm",
              item.type === "yellow"
                ? "bg-yellow-100 text-slate-700"
                : "bg-slate-100 text-slate-700",
              item.type === "bold" && "font-semibold"
            )}
          >
            {/* Colored dot if applicable */}
            {item.type === "dot" && (
              <span
                className={cn(
                  "inline-block h-3 w-3 rounded-full",
                  item.color === "blue" && "bg-blue-400",
                  item.color === "darkBlue" && "bg-blue-800",
                  item.color === "pink" && "bg-pink-500",
                  item.color === "black" && "bg-black"
                )}
              />
            )}

            {/* Label + Note */}
            <a className="whitespace-nowrap">
              {item.type === "bold" ? (
                <span className="font-bold">{item.label}</span>
              ) : (
                item.label
              )}
              {item.note && (
                <span className="ml-1 text-slate-600">– {item.note}</span>
              )}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
