import React from 'react';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function Student_Custom_weekDay({ handleWeekDaysOpen, handleWeekDaysClose, selectedWeekDays, setSelectedWeekDays, WeekDaysopen }) {
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

export default Student_Custom_weekDay;


