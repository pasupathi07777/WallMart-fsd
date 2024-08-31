// import React, { useContext } from 'react';
// import { useParams } from 'react-router-dom';
// import { ContextProvider } from '../../service/Context';
// import productIcons from '../../data/productIcon';

// const Pro = () => {
//     const { allProducts } = useContext(ContextProvider);
//     const { proId } = useParams();

//     // Find the product that matches the proId
//     const product = allProducts.find(product => product._id === proId);

//     return (
//         <div className='p-[12px] sm:p-[34px] w-full '>
//             {product ? (
//                 <div className='flex flex-col items-center gap-2 w-full '>

//                     <img className='h-[400px]'
//                         src={`data:${product.image.contentType};base64,${product.image.data}`}
//                         alt={product.name}
//                     />
//                     <div className="flex flex-col gap-1">
//                         <p className='text-[10px] '>{product.seller}</p>
//                         <p className='font-medium'>{product.name}</p>
//                         <p className='font-bold text-[20px] '>₹{product.price}</p>
//                         <small className='capitalize'> free delivery</small>
//                         {
//                             product.category === "fachion" && <small className='capitalize'> No Cost EMI from ₹2000/month</small>
//                         }
//                         {/* <p>Only {product.stock} </p> */}
//                         <div className="button-group  flex flex-col sm:flex-row gap-2 mt-auto sm:mt-1 ">
//                             <button className='flex gap-1 items-center justify-center py-1 px-2 text-white bg-blue-600 rounded capitalize'>{productIcons.cart}add cart</button>
//                             <button className='bg-[#FB641B] rounded p-1 text-white capitalize '>buy now</button>
                           
//                         </div>
//                         <p className='hidden md:block h-full w-full mt-1'>{product.description}</p>
                        
//                     </div>
                   

//                 </div>
//             ) : (
//                 <p>Product not found</p>
//             )}
//         </div>
//     );
// };

// export default Pro;




import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ContextProvider } from '../../service/Context';
import productIcons from '../../data/productIcon';

const Pro = () => {
    const { allProducts } = useContext(ContextProvider);
    const { proId } = useParams();

    // Find the product that matches the proId
    const product = allProducts.find(product => product._id.toLocaleLowerCase() === proId.toLocaleLowerCase());

    return (
        <div className="p-4 sm:p-8 w-full">
            {product ? (
                <div className="flex flex-col items-center gap-4 w-full max-w-4xl mx-auto">
                    {/* Product Image */}
                    <div className="relative w-full max-w-lg mx-auto">
                        <img
                            className="w-full h-[400px]  rounded-lg shadow-lg"
                            src={`data:${product.image.contentType};base64,${product.image.data}`}
                            alt={product.name}
                        />
                    </div>
                    
                    {/* Product Details */}
                    <div className="flex flex-col gap-4 w-full">
                        <p className="text-gray-600 text-sm">{product.seller}</p>
                        <p className="text-2xl font-semibold">{product.name}</p>
                        <p className="text-xl font-bold text-gray-800">₹{product.price}</p>
                        <small className="text-gray-500 capitalize">Free delivery</small>
                        {product.category === "fashion" && (
                            <small className="text-gray-500 capitalize">No Cost EMI from ₹2000/month</small>
                        )}
                        <p className="text-gray-700 text-sm mt-2">{product.description}</p>
                        
                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-2 mt-4">
                            <button className="flex items-center justify-center py-2 px-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors">
                                {productIcons.cart} Add to Cart
                            </button>
                            <button className="flex items-center justify-center py-2 px-4 bg-orange-600 text-white rounded-lg shadow-md hover:bg-orange-700 transition-colors">
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-center text-gray-600">Product not found</p>
            )}
        </div>
    );
};

export default Pro;

