import React from 'react';
import Highcharts, { color } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const StudentTestScore = () => {
    // Sample data for test scores
    const testData = {
        color: '#185055',
        // backgroundColor: '#185055',
        categories: ['Assignment Score', 'Test Score'], // Test names
        series: [
            {
                name: 'Test Scores',
                data: [60, 10.78] // Test scores
            }
        ]
    };

    const options = {
        chart: {
            type: 'bar', // Bar chart type
            height: '80%',
            backgroundColor: 'transparent'
        },
        credits: {
            enabled: false
        },
        title: {
            text: 'Test Scores'
        },
        xAxis: {
            categories: testData.categories, // X-axis labels (test names)
            title: {
                text: ''
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            },
            labels: {
                enabled: false // Hide Y-axis labels
            },
            // gridLineWidth: 0, // Hide major grid lines
            minorGridLineWidth: 0 // Hide minor grid lines
        },
        tooltip: {
            valueSuffix: ' points'
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true, // Show data labels on top of bars
                    style: {
                        fontWeight: 'bold',
                        color: '#000000'
                    }
                },
                pointWidth: 18,
                // groupPadding: 0.01, // Decrease the space between bars within a group
                // pointPadding: 0.05,
                color: '#185055'
            }
        },
        legend: {
            enabled: false // Hide the legend
        },
        series: testData.series
    };

    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
};

export default StudentTestScore;
