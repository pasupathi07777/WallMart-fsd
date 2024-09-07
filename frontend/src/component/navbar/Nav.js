import React, { useState, useContext } from 'react'
import icons from '../../data/navIcons'
import { useNavigate } from 'react-router-dom'
import { ContextProvider } from '../../service/Context';
import UserPopUp from './DropDown,';




const Nav = () => {

  const navigate = useNavigate()
  const { loginUserDetails, login, isLoading, cart, visibleSearch, setVisibleSearch } = useContext(ContextProvider)




  const [search, setSearch] = useState("")

  const onLogin = () => { navigate('/login') }
  const onSearch = () => {
    if (search !== "") {
      navigate(`/search/${search}`)
      setSearch("")
    }
  }
  return (
    <nav className='flex items-center justify-between w-full  px-[16px] md:px-[32px] py-[12px] pb-[12px]  flex-wrap md:flex-nowrap gap-2 bg-[#232F3E] text-white  z-50 rounded-sm overflow-hidden  '>
     
      <div className="logo font-bold text-[24px] order-1 ">
        WallMart
      </div>
      {
        visibleSearch &&
        <div className="search flex  items-center bg-[#F0F5FF] h-[40px]  rounded-lg w-full md:max-w-[600px] min-w-[300px] order-4 md:order-2  overflow-hidden ">

          <input type="text" placeholder='Search for products' value={search} className='focus:outline-none  px-2 py-2 w-full bg-[#F0F5FF] text-black ' onChange={(e) => setSearch(e.target.value)} />
          <p className='text-black bg-[#FEBD69] flex items-center justify-center px-2 h-full   ' onClick={() => { onSearch() }}>{icons.searchIcon}</p>
        </div>
      }





      {isLoading ?
        <p className='order-2 md:order-3 text-[10px] '>{icons.loadingIcon}</p>

        :
        login ?

          < UserPopUp loginUserDetails={loginUserDetails} />

          :
          <button className='order-2 md:order-3 px-2 py-1 border rounded' onClick={() => onLogin()}>Login</button>


      }





   

      <div className="flex items-center gap-2 order-3" onClick={() => navigate('/cart')}>


        <div className='relative'>
          {icons.cart}
          <span className='absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full px-1 py-0.5'>{cart.length}</span> {/* Example for cart item count */}
        </div>
        <div className="hidden sm:flex items-center text-sm">
          Cart
        </div>
      </div>

    </nav>
  )
}

export default Nav



















