


import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContextProvider } from '../../service/Context';

const ConformOrder = () => {
    const {setVisibleSearch,login}=useContext(ContextProvider)
    const navigate = useNavigate();

    const handleCheckOrders = () => {
        navigate('/orders');
    };

    useEffect(() => {
        if(!login){
            navigate('/')
          }
        setVisibleSearch(false);
    
        
      
    }, []);

    return (
        <div className="flex flex-col justify-center items-center min-h-screen w-full px-4 sm:px-8 bg-gray-100">
        
            <div className="flex justify-center items-center mb-8">
                <div className="bg-green-500 rounded-full p-6 animate-bounce">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="white"
                        className="w-12 h-12"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">Payment Successful!</h1>
            <p className="text-lg text-gray-600 text-center mb-6">Your payment was processed successfully.</p>
            
          
            <button
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all"
                onClick={handleCheckOrders}
            >
                Check My Orders
            </button>
        </div>
    );
};

export default ConformOrder;
