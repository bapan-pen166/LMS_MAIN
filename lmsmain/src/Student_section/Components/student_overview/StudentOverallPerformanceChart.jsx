import React, { useEffect, useState } from 'react';
import Highcharts, { color } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMore from 'highcharts/highcharts-more';
import SolidGauge from 'highcharts/modules/solid-gauge';
import { faUserGraduate } from '@fortawesome/free-solid-svg-icons';

HighchartsMore(Highcharts);

const StudentOverallPerformanceChart = () => {
    const value = 21.21; // Score

    const options = {
        chart: {
            type: 'pie',
            height: '90%',
            marginTop: 0,
            marginBottom: 0,
            marginTop: 50, // Adjust margin top to create space above the chart
            marginBottom: 0,
            backgroundColor: "transparent",
            
            // events: {
            //     render: function () {
            //         const chart = this;
            //         const series = chart.series[0]; // Access the first series (the doughnut chart)

            //         // Create a custom label for the center of the doughnut chart
            //         const customLabel = chart.renderer.label(
            //             'Score<br/><strong>' + value + '</strong>'
            //         )
            //             .css({
            //                 color: '#FF6384', // Red color for the score label
            //                 textAlign: 'center',
            //                 fontSize: `${series.center[2] / 5}px`, // Dynamically set font size based on chart size
            //                 fontWeight: 'bold',
            //             })
            //             .add();

            //         // Calculate the x and y position based on the center of the pie chart
            //         const x = series.center[0] + chart.plotLeft;
            //         const y = series.center[1] + chart.plotTop - (customLabel.attr('height') / 2);

            //         // Set the label position
            //         customLabel.attr({
            //             x: x,
            //             y: y
            //         });
            //     }
            // }
        },
        credits: {
            enabled: false
        },
        title: {
            text: 'Overall Performance',
            margin: 20, // Add gap between title and chart (20px or adjust as needed)
            style: {
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#333333', // Title text color
            }
        },
        tooltip: {
            enabled: true // Disable the tooltip
        },
        plotOptions: {
            pie: {
                size: '80%',
                innerSize: '70%',
                dataLabels: {
                    enabled: true, // Enable data labels for pie slices
                    formatter: function () {
                        // Only show data label for the active (filled) slice
                        if (this.percentage) {
                            return `${this.percentage.toFixed(1)}%`;
                        }
                    },
                    style: {
                        fontSize: '14px',
                        fontWeight: 'bold',
                        color: '#000000' // Color of the data labels (black)
                    },
                    distance: 10, // Distance of labels from the center of the pie
                },
                showInLegend: false, // Hide the legend
                colors: ['#185055', '#28a7453d'], // Pie slice colors
            }
        },
        series: [{
            data: [
                { y: value, name: 'My val' }, // Active slice (75)
                { y: 100 - value, name: '' } // Inactive slice (25)
            ]
        }],
        
    };

    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
};


export default StudentOverallPerformanceChart
