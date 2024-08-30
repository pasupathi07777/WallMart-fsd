import React from 'react'
import Nav from './component/navbar/Nav'
import { Route, Routes } from 'react-router-dom'
import Login from './component/auth/Login'
import Signup from './component/auth/Signup,'
import PasswordReset from './component/auth/PasswordReset'
import Home from './component/Home'
import Dasbord from './component/admin/DasBord' 


const App = () => {


  return (
    <div className='w-[100vw] h-[100vh] flex flex-col  overflow-x-hidden overflow-y-scroll '>
      <div className="nav sticky top-0 left-0 right-0 ">
      <Nav />
      </div>
      <div className="home">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/paswordreset' element={<PasswordReset />} />
          <Route path='/admin' element={<Dasbord />} />
        </Routes>




      </div>








    </div>
  )
}

export default App