import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import axios from 'axios';
import PageNotFound from '../ErrorPage/PageNotFound';
import { api2 } from '../ApiUrl/ApiUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { useState,useEffect } from 'react';
const LeaveManagement = () => {

    const [statusUpdate, setStatusUpdate] = useState('');
    const [userType, setUserType] = useState();
    const [isLoading, setIsLoading] = useState(true); 

    const handleChageStatus = (id,activeFlag) => {
        axios.post(`${api2}/mentor/approvalLeaveRequest`, {id,activeFlag})
            .then((response) => {
                handleLeaveAll()
                toast.success("Leave request Updated Successfully!", {
                    position: "top-center",
                });
            })
            .catch((error) => {
                console.error('Error:', error);
            })
    }

    useEffect(() => {
        setUserType(localStorage.getItem('userType'))
        setIsLoading(false);
    }, [])

    const handleApproval=(index,e)=>{
        let status=e.target.value;
        if(status)
            {
                const updatedLeaveAll = leaveAll.map((row, i) =>
                    i === index ? { ...row, activeFlag: status } : row
                  );
                  setleaveAll(updatedLeaveAll);  
            }
          
    }

    const[leaveAll,setleaveAll]=useState([]);
    const handleLeaveAll = (email) => {
        // console.log('submit click');
        axios.post(`${api2}/mentor/getAllLeaveRequest`, {})

            .then((Response) => {
                console.log(" data : ", Response.data);
                setleaveAll(Response.data.result);
                
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    useEffect(()=>{
        handleLeaveAll()
    },[])

    if(isLoading){
       return <div>loading...</div>;
    }

    if (userType !== 'Admin') {
        return <PageNotFound />
    }
    return (
        <div style={{ marginTop: '58px' }}>
            <div className='container-fluid'>
                <div className='col-md-12 col-lg-12 headLineBox d-flex justify-content-start'>
                    <h4>Leave Requests</h4>
                </div>
                <div className="row" style={{ marginTop: '20px' }}>
                    <div className="col-md-12 col-lg-12 col-sm-12">
                        <div className="table-container" style={{ height: '90vh', overflowY: 'auto' }}>
                            <table className="table table-bordered pt-1" >
                                <thead style={{ position: 'sticky', top: -2, zIndex: 3 }}>
                                    <tr>
                                        <th>Sr. No</th>
                                        <th>Name</th>
                                        <th>Email ID</th>
                                        <th>Leave Type</th>
                                        <th >Reason For Leave</th>
                                        <th >Start Date</th>
                                        <th>End Date</th>
                                        {/* <th>Leaves</th> */}
                                        <th>Status</th>
                                        <th >Actions</th>
                                    </tr>
                                </thead>

                                <tbody style={{ zIndex: 1 }}>
                                    {
                                        leaveAll?.map((val,index)=>{
                                            return(
                                                <tr>
                                        <td>{index +1}</td>
                                        <td>{val?.fullName}</td>
                                        <td>{val?.mentorEmail}</td>
                                        <td>{val?.leaveType}</td>
                                        <td>{val?.leaveReason}</td>
                                        <td>{val?.startDate}</td>
                                        <td>{val?.endDate}</td>
                                        
                                        <td><select
                                            style={{
                                                border: "1px solid lightBlue",
                                                borderRadius: "10px",
                                                // backgroundColor: val?.activeFlag === "1"
                                                //     ? "green"
                                                //     : val?.activeFlag === "2"
                                                //         ? "red"
                                                //         : val?.activeFlag === "3"
                                                //             ? "#FFD700"
                                                //             : "white",
                                            }}
                                            value={val?.activeFlag} name='statusUpdate' onChange={(e) => handleApproval(index,e)} class="form-select" aria-label="Default select example">
                                            
                                            <option value="0">Pending</option>
                                            <option value="1">Approve</option>
                                            <option value="2">Reject</option>
                                            <option value="3">On Hold</option>
                                            
                                            
                                           

                                        </select>
                                        </td>
                                        <td>
                                            

                                            <button onClick={()=>{handleChageStatus(val?.id,val?.activeFlag)}} style={{ background: 'transparent', border: 'none' }} className='custom-button'><i class="fa fa-save custom-icon" title='Save' style={{ color: 'rgb(212, 139, 2)', fontSize: "14pt", padding: '2px' }}></i></button>
                                            {/* <button 
                                            // onClick={handleChageStatus} 
                                            style={{ background: 'transparent', border: 'none' }} className='custom-button'><i class="fa fa-trash custom-icon" style={{ color: 'rgb(212, 139, 2)', fontSize: "14pt", padding: '2px' }}></i></button> */}
                                        </td>
                                    </tr>
                                            )
                                        })
                                    }
                                    {/* <tr>
                                        <td>Bapan Ghosh</td>
                                        <td>bapan@pentationanalytics.com</td>
                                        <td>Casual</td>
                                        <td>Durga Puja</td>
                                        <td>12-10-2024</td>
                                        <td>16-10-2024</td>
                                        
                                        <td><select
                                            style={{
                                                border: "1px solid lightBlue",
                                                borderRadius: "10px",
                                                backgroundColor: statusUpdate === "Approve"
                                                    ? "green"
                                                    : statusUpdate === "Reject"
                                                        ? "red"
                                                        : statusUpdate === "On_Hold"
                                                            ? "#FFD700"
                                                            : "white",
                                            }}
                                            value={statusUpdate} name='statusUpdate' onChange={(e) => setStatusUpdate(e.target.value)} class="form-select" aria-label="Default select example">
                                           
                                            <option value="Pending">Pending</option>
                                            <option value="On_Hold">On Hold</option>
                                            <option value="Approve">Approve</option>
                                            <option value="Reject">Reject</option>
                                           

                                        </select>
                                        </td>
                                        <td>

                                            <button onClick={handleChageStatus} style={{ background: 'transparent', border: 'none' }} className='custom-button'><i class="fa fa-save custom-icon" style={{ color: 'rgb(212, 139, 2)', fontSize: "14pt", padding: '2px' }}></i></button>
                                        </td>
                                    </tr> */}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default LeaveManagement