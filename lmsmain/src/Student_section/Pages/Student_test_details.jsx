import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { api } from '../../ApiUrl/ApiUrl';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useParams } from "react-router-dom";
import queryString from 'query-string';

const Student_test_details = () => {
  const [questions,setQuestions] = useState()
  const { id } = useParams();
  const [studentEmail,setStudentEmail] = useState();
  const [firstName,setFirstName] = useState();
  const [lastName,setLastName] = useState();
  
 useEffect(()=>{
  setStudentEmail(localStorage.getItem('studentEmail'))
  setFirstName(localStorage.getItem('firstName'))
  setLastName(localStorage.getItem('lastName'))
 },[])

 useEffect(()=>{
      
 },[])


  const updateStatus = ()=>{
      axios.post(`${api}/student/updateTestStatus`,{email:studentEmail,testName: questions?.testName })
      .then((Response)=>{
         console.log(Response);
      })
      .catch((error)=>{

      })
  }

  const handleRedirect = () => {
     updateStatus()


    const queryParams = queryString.stringify({
      testName: questions?.testName,
      totalTime: questions?.totalTime,
      totalMarks: questions?.totalMarks,
      startTime: questions?.startTime,
      updQesAndMarks: questions?.updQesAndMarks,
      uploadFileDes: questions?.uploadFileDes,
      email: studentEmail,
      firstName:firstName,
      lastName:lastName,
      batchName:questions?.batchName,
      id:questions?.id
    });

    const element = document.documentElement;
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
  
    // window.location.href = `http://13.200.24.255:3002/?${queryParams}`;
    
    window.location.href = `https://lms.technostructacademy.com/test/?${queryParams}`;
  };



  const getQuestions =()=>{
        axios.post(`${api}/mentor/getQuestionById`,{id:id,email:studentEmail})
        .then((response)=>{
             console.log("response : ",response?.data?.tests[0]);
            //  console.log("batchNAme",JSON.parse(response?.data?.tests[0].batchName));
             setQuestions(response?.data?.tests[0])
        })
        .catch((error)=>{
           console.log(error); 
        })
  }

  useEffect(()=>{
    if(studentEmail){
      getQuestions()
    }
  },[studentEmail])


  return (
    <div style={{ marginTop: '58px' }}>
      <div className='container-fluid'>
        <div className='col-md-12 col-lg-12 headLineBox d-flex justify-content-start'>
          <h4>Test Details</h4>
        </div>
        <div>
          <div className="col-md-12 col-lg-12 col-sm-12">
            <div className="table-container" style={{ height: '90vh', overflowY: 'auto',display:"flex", flexDirection:"column",margin:"5  0px" }}>
              <div>
                  <div>Test Name : {questions?.testName}</div>
                  <hr />
                  <div>Duration : {questions?.totalTime}</div>
                  <hr />
                  <div>Total Marks : {questions?.totalMarks}</div>
                  <hr />
                  <div>Start Time : {questions?.startTime}</div>
                  <hr />
              </div>
              <div>
                   <h5>General Instructions :</h5>
                   <hr />
              </div>
              
              <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
              {questions?.test_allowed === true ? <Button onClick={handleRedirect} style={{paddingTop:"20px",paddingBottom:"20px"}} variant="contained">Click here to start Test  <PlayArrowIcon/></Button> : <p>You have already given the test</p> }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Student_test_details