import Carousel  from './carousel/Carousel'
import React from 'react'
import ProductCategory from './category/ProductCategory'

const Home = () => {
  return (
    <div className='flex flex-col sm:px-[16px] sm:py-[16px] gap-[16px] bg-[#F1F2F4] '>
      <ProductCategory/>
      <Carousel/>
    </div>
  )
}

export default Home