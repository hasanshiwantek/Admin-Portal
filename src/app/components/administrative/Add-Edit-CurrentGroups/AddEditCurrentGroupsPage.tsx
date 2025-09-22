"use client";
import React, { useEffect, useState } from "react";
import CurrentGroupsTabs from "./CurrentGroupsTabs";
import CurrentGroupsTable from "./CurrentGroupsTable";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { getEditPG } from "@/redux/slices/groupSlice";

const AddEditCurrentGroupsPage = () => {
  const dispatch = useAppDispatch();
  const { editPG, loading, error } = useAppSelector(
    (state: any) => state.groups
  );
  console.log("editPG From Frontend: ", editPG);

  const [selectedDay, setSelectedDay] = useState<"tue" | "wed" | "thu">("tue");
  const [selectedPeriod, setSelectedPeriod] = useState<"am" | "pm">("pm");

  useEffect(() => {
    dispatch(
      getEditPG({
        day: selectedDay,
        period: selectedPeriod,
      })
    );
  }, [dispatch, selectedDay, selectedPeriod]);

  return (
    <>
      <div className="flex flex-col gap-5">
        <CurrentGroupsTabs
          day={selectedDay}
          period={selectedPeriod}
          setSelectedDay={setSelectedDay}
          setSelectedPeriod={setSelectedPeriod}
        />
        <CurrentGroupsTable
          groupData={editPG}
          selectedDay={selectedDay}
          selectedPeriod={selectedPeriod}
          loading={loading}
          error={error}
        />
      </div>
    </>
  );
};

export default AddEditCurrentGroupsPage;
