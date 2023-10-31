import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import MapPopup from '../maps/MapPopup';
import { addDoc, collection } from 'firebase/firestore';
import { db } from 'src/firebase/firebaseConfig';
import { toast } from 'react-toastify';

const AddModal = ({ open, onClose }) => {
  const [coords, setCoords] = useState({
    lng: 0,
    lat: 0,
  });

  const [formData, setFormData] = useState({
    disasterName: '',
    about: '',
    typeDisaster: '',
  });

  const [selectedDateTime, setSelectedDateTime] = useState(dayjs('2023-11-01T15:30'));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateTimeChange = (newDateTime) => {
    // Update the state when the date and time changes
    setSelectedDateTime(newDateTime);
    console.log(newDateTime)
  };

  const handleAdd = async () => {
    try {
      const dataRef = collection(db, "data_disaster")
      const data = {
        disasterName: formData.disasterName,
        about: formData.about,
        typeDisaster: formData.typeDisaster,
        dateNtime: selectedDateTime.toDate(),
        longitude: coords.lng,
        latitude: coords.lat,
      }
      await addDoc(dataRef, data)
      toast.success("Information has been added.", {
        position: "top-right",
        autoClose: 3000, // Close the toast after 3 seconds
        hideProgressBar: false,
      });
      onClose();
      
    } catch(err) {
      console.error(err);
    }
  }

  console.log(coords);
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Add New Disaster</DialogTitle>
      <DialogContent>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Grid container spacing={2}>
            {/* Left Column */}
            <Grid item xs={6}>
              <TextField
                margin="dense"
                required
                id="tname"
                name="disasterName"
                value={formData.disasterName}
                onChange={handleInputChange}
                label="Disaster Name"
                variant="outlined"
                fullWidth
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Date and Time"
                  sx={{ mt: 1, width: '100%' }}
                  value={selectedDateTime} // Set the value to the state variable
                  onChange={handleDateTimeChange}
                />
              </LocalizationProvider>
            </Grid>

            {/* Right Column */}
            <Grid item xs={6}>
              <TextField
                margin="dense"
                required
                id="about"
                name="about"
                value={formData.about}
                onChange={handleInputChange}
                label="About"
                variant="outlined"
                fullWidth
              />
              <FormControl sx={{ mt: 1, width: '100%' }}>
                <InputLabel id="demo-simple-select-helper-label">Type of Disaster</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={formData.typeDisaster}
                  label="Type of Disaster"
                  name="typeDisaster"
                  onChange={handleInputChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={'Tsunami'}>Tsunami</MenuItem>
                  <MenuItem value={'Tropical cyclone'}>Tropical cyclone</MenuItem>
                  <MenuItem value={'Typhoon'}>Typhoon</MenuItem>
                  <MenuItem value={'Earthquake'}>Earthquake</MenuItem>
                  <MenuItem value={'Landslide'}>Landslide</MenuItem>
                  <MenuItem value={'Flash flood'}>Flash flood</MenuItem>
                  <MenuItem value={'Volcanic eruption'}>Volcanic eruption</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <MapPopup coords={coords} setCoords={setCoords} />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
        <Button onClick={handleAdd} color="primary" variant="contained">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddModal;
