import React, { useEffect, useRef, useState } from 'react';

const MapWithMarkerComponent = ({ token, currentLat, currentLng }) => {
  const mapRef = useRef(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://apis.mappls.com/advancedmaps/api/${token}/map_sdk?layer=vector&v=3.0&callback=initMap`;
    script.async = true;
  
    script.onload = () => {
      window.initMap = () => {
        const map = new window.mappls.Map('map', {
          zoomControl: true,
          location: true
        });
        mapRef.current = map;
  
        const newMarker = new window.mappls.Marker({
          map: map,
          position: {
            lat: currentLat,
            lng: currentLng
          },
          fitbounds: true,
          icon_url: 'https://apis.mapmyindia.com/map_v3/1.png'
        });
        setMarker(newMarker);
      };
    };
  
    script.onerror = (error) => {
      console.error('Error loading map script:', error);
    };
  
    document.body.appendChild(script);
  
    return () => {
      document.body.removeChild(script);
      window.initMap = undefined;
    };
  }, [token, currentLat, currentLng]);

  useEffect(() => {
    if (marker) {
      marker.setPosition({
        lat: currentLat,
        lng: currentLng
      });
    }
  }, [currentLat, currentLng, marker]);

  return <div id="map" style={{ width: '100%', height: '19rem', borderRadius: '0.5rem' }}></div>;
};

export default MapWithMarkerComponent;
