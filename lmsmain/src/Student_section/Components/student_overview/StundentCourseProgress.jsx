import React, { useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const StundentCourseProgress = () => {
    const chartRef = useRef(null);  // We will use this reference to update the chart

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
            endAngle: 360,
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
            rounded: true
        },
        series: [
            {
                name: 'Course Progress',
                linecap: 'round',
                data: [80],  // Replace with dynamic data if needed
                dataLabels: {
                    enabled: false,  // Disable data labels on the gauge itself
                },
            },
        ],
        // Adding a custom center label
        subtitle: {
            text: '80', // Show the number in the center of the gauge
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
                ref={chartRef}
            />
        </div>
    );
};

export default StundentCourseProgress;
