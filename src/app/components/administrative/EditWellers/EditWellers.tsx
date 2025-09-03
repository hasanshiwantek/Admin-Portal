"use client"
import React,{useState} from 'react'
import WellerInfo from './WellerInfo'
import SelectWeller from './SelectWeller'
const EditWellers = () => {
  const [selectedWeller, setSelectedWeller] = useState<any | null>(null);
  return (
    <>
    <div className="flex flex-col gap-5">
      <SelectWeller
        selectedWeller={selectedWeller}
        setSelectedWeller={setSelectedWeller}
      />
      <WellerInfo selectedWeller={selectedWeller} />
    </div>
    </>
  )
}

export default EditWellers