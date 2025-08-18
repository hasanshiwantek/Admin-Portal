// app/components/SelectWeller.tsx
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DayTabs } from "@/components/ui/DayTabs";
import { Printer } from "lucide-react";

export default function ViewWellersClass() {
  const handleDayChange = (day: string) => console.log("Day:", day);
  const handlePeriodChange = (period: string) => console.log("Period:", period);

  return (
    <div className="bg-white p-5 rounded-md shadow-sm w-[50%]">
      {/* Title + Action buttons */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h2>Select Wellers By PG</h2>

        <div className="flex flex-col justify-start items-center gap-5">
          <div className="">
            <Button variant="outline" className="gap-1 p-6 w-[18rem]    text-lg">
              <Printer className="!w-5 !h-5" />
              Print PG
            </Button>
          </div>
          <div className="flex justify-start items-center gap-5">
            <Button variant="outline" className="p-6  text-lg">
              Email PG
            </Button>
            <Button variant="outline" className="p-6  text-lg">
              B/UP PGL
            </Button>
          </div>
        </div>
      </div>

      {/* Form controls */}
      <div className="mt-5 space-y-6">
        {/* PG Selector */}
        <div>
          <Label htmlFor="pg-select" className="block  mb-3">
            Select PG
          </Label>
          <Select defaultValue="1">
            <SelectTrigger id="pg-select" className="w-40">
              <SelectValue placeholder="Select PG" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Day Tabs */}
        <div>
          <Label className="block  mb-3">Select Day</Label>
          <DayTabs
            onDayChange={handleDayChange}
            onPeriodChange={handlePeriodChange}
          />
        </div>
      </div>
    </div>
  );
}
