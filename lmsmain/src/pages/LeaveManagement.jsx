// import React, { useEffect, useState } from 'react';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TablePagination,
//   TableSortLabel,
//   IconButton,
//   TextField,
// } from '@mui/material';
// import { visuallyHidden } from '@mui/utils';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import axios from 'axios';
// import PageNotFound from '../ErrorPage/PageNotFound';
// import { api2 } from '../ApiUrl/ApiUrl';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


// const LeaveManagement = () => {

//     const [statusUpdate, setStatusUpdate] = useState('');
//     const [userType, setUserType] = useState();
//     const [isLoading, setIsLoading] = useState(true); 


//     // Table sorting and pagination
//   const [order, setOrder] = useState('asc');
//   const [orderBy, setOrderBy] = useState('fullName'); // Default column to sort
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);


//     const handleChageStatus = (id,activeFlag) => {
//         axios.post(`${api2}/mentor/approvalLeaveRequest`, {id,activeFlag})
//             .then((response) => {
//                 handleLeaveAll()
//                 toast.success("Leave request Updated Successfully!", {
//                     position: "top-center",
//                 });
//             })
//             .catch((error) => {
//                 console.error('Error:', error);
//             })
//     }

//     useEffect(() => {
//         setUserType(localStorage.getItem('userType'))
//         setIsLoading(false);
//     }, [])

//     const handleApproval=(index,e)=>{
//         console.log(index,e.target.value)
//         let status=e.target.value;
//         if(status)
//             {
//                 const updatedLeaveAll = leaveAll.map((row, i) =>
//                     i === index ? { ...row, activeFlag: status } : row
//                   );
//                   setleaveAll(updatedLeaveAll);  
//             }
          
//     }

//     const[leaveAll,setleaveAll]=useState([]);
//     const handleLeaveAll = (email) => {
//         // console.log('submit click');
//         axios.post(`${api2}/mentor/getAllLeaveRequest`, {})

//             .then((Response) => {
//                 console.log(" data : ", Response.data);
//                 setleaveAll(Response.data.result);
                
//             })
//             .catch((error) => {
//                 console.error('Error:', error);
//             });
//     }

//     useEffect(()=>{
//         handleLeaveAll()
//     },[])

//     if(isLoading){
//        return <div>loading...</div>;
//     }

//     if (userType !== 'Admin') {
//         return <PageNotFound />
//     }
    
//     return (
//         <div style={{ marginTop: '58px' }}>
//             <div className='container-fluid'>
//                 <div className='col-md-12 col-lg-12 headLineBox d-flex justify-content-start'>
//                     <h4>Leave Requests</h4>
//                 </div>
//                 <div className="row" style={{ marginTop: '20px' }}>
//                     <div className="col-md-12 col-lg-12 col-sm-12">
//                         <div className="table-container" style={{ height: '90vh', overflowY: 'auto' }}>
//                             <table className="table table-bordered pt-1" >
//                                 <thead style={{ position: 'sticky', top: -2, zIndex: 3 }}>
//                                     <tr>
//                                         <th>Sr. No</th>
//                                         <th>Name</th>
//                                         <th>Email ID</th>
//                                         <th>Leave Type</th>
//                                         <th >Reason For Leave</th>
//                                         <th >Start Date</th>
//                                         <th>End Date</th>
                                        
//                                         <th>Status</th>
//                                         <th >Actions</th>
//                                     </tr>
//                                 </thead>

//                                 <tbody style={{ zIndex: 1 }}>
//                                     {
//                                         leaveAll?.map((val,index)=>{
//                                             return(
//                                                 <tr>
//                                         <td>{index +1}</td>
//                                         <td>{val?.fullName}</td>
//                                         <td>{val?.mentorEmail}</td>
//                                         <td>{val?.leaveType}</td>
//                                         <td>{val?.leaveReason}</td>
//                                         <td>{val?.startDate}</td>
//                                         <td>{val?.endDate}</td>
                                        
