import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { button, Modal } from 'react-bootstrap';
import '../../src/assets/css/Custom_Global_Style/Global.css';
import { CiSearch } from "react-icons/ci";
import { useState } from 'react';
import { api2 } from '../ApiUrl/ApiUrl';
import axios from 'axios';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../src/assets/css/Custom_Global_Style/Global.css';
import * as Yup from 'yup';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

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

export default function Settings() {
// Add instructor 
const [showaddUser, setShowaddUser] = useState(false);
const handleaddUserClose = () => setShowaddUser(false);
const handleaddUserShow = () => setShowaddUser(true);

// For the search 
const [searchres, setSearchres] = useState([]);
const [searchquery, setSearchquery] = useState('');

const [order, setOrder] = useState('asc');
const [orderBy, setOrderBy] = useState('name');  // Correct field for sorting
const [page, setPage] = useState(0);
const [rowsPerPage, setRowsPerPage] = useState(5);

const [user, setUser] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    role: "",
    activeFlag: ""
});

const handleAddUser = (e) => {
    const { name, value } = e.target;
    setUser({
        ...user,
        [name]: value
    });
};

// For the validations
const [errors, setErrors] = useState({});

const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    phoneNumber: Yup.string().required("Phone number is required"),
    role: Yup.string().required("Role is required"),
    activeFlag: Yup.string().required("Status is required")
});

