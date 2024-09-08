import React, { useContext, useEffect, useState } from 'react';
import { ContextProvider } from '../../service/Context';
import usePopUp from '../popup/PopUp';
import { useNavigate } from 'react-router-dom';
const AddProduct = () => {
  const { triggerPopUp, PopUp } = usePopUp();
  const navigate = useNavigate()
  const { setVisibleSearch, addProduct,login } = useContext(ContextProvider)

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [seller, setSeller] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});

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

  const validateForm = () => {
    let formErrors = {};
    if (!name) formErrors.name = "Name is required";
    if (!price) formErrors.price = "Price is required";
    if (!description) formErrors.description = "Description is required";
    if (!category) formErrors.category = "Category is required";
    if (stock <= 0) formErrors.stock = "Stock must be greater than 0";
    if (!seller) formErrors.seller = "Seller name is required";
    if (!image) formErrors.image = "Image is required";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('image', image);
    formData.append('category', category);
    formData.append('stock', stock);
    formData.append('seller', seller);

   

    const responce = await addProduct(formData)
    if (responce) {
      navigate('/admin/viewproducts')
      triggerPopUp(true, 'Product Add Succssfully');
    }

  };

  

  useEffect(() => {
    if(!login){
      navigate('/')
    }
    setVisibleSearch(false)
  }, [])

  return (
    <div className="addProduct-form flex flex-col items-center w-full sm:p-6 min-h-screen ">
      <form
        onSubmit={submitHandler}
        className="flex flex-col gap-4 w-full max-w-xl bg-white p-8 rounded-lg shadow-md  "
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
          {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
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
          {errors.price && <span className="text-red-500 text-sm">{errors.price}</span>}
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
          {errors.description && <span className="text-red-500 text-sm">{errors.description}</span>}
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
          {errors.category && <span className="text-red-500 text-sm">{errors.category}</span>}
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
          {errors.stock && <span className="text-red-500 text-sm">{errors.stock}</span>}
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
          {errors.seller && <span className="text-red-500 text-sm">{errors.seller}</span>}
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
          {errors.image && <span className="text-red-500 text-sm">{errors.image}</span>}
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
