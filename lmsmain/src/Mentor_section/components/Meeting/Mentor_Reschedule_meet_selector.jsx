import React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { useState,useEffect } from 'react';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function Mentor_Reschedule_meet_selector({meeting,setMeeting,selectmeeting, setSelectmeeting}) {
// const[selectmeeting, setSelectmeeting]=useState([]);
    const handleChange = (event) => {
        setSelectmeeting(event.target.value);
      };
      const view=()=>{
        // console.log(country)
        // console.log(initialCountry)
        console.log(selectmeeting)
      }
    return (
        <>
        {/* {console.log(selectedCountrys)} */}
        <FormControl style={{minWidth: 150}}>
          
          <Select
            
            value={selectmeeting}
            
            onChange={handleChange}
            input={<OutlinedInput />}
            
            renderValue={(selected) => selected.title}
              MenuProps={MenuProps}
          >
            
            {meeting.map((data,index) => (
                <MenuItem key={index} value={data}>
                  {data.title}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        {/* <button onClick={view}>View</button> */}
        
        </>
      );
}

export default Mentor_Reschedule_meet_selector;