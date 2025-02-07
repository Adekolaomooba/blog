import React, { useEffect, useState } from 'react'
import { addNewsUser, getAllUser } from './apiCalls/api'
import { useNavigate } from 'react-router-dom'

export default function SignUp() {


    const [name, setName] = useState('')
    const [gender, setGender] = useState('')
    const [email, setEmail] = useState('')
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [newUserDetails, setNewUserDetails] = useState({})
    const [allUser, setAllUser] = useState([])
    const [requiredAlert, setRequiredAlert] = useState('')
    const [emailVerify, setEmailVerify] = useState('')
    const [useNameVerify, setUserNameVerify] = useState('')

    useEffect(() => {
        const fetchAllUser = async () => {
            const res = await getAllUser();
            setAllUser(res);
        }
        fetchAllUser()
    }, [])

    const Navigate = useNavigate()

    const nameUpdater = (e) => {
        setName(e.target.value)
    }

    const genderUpdater = (e) => {
        setGender(e.target.value)
    }

    const emailUpdater = (e) => {
        setEmail(e.target.value)
    }

    const UserNameUpdater = (e) => {
        setUserName(e.target.value)
    }

    const PasswordUpdater = (e) => {
        setPassword(e.target.value)
    }

    const newUserAdder = async (e) => {
        e.preventDefault()
        const newUser = {
            name: name,
            email: email,
            username: userName,
            password: password,
            gender: gender,
            role: 'Subscriber'
        }
        const emailFinder = allUser.findIndex((item) => item.email === newUser.email) !== -1
        const UserNameFinder = allUser.findIndex((item) => item.username === newUser.username) !== -1


        if (name.length < 1 || gender == '' || email.length < 1 || userName.length < 1 || password.length < 1) {
            setRequiredAlert('All Feeds Are Required')
            return;
        } else if (emailFinder) {
            setEmailVerify('An Account With This Email Already exist');
            return;

        } else if (UserNameFinder) {
            setUserNameVerify('Another User Already Chose This Username, please choose another one');
            setEmailVerify('')
            return;
        } else {
            try {
                const response = await addNewsUser(newUser);
                setNewUserDetails(response);
                if (response) {
                    setName('')
                    setEmail('')
                    setUserName('')
                    setPassword('')
                    setGender('')
                    setUserNameVerify('')
                    setEmailVerify('')
                    alert('sign up Successful! you will now be redirected to sign in')
                    Navigate('/sign-in')
                } else {
                    alert('unable to add new user')
                }

            }
            catch (error) {
                console.error('unable to fetch user', error)
            }

        }

    }

        // console.log(name);
        // console.log(gender);
        // console.log(email);
        // console.log(userName);
        // console.log(password);
        // console.log(allUser);







        return (
            <div className='bg-gray-500 w-full min-h-[85vh] px-[50px] '>
                <div className=' max-w-[400px] py-20 mx-auto '>
                    <form className='w-full flex flex-col gap-3 ' action="">
                        <div className=' w-full mx-auto '>
                            <h3 className=' text-4xl '>Sign Up</h3>

                        </div>
                        <div className=' w-full mx-auto '>
                            <label className=' block ' htmlFor="">Name:</label>
                            <input className=' block w-full h-14 rounded text-black px-5 '
                                type="text"
                                onChange={(e) => nameUpdater(e)}
                                value={name} />
                        </div>
                        <div className=' w-full mx-auto '>
                            <label className=' block ' htmlFor="">Gender:</label>
                            <select name="" id="" className=' block w-full h-14 rounded text-black px-5 '
                                onChange={(e) => genderUpdater(e)}
                                value={gender}>
                                <option value="">select yoour gender</option>
                                <option value='Male'>Male</option>
                                <option value='Female'>Female</option>
                            </select>
                        </div>
                        <div className=' w-full mx-auto '>
                            <label className=' block ' htmlFor="">Email:</label>
                            <input className=' block w-full h-14 rounded text-black px-5 '
                                type="email"
                                onChange={(e) => emailUpdater(e)}
                                value={email} />
                            <p className='text-center text-red-700 bg-white mt-2 rounded'>{emailVerify}</p>
                        </div>
                        <div className=' w-full mx-auto '>
                            <label className=' block ' htmlFor="">User Name:</label>
                            <input className=' block w-full h-14 rounded text-black px-5 '
                                type="text"
                                onChange={(e) => UserNameUpdater(e)}
                                value={userName} />
                            <p className='text-center text-red-700 bg-white mt-2 rounded'>{useNameVerify}</p>
                        </div>
                        <div className=' w-full mx-auto '>
                            <label className=' block ' htmlFor="">Password:</label>
                            <input className=' block w-full h-14 rounded text-black px-5 '
                                type="password"
                                onChange={(e) => PasswordUpdater(e)}
                                value={password} />
                        </div>

                        <div className=' w-full mx-auto '>
                            <button className='w-full bg-gray-700 h-10 rounded-xl hover:bg-gray-600'
                                onClick={newUserAdder}>
                                Sign Up
                            </button>
                            <button className='w-full bg-gray-700 h-10 rounded-xl hover:bg-gray-600 mt-2'
                                onClick={() => { Navigate('/sign-in') }}>
                                Already have an account? sign-in now!
                            </button>
                            <p className='text-center text-red-700 bg-white rounded mt-3'>
                                {requiredAlert}
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
