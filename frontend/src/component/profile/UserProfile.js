


// import React, { useContext, useEffect } from 'react';
// import { ContextProvider } from '../../service/Context';
// import { Link, useNavigate } from 'react-router-dom';
// import usePopUp from '../popup/PopUp';
// const UserProfile = () => {
//     const { triggerPopUp, PopUp } = usePopUp();
//     const { loginUserDetails, logOut, setVisibleSearch, address } = useContext(ContextProvider);
//     const navigate = useNavigate();

//     function formatDateToYYYYMMDD(isoDate) {
//         const date = new Date(isoDate);
//         const year = date.getFullYear(isoDate);
//         const month = String(date.getMonth() + 1).padStart(2, '0')
//         const day = String(date.getDate()).padStart(2, '0');
//         return `${year}-${month}-${day}`;
//     }

//     const logOutUser = async () => {
//         const responce = await logOut(false)
//         if (responce.success) {
//             triggerPopUp(true, 'Logout Successfully');
//             navigate("/")
//         }
//     }

//     const readableCreatedAt = formatDateToYYYYMMDD(loginUserDetails.createdAt);
//     const readableUpdatedAt = formatDateToYYYYMMDD(loginUserDetails.updatedAt);

//     useEffect(() => {
//         setVisibleSearch(true)


//         console.log(address)
//     })

//     return (
//         <div className="flex flex-col items-center  w-full h-full  sm:px-6 lg:px-8 sm:bg-gray-100 min-h-screen">
//             <div className="bg-white sm:shadow-lg rounded-lg p-6  w-full max-w-md  mt-10 ">
//                 <h1 className="font-bold text-3xl capitalize text-center text-gray-800">My Profile</h1>
//                 <div className="mt-6">
//                     <div className="mb-4">
//                         <h2 className="text-gray-500 font-semibold text-lg">Full Name</h2>
//                         <p className="font-medium text-gray-700">{loginUserDetails.userName}</p>
//                     </div>
//                     <div className="mb-4">
//                         <h2 className="text-gray-500 font-semibold text-lg">Email Address</h2>
//                         <p className="font-medium text-gray-700">{loginUserDetails.gmail}</p>
//                     </div>
//                     <div className="mb-6">
//                         <h2 className="text-gray-500 font-semibold text-lg">Joined</h2>
//                         <p className="font-medium text-gray-700">{readableCreatedAt}</p>
//                     </div>
//                     <div className="mb-6">
//                         <h2 className="text-gray-500 font-semibold text-lg">Delevery Address</h2>
//                         <div className="address flex flex-wrap ">
//                             {
//                                 Object.entries(address).map(([key, value], index, arr) => (
//                                     <p key={key} className="font-medium flex text-gray-700">
//                                         {value}{index !== arr.length - 1 ? ',' : '.'}
//                                     </p>
//                                 ))
//                             }

//                         </div>

//                     </div>
//                     <div className="flex flex-col gap-3">
//                         <button className="bg-blue-600 hover:bg-blue-700 font-medium px-4 py-2 rounded text-white transition duration-200" onClick={() => navigate('/orders')}>
//                             My Orders
//                         </button>
//                         {loginUserDetails.admin && (
//                             <Link to="/admin">
//                                 <button className="bg-yellow-500 w-full hover:bg-yellow-600 font-medium px-4 py-2 rounded text-white transition duration-200">
//                                     Admin Dashboard
//                                 </button>
//                             </Link>
//                         )}
//                         <button
//                             className="bg-red-500 hover:bg-red-600 font-medium px-4 py-2 rounded text-white transition duration-200"
//                             onClick={logOutUser}
//                         >
//                             Logout
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default UserProfile;
// import React, { useContext, useState, useEffect } from 'react';
// import { ContextProvider } from '../../service/Context';
// import { Link, useNavigate } from 'react-router-dom';
// import usePopUp from '../popup/PopUp';

// const UserProfile = () => {
//     const { triggerPopUp, PopUp } = usePopUp();
//     const { loginUserDetails, logOut, setVisibleSearch, address } = useContext(ContextProvider);
//     const navigate = useNavigate();

//     // State for managing edit mode and form values
//     const [editMode, setEditMode] = useState(false);
//     const [formData, setFormData] = useState({
//         userName: loginUserDetails.userName,
//         gmail: loginUserDetails.gmail,
//         address: address,
//     });

//     // Format date function
//     function formatDateToYYYYMMDD(isoDate) {
//         const date = new Date(isoDate);
//         const year = date.getFullYear();
//         const month = String(date.getMonth() + 1).padStart(2, '0');
//         const day = String(date.getDate()).padStart(2, '0');
//         return `${year}-${month}-${day}`;
//     }

//     // Handle logout
//     const logOutUser = async () => {
//         const response = await logOut(false);
//         if (response.success) {
//             triggerPopUp(true, 'Logout Successfully');
//             navigate("/");
//         }
//     };

//     // Toggle edit mode
//     const toggleEditMode = () => setEditMode(!editMode);

