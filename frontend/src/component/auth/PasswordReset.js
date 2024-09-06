import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import './PasswordReset.css'
import { ContextProvider } from '../../service/Context'
import usePopUp from '../popup/PopUp';

const PasswordReset = () => {
    const { triggerPopUp, PopUp } = usePopUp();
    const { passwordReset,  setVisibleSearch } = useContext(ContextProvider)

    const navigate = useNavigate()
    const [loading, setLoading] = useState(true);
    const [gmail, setGmail] = useState("")
    const [password, setPassword] = useState("")
    const [conformPassword, setConformPassword] = useState("")


    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [conformPasswordError, setConformPasswordError] = useState("");

    useEffect(() => {
        setVisibleSearch(false)

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
                triggerPopUp(true, 'Password Reset Successfully');
                navigate('/login');
                setGmail("")
                setPassword("")
                setConformPassword("")
            } else if (res.success === false) {
                console.log("failed")
                if (res.for === "gmail") {
                    setEmailError(res.message)
                }

            }
        }




    }

    return (
       


        <div className="flex flex-col justify-center items-center w-full sm:px-[32px] sm:pb-[24px] min-h-screen">
            <div className="flex flex-col gap-3 w-full max-w-[450px] px-[12px] mt-8 py-[12px] rounded-lg sm:p-[32px] bg-white sm:shadow-lg">
                <div className="font-bold capitalize text-[24px]">Reset Password</div>

                <div className="flex flex-col gap-1">
                    <div className="flex gap-2 items-center">
                        <label htmlFor="gmail" className="font-semibold capitalize">Email</label>
                        <p className="text-red-500 text-[12px]">{emailError}</p>
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
                    <div className="flex gap-2 items-center">
                        <label htmlFor="password" className="font-semibold capitalize">Password</label>
                        <p className="text-red-500 text-[12px]">{passwordError}</p>
                    </div>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter Your Password"
                        className="focus:outline-none py-2 px-2 rounded border-b-2 border-gray-300"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value); setPasswordError(""); }}
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <div className="flex gap-2 items-center">
                        <label htmlFor="confirm-password" className="font-semibold capitalize">Confirm Password</label>
                        <p className="text-red-500 text-[12px]">{conformPasswordError}</p>
                    </div>
                    <input
                        type="password"
                        id="confirm-password"
                        placeholder="Enter Your Password Again"
                        className="focus:outline-none py-2 px-2 rounded border-b-2 border-gray-300"
                        value={conformPassword}
                        onChange={(e) => { setConformPassword(e.target.value); setConformPasswordError(""); }}
                    />
                </div>

                <button
                    className="px-4 py-2 font-medium capitalize bg-[#FA9C23] text-white rounded mt-4"
                    onClick={() => onResetPassword()}
                >
                    Reset
                </button>
            </div>
        </div>




    )
}

export default PasswordReset
