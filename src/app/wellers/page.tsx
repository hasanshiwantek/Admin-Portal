import React from "react";
import ViewWellers from "@/app/components/wellers/ViewWellers";
import LayoutWrapper from "../components/layout/LayoutWrapper";
const page = () => {
  return (
    <>
      <LayoutWrapper>
        <div className="p-10">
          <ViewWellers />
        </div>
      </LayoutWrapper>
    </>
  );
};

export default page;
