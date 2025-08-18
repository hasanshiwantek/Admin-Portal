import React from "react";
import WellerColumn from "./WellerColumn";
import { ChevronRight } from "lucide-react";
import StudiesStats from "./StudiesStats";
import ViewWellersClass from "./ViewWellersClass";

const Studies = () => {
  return (
    <>
      <div>
        <div className="text-lg flex justify-start items-center font-light p-4 text-gray-500">
          Home <ChevronRight className="h-5 w-6" />
          <span className="!font-light !text-[var(--primary-color)]">
            Studies
          </span>
        </div>

        <div className="flex justify-between gap-10 mt-5">
          <ViewWellersClass />
          <StudiesStats />
        </div>
        <div className="my-5">
          <WellerColumn />
        </div>
      </div>
    </>
  );
};

export default Studies;
