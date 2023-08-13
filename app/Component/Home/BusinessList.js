import React, { useContext, useRef } from 'react';
import BusinessItem from './BusinessItem';
import '../../globals.css'
import BusinessContext from '@/app/Component/Home/BusinessContext';

function BusinessList({ businessList }) {
    const sortedBusinessList = [...businessList].sort((a, b) => b.rating - a.rating);
    const { businessContext,setBusinessContext } = useContext(BusinessContext)
    const elementRef=useRef(null);
    const slideRight=(element)=>{
        element.scrollLeft+=500;
    }
    const slideLeft=(element)=>{
        element.scrollLeft-=500;
    }
  return (
    <div>


    <div className='flex overflow-x-auto'>
    <div className='flex overflow-scroll overflow-x-auto
    scrollbar-hide scroll-smooth' ref={elementRef}>
        {sortedBusinessList.map((item, index) => (
          <div key={index} className='mr-1 mb-6 ' onClick={()=>setBusinessContext(item)}>
            <BusinessItem business={item} />
          </div>
        ))}
      </div>

      <svg xmlns="http://www.w3.org/2000/svg"  
            fill="none" viewBox="0 0 24 24" 
            onClick={()=>slideLeft(elementRef.current)} 
            strokeWidth={1.5} stroke="currentColor" 
            className="w-8 h-8 absolute rotate-180 top-[35%]
            bg-gray-300 cursor-pointer p-1 rounded-full text-white">
            <path strokeLinecap="round" 
            strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>

      <svg xmlns="http://www.w3.org/2000/svg"
            onClick={()=>slideRight(elementRef.current)} 
            fill="none" viewBox="0 0 24 24" 
            strokeWidth={1.5} stroke="currentColor" 
            className="w-8 h-8 absolute right-0 top-[35%]
            bg-gray-300 cursor-pointer p-1 rounded-full text-white">
            <path strokeLinecap="round" 
            strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
    </div>
    </div>
  );
}

export default BusinessList;
