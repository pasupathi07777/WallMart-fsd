import React from 'react';
import { Carousel } from 'antd';
import { caruselImages } from '../../data/carouselData';
const contentStyle = {
    margin: 0,
    
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};
const ProductCarousel = () => (
    <>
        <Carousel  arrows infinite={false}>
            {caruselImages.map((e, i) => (
                <div key={i} className='h-full w-full flex justify-center items-center z-10'>
                    <img className='w-full  h-[170px] sm:h-[230px] z-10 ' src={e.image} alt="" srcSet="" />
                </div>

            ))}
        </Carousel>
        <br />

    </>
);
export default ProductCarousel;