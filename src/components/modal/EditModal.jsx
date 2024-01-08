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
import { doc, updateDoc } from 'firebase/firestore';
import { db } from 'src/firebase/firebaseConfig';
import { toast } from 'react-toastify';
import MapPopup from '../maps/MapPopup';
import { useNavigate } from 'react-router-dom';

const EditModal = ({ open, onClose, id }) => {
  const [coords, setCoords] = useState({
    lng: 0,
    lat: 0,
  });
  const [address, setAddress] = useState('')

  const [formData, setFormData] = useState({
    disasterName: '',
    about: '',
    typeDisaster: '',
  });

  const [selectedDateTime, setSelectedDateTime] = useState(dayjs('2023-11-01T15:30'));

  const navigate = useNavigate();

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
    console.log(newDateTime);
  };

  const handleEdit = async (id) => {
    try {
      if (
        !formData.disasterName ||
        !formData.about ||
        !formData.typeDisaster ||
        !selectedDateTime ||
        !coords.lng ||
        !coords.lat ||
        !address
      ) {
        toast.error("Please fill out all fields.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
        });
        return; // Exit the function if validation fails
      }
      const dataRef = doc(db, 'data_disaster', id);
      const data = {
        disasterName: formData.disasterName,
        about: formData.about,
        typeDisaster: formData.typeDisaster,
        dateNtime: selectedDateTime.toDate(),
        longitude: coords.lng,
        latitude: coords.lat,
        location: address,
      };
      await updateDoc(dataRef, data);
      toast.success('Natural disaster information has been edited', {
        position: 'top-right',
        autoClose: 3000, // Close the toast after 3 seconds
        hideProgressBar: false,
      });
      onClose();
      navigate('/disaster')
    } catch (err) {
      console.error(err);
    }
  };

  console.log(coords);
  console.log(address)
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Edit Disaster</DialogTitle>
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
                  <MenuItem value={'Typhoon'}>Typhoon</MenuItem>
                  <MenuItem value={'Earthquake'}>Earthquake</MenuItem>
                  <MenuItem value={'Landslide'}>Landslide</MenuItem>
                  <MenuItem value={'Flash flood'}>Flash flood</MenuItem>
                  <MenuItem value={'Volcanic eruption'}>Volcanic eruption</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <MapPopup coords={coords} setCoords={setCoords} address={address} setAddress={setAddress}/>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
        <Button onClick={() => handleEdit(id)} color="primary" variant="contained">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditModal;
