import { Popover, List, ListItem } from '@mui/material';
import ListItemText from "@mui/material/ListItemText";
import { useEffect, useState } from 'react';
import { button, Modal } from 'react-bootstrap';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { placements } from '@patternfly/react-core/dist/esm/helpers/Popper/thirdparty/popper-core';
import { api2 } from '../../ApiUrl/ApiUrl';
import axios from 'axios';
import "../../assets/css/TableStyle/TableStyle.css";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Students_Placements() {

    // Placement popup

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'three-dots-menu' : undefined;

    //git testing 
    // Placement modal 
    const [showProjectModal, setShowProjectModal] = useState(false);
    const handleProjectModalClose = () => setShowProjectModal(false);
    const handleProjectModalShow = () => setShowProjectModal(true);


    const [projects, setProjects] = useState([
        {
            empNm: '',
            Desg1: '',
            eFromDate1: '',
            eToDate1: '',
            EmpExp: '',
        },
    ]);

    const handleProjectChange = (index, event) => {
        const { name, value } = event.target;
        const newProjects = [...projects];
        newProjects[index][name] = value;
        setProjects(newProjects);
    };

    const addProject = () => {
        setProjects([
            ...projects,
            {
                empNm: '',
                Desg1: '',
                eFromDate1: '',
                eToDate1: '',
                EmpExp: '',
            },
        ]);
    };

    // const deleteProject = (index) => {
    //   const newProjects = projects.filter((_, i) => i !== index);
    //   setProjects(newProjects);
    // };
    const deleteLastProject = () => {
        if (projects.length > 1) {
            setProjects(projects.slice(0, -1));
        }
    };


    // Apply Placement modal 
    const [showPlacementModal, setShowPlacementModal] = useState(false);
    const handlePlacementModalClose = () => setShowPlacementModal(false);
    const handlePlacementModalShow = () => setShowPlacementModal(true);

    const [resume, setResume] = useState('');
    const [jobDesc, setjobDesc] = useState('');
    const [applyDetails, setApplyDetails] = useState('');
    const [resumeFile, setResumeFile] = useState('');

    const handleApplyplacement = (email) => {
        const data = new FormData();
        data.append('file', resumeFile);
        data.append('studentEmail', email);
        data.append('companyName', applyDetails?.companyName);
        data.append('courseName', applyDetails?.courseName);
        data.append('designation', applyDetails?.designation);
        data.append('companyId',applyDetails?.companyId)
        console.log('applyDetails', applyDetails)
        axios.post(`${api2}/student/studentPlacementapply`, data, {})

            .then((Response) => {
                console.log(" data : ", Response.data);
                toast.success("Applied Successfully!", {
                    position: "top-center",
                });
                // handleMetorData();
                setFlag(!flag);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    // get placements details
    const [placementDetails, setplacementDetails] = useState();
    const [placementstatus, setPlamentStatus] = useState();
    const [placementRoundClear, setPlamentRoundClear] = useState();
    const [offerLetter,setOfferletter]=useState();
    const [flag, setFlag] = useState(false);
    const handleStudentPlacementDetails = (email) => {
        console.log('submit click');
        // axios.post(`${api}/student/getStudentList`, { course: coursedata, status: status })
        axios.post(`${api2}/student/getPlacementForStud`, { studentEmail: email })

            .then((Response) => {
                console.log(" data : ", Response.data);
                setplacementDetails(Response.data.result);
                // handleMetorData();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    const handleStudentPlacementstatus = (email) => {
        console.log('submit click');
        // axios.post(`${api}/student/getStudentList`, { course: coursedata, status: status })
        axios.post(`${api2}/student/getCompanyStatusStud`, { studentEmail: email })

            .then((Response) => {
                console.log(" data : ", Response.data);
                setPlamentStatus(Response.data.statusData);
                setPlamentRoundClear(Response.data.roundsData);
                setOfferletter(Response.data.offerLetterData);
                // handleMetorData();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }



    useEffect(() => {
        const student_email = localStorage.getItem('studentEmail');
        handleStudentPlacementDetails(student_email)
        handleStudentPlacementstatus(student_email)
    }, [flag])

    const viewDoc = (foldername) => {
        
        window.open(`${api2}/static/${foldername}`);
       
      };


    return (
        <>
            <div style={{ marginTop: '58px', backgroundColor: "#f2edf3"}}>
                <div className="container-fluid">
                    <div className="row">
                        <div className=" col-md-8 col-lg-8 col-sm-8 ">
                            {/* <h4>Placement</h4> */}
                        </div>
                        <div className="col-md-4 col-lg-4 col-sm-4 d-flex justify-content-end ">
                            <button onClick={handleClick} style={{ border: 'none', background: 'transparent' }}
                            ><i class="fa fa-ellipsis-v" style={{ fontSize: '25px', fontWeight: 'bold', color: 'blue',marginRight:"20px" }}></i></button>
                        </div>
                        <div className='col-md-12 '>
                            <div className="custom-table-container" style={{ minHeight: '90vh', overflow: 'scroll' }} >
                                <table className="custom-table table-bordered pt-1" >
                                    <thead className="custom-thead" style={{ position: 'sticky', top: -2, zIndex: 3 }}>
                                        <tr>
                                            <th style={{ textAlign: 'center' }}>Company name</th>
                                            {/* <th style={{textAlign: 'center'}}>Course</th> */}
                                            <th style={{ textAlign: 'center' }}>Industry Type</th>
                                            <th style={{ textAlign: 'center' }}>Employment Type</th>
                                            <th style={{ textAlign: 'center' }}>Graduation Year</th>
                                            <th style={{ textAlign: 'center' }}>Location</th>
                                            <th style={{ textAlign: 'center' }}>Designation</th>
                                            <th style={{ textAlign: 'center' }}>Date Of Arrival</th>
                                            <th style={{ textAlign: 'center' }}>Experience</th>
                                            <th style={{ textAlign: 'center' }}>Salary Range(LPA)</th>
                                            <th style={{ textAlign: 'center' }}>Total Rounds</th>
                                            <th style={{ textAlign: 'center' }}>Rounds Cleared</th>
                                            <th style={{ textAlign: 'center' }}>Placement Co-Ordunator</th>
                                            <th style={{ textAlign: 'center' }}>Status</th>
                                            <th style={{ textAlign: 'center' }}>Offer Letter</th>
                                            <th style={{ textAlign: 'center' }}>Action</th>

                                        </tr>
                                    </thead>
                                    <tbody className="custom-tbody">
                                        {console.log(placementDetails)}
                                        {
                                            placementDetails?.map(placementDetail => {
                                                return (
                                                    <tr>
                                                        <td>{placementDetail?.companyName}</td>
                                                        {/* <th>{placementDetail?.course?.courseName}</th> */}
                                                        <td>{placementDetail?.industryType}</td>
                                                        <td>{placementDetail?.employementType}</td>
                                                        <td>{placementDetail?.graduationYear}</td>
                                                        <td>{placementDetail?.jobLocation}</td>
                                                        <td>{placementDetail?.designation}</td>
                                                        <td>{placementDetail?.dateOfArrival}</td>
                                                        <td>{placementDetail?.relevant_experience}</td>
                                                        <td>{placementDetail?.salaryRange}</td>
                                                        <td>{placementDetail?.totalRounds}</td>
                                                        <td>{placementRoundClear?.[placementDetail?.companyName] ? placementRoundClear[placementDetail?.companyName] : 'Not Yet'}</td>
                                                        <td>{placementDetail?.placementCoOrdinator}</td>
                                                        <td>{placementstatus?.[placementDetail?.companyName] == 0 ? 'Applied' : placementstatus?.[placementDetail?.companyName] == 1 ? 'Rejected' : placementstatus?.[placementDetail?.companyName] == 2 ? 'Proceed' :placementstatus?.[placementDetail?.companyName] == 3 ? 'Hold':placementstatus?.[placementDetail?.companyName] == 4 ? 'Placed':'Not Applied'}</td>
                                                        
                                                        <td>{offerLetter?.[placementDetail?.companyName]!=null?<Button onClick={()=>viewDoc(offerLetter?.[placementDetail?.companyName])} variant="outlined">View</Button>:'Not Yet'}</td>

                                                        <td>
                                                            {console.log('placementstatus?.companyName', placementstatus[placementDetail?.companyName])}
                                                            <button disabled={placementstatus?.[placementDetail?.companyName] ? true : false} style={{ background: 'transparent', border: 'none' }} className='custom-button'
                                                                onClick={() => {
                                                                    handlePlacementModalShow()
                                                                    setjobDesc(placementDetail?.jobDescription)
                                                                    setApplyDetails({
                                                                        companyName: placementDetail?.companyName,
                                                                        courseName: placementDetail?.course?.courseName,
                                                                        designation: placementDetail?.designation,
                                                                        companyId:placementDetail?.companyId
                                                                    })
                                                                }}
                                                                title='Apply'
                                                            >{placementstatus?.[placementDetail?.companyName] ? <i className="fa fa-paper-plane  custom-icon" style={{ color: 'gray', fontSize: "14pt", padding: '2px' }}></i> : <i className="fa fa-paper-plane  custom-icon" style={{ color: 'rgb(212, 139, 2)', fontSize: "14pt", padding: '2px' }}></i>}</button>
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
            {/* meeting bar popup  */}
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <List>
                    <ListItem button
                    //   onClick={handleClose}
                    >
                        <ListItemText primary="Download Resume" onClick={() => {
                            //   handleShowMeeting()
                            //   setSchedule('')
                        }} />

                    </ListItem>
                    <ListItem button
                    //   onClick={handleClose}
                    >
                        <ListItemText primary="Update Project Details" onClick={() => {
                            handleProjectModalShow()
                            //   setSchedule('')
                        }} />

                    </ListItem>
                    {/* <ListItem button onClick={handleClose}>
                    <ListItemText primary="Re-schedule Classes" onClick={()=>{handleShowMeetingReschedule()}}/>
                    
                  </ListItem>
                  <ListItem button onClick={handleClose}>
                    <ListItemText primary="Holiday" onClick={()=>{
                          handleShowHolyday()
                          // setSchedule('')
                        } }/>
                    
                  </ListItem>
                  <ListItem button onClick={handleClose}>
                    <ListItemText primary="Leave Request" 
                    onClick={()=>{handleShowLeave()}}
                    />
                    
                  </ListItem> */}
                </List>
            </Popover>


            {/* project Modal  */}

            <Modal show={showProjectModal} onHide={handleProjectModalClose} backdrop="static"
                keyboard={false}
                size='lg'>

                <Modal.Body>

                    <div className='container-fluid'>
                        <div className='row'>
                            <div className=' col-md-12 headLineBox mb-3' >
                                <h4>Update Experience</h4>
                            </div>
                            <div className='col-md-12'>
                                <div className='row'>

                                    {projects.map((project, index) => (
                                        <div key={index} className="row">
                                            <div className='col-md-6'>
                                                <div className="form-group w-100">
                                                    <label htmlFor={`empNm-${index}`}>Project name</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="empNm"
                                                        id={`empNm-${index}`}
                                                        value={project.empNm}
                                                        onChange={(e) => handleProjectChange(index, e)}
                                                    />
                                                </div>
                                            </div>
                                            <div className='col-md-6'>
                                                <div className="form-group w-100">
                                                    <label htmlFor={`Desg1-${index}`}>Link</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="Desg1"
                                                        id={`Desg1-${index}`}
                                                        value={project.Desg1}
                                                        onChange={(e) => handleProjectChange(index, e)}
                                                    />
                                                </div>
                                            </div>
                                            <div className='col-md-6'>
                                                <div className="form-group w-100">
                                                    <label htmlFor={`eFromDate1-${index}`}>From</label>
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        name="eFromDate1"
                                                        id={`eFromDate1-${index}`}
                                                        value={project.eFromDate1}
                                                        onChange={(e) => handleProjectChange(index, e)}
                                                    />
                                                </div>
                                            </div>
                                            <div className='col-md-6'>
                                                <div className="form-group w-100">
                                                    <label htmlFor={`eToDate1-${index}`}>To</label>
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        name="eToDate1"
                                                        id={`eToDate1-${index}`}
                                                        value={project.eToDate1}
                                                        onChange={(e) => handleProjectChange(index, e)}
                                                    />
                                                </div>
                                            </div>
                                            <div className='col-md-12 pt-3'>
                                                <div className="form-group w-100">
                                                    <label htmlFor={`EmpExp-${index}`}>Project details</label>
                                                    <textarea
                                                        className="form-control"
                                                        name="EmpExp"
                                                        id={`EmpExp-${index}`}
                                                        value={project.EmpExp}
                                                        onChange={(e) => handleProjectChange(index, e)}
                                                        rows={2}
                                                    />
                                                </div>
                                            </div>

                                        </div>
                                    ))}
                                    <div className="col-md-12 pt-2 d-flex justify-content-between">
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={addProject}
                                        >
                                            Add
                                        </button>
                                        {projects.length > 1 && (
                                            <button
                                                type="button"
                                                className="btn btn-danger"
                                                onClick={deleteLastProject}
                                            >
                                                Delete
                                            </button>
                                        )}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="contained" onClick={
                        () => {
                            handleProjectModalClose()
                        }}>
                        Add Project
                    </Button>
                    <Stack spacing={2} direction="row" >

                        <Button variant="secondary" onClick={handleProjectModalClose} >
                            Close
                        </Button>
                    </Stack>
                </Modal.Footer>
            </Modal>

            {/* Apply Placements Modal       */}

            <Modal show={showPlacementModal} onHide={handlePlacementModalClose} backdrop="static"
                keyboard={false}
                size='lg'>

                <Modal.Body>

                    <div className='container-fluid'>
                        <div className='row'>
                            <div className=' col-md-12 headLineBox mb-3' >
                                <h4>Apply Now</h4>
                            </div>
                            <div className='col-md-12'>
                                <div className='row'>
                                    <div className='col-md-12'>
                                        <div className="form-group w-100">
                                            <label htmlFor='resume'><b>Job Description</b></label>
                                            <p> {jobDesc}
                                            </p>
                                        </div>
                                    </div>
                                    {/* <div className='col-md-12'>
                                    <div className="form-group w-100">
                                        <label htmlFor='resume'><b>Skills</b></label>
                                        <p> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt vero culpa unde sapiente sequi impedit nam minus ullam itaque magni voluptas voluptate rem illum inventore repellendus eius reprehenderit recusandae suscipit debitis tempora, velit ipsum fugiat. Odit autem laudantium tempore. Nostrum esse ea 
                                        </p>
                                    </div>
                                </div> */}

                                    <div className='col-md-12'>
                                        <div className="form-group w-100">
                                            <label htmlFor='resume'><b>Upload Resume</b></label>
                                            <select
                                                name='status'
                                                value={resume}
                                                className="form-control" id="status"
                                                onChange={(e) => { setResume(e.target.value) }}
                                            >
                                                <option value="">---Select---</option>
                                                <option value="custom">Custom Resume</option>
                                                <option value="auto">Upload from the system</option>
                                            </select>

                                            {/* {
                                            resume=='custom' &&
                                            <>
                                            <p style={{backgroundColor:'green'}}>Upload from the System</p>
                                            </>
                                        } */}

                                        </div>
                                    </div>


                                    {
                                        resume == 'auto' &&
                                        <>
                                            <div className='col-md-6'>
                                                <p style={{ color: 'green' }}><i className="fa fa-check  custom-icon" style={{ color: 'rgb(212, 139, 2)', fontSize: "14pt", padding: '2px' }}></i>Uploaded from the System</p>
                                            </div>
                                        </>

                                    }
                                    {
                                        resume == 'custom' &&
                                        <>
                                            <div className='col-md-12'>
                                                <input
                                                    type="file"
                                                    className="form-control"
                                                    name="resume"
                                                    id='resume'
                                                    accept=".pdf"
                                                    onChange={(e) => setResumeFile(e.target.files[0])}
                                                />
                                            </div>
                                        </>

                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="contained" onClick={
                        () => {
                            handlePlacementModalClose()
                            handleApplyplacement(localStorage.getItem('studentEmail'))
                        }}>
                        APPLY
                    </Button>
                    <Stack spacing={2} direction="row" >

                        <Button variant="secondary" onClick={() => {
                            handlePlacementModalClose()
                            setjobDesc('')
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