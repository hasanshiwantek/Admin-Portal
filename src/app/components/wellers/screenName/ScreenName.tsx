"use client";
import React, { useState, useEffect } from "react";
import ScreenNameStats from "./ScreenNameStats";
import SelectWeller from "./SelectWeller";
import WellerColumn from "./WellerColumn";
import { ChevronRight } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { getWellersByPG } from "@/redux/slices/groupSlice";
import Spinner from "../../loader/Spinner";

const ScreenName = () => {
  const dispatch = useAppDispatch();
  const { wellersByPG, pagination, loading, error } = useAppSelector(
    (state: any) => state.groups
  );
  console.log("Wellers By PG Response: ", wellersByPG);

  const data = wellersByPG?.data;
  const pgNumber = wellersByPG?.pg_number;
  const session = wellersByPG?.session;
  const totalWellers = wellersByPG?.total;
  const [day, setDay] = useState("tue");
  const [time, setTime] = useState("pm");
  const [pg, setPg] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState("20");

  useEffect(() => {
    if (pg && day && time) {
      dispatch(
        getWellersByPG({
          pg_number: pg,
          day,
          time,
          perPage,
          page: currentPage,
        })
      );
    }
  }, [pg, day, time, currentPage, perPage]); // 👈 FULL dependencies

  return (
    <div>
      <div className="text-lg flex justify-start items-center font-light p-4 text-gray-500">
        Home <ChevronRight className="h-5 w-6" />
        <span className="!font-light !text-[var(--primary-color)]">
          Screen name
        </span>
      </div>

      <div className="flex justify-between gap-10 mt-5">
        <SelectWeller
          onDayChange={(val) => {
            setDay(val);
            setCurrentPage(1); // 👈 reset page
          }}
          onPeriodChange={(val) => {
            setTime(val);
            setCurrentPage(1); // 👈 reset page
          }}
          onPgChange={(val) => {
            setPg(val);
            setCurrentPage(1); // 👈 reset page
          }}
          onSubmit={() => {
            dispatch(
              getWellersByPG({
                pg_number: pg,
                day,
                time,
                perPage,
                page: currentPage,
              })
            );
          }}
        />

        <ScreenNameStats />
      </div>
      <div className="my-5">
        {loading ? (
          <Spinner />
        ) : error ? (
          <div className="text-center text-red-600 font-medium">{error}</div>
        ) : !pg ? (
          <div className="bg-white text-gray-600 text-center py-20 rounded-md text-lg italic shadow-sm">
            Please select a
            <span className="font-semibold mx-2 text-gray-800">PG</span> to view
            the wellers list.
          </div>
        ) : (
          <WellerColumn
            data={data}
            pagination={pagination}
            onPageChange={setCurrentPage}
            perPageChange={setPerPage}
            totalWellers={totalWellers}
            session={session}
            pgNumber={pgNumber}
          />
        )}
      </div>
    </div>
  );
};

export default ScreenName;
