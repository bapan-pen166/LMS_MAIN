import React, { useState, useCallback, useMemo } from 'react';
import { Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
// import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Modal, Button } from 'react-bootstrap';
// import Typography from '@mui/material';

const Monthlymeetschedule = ({selectedNumber, setSelectedNumber,selectedFrequency, setSelectedFrequency,handleNumberChange,handleFrequencyChange, openmonthly, handleCloseMonthly }) => {
    // const [selectedNumber, setSelectedNumber] = useState('');
    // const [selectedFrequency, setSelectedFrequency] = useState('');

    // const handleNumberChange = useCallback((event) => {
    //     setSelectedNumber(event.target.value);
    // }, []);

    // const handleFrequencyChange = useCallback((event) => {
    //     setSelectedFrequency(event.target.value);
    // }, []);

    // Memoize the array creation
    const numberOptions = useMemo(() => {
        if(selectedFrequency=='monthly')
        {
            return [...Array(31).keys()].map((num) => (
                <MenuItem key={num + 1} value={num + 1}>{num + 1}</MenuItem>
            ));
        }
        else{
            return [...Array(7).keys()].map((num) => (
                <MenuItem key={num + 1} value={num + 1}>{num + 1}</MenuItem>
            ));
        }
        
    }, [selectedFrequency]);

    return (
        // <div>
        //     <Modal open={openmonthly} onClose={handleCloseMonthly}>
        //         <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, maxWidth: 300 }}>
        //             <FormControl style={{ marginBottom: 20 }}>
        //                 <InputLabel id="number-select-label">Select Number</InputLabel>
        //                 <Select
        //                     labelId="number-select-label"
        //                     id="number-select"
        //                     value={selectedNumber}
        //                     onChange={handleNumberChange}
        //                 >
        //                     {numberOptions}
        //                 </Select>
        //             </FormControl>
        //             <FormControl style={{ marginBottom: 20 }}>
        //                 <InputLabel id="frequency-select-label">Select Frequency</InputLabel>
        //                 <Select
        //                     labelId="frequency-select-label"
        //                     id="frequency-select"
        //                     value={selectedFrequency}
        //                     onChange={handleFrequencyChange}
        //                 >
        //                     <MenuItem value="monthly">Monthly</MenuItem>
        //                     <MenuItem value="weekly">Weekly</MenuItem>
        //                 </Select>
        //             </FormControl>
        //             <Button onClick={handleCloseMonthly} variant="contained" style={{ marginTop: '20px' }}>
        //                 Done
        //             </Button>
        //         </Box>
        //     </Modal>
        // </div>
        <Modal show={openmonthly} onHide={handleCloseMonthly}  size='sm'>
            
            <Modal.Body>
                {/* <p>Modal content goes here...</p> */}
            
                     <h5>Select Days</h5>   
                    
                <FormControl style={{ marginBottom: 20 ,width:100,marginRight:10}}>
                        {/* <InputLabel id="number-select-label">Number</InputLabel> */}
                        <Select
                            labelId="number-select-label"
                            id="number-select"
                           value={selectedNumber}
                            onChange={handleNumberChange}
                        >
                            {numberOptions}
                        </Select>
                   </FormControl>
                   <FormControl style={{ marginBottom: 20,width:150 }}>
                       {/* <InputLabel id="frequency-select-label">Frequency</InputLabel> */}
                        <Select
                            labelId="frequency-select-label"
                            id="frequency-select"
                           value={selectedFrequency}
                           onChange={handleFrequencyChange}
                           
                       >
                            
                           <MenuItem value="monthly">Monthly</MenuItem>
                           <MenuItem value="weekly">Weekly</MenuItem>
                       </Select>
                     </FormControl>
            </Modal.Body>
            <Modal.Footer style={{ paddingTop: '0px',paddingBottom:'0px',borderColor:'transparent' }}>
                {/* <Button variant="secondary" onClick={handleCloseMonthly}>
                    Close
                </Button> */}
                <Button variant="primary" onClick={handleCloseMonthly}>
                    Done
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Monthlymeetschedule;
