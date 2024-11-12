import * as React from 'react';
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


export default function Country_list({country,setCountry,countrylist,info,selectedCountrys, setSelectedCountrys}) {
    // const [selectedStates, setSelectedStates] = useState([]);

    // const handleChange = (event) => {
    //   setSelectedStates(event.target.value);
    // };

    // const handleChangeview =()=>{
    //     console.log(selectedStates)
    // }
  
    // return (
    //     <>
    //   <FormControl>
    //     <InputLabel>Select States</InputLabel>
    //     <Select
    //       multiple
    //       value={selectedStates}
    //       onChange={handleChange}
    //       input={<Select />}
    //       renderValue={(selected) => selected.join(', ')}
    //     >
    //       {states.map((state) => (
    //         <MenuItem key={state.id} value={state.name}>
    //           <Checkbox checked={selectedStates.indexOf(state.name) > -1} />
    //           <ListItemText primary={state.name} />
    //         </MenuItem>
    //       ))}
    //     </Select>
    //   </FormControl>
    //       <button onClick={handleChangeview}>view</button>
    //   </>
    // );
    // const initialCountry = countrylist.find((val) => val.name == country);
    // const [selectedCountrys, setSelectedCountrys] = useState(initialCountry);
    // const [selectedStates, setSelectedStates] = useState({ name: 'Bihar' });
    // const[prevstate,setpreviousState]=useState('Bihar');

  // const handleChange = (event) => {
  //   const { value } = event.target;
  //   setSelectedStates(value);
  //   setpreviousState(value);
  // };
  const handleChange = (event) => {
    setSelectedCountrys(event.target.value);
  };
  const view=()=>{
    console.log(country)
    // console.log(initialCountry)
    console.log(selectedCountrys)
  }
//   React.useEffect(()=>{
//     if(selectedStates){const value= 'Chhattisgarh';
//     let data=states.filter(val=>val.name==value)
// setSelectedStates([data]);}
//   },[selectedStates])
// useEffect(()=>{
//     setCountry(initialCountry)
//     console.log(initialCountry)
// },[info])
// useEffect(()=>{
//   setSelectedCountrys(initialCountry)
// },[country])

  return (
    <>{console.log(selectedCountrys)}
    <FormControl style={{minWidth: 170}}>
      {/* <InputLabel>Select States</InputLabel> */}
      <Select
        // multiple
        value={selectedCountrys || ''}
        // value={selectedStates.filter(item =>  item.name != 'Bihar')}
        // value={prevstate}
        onChange={handleChange}
        input={<OutlinedInput />}
        // input={<Select />}
        // renderValue={(selected) => selected.map((state) => state.name).join(', ')}
        // renderValue={(selected) => selected.join(', ')}
        // renderValue={(selected) => selected.map((state) => state.name).join(', ')}
        renderValue={(selected) => selected.name}
          MenuProps={MenuProps}
      >
        {/* { states.map((state) => (
          <MenuItem key={state.id} value={state}>
            <Checkbox checked={selectedStates.some((s) => s.id === state.id)} />
            <Checkbox checked={selectedStates.includes(state.name)} />
            <Checkbox checked={selectedStates.some((s) => s.name === state.name)}/>
            <ListItemText primary={state.name} />
          </MenuItem>
        ))} */}
        {countrylist.map((country) => (
            <MenuItem key={country.id} value={country}>
              {country.name}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
    {/* <button onClick={view}>view</button> */}
    </>
  );
}
