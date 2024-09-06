import React, { useContext, useState, useEffect } from 'react';
import { ContextProvider } from '../../service/Context';
import CartAmount from '../cart/CartAmount';
import { useNavigate, useParams } from 'react-router-dom';

const OrderPage = () => {
  const { id } = useParams()
  console.log(id)
  const { login, cart, allProducts, cartProduct, totalAmount, setCartProduct, loginUserDetails, setTotalAmount, address, orderDetails, setOrderDetails, setPaymentStatus, setVisibleSearch } = useContext(ContextProvider)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()


  useEffect(() => {

    setVisibleSearch(false) 



    if (id === "items") {
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

      const newTotalAmount = cartItems.reduce((acc, item) => {
        return acc + parseFloat(item.price.replace(/,/g, '')) * item.quantity;
      }, 0);

      setTotalAmount(newTotalAmount);

    } else if(id!=="items") {
     
      if (allProducts.length) {
        
        const cartPro = allProducts.filter((product) => product._id.toString() === id.toString());
      
       
        setCartProduct(cartPro);
      
     
        if (cartPro.length > 0) {
          const totalPrice = cartPro[0].price; 
          setTotalAmount(totalPrice); 
        } else {
          setTotalAmount(0);
        }
      
        console.log(totalAmount, cartPro);
      }else if(id===""){
        navigate('/')
      }
      
      





    }


   








  }, [cart, allProducts, setCartProduct, setTotalAmount]);



  const onSubmit = () => {
    navigate(`/payment/${id === "items" ? "xxx" : "x"}`)

    setOrderDetails(cartProduct.map(pro => pro._id))

    setPaymentStatus(true)





  }



  return (
    // <div className="p-4 max-w-7xl mx-auto relative w-full h-full bg-gray-100">
    //   {!login ? (
    //     <p className="text-center text-lg font-semibold text-red-500">Please log in first</p>
    //   ) : (
    //     <div className="flex flex-col lg:flex-row gap-6 mb-72">
    //       <div className="w-full lg:w-3/4">
    //         {
    //           address.street ?
    //             <div className="bg-white p-4 rounded-lg shadow-md mb-4">
    //               <h2 className="text-lg font-semibold mb-2">{`Deliver to: ${loginUserDetails.userName}`}</h2>
    //               <p className="text-gray-600">{`${address.street},${address.city},${address.state},${address.postalCode},${address.country}`}</p>
    //               <button className="text-blue-500 hover:underline mt-2" onClick={() => navigate('/addaddress')}>Edit</button>
    //             </div> :
    //             <button onClick={() => navigate('/addaddress')}>Add Address</button>
    //         }
    //         {cartProduct.length ? (
    //           cartProduct.map((product) => (
    //             <div key={product._id} className="bg-white p-4 rounded-lg shadow-md flex items-center gap-4 mb-4">
    //               <img
    //                 className="w-[100px] h-[100px] rounded-lg"
    //                 src={
    //                   product.image
    //                     ? `data:${product.image.contentType};base64,${product.image.data}`
    //                     : 'default_image_url'
    //                 }
    //                 alt={product.name || 'Product Image'}
    //               />
    //               <div className="flex-grow">
    //                 <h2 className="text-lg font-medium mb-1">{product.name.slice(0, 40) + "..." || 'No Name'}</h2>
    //                 <p className="text-sm text-gray-500 mb-1">Seller: {product.seller || 'Unknown'}</p>
    //                 <div className="quantity flex items-center gap-1 ">
    //                   <p className='text-sm text-gray-500'>Quantity : </p>
    //                   <p > {product.quantity}</p>
    //                 </div>
    //                 <p className="text-lg font-semibold text-gray-800 ">₹{product.price}</p>



    //               </div>

    //             </div>
    //           ))
    //         ) : (
    //           <p className='font-medium text-center mb-4 capitalize'>No cart item</p>
    //         )}
    //       </div>

    //       <CartAmount totalAmount={totalAmount} ProductCount={cart.length} btn={false} />


    //     </div>
    //   )}
    //   <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg lg:shadow-none p-4 lg:p-0  flex items-center justify-between    ">
    //     <p className='md:hidden font-medium capitalize px-2 text-[18px] '> ₹{totalAmount}</p>
    //     <button className=" md:w-full bg-orange-500 text-white py-2 px-4 rounded-lg lg:rounded-none " onClick={() => onSubmit()}>continue</button>
    //   </div>
    // </div>

    <div className="w-full min-h-screen">
      {
        id === "items" ?
          <div className="p-4 max-w-7xl mx-auto relative w-full h-full bg-gray-100">
            {!login ? (
              <p className="text-center text-lg font-semibold text-red-500">Please log in first</p>
            ) : (
              <div className="flex flex-col lg:flex-row gap-6 mb-72">
                <div className="w-full lg:w-3/4">
                  {
                    address.street ?
                      <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                        <h2 className="text-lg font-semibold mb-2">{`Deliver to: ${loginUserDetails.userName}`}</h2>
                        <p className="text-gray-600">{`${address.street},${address.city},${address.state},${address.postalCode},${address.country}`}</p>
                        <button className="text-blue-500 hover:underline mt-2" onClick={() => navigate('/addaddress')}>Edit</button>
                      </div> :
                      <button onClick={() => navigate('/addaddress')}>Add Address</button>
                  }
                  {cartProduct.length ? (
                    cartProduct.map((product) => (
                      <div key={product._id} className="bg-white p-4 rounded-lg shadow-md flex items-center gap-4 mb-4">
                        <img
                          className="w-[100px] h-[100px] rounded-lg"
                          src={
                            product.image
                              ? `data:${product.image.contentType};base64,${product.image.data}`
                              : 'default_image_url'
                          }
                          alt={product.name || 'Product Image'}
                        />
                        <div className="flex-grow">
                          <h2 className="text-lg font-medium mb-1">{product.name.slice(0, 40) + "..." || 'No Name'}</h2>
                          <p className="text-sm text-gray-500 mb-1">Seller: {product.seller || 'Unknown'}</p>
                          <div className="quantity flex items-center gap-1 ">
                            <p className='text-sm text-gray-500'>Quantity : </p>
                            <p > {product.quantity}</p>
                          </div>
                          <p className="text-lg font-semibold text-gray-800 ">₹{product.price}</p>



                        </div>

                      </div>
                    ))
                  ) : (
                    <p className='font-medium text-center mb-4 capitalize'>No cart item</p>
                  )}
                </div>

                <CartAmount totalAmount={totalAmount} ProductCount={cart.length} btn={false} />


              </div>
            )}
            <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg lg:shadow-none p-4 lg:p-0  flex items-center justify-between    ">
              <p className='md:hidden font-medium capitalize px-2 text-[18px] '> ₹{totalAmount}</p>
              <button className=" md:w-full bg-orange-500 text-white py-2 px-4 rounded-lg lg:rounded-none " onClick={() => onSubmit()}>continue</button>
            </div>
          </div> :
          <div className="p-4 max-w-7xl mx-auto relative w-full h-full bg-gray-100">
            {!login ? (
              <p className="text-center text-lg font-semibold text-red-500">Please log in first</p>
            ) : (
              <div clasName="flex flex-col lg:flex-row gap-6 mb-72">
                <div className="w-full lg:w-3/4">
                  {
                    address.street ?
                      <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                        <h2 className="text-lg font-semibold mb-2">{`Deliver to: ${loginUserDetails.userName}`}</h2>
                        <p className="text-gray-600">{`${address.street},${address.city},${address.state},${address.postalCode},${address.country}`}</p>
                        <button className="text-blue-500 hover:underline mt-2" onClick={() => navigate('/addaddress')}>Edit</button>
                      </div> :
                      <button onClick={() => navigate('/addaddress')}>Add Address</button>
                  }
                  {cartProduct.length ? (
                    cartProduct.map((product) => (
                      <div key={product._id} className="bg-white p-4 rounded-lg shadow-md flex items-center gap-4 mb-4">
                        <img
                          className="w-[100px] h-[100px] rounded-lg"
                          src={
                            product.image
                              ? `data:${product.image.contentType};base64,${product.image.data}`
                              : 'default_image_url'
                          }
                          alt={product.name || 'Product Image'}
                        />
                        <div className="flex-grow">
                          <h2 className="text-lg font-medium mb-1">{product.name.slice(0, 40) + "..." || 'No Name'}</h2>
                          <p className="text-sm text-gray-500 mb-1">Seller: {product.seller || 'Unknown'}</p>
                          <div className="quantity flex items-center gap-1 ">
                            <p className='text-sm text-gray-500'>Quantity : </p>
                            <p > {product.quantity}</p>
                          </div>
                          <p className="text-lg font-semibold text-gray-800 ">₹{product.price}</p>



                        </div>

                      </div>
                    ))
                  ) : (
                    <p className='font-medium text-center mb-4 capitalize'>No cart item</p>
                  )}
                </div>

                <CartAmount totalAmount={totalAmount} ProductCount={cart.length} btn={false} />


              </div>
            )}
            <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg lg:shadow-none p-4 lg:p-0  flex items-center justify-between    ">
              <p className='md:hidden font-medium capitalize px-2 text-[18px] '> ₹{totalAmount}</p>
              <button className=" md:w-full bg-orange-500 text-white py-2 px-4 rounded-lg lg:rounded-none " onClick={() => onSubmit()}>continue</button>
            </div>
          </div>
      }
    </div>
  );
};

export default OrderPage;

