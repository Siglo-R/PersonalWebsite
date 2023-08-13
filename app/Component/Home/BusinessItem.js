import React from 'react';
import Image from 'next/image';

function BusinessItem({ business }) {
    const GOOGLE_API_KEY = 'AIzaSyCgQataW-Z6ilAdwxgXDHUo6KluOYWgtxE';
    const photo_ref = business?.photos ? business?.photos[0]?.photo_reference : '';
  
    return (
      <div className='w-[300px] h-[39vh] p-4 bg-white shadow-md rounded-md flex flex-col justify-between transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer'>
        <div className='flex justify-center'>
          <Image
            src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo_ref}&key=${GOOGLE_API_KEY}`}
            alt={business.name}
            width={200}
             height={200}
            className='rounded-lg h-[200px] w-[200px]'
          />
        </div>
        <div className='p-4 flex flex-col space-y-2'>
          <h2 className='text-lg font-semibold text-sm truncate'>{business.name}</h2>
          <p className='text-gray-600 text-sm truncate'>{business.formatted_address}</p>
          <div className='flex items-center space-x-2'>
            <span className='text-green-500 font-semibold'>{business.rating}</span>
            <span className='text-gray-500'>&#9733;</span>
          </div>
        </div>
      </div>
    );
  }
  
  export default BusinessItem;
  
  