import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { api } from '../../ApiUrl/ApiUrl';
import { CiSearch } from "react-icons/ci";

const Mentor_See_Results = () => {
   const [seeAllResults,setSeeAllResults] = useState();
   const [menotorMail,setMenotorMail] = useState();


    // For the search 
    const [searchres, setSearchres] = useState();
    const [searchquery, setSearchquery] = useState('');


   useEffect(()=>{
    setMenotorMail(localStorage.getItem('mentorEmail'))
   },[])

   const getAllResults =()=>{
         axios.post(`${api}/mentor/getBatchStudentTests`,{email:menotorMail})
         .then((Response)=>{
                console.log("cool data result",Response?.data?.data);
                setSeeAllResults(Response?.data?.data)
                setSearchres(Response?.data?.data)
         })
         .catch((error)=>{
            console.log(error);
         })
   }

   useEffect(()=>{
        getAllResults();
   },[menotorMail])



    // input change for search

    // const inputChange = (e) => {
    //   const query = e.target.value;
    //   setSearchquery(query);
    
    //   if (query === '') {
    //     getAllResults();
    //   } else {
    //     console.log("searchres", searchres);
    
    //     if (searchres && Array.isArray(searchres)) {
    //       const filterData = searchres
    //         .flatMap((serch) => serch?.tests?.filter((f) => {
    //           return (
    //             (f?.testName && f?.testName?.toLowerCase()?.includes(query?.toLowerCase())) ||
    //             (f?.name && f?.name?.toLowerCase()?.includes(query?.toLowerCase())) ||
    //             (f?.email && f?.email?.toLowerCase()?.includes(query?.toLowerCase()))
    //           );
    //         }));
    
    //       console.log(filterData);
    //       setSeeAllResults(filterData);
    //     } else {
    //       console.warn("searchres is not defined or not an array.");
    //     }
    //   }
    // };
    
    



  return (
    <div style={{ marginTop: "58px" }}>
      <div className="row">
        <div className="container-fluid">
          <div className='col-md-12 col-lg-12 headLineBox d-flex justify-content-start'>
            <h4>Test Results</h4>
          </div>
          {/* Main body */}
          <div className='container-fluid pr-2 pl-2' style={{ minHeight: '80vh', marginTop: "10px" }}>
          {/* <div className="row mt-4">
                        <div className="col-md-6">
                            <div className="d-flex align-items-center">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search by Student Name/Email or Test Name"
                                    value={searchquery}
                                    onChange={inputChange}
                                />
                                <CiSearch className="search-btn" />
                            </div>
                        </div>
                       
                    </div> */}
            <div className='row'>
              <div className='col-md-12 col-lg-12 scroll' style={{ paddingRight: '0px', paddingLeft: '0px' }}>
                <table className="table table-bordered">
                  <thead style={{ textAlign: "center", zIndex: '3', position: "sticky", top: "0px" }}>
                    <tr>
                      {/* <th>No.</th> */}
                      {/* <th>Batch Name</th> */}
                      <th>Student Name</th>
                      <th>Email</th>
                      <th>Test Name</th>
                      <th>Batch</th>
                      <th>Total Marks</th>
                      <th>Passing Marks</th>
                      <th>Marks Obtained</th>
                      <th>Pass/ Fail</th>
                      {/* <th>Details</th> */}
                      {/* <th></th> */}
                    </tr>
                  </thead>
                  <tbody style={{ textAlign: "center", zIndex: '1' }}>
                    {seeAllResults && seeAllResults.map((seeAllResults,index)=>{
                      return(
                         <>
                           
                             {seeAllResults.tests.map((test)=>{
                              return (
                                <tr>
                                   {/* <td>{index}</td> */}
                                   <td>{test?.name}</td>
                                   <td>{test?.email}</td>
                                   <td>{test?.testName}</td>
                                   <td>{seeAllResults?.batchName}</td>
                                   <td>{test?.totalMarks}</td>
                                   <td>{test?.passingMarks}</td>
                                   <td>{test?.marksObtained}</td>
                                   <td>{test?.examCleard}</td>
                                </tr>
                              )
                             })}
                              
                           
                              </>
                      )
                    })}
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

export default Mentor_See_Results