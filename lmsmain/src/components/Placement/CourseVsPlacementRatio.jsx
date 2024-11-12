import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const CourseVsPlacementRatio = ({courseList,TotalStudentCountINCourse,AvgStudentPlacedInCourse}) => {
    const options = {
        chart: {
            zoomType: 'xy' // Dual-axis chart (Column and Line)
        },
        credits: {
            enabled: false
         },
        title: {
            text: null
        },
        xAxis: {
            // categories: ['BIM-Ready (MEP)', 'BIM-Ready (Arch + Structure)', 'BIM-Ready+', 'BIM-Ready Complete'],
            categories:courseList,
            crosshair: true,
            title: {
                text: 'Course Name'
            }
        },
        yAxis: [{
            // Primary yAxis for Student Count
            title: {
                text: 'Count of Student ID'
            },
            labels: {
                format: '{value}'
            }
        }, {
            // Secondary yAxis for Placement Ratio
            title: {
                text: 'Placement Ratio'
            },
            labels: {
                format: '{value}'
            },
            opposite: true
        }],
        tooltip: {
            shared: true
        },
        series: [{
            name: 'Count of Student ID',
            type: 'column',
            // data: [1167, 1214, 1444, 1047], // Student count per course
            data:TotalStudentCountINCourse,
            tooltip: {
                valueSuffix: ''
            },
            color: '#455a64', // Dark color for the column
            dataLabels: {
                enabled: true,
                format: '{point.y}' // Format to show 3 decimal places
            }
        }, {
            name: 'Placement Ratio',
            type: 'spline', // Line chart (spline)
            yAxis: 1, // Use secondary y-axis
            // data: [0.113, 0.125, 0.127, 0.149], // Placement ratio per course
            data:AvgStudentPlacedInCourse,
            tooltip: {
                valueSuffix: ''
            },
            color: '#fbc02d', // Yellow color for the line
            dataLabels: {
                enabled: true,
                format: '{point.y:.3f}' // Format to show 3 decimal places
            }
        }]
    };

    return (
        <div>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </div>
    );
}

export default CourseVsPlacementRatio;
