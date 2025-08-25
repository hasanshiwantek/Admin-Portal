import React from 'react'
import CurrentGroupsTabs from './CurrentGroupsTabs'
import CurrentGroupsTable from './CurrentGroupsTable'

const AddEditCurrentGroupsPage = () => {
  return (
    <>
    <div className='flex flex-col gap-5'>
      <CurrentGroupsTabs />
      <CurrentGroupsTable />
    </div>
    </>
  )
}

export default AddEditCurrentGroupsPage