// import React, { useEffect, useState, useContext } from 'react'
// import { Link } from 'react-router-dom'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'
// import './Login.css'
// import { ContextProvider } from '../../service/Context';


// const Login = () => {
//     const { logIn,setLogin,setLoginUserDetails } = useContext(ContextProvider)


//     const navigata = useNavigate()
//     const [gmail, setGmail] = useState("")
//     const [password, setPassword] = useState("")
//     const [lodding, setLoading] = useState(true)

//     const [emailError, setEmailError] = useState("");
//     const [passwordError, setPasswordError] = useState("");
//     const [logInError, setLogInError] = useState("");


//     useEffect(() => {


//         let status = JSON.parse(localStorage.getItem("wallMat"));

//         if (status.login) {
//             navigata('/')
//             setLoading(false)
//         }
//         setLoading(false)







//     }, [navigata])

//     const onSignIn = async () => {
        
//         if (gmail === "") {
//             setEmailError("Required")
//         }
//         if (password === "") {
//             setPasswordError("Required")
//         }
//         if (gmail === "" || password === "") {
//             return
//         }
//         const res=await logIn({ gmail, password })
//         if(res.success===true){
//             let status = JSON.parse(localStorage.getItem("wallMat"));
//             status.gmail = gmail
//             status.login = true
//             localStorage.setItem("wallMat", JSON.stringify(status));
            
//             setLogin(true)
//             navigata('/');
//             setGmail("")
//             setPassword("")
//         }else{
//             if (res.for === "gmail") {
//                 setEmailError(res.message)
//             } else if (res.for === "password") {
//                 setPasswordError(res.message)
//             }
//         }







//     }
//     return (
//         <div className="flex flex-col justify-center items-center  justify-center-center w-full sm:p-x-[32px] sm:pb-[24px]  ">


//             {lodding ?
//                 <p>Loading....</p>
//                 :
//                 <div className="login-form flex flex-col gap-3 w-full  max-w-[450px] px-[12px] mt-8 py-[12px] rounded-lg h-full sm:p-[32px] " >

//                     <div className="title font-bold capitalize text-[32px] ">Login</div>
//                     {logInError && <p className='text-red-500 text-[14px] text-center'>{logInError}</p>}

//                     <div className="gamil flex flex-col gap-1">
//                         <div className="flex gap-2 items-center">
//                             <label htmlFor="userName" className='font-semibold capitalize '>Email</label>
//                             <p className='text-red-500 text-[12px] '>{emailError}</p>
//                         </div>


//                         <input type="text" name="" id="username" placeholder='Enter Your Gmail' className='focus:outline-none  py-2 px-2  rounded border-b-2 border-gray-300 ' value={gmail} onChange={(e) => { setGmail(e.target.value); setEmailError(""); setLogInError("") }} />
//                     </div>
//                     <div className="password flex flex-col gap-1 ">

//                         <div className="flex gap-2 items-center">
//                             <label htmlFor="userName" className='font-semibold capitalize'>Password</label>
//                             <p className='text-red-500 text-[12px] '>{passwordError}</p>
//                         </div>

//                         <input type="text" name="" id="username" placeholder='Enter Your Password' className='focus:outline-none   py-2 px-2 rounded border-b-2 border-gray-300' value={password} onChange={(e) => { setPassword(e.target.value); setPasswordError(""); setLogInError("") }} />
//                     </div>
//                     <Link to={'/paswordreset'}>
//                         <p className='capitalize font-semibold text-end text-[14px] text-[#747474]'>Forgot Password?
//                         </p>
//                     </Link>
//                     <button className='px-2 py-1 font-medium capitalize bg-[#FA9C23] text-white  rounded mt-2' onClick={(e) => onSignIn()} >login</button>
//                     <Link to={'/signup'}>
//                         <p className='capitalize font-semibold text-center  text-[#747474]'>New User?
//                         </p>
//                     </Link>


//                 </div>

//             }



//         </div>
//     )
// }

// export default Login



import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ContextProvider } from '../../service/Context';

const Login = () => {
    const { logIn, setLogin } = useContext(ContextProvider);
    const navigate = useNavigate();
    const [gmail, setGmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(true);
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [logInError, setLogInError] = useState("");

    useEffect(() => {
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
        <div className="flex flex-col items-center w-full  sm:px-8 py-8">

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
                        onClick={onSignIn}
                    >
                        Login
                    </button>

                    <Link to={'/signup'} className='text-sm text-center text-gray-600 mt-4'>
                        New User?
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Login;





