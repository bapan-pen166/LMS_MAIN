import React, { useState, useEffect } from 'react';
import { TimePicker } from '@patternfly/react-core';
import dayjs from 'dayjs';

export default function Mentor_Time_Picker_new({ meetDateFromRef, label }) {
  const [selectedTime, setSelectedTime] = useState('');

  const onChange = (time, hour, minute, seconds, isValid) => {
    console.log('Time Picker Change Triggered');
    console.log('hour:', hour, 'minute:', minute, 'seconds:', seconds, 'isValid:', isValid);
  
    
    const [hourPart, period] = hour.split(' ');
    const [parsedHour, parsedMinute] = hourPart.split(':').map(Number);
  
    
    let adjustedHour = parsedHour;
    if (period === "PM" && parsedHour !== 12) {
      adjustedHour += 12; // Convert PM hours to 24-hour format
    } else if (period === "AM" && parsedHour === 12) {
      adjustedHour = 0; // Midnight case
    }
  
    // Ensure minute is set correctly
    const finalMinute = parsedMinute || minute || 0;
  
    if (isValid || isValid === null || isValid === undefined) {
      const formattedTime = dayjs().hour(adjustedHour).minute(finalMinute).second(0).format('hh:mm A');
      console.log('Formatted Time:', formattedTime);
      setSelectedTime(formattedTime);  // Update state with the selected time
    } else {
      console.log('Invalid time selection');
    }
  };
  
  
  
  

  useEffect(() => {
    if (meetDateFromRef && selectedTime) {
      meetDateFromRef.current = selectedTime; 
      console.log('Ref Updated:', meetDateFromRef.current); 
    }
  }, [selectedTime, meetDateFromRef]);

  return (
    <div>
      <label>{label}</label>
      <TimePicker
        time={selectedTime || ''}  // Display the selected time
        onChange={onChange}
        width={'190px'}
      />
    </div>
  );
}
