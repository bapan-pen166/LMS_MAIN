import React from "react";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import Students_onboarded from "../components/overview/Sudents_onboard";
import Top_course from "../components/overview/Top_course";
import '../assets/css/Overview/Overview.css'
import "../assets/css/Utility/utilityColor.css"

import PageNotFound from "../ErrorPage/PageNotFound.jsx"
import axios from "axios";
import { api } from "../ApiUrl/ApiUrl.jsx";
import dayjs from 'dayjs';


function Overview() {
    const [userType, setUserType] = useState('');
    const [isLoading, setIsLoading] = useState(true); 
    const [studentFeedbackData,setStudentFeedbackData] = useState();
    const [topInstuctors,setTopInstuctors] = useState();


    const getStudentFeedback = ()=>{
        axios.get(`${api}/student/getFeedbackWithSentiment`)
        .then((Response)=>{
            console.log("Student feedback : ",Response?.data?.data);
            setStudentFeedbackData(Response?.data?.data)
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    useEffect(()=>{
           getStudentFeedback();
    },[])

    useEffect(() => {
        const type = localStorage.getItem('userType');
        setUserType(type);
        setIsLoading(false); 
    }, []);


    const getTopInstructors = ()=>{
        axios.get(`${api}/student/getTopInstructors`)
        .then((Response)=>{
                console.log("get top instructors :::  ",Response?.data?.data);
                setTopInstuctors(Response?.data?.data)
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    useEffect(()=>{
          getTopInstructors()
    },[])


    if (isLoading) {
        return <div>Loading...</div>; 
    }

    if (userType !== 'Admin') {
        return <PageNotFound/>
    }

    return (
        <>
            {/* <h1>This is overview page</h1> */}
            {/* content body  */}
            <div className='row content-body g-3' style={{backgroundColor:"#f2edf3"}}>
                {/* <div className='row '>
                    <div className='container-fluid'>
                       
                        <div className=' col-md-12 col-lg-12  headLineBox d-flex justify-content-start' >
                            <h4>Overview</h4>
                        </div>

                    </div>
                </div> */}
                <div className='container-fluid'>
                    <div className='row '>
                        <div className='col-sm-12 col-md-4 col-lg-4 mt-2'>
                            <div className="content-box max-height-300">
                                {/* <h6 class="box-heading">Urgent Reminder</h6> */}
                                <div className="d-flex flex-wrap justify-content-between m-2">
                                    <div className="flex-grow-1">
                                        <h6 className="box-heading text-left"><b>Urgent Reminder</b></h6>
                                    </div>
                                    {/* <div>
                                        <Link to={'test'}>
                                            <button type="button" className="btn btn-warning background_color"><b>View</b></button>
                                        </Link>
                                    </div> */}
                                </div>

                                <table className="table table-bordered " >
                                    <thead>
                                        <tr>
                                            <th>Status</th>
                                            {/* <th>Lastname</th> */}
                                            <th>Reminder</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Urgent</td>
                                            {/* <td>Doe</td> */}
                                            <td>Fees are not recieved from 200 students</td>
                                        </tr>
                                        <tr>
                                            <td>Medium</td>
                                            {/* <td>Moe</td> */}
                                            <td>25 support request are pending from last 25 days</td>
                                        </tr>
                                        <tr>
                                            <td>Low</td>
                                            {/* <td>Dooley</td> */}
                                            <td>Mentor leave request pending from past 3 days</td>
                                        </tr>
                                        <tr>
                                            <td>Low</td>
                                            {/* <td>Dooley</td> */}
                                            <td>Mentor leave request pending from past 3 days</td>
                                        </tr>
                                        <tr>
                                            <td>Low</td>
                                            {/* <td>Dooley</td> */}
                                            <td>Mentor leave request pending from past 3 days</td>
                                        </tr>
                                        <tr>
                                            <td>Low</td>
                                            {/* <td>Dooley</td> */}
                                            <td>Mentor leave request pending from past 3 days</td>
                                        </tr>
                                        <tr>
                                            <td>Low</td>
                                            {/* <td>Dooley</td> */}
                                            <td>Mentor leave request pending from past 3 days</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className=' col-md-8 col-lg-8 col-sm-12 mt-2'>
                            {/* <div className="row ">
                                <div className="col-md-8 mt-2 mb-2">
                                    <h6 class="box-heading" style={{textAlign:'left'}}><b>Stulents Onboard</b> </h6>
                                </div>
                                <div className="col-md-4 mt-2 mb-2 justify-content-end">
                                    <button type="button" class="btn btn-warning flex-end"><b>View</b></button>
                                </div>

                            </div> */}
                            <div className="content-box max-height-300 text-center">
                                <Students_onboarded />
                            </div>
                            {/* <div className="row">
                                <div className="col-md-3">
                                    <div className="col-md-12 p-2 mb-1" style={{background: 'linear-gradient(45deg, #b4e391 0%,#b4e391 64%,#61c419 79%)'}}>
                                        <h5>6</h5>
                                        <h5>+50%</h5>
                                        This Week
                                    </div>
                                    <div className="col-md 12 p-2" style={{background: ' linear-gradient(45deg, #f16f5c 54%,#e73827 100%)'}}>
                                        <h5>6</h5>
                                        <h5>-50%</h5>
                                        This month
                                    </div>
                                </div>
                                <div className="col-md-9">

                               
                                    <table className="table table-striped">
                                        <thead>
                                        <tr>
                                            <th>Firstname</th>
                                            <th>Lastname</th>
                                            <th>Email</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>John</td>
                                            <td>Doe</td>
                                            <td>john@example.com</td>
                                        </tr>
                                        <tr>
                                            <td>Mary</td>
                                            <td>Moe</td>
                                            <td>mary@example.com</td>
                                        </tr>
                                        <tr>
                                            <td>July</td>
                                            <td>Dooley</td>
                                            <td>july@example.com</td>
                                        </tr>
                                        </tbody>
                                    </table>
                            </div>
                            </div> */}
                        </div>
                    </div>
                    <div className='row '>
                        <div className='col-md-4 mt-2 col-sm-12'>
                            {/* <h6 class="box-heading">Urgent Reminder</h6>  */}
                            <div className="content-box max-height-300">
                                <Top_course />

                            </div>
                            {/* <div className="row ">
                                 
                                 <div className="col-md-8 mt-2 mb-2"> 
                                    <h6 class="box-heading" style={{textAlign:'left'}}> <b>Top Courses</b> </h6>
                                </div>
                                <div className=" col-md-4 mt-2 mb-2 justify-content-end">
                                    <button type="button" class="btn btn-warning flex-end"><b>View</b></button>
                                </div> 

                            </div>
                            <table className="table table-striped" >
                                
                                <tbody>
                                <tr>
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
                                </tr>
                                </tbody>
                            </table> */}
                        </div>
                        <div className=' col-md-8 col-sm-12 mt-2'>
                            <div className="content-box max-height-300">
                                <div className="d-flex justify-content-between align-items-center m-2">
                                    <div className="flex-grow-1">
                                        <h6 className="box-heading text-left"><b>Students Feedback</b></h6>
                                    </div>
                                    <div>
                                        {/* <button type="button" className="btn btn-warning background_color"><b>View</b></button> */}
                                    </div>
                                </div>
                                <div className="scroll-y" style={{height:"300px",overflow:"auto"}}>
                                    <table className="table table-striped scroll-y" >
                                        <thead>
                                            <tr>
                                                {/* <th>Student ID</th> */}
                                                <th>Date</th>
                                                <th>Student Name</th>
                                                <th>Mentor</th>
                                                <th>Batch Name</th>
                                                {/* <th>Batch channel</th> */}
                                                <th>Feedback</th>
                                                <th>Sentiment</th>
                                              
                                            </tr>
                                        </thead>
                                        <tbody style={{overflow:"auto"}}>
                                            {studentFeedbackData?.map((studentFeedback)=>{
                                                return(
                                                    <tr>
                                                        {/* <td>{studentFeedback?.studentUserId}</td> */}
                                                        <td>{dayjs(studentFeedback?.LeftAt.replace('-', ' '), 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD')}</td>
                                                        <td>{studentFeedback?.StudentName}</td>
                                                        <td>{studentFeedback?.mentor}</td>
                                                        <td>{studentFeedback?.BatchName}</td>
                                                        <td>{studentFeedback?.feedbackComment}</td>
                                                        <td>{studentFeedback?.sentimentAnalyzed}</td>
                                                        
                                                    </tr>
                                                )
                                            })}
                                            
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex flex-wrap justify-content-between mt-2 mb-2">
                        <div className="col-md-4 mt-2 me-1 col-sm-12">
                            <div className="content-box max-height-300">
                                <div className="d-flex justify-content-between align-items-center m-2">
                                    <div className="flex-grow-1">
                                        <h6 className="box-heading text-left "><b>Top Instructors</b></h6>
                                    </div>
                                    <div>
                                        {/* <button type="button" className="btn btn-warning background_color"><b>View</b></button> */}
                                    </div>
                                </div>
                                <div className="scroll-y" style={{height:"300px",overflow:"auto"}}>
                                    <table className="table table-striped scroll-y" >
                                        <thead>
                                            <tr>
                                                <th>Mentor Name</th>
                                                <th>Average Feedback</th>
                                                <th>Positive Feedback</th>
                                            </tr>
                                        </thead>
                                        <tbody style={{overflow:"auto"}}>
                                            {topInstuctors?.map((topInstuctors)=>{
                                                return(
                                                    <tr>
                                                        
                                                        <td>{topInstuctors?.mentorName}</td>
                                                        <td>{topInstuctors?.averageFeedbackRating}</td>
                                                        <td>{topInstuctors?.positiveFeedbackCount}</td>
                                                        
                                                    </tr>
                                                )
                                            })}
                                            
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8 mt-2 ms-5 col-sm-12">
                            <div className="content-box max-height-300">
                                <div className="d-flex justify-content-between align-items-center m-2">
                                    <div className="flex-grow-1">
                                        <h6 className="box-heading text-left"><b>Support Request</b></h6>
                                    </div>
                                    <div>
                                        {/* <button type="button" className="btn btn-warning background_color"><b>View</b></button> */}
                                    </div>
                                </div>
                                <table className="table table-striped">
                                    <tbody>
                                        <tr>
                                            <td>Anish Chopra</td>
                                            <td>Fees Refund is pending from 90 days</td>
                                            <td>5 mins ago</td>
                                        </tr>
                                        <tr>
                                            <td>Arpan Das</td>
                                            <td>Instructor is not at all good</td>
                                            <td>10 min ago</td>
                                        </tr>
                                        <tr>
                                            <td>Ayan Roy</td>
                                            <td>Placement related enquiry</td>
                                            <td>1 day ago</td>
                                        </tr>
                                        <tr>
                                            <td>Ayan Roy</td>
                                            <td>Placement related enquiry</td>
                                            <td>1 day ago</td>
                                        </tr>
                                        <tr>
                                            <td>Ayan Roy</td>
                                            <td>Placement related enquiry</td>
                                            <td>1 day ago</td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* <Students_onboarded/> */}

                </div>



            </div>
        </>
    )
}
export default Overview;