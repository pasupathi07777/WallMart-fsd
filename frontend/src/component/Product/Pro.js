import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ContextProvider } from '../../service/Context';
import productIcons from '../../data/productIcon';
import usePopUp from '../popup/PopUp';

const Pro = () => {
    const navigate=useNavigate()
    const { triggerPopUp, PopUp } = usePopUp();
    const { allProducts, addCart, cart, quantities, setQuantities, updateQuantity, cartProduct, setCartProduct, removePRoductInCart,setVisibleSearch } = useContext(ContextProvider);
    const { proId } = useParams();
    // const [isLoading, setIsLoading] = useState(true);
    const product = allProducts.find(product => product._id.toLocaleLowerCase() === proId.toLocaleLowerCase());
    useEffect(() => {
        setVisibleSearch(true)
    }, []);

   

  

    const onAddCart=()=>{
        addCart(product._id, quantities[product._id] || 1)
        triggerPopUp(true, 'Item added to cart');

    }


    



    return (
        <div className="p-4 sm:p-8 w-full min-h-screen">
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

                        <div className="quantity flex gap-2 items-center">
                            <div
                                className="add-btn bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded cursor-pointer"
                                onClick={() => updateQuantity(product._id, (quantities[product._id] || 1) < 10 ? (quantities[product._id] || 1) + 1 : (quantities[product._id] || 1))}
                            >
                                +
                            </div>
                            <input
                                type="number"
                                value={quantities[product._id] || 1}
                                readOnly
                                className="w-12 text-center border border-gray-300 rounded py-2 px-3 outline-none focus:border-blue-400"
                            />
                            <div
                                className="sub-btn bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded cursor-pointer"
                                onClick={() => updateQuantity(product._id, (quantities[product._id] || 1) > 1 ? (quantities[product._id] || 1) - 1 : 1)}
                            >
                                -
                            </div>
                        </div>


                        {cart.some(item => item.productId.toString() === product._id.toString()) ? (
                            <button
                                className="flex items-center justify-center py-2 px-4 text-white bg-red-500 rounded-lg shadow-md transition-transform transform hover:bg-red-600 capitalize"

                            >
                                {productIcons.cart} Already added in cart
                            </button>
                        ) : (
                            <button
                                className="flex items-center justify-center py-2 px-4 text-white bg-blue-500 rounded-lg shadow-md transition-transform transform hover:bg-blue-600 capitalize"
                                onClick={onAddCart}
                            >
                                {productIcons.cart} Add to Cart
                            </button>
                        )}
                        <button className="flex items-center justify-center py-2 px-4 text-white bg-orange-500 rounded-lg shadow-md transition-transform transform hover:bg-orange-600 capitalize" onClick={() => navigate(`/orderpage/${product._id}`)}>
                            Buy Now
                        </button>

                    </div>
                </div>
            ) : (
                <p className="text-center text-gray-600">Product not found</p>
            )}
        </div>
    );
};

export default Pro;

