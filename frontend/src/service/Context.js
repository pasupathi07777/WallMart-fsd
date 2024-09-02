import { createContext, useEffect, useState } from "react";
import axios from 'axios'
export const ContextProvider = createContext()




const Context = ({ children }) => {

  // port
  const PORT = "http://localhost:5000/api"

  const [loginUserDetails, setLoginUserDetails] = useState({})
  const [allProducts, setAllProducts] = useState([])
  const [allUsers, setAllUsers] = useState([])
  const [login, setLogin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  // cart
  const [cart, setCart] = useState([])
  const [cartMessage, setCartMessage] = useState("")



  const userStatus = async (gmail) => {
    try {
      const responce = await axios.get("http://localhost:5000/api/loginstatus", { params: { gmail: gmail } })
      setLoginUserDetails(responce.data)
      setCart(responce.data.cart)
      setLogin(responce.data.login)
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

  const getAllUsers = async () => {
    try {
      const users = await axios.get("http://localhost:5000/api/allusers")
      setAllUsers(users.data.users)
      console.log(users.data.users)
    } catch (error) {
      console.log(error)

    }
  }

  // cart

  // State to store quantity for each product
  const [quantities, setQuantities] = useState({});

  // Function to update the quantity for a specific product
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
      console.log(cart.data.user.cart)

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
    console.log(cartMessage)

  }, [loginUserDetails, logIn, allProducts, quantities, cartMessage])












  return (
    <ContextProvider.Provider value={{

      // user auth 
      signUp, logIn, logOut, passwordReset, logOut,
      // user status
      loginUserDetails, login, isLoading, setIsLoading, setLogin,
      // all product 
      allProducts,
      // all users
      allUsers,
      // cart
      addCart, cart, quantities, setQuantities, updateQuantity,removePRoductInCart



    }}>
      {children}

    </ContextProvider.Provider>
  )
}

export default Context
