import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ContextProvider } from '../../service/Context';
import productIcons from '../../data/productIcon';
import usePopUp from '../popup/PopUp';
const ProductRoute = () => {
  const { triggerPopUp, PopUp } = usePopUp();
  const navigate = useNavigate();
  const [isLoading, setIsloading] = useState(true)
  const { allProducts, addCart, quantities, updateQuantity, cart, cartProduct, setCartProduct, removePRoductInCart,  setVisibleSearch } = useContext(ContextProvider);
  const { id } = useParams();




  useEffect(() => {
    window.scrollTo(0, 0);
    setVisibleSearch(true)
    if (allProducts) {
      setIsloading(false)
    }

  }, [])
  const onAddCart=(product)=>{
    addCart(product, quantities[product] || 1)
    // addCart(product._id, quantities[product._id] || 1)
    triggerPopUp(true, 'Item added to cart');

}



  return (
    <div className="p-4 sm:p-8 min-h-screen">
      {




          allProducts.map((product, productIndex) => (
            product.category.toLowerCase() === id.toLowerCase() ? (
              <div
                key={productIndex}
                className="mb-6 flex flex-col sm:flex-row bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-transform transform hover:scale-105"
              >
                <div className="relative flex items-center justify-center w-full h-[300px] p-2 sm:w-1/2">
                  <img
                    onClick={() => navigate(`/${id}/${product._id}`)}
                    className="w-auto h-auto rounded-lg cursor-pointer max-w-[200px] max-h-[260px] "
                    src={`data:${product.image.contentType};base64,${product.image.data}`}
                    alt={product.name}
                  />
                </div>
                <div className="p-4 sm:p-6 flex flex-col justify-between w-full sm:w-1/2">
                  <p className="text-gray-600 text-sm mb-1">{product.seller}</p>
                  <h3 className="font-semibold text-lg sm:text-xl mb-2">{product.name}</h3>
                  <p className="font-bold text-xl text-gray-800 mb-2">₹{product.price}</p>
                  <small className="text-gray-600 mb-2 block">Free delivery</small>
                  {product.category.toLowerCase() === "fashion" && (
                    <small className="text-gray-600 block mb-2">No Cost EMI from ₹2000/month</small>
                  )}
                  <p className="text-gray-600 text-sm truncate mb-4">{product.description}</p>

                  <div className="quantity flex items-center gap-2 mb-4">
                    <button
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded transition-colors"
                      onClick={() =>
                        updateQuantity(product._id, Math.min(10, (quantities[product._id] || 1) + 1))
                      }
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
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded transition-colors"
                      onClick={() =>
                        updateQuantity(product._id, Math.max(1, (quantities[product._id] || 1) - 1))
                      }
                    >
                      -
                    </button>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    {cart.some(item => item.productId.toString() === product._id.toString()) ? (
                      <button
                        className="flex items-center justify-center py-2 px-4 text-white bg-red-500 rounded-lg shadow-md transition-transform transform hover:bg-red-600 capitalize gap-1"

                      >
                         Already in Cart {productIcons.cart}
                      </button>
                    ) : (
                      <button
                        className="flex items-center justify-center py-2 px-4 text-white bg-blue-500 rounded-lg shadow-md transition-transform transform hover:bg-blue-600 capitalize  gap-2 "
                        onClick={()=>onAddCart(product._id)}
                      >
                        Add to Cart  {productIcons.cart}
                      </button>
                    )}


                    <button className="flex items-center justify-center py-2 px-4 text-white bg-orange-500 rounded-lg shadow-md transition-transform transform hover:bg-orange-600 capitalize" onClick={() => navigate(`/orderpage/${product._id}`)}>
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
