import React from 'react'
import { category } from '../../data/productCatagory'




const ProductCategory = () => {
    return (
        <div className='Category flex md:gap-3 bg-white md:py-[12px] flex-shrink-0  overflow-x-auto  '>
            {category.map((e, i) => (
                <div className="w-[100px] md:w-[120px] flex-grow flex flex-col justify-center flex-shrink-0 items-center gap-2 " key={i}>
                    <img src={e.image} alt="" className='w-[70px] h-[70px]' />
                    <p className='text-[12px] sm:text-[14px] text-center font-medium capitalize'>{e.category}</p>
                </div>

            ))}


        </div>
    )
}

export default ProductCategory