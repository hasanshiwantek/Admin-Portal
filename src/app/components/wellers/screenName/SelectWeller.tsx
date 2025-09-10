"use client";

import React, { useEffect } from "react";
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
import { useAppDispatch } from "@/hooks/useReduxHooks";
import { printPgMembers } from "@/redux/slices/groupSlice";
type Props = {
  onDayChange: (day: string) => void;
  onPeriodChange: (period: string) => void;
  onPgChange: (pg: string) => void;
  onSubmit: () => void;
  day: any;
  time: any;
  pgNumber: any;
  data: any;
};

export default function SelectWeller({
  onDayChange,
  onPeriodChange,
  onPgChange,
  day,
  time,
  pgNumber,
  data,
  onSubmit,
}: Props) {
  const dispatch = useAppDispatch();

  return (
    <div className="bg-white p-5 rounded-md shadow-sm w-[50%]">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h2>Select Wellers By PG</h2>

        <div className="flex flex-col justify-start items-center gap-5">
          <Button
            variant="outline"
            className="gap-1 p-6 w-[18rem] text-lg"
            onClick={() => {
              if (!pgNumber) {
                alert("Please select a PG Number");
                return;
              }
              if (!day) {
                alert("Please select a day");
                return;
              }
              if (!time) {
                alert("Please select a period");
                return;
              }
              if (!data || data.length === 0) {
                alert("No wellers found to print");
                return;
              }

              const payload = {
                pg_number: pgNumber,
                session: `${day}_${time}`,
                users: data,
              };

              dispatch(printPgMembers({ data: payload }));
            }}
          >
            <Printer className="!w-5 !h-5" />
            Print PG
          </Button>
          <div className="flex justify-start items-center gap-5">
            <Button variant="outline" className="p-6 text-lg">
              Email PG
            </Button>
            <Button variant="outline" className="p-6 text-lg">
              B/UP PGL
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-5 space-y-6">
        {/* PG Selector */}
        <div>
          <Label htmlFor="pg-select" className="block mb-3">
            Select PG
          </Label>
          <Select onValueChange={onPgChange}>
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
        <div className="flex flex-col gap-4">
          <Label className="block mb-3">Select Day</Label>
          <DayTabs onDayChange={onDayChange} onPeriodChange={onPeriodChange} />
        </div>

        {/* Submit Button */}
        {/* <div>
          <button className="btn-primary w-full text-center" onClick={onSubmit}>
            View
          </button>
        </div> */}
      </div>
    </div>
  );
}
