// import React, { useState, useEffect, useContext } from 'react'
// import { useNavigate } from 'react-router-dom'
// import './PasswordReset.css'
// import { ContextProvider } from '../../service/Context'
// import usePopUp from '../popup/PopUp';
// import Loader from '../animation/LoaderAnimation';
// import { Link } from 'react-router-dom';
// const PasswordReset = () => {
//     const { triggerPopUp, PopUp } = usePopUp();
//     const { passwordReset, setVisibleSearch } = useContext(ContextProvider)

//     const navigate = useNavigate()
//     const [loading, setLoading] = useState(false);
//     const [gmail, setGmail] = useState("")
//     const [password, setPassword] = useState("")
//     const [conformPassword, setConformPassword] = useState("")


//     const [emailError, setEmailError] = useState("");
//     const [passwordError, setPasswordError] = useState("");
//     const [conformPasswordError, setConformPasswordError] = useState("");

//     useEffect(() => {
//         setVisibleSearch(false)

//         let status = JSON.parse(localStorage.getItem("wallMat"));
//         if (status.login) {
//             navigate('/')
//             setLoading(false)
//         }
//         setLoading(false)





//     }, [])

//     const onResetPassword = async () => {


//         if (gmail === "") {
//             setEmailError("Required")
//         }
//         if (password === "") {
//             setPasswordError("Required")
//         }
//         if (conformPassword === "") {
//             setConformPasswordError("Required")
//         }
//         if (password !== conformPassword) {
//             return setConformPasswordError("Password not match")
//         }
//         if (gmail === "" || password === "" || conformPassword === "") {
//             return

//         } else {
//             setLoading(true)
//             const res = await passwordReset({ gmail, password })
//             console.log(res.for)
//             if (res.success === true) {
//                 setLoading(false)

//                 triggerPopUp(true, 'Password Reset Successfully');
//                 navigate('/login');
//                 setGmail("")
//                 setPassword("")
//                 setConformPassword("")
//             } else if (res.success === false) {
//                 console.log("failed")
//                 setLoading(false)
//                 if (res.for === "gmail") {
//                     setEmailError(res.message)
//                 }

//             }
//         }




//     }

//     return (



//         <div className="flex flex-col  items-center w-full sm:px-[32px] sm:pb-[24px] min-h-screen">
//             {loading && <Loader spinning={loading} />}
//             <div className="flex flex-col gap-3 w-full max-w-[450px] px-[12px] mt-8 py-[12px] rounded-lg sm:p-[32px] bg-white sm:shadow-lg">
//                 <div className="font-bold capitalize text-[24px]">Reset Password</div>

//                 <div className="flex flex-col gap-1">
//                     <div className="flex gap-2 items-center">
//                         <label htmlFor="gmail" className="font-semibold capitalize">Email</label>
//                         <p className="text-red-500 text-[12px]">{emailError}</p>
//                     </div>
//                     <input
//                         type="email"
//                         id="gmail"
//                         placeholder="Enter Your Gmail"
//                         className="focus:outline-none py-2 px-2 rounded border-b-2 border-gray-300"
//                         value={gmail}
//                         onChange={(e) => { setGmail(e.target.value); setEmailError(""); }}
//                     />
//                 </div>

//                 <div className="flex flex-col gap-1">
//                     <div className="flex gap-2 items-center">
//                         <label htmlFor="password" className="font-semibold capitalize">Password</label>
//                         <p className="text-red-500 text-[12px]">{passwordError}</p>
//                     </div>
//                     <input
//                         type="password"
//                         id="password"
//                         placeholder="Enter Your Password"
//                         className="focus:outline-none py-2 px-2 rounded border-b-2 border-gray-300"
//                         value={password}
//                         onChange={(e) => { setPassword(e.target.value); setPasswordError(""); }}
//                     />
//                 </div>

//                 <div className="flex flex-col gap-1">
//                     <div className="flex gap-2 items-center">
//                         <label htmlFor="confirm-password" className="font-semibold capitalize">Confirm Password</label>
//                         <p className="text-red-500 text-[12px]">{conformPasswordError}</p>
//                     </div>
//                     <input
//                         type="password"
//                         id="confirm-password"
//                         placeholder="Enter Your Password Again"
//                         className="focus:outline-none py-2 px-2 rounded border-b-2 border-gray-300"
//                         value={conformPassword}
//                         onChange={(e) => { setConformPassword(e.target.value); setConformPasswordError(""); }}
//                     />
//                 </div>

