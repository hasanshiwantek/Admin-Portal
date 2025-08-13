import React from 'react'
import WellersAttendance from './WellersAttendance'
import WellersStats from './WellersStats'
import WellersTable from './WellersTable'
const ViewWellers = () => {
  return (
    <>
    <div>
        <div className='flex justify-between gap-10 mt-5'>
            <WellersAttendance/>
            <WellersStats/>
        </div>
        <div className='my-5'>
        <WellersTable/>
        </div>
    </div>
    </>
  )
}

export default ViewWellers