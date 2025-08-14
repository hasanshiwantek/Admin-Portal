import React from "react";
import VolunteerInfo from "@/app/components/wellers/volunteer-info/VolunteerInfo";
import { ChevronRight } from "lucide-react";
const page = () => {
  return (
    <>
        <div className="p-10">
          <div className="text-lg flex justify-start items-center font-light p-4 text-gray-500">
            Home <ChevronRight className="h-5 w-6" />
            <span className="!font-light !text-[var(--primary-color)]">
              Volunteer Info
            </span>
          </div>
          <VolunteerInfo />
        </div>
    </>
  );
};

export default page;
