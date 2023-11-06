import { Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Helmet } from 'react-helmet-async';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from 'src/firebase/firebaseConfig';
import { fDateTime } from 'src/utils/format-time';

mapboxgl.accessToken =
  'pk.eyJ1IjoicnJpZGFkIiwiYSI6ImNsb2JvcXBldzB2ajYyc3BldXZtaHZtbHUifQ.o-XzbOPQqJ3YR_SllC0iIA';

const MapPage = () => {
  const [coords, setCoords] = useState([]);

  console.log(coords.typeDisaster);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = [];
        const dataRef = query(collection(db, 'data_disaster'));
        const dataSnap = await getDocs(dataRef);
        dataSnap.forEach((doc) => {
          data.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setCoords(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map',
      zoom: 10,
      center: [125.493457, 9.790568],
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      style: 'mapbox://styles/mapbox/dark-v11',
    });

    coords.forEach((coord) => {
      const marker = new mapboxgl.Marker({
        element: createCustomMarkerElement(coord.typeDisaster),
      })
        .setLngLat([coord.longitude, coord.latitude])
        .addTo(map);

      // Create a popup for the marker
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
        `<h3>${coord.typeDisaster}</h3><p>${fDateTime(coord.dateNtime)}<br>Latitude: ${
          coord.latitude
        }<br>Longitude: ${coord.longitude}<br> ${coord.about}</p>`
      );

      // Attach the popup to the marker
      marker.setPopup(popup);
    });

    // Clean up the map when the component unmounts
    return () => {
      map.remove();
    };
  }, [coords]);

  function createCustomMarkerElement(typeDisaster) {
    const iconElement = document.createElement('img');
    switch (typeDisaster) {
      case 'Tsunami':
        iconElement.src = '/assets/disasterIcon/tsunami.png';
        break;
      case 'Typhoon':
        iconElement.src = '/assets/disasterIcon/typhoon.png';
        break;
      case 'Earthquake':
        iconElement.src = '/assets/disasterIcon/earthquake.png';
        break;
      case 'Landslide':
        iconElement.src = '/assets/disasterIcon/landslide.png';
        break;
      case 'Flash flood':
        iconElement.src = '/assets/disasterIcon/flood.png';
        break;
      case 'Volcanic eruption':
        iconElement.src = '/assets/disasterIcon/volcanic.png';
        break;
      // Add cases for other types of disasters here
      default:
        iconElement.src = '/assets/disaster/default.jpg'; // Default image path
    }
    iconElement.style.width = '50px'; // Set the width of the icon
    iconElement.style.height = '50px'; // Set the height of the icon
    return iconElement;
  }
  return (
    <>
      <Helmet>
        <title> Disaster Mapping | NDWBIS</title>
      </Helmet>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Disaster Mapping
        </Typography>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Incase of Emergency:
        </Typography>

        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <div >
            <Typography>Raxiello Adolfo </Typography>
            <Typography sx={{ mb: 5 }}>09667505839</Typography>
          </div>
          <div>
            
            <Typography>&nbsp;&nbsp;&nbsp;Daisy Mie Amploquio  </Typography>
            <Typography sx={{ mb: 5 }}>&nbsp;&nbsp;&nbsp;09059494490</Typography>
          </div>
        </div>

        <div
          id="map"
          style={{
            width: '100%',
            height: '80vh',
            marginTop: '20px',
          }}
        />
      </Container>
    </>
  );
};

export default MapPage;
