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
import student_dropouts from "../assets/img/Admin_student_dashboard/student-dropouts.png"
import graduated_students from "../assets/img/Admin_student_dashboard/graduated.png"
import batch_icon from "../assets/img/Admin_student_dashboard/courses.png"
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dayjs from 'dayjs';
import { faIdBadge, faBookOpen, faUserGraduate, faPeopleGroup, faSearch, faUserCheck, faCalendar } from '@fortawesome/free-solid-svg-icons';


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
    const [batchchangeStudCount,setBatchChangeStudCount]=useState();


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

    const getDropOutStudentDetails = () => {
        axios.get(`${api}/dashboard/getDropoutStudentCount`)
            .then((Response) => {
                console.log("getDropoutStudentCount :::::", Response?.data);
                // setGraduateStudentCount(Response?.data?.graduated_count)
                setDropoutstd(Response?.data?.result);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const getBatchChangeDetails = () => {
        axios.get(`${api}/dashboard/getBatchChangedStudentCount`)
            .then((Response) => {
                console.log("getDropoutStudentCount :::::", Response?.data);
                // setGraduateStudentCount(Response?.data?.graduated_count)
                setBatchChangeStudCount(Response?.data?.result);
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
        getBatchChangeDetails()
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
            <div className="row">
                <div class="pb-2 border-bottom rounded-lg d-flex justify-content-between align-items-center"><h5 class="card-header-title ml-3">Student count details</h5></div>
                <div className="container-fluid">
                    {/* <div className=' col-md-12 col-lg-12  headLineBox d-flex justify-content-start' >
                        <h4>Students Dashboard</h4>
                    </div> */}

                    <div className="row mt-1" >
                    
                        <div className="col-md-4 col-lg-4 col-sm-12">
                            <div className="card mb-1">
                                <div className="d-flex justify-content-between align-items-center p-3 box-border-light hover-effect bg-opacity-15 rounded-3 " >
                                <span style={{color:"#185055"}}>
                                    <FontAwesomeIcon style={{ fontSize: "5vw" }} icon={faPeopleGroup} />
                                </span>
                                <div className="ms-4">
                                    <h5 className="purecounter fw-bold pb-2" style={{ fontSize: "2vw" }}>{overallStudent}</h5>
                                    <p className="mb-0 h6 fw-light">Total Count</p>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-lg-4 col-sm-12">
                            <div className="card mb-1">
                                <div className="d-flex justify-content-between align-items-center p-3 box-border-light hover-effect bg-opacity-15 rounded-3 " >
                                <span className="">
                                    <img src={student_dropouts} alt="" style={{width: '90px'}}/>
                                </span>
                                <div className="ms-4">
                                    <h5 className="purecounter fw-bold pb-2" style={{ fontSize: "2vw" }}>{dropoutstd}</h5>
                                    <p className="mb-0 h6 fw-light">Dropped out</p>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-lg-4 col-sm-12">
                            <div className="card mb-1">
                                <div className="d-flex justify-content-between align-items-center p-3 box-border-light hover-effect bg-opacity-15 rounded-3 " >
                                <span className="">
                                    <img src={graduated_students} alt="" style={{width: '70px'}}/>
                                </span>
                                <div className="ms-4">
                                    <h5 className="purecounter fw-bold pb-2" style={{ fontSize: "2vw" }}>{graduateStudentCount}</h5>
                                    <p className="mb-0 h6 fw-light">Graduated</p>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-2" >

                        <div className="col-md-4 col-lg-4 col-sm-12">
                            <div className="card mb-1">
                                <div className="d-flex justify-content-between align-items-center p-3 box-border-light hover-effect bg-opacity-15 rounded-3 " >
                                <span className="">
                                    <FontAwesomeIcon style={{ fontSize: "5vw" }} icon={faBookOpen} />
                                </span>
                                <div className="ms-4">
                                    <h5 className="purecounter fw-bold pb-2" style={{ fontSize: "2vw" }}>{ongoingStudentCount}</h5>
                                    <p className="mb-0 h6 fw-light">Ongoing</p>
                                </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 col-lg-4 col-sm-12">
                            <div className="card mb-1">
                                <div className="d-flex justify-content-between align-items-center p-3 box-border-light hover-effect bg-opacity-15 rounded-3 " >
                                <span className="">
                                    <FontAwesomeIcon style={{ fontSize: "5vw" }} icon={faPeopleGroup} />
                                </span>
                                <div className="ms-4">
                                    <h5 className="purecounter fw-bold pb-2" style={{ fontSize: "2vw" }}>{batchchangeStudCount}</h5>
                                    <p className="mb-0 h6 fw-light">Batch change students</p>
                                </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 col-lg-4 col-sm-12">
                            <div className="card mb-1">
                                <div className="d-flex justify-content-between align-items-center p-3 box-border-light hover-effect bg-opacity-15 rounded-3 " >
                                <span className="">
                                    <img src={batch_icon} alt="" style={{width:'70px'}}/>
                                </span>
                                <div className="ms-4">
                                    <h5 className="purecounter fw-bold pb-2" style={{ fontSize: "2vw" }}>{yetToBeStarted}</h5>
                                    <p className="mb-0 h6 fw-light">Batch yet to be started</p>
                                </div>
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

                    <div className="row mt-5">
                        <div className='col-md-6 col-lg-6 col-sm-6 px-2' style={{ marginBottom: "100px" }}>
                            <div className="card box-shadow">
                                <div class="py-2 border-bottom rounded-lg d-flex justify-content-between align-items-center"><h5 class="card-header-title ml-3">Course wise Students </h5></div>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>

                                    <div className="row mt-2">
                                        <div className="col-lg-5">
                                            <DatePicker
                                                label="Start Date"
                                                value={startDate}
                                                onChange={(newValue) => setStartDate(newValue)}
                                            />
                                        </div>
                                        <div className="col-lg-5">
                                            <DatePicker
                                                label="End Date"
                                                value={endDate}
                                                onChange={(newValue) => setEndDate(newValue)}
                                            />
                                        </div>
                                        <div className="col-lg-2 px-0 d-flex justify-content-center align-items-center">
                                            <button className='btn btn-custom px-1 py-1 font-11'  onClick={() => setCourseWiseSearch(true)}>
                                                <FontAwesomeIcon icon={faSearch} className='mr-1 p-0' />
                                            Search
                                            </button>
                                        </div>
                                    </div>
                                </LocalizationProvider>
                                <Column_Chart_course_wise_students setCourseWiseSearch={setCourseWiseSearch} startDate={formatDate(startDate)} endDate={formatDate(endDate)} courseWiseSearch={courseWiseSearch} />
                            </div>
                        </div>
                        <div className='col-md-6 col-lg-6 col-sm-6  px-2'>
                                <div className="card box-shadow">
                                    <div class="py-2 border-bottom rounded-lg d-flex justify-content-between align-items-center"><h5 class="card-header-title ml-3">Batch wise Students </h5></div>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>

                                    <div className="row mt-2 px-3">
                                        <div className="col-lg-5">
                                            <DatePicker
                                                label="Start Date"
                                                value={startDateBatchwise}
                                                onChange={(newValue) => setStartDateBatchwise(newValue)}
                                            />
                                        </div>
                                        <div className="col-lg-5">
                                            <DatePicker
                                                label="End Date"
                                                value={endDateBatchwise}
                                                onChange={(newValue) => setEndDateBatchwise(newValue)}
                                            />
                                        </div>
                                        <div className="col-lg-2 px-0 d-flex justify-content-center align-items-center">
                                        <button className='btn btn-custom px-1 py-1 font-11'  onClick={() => setBatchWiseSearch(true)}>
                                                <FontAwesomeIcon icon={faSearch} className='mr-1 p-0' />
                                            Search
                                            </button>
                                        </div>
                                    </div>
                                    </LocalizationProvider>
                                </div>
                            <Column_Chart_batch_wise_students setBatchWiseSearch={setBatchWiseSearch} batchWiseSearch={batchWiseSearch} startDateBatchwise={formatDate(startDateBatchwise)} endDateBatchwise={endDateBatchwise} />
                        </div>
                    </div>


                    <div className="row">
                        <div className='col-md-12 col-lg-12 col-sm-12' style={{ paddingRight: '0px', paddingLeft: '5px' }}>
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

                        <div className='col-md-12 col-lg-12' style={{ paddingRight: '0px', paddingLeft: '5px' }}>
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
    )
}

export default Mentor_Students_Dashboard