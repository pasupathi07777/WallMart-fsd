



import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ContextProvider } from '../../service/Context';
import usePopUp from '../popup/PopUp';
import { floatButtonPrefixCls } from 'antd/es/float-button/FloatButton';

const Login = () => {
    const { triggerPopUp, PopUp } = usePopUp();
    const { logIn, setLogin,  setVisibleSearch } = useContext(ContextProvider);
    const navigate = useNavigate();
    const [gmail, setGmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(true);
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [logInError, setLogInError] = useState("");

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

    const onSignIn = async () => {
        if (gmail === "") {
            setEmailError("Required");
        }
        if (password === "") {
            setPasswordError("Required");
        }
        if (gmail === "" || password === "") {
            return;
        }

        const res = await logIn({ gmail, password });
        if (res.success === true) {
            triggerPopUp(true, 'Login Succesfully');
            let status = JSON.parse(localStorage.getItem("wallMat"));
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
        }
    };

    return (
        <div className="flex flex-col items-center  sm:px-8 py-8 w-full min-h-screen">

            {loading ? (
                <p>Loading....</p>
            ) : (
                <div className="login-form flex flex-col gap-4 w-full max-w-md px-4 py-6 sm:px-8 sm:py-10 bg-white rounded-lg sm:shadow-md">
                    <div className="font-bold text-2xl text-center">Login</div>
                    {logInError && <p className='text-red-500 text-center'>{logInError}</p>}

                    <div className="flex flex-col gap-1">
                        <div className="flex justify-between items-center">
                            <label htmlFor="userName" className='font-semibold'>Email</label>
                            <p className='text-red-500 text-xs'>{emailError}</p>
                        </div>
                        <input
                            type="text"
                            id="username"
                            placeholder='Enter Your Email'
                            className='focus:outline-none py-2 px-3 rounded border border-gray-300'
                            value={gmail}
                            onChange={(e) => { setGmail(e.target.value); setEmailError(""); setLogInError("") }}
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex justify-between items-center">
                            <label htmlFor="password" className='font-semibold'>Password</label>
                            <p className='text-red-500 text-xs'>{passwordError}</p>
                        </div>
                        <input
                            type="password"
                            id="password"
                            placeholder='Enter Your Password'
                            className='focus:outline-none py-2 px-3 rounded border border-gray-300'
                            value={password}
                            onChange={(e) => { setPassword(e.target.value); setPasswordError(""); setLogInError("") }}
                        />
                    </div>

                    <Link to={'/paswordreset'} className='text-sm text-gray-600 text-right'>
                        Forgot Password?
                    </Link>

                    <button
                        className='py-2 mt-4 bg-orange-500 text-white font-semibold rounded hover:bg-orange-600 transition-all'
                        onClick={() => { onSignIn() }}
                    >
                        Login
                    </button>
                    {/* <PopUp btnName={"Login"} mess={"Login Success"} onSubmit={onSignIn} style={"bg-orange-500 hover:bg-orange-600 transition-all  rounded py-2 mt-4 cursor-pointer  "} /> */}

                    <Link to={'/signup'} className='text-sm text-center text-gray-600 mt-4'>
                        New User?
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Login;








