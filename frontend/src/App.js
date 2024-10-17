// import React, { useEffect } from 'react'
// import Nav from './component/navbar/Nav'
// import { Route, Routes, useLocation } from 'react-router-dom'
// import Login from './component/auth/Login'
// import Signup from './component/auth/Signup,'
// import PasswordReset from './component/auth/PasswordReset'
// import Home from './component/Home'
// import Dasbord from './component/admin/DasBord'
// import ProductRoute from './component/Product/ProductRoute'
// import Pro from './component/Product/Pro'
// import UserProfile from './component/profile/UserProfile'
// import AllProduct from './component/admin/AllProduct'
// import AllOrder from './component/admin/AllOrder'
// import AllUser from './component/admin/AllUser'
// import AddProduct from './component/admin/AddProduct'
// import Cart from './component/cart/Cart'
// import SearchList from './component/search/SearchList'
// import Footer from './component/footer/Footer'
// import OrderPage from './component/order/OrderPage'
// import AddressForm from './component/order/AddressForm'
// import Payment from './component/order/Payment'
// import ConformOrder from './component/order/ConformOrder'
// import MyOrder from './component/order/MyOrder'
// import PopUp from './component/popup/PopUp'
// import EditAdminProduct from './component/admin/EditAdminProduct'
// import Loader from './component/animation/LoaderAnimation'
// import CartLoder from './component/animation/CartLoder'
// import ScrollToTop from './component/ScrollToTop'


// const App = () => {
//   const { pathname } = useLocation();

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [pathname.pathname]);


//   return (
//     <div className='w-[100vw] h-[100vh] overflow-hidden  flex flex-col overflow-y-scroll   '>

//       <div className="nav sticky top-0 left-0 right-0 z-50 rounded-md  ">
//         <Nav />
//         <Loader />


//       </div>
//       <div className="home w-full h-screen">
//         <ScrollToTop /> {/* Add ScrollToTop here */}
//         <Routes>
//           <Route path='*' element={<Home />} />
//           <Route path='/' element={<Home />} />
//           <Route path='/login' element={<Login />} />
//           <Route path='/signup' element={<Signup />} />
//           <Route path='/paswordreset' element={<PasswordReset />} />
//           <Route path='/admin' element={<Dasbord />} />
//           <Route path='/product/:id' element={<ProductRoute />} />
//           <Route path='/:productId/:proId' element={<Pro />} />
//           <Route path='/userprofile' element={<UserProfile />} />
//           {/* admin route */}
//           <Route path='/admin/viewproducts' element={<AllProduct />} />
//           <Route path='/admin/order' element={<AllOrder />} />
//           <Route path='/admin/allusers' element={<AllUser />} />
//           <Route path='/admin/addproduct' element={<AddProduct />} />
//           <Route path='/admin/editproduvt/:id' element={<EditAdminProduct />} />

//           {/* cart */}
//           <Route path='/cart' element={<Cart />} />
//           <Route path='/address/:id' element={<AddressForm />} />


//           {/* search */}
//           <Route path='/search/:id' element={<SearchList />} />
//           {/* order page */}
//           <Route path='/orderpage/:id' element={<OrderPage />} />
//           <Route path='/payment/:id' element={<Payment />} />
//           <Route path='/success' element={<ConformOrder />} />
//           <Route path='/orders' element={<MyOrder />} />



//         </Routes>
//         <div className="mt-auto">
//           <Footer />

//         </div>




//       </div>

//     </div>
//   )
// }

// export default App



import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Nav from './component/navbar/Nav';
import Login from './component/auth/Login';
import Signup from './component/auth/Signup';
import PasswordReset from './component/auth/PasswordReset';
import Home from './component/Home';
import Dasbord from './component/admin/DasBord';
import ProductRoute from './component/Product/ProductRoute';
import Pro from './component/Product/Pro';
import UserProfile from './component/profile/UserProfile';
import AllProduct from './component/admin/AllProduct';
import AllOrder from './component/admin/AllOrder';
import AllUser from './component/admin/AllUser';
import AddProduct from './component/admin/AddProduct';
import Cart from './component/cart/Cart';
import SearchList from './component/search/SearchList';
import Footer from './component/footer/Footer';
import OrderPage from './component/order/OrderPage';
import AddressForm from './component/order/AddressForm';
import Payment from './component/order/Payment';
import ConformOrder from './component/order/ConformOrder';
import MyOrder from './component/order/MyOrder';
import EditAdminProduct from './component/admin/EditAdminProduct';
import Loader from './component/animation/LoaderAnimation';
import ScrollToTop from './component/ScrollToTop';

const App = () => {
  const location = useLocation();

  useEffect(() => {
    console.log("Current path:", location.pathname);
  }, [location.pathname]);

  return (
  <div className='w-[100vw] overflow-y-scroll min-h-screen      flex flex-col justify-center items-center '>
    <ScrollToTop/>
     {/* sm:pr-4 */}
      <div className="nav fixed w-full  top-0 left-0 right-0 z-50 ">
        <Nav />
        <Loader />
      </div>
      <div className="home mt-[60px]  w-full min-h-screen overflow-y-auto ">
        <Routes>
          <Route path='*' element={<Home />} />
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/passwordreset' element={<PasswordReset />} />
          <Route path='/admin' element={<Dasbord />} />
          <Route path='/product/:id' element={<ProductRoute />} />
          <Route path='/:productId/:proId' element={<Pro />} />
          <Route path='/userprofile' element={<UserProfile />} />
          {/* Admin routes */}
          <Route path='/admin/viewproducts' element={<AllProduct />} />
          <Route path='/admin/order' element={<AllOrder />} />
          <Route path='/admin/allusers' element={<AllUser />} />
          <Route path='/admin/addproduct' element={<AddProduct />} />
          <Route path='/admin/editproduct/:id' element={<EditAdminProduct />} />
          {/* Cart */}
          <Route path='/cart' element={<Cart />} />
          <Route path='/address/:id' element={<AddressForm />} />
          {/* Search */}
          <Route path='/search/:id' element={<SearchList />} />
          {/* Order page */}
          <Route path='/orderpage/:id' element={<OrderPage />} />
          <Route path='/payment/:id' element={<Payment />} />
          <Route path='/success' element={<ConformOrder />} />
          <Route path='/orders' element={<MyOrder />} />
        </Routes>
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default App;








