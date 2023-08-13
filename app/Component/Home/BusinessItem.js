import React, { useContext, useState, useEffect } from 'react';
import Image from 'next/image';
import { BusinessContext } from '@/app/Component/Home/BusinessContext';
import { UserLocationProvider, useUserLocation } from '@/app/Component/Home/UserLocationContext';

function BusinessItem({ business }) {
  const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY; // Use process.env to access your API key
  const photo_ref = business?.photos ? business?.photos[0]?.photo_reference : '';
  const { setSelectedBusiness } = useContext(BusinessContext);
  const { userLocation } = useUserLocation();
  const handleItemClick = () => {
    console.log('Clicked on BusinessItem:', business.name);
    console.log('Business data:', business);
    setSelectedBusiness(business);
  };
  const [distance, setDistance] = useState();
  useEffect(() => {
    calculateDistance(
      business.geometry.location.lat,
      business.geometry.location.lng,
      userLocation.lat,
      userLocation.lng
    );
  }, []);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const earthRadius = 6371; // in kilometers

    const degToRad = (deg) => {
      return deg * (Math.PI / 180);
    };

    const dLat = degToRad(lat2 - lat1);
    const dLon = degToRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = earthRadius * c;

    setDistance(distance.toFixed(1));
    return distance.toFixed(2); // Return the distance with 2 decimal places
  };

  return (
    <div
      className='w-[300px] h-[39vh] p-4 bg-white shadow-md rounded-md flex flex-col justify-between duration-300 hover:scale-95 cursor-pointer'
      onClick={handleItemClick}
      style={{ marginTop: '20px' }} // Add margin to the top
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
      <div className='p-2 flex flex-col space-y-2'>
        <h2 className='font-semibold text-sm truncate'>{business.name}</h2>
        <p className='text-gray-600 text-sm truncate'>{business.formatted_address}</p>
        <div className='flex items-center space-x-2'>
          <span className='text-green-500 font-semibold'>{business.rating}</span>
          <span className='text-gray-500'>&#9733;</span>
        </div>
        <div className='border-t-1'>
          <h2 className='text-[#0075ff] flex justify-between items-center'>
            Distance: {distance} KM from current location
          </h2>
        </div>
      </div>
    </div>
  );
}

export default BusinessItem;
