"use client";
import React, { useState } from "react";
import WellerSearch from "@/app/components/wellers/quick-view/WellerSearch";
import WellerInfo from "@/app/components/wellers/quick-view/WellerInfo";
import { ChevronRight } from "lucide-react";
import Spinner from "../../loader/Spinner";
const QuickView = () => {
  const [selectedWeller, setSelectedWeller] = useState<any | null>(null);
  const [loadingWeller, setLoadingWeller] = useState(false);
  const handleWellerSelect = (weller: any) => {
    setLoadingWeller(true);
    // Simulate slight loading delay
    setTimeout(() => {
      setSelectedWeller(weller);
      setLoadingWeller(false);
    }, 500); // 0.5s delay
  };
  return (
    <div>
      <div className="text-lg flex justify-start items-center font-light p-4 text-gray-500">
        Home <ChevronRight className="h-5 w-6" />
        <span className="!font-light !text-[var(--primary-color)]">
          Quick View
        </span>
      </div>

      <div className="flex justify-between gap-10 mt-5">
        <WellerSearch
          selectedWeller={selectedWeller}
          setSelectedWeller={handleWellerSelect}
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
            />
          ) : (
            <div className="text-gray-500 text-center mt-10">
              Select a weller to view their details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuickView;
