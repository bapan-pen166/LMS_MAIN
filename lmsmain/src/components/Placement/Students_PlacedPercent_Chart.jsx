import React, { useEffect, useRef, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';
import { api2 } from '../../ApiUrl/ApiUrl';

const Students_PlacedPercent_Chart = ({ avgOfPlacedStudent }) => {
    const chartRef = useRef(null);
    const [CertElgCount, setCertElgCount] = useState([]);
    const [mentorEmail, setMentorEmail] = useState('');
    const [chartWidth, setChartWidth] = useState(350); // Default chart width for smaller screens

    // Fetch data from the API when component mounts
    useEffect(() => {
        const mentorEmail = localStorage.getItem('mentorEmail');
        setMentorEmail(mentorEmail);

        // Fetch the data
        const fetchCertElgCount = async () => {
            try {
                const response = await axios.get(`${api2}/your-endpoint/${mentorEmail}`);
                setCertElgCount(response.data); // Assuming API returns an array of batch data
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        if (mentorEmail) {
            // fetchCertElgCount();
        }

        // Set chart width based on screen size
        const handleResize = () => {
            const screenWidth = window.innerWidth;
            if (screenWidth > 768) {
                setChartWidth(480); // Larger screen width
            } else {
                setChartWidth(350); // Smaller screen width
            }
        };

        // Initialize chart size on component mount
        handleResize();

        // Add event listener for window resizing
        window.addEventListener('resize', handleResize);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const generateChartData = () => {
        return CertElgCount.map(batch => ({
            name: batch.name,
            y: batch.y
        }));
    };

    const options = {
        chart: {
            type: 'pie',
            width: chartWidth, // Dynamic width based on screen size
            height: 400, // Fix case: Height should be lowercase
            custom: {} // To hold custom data
        },
        credits: {
            enabled: false
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        title: {
            text: null,
            style: {
                color: '#2c3e50',
                fontSize: '24px',
                fontWeight: 'bold',
                fontFamily: 'fontFamily: Georgia, serif',
                textAlign: 'center'
            }
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.0f}%</b>'
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                },
                showInLegend: true
            }
        },
        series: [{
            name: 'Count',
            colorByPoint: true,
            innerSize: '75%',
            data: generateChartData().length > 0 ? generateChartData() : [
                { name: 'YES', y: avgOfPlacedStudent },
                { name: 'NO', y: 100 - avgOfPlacedStudent }
            ]
        }]
    };

    useEffect(() => {
        const chart = chartRef?.current?.chart;
        if (chart) {
            chart.options.chart.custom = { label: null };
            chart.render(); // Trigger the render event after mounting
        }
    }, []);

    return (
        <div>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
                ref={chartRef}
            />
        </div>
    );
};

export default Students_PlacedPercent_Chart;
