

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import { Assessment } from '@mui/icons-material';
import axios from 'axios';
import { api2 } from '../../ApiUrl/ApiUrl';
import { assignmentUrl } from '../../ApiUrl/ApiUrl';
import '../../assets/css/Custom_Global_Style/Global.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import PreviewIcon from '@mui/icons-material/Preview';


export default function Mentor_Assingment_Sub_List() {

    const [assignmentAll, setAssignmentAll] = useState([]);
    const [assignmentFile, setAssignmentFile] = useState('');
    const [mentorEmail, setMentorEmail] = useState('')
    const handleAssignmentAll = (email) => {
        // console.log('submit click');
        axios.post(`${api2}/mentor/getStudentSubAssignData`, { mentorEmail: email })

            .then((Response) => {
                console.log(" data : ", Response.data);
                setAssignmentAll(Response.data.result);
                // handleMetorData();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }



    // const handleDownloadXLS = (filePath) => {
    //     const link = document.createElement('a');
    //     link.href = assignmentUrl+filePath ; // Replace with the URL of your file
    //     link.download = 'Assignment.pdf'; // The name for the downloaded file 
    //     document.body.appendChild(link);
    //     link.click();
    //     document.body.removeChild(link);
    // }

    // const handleAssignmentSave = (id,assignmentName) => {
    //     // console.log('submit click');
    //     const data = new FormData()
    //     data.append('file',assignmentFile);
    //     data.append('assignmentId',id);
    //     data.append('assignmentName',assignmentName);
    //     data.append('studentEmail',studentEmail);
    //     axios.post(`${api2}/student/uploadAssignment`,data, {})

    //         .then((Response) => {
    //             console.log(" data : ", Response.data);

    //         })
    //         .catch((error) => {
    //             console.error('Error:', error);
    //         });
    // }

    useEffect(() => {
        const student_email = localStorage.getItem('mentorEmail');
        handleAssignmentAll(student_email)
        setMentorEmail(student_email)
        // handleStudentPlacementstatus(student_email)
    }, [])

    const viewDoc = (foldername) => {
        window.open(`${api2}/static/` + foldername)
    }

    //   update marks 
    const [marks, setmarks] = useState();
    const handleAssignmentmarks = (assignmentId) => {
        // console.log('submit click');
        axios.post(`${api2}/mentor/updateStudentAssignmentMarks`, { mentorEmail: mentorEmail, studentAssignmentId: assignmentId, marks: marks })

            .then((Response) => {
                console.log(" data : ", Response.data);
                handleAssignmentAll(mentorEmail);
                // handleMetorData();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    const handleEditMarks = (index) => {

        const updatedAssignments = [...assignmentAll];
        updatedAssignments[index].marks = null;
        setAssignmentAll(updatedAssignments);
    }

    return (
        <>
            <div >
                <div className="container-fluid">
                    <div className="row">
                        <div className=" col-md-12 col-lg-12 col-sm-12">
                            <h4>Assignments</h4>
                        </div>

                        <div className='col-md-12'>
                            <div className="p-0 custom-table-container" style={{ paddingTop: "0px", height: '400px', overflowY: 'auto' }} >
                                <table className="table-bordered custom-table" >
                                    <thead className="custom-thead " style={{ position: 'sticky', top: 0, zIndex: 3, fontSize: "1vw" }}>
                                        <tr>
                                            <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>No</th>

                                            <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Student Name</th>
                                            <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Batch Name</th>
                                            <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Assignment Name</th>
                                            <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Submission Date</th>
                                            <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Last Date</th>
                                            <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Total Marks</th>
                                            <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Marks</th>
                                            <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="custom-tbody ">
                                        {
                                            assignmentAll?.map((assignment, index) => {
                                                return (
                                                    <tr style={{ fontSize: "1vw" }}>
                                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{index + 1}</td>
                                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{assignment?.studentName}</td>
                                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{assignment?.batch}</td>
                                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{assignment?.assignmentName}</td>
                                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{assignment?.submittedDate}</td>
                                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{assignment?.endDate}</td>
                                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{assignment?.totalMarks}</td>
                                                        <td class="text-center align-middle" style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                                            {assignment?.marks ? assignment?.marks + '/' + assignment?.totalMarks :
                                                                <Box
                                                                    component="form"
                                                                    sx={{ '& .MuiTextField-root': { paddingBottom: '14px', width: '15ch' } }}
                                                                    noValidate
                                                                    autoComplete="off"
                                                                >
                                                                    <TextField
                                                                        id="filled-number"
                                                                        label="Number"
                                                                        type="number"
                                                                        variant="filled"
                                                                        slotProps={{
                                                                            inputLabel: {
                                                                                shrink: true,
                                                                            },
                                                                        }}
                                                                        onChange={(e) => { setmarks(e.target.value) }}
                                                                    />
                                                                </Box>
                                                            }

                                                        </td>

                                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                                            <button style={{ background: 'transparent', border: 'none' }} className="custom-button" onClick={() => { viewDoc(assignment?.assignmentPath) }}>
                                                                <PreviewIcon style={{ color: "green" }} /> </button>
                                                            {assignment?.marks ?
                                                                <button className="custom-button"
                                                                    style={{
                                                                        background: 'transparent',
                                                                        border: 'none', color: "green"
                                                                    }}
                                                                    onClick={() =>

                                                                        handleEditMarks(index)
                                                                    }

                                                                >
                                                                    <i className="fa fa-edit" style={{ fontSize: "14pt", padding: '2px' }}></i>
                                                                </button> : <button className="custom-button"
                                                                    style={{

                                                                        border: 'none', color: 'green'
                                                                    }}
                                                                    onClick={() => handleAssignmentmarks(assignment?.id)}

                                                                >
                                                                    <i className="fa fa-save" style={{ fontSize: "14pt", padding: '2px' }}></i>
                                                                </button>
                                                            }

                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}