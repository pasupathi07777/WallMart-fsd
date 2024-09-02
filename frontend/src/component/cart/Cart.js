import React, { useContext, useState, useEffect } from 'react';
import { ContextProvider } from '../../service/Context';

const Cart = () => {
  const { login, cart, allProducts, addCart, removePRoductInCart } = useContext(ContextProvider);
  const [cartProduct, setCartProduct] = useState([]);

  useEffect(() => {
    if (allProducts.length === 0) return;

    const cartItems = cart.map((cartItem) => {


      const product = allProducts.find((product) => product._id.toString() === cartItem.productId.toString());


      if (product) {
        return {
          ...product,
          quantity: cartItem.quantity || 1
        };
      }


      return {
        _id: cartItem.productId,
        name: 'Unknown Product',
        price: 0,
        quantity: cartItem.quantity || 1,
        image: null
      };
    });

    setCartProduct(cartItems);
  }, [cart, allProducts]);



  const handleAddToCart = (productId, process) => {
    const product = cartProduct.find(p => p._id === productId);
    if (product) {
      addCart(productId, product.quantity = process === "add" ? product.quantity <= 10 ? product.quantity + 1 : product.quantity : product.quantity > 1 ? product.quantity - 1 : product.quantity);
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {!login ? (
        <p className="text-center text-lg font-semibold text-red-500">Please log in first</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cartProduct.map((product) => {
           

            return (
              <div key={product._id} className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center">
                <img
                  className="w-full h-64 object-cover rounded-lg mb-4"
                  src={
                    product.image
                      ? `data:${product.image.contentType};base64,${product.image.data}`
                      : 'default_image_url'
                  }
                  alt={product.name || 'Product Image'}
                />
                <h2 className="text-xl font-bold mb-2">{product.name || 'No Name'}</h2>
                <p className="text-lg text-gray-700 mb-2">₹{product.price}</p>
                <div className="quantity flex gap-2 items-center">
                  <div
                    className="add-btn bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded cursor-pointer"
                    onClick={() => {

                      handleAddToCart(product._id, "add");
                    }}
                  >
                    +
                  </div>
                  <input
                    type="number"
                    value={product.quantity}
                    readOnly
                    className="w-12 text-center border border-gray-300 rounded py-2 px-3 outline-none focus:border-blue-400"
                  />
                  <div
                    className="sub-btn bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded cursor-pointer"
                    onClick={() => {

                      handleAddToCart(product._id, "sub");
                    }}
                  >
                    -
                  </div>
                </div>
                <button className='' onClick={() => removePRoductInCart(product._id)}>remove</button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Cart;
