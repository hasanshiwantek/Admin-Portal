import React from "react";
import WellerSearch from "@/app/components/wellers/quick-view/WellerSearch";
import WellerInfo from "@/app/components/wellers/quick-view/WellerInfo";
import { ChevronRight } from "lucide-react";
const QuickView = () => {
  return (
    <div>
      <div className="text-lg flex justify-start items-center font-light p-4 text-gray-500">
        Home <ChevronRight className="h-5 w-6" />
        <span className="!font-light !text-[var(--primary-color)]">
        Quick View
        </span>
      </div>

      <div className="flex justify-between gap-10 mt-5">
        <WellerSearch />
        <WellerInfo />
      </div>
    </div>
  );
};

export default QuickView;
