import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import student_logo from "../assets/img/students logo/student logo.jpg"
import Column_Chart_course_wise_students from './Column_Chart_course_wise_students';
import Column_Chart_batch_wise_students from './Column_Chart_batch_wise_students';
import Column_chart_Top_three_batch_students_performance from './Column_chart_Top_three_batch_students_performance';
import PageNotFound from '../ErrorPage/PageNotFound';
import axios from 'axios';
import { api } from '../ApiUrl/ApiUrl';
import student_img from "../assets/img/Admin_student_dashboard/students.jpg"
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';


const Mentor_Students_Dashboard = () => {
    const [userType, setUserType] = useState('');
    const [overallStudent, setOverallStudents] = useState()
    const [isLoading, setIsLoading] = useState(true);
    const [topFiveStudents, setTopFiveStudents] = useState([]);
    const [bottomFiveStudents, setBottomFiveStudents] = useState([]);

   

    const [batchWiseSearch, setBatchWiseSearch] = useState(false);

    const [courseWiseSearch, setCourseWiseSearch] = useState(false)



    // ///////////////////
    // for the course wise Students

    const [startDate, setStartDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);
    const [forThebuttonClick, setForThebuttonClick] = useState(false)


    // Batchwise Students

    const [startDateBatchwise, setStartDateBatchwise] = React.useState(null);
    const [endDateBatchwise, setEndDateBatchwise] = React.useState(null);
    const [forThebuttonClickBatchwise, setForThebuttonClickBatchwise] = useState(false)

    // //////////////
    // ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const [selectFromTopFiveStd, setSelectFromTopFiveStd] = useState()
    const [selectFromBottomFiveStd, setSelectFromBottomFiveStd] = useState();
    const [topFiveStudentsBatch ,setTopFiveStudentsBatch ] = useState();
    const [bottomFiveStudentsBatch, setBottomFiveStudentsBatch] = useState();

    // //////////////////////////////////////////////////////////////////////////////////////////////////////////////////



    const [graduateStudentCount, setGraduateStudentCount] = useState()
    const [ongoingStudentCount, setOngoingStudentCount] = useState();
    const [yetToBeStarted, setYetToBeStarted] = useState();
    const [dropoutstd, setDropoutstd] = useState();


    const [courseList, setCourseList] = useState([]);
    const [batchList, setBatchList] = useState([]);



    const handleAllCourseList = (e) => {

        axios.post(`${api}/course/getCourseList`, {})
            .then((Response) => {
                console.log("course list data : ", Response?.data?.result);
                setCourseList(Response?.data?.result);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const handleAllBatchList = () => {
        axios.post(`${api}/course/getAllBatchList`, {})
            .then((Response) => {
                console.log("getAllBatchList", Response?.data?.result)
                setBatchList(Response?.data?.result)

            })
            .catch((error) => {
                console.error('error', error);
            })
    }


    useEffect(() => {
        handleAllCourseList()
        handleAllBatchList()
    }, [])


    const overallStudents = () => {
        axios.get(`${api}/dashboard/getTotalOverallStudentsCount`)
            .then((Response) => {
                console.log("overall students :", Response.data.count)
                setOverallStudents(Response.data.count);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const getTopFiveStudents = () => {
        console.log(selectFromTopFiveStd)
        axios.post(`${api}/dashboard/getTopBottomFiveStudentsAdmin`, { courseName: selectFromTopFiveStd, batchName : topFiveStudentsBatch })
            .then((Response) => {
                console.log("getTopFiveStudents :", Response?.data?.topFiveStudents)
                setTopFiveStudents(Response?.data?.topFiveStudents)

            })
            .catch((error) => {
                console.log(error);
            })
    }

    const getBottomFiveStudents = () => {
        console.log(selectFromBottomFiveStd)
        axios.post(`${api}/dashboard/getTopBottomFiveStudentsAdmin`, { courseName: selectFromBottomFiveStd , batchName : bottomFiveStudentsBatch})
            .then((Response) => {
                console.log("getBottomFiveStudents :", Response?.data?.bottomFiveStudents)
                setBottomFiveStudents(Response?.data?.bottomFiveStudents)
            })
            .catch((error) => {
                console.log(error);
            })
    }


    const handleTopFive = (e) => {

        console.log(e)
        setSelectFromTopFiveStd(e.target.value)
        setTopFiveStudentsBatch();
        // getTopFiveStudents()
    }


    // /////////////    //      //                 ///////////////////////////////////////////////////////////////////////////////
    const handleTopFiveBatch = (e) => {
        setTopFiveStudentsBatch(e.target.value)
        setSelectFromTopFiveStd()
    }

    const handleBotttomFiveBatch = (e) => {
        setBottomFiveStudentsBatch(e.target.value)
        setSelectFromBottomFiveStd()

        
    }















    useEffect(() => {
        if (selectFromTopFiveStd || topFiveStudentsBatch) {
            getTopFiveStudents();
        }
    }, [selectFromTopFiveStd,topFiveStudentsBatch])


    useEffect(() => {
        if (selectFromBottomFiveStd || bottomFiveStudentsBatch) {
            getBottomFiveStudents();
        }
    }, [selectFromBottomFiveStd,bottomFiveStudentsBatch])


    const handleBottomFive = (e) => {
        setSelectFromBottomFiveStd(e.target.value)
        setBottomFiveStudentsBatch();
        // getBottomFiveStudents()
    }

    ////////////////////////////////////////////////////////////////////////////
    const graduateStudentCnt = () => {
        axios.get(`${api}/dashboard/getGraduatedStudentsCount`)
            .then((Response) => {
                console.log("graduateStudentCnt :::::", Response?.data?.graduated_count);
                setGraduateStudentCount(Response?.data?.graduated_count)
            })
            .catch((error) => {
                console.log(error);
            })
    }


    const onGoingBatchStdCount = () => {
        axios.get(`${api}/dashboard/getOngoingBatchStudentsCount`)
            .then((Response) => {
                console.log("getOngoingBatchStudentsCount :::::", Response?.data.totalCount);
                // setGraduateStudentCount(Response?.data?.graduated_count)
                setOngoingStudentCount(Response?.data.totalCount);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const getYetToBeStartedBatchCount = () => {
        axios.get(`${api}/dashboard/getYetToStartBatchCount`)
            .then((Response) => {
                console.log("getYetToStartBatchCount :::::", Response?.data?.yetToStartTotalCount);
                // setGraduateStudentCount(Response?.data?.graduated_count)
                setYetToBeStarted(Response?.data?.yetToStartTotalCount);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const getDropOutStudentDetails = () => {
        axios.get(`${api}/dashboard/dropoutStudentDetails`)
            .then((Response) => {
                console.log("dropoutStudentDetails :::::", Response?.data);
                // setGraduateStudentCount(Response?.data?.graduated_count)
                setDropoutstd(Response?.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const initialtopBottomDataAll = ()=>{
        axios.post(`${api}/dashboard/getTopBottomFiveStudentsAmongAllBatches`)
            .then((Response) => {
                console.log("getTopBottomFiveStudentsAmongAllBatches :::::", Response);
                setTopFiveStudents(Response?.data?.topFiveStudents)
                setBottomFiveStudents(Response?.data?.bottomFiveStudents)
            })
            .catch((error) => {
                console.log(error);
            })

    }




    useEffect(() => {
        graduateStudentCnt();
        onGoingBatchStdCount();
        getYetToBeStartedBatchCount();
        getDropOutStudentDetails()
        initialtopBottomDataAll()
    }, [])



    useEffect(() => {
        getTopFiveStudents();
    }, [])

    useEffect(() => {
        const type = localStorage.getItem('userType');
        setUserType(type);
        setIsLoading(false)
    }, []);


    const formatDate = (date) => {
        return date ? dayjs(date).format('YYYY-MM-DD') : null;
    };



    useEffect(() => {
        overallStudents();
    }, [])


    if (isLoading) {
        return <div>Loading...</div>;
    }










    if (userType !== 'Admin') {
        return <PageNotFound />
    }






    const attendancePercentage = 66;

    return (
        <div style={{ marginTop: "58px" }} className='row g-3'>
            <div className="row">
                <div className="container-fluid" style={{ backgroundColor: "#f2edf3" }}>
                    {/* <div className=' col-md-12 col-lg-12  headLineBox d-flex justify-content-start' >
                        <h4>Students Dashboard</h4>
                    </div> */}

                    <div className="row mt-3">
                        <div className="col-md-12">
                            <h1 className='chart-heading-batchwise' >Student count details</h1>
                            {/* <div className='table-bordered ' style={{ display: "flex", gap: "10px", alignItems: "center", height: "280px" }}> */}
                        </div>
                    </div>
                    <div className="row mt-1" >
                        <div className='col-md-4 col-lg-4' style={{ height: "290px", overflow: "hidden" }}>
                            {/* <h1 className='chart-heading-batchwise' >Overall Students</h1> */}
                            <div className='table-bordered ' style={{ display: "flex", gap: "10px", alignItems: "center", height: "280px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>

                                <div className="img">
                                    <img src={student_logo} alt="" style={{ width: "140px", padding: "5px" }} />
                                </div>
                                <div style={{ width: "1px", height: "260px", backgroundColor: "black" }}></div>
                                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                    <h3>Total Count</h3>
                                    <hr />
                                    <p>{overallStudent}</p>

                                </div>

                            </div>

                        </div>
                        <div className='col-md-4 col-lg-4' style={{ height: "340px", overflow: "hidden", }}>
                            {/* <h1 className='chart-heading-batchwise' >Dropped out students</h1> */}
                            <div className='table-bordered ' style={{ display: "flex", gap: "10px", alignItems: "center", height: "280px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>

                                <div className="img">
                                    <img src={student_logo} alt="" style={{ width: "140px", padding: "5px" }} />
                                </div>
                                <div style={{ width: "1px", height: "260px", backgroundColor: "black" }}></div>
                                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                    <h3>Dropped out</h3>
                                    <hr />
                                    {/* <p>{overallStudent}</p> */}
                                    <p>N/A</p>

                                </div>

                            </div>

                        </div>
                        <div className='col-md-4 col-lg-4' style={{ height: "340px", overflow: "hidden", }}>
                            {/* <h1 className='chart-heading-batchwise' >Graduated Students</h1> */}
                            <div className='table-bordered ' style={{ display: "flex", gap: "10px", alignItems: "center", height: "280px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>

                                <div className="img">
                                    <img src={student_logo} alt="" style={{ width: "140px", padding: "5px" }} />
                                </div>
                                <div style={{ width: "1px", height: "260px", backgroundColor: "black" }}></div>
                                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                    <h3>Graduated</h3>
                                    <hr />
                                    <p>{graduateStudentCount}</p>

                                </div>

                            </div>

                        </div>

                    </div>
                    <div className="row mb-2" >
                        <div className='col-md-4 col-lg-4' style={{ height: "340px", overflow: "hidden", }}>
                            {/* <h1 className='chart-heading-batchwise' >Ongoing students</h1> */}
                            <div className='table-bordered ' style={{ display: "flex", gap: "10px", alignItems: "center", height: "280px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>

                                <div className="img">
                                    <img src={student_logo} alt="" style={{ width: "140px", padding: "5px" }} />
                                </div>
                                <div style={{ width: "1px", height: "260px", backgroundColor: "black" }}></div>
                                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                    <h3>Ongoing</h3>
                                    <hr />
                                    <p>{ongoingStudentCount}</p>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-4 col-lg-4' style={{ height: "340px", overflow: "hidden", }}>
                            {/* <h1 className='chart-heading-batchwise' > Batch change students</h1> */}
                            <div className='table-bordered ' style={{ display: "flex", gap: "10px", alignItems: "center", height: "280px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>

                                <div className="img">
                                    <img src={student_logo} alt="" style={{ width: "140px", padding: "5px" }} />
                                </div>
                                <div style={{ width: "1px", height: "260px", backgroundColor: "black" }}></div>
                                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                    <h3>Batch change students</h3>
                                    <hr />
                                    <p>N/A</p>

                                </div>

                            </div>

                        </div>
                        <div className='col-md-4 col-lg-4' style={{ height: "340px", overflow: "hidden", }}>
                            {/* <h1 className='chart-heading-batchwise' >batch yet to be started</h1> */}
                            <div className='table-bordered ' style={{ display: "flex", gap: "10px", alignItems: "center", height: "280px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>

                                <div className="img">
                                    <img src={student_logo} alt="" style={{ width: "140px", padding: "5px" }} />
                                </div>
                                <div style={{ width: "1px", height: "260px", backgroundColor: "black" }}></div>
                                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                    <h3>Batch yet to be started</h3>
                                    <hr />
                                    <p>{yetToBeStarted}</p>

                                </div>

                            </div>

                        </div>

                    </div>
                    {/* 
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className='chart-heading-batchwise' >Students details</h1>
                            <div className='table-bordered ' style={{ display: "flex", gap: "10px", alignItems: "center", height: "280px" }}>

                                <div className="img">
                                    <img src={student_logo} alt="" style={{ width: "140px", padding: "5px" }} />
                                </div>
                                <div style={{ width: "1px", height: "260px", backgroundColor: "black" }}></div>
                                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                    <h3>Overall</h3>
                                    <hr />
                                    <p>{overallStudent}</p>

                                </div>
                                <div style={{ width: "1px", height: "260px", backgroundColor: "black" }}></div>
                                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                    <h3>Dropped out</h3>
                                    <hr />
                                    <p>{overallStudent}</p>
                                </div>
                                <div style={{ width: "1px", height: "260px", backgroundColor: "black" }}></div>
                                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                    <h3>Graduated</h3>
                                    <hr />
                                    <p>{graduateStudentCount}</p>
                                </div>
                                <div style={{ width: "1px", height: "260px", backgroundColor: "black" }}></div>
                                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                    <h3>Ongoing</h3>
                                    <hr />
                                    <p>{overallStudent}</p>
                                </div>
                                <div style={{ width: "1px", height: "260px", backgroundColor: "black" }}></div>
                                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                    <h3>Batch change</h3>
                                    <hr />
                                    <p>{overallStudent}</p>
                                </div>
                                <div style={{ width: "1px", height: "260px", backgroundColor: "black" }}></div>
                                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                    <h3>batch yet to be started</h3>
                                    <hr />
                                    <p>{overallStudent}</p>
                                </div>
                                <div style={{ width: "1px", height: "260px", backgroundColor: "black" }}></div>
                            </div>
                         
                        </div>
                    </div> */}

                    <div className="row">
                        <div className='col-md-6 col-lg-6 col-sm-6' style={{ marginBottom: "100px" }}>
                            <h1 className='chart-heading-batchwise' >Course wise Students </h1>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <div style={{ display: 'flex', marginTop: "6px", justifyContent: "space-between" }}>
                                    <DatePicker
                                        label="Start Date"
                                        value={startDate}
                                        onChange={(newValue) => setStartDate(newValue)}
                                    />
                                    <div>
                                        <DatePicker
                                            label="End Date"
                                            value={endDate}
                                            onChange={(newValue) => setEndDate(newValue)}
                                        />
                                        {/* <Button variant="contained" style={{fontSize:"8px"}} onClick={()=>setForThebuttonClick(true)}>Throught the year</Button> */}
                                        <Button variant="contained" style={{ fontSize: "8px", width: "80px", height: "40px" }} onClick={() => setCourseWiseSearch(true)}>Search</Button>
                                    </div>
                                </div>
                            </LocalizationProvider>
                            <Column_Chart_course_wise_students setCourseWiseSearch={setCourseWiseSearch} startDate={formatDate(startDate)} endDate={formatDate(endDate)} courseWiseSearch={courseWiseSearch} />


                        </div>
                        <div className='col-md-6 col-lg-6 col-sm-6'>
                            <h1 className='chart-heading-batchwise' >Batchwise Students</h1>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <div style={{ display: 'flex', marginTop: "6px", justifyContent: "space-between" }}>
                                    <DatePicker
                                        label="Start Date"
                                        value={startDateBatchwise}
                                        onChange={(newValue) => setStartDateBatchwise(newValue)}
                                    />
                                    <div>
                                        <DatePicker
                                            label="End Date"
                                            value={endDateBatchwise}
                                            onChange={(newValue) => setEndDateBatchwise(newValue)}
                                        />
                                        {/* <Button variant="contained" style={{fontSize:"8px"}} onClick={()=>setForThebuttonClickBatchwise(true)}>Throught the year</Button> */}
                                        <Button variant="contained" style={{ fontSize: "8px", width: "80px", height: "40px" }} onClick={() => setBatchWiseSearch(true)}>Search</Button>

                                    </div>
                                </div>
                            </LocalizationProvider>
                            <Column_Chart_batch_wise_students setBatchWiseSearch={setBatchWiseSearch} batchWiseSearch={batchWiseSearch} startDateBatchwise={formatDate(startDateBatchwise)} endDateBatchwise={endDateBatchwise} />
                        </div>
                    </div>


                    <div className="row">
                        <div className='col-md-6 col-lg-6 col-sm-6' style={{ paddingRight: '0px', paddingLeft: '5px' }}>
                            <div style={{ height: "350px", overflow: "scroll" }}>
                                <div className='chart-heading-batchwise' style={{ display: "flex", justifyContent: "space-between", fontSize: "15px" }}>Top 5 students
                                    <select name="" id="" onChange={handleTopFive} style={{ color: "black" }}>
                                        <option value="">Please Select Course</option>
                                        {courseList && courseList?.map((courseList) => {
                                            return (
                                                <option value={courseList?.courseName}>{courseList?.courseName}</option>

                                            )

                                        })}
                                    </select>



                                    <select name="" id="" onChange={handleTopFiveBatch} style={{ color: "black" }}>
                                        <option value="">Please Select Batch</option>
                                        {batchList && batchList?.map((batchList) => {
                                            return (
                                                <option value={batchList?.batchName}>{batchList?.batchName}</option>

                                            )

                                        })}
                                    </select>

                                </div>

                                <table className="table table-bordered ">
                                    <thead style={{ position: "sticky", top: 0, zIndex: 3 }}>
                                        <tr>
                                            <th >Student Name</th>
                                            <th >Batch Name</th>
                                            <th>Average Attendance</th>
                                            <th>Average Assignment Marks</th>
                                            <th>Overall Score</th>

                                        </tr>
                                    </thead>

                                    <tbody style={{ zIndex: '1' }}>
                                        {Array.isArray(topFiveStudents) && topFiveStudents.length > 0 &&
                                            topFiveStudents.map((topFive, index) => (
                                                <tr key={index}>
                                                    <td>{topFive?.userName}</td>
                                                    <td>{topFive?.batchName}</td>
                                                    <td>{topFive?.averageAssignmentMarks}</td>
                                                    <td>{topFive?.attendanceAverage}</td>
                                                    <td>{topFive?.overallScore}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>

                        </div>

                        <div className='col-md-6 col-lg-6' style={{ paddingRight: '0px', paddingLeft: '5px' }}>
                            <div style={{ height: "350px", overflow: "scroll" }}>
                                <div className='chart-heading-batchwise' style={{ display: "flex", justifyContent: "space-between", fontSize: "15px" }}>Bottom 5 students
                                    <select name="" id="" onChange={handleBottomFive} style={{ color: "black" }}>
                                        <option value="">Please Select Course</option>
                                        {courseList && courseList?.map((courseList) => {
                                            return (
                                                <option value={courseList?.courseName}>{courseList?.courseName}</option>

                                            )

                                        })}
                                    </select>
                                    <select name="" id="" onChange={handleBotttomFiveBatch} style={{ color: "black" }}>
                                        <option value="">Please Select Batch</option>
                                        {batchList && batchList?.map((batchList) => {
                                            return (
                                                <option value={batchList?.batchName}>{batchList?.batchName}</option>

                                            )

                                        })}
                                    </select>
                                </div>
                                <table className="table table-bordered ">
                                    <thead style={{ position: "sticky", top: 0, zIndex: 3 }}>
                                        <tr>
                                            <th >Student Name</th>
                                            <th >Batch Name</th>
                                            <th>Average Attendance</th>
                                            <th>Average Assignment Marks</th>
                                            <th>Overall Score</th>
                                        </tr>
                                    </thead>
                                    <tbody style={{ zIndex: '1' }}>
                                        {Array.isArray(bottomFiveStudents) && bottomFiveStudents.length > 0 &&
                                            bottomFiveStudents.map((topFive, index) => (
                                                <tr key={index}>
                                                    <td>{topFive?.userName}</td>
                                                    <td>{topFive?.batchName}</td>
                                                    <td>{topFive?.attendanceAverage}</td>
                                                    <td>{topFive?.averageAssignmentMarks}</td>
                                                    <td>{topFive?.overallScore}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Mentor_Students_Dashboard