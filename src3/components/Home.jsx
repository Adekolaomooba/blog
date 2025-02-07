

import React, { useEffect, useState } from 'react'
import { Navigate, NavLink } from 'react-router-dom'
import { deleteArticle, getAllNewsData } from './apiCalls/api'
import { parse } from 'postcss'
// import axios from 'axios'
// import newsArticles from '../assets/data/news.json'

function Home() {

    const [originalNewsArray, setOriginalNewsArray] = useState([])
    const [id, setId] = useState('')
    const [warning, setWarning] = useState(false)
    const [deletedNews, setDeletedNews] = useState({})
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    
    const fetchNewsArray = async () => {
        // try {
        //     const getData = await getAllNewsData()
        //     setOriginalNewsArray(getData)
        // } catch (error) {
        //     console.error('error fetching news', error)
        // }
        await getAllNewsData().then((res)=>{
            console.log(res);
            setOriginalNewsArray(res)
            
        }).catch((err)=>{
            console.log(err);
        })
    };

    
    const warningDisplay = (e) => {

        setWarning(true); 
        setId(e)
        console.log(e);
        
    }
    

    const deleteNewsHandler = () => {
        const fetchToBeDeleted = async () => {
            try {
                const getData = await deleteArticle(id)
                setDeletedNews(getData);
                alert('news article successfully deleted');
            } catch (error) {
                console.error('error deleting news', error)
            }
        };
        fetchToBeDeleted();
        setWarning(false);
        window.location.reload();

    }


    
    useEffect(()=>{
        const userDetails = JSON.parse(localStorage.getItem('userCredentials'));
        if (userDetails) {
            setIsLoggedIn(true)
        }
        fetchNewsArray()
    }, [])


    return (

        <div className=' w-full min-h-[85vh] bg-gray-500 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 px-[50px] gap-5 '>
            <div className={warning ? "absolute h-[90vh] w-full flex  justify-center bg-[#6b728081]" :
                "hidden"
            }>
                <div className='max-w-[400px] h-fit py-[50px] px-[50px] rounded-xl bg-gray-700 my-auto'>
                    <p className='text-center'>Are you sure you want to Delete this article?</p>
                    <div className='flex justify-center gap-5 bg-gray-700'>
                        <button className=' bg-gray-600 p-3 rounded hover:bg-gray-500 mt-4 '
                                onClick={()=>deleteNewsHandler()}>
                            Yes, Delete
                        </button>
                        <button className=' bg-gray-600 p-3 rounded hover:bg-gray-500 mt-4 '
                                onClick={()=>setWarning(false)}>
                            No, Cancel
                        </button>
                    </div>
                </div>
            </div>
            {
                originalNewsArray.map((element, index) => {
                    return (
                        <div key={index} className=' bg-gray-700  rounded overflow-hidden '>
                            <div>
                                <img
                                    src={element.img}
                                    alt="Bitcoin ATM breach news"
                                />
                            </div>
                            <div className=' p-5 flex flex-col gap-5 '>
                                <NavLink to={element.id.toString()}><h3 className=' text-white font-extrabold '> {element.title} </h3></NavLink>
                                <p className=' text-white font-extralight ' > {element.content} </p>
                                <hr />
                                <div className='flex justify-between'>
                                    <p className=' text-white font-bold '> {element.author} </p>
                                    <div className='flex gap-2'>
                                        <NavLink to={`editarticle/${index.toString()}`}>
                                            <button className={isLoggedIn ? 'p-3 bg-gray-500 rounded hover:bg-gray-600' : 'hidden'}>Edit</button>
                                        </NavLink>
                                        <button className={isLoggedIn ? 'p-3 bg-gray-500 rounded hover:bg-gray-600' : 'hidden'}
                                                onClick={()=>warningDisplay(element.id)}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>

    )
    // return (

    //     <div className=' w-full min-h-[85vh] bg-gray-500 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 px-[50px] gap-5 '>
    //         {
    //             newsArticles.map((element, index) => {
    //                 return (
    //                     <div key={index} className=' bg-gray-700  rounded overflow-hidden '>
    //                         <div>
    //                             <img
    //                                 src= {element.image}
    //                                 alt="Bitcoin ATM breach news"
    //                             />
    //                         </div>
    //                         <div className=' p-5 flex flex-col gap-5 '>
    //                             <NavLink to={element.id.toString()}><h3 className=' text-white font-extrabold '> {element.title} </h3></NavLink>
    //                             <p className=' text-white font-extralight ' > {element.description} </p>
    //                             <hr />
    //                             <p className=' text-white font-bold '> {element.author} </p>
    //                         </div>
    //                     </div>
    //                 )
    //             })
    //         }
    //     </div>

    // )
}

export default Home

{/* <div className=' w-full min-h-[90vh] bg-gray-500 grid grid-cols-3 px-[300px] gap-5 '>
            <div className=' bg-gray-700 rounded overflow-hidden '>
                <div>
                    <img
                        src="https://gizmodo.com/app/uploads/2024/12/BitcoinATM.jpg"
                        alt="Bitcoin ATM breach news"
                    />
                </div>
                <div className=' p-5 flex flex-col gap-5 '>
                    <h3 className=' text-white font-extrabold '>Bitcoin ATM Security Breach Compromised Social Security Numbers and Government IDs</h3>
                    <p className=' text-white font-extralight ' >Byte Federal operates 1,200 Bitcoin ATMs in the U.S. A data breach comprised 58,000
                        customer's information.</p>
                    <hr />
                    <p className=' text-white font-bold '>Matthew Gault</p>
                </div>
            </div>

            <div className=' bg-gray-700 rounded overflow-hidden '>
                <div>
                    <img
                        src="https://gizmodo.com/app/uploads/2024/12/BitcoinATM.jpg"
                        alt="Bitcoin ATM breach news"
                    />
                </div>
                <div className=' p-5 flex flex-col gap-5 '>
                    <h3 className=' text-white font-extrabold '>Bitcoin ATM Security Breach Compromised Social Security Numbers and Government IDs</h3>
                    <p className=' text-white font-extralight ' >Byte Federal operates 1,200 Bitcoin ATMs in the U.S. A data breach comprised 58,000
                        customer's information.</p>
                    <hr />
                    <p className=' text-white font-bold '>Matthew Gault</p>
                </div>
            </div>

            <div className=' bg-gray-700 rounded overflow-hidden '>
                <div>
                    <img
                        src="https://gizmodo.com/app/uploads/2024/12/BitcoinATM.jpg"
                        alt="Bitcoin ATM breach news"
                    />
                </div>
                <div className=' p-5 flex flex-col gap-5 '>
                    <h3 className=' text-white font-extrabold '>Bitcoin ATM Security Breach Compromised Social Security Numbers and Government IDs</h3>
                    <p className=' text-white font-extralight ' >Byte Federal operates 1,200 Bitcoin ATMs in the U.S. A data breach comprised 58,000
                        customer's information.</p>
                    <hr />
                    <p className=' text-white font-bold '>Matthew Gault</p>
                </div>
            </div>

            <div className=' bg-gray-700 rounded overflow-hidden '>
                <div>
                    <img
                        src="https://gizmodo.com/app/uploads/2024/12/BitcoinATM.jpg"
                        alt="Bitcoin ATM breach news"
                    />
                </div>
                <div className=' p-5 flex flex-col gap-5 '>
                    <h3 className=' text-white font-extrabold '>Bitcoin ATM Security Breach Compromised Social Security Numbers and Government IDs</h3>
                    <p className=' text-white font-extralight ' >Byte Federal operates 1,200 Bitcoin ATMs in the U.S. A data breach comprised 58,000
                        customer's information.</p>
                    <hr />
                    <p className=' text-white font-bold '>Matthew Gault</p>
                </div>
            </div>

            <div className=' bg-gray-700 rounded overflow-hidden '>
                <div>
                    <img
                        src="https://gizmodo.com/app/uploads/2024/12/BitcoinATM.jpg"
                        alt="Bitcoin ATM breach news"
                    />
                </div>
                <div className=' p-5 flex flex-col gap-5 '>
                    <h3 className=' text-white font-extrabold '>Bitcoin ATM Security Breach Compromised Social Security Numbers and Government IDs</h3>
                    <p className=' text-white font-extralight ' >Byte Federal operates 1,200 Bitcoin ATMs in the U.S. A data breach comprised 58,000
                        customer's information.</p>
                    <hr />
                    <p className=' text-white font-bold '>Matthew Gault</p>
                </div>
            </div>
        </div> */}