import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ContextProvider } from '../../service/Context';
import usePopUp from '../popup/PopUp';
import Loader from '../animation/LoaderAnimation';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'; // Importing the eye icons

const Signup = () => {
    const { triggerPopUp, PopUp } = usePopUp();
    const { signUp, setVisibleSearch } = useContext(ContextProvider);
    const navigate = useNavigate();

    // Signup details
    const [userName, setUserName] = useState("");
    const [gmail, setGmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    // Error handling
    const [userNameError, setUserNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [signUpError, setSignUpError] = useState("");

    // Password visibility toggle
    const [showPassword, setShowPassword] = useState(false); // State to manage password visibility

    useEffect(() => {
        setVisibleSearch(false);
        let status = JSON.parse(localStorage.getItem("wallMat"));
        if (status?.login) {
            navigate('/');
            setLoading(false);
        } else {
            setLoading(false);
        }
    }, [navigate, setVisibleSearch]);

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
            return setPasswordError("Password at least 6 characters long");
        }

        if (userName === "" || gmail === "" || password === "") {
            return;
        } else {
            setLoading(true);
            const res = await signUp({ userName, gmail, password });
            console.log(res);
            if (res.success) {
                triggerPopUp(true, 'Registration Successful');
                navigate('/login');
                setGmail("");
                setUserName("");
                setPassword("");
                setLoading(false);
            } else {
                setEmailError(res.message);
                setLoading(false);
            }
        }
    };

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex flex-col items-center w-full bg-white sm:px-8 py-8 min-h-screen">
            {loading && <Loader spinning={loading} />}

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
                        onChange={(e) => { setUserName(e.target.value); setUserNameError(""); setSignUpError(""); }}
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
                        onChange={(e) => { setGmail(e.target.value); setEmailError(""); setSignUpError(""); }}
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-center">
                        <label htmlFor="password" className='font-medium'>Password</label>
                        <p className='text-red-600 text-xs'>{passwordError}</p>
                    </div>
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'} // Toggle input type based on showPassword state
                            id="password"
                            placeholder='Enter Your Password'
                            className='focus:outline-none py-2 px-3 rounded border border-gray-300 w-full'
                            value={password}
                            onChange={(e) => { setPassword(e.target.value); setPasswordError(""); setSignUpError(""); }}
                        />
                        <button 
                            type="button"
                            className="absolute right-3 top-[10px] text-gray-600"
                            onClick={togglePasswordVisibility} // Toggle password visibility on click
                        >
                            {showPassword ? (
                                <EyeSlashIcon className="h-5 w-5" />
                            ) : (
                                <EyeIcon className="h-5 w-5" />
                            )}
                        </button>
                    </div>
                </div>

                <button
                    className='px-4 py-2 bg-orange-500 text-white font-semibold rounded mt-4 hover:bg-orange-600 transition-all'
                    onClick={onSignUp}  
                    disabled={loading}
                >
                    Register
                </button>

                <Link to={'/login'}>
                    <p className='capitalize font-medium text-center text-blue-600 mt-4'>
                        Existing User? Login
                    </p>
                </Link>
            </div>
        </div>
    );
};

export default Signup;

