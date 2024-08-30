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
const App = () => (
    <>
        <Carousel  arrows infinite={false}>
            {caruselImages.map((e, i) => (
                <div key={i}>
                    <img className='w-full h-[150px] md:h-[250px]' src={e.image} alt="" srcSet="" />
                </div>

            ))}
        </Carousel>
        <br />

    </>
);
export default App;