import { createContext, useEffect, useState } from "react";
import axios from 'axios'
export const ContextProvider = createContext()




const Context = ({ children }) => {

  const [loginUserDetails, setLoginUserDetails] = useState({})
  const [allProducts, setAllProducts] = useState([])
  const [allUsers, setAllUsers] = useState([])
  const [login, setLogin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)


  const userStatus = async (gmail) => {
    try {
      const responce = await axios.get("http://localhost:5000/api/loginstatus", { params: { gmail: gmail } })
      setLoginUserDetails(responce.data)
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





  useEffect(() => {
    getAllUsers()
    getProduct()
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
  }, [loginUserDetails, logIn, allProducts])












  return (
    <ContextProvider.Provider value={{

      // user auth 
      signUp, logIn, logOut, passwordReset, logOut,
      // user status
      loginUserDetails, login, isLoading, setIsLoading, setLogin,
      // all product 
      allProducts,
      // all users
      allUsers



    }}>
      {children}

    </ContextProvider.Provider>
  )
}

export default Context
