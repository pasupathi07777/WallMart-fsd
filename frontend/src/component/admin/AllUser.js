


import React, { useContext } from 'react'
import { ContextProvider } from '../../service/Context'
import adminIcon from '../../data/adminData'

const AllUser = () => {
  const { allUsers } = useContext(ContextProvider)
  function formatDateToYYYYMMDD(isoDate) {
    const date = new Date(isoDate);
    const year = date.getFullYear(isoDate);
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  return (
    <div className='p-[12px] flex flex-col gap-2  w-full min-h-screen '>
      <h1 className='font-bold text-[24px]'>Users List</h1>
      {
        allUsers.length ? (
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {allUsers.map((e, i) => (
              <div key={i} className="bg-gray-100 p-4 rounded-lg flex flex-col gap-2">
                <p className='font-semibold'>ID: <span className='font-normal'>{e._id}</span></p>
                <p className='font-semibold'>Name: <span className='font-normal'>{e.userName}</span></p>
                <p className='font-semibold'>Email: <span className='font-normal'>{e.gmail}</span></p>
                <p className='font-semibold'>Role: <span className='font-normal'>{e.admin ? "Admin" : "User"}</span></p>
                <p className='font-semibold'>Joined: <span className='font-normal'>{formatDateToYYYYMMDD(e.createdAt)}</span></p>
                <div className="flex gap-2 mt-2">
                  <button className="text-blue-500 hover:text-blue-700">{adminIcon.editIcon}</button>
                  <button className="text-red-500 hover:text-red-700">{adminIcon.deleteIcon}</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Users not found</p>
        )
      }
    </div>
  )
}

export default AllUser

