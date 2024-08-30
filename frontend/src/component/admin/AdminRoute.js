import React from 'react'
import Home from './Home'
import AllUser from './AllUser'
import AllProduct from './AllProduct'
import AllOrder from './AllOrder'
import AddProduct from './AddProduct'

const AdminRoute = ({ pageName }) => {
    return (
        <div className="">
            {pageName === "home" && <Home/>}
            {pageName === "alluser" && <AllUser />}
            {pageName === "allproduct" && <AllProduct />}
            {pageName === "addproduct" && <AddProduct />}
            {pageName === "allorder" && <AllOrder />}
        </div>
    )
}

export default AdminRoute