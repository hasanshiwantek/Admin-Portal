"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SelectWeller = () => {
  return (
    <div className="p-5 bg-white rounded-md shadow-sm  flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
      {/* Left Section */}
      <div className="flex flex-col gap-6 w-full md:w-2/3">
        <div className="space-y-5">
          <h2>Edit Wellers</h2>
          <div className="mt-2 space-y-2 ">
            <Label htmlFor="select-weller">Select weller</Label>
            <Select>
              <SelectTrigger className="w-full" id="select-weller">
                <SelectValue placeholder="Adrianna Davis (atcolema@gmail.com)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">
                  Adrianna Davis (atcolema@gmail.com)
                </SelectItem>
                <SelectItem value="2">John Doe (john@example.com)</SelectItem>
                <SelectItem value="3">Jane Smith (jane@example.com)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="id-tag">Add/Edit ID Tag</Label>
          <Input id="id-tag" placeholder="35986" className="w-full mt-2" />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-col gap-4 w-full md:w-1/3 md:items-end">
        <Button className="btn-primary !rounded-full !p-7">
          Update & Save weller
        </Button>
        <Button className="btn-outline-primary !rounded-full !p-7">
          Discrepancy check in
        </Button>
      </div>
    </div>
  );
};

export default SelectWeller;
