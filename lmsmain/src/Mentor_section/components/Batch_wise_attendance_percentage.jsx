import React, { useEffect, useState } from 'react'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';
import { api2 } from '../../ApiUrl/ApiUrl';


const Batch_wise_attendance_percentage = () => {

    // getBatchWiseAttendanceReport 
    const [batchAttendance,setBatchAttendance]=useState('');
    const batchWiseAttendanceReport = (email) => {
        axios.post(`${api2}/dashboard/getBatchWiseAttendanceReport`, { mentorEmail: email })
           .then((response) => {
            setBatchAttendance(response?.data?.result);
           })
           .catch((error) => {
              console.log(error);
           });
     };

     useEffect(()=>{
        batchWiseAttendanceReport(localStorage.getItem('mentorEmail'))
     },[])
    const options = {
        chart: {
            type: 'column'
        },
        title: {
            text: ''
        },
        accessibility: {
            announceNewData: {
                enabled: true
            }
        },
        xAxis: {
            type: 'category',
            gridLineWidth: 0
        },
        yAxis: {
            title: {
                text: ''
            },
            min: 0, // Set minimum value to 0
            max: 100, // Set maximum value to 100
            gridLineWidth: 0
        },
        legend: {
            enabled: false,
            itemStyle: {
                fontSize: '12px'
              }
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.1f}%' // Format data labels with one decimal place
                },
                
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:11px">{point.name}</span><br>',
            // pointFormat: 'Students: <b>{point.y}</b><br/>Click to show names of the users.'
        },
        series: [
            {
                name: 'Activity',
                colorByPoint: true,
                // data: [
                //     {
                //         name: '2024_Nickel_M5',
                //         y: 36,
                //     },
                //     {
                //         name: 'SELENIUM',
                //         y: 76,
                //     },
                //     {
                //         name: 'TSA MANGANESE(MEP)',
                //         y: 41,
                //     },
                //     {
                //         name: 'Overall',
                //         y: 59,
                //     }
                // ]
                data:batchAttendance
            }
        ],
        credits: {
            enabled: false
        }
    };

    return (
        <div>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </div>
    )
}

export default Batch_wise_attendance_percentage;
