import React from "react";
import ScreenNameStats from "./ScreenNameStats";
import SelectWeller from "./SelectWeller";
import WellerColumn from "./WellerColumn";
import { ChevronRight } from "lucide-react";
const ScreenName = () => {
  return (
    <>
      <div>
        <div className="text-lg flex justify-start items-center font-light p-4 text-gray-500">
          Home <ChevronRight className="h-5 w-6" />
          <span className="!font-light !text-[var(--primary-color)]">
            Screen name
          </span>
        </div>

        <div className="flex justify-between gap-10 mt-5">
          <SelectWeller />
          <ScreenNameStats />
        </div>
        <div className="my-5">
          <WellerColumn />
        </div>
      </div>
    </>
  );
};

export default ScreenName;
