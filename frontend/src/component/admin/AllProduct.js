// import React, { useContext } from 'react'
// import { ContextProvider } from '../../service/Context'
// import adminIcon from '../../data/adminData'

// const AllProduct = () => {
//   const { allProducts } = useContext(ContextProvider)
//   return (
//     <div className="p-[12px] ">
//       <h1 className='font-bold text-[32px] '>Product List</h1>
//       <div className='flex flex-col gap-2 md:grid md:grid-cols-2 '>

//         {
//           allProducts.map((e, i) => (
//             <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-2 bg-gray-200 px-2 py-2 rounded capitalize">
//               <p className='flex gap-2  '><p className='font-semibold capitalize '>ID</p>{e._id}</p>
//               <p className='flex gap-2'><p className='font-semibold capitalize '>Name</p>{e.name.slice(0, 20)}...</p>
//               <p className='flex gap-2  '><p className='font-semibold capitalize '>price</p>{e.price}</p>
//               <p className='flex gap- '><p className='font-semibold capitalize '>stock</p>{e.stock}</p>

//               <div className="action flex gap-2 w-fit">
//                 <div className="btn">{adminIcon.editIcon}</div>
//                 <div className="btn">{adminIcon.deleteIcon}</div>
//               </div>
//             </div>
//           ))

//         }

//       </div>
//     </div>

//   )
// }

// export default AllProduct


import React, { useContext } from 'react'
import { ContextProvider } from '../../service/Context'
import adminIcon from '../../data/adminData'

const AllProduct = () => {
  const { allProducts } = useContext(ContextProvider)
  return (
    <div className="p-4 bg-gray-100 ">
      <h1 className='font-bold text-2xl mb-2'>Product List</h1>
      <div className='grid  gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {allProducts.map((e, i) => (
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
              <button className="text-blue-500 hover:text-blue-700 flex items-center gap-1">{adminIcon.editIcon} Edit</button>
              <button className="text-red-500 hover:text-red-700 flex items-center gap-1">{adminIcon.deleteIcon} Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllProduct
