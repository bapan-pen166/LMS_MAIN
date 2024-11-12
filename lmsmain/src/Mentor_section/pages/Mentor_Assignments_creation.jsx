import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import { BsUpload } from "react-icons/bs";
import { IoMdDownload } from "react-icons/io";
import myfile from "../../assets/file/Format-for-bulk-import-questions.xlsx"
import moment from 'moment';
import { api, api2 } from '../../ApiUrl/ApiUrl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../assets/css/Custom_Global_Style/Global.css';

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

const Mentor_Assignments_creation = () => {
  const today = new Date().toISOString().split('T')[0];  // This contains only the date

  const [showNotShowQuestionPaperPart, setShowNotShowQuestionPaperPart] = useState(false);
  const [changeButtonName, setChangeButtonName] = useState('Click here to set test Assignment');
  const [batchList,setBatchList] = useState()
  const [mentorEmail,setMentorEmail] = useState();



  useEffect(()=>{
    setMentorEmail(localStorage.getItem('mentorEmail')) 
  },[])
  

  const [formData, setFormData] = useState({
    batch: [],
    startDate: "",
    endDate: "",
    totalMarks: "",
    evaluator: "",
    addInstructions: "",
    assignmentName:""
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    let tempEdit = value;
    if ( name === 'batch') {
      tempEdit = typeof value === 'string' ? [] : value?.map(item => JSON.parse(item));
    }
    setFormData({
      ...formData,
      [name]: tempEdit
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Create a FormData object
    const formDataToSend = new FormData();
  
    // Append the file if uploaded
    if (formData.file) {
      formDataToSend.append('file', formData.file);
    }
  
    // Append other form data fields
    formDataToSend.append('startDate', formData.startDate);
    formDataToSend.append('endDate', formData.endDate);
    formDataToSend.append('totalMarks', formData.totalMarks);
    formDataToSend.append('evaluator', formData.evaluator);
    formDataToSend.append('addInstructions', formData.addInstructions);
    formDataToSend.append('assignmentName',formData.assignmentName);
    formDataToSend.append('mentorEmail',mentorEmail);
  
    // Convert the batch array of objects to JSON and append it
    formDataToSend.append('batch', JSON.stringify(formData.batch));
  
    try {
      const response = await axios.post(`${api}/mentor/addAssignment`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response?.data?.success == true) {
        handleAssignmentListAll(mentorEmail)
        toast.success("Assignments uploaded successfully.", {
          position: "top-center",
        });
      }
      
      console.log('Success:', response.data);
      // Handle success (e.g., show a success message, reset the form, etc.)
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      // Handle error (e.g., show an error message)
    }
  };
  
  
  // for downloading the sample questions format
  const downloadSample = () => {
    const link = document.createElement('a');
    link.href = myfile; // Replace with the URL of your file
    link.download = 'Format-for-bulk-import-questions.xlsx'; // The name for the downloaded file
    document.body.appendChild(link); // Append the link to the body
    link.click(); // Simulate a click on the link
    document.body.removeChild(link); // Remove the link after the download
  }


  // set show not show question paper
  const toggleSetQuestionPaperPart = () => {
    setShowNotShowQuestionPaperPart(!showNotShowQuestionPaperPart)

    if (!showNotShowQuestionPaperPart) {
      setChangeButtonName('Hide')
    }
    else {
      setChangeButtonName('Click here to Upload assignments')
    }
  }

  const handleQuestionsFile = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      file
    });
  };

   // calling the batchlist

   const getBatchList = () => {
    axios.get(`${api2}/reg/getBatchList`)
      .then((response) => {
        console.log("batchlist ", response?.data?.batchList);
        setBatchList(response?.data?.batchList)
      })
      .catch((error) => {
        console.log(error);
      })
  }

  useEffect(()=>{
    getBatchList();
  },[])


// Assignment List 
const [assignmentAll,setAssignmentAll]=useState([]);

const handleAssignmentListAll = (email) => {
  // console.log('submit click');
  axios.post(`${api2}/mentor/getAssignmentForMentor`, {mentorEmail:email})

      .then((Response) => {
          console.log(" data : ", Response.data);
          setAssignmentAll(Response.data.result);
          // handleMetorData();
      })
      .catch((error) => {
          console.error('Error:', error);
      });
}

useEffect(()=>{
  const student_email = localStorage.getItem('mentorEmail');
  handleAssignmentListAll(student_email)
  
  // handleStudentPlacementstatus(student_email)
},[])
const viewDoc = (foldername) => {
  window.open(window.open(`${api2}/static/` + foldername))
}

  return (
    <div style={{ marginTop: "58px" }}>
      <div className="row">
        <div className="container-fluid">
          <div className='col-md-12 col-lg-12 headLineBox d-flex justify-content-start'>
            <h4>Upload assignments</h4>
          </div>

          <div style={{ marginTop: "52px", margin: "auto", width: "90%" }}>
            <Form onSubmit={handleSubmit}>
              <div className='row' style={{ marginTop: "10px" }}>
              <div className="col-md-6">
                  <Form.Group controlId="formName" className="mb-4">
                    <Form.Label>Assignment Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="assignmentName"
                      placeholder='Assignment Name'
                      style={{ width: "95%", borderRadius: "10px" }}
                      value={formData?.assignmentName}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </div>
                
                <div className="col-md-6">
                  <Form.Group controlId="formName" className="mb-4">
                    <Form.Label>Batch Name</Form.Label>
                    <div>
                  <FormControl sx={{ m: 1, width: '95%', borderRadius: '15px', }}>
                    <InputLabel id="batch-multiple-checkbox-label">Batch</InputLabel>
                    <Select
                      labelId="batch-multiple-checkbox-label"
                      id="batch-multiple-checkbox"
                      multiple
                      name="batch"
                      value={formData?.batch.map(item => JSON.stringify(item)) || []} 
                      onChange={handleChange}
                      input={<OutlinedInput label="Batch" />}
                      renderValue={(selected) => selected.map(item => JSON.parse(item).batchName).join(', ')}
                      MenuProps={MenuProps}
                    >
                      {batchList && batchList?.map((batchALL) => (
                        <MenuItem key={batchALL.id} value={JSON.stringify({ batchName: batchALL.batchName, id: batchALL.id })}>
                          <Checkbox checked={formData?.batch.some(batch => batch.id === batchALL.id)} />
                          <ListItemText primary={batchALL.batchName} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                  </Form.Group>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <Form.Group controlId="formName" className="mb-4">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="startDate"
                      min={today}
                      style={{ width: "95%", borderRadius: "10px" }}
                      value={formData.startDate}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group controlId="formName" className="mb-4">
                    <Form.Label>End Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="endDate"
                      min={today}
                      style={{ width: "95%", borderRadius: "10px" }}
                      value={formData.endDate}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <Form.Group controlId="formName" className="mb-4">
                    <Form.Label>Total Marks​</Form.Label>
                    <Form.Control
                      type="number"
                      name="totalMarks"
                      style={{ width: "95%", borderRadius: "10px" }}
                      value={formData.totalMarks}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group controlId="formName" className="mb-4">
                    <Form.Label>Evaluator</Form.Label>
                    <Form.Control
                      type="email"
                      name="evaluator"
                      placeholder='Evaluator mail id'
                      style={{ width: "95%", borderRadius: "10px" }}
                      value={formData.evaluator}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </div>

              </div>
              <div className="row">
                <div className="col-md-12">
                  <Form.Group controlId="formName" className="mb-4">
                    <Form.Label>Add Instructions</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="addInstructions"
                      style={{ borderRadius: "10px", width: "98%" }}
                      value={formData.addInstructions}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px" }}>
                <Button onClick={toggleSetQuestionPaperPart} style={{ padding: "8px 30px" }} variant="contained">{changeButtonName}</Button>
              </div>

              {showNotShowQuestionPaperPart && <div>
                <div className='col-md-12 col-lg-12 headLineBox d-flex justify-content-start mb-2'>
                  <h4>Upload assignments</h4>
                </div>
                <div>

                  {(
                    <div style={{ marginBottom: "5px", display: "flex", justifyContent: "center", gap: "10px" }}>
                      <hr />
                      <div>
                        <Button onClick={downloadSample} variant="contained">Download questions format <IoMdDownload size={25} /></Button>
                      </div>
                      <div>
                        <div >
                          <Form.Group controlId="formUploadCertificate" className="mb-4">
                            <div>
                              <Form.Label>Upload Questions file</Form.Label>
                              <Form.Control
                                className="form-control-custom file-certificate"
                                type="file"
                                onChange={handleQuestionsFile}
                              />

                            </div>

                          </Form.Group>
                        </div>
                      </div>
                      <hr />
                    </div>
                  )}
                </div>
              </div>}

              {showNotShowQuestionPaperPart && <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "10px" }}>
                <Button type='submit' style={{ padding: "8px 30px" }} variant="contained" onClick={()=>{handleAssignmentListAll(localStorage.getItem('mentorEmail'))}}>Save</Button>
              </div>}
            </Form>
            <div className='col-md-12 col-lg-12 headLineBox d-flex justify-content-start mb-2'>
                  <h4>Uploaded assignments List</h4>
                </div>
            <table className="table table-bordered pt-1" >
                                    <thead style={{ position: 'sticky', top: -2, zIndex: 3 }}>
                                        <tr>
                                            <th style={{ textAlign: 'center' }}>No</th>
                                            
                                            <th style={{ textAlign: 'center' }}>Name</th>
                                            <th style={{ textAlign: 'center' }}>Start Date</th>
                                            <th style={{ textAlign: 'center' }}>End Date</th>
                                            {/* <th style={{ textAlign: 'center' }}>Assignment</th> */}
                                            <th style={{ textAlign: 'center' }}>Batch</th>
                                            {/* <th style={{ textAlign: 'center' }}>Status</th> */}
                                            <th style={{ textAlign: 'center' }}>Action</th>

                                        </tr>
                                    </thead>
                                    {/* {assignmentAll.length === 0? 'No Data Found':''} */}
                                    <tbody>
                                        {
                                            assignmentAll?.map((assignment,index)=>{
                                                return(
                                                    <tr>
                                            <td>{index+1}</td>
                                            <td>{assignment?.assignmentName}</td>
                                            <td>{assignment?.startDate}</td>
                                            <td>{assignment?.endDate}</td>
                                            {/* <td class="text-center align-middle">
                                                <Button variant="contained" onClick={() => {
                                                    handleDownloadXLS(assignment?.filePath)
                                                    }}>Download
                                                    </Button> 
                                            </td> */}
                                            <td>{assignment?.batch?.map((val,index)=>{
                                              return(
                                                <>
                                                {val.batchName}
                                                {index < assignment.batch.length - 1 && ', '}
                                                </>
                                              )
                                            })}</td>
                                            {/* <td>{assignment?.activeFlag?'Running':'Closed'}</td> */}
                                            <td>
                                            <button style={{ background: 'transparent', border: 'none' }} className="custom-button" onClick={()=>{viewDoc(assignment?.filePath)}}>
                                            <i class="fa fa-eye" style={{ color: 'rgb(212, 139, 2)', fontSize: "14pt", padding: '2px' }} ></i></button>
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
      <ToastContainer />
    </div>
  );
}

export default Mentor_Assignments_creation;
