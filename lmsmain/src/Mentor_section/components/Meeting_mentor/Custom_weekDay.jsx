// import React, { useState } from 'react';
// import { Button, Modal, Box, Typography } from '@mui/material';

// // const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
// const daysOfWeek = ['Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
// function Custom_weekDay ({handleWeekDaysOpen,handleWeekDaysClose,selectedWeekDays,setSelectedWeekDays,WeekDaysopen}) {
//     // const [selectedDays, setSelectedDays] = useState([]);
//     // const [open, setOpen] = useState(false);

//     // const handleOpen = () => {
//     //     setOpen(true);
//     // };

//     // const handleClose = () => {
//     //     setOpen(false);
//     // };

//     const handleDayClick = (day) => {
//         if (!selectedWeekDays.includes(day)) {
//             setSelectedWeekDays([...selectedWeekDays, day]);
//         } else {
//             setSelectedWeekDays(selectedWeekDays.filter(d => d !== day));
//         }
//     };

//     return (
//         <div>
//             {/* <Button variant="contained" onClick={handleWeekDaysOpen}>
//                 Select Days
//             </Button> */}
//             <Modal open={WeekDaysopen} onClose={handleWeekDaysClose}>
//                 <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, maxWidth: 300  }}>
//                     <Typography variant="h6" gutterBottom>
//                         Select Days
//                     </Typography>
//                     <Box>
//                         {daysOfWeek.map(day => (
//                             <Button key={day} onClick={() => handleDayClick(day)} variant={selectedWeekDays.includes(day) ? "contained" : "outlined"}  sx={{ width: '55px', height: '55px', borderRadius: '50%', margin: '5px',fontSize:'14px', fontWeight:'bold' }}>
//                                 {day}
//                             </Button>
//                         ))}
//                     </Box>
//                     <Button onClick={handleWeekDaysOpen} variant="contained" style={{ marginTop: '20px' }}>
//                         Done
//                     </Button>
//                 </Box>
//                 <Typography variant="body1" gutterBottom>
//                 Selected Days: {selectedWeekDays.join(', ')}
//                 </Typography>
//             </Modal>
            
//         </div>
//     );
// };

// export default Custom_weekDay;



// import React from 'react';
// import { useState } from 'react';
// import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';

// function Custom_weekDay({ handleWeekDaysOpen, handleWeekDaysClose, selectedWeekDays, setSelectedWeekDays, WeekDaysopen }) {
//     // const daysOfWeek = ['Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
//     const daysOfWeek=[
//         {Symbol:'S', DayNo:'0',Day:'Sunday'},
//         {Symbol:'M', DayNo:'1',Day:'Monday'},
//         {Symbol:'T', DayNo:'2',Day:'Tuesday'},
//         {Symbol:'W', DayNo:'3',Day:'Wednesday'},
//         {Symbol:'T', DayNo:'4',Day:'Thursday'},
//         {Symbol:'F', DayNo:'5',Day:'Friday'},
//         {Symbol:'S', DayNo:'6',Day:'Saturday'},

// ]

//     const handleDayClick = (day) => {
//         if (!selectedWeekDays.includes(day)) {
//             setSelectedWeekDays([...selectedWeekDays, day]);
//         } else {
//             setSelectedWeekDays(selectedWeekDays.filter(d => d !== day));
//         }
//     };

//     return (
//         <div>
//             <Modal show={WeekDaysopen} onHide={handleWeekDaysClose} backdrop={'static'} size={'sm'}>
//                 <Modal.Header closeButton style={{height:'20px'}}>
//                     {/* <Modal.Title>Select Days</Modal.Title> */}
//                 </Modal.Header>
//                 <Modal.Body style={{height:'200px'}}>
//                     <h5>Select Days</h5>
//                     {daysOfWeek.map(data => (
//                         <Button key={data} onClick={() => handleDayClick(data.Day)} variant={selectedWeekDays.includes(data.Day) ? "primary" : "outline-primary"} className="m-2" style={{ width: '40px', height: '40px', borderRadius: '50%',fontSize:'12px', fontWeight:'bold'}}>
//                             {data.Symbol}
//                         </Button>
//                     ))}
//                     {
//                         selectedWeekDays &&  selectedWeekDays.length > 0 &&  (<div>
//                         <p style={{fontSize:'12px',fontWeight:'bold'}}>You have choose: {selectedWeekDays.join(', ')}</p>
//                     </div>)
//                     }
                     
