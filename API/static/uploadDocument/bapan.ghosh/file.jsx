
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { FormControl,MenuItem,Select,InputLabel } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { api2 } from '../ApiUrl/ApiUrl';

import { button, Modal } from 'react-bootstrap';

import ScheduleEmChip from '../components/Meeting/ScheduleEmChip';
export default function Courses(){
    const [courseList,setCourseList]=useState([]);

    const handleAllCourseList = (e) => {
        console.log('submit click');
        axios.post(`${api2}/course/getCourseList`, {})
            .then((Response) => {
                console.log(" data : ",Response.data);
                setCourseList(Response.data.result);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    useEffect(()=>{
        handleAllCourseList()
    },[])

    // add course 

    const [showAddCourse, setShowAddCourse] = useState(false);
    const handleAddCourseClose = () => setShowAddCourse(false);
    const handleAddCourseShow = () => setShowAddCourse(true);
    const [addCourseDetails, setAddCourseDetails] = useState({
        courseName: '',
        code: '',
        description: '',
        content: null,
    });
    const handleAddCourse = (e) => {
        const { name, value, type, files } = e.target;
        console.log(e.target.files)
        setAddCourseDetails({
            ...addCourseDetails,
            [name]: type === 'file' ?files[0]  : value
        });
    };
    const handleAddCourseData = (e) => {
        console.log('submit click');
        axios.post(`${api2}/course/addCourse`, addCourseDetails)
            .then((Response) => {
                console.log(" data : ",Response.data);
                setCourseList(Response.data.result);
                handleAllCourseList()
                
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    
const handleCourseContent = (e) => {
        const data = new FormData();
        data.append('courseName', addCourseDetails.courseName);
        // data.append('fileType', 'Co');
        data.append('file', addCourseDetails.content);
 
        console.log(data);
        axios.post(`${api2}/course/courseDocumentUpload`, data, {})
            .then((Response) => {
                console.log(Response.data);
 
 
            }).catch(error => {
                console.log(error);
            });
    }
    useEffect(()=>{
        handleCourseContent()
    },[addCourseDetails.content])
 
 

    // edit course 
    const [showEditCourse, setShowEditCourse] = useState(false);
    const handleEditCourseClose = () => setShowEditCourse(false);
    const handleEditCourseShow = () => {
        console.log('edit click')
        setShowEditCourse(true)};

    const [editCourseDetails, setEditCourseDetails] = useState({
        courseName: '',
        code: '',
        description: '',
        content: null,
        activeFlag:'',
        id:'',
        delete:''
    });
    const handleEditCourse = (e) => {
        const { name, value, type, files } = e.target;
        console.log(e.target.files)
        setEditCourseDetails({
            ...editCourseDetails,
            [name]: type === 'file' ?files[0]  : value
        });
    };
    const handleCourseContentEdit = (e) => {
        const data = new FormData();
        data.append('courseName', editCourseDetails.courseName);
        // data.append('fileType', 'Co');
        data.append('file', editCourseDetails.content);
 
        console.log(data);
        axios.post(`${api2}/course/courseDocumentUpload`, data, {})
            .then((Response) => {
                console.log(Response.data);
 
 
            }).catch(error => {
                console.log(error);
            });
    }
    useEffect(()=>{
        handleCourseContentEdit()
    },[editCourseDetails.content])
    const handleEditCourseData = (e) => {
        console.log('submit click');
        axios.post(`${api2}/course/editDeleteCourse`, {
            courseName:editCourseDetails.courseName,
            code:editCourseDetails.code,
            description:editCourseDetails.description,
            
            activeFlag:editCourseDetails.activeFlag,
            delete:0,
            id:editCourseDetails?.id

        })
            .then((Response) => {
                console.log(" data : ",Response.data);
                // setCourseList(Response.data.result);
                handleAllCourseList()
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    const handleDeleteCourse=(courseName,code,description,activeFlag,id)=>{
        axios.post(`${api2}/course/editDeleteCourse`, {
            courseName:courseName,
            code:code,
            description:description,
        
            activeFlag:activeFlag,
            delete:1,
            id:id

        })
            .then((Response) => {
                console.log(" data : ",Response.data);
                // setCourseList(Response.data.result);
                handleAllCourseList()
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    {/* View Course details  */}
    const [showViewCourse, setShowViewCourse] = useState(false);
    const handleViewCourseClose = () => setShowViewCourse(false);
    const handleViewCourseShow = () =>setShowViewCourse(true)
    const [viewCourse,setViewCourse]=useState({})
    const [individualEm,setIndividualEm]=useState([])
    const viewDoc= (foldername)=>{
        window.open(window.open(`${api2}/static/courseDetails/` + foldername ))
    }
    const sendEmailCourse=(id)=>{
        console.log('submit click',id);
        axios.post(`${api2}/course/send-email`, {
            
            id:id,
            email:individualEm

        })
            .then((Response) => {
                console.log(" data : ",Response.data);
                // setCourseList(Response.data.result);
                handleAllCourseList()
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
                            <h4>Courses</h4>
                        </div>
                    </div>
            </div>
            <div className="row" style={{marginTop:'20px'}}>
                <div className="col-md-12 col-lg-12 col-sm-12 pb-2">
                    <div className="offset-md-7 col-md-5 col-sm-5 col-lg-5">
                        
                        <Stack spacing={2} direction="row" sx={{ justifyContent: 'flex-end' }}>
                        
                        <Button variant="contained" onClick={()=>{
                           handleAddCourseShow() 
                            }}>Add Course</Button>
                        
                        </Stack>
                    </div>
                </div>
                <div className="col-md-12 col-lg-12 col-sm-12">
                <div className="table-container" style={{height:'90vh',overflowY:'auto'}}>
                            <table className="table table-bordered pt-1" >
                                <thead  style={{position:'sticky',top:-2,zIndex:3}}>
                                    <tr>
                                    <th>Courses</th>
                                        <th >Code</th>
                                        <th >Updated On</th>
                                        <th >Status</th>
                                        <th >Action</th>
                                       
                                      
                                    </tr>
                                </thead>
                                
                                <tbody style={{zIndex:1}}>
                                    {courseList?.map(courseList=>{
                                        return(
                                            <>
                                                <tr>
                                                    <td>{courseList?.courseName}</td>
                                                    <td>{courseList?.code}</td>
                                                    <td>1/2/2024</td>
                                                    <td>{
                                                    courseList?.activeFlag ? 'Active' : 'De-Active'
                                                    // courseList?.activeFlag == '0' ? <p>De-Active</p> :
                                                    // courseList?.activeFlag == '1' ? <p>Active</p> : 
                                                    // courseList?.activeFlag == '2' ? <p>Pending</p> :''
                                                    // (()=>{
                                                    //     if(courseList?.activeFlag==='0'){
                                                    //         return (<><p style={{backgroundColor:'lightgray'}}>De-Active</p> </>)
                                                    //     }
                                                    //     else if(courseList?.activeFlag==='1'){
                                                    //         return (<><p style={{backgroundColor:'green'}}>Active</p> </>)
                                                    //     }
                                                    //     else if(courseList?.activeFlag==='2') {
                                                    //        return (<p style={{backgroundColor:'red'}}> Pending</p>)
                                                    //     }
                                                    // })()
                                                    
                                                    }</td>
                                                    <td><button style={{ background: 'transparent', border: 'none' }}><i class="fa fa-edit" style={{ color: 'rgb(212, 139, 2)', fontSize: "14pt", padding: '2px' }} onClick={()=>{
                                                        // handleEditCourseData(courseList?.id)
                                                        handleEditCourseShow()
                                                        setEditCourseDetails({
                                                            courseName: courseList?.courseName,
                                                            code: courseList?.code,
                                                            description: courseList?.description,
                                                            // content: courseList?.description,
                                                            activeFlag:courseList?.activeFlag,
                                                            id:courseList?.id,
                                                            
                                                        })
                                                    }}></i></button>
                                                    <button style={{ background: 'transparent', border: 'none' }}><i class="fa fa-trash" style={{ color: 'rgb(212, 139, 2)', fontSize: "14pt", padding: '2px' }} onClick={()=>{handleDeleteCourse(
                                                        
                                                             courseList?.courseName,
                                                             courseList?.code,
                                                             courseList?.description,
                                                            //  courseList?.description,
                                                            courseList?.activeFlag,
                                                            courseList?.id,
                                                            
                                                        
                                                    )}}></i></button>
                                                    <button style={{ background: 'transparent', border: 'none' }}><i class="fa fa-eye" style={{ color: 'rgb(212, 139, 2)', fontSize: "14pt", padding: '2px' }} onClick={()=>{
                                                        // handleEditCourseData(courseList?.id)
                                                        handleViewCourseShow()
                                                        // setEditCourseDetails({
                                                        //     courseName: courseList?.courseName,
                                                        //     code: courseList?.code,
                                                        //     description: courseList?.description,
                                                        //     // content: courseList?.description,
                                                        //     activeFlag:courseList?.activeFlag,
                                                        //     id:courseList?.id,
                                                            
                                                        // })
                                                        setViewCourse({
                                                            courseName:courseList?.courseName,
                                                            courseCode:courseList?.code,
                                                            courseDesc:courseList?.description,
                                                            courseDocFolder:courseList?.folderName,
                                                            id:courseList?.id
                                                        })
                                                    }}></i></button>
                                                    </td>
                                                </tr>
                                            </>
                                        )
                                    })}
                                    {/* <tr>
                                        <td>BIM Ready Plus1</td>
                                        <td>BIM1</td>
                                        <td>01/02/2024</td>
                                        <td>Active</td>
                                        <td><button style={{ background: 'transparent', border: 'none' }}><i class="fa fa-edit" style={{ color: 'rgb(212, 139, 2)', fontSize: "14pt", padding: '2px' }}></i></button></td>
                                    </tr>
                                    <tr>
                                        <td>BIM Ready</td>
                                        <td>BIM1</td>
                                        <td>01/02/2024</td>
                                        <td>Active</td>
                                        <td><button style={{ background: 'transparent', border: 'none' }}><i class="fa fa-edit" style={{ color: 'rgb(212, 139, 2)', fontSize: "14pt", padding: '2px' }}></i></button>
                                        <button style={{ background: 'transparent', border: 'none' }}><i class="fa fa-trash" style={{ color: 'rgb(212, 139, 2)', fontSize: "14pt", padding: '2px' }}></i></button>
                                        </td>
                                    </tr> */}
                                    
                                    
                                </tbody>
                            </table>
                        </div>
                </div>
            </div>
        </div>
        
        {/* Add Course  */}

        <Modal show={showAddCourse} onHide={handleAddCourseClose} backdrop="static"
                keyboard={false}
                size='lg'>
                {/* <Modal.Header closeButton>
                    <Modal.Title>Modal Heading</Modal.Title>
                </Modal.Header> */}
                <Modal.Body>
                    
                    <div className='container-fluid'>
                        <div  className='row'>
                            <div className=' col-md-12 headLineBox mb-3' >
                                <h4>Add Course</h4>
                            </div>
                            <div className='col-md-3 p-2'>
                                New Course
                            </div>
                            <div className='col-md-3 p-2'>
                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='courseName'
                                        value={addCourseDetails?.courseName}
                                        onChange={handleAddCourse }
                                        required
                                    />
                                </div>
                            </div>
                            <div className='col-md-3 p-2'>
                                Course Code
                            </div>
                            <div className='col-md-3 p-2'>
                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='code'
                                        value={addCourseDetails?.code}
                                        onChange={handleAddCourse }
                                        required
                                    />
                                </div>
                            </div>
                            <div className='col-md-3 p-2'>
                                Course Description
                            </div>
                            <div className='col-md-9 p-2'>
                                <div class="input-group ">
                                    <textarea class="form-control" rows="5" id="comment" name='description' onChange={handleAddCourse} value={addCourseDetails?.description}></textarea>
                                </div>
                            </div>
                            <div className='col-md-3 p-2'>
                                Attach Content
                            </div>
                            <div className='col-md-5 p-2'>
                                <div class="input-group ">
                                <input type="file" name='content' class="form-control-file" id="exampleFormControlFile1"  
                                onChange={handleAddCourse }
                                />
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                     {/* <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button> */}
                    <Stack spacing={2} direction="row" >
                    <Button variant="contained" onClick={()=>{
                        handleAddCourseData()
                        // handleInsReviewClose()
                    }}>Add</Button>
                    {/* <Button variant="contained" color="success">
                    Prev
                    </Button> */}
                    <Button variant="secondary" 
                    onClick={()=>{handleAddCourseClose()}}
                     >
                        Close
                    </Button>
                    </Stack>
                </Modal.Footer>
        </Modal>

        {/* Edit Cource  */}
        <Modal show={showEditCourse} onHide={handleEditCourseClose} backdrop="static"
                keyboard={false}
                size='lg'>
                {/* <Modal.Header closeButton>
                    <Modal.Title>Modal Heading</Modal.Title>
                </Modal.Header> */}
                <Modal.Body>
                    
                    <div className='container-fluid'>
                        <div  className='row'>
                            {/* <div className='container-fluid'> */}

                                <div className=' col-md-12 headLineBox mb-3' >
                                    <h4>Edit Course</h4>
                                </div>

                            {/* </div> */}
                            <div className='col-md-3 p-2'>
                                New Course
                            </div>
                            <div className='col-md-3 p-2'>
                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='courseName'
                                        value={editCourseDetails?.courseName}
                                        onChange={handleEditCourse }
                                    />
                                </div>
                            </div>
                            <div className='col-md-3 p-2'>
                                Course Code
                            </div>
                            <div className='col-md-3 p-2'>
                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='code'
                                        value={editCourseDetails?.code}
                                        onChange={handleEditCourse }
                                        
                                    />
                                </div>
                            </div>
                            <div className='col-md-3 p-2'>
                                Course Description
                            </div>
                            <div className='col-md-9 p-2'>
                                <div class="input-group ">
                                    <textarea class="form-control" rows="5" id="comment" name='description' onChange={handleEditCourse} value={editCourseDetails?.description}></textarea>
                                </div>
                            </div>
                            <div className='col-md-3 p-2'>
                                Status
                            </div>
                            <div className='col-md-3 p-2'>
                               {/* {console.log(editCourseDetails)} */}
                                <select name='activeFlag' value={editCourseDetails?.activeFlag}  onChange={handleEditCourse } class="form-control" id="exampleFormControlSelect1">
                                    <option value=''>---select---</option>
                                        <option value={1}>Active</option>
                                        <option value={0}>De-Active</option>
                                </select>
                            </div>
                            <div className='col-md-3 p-2'>
                                Attach Content
                            </div>
                            <div className='col-md-3 p-2'>
                                <div class="input-group ">
                                <input type="file" name='content' class="form-control-file" id="exampleFormControlFile1"  
                                onChange={handleEditCourse }
                                />
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                     {/* <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button> */}
                    <Stack spacing={2} direction="row" >
                    <Button variant="contained" onClick={()=>{
                        // handleAddCourseData()
                        // handleInsReviewClose()
                        handleEditCourseData()
                    }}>Update</Button>
                    {/* <Button variant="contained" color="success">
                    Prev
                    </Button> */}
                    <Button variant="secondary" 
                    onClick={()=>{handleEditCourseClose()}}
                     >
                        Close
                    </Button>
                    </Stack>
                </Modal.Footer>
        </Modal>

        {/* View Course details  */}
        <Modal show={showViewCourse} onHide={handleViewCourseClose} backdrop="static"
                keyboard={false}
                size='lg'>
                {/* <Modal.Header closeButton>
                    <Modal.Title>Modal Heading</Modal.Title>
                </Modal.Header> */}
                <Modal.Body>
                    
                    <div className='container-fluid'>
                        <div  className='row'>
                            <div className=' col-md-12 headLineBox mb-3' >
                                <h4>Course Details</h4>
                            </div>
                            <div className='col-md-2 p-2'>
                                 Course Name
                            </div>
                            <div className='col-md-4 p-2'>
                                {/* <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='courseName'
                                        value={addCourseDetails?.courseName}
                                        onChange={handleAddCourse }
                                        // required
                                    />
                                </div> */}
                                <div>
                                    <p>{viewCourse?.courseName}</p>
                                </div>
                            </div>
                            <div className='col-md-2 p-2'>
                                Course Code
                            </div>
                            <div className='col-md-4 p-2'>
                                {/* <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='code'
                                        value={addCourseDetails?.code}
                                        onChange={handleAddCourse }
                                        // required
                                    />
                                </div> */}
                                <div>
                                    <p>{viewCourse?.courseCode}</p>
                                </div>
                            </div>
                            <div className='col-md-2 p-2'>
                                Course Description
                            </div>
                            <div className='col-md-10 p-2'>
                                {/* <div class="input-group ">
                                    <textarea class="form-control" rows="5" id="comment" name='description' onChange={handleAddCourse} value={addCourseDetails?.description}></textarea>
                                </div> */}
                                <p>{viewCourse?.courseDesc}</p>
                            </div>
                            <div className='col-md-2 p-2'>
                                email
                            </div>
                            <div className='col-md-4 p-2'>
                                {/* <div class="input-group ">
                                    <input type="email" class="form-control"
                                        name='email'
                                        // value={addCourseDetails?.code}
                                        // onChange={handleAddCourse }
                                        // required
                                    />
                                </div> */}
                                <ScheduleEmChip individualEm={individualEm} setIndividualEm={setIndividualEm} />
                            </div>
                            {/* <div className='col-md-2 p-2'>
                                View Doc
                            </div> */}
                            <div className='col-md-4 p-2'>
                                <div class="input-group ">
                                    <button className='btn btn-light' onClick={
                                        ()=>{viewDoc(viewCourse?.courseDocFolder)}}>View Doc</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                     {/* <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button> */}
                    <Stack spacing={2} direction="row" >
                    <Button variant="contained" onClick={()=>{
                        sendEmailCourse(viewCourse?.id)
                        // handleInsReviewClose()
                    }}>Send</Button>
                    {/* <Button variant="contained" color="success">
                    Prev
                    </Button> */}
                    <Button variant="secondary" 
                    onClick={()=>{handleViewCourseClose()}}
                     >
                        Close
                    </Button>
                    </Stack>
                </Modal.Footer>
        </Modal>
        </>
    )
}