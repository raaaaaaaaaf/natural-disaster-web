import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import AppNewsUpdate from '../app-news-update';
import AppWidgetSummary from '../app-widget-summary';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from 'src/firebase/firebaseConfig';

// ----------------------------------------------------------------------

export default function AppView() {
  const [disaster, setDisaster] = useState([]);
  const [tsunami, setTsunami] = useState(0);
  const [typhoon, setTyphoon] = useState(0)
  const [earthquake, setEarthquake] = useState(0)
  const [landslide, setLandslide] = useState(0);
  const [flood, setFlood] = useState(0);
  const [volcanic, setVolcanic] = useState(0);

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
        setDisaster(data);

        const tsunamiRef = query(collection(db, 'data_disaster'), where("typeDisaster", "==", "Tsunami"));
        const typhoonRef = query(collection(db, 'data_disaster'), where("typeDisaster", "==", "Typhoon"));
        const earthquakeRef = query(collection(db, 'data_disaster'), where("typeDisaster", "==", "Earthquake"));
        const landslideRef = query(collection(db, 'data_disaster'), where("typeDisaster", "==", "Landslide"));
        const floodRef = query(collection(db, 'data_disaster'), where("typeDisaster", "==", "Flash flood"));
        const volcanicRef = query(collection(db, 'data_disaster'), where("typeDisaster", "==", "Volcanic eruption"));
  
        const [tsunamiSnap, typhoonSnap, earthquakeSnap, landslideSnap, floodSnap, volcanicSnap] = await Promise.all([
          getDocs(tsunamiRef),
          getDocs(typhoonRef),
          getDocs(earthquakeRef),
          getDocs(landslideRef),
          getDocs(floodRef),
          getDocs(volcanicRef),
        ]);
  
        setTsunami(tsunamiSnap.docs.length);
        setTyphoon(typhoonSnap.docs.length);
        setEarthquake(earthquakeSnap.docs.length);
        setLandslide(landslideSnap.docs.length);
        setFlood(floodSnap.docs.length);
        setVolcanic(volcanicSnap.docs.length);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);
  
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Natural Disaster Web-Based Information System
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="Tsunami"
            total={tsunami}
            color="info"
            icon={<img alt="icon" src="/assets/disasterIcon/tsunami.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="Typhoon"
            total={typhoon}
            color="warning"
            icon={<img alt="icon" src="/assets/disasterIcon/typhoon.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="Earthquake"
            total={earthquake}
            color="error"
            icon={<img alt="icon" src="/assets/disasterIcon/earthquake.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="Landslide"
            total={landslide}
            color="info"
            icon={<img alt="icon" src="/assets/disasterIcon/landslide.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="Flash flood"
            total={flood}
            color="info"
            icon={<img alt="icon" src="/assets/disasterIcon/flood.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="Volcanic eruption"
            total={volcanic}
            color="warning"
            icon={<img alt="icon" src="/assets/disasterIcon/volcanic.png" />}
          />
        </Grid>



        <Grid xs={12} md={6} lg={12}>
          <AppNewsUpdate list={disaster} />
        </Grid>
      </Grid>
    </Container>
  );
}
