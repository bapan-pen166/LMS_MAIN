import React, { useEffect, useState } from 'react';
import Highcharts, { color } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMore from 'highcharts/highcharts-more';
import SolidGauge from 'highcharts/modules/solid-gauge';
import {faUserGraduate } from '@fortawesome/free-solid-svg-icons';

HighchartsMore(Highcharts);
SolidGauge(Highcharts);

const StudentScoreChart = () => {
    const testData = {
        categories: ['Math', 'Science', 'English', 'History', 'Art'], // Test names
        series: [
            {
                name: 'Test Scores',
                data: [85, 90, 78, 88, 95] // Test scores
            }
        ]
    };

    const options = {
        chart: {
            type: 'bar', // Bar chart type
            height: '150px',
            backgroundColor: 'transparent',
            // Enable right-to-left layout
            style: {
                direction: 'rtl' // Apply RTL text direction
            }
        },
        title: {
            text: 'Test Scores'
        },
        xAxis: {
            categories: testData.categories, // X-axis labels (test names)
            title: {
                text: 'Subjects'
            },
            labels: {
                style: {
                    textAlign: 'right' // Align labels to the right in RTL mode
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Scores'
            },
            labels: {
                overflow: 'justify'
            }
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
                }
            }
        },
        series: testData.series,
        // Enable RTL for overall layout
        lang: {
            decimalPoint: ',',
            thousandsSep: '.'
        },
        // Enable RTL layout for chart
        rtl: true
    };

    return (
        <div >
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
};

export default StudentScoreChart
