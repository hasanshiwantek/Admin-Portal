"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator";
import {
  Mail,
  Phone,
  CheckCircle2,
  Users,
  LocationEdit,
  Clock,
  CircleUserRound,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { getAllWellers, getWellerById } from "@/redux/slices/wellerSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
const WellerSearch = ({
  selectedWeller,
  setSelectedWeller,
}: {
  selectedWeller: any;
  setSelectedWeller: (weller: any) => void;
}) => {
  const dispatch = useAppDispatch();
  const { wellers, error, loading } = useAppSelector(
    (state: any) => state.wellers
  );
  const wellersData = wellers?.data;
  console.log("....", selectedWeller);

  const formatSession = (sessionCode: string) => {
    if (!sessionCode) return "";

    const normalized = sessionCode.replace(/_/g, "").toUpperCase(); // "thu_pm" → "THUPM"

    const sessionMap: Record<string, string> = {
      MONAM: "Monday Morning",
      MONPM: "Monday Evening",
      TUEAM: "Tuesday Morning",
      TUEPM: "Tuesday Evening",
      WEDAM: "Wednesday Morning",
      WEDPM: "Wednesday Evening",
      THUAM: "Thursday Morning",
      THUPM: "Thursday Evening",
      TUAM: "Tuesday Morning", 
      TUPM: "Tuesday Evening", 
      TPM: "Thursday Evening",
      TAM: "Tuesday Morning",
      WAM: "Wednesday Morning",
    };

    return sessionMap[normalized] || sessionCode;
  };

  //  FETCH ALL WELLERS
  useEffect(() => {
    dispatch(getAllWellers());
  }, [dispatch]);

  return (
    <div className=" space-y-5">
      {/* Search Box */}
      <div className="bg-white p-6 rounded-md shadow-sm space-y-8 w-5xl">
        <h2>Existing / Former Weller Search</h2>
        <div>
          <Label className="block mb-2">Select Member</Label>
          <Select
            value={selectedWeller ? String(selectedWeller.id) : ""}
            onValueChange={(value) => {
              const found = wellersData.find(
                (w: any) => w.id === Number(value)
              );
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

      {/* Member Info */}
      {selectedWeller && (
        <div className="bg-white p-6 rounded-md shadow-sm flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="flex-1 space-y-5">
            <div className="flex items-center gap-4 border-b py-2">
              <div className="rounded-full bg-indigo-600">
                <span className="!text-white !text-3xl p-4 !font-light">
                  {selectedWeller.firstName?.charAt(0)}
                </span>
              </div>
              <h2>
                {selectedWeller.firstName} {selectedWeller.lastName}
              </h2>
              <Badge
                variant="success"
                className="flex items-center gap-1 text-sm"
              >
                <CheckCircle2 className="h-5 w-5" /> {selectedWeller.status}
              </Badge>
            </div>
            <p className="text-sm flex items-center gap-2">
              <LocationEdit className="h-5 w-5" />
              {selectedWeller.addressStreet} · {selectedWeller.addressCity},
              {selectedWeller.addressState} {selectedWeller.addressZip}
            </p>
            <p className="text-sm flex items-center gap-2">
              <Phone className="h-5 w-5" /> {selectedWeller.phone}
            </p>
            <p className="text-sm flex items-center gap-2">
              <Mail className="h-5 w-5" /> {selectedWeller.email}
            </p>
            <p className="italic text-base mt-1">{selectedWeller.homeChurch}</p>
          </div>
        </div>
      )}

      {/* Groups */}
      {selectedWeller?.prayerGroups?.length > 0 && (
        <div className="space-y-3 bg-white p-4 rounded-md ">
          <h2 className="text-base font-semibold">Groups</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 ">
            {selectedWeller.prayerGroups.map((pg: any, index: number) => (
              <div
                key={index}
                className="rounded-xl border shadow-xs border-gray-200 bg-white"
              >
                <div className="flex gap-4">
                  <div className="flex w-40 items-start justify-center bg-gray-100/70">
                    <div className="text-2xl font-extrabold text-gray-800 p-2 m-auto w-full">
                      {pg.pg_number}
                    </div>
                  </div>
                  <div className="min-w-0 flex-1 p-4">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Clock className="h-6 w-6 text-gray-600" />
                      <span className="truncate !text-gray-800">
                        {formatSession(pg.session)}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-gray-500">
                      <LocationEdit className="h-6 w-6 text-gray-600" />
                      <span className="truncate !text-gray-800">
                        {/* You may need to store location info if available */}
                        {pg.locationDescription || "No location info"}
                      </span>
                    </div>
                    <div className="mt-3 border-b border-gray-200" />
                    <div className="mt-3 text-base text-gray-800">
                      Group leader:
                    </div>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full">
                        <CircleUserRound className="h-8 w-8 text-[#008696]" />
                      </span>
                      <span className="!text-xl !font-semibold !text-gray-800">
                        {pg.is_leader
                          ? `${selectedWeller.firstName} ${selectedWeller.lastName}`
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Studies */}
      {selectedWeller?.bibleStudies?.length > 0 && (
        <div className="space-y-3 bg-white p-4 rounded-md">
          <h2 className="text-base font-semibold">Groups</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {selectedWeller.bibleStudies.map((study: any, index: number) => (
              <div
                key={index}
                className="shadow-sm rounded-md border space-y-2"
              >
                <div className="text-xs flex items-center gap-4 border px-2 py-3 font-medium text-gray-700 bg-gray-100 w-full">
                  <Clock className="h-6 w-6 text-gray-600" />
                  <span>{formatSession(study.session)}</span>
                </div>
                <p className="!font-medium px-2 py-3">{study.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WellerSearch;
