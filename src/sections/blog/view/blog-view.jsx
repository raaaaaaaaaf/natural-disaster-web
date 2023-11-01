import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';


import Iconify from 'src/components/iconify';

import PostCard from '../post-card';

import { useEffect, useState } from 'react';
import AddModal from 'src/components/modal/AddModal';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from 'src/firebase/firebaseConfig';

// ----------------------------------------------------------------------

export default function BlogView() {

  const [modalOpen, setModalOpen] = useState(false);
  const [disaster, setDisaster] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = [];
        const dataRef = query(collection(db, "data_disaster"));
        const dataSnap = await getDocs(dataRef);
        dataSnap.forEach((doc) => {
          data.push({
            id: doc.id,
            ...doc.data(),
          })
        })
        setDisaster(data)
      } catch(err) {
        console.error(err);
      }
    }
    fetchData();
  }, [])
  
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Natural Disaster</Typography>

        <Button onClick={() => setModalOpen(true)} variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          New 
        </Button>
        <AddModal open={modalOpen} onClose={()=> setModalOpen(false)}/>
      </Stack>


      <Grid container spacing={3}>
        {disaster.map((post, index) => (
          <PostCard key={post.id} post={post} index={index} />
        ))}
      </Grid>
    </Container>
  );
}
