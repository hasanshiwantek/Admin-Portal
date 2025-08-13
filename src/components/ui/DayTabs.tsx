// app/components/DayTabs.tsx
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

type Day = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";
type Period = "AM" | "PM";

interface DayTabsProps {
  onDayChange: (day: Day) => void;
  onPeriodChange: (period: Period) => void;
  defaultDay?: Day;
  defaultPeriod?: Period;
}

const days: { label: string; value: Day }[] = [
  { label: "Mon", value: "mon" },
  { label: "Tue", value: "tue" },
  { label: "Wed", value: "wed" },
  { label: "Thu", value: "thu" },
  { label: "Fri", value: "fri" },
  { label: "Sat", value: "sat" },
  { label: "Sun", value: "sun" },
];

export const DayTabs: React.FC<DayTabsProps> = ({
  onDayChange,
  onPeriodChange,
  defaultDay = "mon",
  defaultPeriod = "AM",
}) => {
  const [day, setDay] = React.useState<Day>(defaultDay);
  const [period, setPeriod] = React.useState<Period>(defaultPeriod);

  const handleDayClick = (d: Day) => {
    setDay(d);
    onDayChange(d);
  };

  const handlePeriodChange = (p: Period) => {
    setPeriod(p);
    onPeriodChange(p);
  };

  return (
    <div className="flex flex-wrap items-center gap-3 justify-start">
      {/* AM/PM Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild >
          <Button
            variant="outline"
            className="h-9 rounded-md border-slate-300 bg-white text-gray-800 p-6 text-lg"
          >
            {period} <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => handlePeriodChange("AM")}>AM</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handlePeriodChange("PM")}>PM</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Days of the week */}
      <div className="flex flex-wrap gap-2">
        {days.map((d) => (
          <Button
            key={d.value}
            onClick={() => handleDayClick(d.value)}
            variant={d.value === day ? "default" : "secondary"}
            className={cn(
              "rounded-md bg-[var(--primary-color)] border text-white p-6 text-lg hover:text-[var(--primary-color)] hover:bg-white hover:border",
              d.value !== day && "bg-slate-100 text-gray-800"
            )}
          >
            {d.label}
          </Button>
        ))}
      </div>
    </div>
  );
};
