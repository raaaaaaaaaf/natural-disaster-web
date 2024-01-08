import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken =
  'pk.eyJ1IjoicnJpZGFkIiwiYSI6ImNsb2JvcXBldzB2ajYyc3BldXZtaHZtbHUifQ.o-XzbOPQqJ3YR_SllC0iIA';

const MapPopup = ({ coords, setCoords, address, setAddress }) => {

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map',
      zoom: 12,
      center: [125.493457, 9.790568],
      style: 'mapbox://styles/mapbox/dark-v11',
    });

    const marker = new mapboxgl.Marker();

    map.on('click', async (e) => {
      const { lng, lat } = e.lngLat;

      const roundedLng = lng.toFixed(6);
      const roundedLat = lat.toFixed(6);

      // Update the marker location and add it to the map
      marker.setLngLat([lng, lat]).addTo(map);

      // Update the state with the rounded coordinates
      setCoords({ lng: roundedLng, lat: roundedLat });

      try {
        // Reverse geocode to get the address
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=pk.eyJ1IjoicnJpZGFkIiwiYSI6ImNsb2JvcXBldzB2ajYyc3BldXZtaHZtbHUifQ.o-XzbOPQqJ3YR_SllC0iIA`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch address');
        }

        const data = await response.json();

        // Extract the address from the response
        const firstFeature = data.features[0];
        const formattedAddress = firstFeature.place_name;

        // Update the state with the address
        setAddress(formattedAddress);
      } catch (error) {
        console.error('Error fetching address:', error.message);
      }
    });


    return () => {
      map.remove();
    };
  }, [setCoords, setAddress]);


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
