import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const StudentAttendanceOverviewColumnChart = ({ StudentRemainingClasses, studentMinClassToAttendToReachFifty }) => {

    
    const totalClasses = 26; // Total minimum classes
    const remainingClasses = 5; // Remaining classes
    const attendedClasses = totalClasses - remainingClasses; // Classes attended

    // Percentage of classes attended and remaining
    const attendedPercentage = (attendedClasses / totalClasses) * 100;
    const remainingPercentage = 100 - attendedPercentage;

    const options = {
        chart: {
            type: 'column', // Change chart type to column
            backgroundColor: 'transparent',
            height: '250px',
        },
        credits: {
            enabled: false,
        },
        title: {
            text: '', // Title for the column chart
            style: {
                fontSize: '16px',
                fontWeight: 'bold',
            },
        },
        tooltip: {
            enabled: true, // Enable tooltip for detailed info
        },
        plotOptions: {
            column: {
                borderRadius: 5, // Optional: Rounded corners for columns
                dataLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: '#000',
                    },
                },
            },
        },
        xAxis: {
            categories: ['Minimum Class to attend', 'Remaining Classes'], // Categories for X-axis
            title: {
                text: '',
                style: {
                    fontSize: '14px',
                    fontWeight: 'bold',
                },
            },
            labels: {
                enabled: true, // Hide the y-axis labels
            },
        },
        yAxis: {
            min: 0,
            title: {
                text: '',
                style: {
                    fontSize: '14px',
                    fontWeight: 'bold',
                },
            },
            gridLineWidth: 0, // Hide the grid lines
            labels: {
                enabled: false, // Hide the y-axis labels
            },
        },
        lagends: false,
        series: [{
            data: [studentMinClassToAttendToReachFifty, StudentRemainingClasses], // Data for attended and remaining
            color: '#185055', // Color for attended classes
            zoneAxis: 'y',
            labels: {
                enabled: false, // Hide the y-axis labels
            },
            showInLegend: false,
            zones: [{
                value: studentMinClassToAttendToReachFifty, // Zone for attended classes
                color: '#28a745', // Green color for attended
            }, {
                value: StudentRemainingClasses, // Zone for remaining classes
                color: '#28a7453d', // Greyish color for remaining
            }],
        }],
    };

    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
};

export default StudentAttendanceOverviewColumnChart;
