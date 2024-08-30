import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import './Signup.css'
import { ContextProvider } from '../../service/Context';

const Signup = () => {

    const { signUp } = useContext(ContextProvider)

    // private route
    const navigate = useNavigate();

    // signup details
    const [userName, setUserName] = useState("");
    const [gmail, setGmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(true);

    // error handling
    const [userNameError, setUserNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [signUpError, setSignUpError] = useState("");
    const navigata = useNavigate()
  
    useEffect(() => {

        let status = JSON.parse(localStorage.getItem("wallMat"));
        if(status.login){
            navigata('/')
            setLoading(false)
        }
        setLoading(false)





    }, [])



    const onSignUp = async () => {
        if (userName === "") {
            setUserNameError("Required")
        }
        if (userName !== "") {
            if (userName.length < 6) {
                setUserNameError("Username at least 6 characters long")
            }
        }
        if (gmail === "") {
            setEmailError("Required")
        }
        if (password === "") {
            setPasswordError("Required")
        }
        if (password !== "") {
            if (password.length < 6) {
                setPasswordError("Password at least 6 characters long")
            }
        }
        if (userName === "" || gmail === "" || password === "") {
            return
        } else {
            const res = await signUp({ userName, gmail, password })
            if (res.data.success) {
                navigata('/login')
                setGmail("")
                setUserName("")
                setPassword("")
            } else {
                setEmailError(res.response.data.message)
                console.log(res)
            }
        }





    };

    return (
        <div className="flex flex-col justify-center items-center w-full  bg-white sm:p-x-[32px] sm:pb-[24px]  ">
            {loading ? (
                <p>Loading....</p>
            ) : (
                <div className="signup-form flex flex-col gap-3 w-full mt-8 max-w-[450px] px-[16px] md:p-[32px]  bg-white ">
                    <div className="title font-semibold  capitalize text-[32px] ">
                        Register
                    </div>

                    {signUpError &&
                        <div className="error text-red-500 text-center mb-3">
                            {signUpError}
                        </div>
                    }

                    <div className="userName flex flex-col gap-1 ">
                        <div className="flex gap-2 items-center">
                            <label htmlFor="userName" className='font-semibold capitalize'> Name</label>
                            <p className='text-red-600 text-[12px]'>{userNameError}</p>
                        </div>
                        <input
                            type="text"
                            id="userName"
                            placeholder='Enter Your Name'
                            className='focus:outline-none  py-2 px-2 rounded border-b-2 border-gray-300'
                            value={userName}
                            onChange={(e) => { setUserName(e.target.value); setUserNameError(""); setSignUpError("") }}
                        />
                    </div>
                    <div className="gmail flex flex-col gap-1">

                        <div className="flex gap-2 items-center">
                            <label htmlFor="gmail" className='font-semibold capitalize'>Email</label>
                            <p className='text-red-600 text-[12px]'>{emailError}</p>
                        </div>
                        <input
                            type="email"
                            id="gmail"
                            placeholder='Enter Your Gmail'
                            className='focus:outline-none  py-2 px-2 rounded border-b-2 border-gray-300'
                            value={gmail}
                            onChange={(e) => { setGmail(e.target.value); setEmailError(""); setSignUpError("") }}
                        />
                    </div>
                    <div className="password flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <label htmlFor="password" className='font-medium capitalize'>Password</label>
                            <p className='text-red-600 text-[12px]'>{passwordError}</p>
                        </div>

                        <input
                            type="password"

                            placeholder='Enter Your Password'
                            className='focus:outline-none  py-2 px-2 rounded border-b-2 border-gray-300'
                            value={password}
                            onChange={(e) => { setPassword(e.target.value); setPasswordError(""); setSignUpError("") }}
                        />
                    </div>
                    <button
                        className='px-4 py-2  capitalize bg-[#FA9C23] font-semibold text-white rounded mt-4'
                        onClick={onSignUp}
                    >
                        Register
                    </button>

                    <Link to={'/login'}>
                        <p className='capitalize font-medium text-center text-[#2874F0] mt-2'>Existing User? Login</p>
                    </Link>
                </div>
            )
            }
        </div >
    );
};

export default Signup;



