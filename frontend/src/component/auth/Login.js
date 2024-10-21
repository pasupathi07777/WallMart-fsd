import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ContextProvider } from '../../service/Context';
import usePopUp from '../popup/PopUp';
import Loader from '../animation/LoaderAnimation';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'; 

const Login = () => {
    const { triggerPopUp } = usePopUp();
    const { logIn, setLogin, setVisibleSearch } = useContext(ContextProvider);
    const navigate = useNavigate();
    const [gmail, setGmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [logInError, setLogInError] = useState("");
    const [showPassword, setShowPassword] = useState(false); // New state for password visibility

    useEffect(() => {
        setVisibleSearch(false);
        const status = JSON.parse(localStorage.getItem("wallMat"));
        if (status?.login) {
            navigate('/');
        }
    }, [navigate, setVisibleSearch]);

    const onSignIn = async () => {

       
        setLoading(true);

        if (gmail === "") {
            setEmailError("Required");
        }
        if (password === "") {
            setPasswordError("Required");
        }
        if (gmail === "" || password === "") {
            setLoading(false); 
            return;
        }

        const res = await logIn({ gmail, password });
        setLoading(false);  

        if (res.success === true) {
            triggerPopUp(true, 'Login Successfully');
            const status = JSON.parse(localStorage.getItem("wallMat"));
            status.gmail = gmail;
            status.login = true;
            localStorage.setItem("wallMat", JSON.stringify(status));
            setLogin(true);
            navigate('/');
            setGmail("");
            setPassword("");
        } else {
            if (res.for === "gmail") {
                setEmailError(res.message);
            } else if (res.for === "password") {
                setPasswordError(res.message);
            }
            setLogInError(res.message);
        }
    };

    // Function to toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex flex-col items-center sm:px-8 py-8 w-full min-h-screen">
            {loading && <Loader spinning={loading} />}

            <div className={`login-form flex flex-col gap-4 w-full max-w-md px-4 py-6 sm:px-8 sm:py-10 bg-white rounded-lg sm:shadow-md ${loading ? 'opacity-50 pointer-events-none' : ''}`}>
                <div className="font-bold text-2xl text-center">Login</div>

                <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-center">
                        <label htmlFor="username" className="font-semibold">Email</label>
                        <p className="text-red-500 text-xs">{emailError}</p>
                    </div>
                    <input
                        type="text"
                        id="username"
                        placeholder="Enter Your Email"
                        className="focus:outline-none py-2 px-3 rounded border border-gray-300"
                        value={gmail}
                        onChange={(e) => { setGmail(e.target.value); setEmailError(""); setLogInError("") }}
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-center">
                        <label htmlFor="password" className="font-semibold">Password</label>
                        <p className="text-red-500 text-xs">{passwordError}</p>
                    </div>
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'} // Toggles between text and password
                            id="password"
                            placeholder="Enter Your Password"
                            className="focus:outline-none flex items-center py-2 px-3 rounded border border-gray-300 w-full"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value); setPasswordError(""); setLogInError("") }}
                        />
                        <button 
                            type="button"
                            className="absolute right-3 top-[10px] flex justify-center items-center text-gray-600"
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

                <Link to="/paswordreset" className="text-sm text-gray-600 text-right">
                    Forgot Password?
                </Link>

                <button
                    className="py-2 mt-4 bg-orange-500 text-white font-semibold rounded hover:bg-orange-600 transition-all"
                    onClick={onSignIn}
                    disabled={loading}  // Disable button while loading
                >
                    Login
                </button>

                <Link to="/signup" className="text-sm text-center text-gray-600 mt-4">
                    New User?
                </Link>
            </div>
        </div>
    );
};

export default Login;
