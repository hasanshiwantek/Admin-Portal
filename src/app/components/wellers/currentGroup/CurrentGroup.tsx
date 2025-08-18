import React from "react";
import CurrentGroupInfo from "./CurrentGroupInfo";
import CurrentGroupTable from "./CurrentGroupTable";
const CurrentGroup = () => {
  return (
    <>
      <div className="flex flex-col gap-5">
        <CurrentGroupInfo />
        <CurrentGroupTable />
      </div>
    </>
  );
};

export default CurrentGroup;
