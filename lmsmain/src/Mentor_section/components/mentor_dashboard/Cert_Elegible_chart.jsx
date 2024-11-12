
import React, { useEffect, useRef, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Height } from '@mui/icons-material';
import axios from 'axios';
import { api2 } from '../../../ApiUrl/ApiUrl';
const Cert_Elegible_chart = ({certElgData}) => {
    const chartRef = useRef(null);
    const [CertElgCount,setCertElgCount]=useState([]);
    const [mentorEmail,setMentorEmail]=useState('');
   
    console.log('within chart',certElgData.notEligible);
     useEffect(()=>{
        // batchWiseCertElgCount(localStorage.getItem('mentorEmail'));
        setMentorEmail(localStorage.getItem('mentorEmail'));
     })

     const generateChartData = () => {

        const data = CertElgCount.map(batch => ({
            name: batch.name,
            y: batch.y,
           
         }));
    
            return data;
       };

    const options = {
        chart: {
            type: 'pie',
            width:350,
            Height:400,
            
            // events: {
            //     render() {
            //         const chart = this,
            //             series = chart.series[0];
            //         let customLabel = chart.options.chart.custom.label;

            //         if (!customLabel) {
            //             customLabel = chart.options.chart.custom.label =
            //                 chart.renderer
            //                     .label('Total<br/><strong>2 877 820</strong>')
            //                     .css({
            //                         color: '#000',
            //                         textAnchor: 'middle'
            //                     })
            //                     .add();
            //         }

            //         const x = series.center[0] + chart.plotLeft,
            //             y = series.center[1] + chart.plotTop - (customLabel.attr('height') / 2);

            //         customLabel.attr({ x, y });
            //         customLabel.css({
            //             fontSize: `${series.center[2] / 12}px`
            //         });
            //     }
            // },
            custom: {}
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
            text: 'Certificate Eligible Count'
        },
        // subtitle: {
        //     text: 'Source: <a href="https://www.ssb.no/transport-og-reiseliv/faktaside/bil-og-transport">SSB</a>'
        // },
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
                borderRadius: 8,
                dataLabels: [{
                    enabled: true,
                    distance: 20,
                    format: '{point.name}'
                }, {
                    enabled: true,
                    distance: -15,
                    format: '{point.percentage:.0f}%',
                    style: {
                        fontSize: '0.9em'
                    }
                }],
                showInLegend: true
            }
        },
        series: [{
            name: 'Count',
            colorByPoint: true,
            innerSize: '75%',
            data: [{
                name: 'YES',
                y: certElgData?.eligible
            }, {
                name: 'NO',
                y: certElgData?.notEligible
            }]
        }]
    };

    useEffect(() => {
        const chart = chartRef.current.chart;
        chart.options.chart.custom = { label: null };
        chart.render(); // Trigger the render event after mounting
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

export default Cert_Elegible_chart;
