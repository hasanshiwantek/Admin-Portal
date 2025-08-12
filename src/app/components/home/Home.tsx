import React from "react";
import SetupProgress from "./SetupProgress";
import Stats from "./Stats";
import OrderTable from "./OrderTable";
import StorePerformanceChart from "./StorePerfomance";
import UsersBreakdown from "./UsersBreakdown";
import PrayersGroup from "./PrayersGroup";

const Home = () => {
  return (
    <>
      <div className=" p-10  ">
        <div>
          <Stats />
        </div>
        <div className="flex justify-between  mt-10 gap-5">
          <UsersBreakdown active={1830} inactive={600} />
          <PrayersGroup />
        </div>

        {/* <SetupProgress /> */}
        {/* <StorePerformanceChart /> */}
        {/* <OrderTable/> */}
      </div>
    </>
  );
};

export default Home;
