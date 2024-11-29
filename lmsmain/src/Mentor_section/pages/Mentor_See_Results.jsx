import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { api } from '../../ApiUrl/ApiUrl';
import { CiSearch } from "react-icons/ci";

const Mentor_See_Results = () => {
  const [seeAllResults, setSeeAllResults] = useState();
  const [menotorMail, setMenotorMail] = useState();


  // For the search 
  const [searchres, setSearchres] = useState();
  const [searchquery, setSearchquery] = useState('');


  useEffect(() => {
    setMenotorMail(localStorage.getItem('mentorEmail'))
  }, [])

  const getAllResults = () => {
    axios.post(`${api}/mentor/getBatchStudentTests`, { email: menotorMail })
      .then((Response) => {
        console.log("cool data result", Response?.data?.data);
        setSeeAllResults(Response?.data?.data)
        setSearchres(Response?.data?.data)
      })
      .catch((error) => {
        console.log(error);
      })
  }

  useEffect(() => {
    getAllResults();
  }, [menotorMail])



  return (
    <div >
      <div className="row">
        <div className="container-fluid">
          <div className='col-md-12 col-lg-12 d-flex justify-content-start'>
            <h4>Test Results</h4>
          </div>
          {/* Main body */}
          <div className='container-fluid pr-2 pl-2' >
         
              <div className="p-0 custom-table-container" style={{paddingTop:"0px", height: '400px', overflowY: 'auto'}}>
                <table className="table-bordered custom-table ">
                  <thead className="custom-thead" style={{ position: 'sticky', top: -2, zIndex: 3,fontSize:"1vw" }}>
                    <tr>

                      <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Student Name</th>
                      <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Email</th>
                      <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Test Name</th>
                      <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Batch</th>
                      <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Total Marks</th>
                      <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Passing Marks</th>
                      <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Marks Obtained</th>
                      <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Pass/ Fail</th>

                    </tr>
                  </thead>
                  <tbody style={{ zIndex: 1 }} className="custom-tbody ">
                    {seeAllResults && seeAllResults.map((seeAllResults, index) => {
                      return (
                        <>

                          {seeAllResults.tests.map((test) => {
                            return (
                              <tr style={{fontSize:"1vw"}}>
                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{test?.name}</td>
                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{test?.email}</td>
                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{test?.testName}</td>
                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{seeAllResults?.batchName}</td>
                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{test?.totalMarks}</td>
                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{test?.passingMarks}</td>
                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{test?.marksObtained}</td>
                                <td
                                  style={{
                                    textAlign: 'center',
                                    verticalAlign: 'middle',
                                    color: test?.examCleard === 'Passed' ? 'green' : 'red'
                                  }}
                                >
                                  {test?.examCleard}
                                </td>

                              </tr>
                            )
                          })}
                        </>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Mentor_See_Results