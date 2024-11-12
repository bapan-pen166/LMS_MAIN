

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useState,useEffect } from 'react';
import { Assessment } from '@mui/icons-material';
import axios from 'axios';
import { api2 } from '../../ApiUrl/ApiUrl';
import { assignmentUrl } from '../../ApiUrl/ApiUrl';
import '../../assets/css/Custom_Global_Style/Global.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function Mentor_Assingment_Sub_List(){

    const[assignmentAll,setAssignmentAll]=useState([]);
    const[assignmentFile,setAssignmentFile]=useState('');
    const[mentorEmail,setMentorEmail]=useState('')
    const handleAssignmentAll = (email) => {
        // console.log('submit click');
        axios.post(`${api2}/mentor/getStudentSubAssignData`, {mentorEmail:email})

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

    useEffect(()=>{
        const student_email = localStorage.getItem('mentorEmail');
        handleAssignmentAll(student_email)
        setMentorEmail(student_email)
        // handleStudentPlacementstatus(student_email)
    },[])

    const viewDoc = (foldername) => {
        window.open(`${api2}/static/` + foldername)
      }

    //   update marks 
    const [marks,setmarks]=useState();
    const handleAssignmentmarks = (assignmentId) => {
        // console.log('submit click');
        axios.post(`${api2}/mentor/updateStudentAssignmentMarks`, {mentorEmail:mentorEmail,studentAssignmentId:assignmentId,marks:marks})

            .then((Response) => {
                console.log(" data : ", Response.data);
                handleAssignmentAll(mentorEmail);
                // handleMetorData();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    const handleEditMarks =(index)=>{
        
        const updatedAssignments = [...assignmentAll];
        updatedAssignments[index].marks = null;
        setAssignmentAll(updatedAssignments);
    }

    return(
        <>
        <div style={{ marginTop: '58px' }}>
                <div className="container-fluid">
                    <div className="row">
                        <div className=" col-md-12 col-lg-12 col-sm-12 headLineBox">
                            <h4>Assignments</h4>
                        </div>
                        
                        <div className='col-md-12'>
                            <div className="table-container" style={{ minHeight: '90vh', overflow: 'scroll' }} >
                                <table className="table table-bordered pt-1" >
                                    <thead style={{ position: 'sticky', top: -2, zIndex: 3 }}>
                                        <tr>
                                            <th style={{ textAlign: 'center' }}>No</th>
                                            
                                            <th style={{ textAlign: 'center' }}>Student Name</th>
                                            <th style={{ textAlign: 'center' }}>Batch Name</th>
                                            <th style={{ textAlign: 'center' }}>Assignment Name</th>
                                            <th style={{ textAlign: 'center' }}>Submission Date</th>
                                            <th style={{ textAlign: 'center' }}>Last Date</th>
                                            <th style={{ textAlign: 'center' }}>Total Marks</th>
                                            <th style={{ textAlign: 'center' }}>Marks</th>
                                            {/* <th style={{ textAlign: 'center' }}>Assignment</th>
                                            <th style={{ textAlign: 'center' }}>Upload</th>
                                            <th style={{ textAlign: 'center' }}>Status</th> */}
                                            <th style={{ textAlign: 'center' }}>Action</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            assignmentAll?.map((assignment,index)=>{
                                                return(
                                                    <tr>
                                            <td>{index+1}</td>
                                            <td>{assignment?.studentName}</td>
                                            <td>{assignment?.batch}</td>
                                            <td>{assignment?.assignmentName}</td>
                                            <td>{assignment?.submittedDate}</td>
                                            <td>{assignment?.endDate}</td>
                                            <td>{assignment?.totalMarks}</td>
                                            <td class="text-center align-middle">
                                            {assignment?.marks?assignment?.marks+'/'+assignment?.totalMarks:
                                             <Box
                                             component="form"
                                             sx={{ '& .MuiTextField-root': {paddingBottom:'14px',  width: '15ch' } }}
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
                                                     onChange={(e)=>{setmarks(e.target.value)}}
                                                     />
                                                 </Box>
                                            }
                                               
                                            </td>
                                            {/* <td class="text-center align-middle">
                                                <Button variant="contained" onClick={() => {
                                                    handleDownloadXLS(assignment?.filePath)
                                                    }}>Download
                                                    </Button> 
                                            </td>
                                            <td>
                                            <div class="input-group ">
                                                <input type="file" name='content' class="form-control-file" id="exampleFormControlFile1"
                                                onChange={(e)=>{setAssignmentFile(e.target.files[0])}}
                                                />
                                            </div>
                                            </td>
                                            <td>{assignment?.uploadStatus==1?'Submitted':'Pending'}</td> */}
                                            <td>
                                            <button style={{ background: 'transparent', border: 'none' }} className="custom-button" onClick={()=>{viewDoc(assignment?.assignmentPath)}}>
                                            <i class="fa fa-eye" style={{ color: 'rgb(212, 139, 2)', fontSize: "14pt", padding: '2px' }} ></i></button>
                                            {assignment?.marks?
                                            <button className="custom-button"
                                            style={{ 
                                                background: 'transparent', 
                                                border: 'none', color:'rgb(212, 139, 2)'
                                                // cursor: assignmentFile && selectedRowIndex === index ? 'pointer' : 'not-allowed',
                                                // color: assignmentFile && selectedRowIndex === index ? 'rgb(212, 139, 2)' : 'gray'
                                            }} 
                                            onClick={() => 
                                                // handleAssignmentmarks(assignment?.id)
                                                handleEditMarks(index)
                                            } 
                                            // disabled={!assignmentFile || selectedRowIndex !== index}
                                            >
                                            <i className="fa fa-edit" style={{ fontSize: "14pt", padding: '2px' }}></i>
                                            </button>:<button className="custom-button"
                                            style={{ 
                                                background: 'transparent', 
                                                border: 'none', color:'rgb(212, 139, 2)'
                                                // cursor: assignmentFile && selectedRowIndex === index ? 'pointer' : 'not-allowed',
                                                // color: assignmentFile && selectedRowIndex === index ? 'rgb(212, 139, 2)' : 'gray'
                                            }} 
                                            onClick={() => handleAssignmentmarks(assignment?.id)} 
                                            // disabled={!assignmentFile || selectedRowIndex !== index}
                                            >
                                            <i className="fa fa-save" style={{ fontSize: "14pt", padding: '2px' }}></i>
                                            </button>
                                        }
                                            
                                                </td>
                                        </tr>
                                                )
                                            })
                                        }
                                        {/* <tr>
                                            <td>1</td>
                                            <td>Physics</td>
                                            <td>27/8/2024</td>
                                            <td>5/9/2024</td>
                                            <td class="text-center align-middle">
                                                <Button variant="contained" onClick={() => {
                                                    handleDownloadXLS()
                                                    }}>Download
                                                    </Button> 
                                            </td>
                                            <td>
                                            <div class="input-group ">
                                                <input type="file" name='content' class="form-control-file" id="exampleFormControlFile1"
                                                
                                                />
                                            </div>
                                            </td>
                                            <td>Not Uploaded</td>
                                            <td><button style={{ background: 'transparent', border: 'none' }} ><i class="fa fa-save" style={{ color: 'rgb(212, 139, 2)', fontSize: "14pt", padding: '2px' }} ></i></button></td>
                                        </tr> */}
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