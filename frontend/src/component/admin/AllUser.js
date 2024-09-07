


// // import React, { useContext } from 'react'
// // import { ContextProvider } from '../../service/Context'
// // import adminIcon from '../../data/adminData'

// // const AllUser = () => {
// //   const { allUsers } = useContext(ContextProvider)
// //   function formatDateToYYYYMMDD(isoDate) {
// //     const date = new Date(isoDate);
// //     const year = date.getFullYear(isoDate);
// //     const month = String(date.getMonth() + 1).padStart(2, '0'); 
// //     const day = String(date.getDate()).padStart(2, '0');
// //     return `${year}-${month}-${day}`;
// //   }
// //   return (
// //     <div className='p-[12px] flex flex-col gap-2  w-full min-h-screen '>
// //       <h1 className='font-bold text-[24px]'>Users List</h1>
// //       {
// //         allUsers.length ? (
// //           <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
// //             {allUsers.map((e, i) => (
// //               <div key={i} className="bg-gray-100 p-4 rounded-lg flex flex-col gap-2">
// //                 <p className='font-semibold'>ID: <span className='font-normal'>{e._id}</span></p>
// //                 <p className='font-semibold'>Name: <span className='font-normal'>{e.userName}</span></p>
// //                 <p className='font-semibold'>Email: <span className='font-normal'>{e.gmail}</span></p>
// //                 <p className='font-semibold'>Role: <span className='font-normal'>{e.admin ? "Admin" : "User"}</span></p>
// //                 <p className='font-semibold'>Joined: <span className='font-normal'>{formatDateToYYYYMMDD(e.createdAt)}</span></p>
// //                 <div className="flex gap-2 mt-2">
// //                   <button className="text-blue-500 hover:text-blue-700">{adminIcon.editIcon}</button>
// //                   <button className="text-red-500 hover:text-red-700">{adminIcon.deleteIcon}</button>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         ) : (
// //           <p>Users not found</p>
// //         )
// //       }
// //     </div>
// //   )
// // }

// // export default AllUser




// import React, { useContext, useState } from 'react';
// import { ContextProvider } from '../../service/Context';
// import adminIcon from '../../data/adminData';
// import usePopUp from '../popup/PopUp';
// const AllUser = () => {
//   const { triggerPopUp } = usePopUp();
//   const { allUsers, updateUserRole } = useContext(ContextProvider); // Ensure updateUserRole is available in context
//   const [editingUser, setEditingUser] = useState(null);
//   const [role, setRole] = useState('admin');
//   const [dropdownVisible, setDropdownVisible] = useState(false);

//   function formatDateToYYYYMMDD(isoDate) {
//     const date = new Date(isoDate);
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0'); 
//     const day = String(date.getDate()).padStart(2, '0');
//     return `${year}-${month}-${day}`;
//   }

//   const handleEditClick = (user) => {
//     setEditingUser(user);
//     // setRole(user.admin ? 'Admin' : 'User');
//     setDropdownVisible(!dropdownVisible);
//   };

//   const handleRoleChange =async (newRole) => {
//    setRole(newRole)
//    setDropdownVisible(!dropdownVisible);
//    const responce=await updateUserRole(role)
//    if(responce){
//     triggerPopUp(true, 'Role Updated');
//    }
   
//   };

//   return (
//     <div className='p-[12px] flex flex-col gap-2 w-full min-h-screen'>
//       <h1 className='font-bold text-[24px]'>Users List</h1>
//       {allUsers.length ? (
//         <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//           {allUsers.map((e, i) => (
//             <div key={i} className="bg-gray-100 p-4 rounded-lg flex flex-col gap-2 relative">
//               <p className='font-semibold'>ID: <span className='font-normal'>{e._id}</span></p>
//               <p className='font-semibold'>Name: <span className='font-normal'>{e.userName}</span></p>
//               <p className='font-semibold'>Email: <span className='font-normal'>{e.gmail}</span></p>
//               <p className='font-semibold'>Role: <span className='font-normal'>{e.admin ? "Admin" : "User"}</span></p>
//               <p className='font-semibold'>Joined: <span className='font-normal'>{formatDateToYYYYMMDD(e.createdAt)}</span></p>
//               <div className="flex gap-2 mt-2">
//                 <button 
//                   className="text-blue-500 hover:text-blue-700"
//                   onClick={() => handleEditClick(e)}
//                 >
//                   {adminIcon.editIcon}
//                 </button>
//                 <button className="text-red-500 hover:text-red-700">
//                   {adminIcon.deleteIcon}
//                 </button>
//               </div>
//               {editingUser && editingUser._id === e._id && dropdownVisible && (
//                 <div className="absolute bg-white shadow-lg p-2 rounded mt-2 right-0">
//                   <button 
//                     className={`block w-full text-left p-2 hover:bg-gray-300 rounded ${role === 'Admin' ? 'bg-gray-200' : ''}`}
//                     onClick={() => handleRoleChange('Admin')}
//                   >
//                     Admin
//                   </button>
//                   <button 
//                     className={`block w-full text-left p-2 hover:bg-gray-300 rounded ${role === 'User' ? 'bg-gray-200' : ''}`}
//                     onClick={() => handleRoleChange('User')}
//                   >
//                     User
//                   </button>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>Users not found</p>
//       )}
//     </div>
//   );
// };

