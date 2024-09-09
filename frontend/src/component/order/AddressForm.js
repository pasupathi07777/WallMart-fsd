

import React, { useState, useContext, useEffect } from 'react';
import { ContextProvider } from '../../service/Context';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../animation/LoaderAnimation';

const AddressForm = () => {
    const { id } = useParams()
    const navigate=useNavigate()
    const [loading, setLoading] = useState(false);
    const { addAddress, loginUserDetails,address, setAddress,setVisibleSearch,login } = useContext(ContextProvider)
    const [errors, setErrors] = useState({
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddress(prevAddress => ({
            ...prevAddress,
            [name]: value
        }));
        // Clear the error message for the field being edited
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: ''
        }));
    };

    const validate = () => {
        let isValid = true;
        const newErrors = {};

        for (const [key, value] of Object.entries(address)) {
            if (!value) {
                newErrors[key] = 'Required';
                isValid = false;
            }
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async(e) => {
        setLoading(true)
        e.preventDefault();
        if (validate()) {
            console.log(address);
            // Call the onSubmit prop function with the address data

            const responce=await addAddress(address)
            if(responce.success){
                setAddress(responce.user.address)
               
                navigate(`/orderpage/${id}`)
               setLoading(false)
                

            }else{
                setLoading(false)
            }
          
        }
    };

    useEffect(() => {
        if(!login){
            navigate('/')
          }
        setVisibleSearch(false)
        if (loginUserDetails.address) {
            setAddress({
                street: loginUserDetails.address.street || '',
                city: loginUserDetails.address.city || '',
                state: loginUserDetails.address.state || '',
                postalCode: loginUserDetails.address.postalCode || '',
                country: loginUserDetails.address.country || ''
            });
        }

        



    },[loginUserDetails])

    return (
        <div className="flex flex-col items-center w-full sm:px-8 py-8 min-h-screen">
             {loading && <Loader spinning={loading} />}
            <div className="login-form flex flex-col gap-4 w-full max-w-md px-4 py-6 sm:px-8 sm:py-10 bg-white rounded-lg sm:shadow-md">
                <div className="font-bold text-2xl text-center">Address Form</div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col relative">
                        <label htmlFor="street" className="font-semibold">Street:</label>
                        <input
                            type="text"
                            name="street"
                            id="street"
                            value={address.street}
                            onChange={handleChange}
                            className={`border rounded-lg p-2 ${errors.street ? 'border-red-500' : ''}`}
                        />
                        {errors.street && <span className="text-red-500 text-sm absolute right-2 top-1/2 transform -translate-y-1/2">{errors.street}</span>}
                    </div>

                    <div className="flex flex-col relative">
                        <label htmlFor="city" className="font-semibold">City:</label>
                        <input
                            type="text"
                            name="city"
                            id="city"
                            value={address.city}
                            onChange={handleChange}
                            className={`border rounded-lg p-2 ${errors.city ? 'border-red-500' : ''}`}
                        />
                        {errors.city && <span className="text-red-500 text-sm absolute right-2 top-1/2 transform -translate-y-1/2">{errors.city}</span>}
                    </div>

                    <div className="flex flex-col relative">
                        <label htmlFor="state" className="font-semibold">State:</label>
                        <input
                            type="text"
                            name="state"
                            id="state"
                            value={address.state}
                            onChange={handleChange}
                            className={`border rounded-lg p-2 ${errors.state ? 'border-red-500' : ''}`}
                        />
                        {errors.state && <span className="text-red-500 text-sm absolute right-2 top-1/2 transform -translate-y-1/2">{errors.state}</span>}
                    </div>

                    <div className="flex flex-col relative">
                        <label htmlFor="postalCode" className="font-semibold">Postal Code:</label>
                        <input
                            type="text"
                            name="postalCode"
                            id="postalCode"
                            value={address.postalCode}
                            onChange={handleChange}
                            className={`border rounded-lg p-2 ${errors.postalCode ? 'border-red-500' : ''}`}
                        />
                        {errors.postalCode && <span className="text-red-500 text-sm absolute right-2 top-1/2 transform -translate-y-1/2">{errors.postalCode}</span>}
                    </div>

                    <div className="flex flex-col relative">
                        <label htmlFor="country" className="font-semibold">Country:</label>
                        <input
                            type="text"
                            name="country"
                            id="country"
                            value={address.country}
                            onChange={handleChange}
                            className={`border rounded-lg p-2 ${errors.country ? 'border-red-500' : ''}`}
                        />
                        {errors.country && <span className="text-red-500 text-sm absolute right-2 top-1/2 transform -translate-y-1/2">{errors.country}</span>}
                    </div>

                    <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-all">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default AddressForm;
