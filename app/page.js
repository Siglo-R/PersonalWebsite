"use client"
import React, { useState, useEffect, useContext } from 'react';
import CategoryList from './Component/Home/CategoryList';
import RangeSelect from './Component/Home/RangeSelect';
import SelectRating from './Component/Home/SelectRating'; // Import the SelectRating component
import GoogleMapView from './Component/Home/GoogleMapView';
import GlobalApi from '@/shared/GlobalApi';
import { UserLocationProvider, useUserLocation } from '@/app/Component/Home/UserLocationContext';
import BusinessList from './Component/Home/BusinessList';
import { BusinessContext } from '@/app/Component/Home/BusinessContext';
import ForLoading from './Component/Home/ForLoading';
import './globals.css'

function DashboardContent() {
  const { setSelectedBusiness } = useContext(BusinessContext);
  const [category, setCategory] = useState('places in tagaytay');
  const [radius, setRadius] = useState(25);
  const [businessList, setBusinessList] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]); // Add state for selected ratings
  const { userLocation } = useUserLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userLocation && userLocation.lat && userLocation.lng) {
      getGooglePlace();
    }
  }, [category, radius, userLocation, selectedRatings]); // Include selectedRatings in the dependency array

  const getGooglePlace = () => {
    setLoading(true);
    if (userLocation && userLocation.lat && userLocation.lng) {
      GlobalApi.getGooglePlace(category, radius, userLocation.lat, userLocation.lng, selectedRatings) // Pass selectedRatings to API call
        .then((resp) => setBusinessList(resp.data.product.results))
        .catch((error) => console.error('Error fetching data:', error))
        .finally(() => setLoading(false));
    }
  };

  return (
    <div className='grid grid-rows-2 grid-cols-5 h-screen'>
      <div className='md:absolute mx-2 w-[90%] md:w-[99%]'>
        {!loading ? (
          <BusinessList businessList={businessList} setSelectedBusiness={setSelectedBusiness} />
        ) : (
          <div className='flex gap-3'>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <ForLoading />
            ))}
          </div>
        )}
      </div>
      <div className='row-start-2 col-start-1 col-span-2 flex justify-center items-center border p-4'>
        <div className='flex flex-col'>
          <CategoryList onCategoryChange={(value) => setCategory(value)} />
          <RangeSelect onRadiusChange={(value) => setRadius(value)} />
          {/* <SelectRating onSelectRatings={(ratings) => setSelectedRatings(ratings)} /> Pass the callback */}
        </div>
      </div>
      <div className='row-start-2 col-start-3 col-span-3'>
        <GoogleMapView businessList={businessList} />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <UserLocationProvider>
      <DashboardContent />
    </UserLocationProvider>
  );
}
