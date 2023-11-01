import { Container, Stack, Typography } from '@mui/material';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from 'src/firebase/firebaseConfig';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';


mapboxgl.accessToken =
  'pk.eyJ1IjoicnJpZGFkIiwiYSI6ImNsb2JvcXBldzB2ajYyc3BldXZtaHZtbHUifQ.o-XzbOPQqJ3YR_SllC0iIA';

const DisasterPage = () => {
  const [disaster, setDisaster] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();


  useEffect(() => {
    if (id) {
      const dataRef = doc(db, 'data_disaster', id);

      const fetchData = async () => {
        try {
          const docSnap = await getDoc(dataRef);
          if (docSnap.exists()) {
            setDisaster({ ...docSnap.data(), id: docSnap.id });
          } else {
            setDisaster({});
          }
        } catch (err) {
          console.error(err);
          setError(err.message); // Handle and display the error to the user
        } finally {
          setLoading(false); // Set loading to false once data fetching is complete
        }
      };

      fetchData();
    }
  }, [id]);

  console.log(disaster)

  useEffect(() => {
    if (loading) {
      return; // Don't render the map until the data is loaded
    }

    if (disaster.longitude && disaster.latitude) {
      const map = new mapboxgl.Map({
        container: 'map',
        zoom: 10,
        center: [disaster.longitude, disaster.latitude],
        style: 'mapbox://styles/mapbox/dark-v11',
      });

      const marker = new mapboxgl.Marker({
        element: createCustomMarkerElement(disaster.typeDisaster)
      })
        .setLngLat([disaster.longitude, disaster.latitude])
        .addTo(map);

      return () => {
        map.remove();
      };
    }
  }, [loading, disaster.longitude, disaster.latitude, id]);

  function createCustomMarkerElement(typeDisaster) {
    const iconElement = document.createElement('img');
    switch (typeDisaster) {
        case 'Tsunami':
          iconElement.src = '/assets/disasterIcon/tsunami.png';
          break;
        case 'Tropical cyclone':
          iconElement.src = '/assets/disasterIcon/typhoon.png';
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
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h4">{disaster.typeDisaster} </Typography>
          <Typography variant="h5">
            {' '}
            <span style={{ color: '#808080' }}>({disaster.disasterName})</span>
          </Typography>
        </div>
      </Stack>

      <Typography variant="body1" style={{ fontFamily: 'Arial', fontSize: '16px' }}>
        {'Based on the coordinates '}
        <strong>{'(' + disaster.longitude + ', ' + disaster.latitude + ')'}</strong>
        {
          " within the Philippine Area of Responsibility, a natural disaster advisory has been issued, alerting residents in the specific region to monitor local authorities' updates and be prepared for potential hazards associated with the incoming weather system."
        }
      </Typography>

      <div
        id="map"
        style={{
          width: '100%',
          height: '60vh',
          marginTop: '20px',
        }}
      />

      
    </Container>
  );
};

export default DisasterPage;
