import React from 'react'
import Image from 'next/image'
import { FcSearch } from "react-icons/fc";
import react from 'react';

function HeaderBar() {
    return (
        
        <div className='flex items-center justify-between p-5'>
            <div className='flex gap-5 items-center'>
                <Image src='/locationlogo.png' alt='logo' width={50} height={50} />
                <h2>Home</h2>
                <h2>Favourite</h2>
            </div>
            <div className="flex bg-gray-100 p-[6px] rounded-md w-[40%] gap-3" >
                <button><FcSearch /></button>
                <input type="text" placeholder='Search' className="bg-transparent outline-none w-full"/>
            </div>
            <div>
                <Image src='/eatLocationLogo.png' alt='logo' width={50} height={50} />
            </div>
        </div>
    )
}

export default HeaderBar