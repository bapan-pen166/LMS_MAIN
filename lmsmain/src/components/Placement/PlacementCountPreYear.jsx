import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useEffect,useState } from 'react';
import axios from 'axios';
import { api2 } from '../../ApiUrl/ApiUrl';

const PlacementCountPreYear = ({yearList,placed,notPlaced}) => {



    const options = {
        chart: {
            type: 'column'
        },
        credits: {
            enabled: false
         },
        title: {
            text: null
        },
        xAxis: {
            categories: yearList,
            title: {
                text: 'Grade'
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Count of Student ID'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: ( // theme
                        Highcharts.defaultOptions.title.style &&
                        Highcharts.defaultOptions.title.style.color
                    ) || 'gray'
                }
            }
        },
        // legend: {
        //     align: 'right',
        //     x: -30,
        //     verticalAlign: 'top',
        //     y: 25,
        //     floating: true,
        //     backgroundColor:
        //         Highcharts.defaultOptions.legend.backgroundColor || 'white',
        //     borderColor: '#CCC',
        //     borderWidth: 1,
        //     shadow: false
        // },
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true
                }
            }
        },
        series: [{
            name: 'No Placement',
            // data: [80, 87, 143, 162], // 'No' counts for D, C, A, B
            data:placed,
            color: '#455a64' // dark gray
        }, {
            name: 'Placement',
            // data: [40, 28, 38, 45], // 'Yes' counts for D, C, A, B
            data:notPlaced,
            color: '#fbc02d' // yellow
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

export default PlacementCountPreYear;
