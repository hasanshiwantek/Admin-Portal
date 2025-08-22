import React from "react";
import { ChevronRight } from "lucide-react";
import ViewLeadersPage from "@/app/components/administrative/ViewLeaders/ViewLeadersPage";
const page = () => {
  return (
    <div className="p-10">
      <div className="text-lg flex justify-start items-center font-light p-4 text-gray-500">
        Home <ChevronRight className="h-5 w-6" />
        <span className="!font-light !text-[var(--primary-color)]">
          Studies
        </span>
      </div>
      <ViewLeadersPage />
    </div>
  );
};

export default page;
