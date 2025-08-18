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
      <div className="flex items-start justify-between gap-3">
        <h2>View Wellers By Class</h2>

        <div className="flex  justify-start items-center gap-5">
          <div className="flex gap-2">
            <Button variant="outline" className="gap-1 p-6 w-[10rem]    text-lg">
              <Printer className="!w-5 !h-5" />
              Print Roaster
            </Button>
            <Button variant="outline" className="gap-1 p-6 w-[10rem]    text-lg">
              <Printer className="!w-5 !h-5" />
              Email Class
            </Button>
          </div>
        </div>
      </div>

      {/* Form controls */}
      <div className="mt-5 space-y-6">
        {/* PG Selector */}
        <div>
          <Label htmlFor="pg-select" className="block  mb-3">
            Select Class
          </Label>
          <Select defaultValue="disunity">
            <SelectTrigger id="pg-select" className="w-[20rem] rounded-md ">
              <SelectValue placeholder="Select PG" />
            </SelectTrigger>
            <SelectContent>
              {["Unity", "Disunity"].map((item) => (
                <SelectItem key={item} value={item.toLowerCase()}>
                  {item}
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
