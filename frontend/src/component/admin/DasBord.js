import React, { useState } from 'react'
import AdminRoute from './AdminRoute'



const Dasbord = () => {

    const [pageName, setPageName] = useState("home")
    return (
        <div className=" flex  w-full h-full overflow-y-auto ">
            <div className="dasbord-menu w-[150px] bg-[#232F3E] flex flex-col  min-h-[100vh] h-full py-2 px-2 text-white ">

                <ul className='mt-2 flex flex-col gap-2 '>
                    <h1 className='' onClick={() => setPageName("home")}>Dashboard</h1> 
                    <li onClick={() => setPageName("allproduct")}>All Product</li>
                    <li onClick={() => setPageName("addproduct")}>Add Product</li>
                    <li onClick={() => setPageName("alluser")}>user</li>

                </ul>


            </div>
            <div className="dasbord w-full">
              
                <AdminRoute pageName={pageName} />


            </div>

        </div>
    )
}

export default Dasbord