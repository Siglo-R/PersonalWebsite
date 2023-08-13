import { MarkerF, OverlayView } from '@react-google-maps/api';
import React, { useContext, useEffect, useState } from 'react';
import { BusinessContext } from '../../../context/BusinessContext';
import Image from 'next/image';
import { UserLocationProvider,useUserLocation } from '../../../context/UserLocationContext'; 



function BusinessMarker({ business }) {
    const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
    const { selectedBusiness, setSelectedBusiness } = useContext(BusinessContext);
    const [isHovered, setIsHovered] = useState(false);
    const { userLocation } = useUserLocation();
    const[distance,setDistance]=useState();
    useEffect(()=>{
        calculateDistance(
            business.geometry.location.lat,
            business.geometry.location.lng,
            userLocation.lat,
            userLocation.lng
        )
    },[])
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
       
        setDistance(distance.toFixed(1))
        return distance.toFixed(2); // Return the distance with 2 decimal places
      };


    const handleMarkerClick = () => {
        console.log('Clicked on BusinessMarker:', business.name);
        console.log('Business data:', business);
        setSelectedBusiness(business);
    };

    const onDirectionClick=()=>{
        window.open('https://www.google.com/maps/dir/?api=1&origin='+
        userLocation.lat+','+userLocation.lng+'&destination='
        +business.geometry.location.lat
        +','+business.geometry.location.lng+'&travelmode=driving')
    }

    const arrowSize = '10px';
    const overlayViewStyle = {
        width: '200px',
        padding: '10px',
        backgroundColor: 'white',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        borderRadius: '4px',
        position: 'relative',
        left: '-100px',
        top: '10px'
    };

    const mapContainerSize = 400; // Set the size of your map container here

    // Calculate image dimensions based on available space
    const imageWidth = mapContainerSize * 0.45; // 20% of map container width
    const imageHeight = (3 / 4) * imageWidth; // Maintain 4:3 aspect ratio

    const imageStyle = {
        width: `${imageWidth}px`,
        height: `${imageHeight}px`,
        marginBottom: '8px',
        borderRadius: '4px',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer'
    };
    const arrowStyle = {
        content: '',
        position: 'absolute',
        top: '-10px', // Adjust arrow position
        left: '50%', // Center the arrow horizontally
        marginLeft: `-${arrowSize}`, // Center the arrow horizontally
        width: '0',
        height: '0',
        borderLeft: `${arrowSize} solid transparent`,
        borderRight: `${arrowSize} solid transparent`,
        borderBottom: `${arrowSize} solid white`,
    };

    const businessNameStyle = {
        fontSize: '14px',
        fontWeight: 'bold',
        color: isHovered ? 'blue' : 'black',
    };

    const getDirectionContainerStyle = {
        display: 'flex',
        justifyContent: 'space-between', // Align items at the ends
        alignItems: 'center', // Vertically center the items
        marginTop: '8px',
    };

    return (
        <div>
            <MarkerF
                position={business.geometry.location}
                onClick={handleMarkerClick}
                onMouseOver={() => setIsHovered(true)}
                onMouseOut={() => setIsHovered(false)}
                icon={{
                    url: '/redbutton.png',
                    scaledSize: {
                        width: 7,
                        height: 7,
                    },
                }}
            >
                {selectedBusiness && selectedBusiness.reference === business.reference ? (
                    <OverlayView
                        position={business.geometry.location}
                        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                    >
                        <div style={overlayViewStyle}>
                            <div style={arrowStyle}></div>
                            <div>
                                {/* Display the image */}
                                <Image
                            src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${business?.photos[0]?.photo_reference}&key=${GOOGLE_API_KEY}`}
                            alt={business.name}
                            width={imageWidth}
                            height={imageHeight}
                            style={imageStyle}
                        />
                            </div>
                            <div style={businessNameStyle}>{business.name}</div>
                            <div className='border=t-[3px]'>
                                <h2>{business.formatted_address}</h2>
                            </div>
                            <div className='border=t-[3px]' style={getDirectionContainerStyle}>
                                <h2 >Dist: {distance} KM</h2>
                                <span className='
                                border-[1px] p-1 rounded-full
                                text-[#0075ff]
                                hover:text-white
                                hover:bg-blue-500 
                                cursor-pointer'
                                onClick={()=>onDirectionClick()}>Get Direction</span>
                            </div>
                        </div>
                    </OverlayView>
                ) : null}
            </MarkerF>
        </div>
    );
}

export default BusinessMarker;