//                 </Modal.Body>
//                 <Modal.Footer style={{ paddingTop: '0px',paddingBottom:'0px',borderColor:'transparent' }}>
//                     {/* <Button variant="secondary" onClick={handleWeekDaysClose}>Close</Button> */}
//                     <Button variant="primary" onClick={handleWeekDaysOpen}>Done</Button>
//                 </Modal.Footer>
//             </Modal>

//             {/* <Button variant="primary" onClick={handleWeekDaysOpen}>
//                 Open Modal
//             </Button> */}

//             <div>
//                 <p>Selected Days: {selectedWeekDays.join(', ')}</p>
//             </div>
//         </div>
//     );
// };

// export default Custom_weekDay;

import React from 'react';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function Custom_weekDay({ handleWeekDaysOpen, handleWeekDaysClose, selectedWeekDays, setSelectedWeekDays, WeekDaysopen }) {
    const daysOfWeek=[
        {Symbol:'S', DayNo:0, Day:'Sunday'},
        {Symbol:'M', DayNo:1, Day:'Monday'},
        {Symbol:'T', DayNo:2, Day:'Tuesday'},
        {Symbol:'W', DayNo:3, Day:'Wednesday'},
        {Symbol:'T', DayNo:4, Day:'Thursday'},
        {Symbol:'F', DayNo:5, Day:'Friday'},
        {Symbol:'S', DayNo:6, Day:'Saturday'},
    ];

    const handleDayClick = (dayData) => {
        if (!selectedWeekDays.find(day => day.Day === dayData.Day)) {
            setSelectedWeekDays([...selectedWeekDays, dayData]);
        } else {
            setSelectedWeekDays(selectedWeekDays.filter(day => day.Day !== dayData.Day));
        }
    };

    return (
        <div>
            <Modal show={WeekDaysopen} onHide={handleWeekDaysClose} backdrop={'static'} size={'sm'}>
                <Modal.Header closeButton style={{height:'20px'}}>
                    {/* <Modal.Title>Select Days</Modal.Title> */}
                </Modal.Header>
                <Modal.Body style={{height:'200px'}}>
                    <h5>Select Days</h5>
                    {daysOfWeek.map(data => (
                        <Button key={data.Day} onClick={() => handleDayClick(data)} variant={selectedWeekDays.some(day => day.Day === data.Day) ? "primary" : "outline-primary"} className="m-2" style={{ width: '40px', height: '40px', borderRadius: '50%',fontSize:'12px', fontWeight:'bold'}}>
                            {data.Symbol}
                        </Button>
                    ))}
                    {
                        selectedWeekDays && selectedWeekDays.length > 0 &&  (
                            <div>
                                <p style={{fontSize:'12px',fontWeight:'bold'}}>You have chosen: {selectedWeekDays.map(day => day.Day).join(', ')}</p>
                            </div>
                        )
                    }
                </Modal.Body>
                <Modal.Footer style={{ paddingTop: '0px',paddingBottom:'0px',borderColor:'transparent' }}>
                    <Button variant="primary" onClick={handleWeekDaysClose}>Done</Button>
                </Modal.Footer>
            </Modal>

            {/* <div>
                <p>Selected Days: {selectedWeekDays.map(day => day.Day).join(', ')}</p>
            </div> */}
        </div>
    );
};

export default Custom_weekDay;


