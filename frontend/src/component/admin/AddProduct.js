// import axios from 'axios'
// import React, { useState } from 'react';
// import './AddProduct.css'
// const AddProduct = () => {
//   const [name, setName] = useState("");
//   const [price, setPrice] = useState("");
//   const [description, setDescription] = useState("");
//   const [category, setCategory] = useState("");
//   const [stock, setStock] = useState(0);
//   const [seller, setSeller] = useState("");
//   const [images, setImages] = useState("");
//   const [image, setImage] = useState("");


//   // const [imagesPreview, setImagesPreview] = useState([]);
//   const [imagesPreview, setImagesPreview] = useState("");


//   const categories = [
//     "fashion",
//     "Electronics",
//     "Mobile Phones",
//     "appliances",
//     "grocery",
//     "toys",
//     "beauty",
//     "Sports",
//     "home & Furniture"
//   ];

//   const onImagesChange = (e) => {
//     // const files = Array.from(e.target.files);
//     // files.forEach(file => {
//     //   const reader = new FileReader();
//     //   reader.onload = () => {
//     //     if (reader.readyState === 2) {
//     //       setImagesPreview(oldArray => [...oldArray, reader.result]);
//     //       setImages(oldArray => [...oldArray, file]);

//     //     }
//     //   };
//     //   reader.readAsDataURL(file);
//     // });

//     console.log(e.target.files[0])
//     setImagesPreview(e.target.files[0])
//     setImage(e.target.files[0])
//     const reader = new FileReader
//     reader.onload = () => {
//       if (reader.readyState === 2) {
//         // setImagesPreview(reader.result)
//         setImages(reader.result)

//       }
//     }
//     reader.readAsDataURL(e.target.files[0])
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     // formData.append('name', name);
//     // formData.append('price', price);
//     // formData.append('description', description);
//     // formData.append('imagesPreview', imagesPreview);
//     // formData.append('category', category);
//     // formData.append('seller', seller);
//     // formData.append('seller', seller);
//     // console.log({ name, price, description, imagesPreview, category, seller, seller });
//     // console.log(formData)

//     formData.append('name', name);
//     formData.append('price', price);
//     formData.append('description', description);
//     formData.append('image', image);
//     formData.append('category', category);
//     formData.append('stock', stock);
//     formData.append('seller', seller);





//     try {
//       const responce = await axios.post("http://localhost:5000/api/addproduct", formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       })

//       console.log(responce.data)
//     } catch (error) {
//       console.log(error)
//     }


//   };








//   return (
//     <div className="addProduct-form flex flex-col w-full">

//       <div className="flex gap-2 flex-col  items-center  w-full  sm:px-[12px] py-[24px]">

//         <form
//           onSubmit={submitHandler}
//           className="addProduct-form flex flex-col gap-2 max-w-[600px] w-full md:px-[34px] md:py-[32px] rounded px-[12px] "
//           encType='multipart/form-data'
//         >

//           <h1 className="font-bold text-start text-[32px] ">New Product</h1>


//           <div className="flex flex-col">
//             <label htmlFor="name_field" className='text-gray-700 font-medium'>Name</label>
//             <input
//               type="text"
//               id="name_field"
//               className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
//               onChange={e => setName(e.target.value)}
//               value={name}
//             />
//           </div>

//           <div className="flex flex-col">
//             <label htmlFor="price_field" className='text-gray-700 font-medium'>Price</label>
//             <input
//               type="text"
//               id="price_field"
//               className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
//               onChange={e => setPrice(e.target.value)}
//               value={price}
//             />
//           </div>

//           <div className="flex flex-col">
//             <label htmlFor="description_field" className='text-gray-700 font-medium'>Description</label>
//             <textarea
//               className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
//               id="description_field"
//               rows="8"
//               onChange={e => setDescription(e.target.value)}
//               value={description}
//             ></textarea>
//           </div>

//           <div className="flex flex-col">
//             <label htmlFor="category_field" className='text-gray-700 font-medium'>Category</label>
//             <select
//               onChange={e => setCategory(e.target.value)}
//               className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
//               id="category_field"
//             >
//               <option value="">Select</option>
//               {categories.map(category => (
//                 <option key={category} value={category}>{category}</option>
//               ))}
//             </select>
//           </div>

