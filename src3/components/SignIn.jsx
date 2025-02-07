import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from './apiCalls/userApi'

export default function SignIn() {

    const Navigate = useNavigate()
    const [allUser, setAllUser] = useState([])
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userDetails, setUserDetails] = useState({})
    const [voidField, setVoidField] = useState('')
    const navigate = useNavigate()

    const logUser = async(e) => {
        e.preventDefault();

        const payload = {
            username: email,
            password: password
        }

        await loginUser(payload).then((res)=>{
            localStorage.setItem('token', JSON.stringify(res.data))
            navigate('/')
            console.log(res);
            
        })

    }
 

    return (
        <div className='bg-gray-500 w-full min-h-[85vh] px-[50px] '>
            <div className=' max-w-[400px] py-20 mx-auto '>
                <form className='w-full flex flex-col gap-3 ' action="">
                    <div className=' w-full mx-auto '>
                        <h3 className=' text-4xl '>Sign In</h3>

                    </div>
                    <div className=' w-full mx-auto '>
                        <label className=' block ' htmlFor="">Email:</label>
                        <input className=' block w-full h-14 rounded text-black px-5 ' 
                                type="text" 
                                value={email}
                                onChange={(e)=>{setEmail(e.target.value)}}/>
                    </div>
                    <div className=' w-full mx-auto '>
                        <label className=' block ' htmlFor="">Password:</label>
                        <input className=' block w-full h-14 rounded text-black px-5 ' 
                        type="password"
                        value={password}
                        onChange={(e)=>{setPassword(e.target.value)}} />
                    </div>
                    <div className=' w-full mx-auto '>
                        <button className='w-full bg-gray-700 h-10 rounded-xl hover:bg-gray-600'
                                onClick={(e)=>logUser(e)}>
                            Sign In
                        </button>
                        <p className='text-center text-red-700 bg-white mt-2 rounded px-1'>
                            {voidField}
                        </p>
                        <button className='w-full bg-gray-700 h-10 rounded-xl hover:bg-gray-600 mt-3'
                                onClick={()=>{Navigate('/sign-up')}}>
                            don't have an account? sign-up now!
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
