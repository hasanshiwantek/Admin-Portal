import QuickView from "@/app/components/wellers/quick-view/QuickView";
import React from "react";
import LayoutWrapper from "@/app/components/layout/LayoutWrapper";
const page = () => {
  return (
    <>
      <LayoutWrapper>
        <div className="p-10">
          <QuickView />
        </div>
      </LayoutWrapper>
    </>
  );
};

export default page;
