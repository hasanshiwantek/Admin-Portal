"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Printer } from "lucide-react";
import { printPrayerGroups } from "@/redux/slices/groupSlice";
import { useAppDispatch } from "@/hooks/useReduxHooks";
type LegendItem = {
  label: string;
  note?: string;
  type?: "dot" | "bold" | "yellow";
  color?: "blue" | "darkBlue" | "pink" | "black" | "orange" | "green";
};

const LEGEND_ITEMS: LegendItem[] = [
  { label: "BOLD", note: "Group Leader", type: "dot", color: "black" },
  { label: "ORANGE", note: "2nd Time Group Leader", type: "dot", color: "orange" },
  { label: "Light Blue", note: "New This Session", type: "dot", color: "blue" },
  { label: "Bible Study Teacher" },
  { label: "GREEN", note: "New Group Leader", type: "dot", color: "green" },
  {
    label: "DARK BLUE",
    note: "First Time Weller",
    type: "dot",
    color: "darkBlue",
  },
  { label: "YELLOW BACKGROUND", note: "Has Notes", type: "yellow" },
];

const CurrentGroupInfo = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="flex justify-between items-center gap-5">
      <div className="bg-white p-5 rounded-md shadow-sm w-[50%] h-62">
        {/* Title + Action buttons */}
        <div className="flex flex-wrap items-start justify-between gap-3">
          <h2>Current Groups</h2>

          <div className="flex flex-col justify-start items-center gap-5">
            <div className="">
              <Button
                variant="outline"
                className="gap-1 p-6 w-[18rem]    text-lg"
                onClick={() => dispatch(printPrayerGroups())}
              >
                <Printer className="!w-5 !h-5" />
                Print Group
              </Button>
            </div>
            <div className="flex justify-start items-center gap-5">
              <Button variant="outline" className="p-6  text-lg">
                Email Group
              </Button>
              <Button variant="outline" className="p-6  text-lg">
                B/UP Group
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-5 rounded-md shadow-sm w-[50%] h-62">
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
                    item.color === "black" && "bg-black",
                    item.color === "orange" && "bg-orange-500",
                    item.color === "green" && "bg-green-500"
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
    </div>
  );
};

export default CurrentGroupInfo;
