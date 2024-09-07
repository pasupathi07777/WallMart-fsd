


// import React, { useContext, useState, useEffect } from 'react';
// import { ContextProvider } from '../../service/Context';
// import cartIcon from '../../data/cartData';
// import CartAmount from './CartAmount';
// import usePopUp from '../popup/PopUp';

// const Cart = () => {
//   const { triggerPopUp, PopUp } = usePopUp();
//   const { login, cart, allProducts, addCart, removePRoductInCart, cartProduct, totalAmount, setCartProduct, setTotalAmount } = useContext(ContextProvider);
//   const [removeLoading, setRemoveLoading] = useState(false)

//   useEffect(() => {
//     const cartItems = cart
//       .map((cartItem) => {
//         const product = allProducts.find(
//           (product) => product._id.toString() === cartItem.productId.toString()
//         );

//         if (product) {
//           return {
//             ...product,
//             quantity: cartItem.quantity || 1,
//           };
//         }

//         return null;
//       })
//       .filter((item) => item !== null);

//     setCartProduct(cartItems);

//     // Calculate total amount
//     const newTotalAmount = cartItems.reduce((acc, item) => {
//       return acc + parseFloat(item.price.replace(/,/g, '')) * item.quantity;
//     }, 0);

//     setTotalAmount(newTotalAmount);






//   }, [cart, allProducts, setCartProduct, setTotalAmount]);

//   const handleAddToCart = (productId, process) => {
//     const product = cartProduct.find(p => p._id === productId);
//     if (product) {
//       const newQuantity = process === "add" ? Math.min(product.quantity + 1, 10) : Math.max(product.quantity - 1, 1);
//       addCart(productId, newQuantity);
//     }
//   };
//   const [removeItemId,setRemoveItemId]=useState("")

//   const handleRemoveFromCart = async (productId) => {
//     setRemoveItemId(productId._id)
//     setRemoveLoading(true)
//     const product = cartProduct.find(p => p._id === productId);
//     if (product) {
//       const responce = await removePRoductInCart(productId);
//       if (responce.success) {
//         setRemoveLoading(true)
//         triggerPopUp(true, 'Item Removed to cart');
//       }

//     }
//   };

//   return (
//     <div className="p-4 max-w-7xl mx-auto relative w-full min-h-screen">
//       {!login ? (
//         <p className="text-center text-lg font-semibold text-red-500">Please log in first</p>
//       ) : (
//         <div className="flex flex-col lg:flex-row lg:gap-6">
//           <div className="flex flex-col w-full lg:w-3/4">
//             {cartProduct.length ?
//               cartProduct.map((product) => (
//                 <div key={product._id} className="bg-white p-4 rounded-lg shadow-md flex items-center gap-4 mb-6">
//                   <img
//                     className="w-[100px] h-[100px] rounded-lg"
//                     src={
//                       product.image
//                         ? `data:${product.image.contentType};base64,${product.image.data}`
//                         : 'default_image_url'
//                     }
//                     alt={product.name || 'Product Image'}
//                   />
//                   <div className="flex flex-col flex-grow">
//                     <h2 className="text-lg font-medium mb-1">{product.name.slice(0, 40) + "..." || 'No Name'}</h2>
//                     <p className="text-sm text-gray-500 mb-1">Seller: {product.seller || 'Unknown'}</p>
//                     <p className="text-lg font-semibold text-gray-800 mb-2">₹{product.price}</p>
//                     <div className="flex items-center gap-3">
//                       <div
//                         className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded cursor-pointer"
//                         onClick={() => handleAddToCart(product._id, "add")}
//                       >
//                         +
//                       </div>
//                       <input
//                         type="number"
//                         value={product.quantity}
//                         readOnly
//                         className="w-12 text-center border border-gray-300 rounded py-1"
//                       />
//                       <div
//                         className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded cursor-pointer"
//                         onClick={() => handleAddToCart(product._id, "sub")}
//                       >
//                         -
//                       </div>
//                     </div>
//                   </div>
//                   {setRemoveItemId ===product._id && removeLoading ? <p className='text-red-600'>Removing...</p> :
//                     <button
//                       className="ml-auto text-red-700 font-semibold py-2 px-4 rounded-lg"
//                       onClick={() => handleRemoveFromCart(product._id)}
//                     >
//                       {cartIcon.deleteIcon}
//                     </button>}
//                 </div>
//               )) :
//               <p className='font-medium text-center mb-4 capitalize'>No cart item</p>
//             }
//           </div>