// export default AllUser;

import React, { useContext, useEffect, useState } from 'react';
import { ContextProvider } from '../../service/Context';
import adminIcon from '../../data/adminData';
import usePopUp from '../popup/PopUp';

const AllUser = () => {
  const { triggerPopUp } = usePopUp();
  const { allUsers, updateUserRole } = useContext(ContextProvider); // Ensure updateUserRole is available in context
  const [editingUser, setEditingUser] = useState(null);
  const [role, setRole] = useState(''); // Set to empty initially
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [loadind,setLoading]=useState(false)
  const [currentId,setCurrentId]=useState("")
  function formatDateToYYYYMMDD(isoDate) {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const handleEditClick = (user) => {
    setEditingUser(user);
    setCurrentId(user._id)
    setRole(user.admin ? 'Admin' : 'User');
    setDropdownVisible(!dropdownVisible);
  };

  const handleRoleChange = async (newRole) => {
    setDropdownVisible(false);
    setLoading(true)
    if (editingUser) {
      const updatedUser = { ...editingUser, admin: newRole === 'Admin' };
      const response = await updateUserRole(updatedUser); // Pass the updated user object
      // console.log(updatedUser)

      if (response) {
        triggerPopUp(true, 'Role Updated');
        setEditingUser(null); // Close dropdown and clear editing user
        setLoading(false)
      } else {
        triggerPopUp(false, 'Failed to update role');
        setLoading(false)
      }
    }
  };

  useEffect(()=>{
    console.log("up")

  },[allUsers])

  return (
    <div className='p-[12px] flex flex-col gap-2 w-full min-h-screen'>
      <h1 className='font-bold text-[24px]'>Users List</h1>
      {allUsers.length ? (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {allUsers.map((e, i) => (
            <div key={i} className="bg-gray-100 p-4 rounded-lg flex flex-col gap-2 relative">
              <p className='font-semibold'>ID: <span className='font-normal'>{e._id}</span></p>
              <p className='font-semibold'>Name: <span className='font-normal'>{e.userName}</span></p>
              <p className='font-semibold'>Email: <span className='font-normal'>{e.gmail}</span></p>
              <p className='font-semibold'>Role: <span className='font-normal'>{e.admin===true ? "Admin" : "User"}</span></p>
              <p className='font-semibold'>Joined: <span className='font-normal'>{formatDateToYYYYMMDD(e.createdAt)}</span></p>
              <div className="flex gap-2 mt-2">
                {loadind && currentId === e._id ? <p className='text-green-600'>Updating...</p>:
                <button 
                className="text-blue-500 hover:text-blue-700"
                onClick={() => handleEditClick(e)}
              >
                {adminIcon.editIcon}
              </button>}
                <button className="text-red-500 hover:text-red-700">
                  {adminIcon.deleteIcon}
                </button>
              </div>
              {editingUser && editingUser._id === e._id && dropdownVisible && (
                <div className="absolute bg-white shadow-lg p-2 rounded mt-2 right-0">
                  <button 
                    className={`block w-full text-left p-2 hover:bg-gray-300 rounded ${role === 'Admin' ? 'bg-gray-200' : ''}`}
                    onClick={() => handleRoleChange('Admin')}
                  >
                    Admin
                  </button>
                  <button 
                    className={`block w-full text-left p-2 hover:bg-gray-300 rounded ${role === 'User' ? 'bg-gray-200' : ''}`}
                    onClick={() => handleRoleChange('User')}
                  >
                    User
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>Users not found</p>
      )}
    </div>
  );
};

export default AllUser;
