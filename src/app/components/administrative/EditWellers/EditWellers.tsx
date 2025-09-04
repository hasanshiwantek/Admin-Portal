"use client"
import React,{useState} from 'react'
import WellerInfo from './WellerInfo'
import SelectWeller from './SelectWeller'
import Spinner from "../../loader/Spinner";
const EditWellers = () => {
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
    <>
    <div className="flex flex-col gap-5">
      <SelectWeller
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
    </>
  )
}

export default EditWellers