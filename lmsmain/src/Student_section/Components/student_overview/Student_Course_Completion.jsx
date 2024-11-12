import React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles'; // Import styled for custom styling

function valuetext(value) {
  return `${value}%`;
}

// Create a styled Slider component with dynamic colors
const CustomSlider = styled(Slider)(({ theme, value }) => ({
  color: '#1976d2', // Blue color for the full slider
  height: 25, // Increase thickness
  '& .MuiSlider-thumb': {
    height: 0,
    width: 35,
    backgroundColor: '#fff',
    // border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active': {
      boxShadow: 'inherit',
    },
  },
  '& .MuiSlider-track': {
    borderRadius: 10,
    height:25,
    wiidth:25,
    background: `#00FF7F ${value}%`, // Green for completed part and blue for the rest
  },
  '& .MuiSlider-rail': {
    height: 25,
    wiidth:25,
    borderRadius: 10,
    backgroundColor: '#E5E4E2', // Blue color for the rail
  },
}));

const Student_Course_Completion = ({ percentage=0 }) => {
  return (
    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
      <div>
        <span style={{display:"flex",fontWeight:"bold"}}>Progress</span>
        <Box sx={{ width: 350 }}> {/* Reduced width */}
          {/* Display the percentage with the Slider */}
          <CustomSlider
            aria-label="Course Completion"
            value={percentage}
            getAriaValueText={valuetext}
            valueLabelDisplay="auto"
            step={10}
            // marks={[
            //   { value: 0, label: '0%' },
            //   { value: 100, label: '100%' },
            // ]}
            min={0}
            max={100}
            disabled
          />
          {/* <span
            style={{
              position: 'absolute',
              left: `${percentage-13}%`,
              transform: 'translateX(-50%)',
              top: '45%',
              transform: 'translateY(-50%)',
              fontWeight: '400',
              fontSize:15,
              color: '#000',
            }}
          >
            {percentage}%
          </span> */}
        </Box>
        <p style={{textAlign: "center", position: "relative", bottom: "20px",fontWeight:"600"}}>{percentage}%</p>
      </div>
    </div>
  );
};

export default Student_Course_Completion;




// import React from 'react';
// import Highcharts from 'highcharts';
// import HighchartsReact from 'highcharts-react-official';
// import bullet from 'highcharts/modules/bullet';

// // Initialize Bullet module
// bullet(Highcharts);

// const Student_Course_Completion = ({ percentage }) => {
//   const options = {
//     chart: {
//       inverted: true,
//       marginLeft: 20, 
//       type: 'bullet',
//       marginTop: 20,  
//       width: 400,     
//       height: 100,
        
//     },
//     title: { text: '' },
//     legend: { enabled: false },
//     xAxis: {
//       categories: [''],
//     },
//     yAxis: {
//       plotBands: [
//         { from: 0, to: 33, color: '#90ee90' },
//         { from: 33, to: 66, color: '#65a765' },
//         { from: 66, to: 100, color: '#65a765' },
//       ],
//       labels: { format: '{value}%' },
//       title: null,
//     },
//     plotOptions: {
//       series: {
//         pointPadding: 0.25,
//         borderWidth: 0,
//         color: '#378b29',
//         targetOptions: { width: '150%' },
//       },
//     },
//     series: [
//       {
//         data: [
//           {
//             y: percentage,
//             target: 50, // You can set a dynamic or fixed target here
//           },
//         ],
//       },
//     ],
//     tooltip: {
//       pointFormat: '<b>{point.y}%</b> (with target at {point.target}%)',
//     },
//     credits: { enabled: false },
//     exporting: { enabled: false },
//   };

//   return <HighchartsReact highcharts={Highcharts} options={options} />;
// };

// export default Student_Course_Completion;

