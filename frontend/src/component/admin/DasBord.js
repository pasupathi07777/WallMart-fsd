

import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import adminIcon from '../../data/adminData';
import { ContextProvider } from '../../service/Context';
import loadingIcon from '../../data/isLoading';


const Dashboard = () => {
    const { loginUserDetails,  setVisibleSearch} = useContext(ContextProvider)
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()
    useEffect(() => {
        setVisibleSearch(true)
        if (!loginUserDetails.admin) {
            navigate('/');
        }
        setIsLoading(false)



    }, [])

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
        <div className='w-full flex justify-center h-screen '>
            {
                isLoading ? <p className='text-center m-auto'>{loadingIcon.loadingIcon}</p>
                    :
                    <div className="p-5 flex flex-col gap-6 bg-gray-100 h-screen w-full
                    ">
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
            }
        </div>
    );
}

export default Dashboard;
