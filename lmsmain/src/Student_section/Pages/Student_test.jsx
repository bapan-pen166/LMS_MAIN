import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { api } from '../../ApiUrl/ApiUrl';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import "../../assets/css/TableStyle/TableStyle.css";

const Student_test = () => {
  const [allTestData, setAllTestData] = useState([]);
  const [mentorEmail, setMentorEmail] = useState('');

  useEffect(() => {
    setMentorEmail(localStorage.getItem('studentEmail'));
  }, []);

  const getAllTestData = () => {
    axios.post(`${api}/student/getStudTests`, { email: mentorEmail })
      .then((response) => {
        console.log("data,", response.data.data);
        setAllTestData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    if (mentorEmail) {
      getAllTestData();
    }
  }, [mentorEmail]);

  const getTestStatus = (startDate, startTime, endDate, endTime) => {
    // Parse the dates and times into valid Date objects
    const currentTime = new Date();
    const testStart = new Date(`${startDate}T${startTime}:00`); // Added "T" for proper ISO format
    const testEnd = new Date(`${endDate}T${endTime}:00`);
  
    // Compare the current time with the test start and end times
    console.log("currentTime",currentTime)
    console.log("testStart",testStart)
    if (currentTime < testStart) {
      return "notStarted";
    } else if (currentTime >= testStart && currentTime <= testEnd) {
      return "inProgress";
    } else {
      return "ended";
    }
  };

  

  return (
    <div style={{ marginTop: '58px', backgroundColor: "#f2edf3",height:"calc(100vh - 58px)" }}>
      <div className='container-fluid'>
        {/* <div className='col-md-12 col-lg-12 headLineBox d-flex justify-content-start'>
          <h4>Scheduled test</h4>
        </div> */}
        <div className="col-md-12 col-lg-12 col-sm-12 " >
          <div className="table-container mt-4 custom-table-container" style={{ height: '90vh', overflowY: 'auto' }}>
            <table className="custom-table table-bordered pt-1" style={{marginTop:"20px"}}>
              <thead className="custom-thead" style={{ position: 'sticky', top: -2, zIndex: 3 }}>
                <tr>
                  <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Test Name</th>
                  <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Start Date</th>
                  <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>End Date</th>
                  <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Start Time</th>
                  <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>End time</th>
                  <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Total Time</th>
                  <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Marks</th>
                  <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Marks obtained</th>
                  <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Action</th>
                </tr>
              </thead>
              <tbody style={{ zIndex: 1 }} className="custom-tbody">
                {allTestData.map(testDetails => {
                  const { testName, startDate, startTime, endDate, endTime, totalTime,id,test_allowed } = testDetails;
                  const testStatus = getTestStatus(startDate, startTime, endDate, endTime);
                  const testStartTime = new Date(`${startDate} ${startTime}`).toLocaleString();

                  return (
                    <tr key={testName}>
                      <td>{testName}</td>
                      <td>{startDate}</td>
                      <td>{endDate}</td>
                      <td>{startTime}</td>
                      <td>{endTime}</td>
                      <td>{totalTime}</td>
                      <td></td>
                      <td></td>

                      <td className="text-center align-middle">
                        {testStatus === "notStarted" ? (
                          <p>You can open the test after {testStartTime}</p>
                        ) : (
                          <p>
                            {test_allowed === true ? <Button  variant="text" disabled={testStatus === "ended"}>
                              <Link to={`/student-test-details/${id}`}>
                              Start test
                              </Link>
                            </Button> : <p>You have already given the test</p> }
                          </p>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Student_test;
