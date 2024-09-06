


import React, { useContext, useEffect, useState } from 'react'
import { ContextProvider } from '../../service/Context'
import adminIcon from '../../data/adminData'
import { useNavigate } from 'react-router-dom'
import usePopUp from '../popup/PopUp';
const AllProduct = () => {
  const { triggerPopUp, PopUp } = usePopUp();
  const { allProducts } = useContext(ContextProvider)
  const [products,setProducts]=useState([])
  const navigate = useNavigate()
  const onEditProduct = (productId) => {
    navigate(`/admin/editproduvt/${productId}`)

  }
  const onDelete=()=>{
    triggerPopUp(true, 'Delete Option Not Available');
  }
  useEffect(()=>{
    setProducts(allProducts)
    

  },[allProducts])
  return (
    <div className="p-4 bg-gray-100 w-full min-h-screen ">
      <h1 className='font-bold text-2xl mb-2'>Product List</h1>
      <div className='grid  gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {products.map((e, i) => (
          <div key={i} className="bg-white  p-4 rounded-lg shadow-md flex flex-col gap-3">
            <p className='flex gap-2'><span className='font-semibold'>ID:</span> {e._id}</p>
            <p className='flex gap-2'><span className='font-semibold'>Name:</span> {e.name.length > 20 ? `${e.name.slice(0, 20)}...` : e.name}</p>
            <p className='flex gap-2'><span className='font-semibold'>Price:</span> ${e.price}</p>
            <p className='flex gap-2'><span className='font-semibold'>Stock:</span> {e.stock}</p>
            <img className='h-[100px] w-[100px] '
              src={`data:${e.image.contentType};base64,${e.image.data}`}
              alt={e.name}
            />
            <div className="flex gap-2 mt-2">
              <button className="text-blue-500 hover:text-blue-700 flex items-center gap-1" onClick={() => onEditProduct(e._id)}>{adminIcon.editIcon} Edit</button>
              <button className="text-red-500 hover:text-red-700 flex items-center gap-1" onClick={onDelete}>{adminIcon.deleteIcon} Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllProduct
