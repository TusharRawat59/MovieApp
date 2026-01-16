import React, { useContext } from 'react'
import bg from "../assets/authBg.png"
import { useState } from 'react'
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { userDataContext } from '../context/UserContext';

import axios from "axios"

const SignUp = () => {
    const [showPassword, setshowPassword] = useState(false)
     const navigate = useNavigate()
     const [loading, setloading] = useState(false)
     const [name, setName] = useState("")
     const [email, setEmail] = useState("")
     const [password, setPassword] = useState("")
     const {serverUrl,userData, setuserData} = useContext(userDataContext)
     const [err, setErr] = useState("")

    const handleSignup=async (e)=>{
        e.preventDefault()
        setErr("")
        setloading(true)
        try {
            let result = await axios.post(`${serverUrl}/api/auth/signup`,{
                name,email,password
            },{withCredentials:true})
            setuserData(result.data)
            setloading(false)
            navigate("/home")
        } catch (error) {
            console.log(error)
            setloading(false)
            setErr(error.response.data.message)
        }
    }
    
    return (
        <div className='w-full h-[100vh] bg-cover flex justify-center items-center' style={{ backgroundImage: `url(${bg})` }}>

            <form className='w-[90%] h-[500px] max-w-[500px] shadow-lg shadow-black-400 flex flex-col items-center justify-center gap-[20px] bg-[#00000059] backdrop-blur px-[20px]' onSubmit={handleSignup}>
                <h1 className='text-white text-[30px] font-semibold mb-[30px]'>Register to <span className='text-red-500'>MovieImdb</span></h1>
                <input type="text" placeholder='Enter your Name' className='w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full' required onChange={(e) => setName(e.target.value)} value={name} />
                <input type="email" placeholder='Email' className='w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]' required onChange={(e) => setEmail(e.target.value)} value={email} />

                <div className="relative w-full h-[60px]">
                    <input
                        type={showPassword ? "text" : "password"}
                        className="w-full h-full outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] pr-[50px] rounded-full"
                        placeholder="Password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />

                    {!showPassword ? (
                        <IoIosEye
                            className="cursor-pointer absolute top-1/2 right-[20px] w-[25px] h-[25px] text-white transform -translate-y-1/2"
                            onClick={() => setshowPassword(true)}
                        />
                    ) : (
                        <IoIosEyeOff
                            className="cursor-pointer absolute top-1/2 right-[20px] w-[25px] h-[25px] text-white transform -translate-y-1/2"
                            onClick={() => setshowPassword(false)}
                        />
                    )}

                </div>

                {err.length > 0 && <p className='text-red-500'>
                    *{err}
                </p>}
                <button className='min-w-[150px] h-[60px] bg-white mt-[30px] text-black font-semibold rounded-2xl' disabled={loading} >{loading ? "loading..." : "sign up"} </button>


                <p className='text-white text-[18px] cursor-pointer' onClick={() => { navigate("/signin") }}>Already have an account ? <span className='text-blue-400' >sign in</span></p>
            </form>

        </div>
    )
}

export default SignUp
