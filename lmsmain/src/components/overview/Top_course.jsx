import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { api } from '../../ApiUrl/ApiUrl';

function Top_course() {
    const [coursedata, setCoursedata] = useState([]);

    async function handleOnCourse() {
        try {
            const course_data = await axios.get(
                `${api}/dashboard/getTopCourse `
            );
            console.log("Top courses ::: ", course_data.data);
            setCoursedata(course_data.data.topCourse);
            //   setStudent(sutents_all.data.courseList);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        handleOnCourse()
    }, [])
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

            <table className="table table-striped d-none" >

                <tbody>

                    {/* {coursedata.map((data) => {
                        return (<tr>
                            <td>{data?.Course}</td>

                            <td>{data?.studentCount}</td>
                        </tr>)
                    })} */}
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
            <table className="table scroll-y d-none" >
                <thead>
                    <tr>
                        <th></th>
                        <th>Course Name</th>
                        <th>Total Student</th>
                    </tr>
                </thead>
            </table>

            {coursedata.map((data) => {
                return (
                        <div className="align-items-center mb-3 d-flex justify-content-between box-border-light hover-effect px-2 py-3 flex-wrap">
                            <div className="col-lg-9 d-flex align-items-center">
                                <span className="text-white mb-0" style={{
                                    width: "3vw",
                                    height: "3vw",
                                    backgroundColor: "#4BAAC8",
                                    color: "#ffffff",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: "50%",
                                    fontWeight: "bold",
                                    fontSize: "2vw",
                                    margin: 0,
                                }}>
                                    {/* <FontAwesomeIcon style={{ color: "green" }} icon={faUserCheck} /> */}
                                    {data.Course.charAt(0).toUpperCase()}
                                </span>
                                <span className="text-dark hover-primary ml-3 d-block fs-16">
                                    {data.Course}
                                </span>
                            </div>
                            <div className='col-lg-3 align-items-center text-center'>
                                <h5 className="fw-600 mb-0 badge badge-pill badge-primary">
                                    {data.studentCount} <i class="fa fa-user"></i>
                                </h5>
                                <p class="text-gray mt-1 mb-0 font-10">Total Student</p>
                            </div>
                        </div>
                )
            })}

        </>
    );
}

export default Top_course;