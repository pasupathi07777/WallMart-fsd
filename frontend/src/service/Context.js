import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { Await } from "react-router-dom";
export const ContextProvider = createContext()





const Context = ({ children }) => {




  // port
  const PORT = "http://localhost:5000/api"

  // search status
  const [visibleSearch, setVisibleSearch] = useState(true)



  const [loginUserDetails, setLoginUserDetails] = useState({})
  const [allProducts, setAllProducts] = useState([])
  const [allUsers, setAllUsers] = useState([])
  const [login, setLogin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  // cart
  const [cart, setCart] = useState([])
  const [cartMessage, setCartMessage] = useState("")

  // adddress
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: ''
  });

  // my order
  const [myOrders, setMyOrders] = useState([])




  const userStatus = async (gmail) => {
    try {
      const responce = await axios.get("http://localhost:5000/api/loginstatus", { params: { gmail: gmail } })
      setLoginUserDetails(responce.data)
      setLogin(responce.data.login)
      setCart(responce.data.cart)
      console.log(responce.data.address)
      if (responce.data.address) {
        setAddress(responce.data.address)

      }
      if (responce.data.orders) {
        setMyOrders(responce.data.orders)

      }



      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      setLogin(false)
    }
  }
  // userlogin
  const logIn = async (state) => {
    try {
      const responce = await axios.get("http://localhost:5000/api/login", {
        params: state
      })
      return responce.data
    } catch (error) {
      return error.response.data
    }
  }
  // user signup
  const signUp = async (state) => {
    try {
      const responce = await axios.post("http://localhost:5000/api/signup", state)
      return responce
    } catch (error) {
      return error
    }
  }
  // password reset
  const passwordReset = async (state) => {
    try {
      const responce = await axios.post("http://localhost:5000/api/passwordreset", state)

      return responce.data
    } catch (error) {
      return error.response.data



    }

  }
  // logout
  const logOut = async (state) => {
    console.log(state)
    try {
      const responce = await axios.post("http://localhost:5000/api/logout", state)
      console.log(responce.data.success)

      if (responce.data.success) {
        let status = JSON.parse(localStorage.getItem("wallMat"));
        status.login = false
        localStorage.setItem("wallMat", JSON.stringify(status));
        setLogin(false)
      }
      return responce.data
    } catch (e) {

    }

  }

  // get all Products 
  const getProduct = async () => {
    try {
      const product = await axios.get("http://localhost:5000/api/getproduct")
      setAllProducts(product.data.allProducts)

    } catch (error) {
      console.log(error)

    }

  }

  // add product
  const addProduct=async (formData)=>{
    try {
      const response = await axios.post("http://localhost:5000/api/addproduct", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data.product);

      setAllProducts([...allProducts,response.data.product])
      return true
    } catch (error) {
      console.error(error);
    }
  }

  // update product

  const updateProduct = async (id, form) => {
    console.log(id, form)
    
    try {
      // Make the patch request to update the product
      const product = await axios.patch(`${PORT}/updateproductdata/${id}`, form)
      
      // Map through the existing products and update the matching one
      const editedAllProducts = allProducts.map((pro) => {
        if (pro._id === id) {
          // Return a new product object instead of mutating the original one
          return {
            ...pro,
            ...product.data.product
          }
        }
        return pro
      })
      
      // Update the state with the edited product array
      setAllProducts(editedAllProducts)
      
      // Return success
      return true
  
    } catch (error) {
      // Log the error and handle it accordingly
      console.log(error)
      return false
    }
  }
  

  const getAllUsers = async () => {
    try {
      const users = await axios.get("http://localhost:5000/api/allusers")
      setAllUsers(users.data.users)
      // console.log(users.data.users)
    } catch (error) {
      console.log(error)

    }
  }

  // cart

  // State to store quantity for each product
  const [quantities, setQuantities] = useState({});
  const [cartProduct, setCartProduct] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);


  const getCartProduct = async () => {
    const cartItems = await cart.map((cartItem) => {
      const product = allProducts.find((product) => product._id.toString() === cartItem.productId.toString());

      if (product) {
        return {
          ...product,
          quantity: cartItem.quantity || 1
        };
      }

      return null;
    })
    setCartProduct(cartItems);

  }

  const getTotalAmount = async () => {
    const newTotalAmount = cartProduct.reduce((acc, item) => {
      return acc + (parseFloat(item.price.replace(/,/g, '')) * item.quantity);
    }, 0);
    setTotalAmount(newTotalAmount)
  }



  const updateQuantity = (productId, newQuantity) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [productId]: newQuantity
    }));
    console.log(quantities)
  };

  const addCart = async (productId, quantity) => {

    const existingProduct = cart.find(pro => pro.productId == productId);
    // if (existingProduct) {
    //   return setCartMessage("Aleredy Added ...")

    // }

    console.log(productId, quantity, loginUserDetails._id)
    try {
      const cart = await axios.put(`${PORT}/addcart/${loginUserDetails._id}`, { productId, quantity })
      setCart(cart.data.user.cart)
      console.log(cart.data.user.cart)

    } catch (error) {
      console.log(error)

    }
  }

  const removePRoductInCart = async (productId) => {
    console.log(productId)
    try {
      const cart = await axios.put(`${PORT}/removecartitem/${loginUserDetails._id}`, { productId })
      setCart(cart.data.user.cart)
      return cart.data

    } catch (error) {
      console.log(error)

    }
  }

  const removeAllInCart = async () => {

    try {
      const cart = await axios.delete(`${PORT}/removeallincart/${loginUserDetails._id}`)
      console.log(cart)
      setCart(cart.data.cart)
      return cart.data

    } catch (error) {
      console.log(error)
      return error.responce

    }

  }

  // add address 
  const addAddress = async (add) => {
    try {
      const address = await axios.patch(`${PORT}/addaddress/${loginUserDetails._id}`, add)
      return address.data


    } catch (e) {

      console.log(e.message)
    }
  }

  // order 
  const [orderDetails, setOrderDetails] = useState([])

  const [paymentStatus, setPaymentStatus] = useState(false)

  const placeOrder = async (products) => {
    try {
      const responce = await axios.patch(`${PORT}/addorder/${loginUserDetails._id}`, products)
      console.log(responce)
      return responce.data

    } catch (error) {
      console.log(error)
      return error.responce

    }

  }

  // admin edit order 

  const adminEditOrderStatus = async (status) => {
    console.log(status)

    try {
      const responce = await axios.patch(`${PORT}/adminEditOrderStatus/${loginUserDetails._id}`, status)
      const updatedUsers = responce.data.users;
      const updatedUser = updatedUsers.find(user => user._id === loginUserDetails._id);
      setAllUsers(responce.data.users)
      setMyOrders(updatedUser.orders)

      return true



    } catch (error) {
      console.log(error)
      return false


    }

  }
  const adminDeleteOrder = async (orderId) => {


    try {
      const responce = await axios.patch(`${PORT}/adminDeleteOrder`, { orderId })
      const updatedUsers = responce.data.users;
      const updatedUser = updatedUsers.find(user => user._id === loginUserDetails._id);
      setAllUsers(responce.data.users)
      setMyOrders(updatedUser.orders)
      return true



    } catch (error) {
      console.log(error)


    }

  }








  useEffect(() => {
    // for admin 
    getAllUsers()
    getProduct()

    // user auth 
    let status = JSON.parse(localStorage.getItem("wallMat"));
    if (status === null) {
      setIsLoading(false)
      setLogin(false)
      status = {
        login: false,
        gmail: null
      };
      localStorage.setItem("wallMat", JSON.stringify(status));
    } else if (status.login === true) {
      userStatus(status.gmail)
      setLogin(true)

    } else if (status.login === false) {
      setIsLoading(false)
      setLogin(false)
    }


  }, [login])


  useEffect(() => {
    // console.log(loginUserDetails)
    // console.log(login)
    // console.log(allProducts)
    // console.log(cart)
    // console.log(cartCount)
    console.log(myOrders)

  }, [loginUserDetails, logIn, allProducts, quantities, cartMessage])












  return (
    <ContextProvider.Provider value={{

      // user auth 
      signUp, logIn, logOut, passwordReset, logOut,
      // user status
      loginUserDetails, login, isLoading, setIsLoading, setLogin,
      // all product 
      allProducts, updateProduct,addProduct,
      // all users
      allUsers,
      // cart
      addCart, cart, quantities, setQuantities, updateQuantity, removePRoductInCart, cartProduct, setCartProduct,
      totalAmount, setTotalAmount, getCartProduct, getTotalAmount, removeAllInCart, setCart,

      // add address
      addAddress, address, setAddress,
      // order details
      orderDetails, setOrderDetails, paymentStatus, setPaymentStatus,
      // payment
      placeOrder
      // orders
      , setMyOrders, myOrders, adminEditOrderStatus, adminDeleteOrder
      // search feture 
      ,
      visibleSearch, setVisibleSearch





    }}>
      {children}

    </ContextProvider.Provider>
  )
}

export default Context