//           <CartAmount totalAmount={totalAmount} ProductCount={cart.length} btn={true} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;


import React, { useContext, useState, useEffect } from 'react';
import { ContextProvider } from '../../service/Context';
import cartIcon from '../../data/cartData';
import CartAmount from './CartAmount';
import usePopUp from '../popup/PopUp';

const Cart = () => {
  const { triggerPopUp, PopUp } = usePopUp();
  const { login, cart, allProducts, addCart, removePRoductInCart, cartProduct, totalAmount, setCartProduct, setTotalAmount } = useContext(ContextProvider);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [removeItemId, setRemoveItemId] = useState("");

  useEffect(() => {
    const cartItems = cart
      .map((cartItem) => {
        const product = allProducts.find(
          (product) => product._id.toString() === cartItem.productId.toString()
        );

        if (product) {
          return {
            ...product,
            quantity: cartItem.quantity || 1,
          };
        }

        return null;
      })
      .filter((item) => item !== null);

    setCartProduct(cartItems);

    // Calculate total amount
    const newTotalAmount = cartItems.reduce((acc, item) => {
      return acc + parseFloat(item.price.replace(/,/g, '')) * item.quantity;
    }, 0);

    setTotalAmount(newTotalAmount);
  }, [cart, allProducts, setCartProduct, setTotalAmount]);

  const handleAddToCart = (productId, process) => {
    const product = cartProduct.find(p => p._id === productId);
    if (product) {
      const newQuantity = process === "add" ? Math.min(product.quantity + 1, 10) : Math.max(product.quantity - 1, 1);
      addCart(productId, newQuantity);
    }
  };

  const handleRemoveFromCart = async (productId) => {
    setRemoveItemId(productId); // Correct handling of product ID
    setRemoveLoading(true);
    const response = await removePRoductInCart(productId);
    if (response.success) {
      triggerPopUp(true, 'Removed Successful');
      setRemoveLoading(false);
    }else{
      setRemoveLoading(false);
    }
     // Stop the loading state
  };

  return (
    <div className="p-4 max-w-7xl mx-auto relative w-full min-h-screen">
      {!login ? (
        <p className="text-center text-lg font-semibold text-red-500">Please log in first</p>
      ) : (
        <div className="flex flex-col lg:flex-row lg:gap-6">
          <div className="flex flex-col w-full lg:w-3/4">
            {cartProduct.length ? (
              cartProduct.map((product) => (
                <div key={product._id} className="bg-white p-4 rounded-lg shadow-md flex items-center gap-4 mb-6">
                  <img
                    className="w-[100px] h-[100px] rounded-lg"
                    src={
                      product.image
                        ? `data:${product.image.contentType};base64,${product.image.data}`
                        : 'default_image_url'
                    }
                    alt={product.name || 'Product Image'}
                  />
                  <div className="flex flex-col flex-grow">
                    <h2 className="text-lg font-medium mb-1">{product.name.slice(0, 40) + "..." || 'No Name'}</h2>
                    <p className="text-sm text-gray-500 mb-1">Seller: {product.seller || 'Unknown'}</p>
                    <p className="text-lg font-semibold text-gray-800 mb-2">₹{product.price}</p>
                    <div className="flex items-center gap-3">
                      <div
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded cursor-pointer"
                        onClick={() => handleAddToCart(product._id, "add")}
                      >
                        +
                      </div>
                      <input
                        type="number"
                        value={product.quantity}
                        readOnly
                        className="w-12 text-center border border-gray-300 rounded py-1"
                      />
                      <div
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded cursor-pointer"
                        onClick={() => handleAddToCart(product._id, "sub")}
                      >
                        -
                      </div>
                    </div>
                  </div>
                  {removeItemId === product._id && removeLoading ? (
                    <div className="">
                      <p className="text-red-600 hidden sm:block">Removing...</p>
                      <p className="text-red-600 sm:hidden">Remov...</p>
                    </div>
                  ) : (
                    <button
                      className="ml-auto text-red-700 font-semibold py-2 px-4 rounded-lg min-w-[20px] "
                      onClick={() => handleRemoveFromCart(product._id)}
                    >
                      {cartIcon.deleteIcon}
                    </button> 
                  )}
                </div>
              ))
            ) : (
              <p className="font-medium text-center mb-4 capitalize">No cart items</p>
            )}
          </div>

          <CartAmount totalAmount={totalAmount} ProductCount={cart.length} btn={true} />
        </div>
      )}
      <PopUp />
    </div>
  );
};

export default Cart;
