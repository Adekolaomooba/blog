import React from 'react'
import { Link } from 'react-router-dom'

export default function FooterArea() {
  return (
    <div className=' h-[5vh] w-full bg-gray-500 text-white flex justify-between px-[50px] 
                    content-center '>

        <h1 className=' h-fit my-auto '><Link to='/'>BLOG</Link></h1>
        <p className=' h-fit my-auto'>Copyright</p>
        <p className=' h-fit my-auto'>2025</p>

    </div>
  )
}
