import React, { useState } from 'react';
import { Chip, TextField, Stack } from '@mui/material';

function Mentor_ScheduleEmChip({individualEm,setIndividualEm}) {
  const [inputValue, setInputValue] = useState('');
  const [chips, setChips] = useState([]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyPress = (event) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
        setIndividualEm([...individualEm, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleChipDelete = (chipToDelete) => () => {
    setIndividualEm((individualEm) => individualEm.filter((chip) => chip !== chipToDelete));
  };

  return (
    <Stack spacing={1} style={{ marginTop: '10px', width:'230px',paddingLeft:'5px' }}>
      <TextField
        label="Type something"
        variant="outlined"
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleInputKeyPress}
      />
      <Stack direction="column" spacing={1}>
        {individualEm.map((chip, index) => (
          <Chip
            key={index}
            label={chip}
            onDelete={handleChipDelete(chip)}
          />
        ))}
      </Stack>
    </Stack>
  );
}

export default Mentor_ScheduleEmChip;
