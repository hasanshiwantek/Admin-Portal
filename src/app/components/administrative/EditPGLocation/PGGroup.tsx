import React from "react";
import PGGroupInfo from "./PGGroupInfo";
import PGGroupTable from "./PGGroupTable";

const PGGroup = () => {
  return (
    <>
      <div className="flex flex-col gap-5">
        <PGGroupInfo />
        <PGGroupTable />
      </div>
    </>
  );
};

export default PGGroup;