//                 <button
//                     className="px-4 py-2 font-medium capitalize bg-[#FA9C23] text-white rounded mt-4"
//                     onClick={() => onResetPassword()} disabled={loading}
//                 >
//                     Reset
//                 </button>
//                 <Link to={'/login'}>
//                     <p className='capitalize font-medium text-center flex justify-center items-center text-blue-600 mt-4'>
//                         Existing User? Login
//                     </p>
//                 </Link>
//             </div>
//         </div>




//     )
// }

// export default PasswordReset
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './PasswordReset.css';
import { ContextProvider } from '../../service/Context';
import usePopUp from '../popup/PopUp';
import Loader from '../animation/LoaderAnimation';
import { Link } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'; // Importing the eye icons

const PasswordReset = () => {
    const { triggerPopUp, PopUp } = usePopUp();
    const { passwordReset, setVisibleSearch } = useContext(ContextProvider);

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [gmail, setGmail] = useState("");
    const [password, setPassword] = useState("");
    const [conformPassword, setConformPassword] = useState("");

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [conformPasswordError, setConformPasswordError] = useState("");

    // Password visibility states
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        setVisibleSearch(false);

        let status = JSON.parse(localStorage.getItem("wallMat"));
        if (status?.login) {
            navigate('/');
            setLoading(false);
        }
        setLoading(false);
    }, []);

    const onResetPassword = async () => {
        if (gmail === "") setEmailError("Required");
        if (password === "") setPasswordError("Required");
        if (conformPassword === "") setConformPasswordError("Required");
        if (password !== conformPassword) return setConformPasswordError("Passwords do not match");
        if (gmail === "" || password === "" || conformPassword === "") return;

        setLoading(true);
        const res = await passwordReset({ gmail, password });
        if (res.success) {
            setLoading(false);
            triggerPopUp(true, 'Password Reset Successfully');
            navigate('/login');
            setGmail("");
            setPassword("");
            setConformPassword("");
        } else {
            setLoading(false);
            if (res.for === "gmail") setEmailError(res.message);
        }
    };

    // Toggle password visibility
    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

    return (
        <div className="flex flex-col items-center w-full sm:px-8 sm:pb-8 min-h-screen">
            {loading && <Loader spinning={loading} />}
            <div className="flex flex-col gap-4 w-full max-w-md p-6 mt-8 rounded-lg bg-white sm:shadow-lg">
                <div className="font-bold text-2xl">Reset Password</div>

                <div className="flex flex-col gap-1">
                    <div className="flex gap-2 items-center">
                        <label htmlFor="gmail" className="font-semibold">Email</label>
                        <p className="text-red-500 text-sm">{emailError}</p>
                    </div>
                    <input
                        type="email"
                        id="gmail"
                        placeholder="Enter Your Gmail"
                        className="focus:outline-none py-2 px-2 rounded border-b-2 border-gray-300"
                        value={gmail}
                        onChange={(e) => { setGmail(e.target.value); setEmailError(""); }}
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-center">
                        <label htmlFor="password" className="font-semibold">Password</label>
                        <p className="text-red-500 text-sm">{passwordError}</p>
                    </div>
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            placeholder="Enter Your Password"
                            className="focus:outline-none py-2 px-2 rounded border-b-2 border-gray-300 w-full"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value); setPasswordError(""); }}
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-[11px] text-gray-600"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                        </button>
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-center">
                        <label htmlFor="confirm-password" className="font-semibold">Confirm Password</label>
                        <p className="text-red-500 text-sm">{conformPasswordError}</p>
                    </div>
                    <div className="relative">
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            id="confirm-password"
                            placeholder="Enter Your Password Again"
                            className="focus:outline-none py-2 px-2 rounded border-b-2 border-gray-300 w-full"
                            value={conformPassword}
                            onChange={(e) => { setConformPassword(e.target.value); setConformPasswordError(""); }}
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-[11px] text-gray-600"
                            onClick={toggleConfirmPasswordVisibility}
                        >
                            {showConfirmPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                        </button>
                    </div>
                </div>

                <button
                    className="px-4 py-2 font-medium capitalize bg-[#FA9C23] text-white rounded mt-4"
                    onClick={onResetPassword}
                    disabled={loading}
                >
                    Reset Password
                </button>
                <Link to={'/login'}>
                    <p className="capitalize font-medium text-center text-blue-600 mt-4">
                        Existing User? Login
                    </p>
                </Link>
            </div>
        </div>
    );
};

export default PasswordReset;

