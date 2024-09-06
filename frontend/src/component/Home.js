
import React, { useContext, useEffect } from 'react'
import ProductCategory from './category/ProductCategory'
import Products from './Product/Products'
import ProductCarousel from './carousel/Carousel'
import { ContextProvider } from '../service/Context'

const Home = () => {
  const {visibleSearch,setVisibleSearch}=useContext(ContextProvider)

  // useEffect(()=>{
  //   setVisibleSearch(true)

  // },[])
  return (
    <div className='flex flex-col sm:px-[16px] sm:py-[16px] sm:gap-[12px]  min-h-screen  bg-[#F1F2F4] '>
      <ProductCategory />
     
      <div className="h-[170px] sm:h-[230px]   w-full">
        <ProductCarousel />

      </div>

      <Products />

    </div>
  )
}

export default Home