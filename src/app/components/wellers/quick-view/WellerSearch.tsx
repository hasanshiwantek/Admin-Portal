"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
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

const WellerSearch = () => {
  return (
    <div className=" space-y-5">
      {/* Search Box */}
      <div className="bg-white p-6 rounded-md shadow-sm space-y-8 w-5xl">
        <h2>Existing / Former Weller Search</h2>
        <div>
          <Label className="block mb-2">Select Member</Label>
          <Select defaultValue="abby">
            <SelectTrigger className="w-[300px]">
              <SelectValue placeholder="Select member" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="abby">
                Abby Beita (abbybeita@me.com)
              </SelectItem>
              {/* Add more items as needed */}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Member Info */}
      <div className="bg-white p-6 rounded-md shadow-sm flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        {/* Avatar (optional) */}
        {/* <Avatar className="h-14 w-14">
          <AvatarImage src="" alt="Abby" />
          <AvatarFallback>AB</AvatarFallback>
        </Avatar> */}
        <div className="flex-1 space-y-5">
          <div className="flex items-center gap-4 border-b py-2">
            <div className=" rounded-full bg-indigo-600 ">
              <span className="!text-white !text-3xl p-4 !font-light">A</span>
            </div>
            <h2>Abby Beita</h2>
            <Badge
              variant="success"
              className="flex items-center gap-1 text-sm"
            >
              <CheckCircle2 className="h-5 w-5" /> Active
            </Badge>
          </div>
          <p className="text-sm flex items-center gap-2">
            <LocationEdit className="h-5 w-5" />
            7441 minnow brock way · Land O Lakes, FL 34637
          </p>
          <p className="text-sm flex items-center gap-2">
            <Phone className="h-5 w-5" /> (717) 645-6955
          </p>
          <p className="text-sm flex items-center gap-2">
            <Mail className="h-5 w-5" /> abbybeita@me.com
          </p>
          <p className="italic text-base mt-1">Grace Community</p>
        </div>
      </div>
      {/* Groups */}
      <div className="space-y-3 bg-white p-4 rounded-md">
        <h2 className="text-base font-semibold">Groups</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {[6, 8].map((groupNum, index) => (
            <div
              key={index}
              className="rounded-xl border shadow-xs border-gray-200 bg-white "
            >
              <div className="flex gap-4">
                {/* Left number badge */}
                <div className="flex w-20 items-start justify-center bg-gray-100/70">
                  <div className="text-3xl font-extrabold text-gray-800 p-2 m-auto">
                    #{groupNum}
                  </div>
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1 p-4">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Clock className="h-6 w-6 text-gray-600" />
                    <span className="truncate !text-gray-800">Tu AM</span>
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-gray-500">
                    <LocationEdit className="h-6 w-6 text-gray-600" />
                    <span className="truncate !text-gray-800">
                      Downstairs,Storage Area
                    </span>
                  </div>

                  <div className="mt-3 border-b border-gray-200" />

                  <div className="mt-3 text-base text-gray-800">
                    Group leader:
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full ">
                      <CircleUserRound className="h-8 w-8 text-[#008696]" />
                    </span>
                    <span className="!text-xl !font-semibold !text-gray-800">
                      John smith
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Studies */}
      <div className="space-y-3 bg-white p-4 rounded-md">
        <h2 className="text-base font-semibold">Studies</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {["Johns Letters", "Overcoming"].map((study, index) => (
            <div
              key={index}
              className=" shadow-sm rounded-md border space-y-2"
            >
              {/* Custom TU AM Label */}
              <div className="text-xs flex items-center gap-4 border px-2 py-3 font-medium text-gray-700  bg-gray-100 w-full">
                  <Clock className="h-6 w-6 text-gray-600" />
                  <span>
                TU AM
                  </span>
              </div>
              <p className="!font-medium  px-2 py-3 ">{study}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WellerSearch;
