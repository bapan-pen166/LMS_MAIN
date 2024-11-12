import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import { Assessment } from '@mui/icons-material';
import axios from 'axios';
import { api2 } from '../../ApiUrl/ApiUrl';
import { assignmentUrl } from '../../ApiUrl/ApiUrl';
import '../../assets/css/Custom_Global_Style/Global.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../../assets/css/TableStyle/TableStyle.css";
import "../../assets/css/Utility/utilityColor.css";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import AttachFileIcon from '@mui/icons-material/AttachFile';

export default function Student_Assignment() {

    const [assignmentAll, setAssignmentAll] = useState([]);
    const [assignmentFile, setAssignmentFile] = useState('');
    const [studentEmail, setStudentEmail] = useState('')
    const [flag, setFlag] = useState(false);
    const [assignmentFileNames, setAssignmentFileNames] = useState(Array(assignmentAll.length).fill(''));


    const handleAssignmentAll = (email) => {
        // console.log('submit click');
        axios.post(`${api2}/student/getAssignmentData`, { studentEmail: email })

            .then((Response) => {
                console.log(" data : ", Response.data);
                setAssignmentAll(Response.data.result);
                // handleMetorData();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    useEffect(() => {

    }, [])

    const handleDownloadXLS = (filePath) => {
        window.open(`${api2}/static/` + filePath)
        // const link = document.createElement('a');
        // link.href = assignmentUrl+filePath ; // Replace with the URL of your file
        // link.download = 'Assignment.pdf'; // The name for the downloaded file 
        // document.body.appendChild(link);
        // link.click();
        // document.body.removeChild(link);
    }
    // handleAssignmentDownload 
    const handleAssignmentDownload = (id, assignmentName, endDate) => {
        // console.log('submit click');
        const data = new FormData()
        // data.append('file',assignmentFile);
        data.append('assignmentId', id);
        data.append('assignmentName', assignmentName);
        data.append('studentEmail', studentEmail);
        data.append('endDate', endDate);
        axios.post(`${api2}/student/downloadAssignmentStatus`, data, {})

            .then((Response) => {
                console.log(" data : ", Response.data);
                // if(Response.data.status==1)
                //     {
                //         // handleAssignmentAll(studentEmail)
                //         // setFlag(!flag)
                //         // setAssignmentFile('')
                //         // toast.success("Assignment Submitted Successfully!", {
                //         // position: "top-center",
                //         // }); 
                //     }
                //     else if(Response.data.status==2)
                //         {
                //             toast.warn("Assignment upload last date has over!", {
                //                 position: "top-center",
                //                 }); 
                //         }
                //     else{
                //         toast.error("An error occoured!", {
                //             position: "top-center",
                //             }); 
                //         }    

            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const handleAssignmentSave = (id, assignmentName, endDate) => {
        // console.log('submit click');
        const data = new FormData()
        data.append('file', assignmentFile);
        data.append('assignmentId', id);
        data.append('assignmentName', assignmentName);
        data.append('studentEmail', studentEmail);
        data.append('endDate', endDate);
        axios.post(`${api2}/student/uploadAssignment`, data, {})

            .then((Response) => {
                console.log(" data : ", Response.data);
                if (Response.data.status == 1) {
                    handleAssignmentAll(studentEmail)
                    setFlag(!flag)
                    setAssignmentFile('')
                    toast.success("Assignment Submitted Successfully!", {
                        position: "top-center",
                    });
                }
                else if (Response.data.status == 2) {
                    toast.warn("Assignment upload last date has over!", {
                        position: "top-center",
                    });
                }
                else {
                    toast.error("An error occoured!", {
                        position: "top-center",
                    });
                }

            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    useEffect(() => {
        const student_email = localStorage.getItem('studentEmail');
        handleAssignmentAll(student_email)
        setStudentEmail(student_email)
        // handleStudentPlacementstatus(student_email)
    }, [flag])

    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedRowIndex, setSelectedRowIndex] = useState(null);

    // Handle file input change
    const handleFileChange = (index, event) => {
        const file = event.target.files[0];
        if (file) {
            // Update the state with the new file and the row index
            setAssignmentFile(file);
            setSelectedRowIndex(index);

            const updatedFileNames = [...assignmentFileNames];
            updatedFileNames[index] = file.name;
            setAssignmentFileNames(updatedFileNames);
        }
    };
    return (
        <>
            <div style={{ marginTop: '58px', backgroundColor: "#f2edf3" }}>
                <div className="container-fluid">
                    <div className="row">
                        {/* <div className="col-md-12 col-lg-12 col-sm-12 headLineBox">
                            <h4>Assignments</h4>
                        </div> */}

                        <div className="col-md-12 mt-4">
                            <div className="custom-table-container" style={{ minHeight: '90vh', overflow: 'scroll' }}>
                                <table className="custom-table table-bordered pt-1">
                                    <thead className="custom-thead" style={{ position: 'sticky', top: -2, zIndex: 3 }}>
                                        <tr>
                                            <th>No</th>
                                            <th>Name</th>
                                            <th>Start Date</th>
                                            <th>End Date</th>
                                            <th>Assignment</th>
                                            <th>Upload</th>
                                            <th>Total Marks</th>
                                            <th>Marks Obtained</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="custom-tbody" >
                                        {assignmentAll?.map((assignment, index) => (
                                            <tr key={index} >
                                                <td>{index + 1}</td>
                                                <td>{assignment?.assignmentName}</td>
                                                <td>{assignment?.startDate}</td>
                                                <td>{assignment?.endDate}</td>
                                                <td className="text-center align-middle">
                                                    <Button
                                                        className='form-btn'
                                                        variant="contained"
                                                        onClick={() => {
                                                            handleDownloadXLS(assignment?.filePath);
                                                            handleAssignmentDownload(
                                                                assignment?.id,
                                                                assignment?.assignmentName,
                                                                assignment?.endDate
                                                            );
                                                        }}
                                                    >
                                                        Download <FileDownloadIcon />
                                                    </Button>
                                                </td>
                                                <td>
                                                    <div className="input-group" style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                                        <AttachFileIcon
                                                            style={{ fontSize: '24px', color: '#1f8ef1' }}
                                                            onClick={() => document.getElementById(`file-input-${index}`).click()}
                                                        />
                                                        <input
                                                            type="file"
                                                            name="content"
                                                            id={`file-input-${index}`}
                                                            className="custom-input-file"
                                                            style={{ display: 'none' }}  // Hide the input field
                                                            onChange={(e) => handleFileChange(index, e)}
                                                        />
                                                        {/* Display file name or default message */}
                                                        <span style={{ marginLeft: '8px', color: '#333' }}>
                                                            {assignmentFileNames[index] || 'File not chosen'}
                                                        </span>
                                                    </div>
                                                </td>

                                                <td>{assignment?.totalMarks}</td>
                                                <td>{assignment?.marks ? assignment?.marks : 'Evaluation Pending'}</td>
                                                <td className={assignment?.uploadStatus === 1 ? 'status-submitted' : 'status-pending'}>{assignment?.uploadStatus === 1 ? 'Submitted' : 'Pending'}</td>
                                                <td>
                                                    <button
                                                        className="custom-button"
                                                        style={{
                                                            background: 'transparent',
                                                            border: 'none',
                                                            cursor:
                                                                assignmentFile && selectedRowIndex === index
                                                                    ? 'pointer'
                                                                    : 'not-allowed',
                                                            color:
                                                                assignmentFile && selectedRowIndex === index
                                                                    ? 'rgb(212, 139, 2)'
                                                                    : 'gray',
                                                        }}
                                                        onClick={() =>
                                                            handleAssignmentSave(
                                                                assignment?.id,
                                                                assignment?.assignmentName,
                                                                assignment?.endDate
                                                            )
                                                        }
                                                        disabled={!assignmentFile || selectedRowIndex !== index}
                                                        title="Upload"
                                                    >
                                                        <i className="fa fa-save custom-icon"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>

    )
}