//                                         <td><select
//                                             style={{
//                                                 border: "1px solid lightBlue",
//                                                 borderRadius: "10px",
//                                                 // backgroundColor: val?.activeFlag === "1"
//                                                 //     ? "green"
//                                                 //     : val?.activeFlag === "2"
//                                                 //         ? "red"
//                                                 //         : val?.activeFlag === "3"
//                                                 //             ? "#FFD700"
//                                                 //             : "white",
//                                             }}
//                                             value={val?.activeFlag} name='statusUpdate' onChange={(e) => handleApproval(index,e)} class="form-select" aria-label="Default select example">
                                            
//                                             <option value="0">Pending</option>
//                                             <option value="1">Approve</option>
//                                             <option value="2">Reject</option>
//                                             <option value="3">On Hold</option>
                                            
                                            
                                           

//                                         </select>
//                                         </td>
//                                         <td>
                                            

//                                             <button onClick={()=>{handleChageStatus(val?.id,val?.activeFlag)}} style={{ background: 'transparent', border: 'none' }} className='custom-button'><i class="fa fa-save custom-icon" title='Save' style={{ color: 'rgb(212, 139, 2)', fontSize: "14pt", padding: '2px' }}></i></button>
//                                             {/* <button 
//                                             // onClick={handleChageStatus} 
//                                             style={{ background: 'transparent', border: 'none' }} className='custom-button'><i class="fa fa-trash custom-icon" style={{ color: 'rgb(212, 139, 2)', fontSize: "14pt", padding: '2px' }}></i></button> */}
//                                         </td>
//                                     </tr>
//                                             )
//                                         })
//                                     }
//                                     {/* <tr>
//                                         <td>Bapan Ghosh</td>
//                                         <td>bapan@pentationanalytics.com</td>
//                                         <td>Casual</td>
//                                         <td>Durga Puja</td>
//                                         <td>12-10-2024</td>
//                                         <td>16-10-2024</td>
                                        
//                                         <td><select
//                                             style={{
//                                                 border: "1px solid lightBlue",
//                                                 borderRadius: "10px",
//                                                 backgroundColor: statusUpdate === "Approve"
//                                                     ? "green"
//                                                     : statusUpdate === "Reject"
//                                                         ? "red"
//                                                         : statusUpdate === "On_Hold"
//                                                             ? "#FFD700"
//                                                             : "white",
//                                             }}
//                                             value={statusUpdate} name='statusUpdate' onChange={(e) => setStatusUpdate(e.target.value)} class="form-select" aria-label="Default select example">
                                           
//                                             <option value="Pending">Pending</option>
//                                             <option value="On_Hold">On Hold</option>
//                                             <option value="Approve">Approve</option>
//                                             <option value="Reject">Reject</option>
                                           

//                                         </select>
//                                         </td>
//                                         <td>

//                                             <button onClick={handleChageStatus} style={{ background: 'transparent', border: 'none' }} className='custom-button'><i class="fa fa-save custom-icon" style={{ color: 'rgb(212, 139, 2)', fontSize: "14pt", padding: '2px' }}></i></button>
//                                         </td>
//                                     </tr> */}
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <ToastContainer />
//         </div>
//     )
// }

// export default LeaveManagement





import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    TableSortLabel,
    TextField,
} from '@mui/material';

import { visuallyHidden } from '@mui/utils';
import axios from 'axios';
import PageNotFound from '../ErrorPage/PageNotFound';
import { api2 } from '../ApiUrl/ApiUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '@mui/material/Button';

