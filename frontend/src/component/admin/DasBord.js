// import React, { useState } from 'react'
// import AdminRoute from './AdminRoute'
// import adminIcon from '../../data/adminData'
// import {useNavigate} from 'react-router-dom'




// const Dasbord = () => {
//     const navigate=useNavigate()
//     const list = [
//         {
//             name: "product",
//             path: '/admin/viewproducts',
//             color: "#28A745"
//         },
//         {
//             name: "orders",
//             path: "/admin/order",
//             color: "#DC3545"

//         },
//         {
//             name: "users",
//             path: "/admin/allusers",
//             color: "#17A2B8"
//         },
//         {
//             name: "addProduct",
//             path: "/admin/addproduct",
//             color: "#FFC107"

//         },
//     ]

    
//     return (
        

//         <div className="dash p-5 flex flex-col gap-3 ">
//             <h1 className='font-bold text-[32px] '>Admin Dashboard</h1>
//             <div className={`dasbord grid grid-cols-2 sm:grid-cols-4  md:grid-cols-4  gap-5 h-[150px]  `}>
//                 {list.map((e, i) => (
//                     <div key={i} className={`box text-white font-semibold  rounded`} style={{ backgroundColor: e.color }}>
//                         <p className='text-center h-[100px] flex justify-center items-center  capitalize text-[24px]   '>{e.name}</p>
//                         {
//                             e.name !== "addProduct" ?
//                                 <button className='  flex justify-between items-center  h-[50px] capitalize px-2 sm:px-6  w-full border-black border-t-[1px]   ' onClick={()=>navigate(e.path)}>view details <div className="icon text-black" >{adminIcon.rightArrow}</div> </button>
//                                 :
//                                 <button className='  flex justify-between items-center  h-[50px] capitalize px-2 sm:px-6  w-full border-black border-t-[1px]   ' onClick={()=>navigate(e.path)}>add <div className="icon text-black" >{adminIcon.addIcon}</div> </button>
//                         }
//                     </div>
//                 ))}


//             </div>
//         </div>
//     )
// }

// export default Dasbord

import React from 'react';
import { useNavigate } from 'react-router-dom';
import adminIcon from '../../data/adminData';

const Dashboard = () => {
    const navigate = useNavigate();
    const list = [
        {
            name: "product",
            path: '/admin/viewproducts',
            color: "#28A745"
        },
        {
            name: "orders",
            path: "/admin/order",
            color: "#DC3545"
        },
        {
            name: "users",
            path: "/admin/allusers",
            color: "#17A2B8"
        },
        {
            name: "addProduct",
            path: "/admin/addproduct",
            color: "#FFC107"
        },
    ];

    return (
        <div className="p-5 flex flex-col gap-6 bg-gray-100 min-h-screen">
            <h1 className="font-bold text-3xl sm:text-4xl text-start">Admin Dashboard</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {list.map((e, i) => (
                    <div key={i} className="flex flex-col justify-between bg-white text-white font-semibold rounded-lg shadow-lg overflow-hidden" style={{ backgroundColor: e.color }}>
                        <p className="flex-grow flex justify-center items-center capitalize text-2xl sm:text-3xl p-4">{e.name}</p>
                        <button
                            className="flex justify-between items-center bg-white text-black h-12 capitalize px-4 py-2 border-t border-black hover:bg-gray-200 transition"
                            onClick={() => navigate(e.path)}
                        >
                            {e.name !== "addProduct" ? "view details" : "add"}
                            <div className="icon">{e.name !== "addProduct" ? adminIcon.rightArrow : adminIcon.addIcon}</div>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;
