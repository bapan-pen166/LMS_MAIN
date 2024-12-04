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

import {

    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TablePagination,

    TextField, IconButton,

} from '@mui/material';
import DownloadForOfflineOutlinedIcon from '@mui/icons-material/DownloadForOfflineOutlined';

import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';

import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { visuallyHidden } from '@mui/utils';
// const [assignmentFileNames, setAssignmentFileNames] = useState(Array(assignmentAll.length).fill(''));


export default function Student_Assignment() {

    const [assignmentAll, setAssignmentAll] = useState([]);
    const [studentEmail, setStudentEmail] = useState('')
    const [flag, setFlag] = useState(false);

    const [order, setOrder] = useState('asc');

    const [orderBy, setOrderBy] = useState('name');

    const [page, setPage] = useState(0);

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [searchQuery, setSearchQuery] = useState('');

    const [assignmentFileNames, setAssignmentFileNames] = useState([]);

    // const [selectedRowIndex, setSelectedRowIndex] = useState(null);

    const [assignmentFile, setAssignmentFile] = useState(null);

    const handleRequestSort = (event, property) => {

        const isAsc = orderBy === property && order === 'asc';

        setOrder(isAsc ? 'desc' : 'asc');

        setOrderBy(property);

    };



    const handleChangePage = (event, newPage) => {

        setPage(newPage);

    };



    const handleChangeRowsPerPage = (event) => {

        setRowsPerPage(parseInt(event.target.value, 10));

        setPage(0);

    };



    const handleSearchChange = (event) => {

        setSearchQuery(event.target.value);

    };





    const filteredAssignments = assignmentAll.filter((assignment) =>

        assignment.assignmentName.toLowerCase().includes(searchQuery.toLowerCase())

    );



    const sortedAssignments = filteredAssignments.sort((a, b) => {

        if (orderBy === 'name') {

            return order === 'asc'

                ? a.assignmentName.localeCompare(b.assignmentName)

                : b.assignmentName.localeCompare(a.assignmentName);

        }

        return 0;

    });



    const emptyRows = rowsPerPage - Math.min(rowsPerPage, filteredAssignments.length - page * rowsPerPage);
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
            <div>
                <div className="container-fluid">
                    <div className="row">

                        <div className="col-md-12">
                            <div className="custom-table-container">
                                <table className="custom-table table-bordered pt-1 d-none">
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
                                                <td className={assignment?.uploadStatus == 1 ? 'status-submitted' : 'status-pending'}>{assignment?.uploadStatus == 1 ? 'Submitted' : 'Pending'}</td>
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

                                <TextField

                                    label="Search"

                                    variant="outlined"

                                    value={searchQuery}

                                    onChange={handleSearchChange}

                                    style={{ marginBottom: '16px' }}

                                    InputLabelProps={{

                                        style: { top: '-5px' }

                                    }}

                                />

                                <TableContainer>

                                    <Table>

                                        <TableHead className='bg-theme-green text-white p-0'>

                                            <TableRow>

                                                {['No', 'Name', 'Start Date', 'End Date', 'Upload', 'Total Marks', 'Marks Obtained', 'Status', 'Action'].map((headCell) => (

                                                    <TableCell

                                                        key={headCell}

                                                        sortDirection={orderBy === headCell ? order : false}

                                                        className='p-2'

                                                    >

                                                        <TableSortLabel

                                                            className='p-0 text-white'

                                                            active={orderBy === headCell}

                                                            direction={orderBy === headCell ? order : 'asc'}

                                                            onClick={(event) => handleRequestSort(event, headCell)}

                                                        >

                                                            {headCell}

                                                            {orderBy === headCell ? (

                                                                <span style={visuallyHidden}>

                                                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}

                                                                </span>

                                                            ) : null}

                                                        </TableSortLabel>

                                                    </TableCell>

                                                ))}

                                            </TableRow>

                                        </TableHead>

                                        <TableBody>

                                            {sortedAssignments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((assignment, index) => (

                                                <TableRow hover key={index}>

                                                    <TableCell className="p-2">{index + 1}</TableCell>

                                                    <TableCell className="p-2">{assignment.assignmentName}</TableCell>

                                                    <TableCell className="p-2">{assignment.startDate}</TableCell>

                                                    <TableCell className="p-2">{assignment.endDate}</TableCell>


                                                    <TableCell className="p-2">

                                                        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>

                                                            <FileUploadOutlinedIcon

                                                                style={{ fontSize: '24px', color: '#1f8ef1' }}

                                                                onClick={() => document.getElementById(`file-input-${index}`).click()}

                                                            />

                                                            <input

                                                                type="file"

                                                                id={`file-input-${index}`}

                                                                style={{ display: 'none' }}

                                                                onChange={(e) => handleFileChange(index, e)}

                                                            />

                                                            <span style={{ marginLeft: '8px' }}>

                                                                {assignmentFileNames[index] || 'File not chosen'}

                                                            </span>

                                                        </div>

                                                    </TableCell>

                                                    <TableCell className="p-2">{assignment.totalMarks}</TableCell>

                                                    <TableCell className="p-2">{assignment.marks ? assignment.marks : 'Evaluation Pending'}</TableCell>

                                                    <TableCell className="p-2">

                                                        {assignment.uploadStatus === 1 ? (

                                                            <span className="badge-success">Submitted</span>

                                                        ) : (

                                                            <span className="custom-badge-warning">Pending</span>

                                                        )}

                                                    </TableCell>

                                                    <TableCell className="p-2">

                                                        <span>

                                                            <button

                                                                style={{

                                                                    background: 'transparent',

                                                                    border: 'none',

                                                                    cursor: assignmentFile && selectedRowIndex === index ? 'pointer' : 'not-allowed',

                                                                    color: assignmentFile && selectedRowIndex === index ? 'rgb(212, 139, 2)' : 'gray',

                                                                }}

                                                                onClick={() => handleAssignmentSave(assignment.id, assignment.assignmentName, assignment.endDate)}

                                                                disabled={!assignmentFile || selectedRowIndex !== index}

                                                            >

                                                                <SaveOutlinedIcon />

                                                            </button>

                                                        </span>

                                                        <span style={{ cursor: 'pointer' }} className='ml-3' title="download">

                                                            <DownloadForOfflineOutlinedIcon onClick={() => {

                                                                handleDownloadXLS(assignment.filePath);

                                                                handleAssignmentDownload(assignment.id, assignment.assignmentName, assignment.endDate);

                                                            }} />

                                                        </span>



                                                    </TableCell>

                                                </TableRow>

                                            ))}

                                            {emptyRows > 0 && (

                                                <TableRow style={{ height: 53 * emptyRows }}>

                                                    <TableCell className="p-2" colSpan={10} />

                                                </TableRow>

                                            )}

                                        </TableBody>

                                    </Table>

                                </TableContainer>

                                <TablePagination

                                    rowsPerPageOptions={[5, 10, 25]}

                                    component="div"

                                    count={filteredAssignments.length}

                                    rowsPerPage={rowsPerPage}

                                    page={page}

                                    onPageChange={handleChangePage}

                                    onRowsPerPageChange={handleChangeRowsPerPage}

                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>

    )
}