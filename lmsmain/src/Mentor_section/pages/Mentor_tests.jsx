import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import { BsUpload } from "react-icons/bs";
import { IoMdDownload } from "react-icons/io";
import myfile from "../../assets/file/Format-for-bulk-import-questions.xlsx"
import moment from 'moment';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { api, api2 } from '../../ApiUrl/ApiUrl';
import { ToastContainer, toast } from 'react-toastify';

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

const Mentor_tests = () => {
  const today = new Date().toISOString().split('T')[0];  // This contains only the date
  const [formGroups, setFormGroups] = useState([{ id: Date.now() }]);

  const [updQesAndMarks, setUpdQesAndMarks] = useState([{ uploadedQuestion: null, uploadedMarks: "" }]); //for the descriptive type
  // for the sub mcq bulk 
  const [descriptionQandMarks, setDescriptionQandMarks] = useState();

  // for des or file
  const [desOrFile, setDesOrFile] = useState();

  const [totalMarksEntered, setTotalMarksEntered] = useState(0);
  const [isAddButtonDisabled, setIsAddButtonDisabled] = useState(false);

  //for the show not show of the set test question paper

  const [showNotShowQuestionPaperPart, setShowNotShowQuestionPaperPart] = useState(false);
  const [changeButtonName, setChangeButtonName] = useState('Click here to set test question paper');
  const [batchList, setBatchList] = useState()

  // for getting mail from local storage
  const [mentorEmail,setMentorEmail] = useState();

  useEffect(()=>{
    setMentorEmail(localStorage.getItem('mentorEmail')) 
  },[])




  const [selectMcqOrFile, setSelectMcqOrFile] = useState();

  // const [questions,setQuestions] = useState({
  //       questionText :"",
  //       marks :"",
  //       options:[{text:"",reason:"",isAnswer:false}]
  // });

  // 
  const [formData2, setFormData2] = useState({             // for the mcq type
    questionText: "",
    marks: "",
    options: Array(6).fill({ text: "", reason: "", isAnswer: false, include: false }),
  });

  const [questions, setQuestions] = useState([]);

  const handleChange2 = (e, index, field) => {
    const { name, value, checked } = e.target;
    if (name === 'questionText' || name === 'marks') {
      setFormData2({ ...formData2, [name]: value });
    } else {
      const updatedOptions = [...formData2.options];
      if (field === 'include' || field === 'isAnswer') {
        updatedOptions[index] = { ...updatedOptions[index], [field]: checked };
      } else {
        updatedOptions[index] = { ...updatedOptions[index], [field]: value };
      }
      setFormData2({ ...formData2, options: updatedOptions });
    }
  };

  const handleAddQuestion = () => {
    const includedOptions = formData2.options.filter(option => option.include);
    setQuestions(prevQuestions => [
      ...prevQuestions,
      {
        questionText: formData2.questionText,
        marks: formData2.marks,
        options: includedOptions
      }

    ]);

    // Clear the form
    setFormData2({
      questionText: "",
      marks: "",
      options: Array(6).fill({ text: "", reason: "", isAnswer: false, include: false }),
    });
  };

  useEffect(() => {
    setFormData(prevFormData => ({
      ...prevFormData,
      updQesAndMarks: questions
    }));
  }, [questions]);



  const [formData, setFormData] = useState({
    testName: "",
    batch: [],
    startTime: "",
    endTime: "",
    startDate: "",
    endDate: "",
    totalTime: "",
    totalMarks: "",
    passingMarks: "",
    evaluator: "",
    addInstructions: "",
    updQesAndMarks: [],
    uploadFileMCQ:'',
    uploadFileDes:''
  });




  const handleAddGroup = () => {
    setFormGroups([...formGroups, { id: Date.now() }]);
    const newUpdQesAndMarks = [...updQesAndMarks, { uploadedQuestion: null, uploadedMarks: "" }];
    setUpdQesAndMarks(newUpdQesAndMarks);
    setFormData(prevFormData => ({
      ...prevFormData,
      updQesAndMarks: newUpdQesAndMarks
    }));
  };

  const handleRemoveGroup = (index) => {
    const newFormGroups = formGroups.filter((_, idx) => idx !== index);
    const newUpdQesAndMarks = updQesAndMarks.filter((_, idx) => idx !== index);

    setFormGroups(newFormGroups);
    setUpdQesAndMarks(newUpdQesAndMarks);
    setFormData(prevFormData => ({
      ...prevFormData,
      updQesAndMarks: newUpdQesAndMarks
    }));
  };


  const updateTotalMarksEntered = (updatedUpdQesAndMarks) => {
    const total = updatedUpdQesAndMarks.reduce((sum, item) => sum + Number(item.uploadedMarks || 0), 0);
    setTotalMarksEntered(total);

    const totalMarks = formData.totalMarks ? Number(formData.totalMarks) : 0;
    if (total > totalMarks) {
      setIsAddButtonDisabled(true);
      alert('Total marks entered exceed the total test marks!');

    } else {
      setIsAddButtonDisabled(false);
    }
  };

  const handleChange = (e, index) => {
    const { name, value, files } = e.target;

    if (files && files.length > 0) {
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: files[0]  // Store the actual file object (binary data) instead of a FormData object
      }));
      return;
    }


    let tempEdit = value;
    // Handle 'batch' field specifically
    if (name === 'batch') {
      tempEdit = typeof value === 'string' ? [] : value?.map(item => JSON.parse(item));
      setFormData({
        ...formData,
        [name]: tempEdit
      });
      return;
    }


    const updatedUpdQesAndMarks = [...updQesAndMarks];

    if (name === 'questionMarks') {
      updatedUpdQesAndMarks[index].uploadedMarks = value;
      setUpdQesAndMarks(updatedUpdQesAndMarks);
      setFormData(prevFormData => ({
        ...prevFormData,
        updQesAndMarks: updatedUpdQesAndMarks
      }));
      updateTotalMarksEntered(updatedUpdQesAndMarks);
    } else if (name === 'uploadedQuestion') {
      updatedUpdQesAndMarks[index].uploadedQuestion = value;
      setUpdQesAndMarks(updatedUpdQesAndMarks);
      setFormData(prevFormData => ({
        ...prevFormData,
        updQesAndMarks: updatedUpdQesAndMarks
      }));
    } else {
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: value
      }));
    }

    if (name === 'startTime' || name === 'endTime') {
      const { startTime, endTime } = { ...formData, [name]: value };

      if (startTime && endTime) {
        const start = new Date(`1970-01-01T${startTime}:00`);
        const end = new Date(`1970-01-01T${endTime}:00`);
        let diff = (end - start) / 1000 / 60;

        if (diff < 0) {
          diff += 24 * 60;
        }

        const hours = Math.floor(diff / 60);
        const minutes = diff % 60;

        const totalTime = `${hours}hours ${minutes}mins`;

        setFormData(prevFormData => ({
          ...prevFormData,
          totalTime
        }));
      }
    }
  };

  // const calculateTotalTime = (startTime, endTime) => {
  //   if (startTime && endTime) {
  //     const start = moment(startTime, 'HH:mm');
  //     const end = moment(endTime, 'HH:mm');
  //     const duration = moment.duration(end.diff(start));

  //     if (duration.asMilliseconds() < 0) {
  //       return 'Invalid time range';
  //     }

  //     const hours = Math.floor(duration.asHours());
  //     const minutes = duration.minutes();
  //     return `${hours} hours and ${minutes} minutes`;
  //   }
  //   return '';
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
  
    // Append text fields
    for (const key in formData) {
      if (key !== 'updQesAndMarks' && key !== 'batch') {
        formDataToSend.append(key, formData[key]);
      }
    }
  
    // Append batch and updQesAndMarks as JSON strings
    formDataToSend.append('batch', JSON.stringify(formData.batch));
    formDataToSend.append('updQesAndMarks', JSON.stringify(formData.updQesAndMarks));
  
    // Append files and marks
    updQesAndMarks.forEach((item, index) => {
      if (item.uploadedQuestion) {
        formDataToSend.append(`uploadQuestions[${index}]`, item.uploadedQuestion);
      }
      if (item.uploadedMarks) {
        formDataToSend.append(`questionMarks[${index}]`, item.uploadedMarks);
      }
    });

    // Append mentorEmail
    formDataToSend.append('mentorEmail', mentorEmail);
  
    try {
      const response = await axios.post(`${api}/student/insertTest`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      console.log('Success:', response.data.success);
      if(response.data.success){
        toast.success("Added Successfully!", {
          position: "top-center",
      });
      }
      console.log(formDataToSend); // This will show the FormData object in the console
      // Handle success
    } catch (error) {
      console.error('Error:', error);
      // Handle error
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



  //  
  // for the slider 
  const [questionType, setQuestionType] = useState(''); // 'mcq' or 'descriptive'

  const handleSliderChange = (event) => {
    setQuestionType(event.target.value);
  };

  // for the slider sub mcq
  const handleSliderChangeForMcqORFile = (e) => {
    setDescriptionQandMarks(e.target.value)
  }

  // for the slider sub description

  const handleSliderChangeDesOrFile = (e) => {
    setDesOrFile(e.target.value);
  }


  // File upload
  const handleQuestionsFile = (e) => {
    const data = new FormData();
    data.append('email', formData.emailId);
    data.append('fileType', 'questions');
    data.append('file', formData.profile_photo);

    // axios.post(`${api}/reg/uploadDocument`, data, {})
    //     .then((Response) => {
    //         console.log(Response.data);
    //     })
    //     .catch(error => {
    //         console.log(error);
    //     });
  };


  // set show not show question paper
  const toggleSetQuestionPaperPart = () => {
    setShowNotShowQuestionPaperPart(!showNotShowQuestionPaperPart)

    if (!showNotShowQuestionPaperPart) {
      setChangeButtonName('Hide')
    }
    else {
      setChangeButtonName('Click here to set test question paper')
    }
  }



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

  useEffect(() => {
    getBatchList();
  }, [])




  return (
    <div style={{ marginTop: "58px" }}>
      <div className="row">
        <div className="container-fluid">
          <div className='col-md-12 col-lg-12 headLineBox d-flex justify-content-start'>
            <h4>Create Test</h4>
          </div>

          <div style={{ marginTop: "52px", margin: "auto", width: "90%" }}>
            <Form onSubmit={handleSubmit}>
              <div className='row' style={{ marginTop: "10px" }}>
                <div className="col-md-6">
                  <Form.Group controlId="formName" className="mb-4">
                    <Form.Label>Test Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="testName"
                      placeholder='Test Name'
                      style={{ width: "95%", borderRadius: "10px" }}
                      value={formData.testName}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group controlId="formName" className="mb-4">
                    <Form.Label>Batch Name</Form.Label>
                    <div>
                      <FormControl sx={{ m: 1, width: '95%', borderRadius: '15px',marginTop:"0px" }}>
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
                    <Form.Label>Start time</Form.Label>
                    <Form.Control
                      type="time"
                      name="startTime"
                      style={{ width: "95%", borderRadius: "10px" }}
                      value={formData.startTime}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group controlId="formName" className="mb-4">
                    <Form.Label>End time</Form.Label>
                    <Form.Control
                      type="time"
                      name="endTime"
                      style={{ width: "95%", borderRadius: "10px" }}
                      value={formData.endTime}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <Form.Group controlId="formName" className="mb-4">
                    <Form.Label>Total Test time (00hours 0mins    write in this format)</Form.Label>
                    <Form.Control
                      type="text"
                      name="totalTime"
                      placeholder='00hours 0mins    write in this format'
                      style={{ width: "95%", borderRadius: "10px" }}
                      value={formData.totalTime}
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
                    <Form.Label>Passing Marks​</Form.Label>
                    <Form.Control
                      type="number"
                      name="passingMarks"
                      style={{ width: "95%", borderRadius: "10px" }}
                      value={formData.passingMarks}
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

              {/* <div>
                <Button onClick={downloadSample} style={{ marginLeft: "20px", marginBottom: "10px" }} variant="contained">Download questions format <IoMdDownload size={25} /></Button>
              </div> */}
              {/* {formGroups.map((group, index) => (
                <div className="row" key={group.id}>
                  <div className="col-md-6" style={{ width: "98%", cursor: "pointer" }}>
                    <Form.Group controlId="formName" className="mb-4">
                      <Form.Label>Upload Questions <BsUpload /></Form.Label>
                      <Form.Control
                        type="file"
                        name="uploadQuestions"
                        style={{ borderRadius: "10px", width: "98%" }}
                        onChange={(e) => handleChange(e, index)}
                        multiple
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-4">
                    <Form.Group controlId="formName" className="mb-4">
                      <Form.Label>Marks</Form.Label>
                      <Form.Control
                        type="number"
                        name="questionMarks"
                        style={{ borderRadius: "10px", width: "98%" }}
                        value={updQesAndMarks[index].uploadedMarks}
                        onChange={(e) => handleChange(e, index)}
                      />
                    </Form.Group>
                  </div>
                  <div style={{ marginTop: "30px" }} className="col-md-2">
                    <Button
                      variant="contained"
                      color="success"
                      onClick={handleAddGroup}
                      disabled={isAddButtonDisabled}
                    >
                      +ADD
                    </Button>
                  </div>
                </div>
              ))} */}

              {/* <div> */}
              <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px" }}>
                <Button onClick={toggleSetQuestionPaperPart} style={{ padding: "8px 30px" }} variant="contained">{changeButtonName}</Button>
              </div>
              {/* </div> */}
              {/* --------------------------------------------------- */}
              {showNotShowQuestionPaperPart && <div>
                <div className='col-md-12 col-lg-12 headLineBox d-flex justify-content-start mb-2'>
                  <h4>Set Test Question Paper</h4>
                </div>
                <div>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    {/* <div className="col-md-12"> */}
                    <h5>Please select the type of question you want to create</h5>
                    {/* </div> */}
                  </div>
                  <div style={{ display: "flex", justifyContent: "center", gap: "40px" }}>
                    <div>
                      <Form.Group controlId="formName" className="mb-4">
                        <div style={{ display: "flex" }}>
                          <div style={{ marginRight: "20px", marginTop: "8px" }} >
                            <Form.Label>MCQ type</Form.Label>
                          </div>
                          <div >
                            <Form.Control
                              type='radio'
                              // name="addInstructions"
                              checked={questionType === 'mcq'}
                              style={{ borderRadius: "10px", width: "100%" }}
                              value="mcq"
                              onChange={handleSliderChange}
                            />
                          </div>
                        </div>

                      </Form.Group>
                    </div>
                    <div >
                      <Form.Group controlId="formName" className="mb-4">
                        <div style={{ display: "flex" }}>
                          <div style={{ marginRight: "20px", marginTop: "8px" }} >
                            <Form.Label>Descriptive type</Form.Label>
                          </div>
                          <div >
                            <Form.Control
                              type='radio'
                              // name="addInstructions"
                              checked={questionType === 'descriptive'}
                              style={{ borderRadius: "10px", width: "98%" }}
                              value="descriptive"
                              onChange={handleSliderChange}
                            />
                          </div>
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                  {/* for the sub selection of MCQ type */}
                  {questionType === "mcq" && (
                    <>
                      <div style={{ display: "flex", justifyContent: "center" }}>
                        {/* <div className="col-md-12"> */}
                        <h5>Please select the type : Do you want to upload in Bulk or by your self</h5>
                        {/* </div> */}
                      </div>
                      <div style={{ display: "flex", justifyContent: "center", gap: "40px" }}>
                        <div>
                          <Form.Group controlId="formName" className="mb-4">
                            <div style={{ display: "flex" }}>
                              <div style={{ marginRight: "20px", marginTop: "8px" }} >
                                <Form.Label>Upload Questions in Bulk (File Format)</Form.Label>
                              </div>
                              <div >
                                <Form.Control
                                  type='radio'
                                  // name="addInstructions"
                                  checked={descriptionQandMarks === 'file_mcq'}
                                  style={{ borderRadius: "10px", width: "100%" }}
                                  value="file_mcq"
                                  onChange={handleSliderChangeForMcqORFile}
                                />
                              </div>
                            </div>

                          </Form.Group>
                        </div>
                        <div >
                          <Form.Group controlId="formName" className="mb-4">
                            <div style={{ display: "flex" }}>
                              <div style={{ marginRight: "20px", marginTop: "8px" }} >
                                <Form.Label>Write Questions Manually</Form.Label>
                              </div>
                              <div >
                                <Form.Control
                                  type='radio'
                                  // name="addInstructions"
                                  checked={descriptionQandMarks === 'manual_mcq'}
                                  style={{ borderRadius: "10px", width: "98%" }}
                                  value="manual_mcq"
                                  onChange={handleSliderChangeForMcqORFile}
                                />
                              </div>
                            </div>
                          </Form.Group>
                        </div>
                      </div>
                    </>
                  )}

                  {/* ended here  */}

                  {/* for the sub part file part --------when selected MCQ type and bulk file*/}

                  {(questionType === "mcq" && descriptionQandMarks === "file_mcq") && (
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
                                name="uploadFileMCQ"
                                onChange={handleChange}
                                style={{ width: '370px' }}
                              />
                            </div>

                          </Form.Group>
                        </div>
                      </div>
                      <hr />
                    </div>
                  )}

                  {/* ended here  */}
                  {/* for the sub selection of Descriptive type type */}
                  {questionType === "descriptive" && (
                    <>
                      <div style={{ display: "flex", justifyContent: "center" }}>
                        {/* <div className="col-md-12"> */}
                        <h5>Please select the type : Do you want to upload in Bulk or by your self</h5>
                        {/* </div> */}
                      </div>
                      <div style={{ display: "flex", justifyContent: "center", gap: "40px" }}>
                        <div>
                          <Form.Group controlId="formName" className="mb-4">
                            <div style={{ display: "flex" }}>
                              <div style={{ marginRight: "20px", marginTop: "8px" }} >
                                <Form.Label>Upload Questions in Bulk (File Format)</Form.Label>
                              </div>
                              <div >
                                <Form.Control
                                  type='radio'
                                  // name="addInstructions"
                                  checked={desOrFile === 'file_des'}
                                  style={{ borderRadius: "10px", width: "100%" }}
                                  value="file_des"
                                  onChange={handleSliderChangeDesOrFile}
                                />
                              </div>
                            </div>

                          </Form.Group>
                        </div>
                        <div >
                          <Form.Group controlId="formName" className="mb-4">
                            <div style={{ display: "flex" }}>
                              <div style={{ marginRight: "20px", marginTop: "8px" }} >
                                <Form.Label>Write Questions Manually</Form.Label>
                              </div>
                              <div >
                                <Form.Control
                                  type='radio'
                                  // name="addInstructions"
                                  checked={desOrFile === 'manual_des'}
                                  style={{ borderRadius: "10px", width: "98%" }}
                                  value="manual_des"
                                  onChange={handleSliderChangeDesOrFile}
                                />
                              </div>
                            </div>
                          </Form.Group>
                        </div>
                      </div>
                    </>
                  )}

                  {/* ended here  */}
                  {/* tfor the sub part file par --------when selected Descriptive type and bulk file*/}

                  {(questionType === "descriptive" && desOrFile === "file_des") && (
                    <div style={{ marginBottom: "5px", display: "flex", justifyContent: "center", gap: "10px" }}>
                      <hr />
                      {/* <div>
                        <Button onClick={downloadSample} variant="contained">Download questions format <IoMdDownload size={25} /></Button>
                      </div> */}
                      <div>
                        <div>
                          <Form.Group controlId="formUploadCertificate" className="mb-4">
                            <div>
                              <Form.Label>Upload Questions file</Form.Label>
                              <Form.Control
                                className="form-control-custom file-certificate"
                                type="file"
                              name="uploadFileDes"
                              onChange={handleChange}
                              style={{ width: '370px' }}
                              />
                            </div>

                          </Form.Group>
                        </div>
                      </div>
                      <hr />
                    </div>
                  )}


                  {/* ended here  */}


                  {(questionType === "mcq" && descriptionQandMarks === "manual_mcq") ? (
                    <div>
                      <div className="row">
                        <div className="row">
                          <div className="col-md-8">
                            <Form.Group controlId="formName" className="mb-4">
                              <Form.Label>Question text</Form.Label>
                              <Form.Control
                                as="textarea"
                                name="questionText"
                                style={{ borderRadius: "10px", width: "98%" }}
                                value={formData2.questionText}
                                onChange={(e) => handleChange2(e, null, 'questionText')}
                              />
                            </Form.Group>
                          </div>
                          <div className='col-md-4'>
                            <Form.Group controlId="formName" className="mb-4">
                              <Form.Label>Marks​</Form.Label>
                              <Form.Control
                                type="number"
                                name="marks"
                                style={{ width: "95%", borderRadius: "10px" }}
                                value={formData2.marks}
                                onChange={(e) => handleChange2(e)}
                              />
                            </Form.Group>
                          </div>

                        </div>

                        {/* table */}

                        <div className='container-fluid pr-2 pl-2' style={{ Height: '40vh', marginTop: "10px", marginBottom: "10px" }}>

                          <div className='row'>
                            <div className='col-md-12 col-lg-12 scroll' style={{ paddingRight: '0px', paddingLeft: '0px' }}>
                              <table className="table table-bordered">
                                <thead style={{ textAlign: "center", zIndex: '3', position: "sticky", top: "0px" }}>
                                  <tr>
                                    <th>Select</th>
                                    {/* <th>Batch Name</th> */}
                                    <th>#</th>
                                    <th>Option Text</th>
                                    <th>Option Reason</th>
                                    <th>Ans</th>
                                  </tr>
                                </thead>
                                <tbody style={{ textAlign: "center", zIndex: '1' }}>
                                  {formData2.options.map((option, index) => (
                                    <tr key={index}>
                                      <td>
                                        <Form.Control
                                          type='checkbox'
                                          name='options'
                                          checked={option.include}
                                          onChange={(e) => handleChange2(e, index, 'include')}
                                          style={{ borderRadius: '10px', width: '20px' }}
                                        />
                                      </td>
                                      <td>{index + 1}.</td>
                                      <td>
                                        <Form.Group controlId={`formOptionText${index}`} className="mb-4">
                                          <Form.Control
                                            type="text"
                                            name="text"
                                            placeholder='Type content here....'
                                            style={{ borderRadius: '10px', width: '98%' }}
                                            value={option?.text}
                                            onChange={(e) => handleChange2(e, index, 'text')}
                                          />
                                        </Form.Group>
                                      </td>
                                      <td>
                                        <Form.Group controlId={`formOptionReason${index}`} className="mb-4">
                                          <Form.Control
                                            as="textarea"
                                            name="reason"
                                            style={{ borderRadius: '10px', width: '98%' }}
                                            value={formData2?.options?.reason}
                                            onChange={(e) => handleChange2(e, index, 'reason')}
                                          />
                                        </Form.Group>
                                      </td>
                                      <td>
                                        <Form.Control
                                          type='radio'
                                          name='isAnswer'
                                          checked={option.isAnswer}
                                          onChange={() => {
                                            const updatedOptions = formData2.options.map((opt, i) =>
                                              i === index ? { ...opt, isAnswer: true } : { ...opt, isAnswer: false }
                                            );
                                            setFormData2({ ...formData2, options: updatedOptions });
                                          }}
                                          style={{ borderRadius: '10px', width: '48%' }}
                                        />
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                            <div style={{ marginTop: "30px", position: "relative", right: "1px" }} className="col-md-3">
                              <Button
                                variant="contained"
                                color="success"
                                onClick={handleAddQuestion}
                              // onClick={handleAddGroup}
                              // disabled={isAddButtonDisabled}
                              >
                                +ADD more questions or add this question
                              </Button>
                            </div>
                          </div>
                        </div>



                      </div>
                    </div>
                  ) : (questionType === "descriptive" && desOrFile === "manual_des") && (
                    <div>
                      <div className="row">
                        {formGroups.map((group, index) => (
                          <div className="row" key={group.id}>
                            <div className="col-md-6" style={{ width: "98%", cursor: "pointer" }}>
                              <Form.Group controlId="formName" className="mb-4">
                                <Form.Label>Question text</Form.Label>
                                <Form.Control
                                  as="textarea"
                                  name="uploadedQuestion"
                                  style={{ borderRadius: "10px", width: "98%" }}
                                  value={updQesAndMarks[index].uploadedQuestion}
                                  onChange={(e) => handleChange(e, index)}
                                />
                              </Form.Group>
                            </div>
                            <div className="col-md-4">
                              <Form.Group controlId="formName" className="mb-4">
                                <Form.Label>Marks</Form.Label>
                                <Form.Control
                                  type="number"
                                  name="questionMarks"
                                  style={{ borderRadius: "10px", width: "98%" }}
                                  value={updQesAndMarks[index].uploadedMarks}
                                  onChange={(e) => handleChange(e, index)}
                                />
                              </Form.Group>
                            </div>
                            <div style={{ marginTop: "30px" }} className="col-md-1">
                              <Button
                                variant="contained"
                                color="success"
                                onClick={handleAddGroup}
                                disabled={isAddButtonDisabled}
                              >
                                +ADD
                              </Button>

                            </div>
                            <div style={{ marginTop: "30px" }} className="col-md-1">
                              {formGroups.length > 1 && (<Button
                                variant="contained"
                                color="success"
                                onClick={() => handleRemoveGroup(index)}
                                disabled={isAddButtonDisabled}
                              >
                                Remove
                              </Button>)}

                            </div>

                          </div>
                        ))}


                      </div>
                    </div>
                  )}
                </div>
              </div>}
              {/*  -------------------------------------------*/}

              {showNotShowQuestionPaperPart && <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "10px" }}>
                <Button type='submit' style={{ padding: "8px 30px" }} variant="contained">Save</Button>
              </div>}
            </Form>

          </div>

          {/* last table portion */}
          {showNotShowQuestionPaperPart && <div>
            <div>
              <div className='col-md-12 col-lg-12 headLineBox d-flex justify-content-start mt-4'>
                <h4>Added Questions</h4>
              </div>
            </div>
            <div>
              <div>
                {questionType === "mcq" ? (
                  <>
                    <div className='container-fluid pr-2 pl-2' >
                      <div className='row'>
                        <div className='col-md-12 col-lg-12 scroll' style={{ paddingRight: '0px', paddingLeft: '0px' }}>
                          <table className="table table-bordered" style={{ height: '40vh', marginTop: "10px" }}>
                            <thead style={{ textAlign: "center", zIndex: '3', position: "sticky", top: "0px" }}>
                              <tr>
                                <th>Question No.</th>
                                <th>Question type</th>
                                <th>Question Name</th>
                                <th>Option A</th>
                                <th>Option B</th>
                                <th>Option C</th>
                                <th>Option D</th>
                                <th>Option E</th>
                                {/* <th>Marks</th>
                                <th>Answer</th> */}
                              </tr>
                            </thead>
                            <tbody style={{ textAlign: "center", zIndex: '1' }}>
                              {console.log("questions :", questions)}
                              {questions && questions.map((value, index) => {
                                return (
                                  <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{questionType}</td>
                                    <td>{value.questionText}</td>
                                    {value.options.map((optionVal, index) => {
                                      return (
                                        <td>{optionVal.text}</td>

                                      )
                                    })}
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    {/* <td>{value.marks}</td> */}
                                  </tr>
                                )
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </>
                ) : questionType === "descriptive" && (
                  <>
                  </>
                )}
              </div>
            </div>
          </div>}

        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Mentor_tests;
