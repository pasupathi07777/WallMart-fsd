import React, { useContext, useState, useEffect } from 'react';
import { ContextProvider } from '../../service/Context';
import { Link, useNavigate } from 'react-router-dom';
import usePopUp from '../popup/PopUp';

const UserProfile = () => {
    const { triggerPopUp, PopUp } = usePopUp();
    const { loginUserDetails, logOut, setVisibleSearch, address, updateProfile } = useContext(ContextProvider);
    const navigate = useNavigate();

    // State for managing edit mode and form values
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        userName: loginUserDetails.userName,
        address: {
            street: address.street || '',
            city: address.city || '',
            state: address.state || '',
            postalCode: address.postalCode || '',
            country: address.country || '',
        },
    });

    // Format date function
    function formatDateToYYYYMMDD(isoDate) {
        const date = new Date(isoDate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    // Handle logout
    const logOutUser = async () => {
        const response = await logOut(false);
        if (response.success) {
            triggerPopUp(true, 'Logout Successfully');
            navigate("/");
        }
    };


    const toggleEditMode = () => setEditMode(!editMode);

    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

  
    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            address: {
                ...prevData.address,
                [name]: value,
            },
        }));
    };

    // Handle form submit
    const handleSave = async () => {
        const response = await updateProfile(formData);
        if (response) {
            setEditMode(false);
            triggerPopUp(true, 'Profile Updated Successfully');
        }
    };

    const readableCreatedAt = formatDateToYYYYMMDD(loginUserDetails.createdAt);
    const readableUpdatedAt = formatDateToYYYYMMDD(loginUserDetails.updatedAt);

    useEffect(() => {
        setVisibleSearch(true);
        setFormData((data) => ({
            ...data,
            userName: loginUserDetails.userName,
            address: { ...address }
        }));
    }, [address, setVisibleSearch]);

    return (
        <div className="flex flex-col items-center w-full  sm:px-6 lg:px-8 sm:bg-gray-100 min-h-screen">
            <div className="bg-white sm:shadow-lg rounded-lg p-6 w-full max-w-md mt-10">
                <h1 className="font-bold text-3xl capitalize text-center text-gray-800">My Profile</h1>
                <div className="mt-6">
                    <div className="mb-4">
                        <h2 className="text-gray-500 font-semibold text-lg">Full Name</h2>
                        {editMode ? (
                            <input
                                type="text"
                                name="userName"
                                value={formData.userName}
                                onChange={handleInputChange}
                                className="border rounded p-2 w-full"
                            />
                        ) : (
                            <p className="font-medium text-gray-700 capitalize">{formData.userName}</p>
                        )}
                    </div>
                    <div className={`mb-4 ${editMode ?"hidden":"block "} `}>
                        <h2 className="text-gray-500 font-semibold text-lg">Email Address</h2>
                        <p className="font-medium text-gray-700">{loginUserDetails.gmail}</p>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-gray-500 font-semibold text-lg">Delivery Address</h2>
                        {editMode ? (
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    name="street"
                                    value={formData.address.street}
                                    onChange={handleAddressChange}
                                    placeholder="Street"
                                    className="border rounded p-2 w-full"
                                />
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.address.city}
                                    onChange={handleAddressChange}
                                    placeholder="City"
                                    className="border rounded p-2 w-full"
                                />
                                <input
                                    type="text"
                                    name="state"
                                    value={formData.address.state}
                                    onChange={handleAddressChange}
                                    placeholder="State"
                                    className="border rounded p-2 w-full"
                                />
                                <input
                                    type="text"
                                    name="postalCode"
                                    value={formData.address.postalCode}
                                    onChange={handleAddressChange}
                                    placeholder="Postal Code"
                                    className="border rounded p-2 w-full"
                                />
                                <input
                                    type="text"
                                    name="country"
                                    value={formData.address.country}
                                    onChange={handleAddressChange}
                                    placeholder="Country"
                                    className="border rounded p-2 w-full"
                                />
                            </div>
                        ) : (
                            <div className="flex flex-wrap">
                                {Object.entries(formData.address).map(([key, value], index, arr) => (
                                    <p key={key} className="font-medium text-gray-700">
                                        {value}{index !== arr.length - 1 ? ',' : '.'}
                                    </p>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Edit and Save Buttons */}
                    <div className="flex justify-between w-full ">
                        {editMode ? (
                            <button
                                className="bg-green-500 w-full hover:bg-green-600 font-medium px-4 py-2 rounded text-white transition duration-200"
                                onClick={handleSave}
                            >
                                Save
                            </button>
                        ) : (
                            <button
                                className="bg-blue-500 w-full hover:bg-blue-600 font-medium px-4 py-2 rounded text-white transition duration-200"
                                onClick={toggleEditMode}
                            >
                                Edit Profile
                            </button>
                        )}
                    </div>

                    <div className="flex flex-col gap-3 mt-4">
                        <button className="bg-blue-600 hover:bg-blue-700 font-medium px-4 py-2 rounded text-white transition duration-200" onClick={() => navigate('/orders')}>
                            My Orders
                        </button>
                        {loginUserDetails.admin && (
                            <Link to="/admin">
                                <button className="bg-yellow-500 w-full hover:bg-yellow-600 font-medium px-4 py-2 rounded text-white transition duration-200">
                                    Admin Dashboard
                                </button>
                            </Link>
                        )}
                        <button
                            className="bg-red-500 hover:bg-red-600 font-medium px-4 py-2 rounded text-white transition duration-200"
                            onClick={logOutUser}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
;}

export default UserProfile;
