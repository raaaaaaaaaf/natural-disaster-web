import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken =
  'pk.eyJ1IjoicnJpZGFkIiwiYSI6ImNsb2JvcXBldzB2ajYyc3BldXZtaHZtbHUifQ.o-XzbOPQqJ3YR_SllC0iIA';

const MapPopup = ({ coords, setCoords }) => {
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map',
      zoom: 10,
      center: [125.493457, 9.790568],
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      style: 'mapbox://styles/mapbox/dark-v11',
    });

    // Initialize marker without setting a location initially
    const marker = new mapboxgl.Marker();

    // Add map controls, layers, popups, etc. as needed

    // Add an event listener to handle map clicks
    map.on('click', (e) => {
      const { lng, lat } = e.lngLat;

      // Round the lng and lat values to 6 decimal places
      const roundedLng = lng.toFixed(6);
      const roundedLat = lat.toFixed(6);

      // Update the marker location and add it to the map
      marker.setLngLat([lng, lat]).addTo(map);

      // Update the state with the rounded coordinates
      setCoords({ lng: roundedLng, lat: roundedLat });
    });

    // Clean up the map when the component unmounts
    return () => {
      map.remove();
    };
  }, [setCoords]);
  return (
    <div
      id="map"
      style={{
        width: '100%',
        height: '40vh',
        marginTop: '20px',
      }}
    />
  );
};

export default MapPopup;