const handleAddUserset = async (e) => {
    try {
        // Validate form values
        await validationSchema.validate(user, { abortEarly: false });
        setErrors({}); // Clear errors if validation passes

        // Make the API call
        axios
            .post(`${api2}/user/addAllUser`, user)
            .then((response) => {
                if (response.data.status === 0) {
                    toast.error("Email ID already exists!", {
                        position: "top-center",
                    });
                } else {
                    toast.success("Insert Successfully!", {
                        position: "top-center",
                    });
                    setUser({
                        name: "",
                        email: "",
                        phoneNumber: "",
                        role: "",
                        activeFlag: "",
                    });
                    handleaddUserClose();
                    handleAllUserList();
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    } catch (validationError) {
        // Handle validation errors
        const newErrors = {};
        validationError.inner.forEach((err) => {
            newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
    }
};

// User list view 
const [editIndex, setEditIndex] = useState(null);
const [userList, setUserList] = useState([]);

const handleEditClick = (index) => {
    setEditIndex(index);
};

const handleSaveClick = () => {
    setEditIndex(null);
};

const handleStatusChange = (e, index) => {
    const newStatus = [...userList];
    newStatus[index].activeFlag = e.target.value;
    setUserList(newStatus);
};

const handleAllUserList = () => {
    axios.post(`${api2}/user/getAllUserDetails`, {})
        .then((Response) => {
            setUserList(Response.data.data); 
        })
        .catch((error) => {
            console.error('Error:', error);
        });
};

useEffect(() => {
    handleAllUserList();
}, []);

// user delete status 
const handleUserDelete = (id) => {
    axios.post(`${api2}/user/deleteUser`, { id: id })
        .then((Response) => {
            handleAllUserList();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
};

// user edit status 
const handleUserEdit = (id, flag) => {
    axios.post(`${api2}/user/editUser`, { id: id, activeFlag: flag })
        .then((Response) => {
            setEditIndex(null);
            handleAllUserList();
        })
        .catch((error) => {
            console.error('Error:', error);
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

// const sortedData = [...userList].sort((a, b) => {
//     if (orderBy === 'startDate' || orderBy === 'endDate') {
//         return order === 'asc'
//             ? new Date(a[orderBy]) - new Date(b[orderBy])
//             : new Date(b[orderBy]) - new Date(a[orderBy]);
//     }
//     return order === 'asc'
//         ? a[orderBy]?.localeCompare(b[orderBy])
//         : b[orderBy]?.localeCompare(a[orderBy]);
// });

const paginatedData = userList.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
);

    return (
        <>
            <div className='row '  >
               
                <div className="row" >
                    <div className="col-md-12 col-lg-12 col-sm-12  d-flex justify-content-center flex-wrap ml-2">
                        <div className='offset-md-7 col-md-3 col-ms-3 col-lg-3 d-flex align-items-center justify-content-end flex-grow-1 '>

                        </div>
                        <div className=" col-md-2 col-sm-2 col-lg-2">
                            {/* <button className="btn btn-">New Instructor</button> */}
                            <Stack spacing={2} direction="row" sx={{ justifyContent: 'flex-end' }}>

                                <Button style={{ backgroundColor: "green" }} variant="contained" onClick={() => { handleaddUserShow() }}>Add User <AddCircleOutlineIcon /></Button>

                            </Stack>
                        </div>
                    </div>
                    <div className="col-md-12 col-lg-12 col-sm-12">
                        <div className="table-container" style={{ height: '90vh', overflowY: 'auto' }}>
                            {/* <table className="table table-bordered ">
                                <thead style={{ position: 'sticky', top: -2, zIndex: 3 }}>
                                    <tr>
                                        <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Name</th>
                                        <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Email Address</th>
                                        <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Role</th>
                                        <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Status</th>
                                        <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody style={{ zIndex: 1 }}>
                                    {userList.map((user, index) => (
                                        <tr key={index}>
                                            <td style={{ textAlign: 'left', verticalAlign: 'middle' }}>{user.name}</td>
                                            <td style={{ textAlign: 'left', verticalAlign: 'middle' }}>{user.email}</td>
                                            <td style={{ textAlign: 'left', verticalAlign: 'middle' }}>{user.userType}</td>
                                            <td style={{ textAlign: 'left', verticalAlign: 'middle' }}>
                                                {editIndex === index ? (
                                                    <select name='activeFlag' className="form-control" id="exampleSelect" onChange={(e) => handleStatusChange(e, index)} >

                                                        <option value="1">Active</option>
                                                        <option value="0">De-active</option>
                                                    </select>
                                                ) : (
                                                    user.activeFlag == '1' ? 'Active' : 'De-Active'
                                                )}
                                            </td>
                                            <td style={{ textAlign: 'left', verticalAlign: 'middle' }}>
                                                <button
                                                    style={{ background: 'transparent', border: 'none' }}
                                                    className="custom-button" title={editIndex === index ? 'Save' : 'Edit'}
                                                    onClick={() => (editIndex === index ? handleUserEdit(user.id, user.activeFlag) : handleEditClick(index))}
                                                >
                                                    <i
                                                        className={`fa ${editIndex === index ? 'fa-save' : 'fa-edit'} custom-icon`}
                                                        style={{ color: 'rgb(212, 139, 2)', fontSize: "14pt", padding: '2px' }}
                                                    ></i>
                                                </button>
                                                <button style={{ background: 'transparent', border: 'none' }} className="custom-button" title='Delete'><i class="fa fa-trash custom-icon" style={{ color: 'rgb(212, 139, 2)', fontSize: "14pt", padding: '2px' }} onClick={() => { handleUserDelete(user?.id) }}></i></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table> */}

                            {/* material ui */}
                            <TableContainer>
                                <Table className="table-bordered pt-1">
                                    <TableHead className="bg-theme-green text-white p-0" style={{ position: "sticky", top: -2, zIndex: 3 }}>
                                        <TableRow>
                                            {[
                                                { id: 'Name', label: 'Name' },
                                                { id: 'Email Address', label: 'Email Address' },
                                                { id: 'Role', label: 'Role' },
                                                { id: 'Status', label: 'Status' },
                                                { id: 'Action', label: 'Action' },
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
                                        {paginatedData.map((user, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{user.name}</TableCell>
                                                <TableCell>{user.email}</TableCell>
                                                <TableCell>{user.userType}</TableCell>

                                                <TableCell>
                                                    {editIndex === index ? (
                                                        <select name='activeFlag' className="form-control" id="exampleSelect" onChange={(e) => handleStatusChange(e, index)} >
                                                            <option value="">select</option>
                                                            <option value="1">Active</option>
                                                            <option value="0">De-active</option>
                                                        </select>
                                                    ) : (
                                                        user.activeFlag == '1' ? 'Active' : 'De-Active'
                                                    )}


                                                </TableCell>

                                                <TableCell>
                                                    <button
                                                        style={{ background: 'transparent', border: 'none' }}
                                                        className="custom-button" title={editIndex === index ? 'Save' : 'Edit'}
                                                        onClick={() => (editIndex === index ? handleUserEdit(user.id, user.activeFlag) : handleEditClick(index))}
                                                    >
                                                        <i
                                                            className={`fa ${editIndex === index ? 'fa-save' : 'fa-edit'} custom-icon`}
                                                            style={{ color: 'green', fontSize: "14pt", padding: '2px' }}
                                                        ></i>
                                                    </button>
                                                    <button style={{ background: 'transparent', border: 'none' }} className="custom-button" title='Delete'><i class="fa fa-trash custom-icon" style={{ color: 'green', fontSize: "14pt", padding: '2px' }} onClick={() => { handleUserDelete(user?.id) }}></i></button>

                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={userList.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />



                        </div>
                    </div>
                </div>
            </div>



            {/* Add user  */}

            <Modal show={showaddUser} onHide={handleaddUserClose} backdrop="static"
                keyboard={false}
                size='md'>

                <Modal.Body>

                    <div className='container-fluid'>
                        <div className='row'>
                            <div className=' col-md-12 mb-3' >
                                <h4>Add User</h4>
                            </div>
                            {/* <div className='col-md-12'> */}

                            {/* <div className='col-md-3 p-2'>
                                    Name
                                </div> */}
                            <div className='col-md-6 p-2'>
                                <div class="form-group w-100">
                                    <label for="name">Name</label>
                                    <input type="text" class="form-control"
                                        name='name'
                                        id='name'
                                        value={user?.name}
                                        onChange={handleAddUser}

                                    />
                                </div>
                                {errors.name && <p className="error">{errors.name}</p>}
                            </div>
                            {/* <div className='col-md-3 p-2'>
                                    Email
                                </div> */}
                            <div className='col-md-6 p-2'>
                                <div class="form-group w-100">
                                    <label for="email">Email address</label>
                                    <input type="email" class="form-control"
                                        name='email'
                                        id='email'
                                        value={user?.email}
                                        onChange={handleAddUser}

                                    />
                                </div>
                                {errors.email && <p className="error">{errors.email}</p>}
                            </div>
                            <div className='col-md-6 p-2'>
                                <div class="form-group w-100">
                                    <label for="phoneNumber">Phone Number</label>
                                    <input type="text" class="form-control"
                                        name='phoneNumber'
                                        id='phoneNumber'
                                        value={user?.phoneNumber}
                                        onChange={handleAddUser}

                                    />
                                </div>
                                {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
                            </div>
                            {/* <div className='col-md-3 p-2'>
                                    Role
                                </div> */}
                            <div className='col-md-6 p-2'>
                                <div class="form-group w-100">
                                    <label for="role">Role</label>
                                    <select
                                        name='role'
                                        value={user?.role}
                                        className="form-control" id="role"
                                        onChange={handleAddUser}
                                    >
                                        <option value="">---Select---</option>
                                        <option value="Mentor">Mentor</option>
                                        <option value="Admin">Admin</option>
                                        <option value="Student">Student</option>
                                        <option value="Placement">Placement Co-ordinator</option>
                                        <option value="Mentor_Assistant">Mentor Assistant</option>
                                    </select>
                                </div>
                                {errors.role && <p className="error">{errors.role}</p>}
                            </div>
                            {/* <div className='col-md-3 p-2'>
                                    Status
                                </div> */}
                            <div className='col-md-6 p-2'>
                                <div class="form-group w-100">
                                    <label for="status">Status</label>
                                    <select
                                        name='activeFlag'
                                        value={user?.activeFlag}
                                        className="form-control" id="status"
                                        onChange={handleAddUser}
                                    >
                                        <option value="">---Select---</option>
                                        <option value="1">Active</option>
                                        <option value="0">Inactive</option>
                                    </select>
                                </div>
                                {errors.activeFlag && <p className="error">{errors.activeFlag}</p>}
                            </div>

                            {/* </div>     */}
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button style={{ backgroundColor: "green" }} variant="contained" onClick={
                        () => {
                            // handleaddUserClose()
                            handleAddUserset()
                        }}>
                        Add User <AddCircleOutlineIcon />
                    </Button>
                    <Stack spacing={2} direction="row" >

                        <Button variant="secondary" onClick={() => {
                            setUser('')
                            handleaddUserClose()
                        }} >
                            Close
                        </Button>
                    </Stack>
                </Modal.Footer>
            </Modal>
            <ToastContainer />
        </>
    )
}