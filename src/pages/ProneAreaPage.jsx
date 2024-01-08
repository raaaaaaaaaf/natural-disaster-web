import { Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Helmet } from 'react-helmet-async';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from 'src/firebase/firebaseConfig';

mapboxgl.accessToken =
  'pk.eyJ1IjoicnJpZGFkIiwiYSI6ImNsb2JvcXBldzB2ajYyc3BldXZtaHZtbHUifQ.o-XzbOPQqJ3YR_SllC0iIA';

const ProneAreaPage = () => {
  const [coords, setCoords] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const locations = [
    {
      latitude: 9.814334,
      longitude: 125.458644,
      about: 'Tsunami Prone',
      type: 'Tsunami',
      brgy: 'Lipata',
    },
    {
      latitude: 9.760827382846653,
      longitude: 125.48416580840605,
      about: 'Flood Prone',
      type: 'Flash flood',
      brgy: 'Luna',
    },
    {
      latitude: 9.785258330829725,
      longitude: 125.49690688450949,
      about: 'Flood Prone',
      type: 'Flash flood',
      brgy: 'Navarro Street',
    },
    {
      latitude: 9.790227037806575,
      longitude: 125.48484585026382,
      about: 'Flood Prone',
      type: 'Flash flood',
      brgy: 'San Juan',
    },
    {
      latitude: 9.788402845019112,
      longitude: 125.49877599505979,
      about: 'Tsunami Prone',
      type: 'Tsunami',
      brgy: 'Boulevard',
    },
    // Add more locations as needed
  ];

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
      zoom: 12,
      center: [125.493457, 9.790568],
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      style: 'mapbox://styles/mapbox/dark-v11',
    });

    locations.forEach((coord) => {
      const marker = new mapboxgl.Marker({
        element: createCustomMarkerElement(coord.type),
      })
        .setLngLat([coord.longitude, coord.latitude])
        .addTo(map);

      // Create a popup for the marker
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
        `<h3>${coord.about} (${coord.brgy})</h3><p><br>Latitude: ${coord.latitude}<br>Longitude: ${coord.longitude}<br> </p>`
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
          Prone Areas
        </Typography>

        <Typography variant="h5" sx={{ mb: 1 }}>
          Emergency Hotline Numbers:
        </Typography>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src="/assets/emergency.png"
                alt="hat"
                style={{ width: "20px", height: "20px", marginRight: "10px" }}
              />
              <Typography>Emergency Response Services</Typography>
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <Typography sx={{ mb: 5 }}>09294209511</Typography>
            </div>
          </div>

          <div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src="/assets/fire.png"
                alt="hat"
                style={{ width: "20px", height: "20px", marginRight: "10px" }}
              />
              <Typography>Bureau of Fire Protection</Typography>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Typography sx={{ mb: 5 }}>09317218790 or 09552148510</Typography>
            </div>
          </div>



          <div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src="/assets/sos.png"
                alt="hat"
                style={{ width: "20px", height: "20px", marginRight: "10px" }}
              />
              <Typography>City Disaster Risk Reduction & Management</Typography>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Typography sx={{ mb: 5 }}>09515176419</Typography>
            </div>
          </div>

          <div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src="/assets/coast.png"
                alt="hat"
                style={{ width: "20px", height: "20px", marginRight: "10px" }}
              />
              <Typography>Coast Guard</Typography>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Typography sx={{ mb: 5 }}>09518070127</Typography>
            </div>
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

export default ProneAreaPage;
