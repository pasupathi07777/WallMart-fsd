import React, { useState, useEffect, useContext } from 'react'
import icons from '../../data/navIcons'
import { useNavigate } from 'react-router-dom'
import { ContextProvider } from '../../service/Context';
import UserPopUp from './DropDown,';



const Nav = () => {

  const navigate = useNavigate()
  const { loginUserDetails, login, isLoading, setIsLoading } = useContext(ContextProvider)
  const [userState, setUserState] = useState(false)
  const [lodding, setLoading] = useState(true)


  useEffect(() => {






  }, [])

  const onLogin = () => {
    navigate('/login')
  }
  return (
    <nav className='flex items-center justify-between w-full  px-[16px] md:px-[32px] py-[12px] pb-[12px]  flex-wrap md:flex-nowrap gap-2 bg-[#232F3E] text-white overflow-hidden '>
      <div className="handBurgerIcon md:hidden">
        {icons.handBurgerIcon}
      </div>
      <div className="logo font-bold text-[24px] order-1 ">
        WallMart
      </div>
      <div className="search flex  items-center bg-[#F0F5FF] h-[40px]  rounded-lg w-full md:max-w-[600px] min-w-[300px] order-4 md:order-2  overflow-hidden ">

        <input type="text" placeholder='Search for products' className='focus:outline-none  px-2 py-2 w-full bg-[#F0F5FF] text-black ' />
        <p className='text-black bg-[#FEBD69] flex items-center justify-center px-2 h-full   '>{icons.searchIcon}</p>
      </div>




      {isLoading ?
        <p className='order-2 md:order-3'>Loadingff ...</p>

        :
        login ?

          < UserPopUp loginUserDetails={loginUserDetails} />

          :
          <button className='order-2 md:order-3 px-2 py-1 border rounded' onClick={() => onLogin()}>Login</button>


      }





      <div className="cart flex gap-1 order-3">
        {icons.cart}
        <div className="userName  items-start hidden sm:flex">cart</div>

      </div>

    </nav>
  )
}

export default Nav



