//     // Handle form input changes
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prevData) => ({
//             ...prevData,
//             [name]: value,
//         }));
//     };

//     // Handle form submit
//     const handleSave = () => {
//         // Save the updated user details (you can implement a save API call here)
//         console.log("Updated Data:", formData);
//         setEditMode(false);
//     };

//     const readableCreatedAt = formatDateToYYYYMMDD(loginUserDetails.createdAt);
//     const readableUpdatedAt = formatDateToYYYYMMDD(loginUserDetails.updatedAt);

//     useEffect(() => {
//         setVisibleSearch(true);
//         console.log(address);
//     });

//     return (
//         <div className="flex flex-col items-center w-full h-full sm:px-6 lg:px-8 sm:bg-gray-100 min-h-screen">
//             <div className="bg-white sm:shadow-lg rounded-lg p-6 w-full max-w-md mt-10">
//                 <h1 className="font-bold text-3xl capitalize text-center text-gray-800">My Profile</h1>
//                 <div className="mt-6">
//                     <div className="mb-4">
//                         <h2 className="text-gray-500 font-semibold text-lg">Full Name</h2>
//                         {editMode ? (
//                             <input
//                                 type="text"
//                                 name="userName"
//                                 value={formData.userName}
//                                 onChange={handleInputChange}
//                                 className="border rounded p-2 w-full"
//                             />
//                         ) : (
//                             <p className="font-medium text-gray-700">{formData.userName}</p>
//                         )}
//                     </div>
//                     <div className="mb-4">
//                         <h2 className="text-gray-500 font-semibold text-lg">Email Address</h2>
//                         {editMode ? (
//                             <input
//                                 type="email"
//                                 name="gmail"
//                                 value={formData.gmail}
//                                 onChange={handleInputChange}
//                                 className="border rounded p-2 w-full"
//                             />
//                         ) : (
//                             <p className="font-medium text-gray-700">{formData.gmail}</p>
//                         )}
//                     </div>
//                     <div className="mb-6">
//                         <h2 className="text-gray-500 font-semibold text-lg">Joined</h2>
//                         <p className="font-medium text-gray-700">{readableCreatedAt}</p>
//                     </div>
//                     <div className="mb-6">
//                         <h2 className="text-gray-500 font-semibold text-lg">Delivery Address</h2>
//                         <div className="address flex flex-wrap">
//                             {editMode ? (
//                                 <textarea
//                                     name="address"
//                                     value={formData.address}
//                                     onChange={handleInputChange}
//                                     className="border rounded p-2 w-full"
//                                 />
//                             ) : (
//                                 Object.entries(formData.address).map(([key, value], index, arr) => (
//                                     <p key={key} className="font-medium text-gray-700">
//                                         {value}{index !== arr.length - 1 ? ',' : '.'}
//                                     </p>
//                                 ))
//                             )}
//                         </div>
//                     </div>

//                     {/* Edit and Save Buttons */}
//                     <div className="flex justify-between">
//                         {editMode ? (
//                             <button
//                                 className="bg-green-500 hover:bg-green-600 font-medium px-4 py-2 rounded text-white transition duration-200"
//                                 onClick={handleSave}
//                             >
//                                 Save
//                             </button>
//                         ) : (
//                             <button
//                                 className="bg-blue-500 hover:bg-blue-600 font-medium px-4 py-2 rounded text-white transition duration-200"
//                                 onClick={toggleEditMode}
//                             >
//                                 Edit Profile
//                             </button>
//                         )}
//                     </div>

//                     <div className="flex flex-col gap-3 mt-4">
//                         <button className="bg-blue-600 hover:bg-blue-700 font-medium px-4 py-2 rounded text-white transition duration-200" onClick={() => navigate('/orders')}>
//                             My Orders
//                         </button>
//                         {loginUserDetails.admin && (
//                             <Link to="/admin">
//                                 <button className="bg-yellow-500 w-full hover:bg-yellow-600 font-medium px-4 py-2 rounded text-white transition duration-200">
//                                     Admin Dashboard
//                                 </button>
//                             </Link>
//                         )}
//                         <button
//                             className="bg-red-500 hover:bg-red-600 font-medium px-4 py-2 rounded text-white transition duration-200"
//                             onClick={logOutUser}
//                         >
//                             Logout
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default UserProfile;
import React, { useContext, useState, useEffect } from 'react';
import { ContextProvider } from '../../service/Context';
import { Link, useNavigate } from 'react-router-dom';
import usePopUp from '../popup/PopUp';

const UserProfile = () => {
    const { triggerPopUp, PopUp } = usePopUp();
    const { loginUserDetails, logOut, setVisibleSearch, address } = useContext(ContextProvider);
    const navigate = useNavigate();

    // State for managing edit mode and form values
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        userName: loginUserDetails.userName,
        gmail: loginUserDetails.gmail,
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

    // Toggle edit mode
    const toggleEditMode = () => setEditMode(!editMode);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle address input changes
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
    const handleSave = () => {
        // Save the updated user details (implement save API call here)

        console.log("Updated Data:", formData);
        setEditMode(false);
    };

    const readableCreatedAt = formatDateToYYYYMMDD(loginUserDetails.createdAt);
    const readableUpdatedAt = formatDateToYYYYMMDD(loginUserDetails.updatedAt);

    useEffect(() => {
        setVisibleSearch(true);

        // Correctly updating formData
        setFormData((data) => ({
            ...data,
            userName: loginUserDetails.userName,
            gmail: loginUserDetails.gmail,
            address: { ...address }
        }));

        console.log(address);
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
                            <p className="font-medium text-gray-700">{formData.userName}</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <h2 className="text-gray-500 font-semibold text-lg">Email Address</h2>
                        {editMode ? (
                            <input
                                type="email"
                                name="gmail"
                                value={formData.gmail}
                                onChange={handleInputChange}
                                className="border rounded p-2 w-full"
                            />
                        ) : (
                            <p className="font-medium text-gray-700">{formData.gmail}</p>
                        )}
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
                    <div className="flex justify-between">
                        {editMode ? (
                            <button
                                className="bg-green-500 hover:bg-green-600 font-medium px-4 py-2 rounded text-white transition duration-200"
                                onClick={handleSave}
                            >
                                Save
                            </button>
                        ) : (
                            <button
                                className="bg-blue-500 hover:bg-blue-600 font-medium px-4 py-2 rounded text-white transition duration-200"
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
};

export default UserProfile;
