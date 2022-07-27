import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function CustomSelect({ value, options, handleChange }) {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'>Column</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={value}
          label='Columns'
          onChange={handleChange}
        >
          {options.map((option, i) => (
            <MenuItem value={i}>{option}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default CustomSelect;
