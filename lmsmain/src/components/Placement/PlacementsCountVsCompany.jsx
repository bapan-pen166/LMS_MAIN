import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const PlacementsCountVsCompany = ({companyData}) => {console.log(companyData)
    let companyname=Object.keys(companyData ||{})
    let placed=Object.values(companyData || {})

    const options = {
        chart: {
            type: 'areaspline' // Area Spline Chart
        },
        credits: {
            enabled: false
         },
        title: {
            text: null
        },
        xAxis: {
            // categories: [
            //     'Microsoft', 'Ytr', 'Cognigent', 'Google', 'Paytm', 'Cognizant',
            //     'TCS', 'Benz', 'Pentation Analytics', 'TVS Motors', 'BAJAJ', 'OLA'
            // ],
            categories:companyname,
            title: {
                text: 'Company Name'
            },
            labels: {
                rotation: -45 // Rotate labels for better readability
            }
        },
        yAxis: {
            title: {
                text: 'Sum of Vacancies'
            }
        },
        tooltip: {
            shared: true,
            valueSuffix: ' Vacancies'
        },
        plotOptions: {
            areaspline: {
                fillOpacity: 0.5, // Fill the area under the line
                dataLabels: {
                    enabled: true // Show data labels on each point
                }
            }
        },
        series: [{
            name: 'Sum of Vacancies',
            // data: [387, 372, 332, 319, 312, 307, 296, 292, 254, 217, 4, 4], // Data for vacancies per company
            data:placed,
            color: '#455a64' // Color for the area and line
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

export default PlacementsCountVsCompany;
