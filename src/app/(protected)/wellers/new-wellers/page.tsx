import React from "react";
import NewWellers from "@/app/components/wellers/NewWellers/NewWellers";
import { ChevronRight } from "lucide-react";
const page = () => {
  return (
    <>
      <div className="p-10">
        <div className="text-lg flex justify-start items-center font-light p-4 text-gray-500">
          Home <ChevronRight className="h-5 w-6" />
          <span className="!font-light !text-[var(--primary-color)]">
            Screen name
          </span>
        </div>
        <NewWellers />
      </div>
    </>
  );
};

export default page;
