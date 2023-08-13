"use client";
import CategoryList from '../Component/Home/CategoryList';
import RangeSelect from '../Component/Home/RangeSelect';
import SelectRating from '../Component/Home/SelectRating';
import GoogleMapView from '../Component/Home/GoogleMapView';
import GlobalApi from '@/Shared/GlobalApi';
import { useEffect,useState, useContext} from 'react';
import { UserLocationProvider,useUserLocation } from '../../context/UserLocationContext'; // Import UserLocationProvider
import BusinessList from '../Component/Home/BusinessList';
import ForLoading from '../Component/Home/ForLoading';
import '../globals.css'


function DashboardContent() {
  const [category,setCategory]=useState();
  const [radius,setRadius]=useState(2500);
  const [businessList,setBusinessList]=useState([])
  const { userLocation } = useUserLocation();
  const [loading, setLoading]=useState(true);
  console.log('DashboardContent - userLocation:', userLocation);
  useEffect(() => {
    if (userLocation && userLocation.lat && userLocation.lng) {
      getGooglePlace();
    }
  }, [category, radius, userLocation]);

  const getGooglePlace = () => {
    setLoading(true);
    if (userLocation && userLocation.lat && userLocation.lng) {
      GlobalApi.getGooglePlace(category, radius, userLocation.lat, userLocation.lng)
        .then((resp) => setBusinessList(resp.data.product.results))
        .catch((error) => console.error('Error fetching data:', error))
        .finally(() => setLoading(false));
    }
  };
  return (
    <div className='grid grid-rows-2 grid-cols-5 h-screen'>
              <div className='md:absolute mx-2 w-[90%] md:w-[100%]'>
              {!loading?  <BusinessList businessList={businessList} />
          :
          <div className='flex gap-3'>
          {[1,2,3,4,5,6].map((item)=>(
              <ForLoading />
          ))}
          </div>
          }
      </div>
    <div className='row-start-2 col-start-1 col-span-2 flex justify-center items-center border p-4'>
      <div className='flex flex-col'>
          <CategoryList onCategoryChange={(value)=>setCategory(value)} />
          <RangeSelect onRadiusChange={(value)=>setRadius(value)} />
          <SelectRating />
        </div>
      </div>
      <div className='row-start-2 col-start-3 col-span-3'>
      <GoogleMapView />
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
