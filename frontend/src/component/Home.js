import Carousel  from './carousel/Carousel'
import React from 'react'
import ProductCategory from './category/ProductCategory'
import Products from './Product/Products'
import ProductCarousel from './carousel/Carousel'

const Home = () => {
  return (
    <div className='flex flex-col sm:px-[16px] sm:py-[16px] sm:gap-[12px]   bg-[#F1F2F4] '>
      <ProductCategory/>
      {/* <Carousel/> */}
      <div className="h-[170px] sm:h-[230px]   w-full">
      <ProductCarousel/>

      </div>
      
      <Products/>
      
    </div>
  )
}

export default Home