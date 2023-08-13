import { GoogleMap, LoadScript, Marker, MarkerF } from '@react-google-maps/api';
import React, { useContext } from 'react';
import BusinessMarker from './BusinessMarker';
import  BusinessContext  from '@/app/Component/Home/BusinessContext';
import { UserLocationProvider } from '@/app/Component/Home/UserLocationContext';

function GoogleMapView({ businessList }) {
  const { selectedBusiness } = useContext(BusinessContext)
  const userLocation=useUserLocation;
  const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  const containerStyle = {
    width: '100%',
    height: '50vh',
  };

  const coordinate = selectedBusiness
    ? selectedBusiness.geometry.location
    : { lat: 14.1153, lng: 120.9621 };

  return (
    <div>
      <LoadScript
        mapIds={['356ee82af7a33b7f']}
        googleMapsApiKey={GOOGLE_API_KEY}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={coordinate}
          zoom={selectedBusiness ? 15 : 13} 
          options={{ mapId: '356ee82af7a33b7f' }}
        >
          {userLocation && ( // Display user location marker if available
            <Marker position={userLocation} label="You are here" />
          )}
          {businessList.map((item, index) => index <= 30 && <BusinessMarker business={item} key={index} />)}

          
          {selectedBusiness && (
            <Marker position={selectedBusiness.geometry.location} />
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default GoogleMapView;
