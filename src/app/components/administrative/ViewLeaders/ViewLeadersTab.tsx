"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { DayTabs } from "@/components/ui/DayTabs";

const ViewLeadersTab = ({
  onDayChange,
  onPeriodChange,
}: {
  onDayChange: (val: string) => void;
  onPeriodChange: (val: string) => void;
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Left: Filters and Actions */}
      <div className="space-y-4 bg-white p-6 rounded-md shadow-sm">
        <div className="flex justify-between items-center">
          <h2>View Leaders By Day</h2>

          <div className="flex items-center gap-2">
            <Button variant="outline" className="p-6 text-lg">
              Email All PGLs
            </Button>
            <Button variant="outline" className="p-6 text-lg">
              Email TUPM PGLs
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-5 space-y-2">
          <p className="text-sm font-medium">Select Day</p>

          <div className="flex gap-2 flex-wrap">
            <DayTabs onDayChange={onDayChange} onPeriodChange={onPeriodChange} />
          </div>
        </div>
      </div>

      {/* Right: Notes Info */}
      <div className="bg-white p-6 rounded-md shadow-sm">
        <div className="bg-yellow-100 text-yellow-900 px-4 py-2 rounded-md text-lg font-medium h-fit">
          YELLOW BACKGROUND - Weller has notes attached to name.
        </div>
      </div>
    </div>
  );
};

export default ViewLeadersTab;
