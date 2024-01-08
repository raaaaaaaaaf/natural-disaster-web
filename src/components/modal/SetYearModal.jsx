import {
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import React, { useContext } from 'react';
import { AuthContext } from 'src/context/AuthContext';

const SetYearModal = ({ open, onClose }) => {
    
    const {year, setYear} = useContext(AuthContext)
  
    const handleChange = (event) => {
      setYear(event.target.value);
      onClose(); // Close the modal after setting the year
    };
  
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Set Year</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Set Year</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={year}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={null}>All Years</MenuItem>
              <MenuItem value={2024}>2024</MenuItem>
              <MenuItem value={2023}>2023</MenuItem>
              <MenuItem value={2022}>2022</MenuItem>
              <MenuItem value={2021}>2021</MenuItem>
              <MenuItem value={2020}>2020</MenuItem>
              <MenuItem value={2019}>2019</MenuItem>
              <MenuItem value={2018}>2018</MenuItem>
              <MenuItem value={2017}>2017</MenuItem>
              <MenuItem value={2016}>2016</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
      </Dialog>
    );
  };
  

export default SetYearModal;
