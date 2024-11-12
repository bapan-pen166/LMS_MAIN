import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import { api2 } from '../../../ApiUrl/ApiUrl';
import Mentor_Time_Picker_new from './Mentor_Time_Picker_new';

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

const Meeting_reschedule_apply = ({ close }) => {
  const [batchList, setBatchList] = useState([]);
  const [newCompany, setNewCompany] = useState({
    batch: [],
    meetingDate: "",
    meetingStartTime: "",
    meetingEndTime: "",
    meetingName :""
  });

  const startTimeRef = useRef('');
  const endTimeRef = useRef('');

  useEffect(() => {
    axios.get(`${api2}/reg/getBatchList`)
      .then((response) => {
        setBatchList(response?.data?.batchList || []);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleADDnewCompany = (e) => {
    const { name, value } = e.target;

    let tempVal = value;

    if (name === 'course' || name === 'batch') {
      tempVal = typeof value === 'string' ? [] : value.map(item => JSON.parse(item));
    }

    setNewCompany(prevState => ({
      ...prevState,
      [name]: tempVal
    }));
  };

  const handleSubmit = () => {
    console.log('Start Time Ref:', startTimeRef.current);
    console.log('End Time Ref:', endTimeRef.current);

    const formData = {
      ...newCompany,
      meetingStartTime: startTimeRef.current,  // Get the selected start time from ref
      meetingEndTime: endTimeRef.current,      // Get the selected end time from ref
    };
    
    console.log(formData);  // Check if formData has the correct times
  };

  return (
    <div className='container-fluid'>
      <div className='col-md-12 headLineBox mb-3'>
        <h4>Re-schedule class</h4>
      </div>
      <div className="row">
        <div className='col-md-6'>
          <div>Batch Name</div>
          <FormControl sx={{ m: 1, width: 180, marginTop:"-3px" }}>
            <InputLabel id="batch-multiple-checkbox-label">Batch</InputLabel>
            <Select
              labelId="batch-multiple-checkbox-label"
              id="batch-multiple-checkbox"
              multiple
              name="batch"
              value={newCompany?.batch?.map(item => JSON.stringify(item)) || []}
              onChange={handleADDnewCompany}
              input={<OutlinedInput label="Batch" />}
              renderValue={(selected) => selected.map(item => JSON.parse(item).batchName).join(', ')}
              MenuProps={MenuProps}
            >
              {batchList.map((batchALL) => (
                <MenuItem key={batchALL.id} value={JSON.stringify({ batchName: batchALL.batchName, id: batchALL.id })}>
                  <Checkbox checked={newCompany?.batch.some(batch => batch.id === batchALL.id)} />
                  <ListItemText primary={batchALL.batchName} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>

      <div className="row pt-4">
        <div className='col-md-6'>
          <div>Meeting Date</div>
          <input type="date" className="form-control"
            name='meetingDate'
            value={newCompany?.meetingDate}
            onChange={handleADDnewCompany}
          />
        </div>
        <div className='col-md-6'>
          <div>Select Meeting</div>
          <FormControl sx={{ m: 1, width: 180, marginTop:"-3px" }}>
            <InputLabel id="batch-multiple-checkbox-label">Batch</InputLabel>
            <Select
              labelId="batch-multiple-checkbox-label"
              id="batch-multiple-checkbox"
              multiple
              name="batch"
              value={newCompany?.batch?.map(item => JSON.stringify(item)) || []}
              onChange={handleADDnewCompany}
              input={<OutlinedInput label="Batch" />}
              renderValue={(selected) => selected.map(item => JSON.parse(item).batchName).join(', ')}
              MenuProps={MenuProps}
            >
              {batchList.map((batchALL) => (
                <MenuItem key={batchALL.id} value={JSON.stringify({ batchName: batchALL.batchName, id: batchALL.id })}>
                  <Checkbox checked={newCompany?.batch.some(batch => batch.id === batchALL.id)} />
                  <ListItemText primary={batchALL.batchName} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>

      <div className="row pt-4">
        <div className='col-md-6' style={{ width:"100px" }}>
          <Mentor_Time_Picker_new meetDateFromRef={startTimeRef} label="Meeting Start Time" />
        </div>
        <div className='col-md-6'>
          <Mentor_Time_Picker_new meetDateFromRef={endTimeRef} label="Meeting End Time" />
        </div>
      </div>
      <hr style={{ width:"100vw" }}/>

      <div style={{ display:'flex', flexDirection:"row", gap:"5px", justifyContent: 'flex-end' }}>
        <button onClick={close} className="btn btn-custom-gray" style={{ backgroundColor:"gray", color:"white" }}>
          Close
        </button>
        <button className="btn btn-success" onClick={handleSubmit}>Reschedule</button>
      </div>
    </div>
  );
};

export default Meeting_reschedule_apply;
