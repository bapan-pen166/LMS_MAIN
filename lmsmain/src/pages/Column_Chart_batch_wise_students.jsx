import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';
import { api } from '../ApiUrl/ApiUrl';
import dayjs from "dayjs";


const Column_Chart_batch_wise_students = ({setBatchWiseSearch,startDateBatchwise,endDateBatchwise , batchWiseSearch}) => {
    const [batchWiseStudent, setBatchWiseStudent] = useState([]);

    //    for the calculation of the day 
    const today = dayjs();
    const startDatee = today.month() === 0
    ? dayjs(`${today.year() - 1}-04-30`) 
    : dayjs(`${today.year()}-04-30`);

    const formattedStartDate = startDatee.format("YYYY-MM-DD");
    const formattedEndDate = today.format("YYYY-MM-DD");

    console.log("formattedStartDate",formattedStartDate,"formattedEndDate",formattedEndDate)


   const batchWiseStudentsInitial = ()=>{
    axios.post(`${api}/dashboard/getBatchWiseStudents`,{startDate:formattedStartDate,endDate:formattedEndDate})
    .then((Response) => {
        console.log("getBatchWiseStudents", Response?.data?.batchWiseStudents);
        setBatchWiseStudent(Response?.data?.batchWiseStudents || []);
        setBatchWiseSearch(false)
    })
    .catch((error) => {
        console.log(error);
    });
   }

   
    useEffect(()=>{
        batchWiseStudentsInitial()
       },[formattedStartDate,formattedEndDate])




    const courseWiseStudents = () => {
        axios.post(`${api}/dashboard/getBatchWiseStudents`,{startDate:startDateBatchwise,endDate:endDateBatchwise})
            .then((Response) => {
                console.log("getBatchWiseStudents", Response?.data?.batchWiseStudents);
                setBatchWiseStudent(Response?.data?.batchWiseStudents || []);
                setBatchWiseSearch(false)
            })
            .catch((error) => {
                console.log(error);
            });
    };


    // useEffect(()=>{
    //     if(forThebuttonClickBatchwise){
    //         axios.post(`${api}/dashboard/getBatchWiseStudents`,{})
    //         .then((Response) => {
    //             console.log("getBatchWiseStudents", Response?.data?.batchWiseStudents);
    //             setBatchWiseSearch(Response?.data?.batchWiseStudents || []);
               
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    //     }

    // },[forThebuttonClickBatchwise])

    useEffect(() => {
        if(batchWiseSearch){
            courseWiseStudents();
        }
    }, [batchWiseSearch]);



    const seriesData = batchWiseStudent?.map(course => ({
        name: course.batch,
        y: course.Count // Displaying the actual count from the API
    }));

    const options = {
        chart: {
            type: 'column',
            height: 275,
        },
        title: {
            align: 'left',
            text: ''
        },
        xAxis: {
            type: 'category',
            title: {
                text: ''
            }
        },
        yAxis: {
            title: {
                text: 'Number of Students' // Updated title for actual student count
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
                    format: '{point.y}' // Displaying the actual count in the chart
                }
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> students<br/>'
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
        ]
    };

    return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default Column_Chart_batch_wise_students;
