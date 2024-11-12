import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


function Mentor_Text_Input({meetNmRef}) {
    return ( 
        <>
        <Box
            component="form"
            sx={{
            '& > :not(style)': { m: 1, width: '300px',paddingLeft:'0px' },
            '& .MuiInputLabel-root': {
                fontWeight: 'bold',
              },
            '& input::placeholder': {
                fontWeight: 'bold',
                fontSize:'25px'
            },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField id="standard-basic" inputRef={meetNmRef} label="Class Name" variant="standard"  placeholder="Add a title" InputLabelProps={{
                    shrink: true,
                }} />
        </Box>
        </>
     );
}

export default Mentor_Text_Input;