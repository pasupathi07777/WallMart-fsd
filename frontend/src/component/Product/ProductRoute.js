// import React, { useContext } from 'react'
// import { useNavigate, useParams } from 'react-router-dom';
// import { ContextProvider } from '../../service/Context';
// import productIcons from '../../data/productIcon';


// const ProductRoute = () => {
//     const navigate=useNavigate()
//     const { allProducts } = useContext(ContextProvider)
//     const { id } = useParams()

//     return (
//         <div className="p-[12px] sm:p-[32px] flex flex-col gap-5  ">
//             {
//                 allProducts.map((product, productIndex) => (
//                     product.category === id ?
//                         <div className="grid grid-cols-2  md:grid-cols-3 md:flex gap-5  justify-center items-center">

//                             <img onClick={()=>navigate(`/${id}/${product._id}`)}
//                                 key={productIndex}
//                                 className={`w-full max-w-[200px] h-[250px] m-auto  rounded   `}
//                                 src={`data:${product.image.contentType};base64,${product.image.data}`}
//                                 alt={product.name}
//                                 srcSet=""

//                             />
//                             <div className="product-details w-full   flex flex-col justify-start h-full p-[12px] items-start  ">
//                                 <p className='text-[10px] '>{product.seller}</p>
//                                 <p className='font-medium'>{product.name}</p>
//                                 <p className='font-bold text-[20px] '>₹{product.price}</p>
//                                 <small className='capitalize'> free delivery</small>
//                                 {
//                                     product.category === "fachion" && <small className='capitalize'> No Cost EMI from ₹2000/month</small>
//                                 }
//                                 {/* <p>Only {product.stock} </p> */}
//                                 <div className="button-group  flex flex-col sm:flex-row gap-2 mt-auto sm:mt-1 ">
//                                     <button className='flex gap-1 items-center justify-center py-1 px-2 text-white bg-blue-600 rounded capitalize'>{productIcons.cart}add cart</button>
//                                     <button className='bg-[#FB641B] rounded p-1 text-white capitalize '>buy now</button>
//                                 </div>



//                             </div>
//                             <p className='hidden md:block h-full w-full'>{product.description.slice(0, 300)}...<p className='text-blue-500'>more</p></p>
//                         </div>
//                         :
//                         ""
//                 ))
//             }
//         </div>
//     )
// }

// export default ProductRoute




import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ContextProvider } from '../../service/Context';
import productIcons from '../../data/productIcon';

const ProductRoute = () => {
    const navigate = useNavigate();
    const { allProducts } = useContext(ContextProvider);
    const { id } = useParams();

    return (
        <div className="p-4 sm:p-8">
            {allProducts.map((product, productIndex) => (
                product.category.toLocaleLowerCase() === id.toLocaleLowerCase() ? (
                    <div key={productIndex} className="mb-6 flex flex-col sm:flex-row bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-2xl">
                        <div className="relative flex items-center justify-center w-full h-[300px] p-2 sm:w-1/2">
                            <img
                                onClick={() => navigate(`/${id}/${product._id}`)}
                                className="w-[300px] h-full rounded-lg  cursor-pointer"
                                src={`data:${product.image.contentType};base64,${product.image.data}`}
                                alt={product.name}
                            />
                        </div>
                        <div className="p-4 sm:p-6 flex flex-col justify-between w-full sm:w-1/2">
                            <p className="text-gray-600 text-sm mb-1">{product.seller}</p>
                            <p className="font-semibold text-lg sm:text-xl mb-2">{product.name}</p>
                            <p className="font-bold text-xl text-gray-800 mb-2">₹{product.price}</p>
                            <small className="text-gray-600 mb-2 block">Free delivery</small>
                            {product.category === "fashion" && (
                                <small className="text-gray-600 block mb-2">No Cost EMI from ₹2000/month</small>
                            )}
                            <p className="text-gray-600 text-sm truncate mb-4">{product.description}</p>
                            <div className="flex flex-col sm:flex-row gap-2">
                                <button className="flex items-center justify-center py-2 px-4 text-white bg-blue-500 rounded-lg shadow-md transition-transform transform hover:bg-blue-600 capitalize">
                                    {productIcons.cart} Add to Cart
                                </button>
                                <button className="flex items-center justify-center py-2 px-4 text-white bg-orange-500 rounded-lg shadow-md transition-transform transform hover:bg-orange-600 capitalize">
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                ) : null
            ))}
        </div>
    );
};

export default ProductRoute;



