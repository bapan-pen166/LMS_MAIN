import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { api, api2 } from '../../ApiUrl/ApiUrl';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import "../../assets/css/TableStyle/TableStyle.css"
import DeleteIcon from '@mui/icons-material/Delete';
import PreviewIcon from '@mui/icons-material/Preview';
import Tooltip from '@mui/material/Tooltip';

const ViewTests = () => {
    const [allTestData, setAllTestData] = useState();
    const [mentorEmail, setMentorEmail] = useState();

    useEffect(() => {
        setMentorEmail(localStorage.getItem('mentorEmail'))
    }, [])

    const getAllTestData = () => {
        axios.post(`${api}/student/getTests`, { email: mentorEmail })
            .then((response) => {
                console.log("data,", response.data.data);
                setAllTestData(response.data.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        getAllTestData();
    }, [mentorEmail])


    const deleteTest = (id) => {
        axios.post(`${api2}/mentor/deleteTests`, { id: id })
            .then((Response) => {
                console.log(Response?.data.status === 1);
                if (Response?.data.status) {
                    toast.success("Test has been deleted successfully.", {
                        position: "top-center",
                        style: { fontWeight: 'bold' },
                    });
                    getAllTestData();
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <div>
            <div className="row">
                <div className="container-fluid">
                    <div className='col-md-12 col-lg-12 d-flex justify-content-start'>
                        <h4>View Tests</h4>
                    </div>
                    <div className="col-md-12 col-lg-12 col-sm-12">
                        <div className="p-0 custom-table-container" style={{ paddingTop: "0px", height: '400px', overflowY: 'auto' }}>
                            <table className="table-bordered custom-table"  >
                                <thead className="custom-thead " style={{ position: 'sticky', top: 0, zIndex: 3 }}>
                                    <tr>
                                        <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Test Name</th>
                                        <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Batch Name</th>
                                        <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Start Date</th>
                                        <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>End Date</th>
                                        <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Start Time</th>
                                        <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>End Time</th>
                                        <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>evaluator</th>
                                        <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>View questions</th>
                                        <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Action</th>

                                    </tr>
                                </thead>

                                <tbody style={{ zIndex: 1 }} className="custom-tbody">
                                    {allTestData?.map(testDetails => {
                                        const parsedBatchName = JSON.parse(testDetails?.batchName || "[]");
                                        const batchNamesString = parsedBatchName.map(batch => batch?.batchName).join(", ");
                                        return (
                                            <tr>
                                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{testDetails?.testName}</td>
                                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{batchNamesString}</td>
                                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{testDetails && testDetails?.startDate}</td>
                                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{testDetails && testDetails?.endDate}</td>
                                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{testDetails && testDetails?.startTime}</td>
                                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{testDetails && testDetails?.endTime}</td>
                                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{testDetails?.evaluator}</td>
                                                <td class="text-center align-middle"><p>
                                                    <Button variant="text"> <Link to={`/Mentor-view-questions/${testDetails?.id}`}>
                                                        <Tooltip title="Click here to view question" arrow>
                                                            <PreviewIcon style={{ color: "green" }} />
                                                        </Tooltip>
                                                    </Link></Button></p> </td>
                                                <td><button style={{ background: 'transparent', border: 'none' }} className="custom-button"><Tooltip title="Click here to delete question" arrow>  <DeleteIcon style={{ color: "red" }} onClick={() => deleteTest(testDetails?.id)} />  </Tooltip> </button></td>
                                            </tr>
                                        )
                                    })}
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

export default ViewTests