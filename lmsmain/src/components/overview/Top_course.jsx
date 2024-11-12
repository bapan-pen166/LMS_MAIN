import React from 'react'
import axios from 'axios';
import { useState,useEffect } from 'react';
import { api } from '../../ApiUrl/ApiUrl';

function Top_course() {
    const [coursedata,setCoursedata]=useState([]);

    async function handleOnCourse() {
        try {
          const course_data = await axios.get(
            `${api}/dashboard/getTopCourse `
          );
          console.log("Top courses ::: ",course_data.data);
          setCoursedata(course_data.data.topCourse);
        //   setStudent(sutents_all.data.courseList);
        } catch (error) {
          console.log(error);
        }
      }

      useEffect(()=>{
        handleOnCourse()
       },[])
    return ( 
        <>
        <div className="d-flex flex-wrap justify-content-between m-2">
    <div className="flex-grow-1">
        <h6 className="box-heading text-left"><b>Top Courses</b></h6>
    </div>
    {/* <div className="d-flex align-items-center">
        <button type="button" className="btn btn-warning background_color"><b>View</b></button>
    </div> */}
</div>

        <table className="table table-striped" >
            
            <tbody>

                {coursedata.map((data)=>{
                   return (<tr>
                        <td>{data?.Course}</td>
                        
                        <td>{data?.studentCount}</td>
                    </tr>)
                })}
            {/* <tr>
                <td>Bim Ready Complete</td>
                
                <td>450</td>
            </tr>
            <tr>
                <td>Bim Arch and structure</td>

                <td>379</td>
            </tr>
            <tr>
                <td>Bim Ready Plus</td>

                <td>139</td>
            </tr> */}
            </tbody>
        </table>

                           
        </>
     );
}

export default Top_course;