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

interface Props {
  currentClass: string;
  onClassChange: (val: string) => void;
  onDayChange: (day: string) => void;
  onPeriodChange: (period: string) => void;
  onSubmit: () => void; 
}

const ViewWellersClass: React.FC<Props> = ({
  currentClass,
  onClassChange,
  onDayChange,
  onPeriodChange,
  onSubmit,
}) => {
  const studies = [
    "Floater",
    "Boundaries",
    "Disciples Are Made",
    "Disunity",
    "God is Enough",
    "Johns Letters",
    "Overcoming",
    "Raising Kids",
  ];

  return (
    <div className="bg-white p-5 rounded-md shadow-sm w-[50%]">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <h2>View Wellers By Class</h2>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-1 p-6 w-[10rem] text-lg">
            <Printer className="!w-5 !h-5" />
            Print Roaster
          </Button>
          <Button variant="outline" className="gap-1 p-6 w-[10rem] text-lg">
            <Printer className="!w-5 !h-5" />
            Email Class
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-5 space-y-6">
        {/* Class Selector */}
        <div>
          <Label htmlFor="pg-select" className="block mb-3">
            Select Class
          </Label>
          <Select value={currentClass} onValueChange={onClassChange}>
            <SelectTrigger id="pg-select" className="w-[20rem] rounded-md">
              <SelectValue placeholder="Select PG" />
            </SelectTrigger>
            <SelectContent>
              {studies.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Day Tabs + Submit Button */}
        <div className="flex flex-col gap-5">
          <div>
            <Label className="block mb-3">Select Day</Label>
            <DayTabs
              onDayChange={onDayChange}
              onPeriodChange={onPeriodChange}
            />
          </div>
            <div>
              <Button className="btn-primary !p-6 !w-full " onClick={onSubmit}>
                View Wellers by class
              </Button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ViewWellersClass;
