import React, { useContext, useEffect, useState } from 'react';
import { ContextProvider } from '../../service/Context';
import productIcons from '../../data/productIcon';
import { useNavigate } from 'react-router-dom';
import icons from '../../data/navIcons';

const Products = () => {
    const navigate = useNavigate();
    const { allProducts,  setVisibleSearch } = useContext(ContextProvider);

    const categories = [
        "fashion",
        "mobile phones",
        "home & furniture",
        "appliances",
        "electronics",
        "grocery",
        "toys",
        "beauty",
        "sports",
    ];

    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 640);

    useEffect(() => {
        setVisibleSearch(true)
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 640);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // If no products are available, display the loading bar
    if (!allProducts || allProducts.length === 0) {
        return (
            <div className="flex justify-center items-center mt-4 ">
                {icons.loadingIcon} {/* This assumes your icons.loadingIcon is the loading bar */}
            </div>
        );
    }

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3  min-h-screen'>
            {categories.map((category, index) => {
                const filteredProducts = allProducts.filter(
                    product => product.category.toLowerCase() === category.toLowerCase()
                );

                if (filteredProducts.length) {
                    return (
                        <div
                            key={index}
                            className="rounded-lg sm:shadow-md overflow-hidden cursor-pointer transition-transform transform hover:scale-105 "
                            onClick={() => navigate(`/product/${category.toLowerCase()}`)}
                        >
                            <div className='p-4'>
                                <p className='text-xl font-semibold sm:hidden mb-2 flex items-center gap-2'>
                                    {category}
                                    {productIcons.rightArrow}
                                </p>
                                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                                    {filteredProducts.slice(0, isSmallScreen ? 2 : 3).map((product, productIndex) => (
                                        <img
                                            key={productIndex}
                                            className="w-full h-40 rounded-lg block"
                                            src={`data:${product.image.contentType};base64,${product.image.data}`}
                                            alt={product.name}
                                        />
                                    ))}
                                    {!isSmallScreen && filteredProducts.length >= 4 && (
                                        <div className="items-center justify-center text-blue-600 font-semibold hidden sm:flex">
                                            <p>Shop more</p>
                                            {productIcons.rightArrow}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                }

                return null;
            })}
        </div>
    );
};

export default Products;
