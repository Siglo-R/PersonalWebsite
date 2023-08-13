
import { createContext, useContext, useState } from 'react';
import { useEffect } from 'react';

const UserLocationContext = createContext();

export function UserLocationProvider({ children }) {
  const [userLocation, setUserLocation] = useState(null);

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(function (pos) {
      const locationData = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      };
      console.log('User location acquired:', locationData);
      setUserLocation(locationData);
    });
  };

  useEffect(() => {
    getUserLocation(); 
  }, []);

  
  return (
    <UserLocationContext.Provider value={{ userLocation, setUserLocation }}>
      {children}
    </UserLocationContext.Provider>
  );
}

export function useUserLocation() {
  return useContext(UserLocationContext);
}
