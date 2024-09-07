
import React, { useContext, useState } from 'react';
import { ContextProvider } from '../../service/Context';
import usePopUp from '../popup/PopUp';
const AllOrder = () => {
  const { triggerPopUp, PopUp } = usePopUp();
  const { allUsers, allProducts, adminEditOrderStatus, adminDeleteOrder } = useContext(ContextProvider);
  const [loading, setLoading] = useState(false)
  const [currentId, setCurrentId] = useState("")

  const [editingOrder, setEditingOrder] = useState(null);
  const [newStatus, setNewStatus] = useState('');

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

  const handleEditClick = (orderId, currentStatus) => {
    setCurrentId(orderId)
    setEditingOrder(orderId);
    setNewStatus(currentStatus);
  };

  const handleStatusChange = (e) => {
    setNewStatus(e.target.value);
  };

  const handleSaveClick = async (orderId) => {
    setEditingOrder(null);
    setLoading(true)
    try {
      const responce = await adminEditOrderStatus({ orderId, newStatus });

      if (responce === true) {
        triggerPopUp(true, 'Status Updated');
        setLoading(false)
      }
    } catch (error) {
      // console.error('Error updating order status:', error);
      setLoading(false)

    }
  };
  const handleDeleteClick = async (orderId) => {
    try {
      const responce = await adminDeleteOrder(orderId)

      if (responce === true) {
        triggerPopUp(true, 'Order Deleted');
      }
    } catch (error) {
      // console.error('Error updating order status:', error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">All Orders</h1>

      {allUsers.map((user, userIndex) => (
        <div key={userIndex} className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 capitalize">{user.userName}'s Orders</h2>

          <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {user.orders.length ? (
              user.orders.map((order, orderIndex) => (
                <div key={orderIndex} className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md mx-auto">
                  <div className="flex items-center gap-4">
                    {/* Product Image */}
                    <img
                      className="w-[100px] h-[100px] rounded-lg object-cover"
                      src={`data:${findProduct(order.product)?.image.contentType};base64,${findProduct(order.product)?.image.data}`}
                      alt={findProduct(order.product)?.name || 'Product Image'}
                    />

                    {/* Product Details */}
                    <div className="flex-1">
                      <p className="text-lg font-semibold text-gray-800">
                        {findProduct(order.product)?.name.slice(0, 20)}...
                      </p>
                      <p className="text-gray-500 text-sm">${findProduct(order.product)?.price}</p>

                      {/* Conditionally render status dropdown if editing */}
                      {editingOrder === order._id ? (
                        <select
                          className="bg-gray-100 border border-gray-300 rounded px-2 py-1"
                          value={newStatus}
                          onChange={handleStatusChange}
                        >
                          <option value="pending">Pending</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      ) : (
                        <p className="text-sm text-orange-500 flex gap-1">
                          Status:
                          {loading && currentId === order._id ? (
                            <span className='text-green-600'>Updating...</span>
                          ) : (
                            <span>{order.status}</span>
                          )}
                        </p>

                      )}

                      < p className="text-sm text-green-500">Ordered On: {formatDateToYYYYMMDD(order.orderDate)}</p>
                  </div>
                </div>

                  {/* Edit & Delete Buttons */ }
                < div className = "mt-4 flex justify-end gap-2" >
                  { editingOrder === order._id ? (
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200"
                    onClick={() => handleSaveClick(order._id)}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                    onClick={() => handleEditClick(order._id, order.status)}
                  >
                    Edit
                  </button>
                )}
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200" onClick={() => handleDeleteClick(order._id)}>
              Delete
            </button>
          </div>
        </div>
      ))
            ) : (
      <p className="text-center">No Orders</p>
            )}
    </div>
        </div >
      ))}
    </div >
  );
};

export default AllOrder;

