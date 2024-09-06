import React from 'react'
import { useNavigate } from 'react-router-dom'

const CartAmount = ({ totalAmount, ProductCount,cartProduct,btn }) => {
  const navigate=useNavigate()
  return (
    <div className={`w-full lg:w-1/4 sm:bg-gray-100 p-6 rounded-lg sm:shadow-md h-[400px]   lg:sticky lg:top-0  ${ProductCount < 1 ? "mt-20 lg:mt-0 " : "mt-1 lg:mt-0"}`}>
      <h3 className="text-xl font-semibold mb-6 border-b pb-2">Price Details</h3>
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between text-gray-700">
          <span>{`Price (${ProductCount} items)`}</span>
          <span className="font-medium">₹{totalAmount}</span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>Discount</span>
          <span className="font-medium text-green-600">₹0</span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>Coupons for you</span>
          <span className="font-medium text-yellow-600">₹0</span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>Delivery Charges</span>
          <span className="font-medium text-green-600">Free</span>
        </div>
        <div className="flex justify-between text-gray-900 font-semibold border-t pt-4">
          <span>Total Amount</span>
          <span>₹{totalAmount}</span>
        </div>
        {btn ?
        <button className={`bg-[#FB641B] rounded py-1 text-white `}   disabled={ProductCount === 0} onClick={()=>navigate(`/orderpage/items`)}>Place Order</button>:
        ""}
      </div>
    </div>
  )
}

export default CartAmount