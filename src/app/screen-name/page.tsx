import React from "react";
import ScreenName from "../components/wellers/screenName/ScreenName";
import LayoutWrapper from "../components/layout/LayoutWrapper";
const page = () => {
  return (
    <>
      <LayoutWrapper>
        <div className="p-10">
          <ScreenName />
        </div>
      </LayoutWrapper>
    </>
  );
};

export default page;
