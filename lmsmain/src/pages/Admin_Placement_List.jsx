import React, { useState, useEffect } from 'react'
import { CiSearch } from "react-icons/ci";
import { button, Modal } from 'react-bootstrap';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { CiCirclePlus } from "react-icons/ci";
import axios from 'axios';
import { api2 } from '../ApiUrl/ApiUrl';
import "../assets/css/Admin_Placement/Admin_placement_list.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Admin_Placement_List = () => {
  // For the search 
  const [searchres, setSearchres] = useState([]);
  const [searchquery, setSearchquery] = useState('');


  // Add newStdent placement details

  const [showAddBatches, setShowAddBatches] = useState(false);
  const handleAddBatchesClose = () => setShowAddBatches(false);
  const handleAddBatchesShow = () => setShowAddBatches(true);
  const [courseList, setCourseList] = useState([]);


  // Edit batches 

  const [showEditStudentList, setShowEditStudentList] = useState(false);
  const [showHideJobModal, setShowHideJobModal] = useState(false);
  const handleEditStudentListClose = () => setShowEditStudentList(false);
  const handleEditStudentListShow = () => setShowEditStudentList(true);
  const handleJobDes = () => setShowHideJobModal(true);
  const handleJobDesClose = () => setShowHideJobModal(false);
  const [flag,setFlag]=useState(false)

  // For getting all placement details
  const [allPlacementDetails, setAllPlacementDetails] = useState();



  // Payload for the ADD Student Placement Details
  const [addStudentPlacementDetails, setAddStudentPlacementDetails] = useState({
    AddStudentName: "",
    AddEnrollmentDate: "",
    AddPlacementYear: "",
    AddCompanyName: "",
    AddJobTitle: "",
    AddPlacementCoOrdinator: "",
    AddJobLocation: "",
    AddPlacementStatus: "",
    AddIndustry: "",
    AddTypeOfEmployment: "",
    AddPlacementSource: "",
    AddInterviewRound: "",
    AddFeedback: ""
  });

  // Payload for the Edit Student Placement Details
  const [editStudentPlacementDetails, setEditStudentPlacementDetails] = useState({
    EditStudentName: "",
    EditEnrollmentDate: "",
    EditPlacementYear: "",
    EditCompanyName: "",
    EditJobTitle: "",
    EditPlacementCoOrdinator: "",
    EditJobLocation: "",
    EditPlacementStatus: "",
    EditIndustry: "",
    EditTypeOfEmployment: "",
    EditPlacementSource: "",
    EditInterviewRound: "",
    EditFeedback: ""
  });

  // payload for the rounds and interview status
  // const [placementInterviewRounds, setPlacementInterviewRounds] = useState({
  //    interviewStatus: "",
  //    roundsClear: "" 
  // })

  const [placementInterviewRounds, setPlacementInterviewRounds] = useState([]);


  const handleAddStudentPlacementDetails = (e) => {
    const { name, value } = e.target

    setAddStudentPlacementDetails(() => ({
      ...addStudentPlacementDetails,
      [name]: value
    }))
  }

  const handleSaveStudentPlacementDetails = () => {
    // axios.post('')
    //   .then((response) => {
    //     console.log("successfully added");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   })
    console.log(addStudentPlacementDetails)
  }

  const handleUpdateStudentPlacementDetails = () => {
    console.log(editStudentPlacementDetails)
  }


  const handleEditStudentPlacementDetails = (e) => {
    const { name, value } = e.target

    setEditStudentPlacementDetails(() => ({
      ...editStudentPlacementDetails,
      [name]: value
    }))
  }


  // Action part
  const handleDeleteStudentPlacementList = (id) => {
        axios.post(`${api2}/student/deleteSingleStudent`,{id:id})
        .then((Response)=>{

          if (Response?.data?.success == true) {
            toast.success("Student placement details deleted successfully.", {
              position: "top-center",
            });
            getALLPLACEMENTdetails();
          }
            // console.log(Response);
        })
        .catch((error)=>{

        })
  }

  // input change for search

  const inputChange = (e) => {
    // const query = e.target.value;
    // setSearchquery(query);

    // if (query === '') {
    //   handleAllBatchList();
    // } else {
    //   const filterData = searchres.filter((f) => {
    //     return (
    //       (f.batchName && f.batchName.toLowerCase().includes(query.toLowerCase())) ||
    //       (f.courseType && f.courseType.toLowerCase().includes(query.toLowerCase()))
    //     );
    //   });
    //   setBatchDetails(filterData);
    // }
  }


  const updatePlacementStatusANDrounds = (email, index,companyName) => {
    const selectedData = placementInterviewRounds[index];
    axios.post(`${api2}/student/updateSingleStudent`, { email: email, placementInterviewUpdates: selectedData ,companyName:companyName})
      .then((Response) => {
        if (Response?.data?.success == true) {
          toast.success("Student placement details Updated successfully.", {
            position: "top-center",
          });
          getALLPLACEMENTdetails();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // For the resume view

  const viewDoc = (foldername) => {
    // const supportedExtensions = ['xls', 'xlsx'];
    // const fileExtension = foldername.split('.').pop().toLowerCase();

    // if (supportedExtensions.includes(fileExtension)) {
    window.open(`${api2}/static/studentResume/${foldername}`);
    // } else {
    // alert("File unsupported !");
    // console.log('Unsupported file type');
    // }
  };
  const viewDocOfferLetter=(foldername)=>{
    window.open(`${api2}/static/${foldername}`);
  }


  const getALLPLACEMENTdetails = () => {
    axios.get(`${api2}/student/getAllStudentsApplied`)
      .then((Response) => {
        const placementDetails = Response?.data?.data;
        setAllPlacementDetails(placementDetails);

        // Initialize dropdown state with existing data
        const initialRounds = placementDetails.map(detail => ({
          interviewStatus: mapInterviewStatus(detail.status),
        roundsClear: mapRoundsCleared(detail.roundsCleared)
        }));
        setPlacementInterviewRounds(initialRounds);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getALLPLACEMENTdetails();
  }, [])



  // ///////////////////////////////////////////////////////////////////////////////////
  // const [placementInterviewRounds, setPlacementInterviewRounds] = useState([]);

// Function to handle dropdown changes
const handleDropdownChange = (index, key, value) => {
  const updatedRounds = [...placementInterviewRounds];
  updatedRounds[index] = {
    ...updatedRounds[index],
    [key]: value,
  };
  setPlacementInterviewRounds(updatedRounds);
};




const mapInterviewStatus = (status) => {
  if (["0", "1", "2", "3", "4"].includes(status)) {
    return status; // Return the value directly if it's valid
  } else {
    return ""; // Return empty string for invalid or descriptive strings
  }
};


const mapRoundsCleared = (roundsCleared) => {
  // Check if roundsCleared is a valid number between "0" and "4"
  if (["0", "1", "2", "3", "4"].includes(roundsCleared)) {
    return roundsCleared; // Return the value directly if it's valid
  } else {
    return ""; // Return empty string for invalid or descriptive strings
  }
};



  return (
    <>
      <div className='row ' style={{ marginTop: '58px' }} >
        <div className='row '>
          <div className='container-fluid'>
            <div className=' col-md-12 col-lg-12 col-sm-12 headLineBox d-flex justify-content-start'>
              <h4>Student Placement List</h4>
            </div>
          </div>
        </div>

        <div className="row" style={{ marginTop: '20px' }}>
          <div className="row">
            <div className="col-md-6">
              <div className="d-flex align-items-center">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search here"
                  value={searchquery}
                  onChange={inputChange}
                />
                <CiSearch className="search-btn" />
              </div>
            </div>
            {/* <div className=" col-md-6 col-sm-6 col-lg-6">

              <Stack spacing={2} direction="row" sx={{ justifyContent: 'flex-end' }}>

                <Button variant="contained" onClick={() => {
                  handleAddBatchesShow()
                }}>Add Stdent Placement Details <CiCirclePlus size={20} /></Button>

              </Stack>
            </div> */}
          </div>

          <div className="col-md-12 col-lg-12 col-sm-12">
            <div className="table-container" style={{ height: '90vh', overflowY: 'auto' }}>
              <table className="table table-bordered pt-1" >
                <thead style={{ position: 'sticky', top: -2, zIndex: 3 }}>
                  <tr>
                    <th style={{ minWidth: "140px" }}>Name</th>
                    <th>Batch Name</th>
                    {/* <th >Course Name</th> */}
                    <th>Company Name</th>
                    {/* <th>Job Title</th> */}
                    {/* <th>Placement Status</th> */}
                    <th>Rounds Clear</th>
                    <th>Interview Status</th>
                    <th>Resume</th>
                    <th>Offer Letter</th>
                    <th>Actions</th>

                  </tr>
                </thead>

                <tbody style={{ zIndex: 1 }}>
                  {/* {BatchDetails?.map(BatchDetails => { */}
                  {/* return ( */}
                  {/* <>{console.log(BatchDetails)} */}
                  {allPlacementDetails && allPlacementDetails?.map((allPlacementStudentDetails,index) => {
                    return (
                      <>
                        <tr>
                          <td style={{ minWidth: "140px" }}>{allPlacementStudentDetails?.studentName}</td>
                          <td>{allPlacementStudentDetails?.batchName}</td>
                          {/* <td>{allPlacementStudentDetails?.courseName}</td> */}
                          <td>{allPlacementStudentDetails?.companyName}</td>
                          {/* <td>{allPlacementStudentDetails?.jobTitle}</td> */}
                          {/* <td>Interview pending</td> */}
                          {/* Rounds Clear Dropdown */}
                        <td>
                          <select
                            className="form-select"
                            name='roundsClear'
                            value={ placementInterviewRounds[index]?.roundsClear || ""}
                            onChange={(e) => handleDropdownChange(index, 'roundsClear', e.target.value)}
                            aria-label="Rounds Clear"
                          >
                            <option value="">Select</option>
                            <option value="0">Not Yet</option>
                            <option value="1">Round 1 cleared</option>
                            <option value="2">Round 2 cleared</option>
                            <option value="3">Round 3 cleared</option>
                            <option value="4">Round 4 cleared</option>
                          </select>
                        </td>

                        {/* Interview Status Dropdown */}
                        <td>
                          <select
                            className="form-select"
                            name='interviewStatus'
                            value={placementInterviewRounds[index]?.interviewStatus || ""}
                            onChange={(e) => handleDropdownChange(index, 'interviewStatus', e.target.value)}
                            aria-label="Interview Status"
                          >
                            <option value="">Select</option>
                            <option value="0">Applied</option>
                            <option value="1">Rejected</option>
                            <option value="2">Proceed</option>
                            <option value="3">Hold</option>
                            <option value="4">Placed</option>
                          </select>
                        </td>

                          <td><Button onClick={()=>viewDoc(allPlacementStudentDetails?.resume_cv)} variant="outlined">View</Button></td>
                          <td>{allPlacementStudentDetails?.offerLetterPath!=null?<Button onClick={()=>viewDocOfferLetter(allPlacementStudentDetails?.offerLetterPath)} variant="outlined">View</Button>:'Not Yet'}</td>
                          <td>
                          <button
                            style={{ background: 'transparent', border: 'none' }}
                            className="custom-button" title='Delete'
                            onClick={() => handleDeleteStudentPlacementList(allPlacementStudentDetails?.id)}
                          >
                            <i className="fa fa-trash custom-icon" style={{ color: 'rgb(212, 139, 2)', fontSize: "14pt", padding: '2px' }}></i>
                          </button>
                          <button
                            onClick={() => updatePlacementStatusANDrounds(allPlacementStudentDetails?.email, index,allPlacementStudentDetails?.companyName)}
                            style={{ background: 'transparent', border: 'none' }}
                            className='custom-button admin-placement-save-button' title='Save'
                          >
                            <i className="fa fa-save custom-icon" style={{ color: 'rgb(212, 139, 2)', fontSize: "14pt", padding: '2px' }}></i>
                          </button>
                        </td>
                        </tr>

                      </>
                    )
                  })}

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Add Student placed list  */}

      <Modal show={showAddBatches} onHide={handleAddBatchesClose} backdrop="static"
        keyboard={false}
        size='lg'>
        <Modal.Body>

          <div className='container-fluid'>
            {/* <div className='row'> */}
            <div className=' col-md-12 headLineBox mb-3' >
              <h4>Add New Student Placement Details</h4>
            </div>
            <div className="row">
              <div className='col-md-6'>
                <div className=''>
                  Student Name
                </div>
                <div className=''>
                  <div class="input-group ">
                    <input type="text" class="form-control"
                      name='AddStudentName'
                      value={addStudentPlacementDetails?.AddStudentName}
                      onChange={handleAddStudentPlacementDetails}
                      required
                    />
                  </div>
                </div>

              </div>
              <div className='col-md-6'>
                <div className=''>
                  Enrollment Date
                </div>
                <div className=''>
                  <input type="date" class="form-control" name='AddEnrollmentDate' value={addStudentPlacementDetails?.AddEnrollmentDate} onChange={handleAddStudentPlacementDetails} />
                </div>
              </div>
            </div>

            <div className="row pt-4">
              <div className='col-md-6'>
                <div className=''>
                  Placement Year
                </div>
                <div className=''>
                  <input type="date" class="form-control" name='AddPlacementYear' value={addStudentPlacementDetails?.AddPlacementYear} onChange={handleAddStudentPlacementDetails} />
                </div>
              </div>
              <div className='col-md-6'>
                <div className=''>
                  Company Name
                </div>
                <div className=''>
                  <div class="input-group ">
                    <input type="text" class="form-control"
                      name='AddCompanyName'
                      value={addStudentPlacementDetails?.AddCompanyName}
                      onChange={handleAddStudentPlacementDetails}
                      required
                    />
                  </div>
                </div>

              </div>
            </div>

            <div className="row pt-4">
              <div className='col-md-6'>
                <div className=''>
                  Job Title
                </div>
                <div className=''>
                  <div class="input-group ">
                    <input type="text" class="form-control"
                      name='AddJobTitle'
                      value={addStudentPlacementDetails?.AddJobTitle}
                      onChange={handleAddStudentPlacementDetails}
                    // required
                    />
                  </div>
                </div>

              </div>
              <div className='col-md-6'>
                <div className=''>
                  Placement Co-ordinator
                </div>
                <div className=''>
                  <div class="input-group ">
                    <input type="text" class="form-control"
                      name='AddPlacementCoOrdinator'
                      value={addStudentPlacementDetails?.AddPlacementCoOrdinator}
                      onChange={handleAddStudentPlacementDetails}
                    // required
                    />
                  </div>
                </div>

              </div>
            </div>

            <div className="row pt-4">
              <div className='col-md-6'>
                <div className=''>
                  Job Location
                </div>
                <div className=''>
                  <div class="input-group ">
                    <input type="text" class="form-control"
                      name='AddJobLocation'
                      value={addStudentPlacementDetails?.AddJobLocation}
                      onChange={handleAddStudentPlacementDetails}
                    // required
                    />
                  </div>
                </div>

              </div>
              <div className='col-md-6'>
                <div className=''>
                  Placement Status
                </div>
                <div className=''>

                  <select class="form-control" id="exampleFormControlSelect1" name='AddPlacementStatus' value={addStudentPlacementDetails?.AddPlacementStatus} onChange={handleAddStudentPlacementDetails}>
                    <option value=''>---select---</option>
                    <option value="Application_Submitted">Application Submitted</option>
                    <option value="Shortlisted_for_Interview">Shortlisted for Interview</option>
                    <option value="Offer_Extended">Offer Extended</option>
                    <option value="Offer_Accepted">Offer Accepted</option>
                    <option value="Offer_Declined">Offer Declined</option>
                    <option value="On_Hold">On Hold</option>
                    <option value="Document_Verification_Pending">Document Verification Pending</option>
                    <option value="Selected">Selected</option>
                    <option value="Round_1_Cleared">Round 1 Cleared</option>
                    <option value="Round_2_Cleared">Round 2 Cleared</option>
                    <option value="Round_3_Cleared">Round 3 Cleared</option>
                    <option value="Round_4_Cleared">Round 4 Cleared</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Interview_Pending">Interview Pending</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="row pt-4">
              <div className='col-md-6'>
                <div className=''>
                  Industry
                </div>
                <div className=''>
                  <div class="input-group ">
                    <input type="text" class="form-control"
                      name='AddIndustry'
                      value={addStudentPlacementDetails?.AddIndustry}
                      onChange={handleAddStudentPlacementDetails}
                    // required
                    />
                  </div>
                </div>

              </div>
              <div className='col-md-6'>
                <div className=''>
                  Type Of Employment
                </div>
                <div className=''>

                  <select class="form-control" id="exampleFormControlSelect1" name='AddTypeOfEmployment' value={addStudentPlacementDetails?.AddTypeOfEmployment} onChange={handleAddStudentPlacementDetails}>
                    <option value=''>---select---</option>
                    <option value="Full_Time">Full Time</option>
                    <option value="Part_Time">Part Time</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="row pt-4">
              <div className='col-md-6'>
                <div className=''>
                  Placement Source
                </div>
                <div className=''>
                  <div class="input-group ">
                    <input type="text" class="form-control"
                      name='AddPlacementSource'
                      value={addStudentPlacementDetails?.AddPlacementSource}
                      onChange={handleAddStudentPlacementDetails}
                    // required
                    />
                  </div>
                </div>

              </div>
              <div className='col-md-6'>
                <div className=''>
                  Interview Round
                </div>
                <div className=''>

                  <select class="form-control" id="exampleFormControlSelect1" name='AddInterviewRound' value={addStudentPlacementDetails?.AddInterviewRound} onChange={handleAddStudentPlacementDetails}>
                    <option value=''>---select---</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="row pt-4">
              <div className='col-md-12'>
                <div className=''>
                  Interview Feedback
                </div>
                <div className=''>
                  <div class="input-group ">
                    <textarea
                      className="form-control"
                      name="AddFeedback"
                      value={addStudentPlacementDetails?.AddFeedback}
                      onChange={handleAddStudentPlacementDetails}
                    // required
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </Modal.Body>
        <Modal.Footer>

          <Stack spacing={2} direction="row" >
            <Button variant="contained" onClick={handleSaveStudentPlacementDetails}>Add</Button>

            <Button style={{ backgroundColor: "red" }} variant="contained"
              onClick={() => { handleAddBatchesClose() }}
            >
              Close
            </Button>
          </Stack>
        </Modal.Footer>
      </Modal>

      {/* Edit placement student list  */}
      <Modal show={showEditStudentList} onHide={handleEditStudentListClose} backdrop="static"
        keyboard={false}
        size='lg'>
        {/* <Modal.Header closeButton>
                    <Modal.Title>Modal Heading</Modal.Title>
                </Modal.Header> */}
        <Modal.Body>

          <div className='container-fluid'>
            {/* <div className='row'> */}
            <div className=' col-md-12 headLineBox mb-3' >
              <h4>Edit New Student Placement Details</h4>
            </div>
            <div className="row">
              <div className='col-md-6'>
                <div className=''>
                  Student Name
                </div>
                <div className=''>
                  <div class="input-group ">
                    <input type="text" class="form-control"
                      name='EditStudentName'
                      value={editStudentPlacementDetails?.EditStudentName}
                      onChange={handleEditStudentPlacementDetails}
                      required
                    />
                  </div>
                </div>

              </div>
              <div className='col-md-6'>
                <div className=''>
                  Enrollment Date
                </div>
                <div className=''>
                  <input type="date" class="form-control" name='EditEnrollmentDate' value={editStudentPlacementDetails?.EditEnrollmentDate} onChange={handleEditStudentPlacementDetails} />
                </div>
              </div>
            </div>

            <div className="row pt-4">
              <div className='col-md-6'>
                <div className=''>
                  Placement Year
                </div>
                <div className=''>
                  <input type="date" class="form-control" name='EditPlacementYear' value={editStudentPlacementDetails?.EditPlacementYear} onChange={handleEditStudentPlacementDetails} />
                </div>
              </div>
              <div className='col-md-6'>
                <div className=''>
                  Company Name
                </div>
                <div className=''>
                  <div class="input-group ">
                    <input type="text" class="form-control"
                      name='EditCompanyName'
                      value={editStudentPlacementDetails?.EditCompanyName}
                      onChange={handleEditStudentPlacementDetails}
                      required
                    />
                  </div>
                </div>

              </div>
            </div>

            <div className="row pt-4">
              <div className='col-md-6'>
                <div className=''>
                  Job Title
                </div>
                <div className=''>
                  <div class="input-group ">
                    <input type="text" class="form-control"
                      name='EditJobTitle'
                      value={editStudentPlacementDetails?.EditJobTitle}
                      onChange={handleEditStudentPlacementDetails}
                    // required
                    />
                  </div>
                </div>

              </div>
              <div className='col-md-6'>
                <div className=''>
                  Placement Co-ordinator
                </div>
                <div className=''>
                  <div class="input-group ">
                    <input type="text" class="form-control"
                      name='EditPlacementCoOrdinator'
                      value={editStudentPlacementDetails?.EditPlacementCoOrdinator}
                      onChange={handleEditStudentPlacementDetails}
                    // required
                    />
                  </div>
                </div>

              </div>
            </div>

            <div className="row pt-4">
              <div className='col-md-6'>
                <div className=''>
                  Job Location
                </div>
                <div className=''>
                  <div class="input-group ">
                    <input type="text" class="form-control"
                      name='EditJobLocation'
                      value={editStudentPlacementDetails?.EditJobLocation}
                      onChange={handleEditStudentPlacementDetails}
                    // required
                    />
                  </div>
                </div>

              </div>
              <div className='col-md-6'>
                <div className=''>
                  Placement Status
                </div>
                <div className=''>

                  <select class="form-control" id="exampleFormControlSelect1" name='EditPlacementStatus' value={editStudentPlacementDetails?.EditPlacementStatus} onChange={handleEditStudentPlacementDetails}>
                    <option value=''>---select---</option>
                    <option value="Application_Submitted">Application Submitted</option>
                    <option value="Shortlisted_for_Interview">Shortlisted for Interview</option>
                    <option value="Offer_Extended">Offer Extended</option>
                    <option value="Offer_Accepted">Offer Accepted</option>
                    <option value="Offer_Declined">Offer Declined</option>
                    <option value="On_Hold">On Hold</option>
                    <option value="Document_Verification_Pending">Document Verification Pending</option>
                    <option value="Selected">Selected</option>
                    <option value="Round_1_Cleared">Round 1 Cleared</option>
                    <option value="Round_2_Cleared">Round 2 Cleared</option>
                    <option value="Round_3_Cleared">Round 3 Cleared</option>
                    <option value="Round_4_Cleared">Round 4 Cleared</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Interview_Pending">Interview Pending</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="row pt-4">
              <div className='col-md-6'>
                <div className=''>
                  Industry
                </div>
                <div className=''>
                  <div class="input-group ">
                    <input type="text" class="form-control"
                      name='EditIndustry'
                      value={editStudentPlacementDetails?.EditIndustry}
                      onChange={handleEditStudentPlacementDetails}
                    // required
                    />
                  </div>
                </div>

              </div>
              <div className='col-md-6'>
                <div className=''>
                  Type Of Employment
                </div>
                <div className=''>

                  <select class="form-control" id="exampleFormControlSelect1" name='EditTypeOfEmployment' value={editStudentPlacementDetails?.EditTypeOfEmployment} onChange={handleEditStudentPlacementDetails}>
                    <option value=''>---select---</option>
                    <option value="Full_Time">Full Time</option>
                    <option value="Part_Time">Part Time</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="row pt-4">
              <div className='col-md-6'>
                <div className=''>
                  Placement Source
                </div>
                <div className=''>
                  <div class="input-group ">
                    <input type="text" class="form-control"
                      name='EditPlacementSource'
                      value={editStudentPlacementDetails?.EditPlacementSource}
                      onChange={handleEditStudentPlacementDetails}
                    // required
                    />
                  </div>
                </div>

              </div>
              <div className='col-md-6'>
                <div className=''>
                  Interview Round
                </div>
                <div className=''>

                  <select class="form-control" id="exampleFormControlSelect1" name='EditInterviewRound' value={editStudentPlacementDetails?.EditInterviewRound} onChange={handleEditStudentPlacementDetails}>
                    <option value=''>---select---</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="row pt-4">
              <div className='col-md-12'>
                <div className=''>
                  Interview Feedback
                </div>
                <div className=''>
                  <div class="input-group ">
                    <textarea
                      className="form-control"
                      name="EditFeedback"
                      value={editStudentPlacementDetails?.EditFeedback}
                      onChange={handleEditStudentPlacementDetails}
                    // required
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </Modal.Body>

        <Modal.Footer>
          <Stack spacing={2} direction="row" >
            <Button variant="contained" onClick={() => {
              // handleEditBatchData(editBatchDetails?.id)
              handleUpdateStudentPlacementDetails()

            }}>Update</Button>

            <Button style={{ backgroundColor: "red" }} variant="contained"
              onClick={() => { handleEditStudentListClose() }}
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

export default Admin_Placement_List