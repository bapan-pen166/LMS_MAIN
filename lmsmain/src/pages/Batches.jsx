import React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useState, useContext } from 'react';
import { button, Modal } from 'react-bootstrap';
import { api2 } from '../ApiUrl/ApiUrl';
import axios from 'axios';
import { FormControl, MenuItem, Select, InputLabel } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { useEffect } from 'react';
import Courses from './Courses';
import { CiSearch } from "react-icons/ci";
import CloseIcon from '@mui/icons-material/Close';

import '../../src/assets/css/Custom_Global_Style/Global.css';
import PageNotFound from '../ErrorPage/PageNotFound';
import * as Yup from 'yup';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import InstructorCard from '../components/Batches/BatchCard';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { faIdBadge, faPencil, faPeopleGroup, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import BatchStudentDetails from '../components/Batches/StudentsDetails';
import BatchMentorDetails from '../components/Batches/BatchMentorDetails';
import Student_courses from '../Student_section/Pages/Student_courses';
import { Datacontext } from '../Context';
// import "../../assets/css/TableStyle/TableStyle.css"


import {

    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TablePagination,

    TextField, IconButton,

} from '@mui/material';
import DownloadForOfflineOutlinedIcon from '@mui/icons-material/DownloadForOfflineOutlined';

import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';

import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { visuallyHidden } from '@mui/utils';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';



function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


export default function Batches() {

    // For the search 
    const [searchres, setSearchres] = useState([]);
    const [searchquery, setSearchquery] = useState('');
    const [isLoading, setIsLoading] = useState(true);



    // Add Batches 

    const [showAddBatches, setShowAddBatches] = useState(false);
    const handleAddBatchesClose = () => setShowAddBatches(false);
    const handleAddBatchesShow = () => setShowAddBatches(true);
    const [courseList, setCourseList] = useState([]);
    const [courselistAllObj, setCourseListAllObj] = useState([]);
    const [courselistAll, setCourseListAll] = useState([]);


    const { batchselect, setBatchselect } = useContext(Datacontext);




    // for the page validatin userType
    const [userType, setUserType] = useState('');


    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const handleAllCourseList = (e) => {
        console.log('submit click');
        // axios.post(`${api}/student/getStudentList`, { course: coursedata, status: status })
        axios.post(`${api2}/course/getCourseList`, {})
            .then((Response) => {
                console.log(" data : ", Response.data);
                setCourseListAllObj(Response.data.result);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    const handleChangeCourse = (e) => {
        const selectedCourse = e.target.value;

        // Set courseList as an array with a single item
        setCourseList(selectedCourse ? [selectedCourse] : []);
    };


    useEffect(() => {
        handleAllCourseList()
    }, [])
    useEffect(() => {
        setCourseListAll(courselistAllObj.map(result => result.courseName));
    }, [courselistAllObj])

    const [mentorList, setMentorList] = useState([{ id: '', name: 'select' }]);
    // const [courseList,setCourseList]=useState([]);
    const [mentorlistAllObj, setMentorListAllObj] = useState([]);
    const [mentorlistAll, setMentorListAll] = useState([]);

    function handleMetorData() {
        console.log('submit click');
        // axios.post(`${api}/student/getStudentList`, { course: coursedata, status: status })
        axios.post(`${api2}/mentor/getMentorBasicList`, {})
            .then((Response) => {
                console.log(" data : ", Response.data);
                setMentorListAllObj(Response.data.result);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    // const handleMentorChange = (event) => {
    //     setMentorList(event.target.value);
    //   };

    // useEffect(()=>{
    //     setMentorListAll( mentorlistAllObj.map(result => result.name));
    //     },[mentorlistAllObj])



    useEffect(() => {
        const newMentorList = mentorlistAllObj.map(result => ({
            name: result.name,
            id: result.id
        }));
        setMentorListAll(newMentorList);
    }, [mentorlistAllObj]);


    const handleMentorChange = (event) => {
        const selectedNames = event.target.value;
        const selectedMentors = selectedNames.map(name => {
            const mentor = mentorlistAll.find(mentor => mentor.name === name);
            if (mentor) {
                return { id: mentor.id, name: mentor.name };
            }
            return null;
        }).filter(mentor => mentor !== null);
        setMentorList(selectedMentors);
    };

    useEffect(() => {
        handleMetorData()
    }, [])

    // const [assistantMentorObj,setAssistantMentorObj]=useState('');
    const [mentorAssistantList, setMentorAssistantList] = useState([]);
    function handleAssistantMetorData() {
        console.log('submit click');
        // axios.post(`${api}/student/getStudentList`, { course: coursedata, status: status })
        axios.post(`${api2}/mentor/getAssistantMentorBasicList`, {})
            .then((Response) => {
                console.log(" data : ", Response.data);
                setMentorAssistant(Response.data.result);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    useEffect(() => {
        handleAssistantMetorData()
    }, [])



    const [mentorAssistant, setMentorAssistant] = useState([
        // {id:1,name:'Sumit Singh',email:'sumit@gmail.com'},
        // {id:2,name:'Sonali Roy',email:'sonali@gmail.com'},
        // {id:2,name:'Raju Rawat',email:'Raju@gmail.com'},

    ])

    const handleMentorAssistantChange = (event) => {
        const selectedNames = event.target.value;
        const selectedMentors = selectedNames.map(name => {
            const mentor = mentorAssistant.find(mentor => mentor.name === name);
            if (mentor) {
                return { id: mentor.id, name: mentor.name };
            }
            return null;
        }).filter(mentor => mentor !== null);
        setMentorAssistantList(selectedMentors);
    };

    const [addBatchDetails, setAddBatchDetails] = useState({
        batchName: '',
        activeFlag: '',

    });



    // For the validations  ==>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    const [errors, setErrors] = useState({});

    const validationSchema = Yup.object({
        batchName: Yup.string().required("Batch name is required"),
        activeFlag: Yup.string().required("Status is required"),

        courseList: Yup.array()
            .of(Yup.string()) // Ensures each item in the array is a string
            .min(1, "Course list is required")
            .required("Course list is required"),

        mentorList: Yup.array()
            .of(Yup.object({
                name: Yup.string().required("Mentor name is required"),
                id: Yup.string().required("Mentor ID is required"),
            }))
            .min(1, "Mentor list is required")
            .required("Mentor list is required"),
        startDate: Yup.string().required("Start Date is required"),
        endDate: Yup.string().required("End Date is required"),
    });


    const handleAddBatch = (e) => {
        const { name, value, type, files } = e.target;
        console.log(e.target.files)
        setAddBatchDetails({
            ...addBatchDetails,
            [name]: type === 'file' ? files[0] : value
        });
    };


    const handleAddBatchData = async (e) => {
        e?.preventDefault();

        // Clear previous errors
        setErrors({});

        try {
            // Validate form data
            await validationSchema.validate({ ...addBatchDetails, courseList, mentorList }, { abortEarly: false });
            console.log("Form submitted", addBatchDetails);

            // Submit form data
            const response = await axios.post(`${api2}/course/addBatch`, {
                batchName: addBatchDetails.batchName,
                activeFlag: addBatchDetails.activeFlag,
                courseName: courseList,
                mentorName: mentorList,
                startDate: addBatchDetails.startDate,
                endDate: addBatchDetails.endDate,
                assistant_mentor: mentorAssistantList
            });

            // Handle the response
            console.log("Data:", response.data);
            // handleAllBatchList();
            if (response.data.status == 1 && response.data.success == true) {
                toast.success("Batch details added successfully!", {
                    position: "top-center",
                    style: { fontWeight: 'bold' },
                });
                handleAddBatchesClose()
                setMentorList([])
                setMentorAssistantList([])
                setAddBatchDetails({})
                handlebatchcountsData()
                handleAllBatchList();
            }
            else if (response.data.status == 1 && response.data.success == false) {
                toast.error("Batch has been already exixts", {
                    position: "top-center",
                    style: { fontWeight: 'bold' },
                });
            }


        } catch (error) {
            if (error.name === 'ValidationError') {
                console.log(error.inner);
                const newErrors = {};
                error.inner.forEach(element => {
                    newErrors[element.path] = element.message;
                });
                setErrors(newErrors); // Update error state
            } else {
                console.error('Error:', error);
                toast.error("An error occurred while adding the batch details.", {
                    position: "top-center",
                    style: { fontWeight: 'bold' },
                });
            }
        }
    };


    //  View BatchList 
    const [BatchDetails, setBatchDetails] = useState([]);



    const handleAllBatchList = (e) => {
        console.log('submit click');
        axios.post(`${api2}/course/getAllBatchList`, {})
            .then((Response) => {
                console.log(" data : ", Response.data.result);
                setBatchDetails(Response.data.result);
                setSearchres(Response.data.result)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    useEffect(() => {
        handleAllBatchList()
    }, [])

    // Edit batches 

    const [showEditBatches, setShowEditBatches] = useState(false);
    const handleEditBatchesClose = () => setShowEditBatches(false);
    const handleEditBatchesShow = () => setShowEditBatches(true);

    const [editBatchDetails, setEditBatchDetails] = useState({
        batchName: '',
        activeFlag: '',
        id: ''

    });
    const [editCourse, setEditCourse] = useState();
    const handleEditBatch = (e) => {
        const { name, value, type, files } = e.target;
        console.log(e.target.files)
        setEditBatchDetails({
            ...editBatchDetails,
            [name]: type === 'file' ? files[0] : value
        });
    };
    const handleEditBatchData = (id) => {
        console.log('submit click');
        axios.post(`${api2}/course/editBatch`, {
            batchName: editBatchDetails.batchName,
            courseName: editCourse,
            mentorName: mentorList,
            assistant_mentor: mentorAssistantList,
            activeFlag: editBatchDetails.activeFlag,
            id: id


        })
            .then((Response) => {
                console.log(" data : ", Response.data);
                // setCourseList(Response.data.result);
                handleAllBatchList()
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    const handleDeleteBatch = (id) => {
        console.log('submit click');
        axios.post(`${api2}/course/deleteBatch`, {
            id: id
        })
            .then((Response) => {
                console.log(" data : ", Response.data);
                // setCourseList(Response.data.result);
                handleAllBatchList()
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }


    // input change for search

    const inputChange = (e) => {
        const query = e.target.value;
        setSearchquery(query);

        if (query === '') {
            handleAllBatchList();
        } else {
            const filterData = searchres.filter((f) => {
                return (
                    (f.batchName && f.batchName.toLowerCase().includes(query.toLowerCase())) ||
                    (f.courseType && f.courseType.toLowerCase().includes(query.toLowerCase()))
                );
            });
            setBatchDetails(filterData);
        }
    };

    const [clickedRow, setClickedRow] = useState(null); // State to track the clicked row

    const handleRowClick = (rowId) => {
        setClickedRow(rowId);
        console.log(`Row with ID ${rowId} clicked`);
    };

    const [batchCountData, setBatchCountData] = useState();

    const handlebatchcountsData = () => {
        console.log('assignment score called')
        axios.post(`${api2}/batch/getBatchStudentMentorData`, {})
            .then((response) => {
                // console.log(response.data[0])
                setBatchCountData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    useEffect(() => {
        handlebatchcountsData()
    }, []);


    //   Batch Details modal 
    const [showBatchDetails, setShowBatchDetails] = useState(false);
    const handleBatchDetailsClose = () => setShowBatchDetails(false);
    const handleBatchDetailsShow = () => setShowBatchDetails(true);





    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const [batchData, setBatchData] = useState();
    const [batchStudentDetails, setBatchStudentDetails] = useState()
    const [batchMentorDetails, setBatchMentorDetails] = useState()

    const handlebatchData = (id) => {
        console.log('assignment score called')
        axios.post(`${api2}/batch/getBatchAllStudentDataList`, { id: id })
            .then((response) => {
                // console.log(response.data[0])
                setBatchStudentDetails(response.data.students);
                setBatchMentorDetails(response.data.mentors);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    useEffect(() => {
        handlebatchcountsData()
    }, []);



    // for the page validatin userType

    useEffect(() => {
        const type = localStorage.getItem('userType');
        setUserType(type);
        setIsLoading(false);
    }, []);

    if (isLoading) {
        return <div>loading...</div>;
    }

    if (userType !== 'Admin') {
        return <PageNotFound />
    }


    return (
        <>
            <div className='row ' >
                {/* <div className='row '>
                    <div className='container-fluid'>
                        <div className=' col-md-12 col-lg-12 col-sm-12 headLineBox d-flex justify-content-start'  >
                            <h4>Batches</h4>
                        </div>
                    </div>
                </div> */}
                <div className="row container-fluid">
                    <div class="row g-2 container-fluid">
                        <div class="col-sm-6 col-lg-6">
                            <div className="card mb-1">
                                <div className="d-flex justify-content-between align-items-center p-3 bg-orange bg-opacity-15 rounded-3 " >
                                    <span className="text-orange">
                                        <FontAwesomeIcon style={{ fontSize: "5vw" }} icon={faPeopleGroup} />
                                    </span>
                                    <div className="ms-4">
                                        <h5 className="purecounter fw-bold pb-2" style={{ fontSize: "1.5vw" }}>Total Batches</h5>
                                        <p className="mb-0 h6 fw-light"> {batchCountData?.totalBatchCount}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-6 col-lg-6">
                            <div className="card mb-1">
                                <div className="d-flex justify-content-between align-items-center p-3 bg-purple bg-opacity-15 rounded-3">
                                    <span className="text-purple">
                                        <FontAwesomeIcon style={{ fontSize: "5vw" }} icon={faChartLine} />
                                    </span>
                                    <div className="ms-4">
                                        <h5 className="purecounter fw-bold pb-2" style={{ fontSize: "1.5vw" }}>Active Batches</h5>
                                        <p className="mb-0 h6 fw-light">{batchCountData?.totalActiveBatchCount}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="row container-fluid" style={{ marginTop: '20px' }}>
                    <div className="row">
                        <div className="col-md-6 pl-6">
                            <div className="d-flex align-items-center pl-3">
                                <TextField

                                    label="Search"

                                    variant="outlined"

                                    value={searchquery}

                                    onChange={inputChange}
                                    fullWidth 

                                    style={{ marginBottom: '16px' }}

                                    InputLabelProps={{

                                        style: { top: '-5px' }

                                    }}

                                />
                            </div>
                        </div>
                        <div className=" col-md-6 col-sm-6 col-lg-6">

                            <Stack spacing={2} direction="row" sx={{ justifyContent: 'flex-end' }}>

                                <Button style={{ backgroundColor: "rgb(32, 109, 50)",paddingRight:"10px" }} variant="contained" onClick={() => {
                                    handleAddBatchesShow()
                                }}>Add Batch <AddCircleOutlineIcon /></Button>

                            </Stack>
                        </div>
                    </div>


                    <div className="col-md-12 col-lg-12 col-sm-12">

                        <div className="row" style={{ height: '90vh', overflowY: 'auto' }}>
                            {BatchDetails.map((Batch, index) => (
                                <div className="col-md-4" key={index}>
                                    <InstructorCard {...Batch} handleEditBatchesShow={handleEditBatchesShow} setEditBatchDetails={setEditBatchDetails} setMentorList={setMentorList} setEditCourse={setEditCourse} handleDeleteBatch={handleDeleteBatch} handleBatchDetailsShow={handleBatchDetailsShow} handlebatchData={handlebatchData} setBatchselect={setBatchselect} setMentorAssistantList={setMentorAssistantList} />
                                </div>
                            ))}
                        </div>

                    </div>
                    {/* <div className="col-md-12 col-lg-12 col-sm-12">
                        <div className="table-container" style={{ height: '90vh', overflowY: 'auto', zIndex: "1" }}>
                            <table className="table table-bordered pt-1" >
                                <thead style={{ position: 'sticky', top: -2, zIndex: 3 }}>
                                    <tr>
                                        <th>Batches</th>
                                        <th>Courses</th>
                                        <th >Mentors</th>
                                        <th>Assistant Mentor</th>
                                        <th>Total students</th>
                                        <th >Updated On</th>
                                        <th >Status</th>
                                        <th >Action</th>


                                    </tr>
                                </thead>

                                <tbody style={{ zIndex: 1 }}>
                                    {BatchDetails?.map(BatchDetails => {
                                        return (
                                            <>{console.log(BatchDetails)}
                                                <tr  onClick={() => handleRowClick(BatchDetails.id)} // Handle row click
                                                        style={{ cursor: 'pointer' }}>
                                                    <td>{BatchDetails?.batchName}</td>
                                                    <td>{BatchDetails?.courseType}</td>
                                                    <td>{BatchDetails?.mentorName?.join(',')}</td>
                                                    <td></td>
                                                    <td class="text-center align-middle">{BatchDetails?.NoOfStudent}</td>
                                                    <td>{BatchDetails?.updatedOn}</td>
                                                    <td>{
                                                        BatchDetails?.activeFlag == '1' ? 'Active' : 'De-Active'
                                                        

                                                    }</td>
                                                   
                                                    <td><button style={{ background: 'transparent', border: 'none' }} className="custom-button" title='Edit'><i class="fa fa-edit custom-icon" style={{ color: 'rgb(212, 139, 2)', fontSize: "14pt", padding: '2px' }} onClick={() => {
                                                        
                                                        handleEditBatchesShow()
                                                        setEditBatchDetails({
                                                            batchName: BatchDetails?.batchName,
                                                            courseName: BatchDetails?.courseType,
                                                            mentorName: BatchDetails?.mentorName,
                                                            
                                                            activeFlag: BatchDetails?.activeFlag,
                                                            id: BatchDetails?.id,

                                                        })
                                                        setMentorList(BatchDetails?.mentorDetails)
                                                        setEditCourse(BatchDetails?.courseType)
                                                        
                                                    }}></i></button>
                                                        <button style={{ background: 'transparent', border: 'none' }} className="custom-button" title='Delete'><i class="fa fa-trash custom-icon" style={{ color: 'rgb(212, 139, 2)', fontSize: "14pt", padding: '2px' }} onClick={() => {
                                                            handleDeleteBatch(
                                                                BatchDetails?.id,
                                                            )
                                                        }}></i></button>
                                                    </td>
                                                </tr>
                                            </>
                                        )
                                    })}
                                    


                                </tbody>
                            </table>
                        </div>
                    </div> */}
                </div>
            </div>


            {/* Add batches  */}

            <Modal show={showAddBatches} onHide={handleAddBatchesClose} backdrop="static"
                keyboard={false}
                size='lg'>
                {/* <Modal.Header closeButton>
                    <Modal.Title>Modal Heading</Modal.Title>
                </Modal.Header> */}
                <Modal.Body>

                    <div className='container-fluid'>
                        <div className='row'>
                            <div className=' col-md-12 mb-3' >
                                <h5>Add Batches</h5>
                            </div>
                            <div className="row">
                                <div className='col-md-6'>
                                    <div>
                                        New Batch
                                    </div>
                                    <div>
                                        <div class="input-group ">
                                            <input type="text" class="form-control"
                                                name='batchName'
                                                value={addBatchDetails?.batchName}
                                                onChange={handleAddBatch}

                                            />
                                        </div>
                                        {errors?.batchName && <div className="error">{errors.batchName}</div>}
                                    </div>
                                </div>

                                <div className='col-md-6'>
                                    <div>
                                        Courses
                                    </div>
                                    <div>
                                        <select value={courseList[0] || ''} onChange={handleChangeCourse} class="form-control" id="exampleFormControlSelect1">
                                            <option value=''>---select---</option>
                                            {courselistAll?.map((course) => (

                                                <option value={course}>{course}</option>

                                            ))}
                                        </select>
                                        {errors?.courseList && <div className="error">{errors.courseList}</div>}
                                    </div>
                                </div>

                            </div>

                            <div className="row mt-4">
                                <div className='col-md-6'>
                                    <div>
                                        Mentors
                                    </div>
                                    <div>
                                        <FormControl sx={{ width: 350 }}>
                                            <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
                                            <Select
                                                labelId="demo-multiple-checkbox-label"
                                                id="demo-multiple-checkbox"
                                                multiple
                                                value={mentorList.map(mentor => mentor.name)}  // Display only names
                                                onChange={handleMentorChange}
                                                input={<OutlinedInput label="Tag" />}
                                                renderValue={(selected) => selected.join(', ')}
                                            >
                                                {mentorlistAll.map((mentor) => (
                                                    <MenuItem key={mentor.id} value={mentor.name}>
                                                        <Checkbox checked={mentorList.some(selectedMentor => selectedMentor.name === mentor.name)} />
                                                        <ListItemText primary={mentor.name} />
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        {errors?.mentorList && <div className="error">{errors.mentorList}</div>}
                                    </div>
                                </div>

                                <div className='col-md-6'>
                                    <div>
                                        Mentors Assistant
                                    </div>
                                    <div>
                                        <FormControl sx={{ width: 350 }}>
                                            <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
                                            <Select
                                                labelId="demo-multiple-checkbox-label"
                                                id="demo-multiple-checkbox"
                                                multiple
                                                value={mentorAssistantList?.map(mentor => mentor.name)}  // Display only names
                                                onChange={handleMentorAssistantChange}
                                                input={<OutlinedInput label="Tag" />}
                                                renderValue={(selected) => selected.join(', ')}
                                            >
                                                {mentorAssistant?.map((mentor) => (
                                                    <MenuItem key={mentor.id} value={mentor.name}>
                                                        <Checkbox checked={mentorAssistantList.some(selectedMentor => selectedMentor.name === mentor.name)} />
                                                        <ListItemText primary={mentor.name} />
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        {errors?.mentorList && <div className="error">{errors.mentorList}</div>}
                                    </div>
                                </div>

                                <div className='col-md-6'>
                                    <div>
                                        Status
                                    </div>
                                    <div>
                                        <select name='activeFlag'
                                            value={addBatchDetails?.activeFlag}
                                            onChange={handleAddBatch}
                                            class="form-control" id="exampleFormControlSelect1">
                                            <option value=''>---select---</option>
                                            <option value={1}>Ongoing</option>
                                            <option value={0}>Completed</option>
                                        </select>
                                        {errors?.activeFlag && <div className="error">{errors.activeFlag}</div>}
                                    </div>
                                </div>
                            </div>

                            <div className='row mt-4'>
                                <div className='col-md-6'>
                                    <div>
                                        Start Date
                                    </div>
                                    <div>
                                        <input type="date" class="form-control"
                                            name='startDate'
                                            value={addBatchDetails?.startDate}
                                            onChange={handleAddBatch}

                                        />
                                    </div>
                                    {errors?.startDate && <div className="error">{errors.startDate}</div>}
                                </div>
                                <div className='col-md-6'>
                                    <div>
                                        End Date
                                    </div>
                                    <div class="input-group ">
                                        <input type="date" class="form-control"
                                            name='endDate'
                                            value={addBatchDetails?.endDate}
                                            onChange={handleAddBatch}

                                        />
                                    </div>
                                    {errors?.endDate && <div className="error">{errors.endDate}</div>}
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
                        <Button style={{ backgroundColor: "rgb(32, 109, 50)" }} variant="contained" onClick={() => {
                            handleAddBatchData()
                            // handleInsReviewClose()
                        }}>Add <AddCircleOutlineIcon /> </Button>
                        {/* <Button variant="contained" color="success">
                    Prev
                    </Button> */}
                        <Button variant="contained" style={{ backgroundColor: "red" }}
                            onClick={() => {
                                setAddBatchDetails({})
                                setMentorList([])
                                setMentorAssistantList([])
                                handleAddBatchesClose()
                            }}
                        >
                            Close <CloseIcon />
                        </Button>
                    </Stack>
                </Modal.Footer>
            </Modal>


            {/* Edit Batches  */}
            <Modal show={showEditBatches} onHide={handleEditBatchesClose} backdrop="static"
                keyboard={false}
                size='lg'>
                {/* <Modal.Header closeButton>
                    <Modal.Title>Modal Heading</Modal.Title>
                </Modal.Header> */}
                <Modal.Body>

                    <div className='container-fluid'>
                        <div className='row'>
                            <div className=' col-md-12 mb-3' >
                                <h4>Update Batch Details</h4>
                            </div>
                            <div className="row">
                                <div className='col-md-6'>
                                    <div>
                                        Batch Name
                                    </div>
                                    <div class="input-group ">
                                        <input type="text" class="form-control"
                                            name='batchName'
                                            value={editBatchDetails?.batchName}
                                            onChange={handleEditBatch}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div>
                                        Courses
                                    </div>
                                    <div>
                                        <select name='gender' value={editCourse} onChange={(e) => { setEditCourse(e.target.value) }} class="form-control" id="exampleFormControlSelect1">
                                            <option value=''>---select---</option>
                                            {courselistAll?.map((course) => (


                                                <option value={course}>{course}</option>

                                            ))}
                                        </select>
                                    </div>
                                </div>

                            </div>
                            <div className='row mt-4'>
                                <div className='col-md-6'>
                                    <div>
                                        Mentors
                                    </div>
                                    <div>
                                        <FormControl sx={{ width: 350 }}>
                                            <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
                                            <Select
                                                labelId="demo-multiple-checkbox-label"
                                                id="demo-multiple-checkbox"
                                                multiple
                                                value={mentorList.map(mentor => mentor.name)}  // Display only names
                                                onChange={handleMentorChange}
                                                input={<OutlinedInput label="Tag" />}
                                                renderValue={(selected) => selected.join(', ')}
                                            >
                                                {mentorlistAll.map((mentor) => (
                                                    <MenuItem key={mentor.id} value={mentor.name}>
                                                        <Checkbox checked={mentorList.some(selectedMentor => selectedMentor.name === mentor.name)} />
                                                        <ListItemText primary={mentor.name} />
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>

                                <div className='col-md-6'>
                                    <div>
                                        Assistant Mentors
                                    </div>
                                    <div>
                                        <FormControl sx={{ width: 350 }}>
                                            <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
                                            <Select
                                                labelId="demo-multiple-checkbox-label"
                                                id="demo-multiple-checkbox"
                                                multiple
                                                value={mentorAssistantList.map(mentor => mentor.name)}  // Display only names
                                                onChange={handleMentorAssistantChange}
                                                input={<OutlinedInput label="Tag" />}
                                                renderValue={(selected) => selected.join(', ')}
                                            >
                                                {mentorAssistant.map((mentor) => (
                                                    <MenuItem key={mentor.id} value={mentor.name}>
                                                        <Checkbox checked={mentorAssistantList.some(selectedMentor => selectedMentor.name === mentor.name)} />
                                                        <ListItemText primary={mentor.name} />
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>
                            </div>
                            <div className='row mt-4'>

                                <div className='col-md-6'>
                                    <div>
                                        Status
                                    </div>
                                    <div>
                                        <select name='activeFlag'
                                            value={editBatchDetails?.activeFlag}
                                            onChange={handleEditBatch}
                                            class="form-control" id="exampleFormControlSelect1">
                                            <option value=''>---select---</option>
                                            <option value={1}>Ongoing</option>
                                            <option value={0}>Completed</option>
                                        </select>
                                    </div>
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
                        <Button style={{ backgroundColor: "rgb(32, 109, 50)" }} variant="contained" onClick={() => {
                            handleEditBatchData(editBatchDetails?.id)
                            setMentorList([])
                            // handleInsReviewClose()
                        }}>Update  <span style={{ marginLeft: "3px" }}> <FontAwesomeIcon icon={faPencil} /> </span>  </Button>
                        {/* <Button variant="contained" color="success">
                    Prev
                    </Button> */}
                        <Button variant="contained" style={{ backgroundColor: "red" }}
                            onClick={() => { handleEditBatchesClose() }}
                        >
                            Close <CloseIcon />
                        </Button>
                    </Stack>
                </Modal.Footer>
            </Modal>

            {/* Batch Details  */}
            <Modal show={showBatchDetails} onHide={handleBatchDetailsClose} backdrop="static"
                keyboard={false}
                size='xl'>
                {/* <Modal.Header closeButton>
                    <Modal.Title>Modal Heading</Modal.Title>
                </Modal.Header> */}
                <Modal.Body>

                    <div className='container-fluid'>
                        <div className='row'>
                            <div className=' col-md-12 headLineBox mb-3' >
                                <h4>Batch Details</h4>
                            </div>
                            <div className=' col-md-12  mb-3' >
                                <Box sx={{ width: '100%' }}>
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                            <Tab label="Student Details" {...a11yProps(0)} />
                                            <Tab label="Mentor/Asst. Mentor" {...a11yProps(1)} />
                                            <Tab label="Course Module" {...a11yProps(3)} />
                                        </Tabs>
                                    </Box>
                                    <CustomTabPanel value={value} index={0}>
                                        <BatchStudentDetails batchStudentDetails={batchStudentDetails} />
                                    </CustomTabPanel>
                                    <CustomTabPanel value={value} index={1}>
                                        <BatchMentorDetails batchMentorDetails={batchMentorDetails} />
                                    </CustomTabPanel>
                                    <CustomTabPanel value={value} index={2}>
                                        <Student_courses />
                                    </CustomTabPanel>
                                    {/* <CustomTabPanel value={value} index={2}>
                                    Item Three
                                </CustomTabPanel> */}
                                </Box>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>

                    <Stack spacing={2} direction="row" >
                        {/* <Button variant="contained" onClick={() => {
                            
                        }}>Update</Button> */}


                        <Button variant="secondary"
                            onClick={() => {
                                setBatchMentorDetails([])
                                setBatchStudentDetails([])
                                handleBatchDetailsClose()
                            }}
                        >
                            Close
                        </Button>
                    </Stack>
                </Modal.Footer>
            </Modal>

            <ToastContainer />
        </>
    )
}