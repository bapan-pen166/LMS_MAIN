import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';
import { api } from '../ApiUrl/ApiUrl';
import dayjs from "dayjs";


const ColumnChartCourseWiseStudents = ({startDate,endDate,courseWiseSearch,setCourseWiseSearch}) => {
   const [courseWiseStudent, setCourseWiseStudent] = useState([]);
   console.log("  startDate  : ",startDate,endDate,"   endDate : ")


//    for the calculation of the day 
      const today = dayjs();
      const startDatee = today.month() === 0
      ? dayjs(`${today.year() - 1}-04-30`) 
      : dayjs(`${today.year()}-04-30`);

      const formattedStartDate = startDatee.format("YYYY-MM-DD");
      const formattedEndDate = today.format("YYYY-MM-DD");
  


   const courseWiseStudents = () => {
      axios.post(`${api}/dashboard/getCourseWiseStudents`,{startDate:startDate,endDate:endDate})
      .then((Response) => {
          console.log("getCourseWiseStudents", Response?.data?.courseWiseStudents);
          setCourseWiseStudent(Response?.data?.courseWiseStudents);
          setCourseWiseSearch(false)
      })
      .catch((error) => {
        console.log(error);
      });
   }


   const couseWiseStudentsInitial = ()=>{
    axios.post(`${api}/dashboard/getCourseWiseStudents`,{startDate:formattedStartDate,endDate:formattedEndDate})
    .then((Response) => {
        console.log("getCourseWiseStudents", Response?.data?.courseWiseStudents);
        setCourseWiseStudent(Response?.data?.courseWiseStudents);
        setCourseWiseSearch(false)
    })
    .catch((error) => {
      console.log(error);
    });
         
   }

   useEffect(()=>{
    couseWiseStudentsInitial()
   },[formattedStartDate,formattedEndDate])



//    const courseWiseStudentsNODATA = ()=>{
//     axios.post(`${api}/dashboard/getCourseWiseStudents`,{})
//     .then((Response) => {
//         console.log("getCourseWiseStudents", Response?.data?.courseWiseStudents);
//         setCourseWiseStudent(Response?.data?.courseWiseStudents);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
//    }


//    useEffect(()=>{
//        if(forThebuttonClick){
//          courseWiseStudentsNODATA();
//        }
//    },[forThebuttonClick])


   useEffect(() => {
    if(courseWiseSearch){
        courseWiseStudents();
    }
   }, [courseWiseSearch]);

    // Directly using the student counts instead of calculating percentages
    const seriesData = courseWiseStudent?.map(course => ({
        name: course.mx_Course,
        y: course.Count // Use the actual number of students
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
            title: {
                text: 'Number of Students' // Change to reflect actual student numbers
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
                    format: '{point.y}' // Show the number of students instead of percentages
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
                name: 'Courses',
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
        <div style={{ height: '200px' }}> 
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
};

export default ColumnChartCourseWiseStudents;
