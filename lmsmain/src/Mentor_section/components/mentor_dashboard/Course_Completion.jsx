import React, { useRef, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const Course_Completion = ({ percentage }) => {
  // Clamp percentage between 0 and 100
  const clampedPercentage = Math.min(100, Math.max(0, percentage));
  
  // Setting up the gauge options to match the required design
  const gaugeOptions = {
    chart: {
      type: 'solidgauge',
      height: '160px',  // Set the height of the chart here
      backgroundColor: 'transparent',
    },
    title: null,
    credits: {
      enabled: false,
    },
    tooltip: {
      enabled: true,
    },
    pane: {
      center: ['50%', '50%'],
      size: '70px',
      startAngle: 0,
      endAngle: 180,  // Adjust the gauge arc to 180 degrees
      background: {
        backgroundColor: '#EEE',
        innerRadius: '75%',
        outerRadius: '100%',
        borderWidth: 0,
      },
    },
    yAxis: {
      min: 0,
      max: 100,
      labels: {
        enabled: false,
      },
      lineWidth: 0,
      minorTickInterval: null,
      tickPixelInterval: 400,
      tickWidth: 0,
    },
    plotOptions: {
      solidgauge: {
        innerRadius: '75%',
      },
      linecap: 'round',
      rounded: true,
    },
    series: [
      {
        name: 'Course Progress',
        data: [clampedPercentage],  // Dynamic data based on the percentage prop
        dataLabels: {
          enabled: false,  // Disable data labels on the gauge itself
        },
      },
    ],
    subtitle: {
      text: `${clampedPercentage}%`, // Show the percentage in the center of the gauge
      style: {
        fontSize: '20px',
        fontWeight: 'bold',
        color: 'black',
      },
      verticalAlign: 'middle',
      y: 20,
    },
  };

  return (
    <div className="pt-2 mt-n3 pl-5">
      <HighchartsReact
        highcharts={Highcharts}
        options={gaugeOptions}
        ref={useRef(null)}
      />
    </div>
  );
};

export default Course_Completion;


