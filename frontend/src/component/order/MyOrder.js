import React, { useContext, useEffect } from 'react';
import { ContextProvider } from '../../service/Context';
import { useNavigate } from 'react-router-dom';

const MyOrder = () => {
    const { myOrders, allProducts, setVisibleSearch,login } = useContext(ContextProvider);
    const navigate=useNavigate()
    const findProduct = (pro) => {
        return allProducts.find(allpro => allpro._id.toString() === pro.toString());
    };

    function formatDateToYYYYMMDD(isoDate) {
        const date = new Date(isoDate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    useEffect(() => {
        setVisibleSearch(true);
        if(!login){
            navigate('/')
          }
        return () => setVisibleSearch(false);
    }, [setVisibleSearch]);

    return (
        <div className="bg-gray-100 p-[12px] min-h-screen">
            <h1 className="font-semibold text-[24px] mb-1">My Orders</h1>
            {myOrders.length === 0 ? (
                <p className="text-lg text-center text-gray-500">No orders found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
                    {myOrders.map((order, orderIndex) => (
                        <div key={orderIndex} className="bg-white shadow-lg rounded-lg p-4 w-full">
                            <div className="flex items-center gap-4">
                                {/* Product Image */}
                                <img
                                    className="w-[100px] h-[100px] rounded-lg object-cover"
                                    src={`data:${findProduct(order.product)?.image.contentType};base64,${findProduct(order.product)?.image.data}`}
                                    alt={findProduct(order.product)?.name || 'Product Image'}
                                />

                                {/* Product Details */}
                                <div className="flex flex-col justify-between">
                                    <p className="text-xl font-semibold text-gray-800">{findProduct(order.product)?.name.slice(0, 20)}...</p>
                                    <p className="text-gray-500 text-sm">${findProduct(order.product)?.price}</p>
                                    <p className="text-sm text-orange-500">Status: {order.status}</p>
                                    <p className="text-sm text-green-500">Ordered On: {formatDateToYYYYMMDD(order.orderDate)}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyOrder;
