"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { DayTabs } from "@/components/ui/DayTabs";

const CurrentGroupsTabs = () => {
  return (
    <div className="">
      {/* Left: Filter and Actions */}
      <div className="space-y-4 bg-white p-6 rounded-md shadow-sm">
        <div className="">
          <div>
            <h2>Add/Edit Current Groups</h2>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-gray-100 w-fit p-2 rounded-lg">
            <div className="w-3 h-3 rounded-full bg-black" />
            <span>BOLD – Group Leader</span>
          </div>
            <div className="flex items-center gap-2 bg-gray-100 w-fit p-2 rounded-lg">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span>GREEN – New PG Leader</span>
          </div>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium">Select Day</p>

          <div className="flex gap-2 flex-wrap">
            <DayTabs
              onDayChange={() => console.log("Day Clicked")}
              onPeriodChange={() => console.log("Period Clicked")}
            />
          </div>
        </div>
      </div>

    </div>
  );
};

export default CurrentGroupsTabs;
