import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
// import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
// import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
// import { TimePicker } from '@mui/x-date-pickers/TimePicker';


import DatePicker from 'react-datepicker';
import { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import '../../assets/css/Meeting/Meeting.css';


import { TimePicker } from '@patternfly/react-core';
import "@patternfly/react-core/dist/styles/base.css";
import '../../assets/css/Meeting/Meeting.css';

export default function ResponsiveTimePickers({meetDateFromRef,seTimeFlag,timeFlag}) {
  const currentTime = dayjs().format('hh:mm A');
  // return (
  //   <LocalizationProvider dateAdapter={AdapterDayjs}>
  //     <DemoContainer
  //       components={[
  //         'TimePicker',
  //         'MobileTimePicker',
  //         'DesktopTimePicker',
  //         'StaticTimePicker',
  //       ]}
  //     >
  //       {/* <DemoItem label="Desktop variant">
  //         <DesktopTimePicker defaultValue={dayjs('2022-04-17T15:30')} />
  //       </DemoItem> */}
  //       {/* <DemoItem >
  //         <MobileTimePicker defaultValue={currentTime} inputRef={meetDateFromRef} />
  //       </DemoItem> */}
  //       {/* <DemoItem label={'"hours", "minutes"'}> */}
  //       <DemoItem >
  //         <TimePicker views={['hours', 'minutes']} defaultValue={currentTime} inputRef={meetDateFromRef}/>
  //       </DemoItem>
  //       {/* <DemoItem label="Responsive variant">
  //         <TimePicker defaultValue={dayjs('2022-04-17T15:30')} />
  //       </DemoItem>
  //       <DemoItem label="Static variant">
  //         <StaticTimePicker defaultValue={dayjs('2022-04-17T15:30')} />
  //       </DemoItem> */}
  //     </DemoContainer>
  //   </LocalizationProvider>
  // );

  // const [startDate, setStartDate] = useState(new Date());
  // return (
  //   <DatePicker
  //     selected={startDate}
  //     ref={meetDateFromRef}
  //     value={currentTime}
  //     onChange={(date) => setStartDate(date)}
  //     shouldCloseOnSelect={false}
  //     showTimeSelect
  //     showTimeSelectOnly
  //     timeIntervals={30}
  //     dateFormat="h:mm aa"
  //   />
  // )

  const onChange = (time, hour, minute, seconds, isValid) => {
    console.log('time', time);
    console.log('hour', hour);
    console.log('minute', minute);
    console.log('seconds', seconds);
    console.log('isValid', isValid);
    const value=hour
    setSelectedTime(value);
  };

  const [selectedTime, setSelectedTime] = useState(currentTime);
  
  const handleTimeChange = (time) => {
    setSelectedTime(time.target.innerHTML);
    console.log('Selected time:', time);
    // console.log(e);
  };
  React.useEffect(()=>{
meetDateFromRef.current=selectedTime
seTimeFlag(!timeFlag);
  },[selectedTime,, meetDateFromRef])
  return(
    <div>
    <TimePicker 
  time={currentTime}
  // value={selectedTime.toDate()}
  // onChange={(e)=>{setSelectedTime(e.target.value)}}
  onChange={onChange}
  width={'223px'}
  // style={{
  //   width: '500px',
  // }}
  // inputProps={{
  //   style: {
  //     width: 'calc(100% - 30px)', 
  //   }
  // }}
  />
    </div>
  )

 
 
}
