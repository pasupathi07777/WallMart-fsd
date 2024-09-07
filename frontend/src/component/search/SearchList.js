


// import React, { useContext } from 'react';
// import { useParams } from 'react-router-dom';
// import { ContextProvider } from '../../service/Context';
// import productIcons from '../../data/productIcon';

// const SearchList = () => {
//   const { allProducts, addCart, quantities, updateQuantity } = useContext(ContextProvider);
//   const { id } = useParams();

//   console.log(id);

  
//   const searchProduct = allProducts.filter((product) =>
//     product.name.toLowerCase().includes(id.toLowerCase()) || 
//     product.seller.toLowerCase().includes(id.toLowerCase()) || 
//     product.category.toLowerCase().includes(id.toLowerCase()) ||
//     product.description.toLowerCase().includes(id.toLowerCase()) 
//   );

//   console.log(searchProduct);

//   return (
//     <div className="p-4 sm:p-8 w-full h-screen">
//       {searchProduct.length > 0 ? (
//         searchProduct.map((product, index) => (
//           <div key={index} className="mb-6 flex flex-col sm:flex-row bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-2xl">
//             <div className="relative flex items-center justify-center w-full h-[300px] p-2 sm:w-1/2">
//               <img
//                 className="w-[300px] h-full rounded-lg cursor-pointer"
//                 src={`data:${product.image.contentType};base64,${product.image.data}`}
//                 alt={product.name}
//               />
//             </div>
//             <div className="p-4 sm:p-6 flex flex-col justify-between w-full sm:w-1/2">
//               <p className="text-gray-600 text-sm mb-1">{product.seller}</p>
//               <p className="font-semibold text-lg sm:text-xl mb-2">{product.name}</p>
//               <p className="font-bold text-xl text-gray-800 mb-2">₹{product.price}</p>
//               <small className="text-gray-600 mb-2 block">Free delivery</small>
//               {product.category === "fashion" && (
//                 <small className="text-gray-600 block mb-2">No Cost EMI from ₹2000/month</small>
//               )}
//               <p className="text-gray-600 text-sm truncate mb-4">{product.description}</p>

//               <div className="quantity flex gap-2 items-center mb-4">
//                 <div
//                   className="add-btn bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded cursor-pointer"
//                   onClick={() => updateQuantity(product._id, (quantities[product._id] || 1) < 10 ? (quantities[product._id] || 1) + 1 : (quantities[product._id] || 1))}
//                 >
//                   +
//                 </div>
//                 <input
//                   type="number"
//                   value={quantities[product._id] || 1}
//                   readOnly
//                   className="w-12 text-center border border-gray-300 rounded py-2 px-3 outline-none focus:border-blue-400"
//                 />
//                 <div
//                   className="sub-btn bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded cursor-pointer"
//                   onClick={() => updateQuantity(product._id, (quantities[product._id] || 1) > 1 ? (quantities[product._id] || 1) - 1 : 1)}
//                 >
//                   -
//                 </div>
//               </div>

//               <div className="flex flex-col sm:flex-row gap-2">
//                 <button
//                   className="flex items-center justify-center py-2 px-4 text-white bg-blue-500 rounded-lg shadow-md transition-transform transform hover:bg-blue-600 capitalize"
//                   onClick={() => addCart(product._id, quantities[product._id] || 1)}
//                 >
//                   {productIcons.cart} Add to Cart
//                 </button>
//                 <button className="flex items-center justify-center py-2 px-4 text-white bg-orange-500 rounded-lg shadow-md transition-transform transform hover:bg-orange-600 capitalize">
//                   Buy Now
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))
//       ) : (
//         <p className="text-center text-gray-500">No products found</p>
//       )}
//     </div>
//   );
// };

// export default SearchList;

import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ContextProvider } from '../../service/Context';
import productIcons from '../../data/productIcon';
import CartLoder from '../animation/CartLoder';
// import CartLoader from '../animation/CartLoader';


