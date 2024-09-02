import React from 'react'
import Nav from './component/navbar/Nav'
import { Route, Routes } from 'react-router-dom'
import Login from './component/auth/Login'
import Signup from './component/auth/Signup,'
import PasswordReset from './component/auth/PasswordReset'
import Home from './component/Home'
import Dasbord from './component/admin/DasBord'
import ProductRoute from './component/Product/ProductRoute'
import Pro from './component/Product/Pro'
import UserProfile from './component/profile/UserProfile'
import AllProduct from './component/admin/AllProduct'
import AllOrder from './component/admin/AllOrder'
import AllUser from './component/admin/AllUser'
import AddProduct from './component/admin/AddProduct'
import Cart from './component/cart/Cart'


const App = () => {


  return (
    <div className='w-[100vw] h-[100vh] flex flex-col  overflow-x-hidden overflow-y-scroll '>
      <div className="nav sticky top-0 left-0 right-0 z-50 ">
        <Nav />
      </div>
      <div className="home">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/paswordreset' element={<PasswordReset />} />
          <Route path='/admin' element={<Dasbord />} />
          <Route path='/product/:id' element={<ProductRoute />} />
          <Route path='/:productId/:proId' element={<Pro />} />
          <Route path='/userprofile' element={<UserProfile />} />
          {/* admin route */}
          <Route path='/admin/viewproducts' element={<AllProduct />} />
          <Route path='/admin/order' element={<AllOrder />} />
          <Route path='/admin/allusers' element={<AllUser />} />
          <Route path='/admin/addproduct' element={<AddProduct />} />

          {/* cart */}
          <Route path='/cart' element={<Cart />} />


        </Routes>




      </div>








    </div>
  )
}

export default App