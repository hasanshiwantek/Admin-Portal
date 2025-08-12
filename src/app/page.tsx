// import { redirect } from 'next/navigation';

// export default function Page() {
//   redirect('/login');
// }


import React from "react";
// import SetupProgress from "./SetupProgress";
import SetupProgress from "./components/home/SetupProgress";
// import Stats from "./Stats";
import Stats from "./components/home/Stats";
// import OrderTable from "./OrderTable";
import OrderTable from "./components/home/OrderTable";
// import UsersBreakdown from "./UsersBreakdown";
import UsersBreakdown from "./components/home/UsersBreakdown";
// import PrayersGroup from "./PrayersGroup";
import PrayersGroup from "./components/home/PrayersGroup";

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
