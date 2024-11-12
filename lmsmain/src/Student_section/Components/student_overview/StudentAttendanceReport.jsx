import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const StudentAttendanceReport = () => {
  // Chart configuration
  const chartOptions = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: {
      text: 'Attendance Report' // Set the title for the attendance report
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          distance: -30, // Closer to the center of the pie chart
          style: {
            fontSize: '14px', // Set the font size to 14px
            textOutline: 'none',
            opacity: 0.7
          },
          format: '{point.percentage:.1f}%',
          filter: {
            operator: '>',
            property: 'percentage',
            value: 0 // Show all percentages
          }
        },
        showInLegend: true
      }
    },

    legend: {
      align: 'center',
      verticalAlign: 'bottom',
      layout: 'horizontal',
      itemDistance: 5, // Adjust the item distance here
      itemStyle: {
        fontSize: '12px'
      }
    },

    series: [{
      name: 'Percentage',
      colorByPoint: true,
      data: [
        {
          name: 'Present',
          y: 50 // Percentage of students present (you can modify the value)
        },
        {
          name: 'Absent',
          y: 50 // Percentage of students absent (you can modify the value)
        }
      ]
    }],
    credits: {
      enabled: false // Disable Highcharts watermark
    }
  };

  return (
    <div id="pie-chart-container">
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
      />
    </div>
  );
};

export default StudentAttendanceReport;
