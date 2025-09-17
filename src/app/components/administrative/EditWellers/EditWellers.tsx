"use client";
import React, { useState, useRef } from "react";
import WellerInfo from "./WellerInfo";
import SelectWeller from "./SelectWeller";
import Spinner from "../../loader/Spinner";
const EditWellers = () => {
  const [selectedWeller, setSelectedWeller] = useState<any | null>(null);
  const [loadingWeller, setLoadingWeller] = useState(false);
  const formRef = useRef<HTMLFormElement | any>(null);
  const [wellerId, setWellerId] = useState<any>("");

  const handleWellerSelect = (weller: any) => {
    setLoadingWeller(true);
    // Simulate slight loading delay
    setTimeout(() => {
      setSelectedWeller(weller);
      setWellerId(weller.id);
      setLoadingWeller(false);
    }, 500); // 0.5s delay
  };

  const handleTriggerSubmit = () => {
    if (formRef.current) {
      formRef.current.requestSubmit(); // 👈 Trigger native form submit
    }
  };
  return (
    <>
      <div className="flex flex-col gap-5">
        <SelectWeller
          selectedWeller={selectedWeller}
          setSelectedWeller={handleWellerSelect}
          handleSubmitFromOutside={handleTriggerSubmit}
          wellerId={wellerId}
          setWellerId={setWellerId}
        />
        <div className="flex-1">
          {loadingWeller ? (
            <div className="flex justify-center items-center h-[300px]">
              <Spinner />
            </div>
          ) : selectedWeller ? (
            <WellerInfo
              selectedWeller={selectedWeller}
              setSelectedWeller={setSelectedWeller}
              formRef={formRef}
              updatedWellerId={wellerId}
            />
          ) : (
            <div className="text-gray-500 text-center mt-10">
              Select a weller to view their details.
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EditWellers;
