"use client";

import React, { useEffect, useState } from "react";
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
import { getAllWellers } from "@/redux/slices/wellerSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
const SelectWeller = ({
  selectedWeller,
  setSelectedWeller,
  handleSubmitFromOutside,
  wellerId,
  setWellerId,
}: {
  selectedWeller: any;
  setSelectedWeller: (weller: any) => void;
  handleSubmitFromOutside: () => void;
  wellerId: any;
  setWellerId: any;
}) => {
  const dispatch = useAppDispatch();
  const { wellers, error, loading } = useAppSelector(
    (state: any) => state.wellers
  );
  const wellersData = wellers?.data;
  console.log("Wellers data from frontend: ", wellersData);
  console.log("....", selectedWeller);

  //  FETCH ALL WELLERS
  useEffect(() => {
    dispatch(getAllWellers());
  }, [dispatch]);

  return (
    <div className="p-5 bg-white rounded-md shadow-sm  flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
      {/* Left Section */}
      <div className="flex flex-col gap-6 w-full md:w-2/3">
        <div className="space-y-5">
          <h2>Edit Wellers</h2>
          <div className="mt-2 space-y-2 ">
            <Label htmlFor="select-weller">Select weller</Label>
            <Select
              value={selectedWeller ? String(selectedWeller.id) : ""}
              onValueChange={(value) => {
                const found = wellersData.find(
                  (w: any) => w.id === Number(value)
                );
                console.log("Found Id: ",found);
                
                setSelectedWeller(found);
              }}
            >
              <SelectTrigger className="w-full" id="select-weller">
                <span>
                  {selectedWeller
                    ? `${selectedWeller.firstName} ${selectedWeller.lastName}`
                    : "Select Weller"}
                </span>
              </SelectTrigger>

              <SelectContent>
                {wellersData?.map((weller: any) => (
                  <SelectItem key={weller.id} value={String(weller.id)}>
                    <div className="flex flex-col">
                      <span className="font-medium">
                        {weller.firstName} {weller.lastName}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {weller.email}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* <div>
          <Label htmlFor="id-tag">Add/Edit ID Tag</Label>
          <Input
            id="id-tag"
            placeholder="35986"
            className="w-full mt-2"
            value={wellerId || ""}
            onChange={(e) => setWellerId(e.target.value)}
          />
        </div> */}
      </div>

      {/* Right Section */}
      <div className="flex flex-col gap-4 w-full md:w-1/3 md:items-end">
        <Button
          className="btn-primary !rounded-full !p-7"
          onClick={handleSubmitFromOutside}
        >
          Update & Save weller
        </Button>
        {/* <Button className="btn-outline-primary !rounded-full !p-7">
          Discrepancy check in
        </Button> */}
      </div>
    </div>
  );
};

export default SelectWeller;
