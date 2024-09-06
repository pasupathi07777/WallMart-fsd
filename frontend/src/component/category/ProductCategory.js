import React from 'react'
import { category } from '../../data/productCatagory'
import './ProductCategory.css'
import {useNavigate} from 'react-router-dom'



const ProductCategory = () => {
    const navigate=useNavigate()
    return (
        <div className='Category  flex md:gap-3 bg-white py-[12px] md:py-[12px] flex-shrink-0  overflow-x-auto rounded-md  '>
            {category.map((e, i) => (
                <div className="w-[100px] md:w-[120px] flex-grow flex flex-col justify-center flex-shrink-0 items-center gap-2 " onClick={()=>navigate(`/product/${e.category}`)} key={i}>
                    <img src={e.image} alt="" className='w-[70px] h-[70px]' />
                    <p className='text-[12px] sm:text-[14px] text-center font-medium capitalize'>{e.category}</p>
                </div>

            ))}


        </div>
    )
}

export default ProductCategory




