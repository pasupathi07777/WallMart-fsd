// import React, { useContext } from 'react'
// import { ContextProvider } from '../../service/Context'
// import {Link, useNavigate} from  'react-router-dom'

// const UserProfile = () => {
//     const { loginUserDetails,logOut } = useContext(ContextProvider)
//     const navigate=useNavigate()





//     function formatDateToYYYYMMDD(isoDate) {
//         const date = new Date(isoDate);
//         const year = date.getFullYear(isoDate);
//         const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
//         const day = String(date.getDate()).padStart(2, '0');
//         return `${year}-${month}-${day}`;
//     }

//     // Converting dates
//     const readableCreatedAt = formatDateToYYYYMMDD(loginUserDetails.createdAt);
//     const readableUpdatedAt = formatDateToYYYYMMDD(loginUserDetails.updatedAt);


//     return (
//         <div className=" flex flex-col  justify-center items-center w-full h-full px-[12px] ">

//             <div className='flex flex-col gap-5 mx-auto w-full max-w-[500px] mt-[20px] sm:mt-[50px]  '>
//                 <h1 className='font-bold text-[32px] capitalize sm:text-center '>My Profile</h1>
//                 <div className="userName">
//                     <h1 className='text-[#808080] font-bold text-[20px] '>Full Name</h1>
//                     <p className='font-medium'>{loginUserDetails.userName}</p>

//                 </div>
//                 <div className="email">
//                     <h1 className='text-[#808080] font-bold text-[20px] '>Email Address</h1>
//                     <p className='font-medium'>{loginUserDetails.gmail}</p>

//                 </div>
//                 <div className="joinedAt">
//                     <h1 className='text-[#808080] font-bold text-[20px] '>Joined</h1>
//                     <p className='font-medium'>{readableCreatedAt}</p>

//                 </div>
//                 <div className=" flex flex-col gap-2">
//                     <button className='bg-[#0069D9] font-medium px-4 py-1  w-full rounded text-white'>My Order</button>
//                     {loginUserDetails.admin &&
//                     <Link to="/admin">
//                     <button className='bg-yellow-600 font-medium px-4 py-1  w-full rounded text-white'>Admin</button></Link>

//                     }
//                     <button className='bg-[#DC3545] font-medium px-4 py-1  w-full rounded text-white' onClick={()=>{logOut(false);navigate('/')}}>Logout</button>
                    

//                 </div>

//             </div>
//         </div>

//     )
// }

// export default UserProfile


import React, { useContext } from 'react';
import { ContextProvider } from '../../service/Context';
import { Link, useNavigate } from 'react-router-dom';

const UserProfile = () => {
    const { loginUserDetails, logOut } = useContext(ContextProvider);
    const navigate = useNavigate();

    function formatDateToYYYYMMDD(isoDate) {
        const date = new Date(isoDate);
        const year = date.getFullYear(isoDate);
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const readableCreatedAt = formatDateToYYYYMMDD(loginUserDetails.createdAt);
    const readableUpdatedAt = formatDateToYYYYMMDD(loginUserDetails.updatedAt);

    return (
        <div className="flex flex-col items-center  w-full h-full  sm:px-6 lg:px-8 sm:bg-gray-100 min-h-screen">
            <div className="bg-white sm:shadow-lg rounded-lg p-6  w-full max-w-md  mt-10 ">
                <h1 className="font-bold text-3xl capitalize text-center text-gray-800">My Profile</h1>
                <div className="mt-6">
                    <div className="mb-4">
                        <h2 className="text-gray-500 font-semibold text-lg">Full Name</h2>
                        <p className="font-medium text-gray-700">{loginUserDetails.userName}</p>
                    </div>
                    <div className="mb-4">
                        <h2 className="text-gray-500 font-semibold text-lg">Email Address</h2>
                        <p className="font-medium text-gray-700">{loginUserDetails.gmail}</p>
                    </div>
                    <div className="mb-6">
                        <h2 className="text-gray-500 font-semibold text-lg">Joined</h2>
                        <p className="font-medium text-gray-700">{readableCreatedAt}</p>
                    </div>
                    <div className="flex flex-col gap-3">
                        <button className="bg-blue-600 hover:bg-blue-700 font-medium px-4 py-2 rounded text-white transition duration-200">
                            My Orders
                        </button>
                        {loginUserDetails.admin && (
                            <Link to="/admin">
                                <button className="bg-yellow-500 w-full hover:bg-yellow-600 font-medium px-4 py-2 rounded text-white transition duration-200">
                                    Admin Dashboard
                                </button>
                            </Link>
                        )}
                        <button
                            className="bg-red-500 hover:bg-red-600 font-medium px-4 py-2 rounded text-white transition duration-200"
                            onClick={() => {
                                logOut(false);
                                navigate('/');
                            }}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
