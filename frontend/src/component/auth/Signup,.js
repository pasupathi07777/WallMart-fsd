

import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ContextProvider } from '../../service/Context';
import usePopUp from '../popup/PopUp';

const Signup = () => {
    const { triggerPopUp, PopUp } = usePopUp();
    const { signUp,  setVisibleSearch } = useContext(ContextProvider);

    const navigate = useNavigate();

    // Signup details
    const [userName, setUserName] = useState("");
    const [gmail, setGmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(true);

    // Error handling
    const [userNameError, setUserNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [signUpError, setSignUpError] = useState("");

    useEffect(() => {
        setVisibleSearch(false)
        let status = JSON.parse(localStorage.getItem("wallMat"));
        if (status?.login) {
            navigate('/');
            setLoading(false);
        } else {
            setLoading(false);
        }
    }, [navigate]);

    const onSignUp = async () => {
        if (userName === "") {
            setUserNameError("Required");
        } else if (userName.length < 6) {
            setUserNameError("Username at least 6 characters long");
        }

        if (gmail === "") {
            setEmailError("Required");
        }

        if (password === "") {
            setPasswordError("Required");
        } else if (password.length < 6) {
            setPasswordError("Password at least 6 characters long");
        }

        if (userName === "" || gmail === "" || password === "") {
            return;
        } else {
            const res = await signUp({ userName, gmail, password });
            if (res.data.success) {
                triggerPopUp(true, 'Registration Successful');
                navigate('/login');
                setGmail("");
                setUserName("");
                setPassword("");
            } else {
                setEmailError(res.response.data.message);
            }
        }
    };

    return (
        <div className="flex flex-col items-center w-full bg-white  sm:px-8 py-8 min-h-screen">
            {loading ? (
                <p>Loading....</p>
            ) : (
                <div className="signup-form flex flex-col gap-4 w-full max-w-md bg-white p-6 sm:p-8 rounded-lg sm:shadow-md mt-8">
                    <div className="title font-semibold text-2xl text-center">
                        Register
                    </div>

                    {signUpError && (
                        <div className="text-red-500 text-center mb-3">
                            {signUpError}
                        </div>
                    )}

                    <div className="flex flex-col gap-1">
                        <div className="flex justify-between items-center">
                            <label htmlFor="userName" className='font-semibold'>Name</label>
                            <p className='text-red-600 text-xs'>{userNameError}</p>
                        </div>
                        <input
                            type="text"
                            id="userName"
                            placeholder='Enter Your Name'
                            className='focus:outline-none py-2 px-3 rounded border border-gray-300'
                            value={userName}
                            onChange={(e) => { setUserName(e.target.value); setUserNameError(""); setSignUpError("") }}
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex justify-between items-center">
                            <label htmlFor="gmail" className='font-semibold'>Email</label>
                            <p className='text-red-600 text-xs'>{emailError}</p>
                        </div>
                        <input
                            type="email"
                            id="gmail"
                            placeholder='Enter Your Gmail'
                            className='focus:outline-none py-2 px-3 rounded border border-gray-300'
                            value={gmail}
                            onChange={(e) => { setGmail(e.target.value); setEmailError(""); setSignUpError("") }}
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex justify-between items-center">
                            <label htmlFor="password" className='font-medium'>Password</label>
                            <p className='text-red-600 text-xs'>{passwordError}</p>
                        </div>
                        <input
                            type="password"
                            id="password"
                            placeholder='Enter Your Password'
                            className='focus:outline-none py-2 px-3 rounded border   border-gray-300'
                            value={password}
                            onChange={(e) => { setPassword(e.target.value); setPasswordError(""); setSignUpError("") }}
                        />
                    </div>

                    <button
                        className='px-4 py-2 bg-orange-500 text-white font-semibold rounded mt-4 hover:bg-orange-600 transition-all'
                        onClick={onSignUp}
                    >
                        Register
                    </button>
                  
 
                    <Link to={'/login'}>
                        <p className='capitalize font-medium text-center text-blue-600 mt-4'>
                            Existing User? Login
                        </p>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Signup;


