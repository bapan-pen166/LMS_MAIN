import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const PlacementAndGrade = ({studentsCountByGradeAndPlacement}) => {
    console.log(studentsCountByGradeAndPlacement)
    let grades=Object?.keys(studentsCountByGradeAndPlacement || {});
    let not_placed=Object?.values(studentsCountByGradeAndPlacement || {}).map(val=>val.not_placed);
    let placed=Object?.values(studentsCountByGradeAndPlacement || {}).map(val=>val.placed)
    console.log(grades,not_placed,placed)
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
            // categories: ['D', 'C', 'A', 'B'],
            categories:grades,
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
            data:not_placed,
            color: '#455a64' // dark gray
        }, {
            name: 'Placement',
            // data: [101, 101, 218, 204], // 'Yes' counts for D, C, A, B
            data:placed,
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

export default PlacementAndGrade;
