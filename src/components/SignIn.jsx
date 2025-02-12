import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from './apiCalls/api'
import { all } from 'axios'
import { useRecoilState } from 'recoil'
import { TokenAtom } from '../utils/atoms/TokenAtoms'

export default function SignIn() {


    // useEffect(()=>{
    //     const fetchAllUser = async() => {
    //         const response = await getAllUser()
    //         setAllUser(response)
    //     }
    //     fetchAllUser()
    // }, [])

    const Navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [voidField, setVoidField] = useState('')
    const [tokenState, setTokenState] = useRecoilState(TokenAtom)
    const [passwordView, setPasswordView] = useState('password')


    const signInHandler = async (e) => {
        e.preventDefault();

        const payload = {
            username: username,
            password: password
        }

        

        if (username.length < 1 || password.length < 1) {
            setVoidField('All Fields Are Required');
            return;
        } else {
            const response = await loginUser(payload)
                console.log(response);
                
                if (response) {
                    const token = {
                        access: response.access,
                        refresh: response.refresh
                    }
                    
                    setTokenState(token)
                    alert('login Successful')
                    setVoidField('')
                    Navigate('/')
                    window.location.reload()
                    console.log(response);
            
            // try {
                
                    
            //     }
            // } catch (error) {
            //     console.log('caught the foolowing error', error );
                
            }
        }

        // console.log(userFinder);
        // console.log(betterPasswordFinder);


    }



    // console.log(allUser);
    // console.log(username);
    // console.log(password);

    const changePassType = () => {
        if (passwordView == 'text') {
            setPasswordView('password')
        } else if (passwordView == 'password') {
            setPasswordView('text')
        }
    }




    return (
        <div className='bg-gray-500 w-full min-h-[85vh] px-2 sm:px-[50px] '>
            <div className=' max-w-[400px] py-20 mx-auto '>
                <form className='w-full flex flex-col gap-3 ' action="">
                    <div className=' w-full mx-auto '>
                        <h3 className=' text-4xl '>Sign In</h3>

                    </div>
                    <div className=' w-full mx-auto '>
                        <label className=' block ' htmlFor="">UserName:</label>
                        <input className=' block w-full h-14 rounded text-black px-5 '
                            type="text"
                            value={username}
                            onChange={(e) => { setUsername(e.target.value) }} />
                    </div>
                    <div className=' w-full mx-auto relative '>
                        <label className=' block  ' htmlFor="">Password:</label>
                        <input className=' block w-full h-14 rounded text-black px-5 '
                            type={passwordView}
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }} />
                        
                        {
                            passwordView === 'password' && (<i className=' absolute bottom-5 right-5 text-black pi pi-eye '
                                onClick={changePassType} ></i>)
                            }
                        {
                            passwordView === 'text' && (<i className=' absolute bottom-5 right-5 text-black pi pi-eye-slash '
                                onClick={changePassType} ></i>)
                        }
                    </div>
                    <div className=' w-full mx-auto '>
                        <button className='w-full bg-gray-700 h-10 rounded-xl hover:bg-gray-600'
                            onClick={(e) => signInHandler(e)}>
                            Sign In
                        </button>
                        <p className='text-center text-red-700 bg-white mt-2 rounded px-1'>
                            {voidField}
                        </p>
                        <button className='w-full bg-gray-700 h-10 rounded-xl hover:bg-gray-600 mt-3'
                            onClick={() => { Navigate('/sign-up') }}>
                            don't have an account? sign-up now!
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