const SearchList = () => {
  const { allProducts, addCart, quantities, updateQuantity, cart } = useContext(ContextProvider);
  const { id } = useParams();
  const navigate = useNavigate();

  const [searchProduct, setSearchProduct] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (allProducts) {
      const filteredProducts = allProducts.filter((product) =>
        product.name.toLowerCase().includes(id.toLowerCase()) ||
        product.seller.toLowerCase().includes(id.toLowerCase()) ||
        product.category.toLowerCase().includes(id.toLowerCase()) ||
        product.description.toLowerCase().includes(id.toLowerCase())
      );
      setSearchProduct(filteredProducts);
      setIsLoading(false);
    }
  }, [id]);

  const onAddCart = async (productId) => {
    setLoadingId(productId); // Set the loading state for the specific product
    const response = await addCart(productId, quantities[productId] || 1); // Add to cart with quantity
    if (response) {
      setLoadingId(null); // Stop loading once added to cart
    }
  };

  return (
    <div className="p-4 sm:p-8 w-full h-screen">
      {isLoading ? (
        <p>Loading...</p>
      ) : searchProduct.length > 0 ? (
        searchProduct.map((product, index) => (
          <div
            key={index}
            className="mb-6 flex flex-col sm:flex-row bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-2xl"
          >
            <div className="relative flex items-center justify-center w-full h-[300px] p-2 sm:w-1/2">
              <img
                className="w-[300px] h-full rounded-lg cursor-pointer"
                src={`data:${product.image.contentType};base64,${product.image.data}`}
                alt={product.name}
                onClick={() => navigate(`/${product.category}/${product._id}`)}
              />
            </div>
            <div className="p-4 sm:p-6 flex flex-col justify-between w-full sm:w-1/2">
              <p className="text-gray-600 text-sm mb-1">{product.seller}</p>
              <p className="font-semibold text-lg sm:text-xl mb-2">{product.name}</p>
              <p className="font-bold text-xl text-gray-800 mb-2">₹{product.price}</p>
              <small className="text-gray-600 mb-2 block">Free delivery</small>
              {product.category.toLowerCase() === 'fashion' && (
                <small className="text-gray-600 block mb-2">No Cost EMI from ₹2000/month</small>
              )}
              <p className="text-gray-600 text-sm truncate mb-4">{product.description}</p>

              <div className="quantity flex gap-2 items-center mb-4">
                <button
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded"
                  onClick={() => updateQuantity(product._id, (quantities[product._id] || 1) + 1)}
                >
                  +
                </button>
                <input
                  type="number"
                  value={quantities[product._id] || 1}
                  readOnly
                  className="w-12 text-center border border-gray-300 rounded py-2 px-3 outline-none focus:border-blue-400"
                />
                <button
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded"
                  onClick={() => updateQuantity(product._id, Math.max(1, (quantities[product._id] || 1) - 1))}
                >
                  -
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                {cart.some((item) => item.productId.toString() === product._id.toString()) ? (
                  <button
                    className="flex items-center justify-center py-2 px-4 text-white bg-red-500 rounded-lg shadow-md"
                  >
                    <p className='flex gap-1'>Already in Cart {productIcons.cart}</p>
                  </button>
                ) : (
                  <button
                    className="flex items-center justify-center py-2 px-4 text-white bg-blue-500 rounded-lg shadow-md"
                    onClick={() => onAddCart(product._id)}
                  >
                    {loadingId === product._id ? (
                      <span className="flex items-center gap-3">
                        <CartLoder />
                        Adding...
                      </span>
                    ) : (
                      <p className='flex gap-1'>Add to Cart {productIcons.cart}</p>
                    )}
                  </button>
                )}

                <button
                  className="flex items-center justify-center py-2 px-4 text-white bg-orange-500 rounded-lg shadow-md"
                  onClick={() => navigate(`/orderpage/${product._id}`)}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No products found</p>
      )}
    </div>
  );
};

export default SearchList;

