import { GoogleMap, LoadScript } from '@react-google-maps/api';
import React from 'react';

function GoogleMapView() {
  const containerStyle = {
    width: '100%',
    height: '50vh' 
  };
  const coordinate = { lat: 14.1153, lng: 120.9621 };
  
  return (
    <div>
      <LoadScript 
      mapIds={['356ee82af7a33b7f']}
      googleMapsApiKey={"AIzaSyCgQataW-Z6ilAdwxgXDHUo6KluOYWgtxE"}
      
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={coordinate} // Moved center and zoom props here
          zoom={13}
          options={{mapId:'356ee82af7a33b7f'}}
        >
          {/* Any additional components or markers */}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default GoogleMapView;
