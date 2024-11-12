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

export default function Settings(){
  
  // Add instructor 
  const [showaddUser, setShowaddUser] = useState(false);
  const handleaddUserClose = () => setShowaddUser(false);
  const handleaddUserShow = () => setShowaddUser(true);

  const [user,setUser]=useState({
    name :"",
    email:"",
    phoneNumber:"",
    role:"",
    activeFlag:""
  })


  const handleAddUser = (e) => {
    const { name, value, type, files } = e.target;
    console.log(e.target.files)

    setUser({
        ...user,
        [name]: value
    });

};
const handleAddUserset =(e)=>{
    console.log('submit click');
    // axios.post(`${api}/student/getStudentList`, { course: coursedata, status: status })
    axios.post(`${api2}/user/addAllUser`,user)
        .then((Response) => {
            console.log(" data : ",Response.data);
            // handleMetorData()
            if(Response.data.status=='0'){
                toast.error("Email ID already exists!",{
                    position: "top-center",
                   });
            }
            else{
                toast.success("Insert Successfully!",{
                    position: "top-center",
                   });
                setUser('')   
                handleAllUserList()
            }
            
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

// User list view 
const [editIndex, setEditIndex] = useState(null);
const [userList, setUserList] = useState([
//   { name: "Chitradip Dey", email: "chitradip.dey@pentationanalytics.com", role: "Admin", status: "Active" },
//   { name: "Vaibhavi Patel", email: "vaibhavi@pentationanalytics.com", role: "User", status: "Active" },
//   { name: "Rishu Yadav", email: "rishu@pentationanalytics.com", role: "Student", status: "Active" }
]);

const handleEditClick = (index) => {
  setEditIndex(index);
};

const handleSaveClick = () => {
  setEditIndex(null);
};

const handleStatusChange = (e, index) => {
  const newStatus = [...userList];
  console.log(newStatus);
  newStatus[index].activeFlag = e.target.value;
  setUserList(userList);
};
const handleAllUserList = (e) => {
    console.log('submit click');
    axios.post(`${api2}/user/getAllUserDetails`, {})
        .then((Response) => {
            console.log(" data : ", Response.data.result);
            setUserList(Response.data.data);
            
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
useEffect(() => {
    handleAllUserList()
}, [])
useEffect(()=>{
    console.log('userlist')
},[userList])

// user delete status 
const handleUserDelete = (id) => {
    console.log('submit click');
    axios.post(`${api2}/user/deleteUser`, {id:id})
        .then((Response) => {
            console.log(" data : ", Response.data);
           
            handleAllUserList()
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

// user edit status 
const handleUserEdit = (id,flag) => {
    console.log('submit click');
    axios.post(`${api2}/user/editUser`, {id:id,activeFlag:flag})
        .then((Response) => {
            console.log(" data : ", Response.data);
            setEditIndex(null);
            handleAllUserList()

        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

    return(
        <>
        <div className='row ' style={{marginTop:'58px'}} >
            <div className='row '>
                    <div className='container-fluid'>
                        <div className=' col-md-12 col-lg-12 col-sm-12 headLineBox d-flex justify-content-start'  >
                            <h4>Settings</h4>
                        </div>
                    </div>
            </div>
            <div className="row" style={{marginTop:'20px'}}>
                <div className="col-md-12 col-lg-12 col-sm-12  d-flex justify-content-center flex-wrap ml-2">
                    <div className='offset-md-7 col-md-3 col-ms-3 col-lg-3 d-flex align-items-center justify-content-end flex-grow-1 '>
                            {/* <input type="text" className="form-control pl-2 pr-5" placeholder='Search here'
                            //  value={searchquery} onChange={inputChange} 
                             /> */}
                            {/* <div className=''>
                                <CiSearch className="search-btn" />
                            </div> */}
                    </div>
                    <div className=" col-md-2 col-sm-2 col-lg-2">
                        {/* <button className="btn btn-">New Instructor</button> */}
                        <Stack spacing={2} direction="row" sx={{ justifyContent: 'flex-end' }}>
                        
                        <Button variant="contained" onClick={()=>{handleaddUserShow()}}>Add User</Button>
                        
                        </Stack>
                    </div>
                </div>
                <div className="col-md-12 col-lg-12 col-sm-12">
                    <div className="table-container" style={{height:'90vh',overflowY:'auto'}}>
                            <table className="table table-bordered ">
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
                                            <select  name='activeFlag' className="form-control" id="exampleSelect" onChange={(e) => handleStatusChange(e, index)} >
                                            
                                            <option value="1">Active</option>
                                            <option value="0">De-active</option>
                                            </select>
                                        ) : (
                                            user.activeFlag=='1'?'Active':'De-Active'
                                        )}
                                        </td>
                                        <td style={{ textAlign: 'left', verticalAlign: 'middle' }}>
                                        <button
                                            style={{ background: 'transparent', border: 'none' }}
                                            className="custom-button" title={editIndex === index ? 'Save' : 'Edit'}
                                            onClick={() => (editIndex === index ? handleUserEdit(user.id,user.activeFlag) : handleEditClick(index))}
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
                            </table>
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
                        <div  className='row'>
                            <div className=' col-md-12 headLineBox mb-3' >
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
                                            onChange={handleAddUser }
                                            
                                        />
                                    </div>
                                </div>
                                {/* <div className='col-md-3 p-2'>
                                    Email
                                </div> */}
                                <div className='col-md-6 p-2'>
                                    <div class="form-group w-100">
                                    <label for="email">Email address</label>
                                        <input type="text" class="form-control"
                                            name='email'
                                            id='email'
                                            value={user?.email}
                                            onChange={handleAddUser }
                                            
                                        />
                                    </div>
                                </div>
                                <div className='col-md-6 p-2'>
                                    <div class="form-group w-100">
                                    <label for="phoneNumber">Phone Number</label>
                                        <input type="text" class="form-control"
                                            name='phoneNumber'
                                            id='phoneNumber'
                                            value={user?.phoneNumber}
                                            onChange={handleAddUser }
                                            
                                        />
                                    </div>
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
                                        </select>
                                    </div>
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
                                </div>
                            
                            {/* </div>     */}
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                     <Button variant="contained" onClick={
                        ()=>{
                            handleaddUserClose()
                            handleAddUserset()
                        }}>
                        Add User
                    </Button>
                    <Stack spacing={2} direction="row" >
                   
                    <Button variant="secondary" onClick={handleaddUserClose} >
                        Close
                    </Button>
                    </Stack>
                </Modal.Footer>
            </Modal>
            <ToastContainer />  
        </>
    )
}