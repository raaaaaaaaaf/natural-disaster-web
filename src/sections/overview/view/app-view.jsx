import { faker } from '@faker-js/faker';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';

import AppTasks from '../app-tasks';
import AppNewsUpdate from '../app-news-update';
import AppOrderTimeline from '../app-order-timeline';
import AppCurrentVisits from '../app-current-visits';
import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';
import AppTrafficBySite from '../app-traffic-by-site';
import AppCurrentSubject from '../app-current-subject';
import AppConversionRates from '../app-conversion-rates';
import { useEffect, useState } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from 'src/firebase/firebaseConfig';

// ----------------------------------------------------------------------

export default function AppView() {
  const [disaster, setDisaster] = useState([]);

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
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);
  console.log(disaster)
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Natural Disaster Web-Based Information System
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="New Users"
            total={1352831}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="Item Orders"
            total={1723315}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="Bug Reports"
            total={234}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>

        <Grid xs={12} md={6} lg={12}>
          <AppNewsUpdate list={disaster} />
        </Grid>
      </Grid>
    </Container>
  );
}
