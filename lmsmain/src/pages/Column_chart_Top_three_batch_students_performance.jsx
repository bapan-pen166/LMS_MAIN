import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const Column_chart_Top_three_batch_students_performance = () => {
    const totalStudents = 500;
    const courseData = [
        { name: 'Batch Aluminium', students: 100 },
        { name: 'Zinc', students: 50 },
        { name: 'Cooper', students: 200 },
     
    ];

    const seriesData = courseData.map(course => ({
        name: course.name,
        y: (course.students / totalStudents) * 100
    }));

    const options = {
        chart: {
            type: 'column',
            height:275,
        },
        title: {
            align: 'left',
            text: ''
        },
        subtitle: {
            align: 'left',
            text: ''
        },
        accessibility: {
            announceNewData: {
                enabled: true
            }
        },
        xAxis: {
            type: 'category',
            title: {
                text: ''
            }
        },
        yAxis: {
            max: 100, // Ensuring the y-axis is based on 100%
            title: {
                text: 'Percentage of Students'
            }
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.1f}%'
                }
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total students<br/>'
        },
        credits: {
            enabled: false // Disabling Highcharts credits
        },
        series: [
            {
                name: 'Batches',
                colorByPoint: true,
                data: seriesData
            }
        ],
        drilldown: {
            breadcrumbs: {
                position: {
                    align: 'right'
                }
            },
            series: []
        }
    };

    return (
        <div style={{ height: '200px' }}> {/* Set the height of the container */}
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
};

export default Column_chart_Top_three_batch_students_performance;
