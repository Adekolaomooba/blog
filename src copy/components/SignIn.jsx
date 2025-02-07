import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllUser } from './apiCalls/api'
import { all } from 'axios'

export default function SignIn() {

    const Navigate = useNavigate()
    const [allUser, setAllUser] = useState([])
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userDetails, setUserDetails] = useState({})
    const [voidField, setVoidField] = useState('')

    useEffect(()=>{
        const fetchAllUser = async() => {
            const response = await getAllUser()
            setAllUser(response)
        }
        fetchAllUser()
    }, [])

    const signInHandler = (e) => {

        
        e.preventDefault();

        const typedDetails = {
            email: email,
            password: password
        }

        const emailChecker = allUser.findIndex((item) => item.email == typedDetails.email) 
        const passwordChecker = allUser.findIndex((item) => item.password == typedDetails.password) 
        const userFinder = allUser.find(e => e.email === typedDetails.email && e.password === typedDetails.password)
        // const betterPasswordFinder = allUser.find(e => e.password === typedDetails.password)
        
        if (email.length < 1 || password.length < 1) {
            setVoidField('All Fields Are Required');
            return;
        } else if (emailChecker == -1 && passwordChecker !== -1 ) {
            setVoidField('Your Email is wrong');
            return;
        } else if (emailChecker !== -1 && passwordChecker == -1 ) {
            setVoidField('Your Password is wrong');
            return;
        } else if (emailChecker == -1 && passwordChecker == -1 ) {
            setVoidField('Both Credentials are wrong');
            return;
        } else if (!userFinder) {
            setVoidField('please check your details and try again')
        } else {
            localStorage.setItem('userCredentials', JSON.stringify(allUser[emailChecker]));
            alert('login Successful')
            setVoidField('')
            Navigate('/')
            window.location.reload()
        }
        
        // console.log(userFinder);
        // console.log(betterPasswordFinder);
        
        
    }

    

    // console.log(allUser);
    // console.log(email);
    // console.log(password);
    
    
    

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
                                type="email" 
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
                                onClick={(e)=>signInHandler(e)}>
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
