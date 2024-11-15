import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const StudentClassOverview = () => {
    const totalClasses = 26; // Total minimum classes
    const remainingClasses = 5; // Remaining classes
    const attendedClasses = totalClasses - remainingClasses; // Classes attended

    // Percentage of classes attended and remaining
    const attendedPercentage = (attendedClasses / totalClasses) * 100;
    const remainingPercentage = 100 - attendedPercentage;

    const options = {
        chart: {
            type: 'pie',
            // height: '250px',
            height: '100%',
            backgroundColor: 'transparent',
        },
        credits: {
            enabled: false,
        },
        title: {
            text: '',
            style: {
                fontSize: '14px',
                fontWeight: 'bold',
            },
        },
        tooltip: {
            enabled: true, // Disable tooltip
        },
        plotOptions: {
            pie: {
                size: '70%',
                innerSize: '70%',
                dataLabels: {
                    enabled: true, // Disable labels outside the donut
                    distance: 5,
                },
                distance: 5,
                showInLegend: false, // Hide legend
                colors: ['#185055', '#28a7453d'], // Warm color for attended, grey for remaining
            },
        },
        series: [{
            name: 'Count',
            data: [
                { y: totalClasses, name: 'Minium class to Attend' }, // Attended percentage
                { y: remainingClasses, name: 'Remaining classes' }, // Remaining percentage
            ],
        }],
        annotations: [{
            labels: [{
                point: {
                    x: '50%',
                    y: '50%',
                    xAxis: 0,
                    yAxis: 0,
                },
                text: `${attendedClasses} / ${totalClasses} Classes`,
                style: {
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: '#FF5733', // Color of the center text
                },
            }],
        }],
    };

    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
};

export default StudentClassOverview;
