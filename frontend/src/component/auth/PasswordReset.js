import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './PasswordReset.css'
import { ContextProvider } from '../../service/Context'

const PasswordReset = () => {
    const { passwordReset } = useContext(ContextProvider)

    const navigate = useNavigate()
    const [loading, setLoading] = useState(true);
    const [gmail, setGmail] = useState("")
    const [password, setPassword] = useState("")
    const [conformPassword, setConformPassword] = useState("")


    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [conformPasswordError, setConformPasswordError] = useState("");

    useEffect(() => {

        let status = JSON.parse(localStorage.getItem("wallMat"));
        if (status.login) {
            navigate('/')
            setLoading(false)
        }
        setLoading(false)





    }, [])

    const onResetPassword = async () => {

        if (gmail === "") {
            setEmailError("Required")
        }
        if (password === "") {
            setPasswordError("Required")
        }
        if (conformPassword === "") {
            setConformPasswordError("Required")
        }
        if (password !== conformPassword) {
            return setConformPasswordError("Password not match")
        }
        if (gmail === "" || password === "" || conformPassword === "") {
            return

        } else {
            const res = await passwordReset({ gmail, password })
            console.log(res.for)
            if (res.success === true) {
               
                navigate('/login');
                setGmail("")
                setPassword("")
                setConformPassword("")
            } else if(res.success === false) {
                console.log("failed")
                if (res.for === "gmail") {
                    setEmailError(res.message)
                }
                
            }
        }




    }

    return (
        // <div>

        //     <h1>Reset Password</h1>
        //     <div className="gamil flex flex-col gap-0">
        //         <div className="flex gap-2 items-center">
        //             <label htmlFor="userName" className='font-medium capitalize '>Gmail</label>
        //             <p className='text-red-500 text-[12px] '>{emailError}</p>
        //         </div>


        //         <input type="text" name="" id="username" placeholder='Enter Your Gmail' className='focus:outline-none  border-b-2 border-gray-300  py-1 ' value={gmail} onChange={(e) => { setGmail(e.target.value); setEmailError("");  }} />
        //     </div>
        //     <div className="password flex flex-col gap-0 ">

        //         <div className="flex gap-2 items-center">
        //             <label htmlFor="userName" className='font-medium capitalize'>Password</label>
        //             <p className='text-red-500 text-[12px] '>{passwordError}</p>
        //         </div>

        //         <input type="text" name="" id="username" placeholder='Enter Your Password' className='focus:outline-none  border-b-2 border-gray-300  py-1 ' value={password} onChange={(e) => { setPassword(e.target.value); setPasswordError("");  }} />
        //     </div>
        //     <div className="conformPassword flex flex-col gap-0 ">

        //         <div className="flex gap-2 items-center">
        //             <label htmlFor="userName" className='font-medium capitalize'>conformPassword</label>
        //             <p className='text-red-500 text-[12px] '>{conformPasswordError}</p>
        //         </div>

        //         <input type="text" name="" id="username" placeholder='Enter Your Password' className='focus:outline-none  border-b-2 border-gray-300  py-1 ' value={conformPassword} onChange={(e) => { setConformPassword(e.target.value); setConformPasswordError("");  }} />
        //     </div>

        //     <button onClick={()=>onResetPassword()}>Reset</button>
        // </div>
        <div className="flex flex-col justify-center items-center w-full  sm:p-x-[32px] sm:pb-[24px]">
            <div className="reset-password-form flex flex-col gap-3 w-full max-w-[450px] px-[12px] mt-8 py-[12px] rounded-lg h-full sm:p-[32px]">
                <div className="title font-bold capitalize text-[32px]">Reset Password</div>

                <div className="gmail flex flex-col gap-1">
                    <div className="flex gap-2 items-center">
                        <label htmlFor="gmail" className='font-semibold capitalize'>Email</label>
                        <p className='text-red-500 text-[12px]'>{emailError}</p>
                    </div>
                    <input
                        type="text"
                        id="gmail"
                        placeholder='Enter Your Gmail'
                        className='focus:outline-none py-2 px-2 rounded border-b-2 border-gray-300'
                        value={gmail}
                        onChange={(e) => { setGmail(e.target.value); setEmailError(""); }}
                    />
                </div>

                <div className="password flex flex-col gap-1">
                    <div className="flex gap-2 items-center">
                        <label htmlFor="password" className='font-semibold capitalize'>Password</label>
                        <p className='text-red-500 text-[12px]'>{passwordError}</p>
                    </div>
                    <input
                        type="text"
                        id="password"
                        placeholder='Enter Your Password'
                        className='focus:outline-none py-2 px-2 rounded border-b-2 border-gray-300'
                        value={password}
                        onChange={(e) => { setPassword(e.target.value); setPasswordError(""); }}
                    />
                </div>

                <div className="confirm-password flex flex-col gap-1">
                    <div className="flex gap-2 items-center">
                        <label htmlFor="confirm-password" className='font-semibold capitalize'>Confirm Password</label>
                        <p className='text-red-500 text-[12px]'>{conformPasswordError}</p>
                    </div>
                    <input
                        type="text"
                        id="confirm-password"
                        placeholder='Enter Your Password Again'
                        className='focus:outline-none py-2 px-2 rounded border-b-2 border-gray-300'
                        value={conformPassword}
                        onChange={(e) => { setConformPassword(e.target.value); setConformPasswordError(""); }}
                    />
                </div>

                <button
                    className='px-4 py-2 font-medium capitalize bg-[#FA9C23] text-white rounded mt-4'
                    onClick={() => onResetPassword()}
                >
                    Reset
                </button>
            </div>
        </div>

    )
}

export default PasswordReset