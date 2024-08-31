
// import React, { useContext } from 'react';
// import { ContextProvider } from '../../service/Context';
// import productIcons from '../../data/productIcon';
// import { useNavigate } from 'react-router-dom';


// const Products = () => {
//     const navigate = useNavigate()
//     const { allProducts } = useContext(ContextProvider);
//     const categories = [
//         // "fashion",
//         // "Mobile Phones",
//         // "Electronics",
//         // "Laptops",
//         // "Accessories",
//         // "Headphones",
//         // "Food",
//         // "Books",
//         // "Clothes",
//         // "Beauty",
//         // "Sports",
//         // "Outdoor",
//         // "Home"
//         "fashion",
//         "electronics",
//         "mobile Phones",
//         "appliances",
//         "grocery",
//         "toys",
//         "beauty",
//         "sports",
//         "home & Furniture"
//     ];

//     return (
//         <div className='grid grid-cols-1 sm:flex gap-[12px] sm:flex-wrap'>
//             {categories.map((category, index) => {
//                 const filteredProducts = allProducts.filter(product => product.category.toLocaleLowerCase() === category.toLocaleLowerCase());

//                 return (
//                     <div key={index} className="w-full flex flex-col gap-1 sm:w-[49%] bg-white rounded p-2"
//                         onClick={() => navigate(`/product/${category}`)} >
//                         <p className='capitalize font-bold md:hidden flex gap-1 items-center'>{category}{productIcons.rightArrow}</p>
//                         <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:flex-grow ">
//                             {filteredProducts.slice(0, 6).map((product, productIndex) => (
//                                 productIndex !== 5 ?
//                                     <img
//                                         key={productIndex}
//                                         className={`w-full h-[270px] rounded ${productIndex === 4 ? "hidden md:block" : "block"}   `}
//                                         src={`data:${product.image.contentType};base64,${product.image.data}`}
//                                         alt={product.name}
//                                         srcSet=""

//                                     /> :
//                                     <p className='font-bold capitalize items-center hidden md:flex  m-auto  gap-1'>shop more{productIcons.rightArrow}</p>
//                             ))}
//                         </div>
//                     </div>
//                 );
//             })}
//         </div>
//     );
// };

// export default Products;


import React, { useContext } from 'react';
import { ContextProvider } from '../../service/Context';
import productIcons from '../../data/productIcon';
import { useNavigate } from 'react-router-dom';

const Products = () => {
    const navigate = useNavigate();
    const { allProducts } = useContext(ContextProvider);
    const categories = [
        "fashion",
        "electronics",
        "mobile phones",
        "appliances",
        "grocery",
        "toys",
        "beauty",
        "sports",
        "home & furniture"
    ];

    return (
        <div className=' grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 '>
            {categories.map((category, index) => {
                const filteredProducts = allProducts.filter(product => product.category.toLowerCase() === category.toLowerCase());

                return (
                    <div
                        key={index}
                        className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform transform hover:scale-100"
                        onClick={() => navigate(`/product/${category.toLocaleLowerCase()}`)}
                    >
                        <div className='p-4'>
                            <p className='text-xl font-semibold mb-2 flex items-center gap-2'>
                                {category}
                                {productIcons.rightArrow}
                            </p>
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-4">
                                {filteredProducts.slice(0, 6).map((product, productIndex) => (
                                    productIndex !== 5 ? (
                                        <img
                                            key={productIndex}
                                            className={`w-full h-40  rounded-lg ${productIndex === 4 ? "hidden md:block" : "block"}`}
                                            src={`data:${product.image.contentType};base64,${product.image.data}`}
                                            alt={product.name}
                                        />
                                    ) : (
                                        <div key={productIndex} className="flex items-center justify-center text-blue-600 font-semibold hidden md:flex">
                                            <p>Shop more</p>
                                            {productIcons.rightArrow}
                                        </div>
                                    )
                                ))}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Products;