const LeaveManagement = () => {
    const [statusUpdate, setStatusUpdate] = useState('');
    const [userType, setUserType] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('fullName');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [leaveAll, setleaveAll] = useState([]);

    const handleLeaveAll = () => {
        axios.post(`${api2}/mentor/getAllLeaveRequest`, {})
            .then((response) => {
                setleaveAll(response.data.result);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    useEffect(() => {
        setUserType(localStorage.getItem('userType'));
        setIsLoading(false);
        handleLeaveAll();
    }, []);

    const handleApproval = (index, e) => {
        console.log(index,e.target.value)
        const status = e.target.value;
        setleaveAll((prevLeaveAll) =>
            prevLeaveAll.map((row, i) =>
                i === index ? { ...row, activeFlag: status } : row
            )
        );
    };


    const handleChageStatus = (id, activeFlag) => {
        axios.post(`${api2}/mentor/approvalLeaveRequest`, { id, activeFlag })
            .then(() => {
                toast.success("Leave request updated successfully!", {
                    position: "top-center",
                });
                handleLeaveAll(); // Refresh data
            })
            .catch((error) => {
                console.error('Error:', error);
                toast.error("Failed to update leave request!");
            });
    };

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

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (userType !== 'Admin') {
        return <PageNotFound />;
    }

    // const sortedData = [...leaveAll].sort((a, b) => {
    //     if (orderBy === 'startDate' || orderBy === 'endDate') {
    //         return order === 'asc'
    //             ? new Date(a[orderBy]) - new Date(b[orderBy])
    //             : new Date(b[orderBy]) - new Date(a[orderBy]);
    //     }
    //     return order === 'asc'
    //         ? a[orderBy]?.localeCompare(b[orderBy])
    //         : b[orderBy]?.localeCompare(a[orderBy]);
    // });

    const paginatedData = leaveAll.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    return (
        <div>
            <div className="container-fluid">
                <div className="col-md-12 col-lg-12 d-flex justify-content-start">
                    <h4>Leave Requests</h4>
                </div>
                <div className="row" style={{ marginTop: '20px' }}>
                    <div className="col-md-12">
                        <TableContainer>
                            <Table className="table-bordered pt-1">
                                <TableHead className="bg-theme-green text-white p-0" style={{ position: "sticky", top: -2, zIndex: 3 }}>
                                    <TableRow>
                                        {[
                                            { id: 'srNo', label: 'Sr. No' },
                                            { id: 'fullName', label: 'Name' },
                                            { id: 'mentorEmail', label: 'Email ID' },
                                            { id: 'leaveType', label: 'Leave Type' },
                                            { id: 'leaveReason', label: 'Reason For Leave' },
                                            { id: 'startDate', label: 'Start Date' },
                                            { id: 'endDate', label: 'End Date' },
                                            { id: 'activeFlag', label: 'Status' },
                                            { id: 'actions', label: 'Actions' },
                                        ].map((column) => (
                                            <TableCell key={column.id} sortDirection={orderBy === column.id ? order : false}>
                                                <TableSortLabel
                                                    className='text-white'
                                                    active={orderBy === column.id}
                                                    direction={orderBy === column.id ? order : 'asc'}
                                                    onClick={(event) => handleRequestSort(event, column.id)}
                                                >
                                                    {column.label}
                                                    {orderBy === column.id ? (
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
                                    {paginatedData.map((val, index) => (
                                        <TableRow key={val.id}>
                                            <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                            <TableCell>{val.fullName}</TableCell>
                                            <TableCell>{val.mentorEmail}</TableCell>
                                            <TableCell>{val.leaveType}</TableCell>
                                            <TableCell>{val.leaveReason}</TableCell>
                                            <TableCell>{val.startDate}</TableCell>
                                            <TableCell>{val.endDate}</TableCell>
                                            <TableCell>
                                            <select
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


                                            </TableCell>

                                            <TableCell>
                                                <Button
                                                    variant="contained"
                                                    onClick={() => handleChageStatus(val?.id, val?.activeFlag)}
                                                    style={{backgroundColor:"green", color:"white", border: 'none', fontSize:".7vw" }}
                                                >
                                                    {/* <i
                                                        className="fa fa-save custom-icon"
                                                        title="Save"
                                                        style={{ color: 'green', fontSize: '14pt' }}
                                                    /> */}
                                                    Change Status
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={leaveAll.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default LeaveManagement;
