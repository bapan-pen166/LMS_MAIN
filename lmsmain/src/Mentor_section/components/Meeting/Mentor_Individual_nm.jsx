import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


function Mentor_Individual_nm({meetPersonnmRef}) {
    return ( 
        <>
        <Box
            component="form"
            sx={{
            '& > :not(style)': { m: 1, width: '230px' },
            '& .MuiInputLabel-root': {
                fontWeight: 'bold',
              },
            '& input::placeholder': {
                fontWeight: 'bold',
                fontSize:'10px'
            },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField id="standard-basic" inputRef={meetPersonnmRef}  variant="standard"  placeholder="Enter email" InputLabelProps={{
                    shrink: true,
                }} />
        </Box>
        </>
     );
}

export default Mentor_Individual_nm;