//           <div className="flex flex-col">
//             <label htmlFor="stock_field" className='text-gray-700 font-medium'>Stock</label>
//             <input
//               type="number"
//               id="stock_field"
//               className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
//               onChange={e => setStock(e.target.value)}
//               value={stock}
//             />
//           </div>

//           <div className="flex flex-col">
//             <label htmlFor="seller_field" className='text-gray-700 font-medium'>Seller Name</label>
//             <input
//               type="text"
//               id="seller_field"
//               className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
//               onChange={e => setSeller(e.target.value)}
//               value={seller}
//             />
//           </div>

//           <div className="flex flex-col">
//             <label className="text-gray-700 font-medium">Images</label>
//             <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
//               <span className="flex-1 px-3 text-gray-500">Choose Images</span>
//               <label
//                 className="px-4 py-2 bg-gray-200 text-gray-600 cursor-pointer"
//                 htmlFor="customFile"
//               >
//                 Browse
//               </label>
//               <input
//                 type="file"
//                 name="product_images"
//                 className="hidden"
//                 id="customFile"
//                 multiple
//                 onChange={onImagesChange}
//               />
//             </div>
//             <div className="flex gap-2 mt-2">
//               {/* {imagesPreview.map(image => ( */}
//               {images && <img
//                 className="mt-3 mr-2"
//                 // key={image}
//                 src={images}
//                 alt="Image Preview"
//                 width="55"
//                 height="52"
//               />}
//               {/* ))}  */}
//             </div>
//           </div>

//           <button
//             id="login_button"
//             type="submit"
//             className="mt-4 bg-[#FA9C23] rounded text-white py-3"
//           >
//             CREATE
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddProduct;


// // three 


import axios from 'axios';
import React, { useState } from 'react';

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [seller, setSeller] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const categories = [
    "fashion",
    "electronics",
    "mobile Phones",
    "appliances",
    "grocery",
    "toys",
    "beauty",
    "sports",
    "home & Furniture"
  ];

  const onImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('image', image);
    formData.append('category', category);
    formData.append('stock', stock);
    formData.append('seller', seller);

    try {
      const response = await axios.post("http://localhost:5000/api/addproduct", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="addProduct-form flex flex-col items-center w-full p-6 bg-gray-100 min-h-screen">
      <form
        onSubmit={submitHandler}
        className="flex flex-col gap-4 w-full max-w-xl bg-white p-8 rounded-lg shadow-md"
        encType="multipart/form-data"
      >
        <h1 className="text-2xl font-bold mb-4">New Product</h1>

        <div className="flex flex-col">
          <label htmlFor="name_field" className="text-gray-700 font-medium">Name</label>
          <input
            type="text"
            id="name_field"
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            onChange={e => setName(e.target.value)}
            value={name}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="price_field" className="text-gray-700 font-medium">Price</label>
          <input
            type="text"
            id="price_field"
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            onChange={e => setPrice(e.target.value)}
            value={price}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="description_field" className="text-gray-700 font-medium">Description</label>
          <textarea
            id="description_field"
            rows="4"
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            onChange={e => setDescription(e.target.value)}
            value={description}
          ></textarea>
        </div>

        <div className="flex flex-col">
          <label htmlFor="category_field" className="text-gray-700 font-medium">Category</label>
          <select
            id="category_field"
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            onChange={e => setCategory(e.target.value)}
            value={category}
          >
            <option value="">Select</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="stock_field" className="text-gray-700 font-medium">Stock</label>
          <input
            type="number"
            id="stock_field"
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            onChange={e => setStock(e.target.value)}
            value={stock}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="seller_field" className="text-gray-700 font-medium">Seller Name</label>
          <input
            type="text"
            id="seller_field"
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            onChange={e => setSeller(e.target.value)}
            value={seller}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">Images</label>
          <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
            <span className="flex-1 px-3 text-gray-500">Choose Image</span>
            <label className="px-4 py-2 bg-gray-200 text-gray-600 cursor-pointer" htmlFor="customFile">
              Browse
            </label>
            <input
              type="file"
              id="customFile"
              className="hidden"
              onChange={onImageChange}
            />
          </div>
          {imagePreview && (
            <div className="mt-3">
              <img src={imagePreview} alt="Image Preview" className="w-20 h-20 object-cover rounded-md" />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="mt-4 bg-[#FA9C23] rounded text-white py-3"
        >
          CREATE
        </button>
      </form>
    </div>
  );
};

export default AddProduct;


