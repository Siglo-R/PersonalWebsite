import React from 'react';
import Image from 'next/image';
import { useBusinessContext } from '@/context/BusinessContext';

function BusinessItem({ business }) {
  const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  const photo_ref = business?.photos ? business?.photos[0]?.photo_reference : '';
  const { setSelectedBusiness } = useBusinessContext();
  
  const handleItemClick = () => {
    console.log('Clicked on BusinessItem:', business.name);
    console.log('Business data:', business);
    setSelectedBusiness(business);
  };

  return (
    <div
      className='w-full sm:w-[300px] h-[39vh] p-4 bg-white shadow-md rounded-md flex flex-col justify-between duration-300 hover:scale-95 cursor-pointer'
      onClick={handleItemClick}
      style={{ marginTop: '20px' }}
    >
      <div className='flex justify-center'>
        <Image
          src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo_ref}&key=${GOOGLE_API_KEY}`}
          alt={business.name}
          width={200}
          height={200}
          className='rounded-lg h-[200px] w-[200px]'
        />
      </div>
      <div className='p-2 flex flex-col space-y-1'>
        <h2 className='font-semibold text-xs sm:text-sm truncate'>{business.name}</h2>
        <p className='text-gray-600 text-xs sm:text-sm truncate'>{business.formatted_address}</p>
        <div className='flex items-center space-x-2 text-xs sm:text-sm'>
          <span className='text-green-500 font-semibold'>{business.rating}</span>
          <span className='text-yellow-500 '>&#9733;</span>
        </div>
      </div>
    </div>
  );
}

export default BusinessItem;
