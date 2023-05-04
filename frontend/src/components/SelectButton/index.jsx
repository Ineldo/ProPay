import {useState} from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

 const BasicSelect = ({ children})=> {
  const [currency,setCurrency] = useState('');

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  return (
    <Box sx={{ m: 1, minWidth: 20 }}>
      <FormControl fullWidth>
        
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={currency}
          onChange={handleChange}
        >
         {children}
        </Select>
      </FormControl>
    </Box>
  );
}

export default BasicSelect;