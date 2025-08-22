import React from 'react'
import WellerInfo from './WellerInfo'
import SelectWeller from './SelectWeller'
const EditWellers = () => {
  return (
    <>
    <div className='flex flex-col gap-5'>
        <SelectWeller/>
        <WellerInfo/>
    </div>
    </>
  )
}

export default EditWellers