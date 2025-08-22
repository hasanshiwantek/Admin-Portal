import React from 'react'
import ViewLeadersTab from './ViewLeadersTab'
import LeadersTable from './LeadersTable'
const ViewLeadersPage = () => {
  return (
    <>
    <div className='flex flex-col gap-5'>
        <ViewLeadersTab/>
        <LeadersTable/>

    </div>
    </>
  )
}

export default ViewLeadersPage