import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { button, Modal } from 'react-bootstrap';
import { api2 } from '../ApiUrl/ApiUrl';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useEffect } from 'react';
import Courses from './Courses';
import { CiSearch } from "react-icons/ci";

import '../../src/assets/css/Custom_Global_Style/Global.css';
import PageNotFound from '../ErrorPage/PageNotFound';
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleInfo } from "react-icons/ci";
import { error } from 'highcharts';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import * as Yup from 'yup';


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



export default function Placements() {

  // For the search 
  const [searchres, setSearchres] = useState([]);
  const [searchquery, setSearchquery] = useState('');

  // batch list and course list
  const [batchList, setBatchList] = useState();
  const [courseListALL, setCourseListALL] = useState();
  const [isLoading, setIsLoading] = useState(true); 



  // Add Batches 

  const [showAddBatches, setShowAddBatches] = useState(false);
  const handleAddBatchesClose = () => setShowAddBatches(false);
  const handleAddBatchesShow = () => setShowAddBatches(true);
  const [courseList, setCourseList] = useState([]);


  // For the all placement
  const [allPlacements, setAllPlacements] = useState();



  // Payload for the company add
  const [newCompany, setNewCompany] = useState({
    companyName: "",
    // course: [],
    dateOfArrival: "",
    salaryRange: "",
    industryType: "",
    placementCoOrdinator: "",
    jobLocation: "",
    employementType: "",
    graduationYear: "",
    totalExperience: "",
    relevantExperience: "",
    designation: "",
    totalRounds: "",
    batch: [],
    requiredSkills: "",
    jobDescription: ""
  })

  // For the validations  ==>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const [errors, setErrors] = useState({});

  const validationSchema = Yup.object({
    companyName: Yup.string().required("Company name is required"),
    dateOfArrival: Yup.date()
          .nullable()
          .required("Date of Arrival is required")
          .typeError("Invalid Date") // Handles invalid date formats
          .transform((value, originalValue) => {
              return originalValue === '' ? null : value; // Convert empty string to null
          }),
    salaryRange: Yup.string().required("Salary range is required"),    
     
    placementCoOrdinator: Yup.string().required("placement Co Ordinator is required"),
    jobLocation: Yup.string().required("Job location is required"),
    employementType: Yup.string().required("Employee type is required"),
    graduationYear: Yup.string().required("Graduation year is required"),
    relevantExperience : Yup.string().required("Relevant experience is required"),
    totalExperience :Yup.string().required("Total experience is required"),
    designation : Yup.string().required("Designation is required"),
    totalRounds : Yup.string().required("Total rounds is required"),
    jobDescription: Yup.string().required("Job description is required"),
    batch: Yup.array()
    .of(
      Yup.object().shape({
        batchName: Yup.string().required("Batch name is required"),
        // Add other fields here if necessary
      })
    )
    .min(1, "At least one batch is required")
    .required("Batch is required"),
  });




  // payload for the edit
  const [editCompany, setEditCompany] = useState({
    companyName: "",
    course: [],
    dateOfArrival: "",
    salaryRange: "",
    industryType: "",
    placementCoOrdinator: "",
    jobLocation: "",
    employementType: "",
    graduationYear: "",
    totalExperience: "",
    relevantExperience: "",
    designation: "",
    totalRounds: "",
    batch: [],
    requiredSkills: "",
    jobDescription: ""
  })


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




  useEffect(() => {
    handleMetorData()
  }, [])

  const [addBatchDetails, setAddBatchDetails] = useState({
    batchName: '',
    activeFlag: '',

  });

  //  View BatchList 
  const [BatchDetails, setBatchDetails] = useState([]);



  // Edit batches 

  const [showEditBatches, setShowEditCompany] = useState(false);
  const [showHideJobModal, setShowHideJobModal] = useState(false);
  const handleEditBatchesClose = () => setShowEditCompany(false);
  const handleEditCompanyShow = () => setShowEditCompany(true);
  const handleJobDes = () => setShowHideJobModal(true);
  const handleJobDesClose = () => setShowHideJobModal(false);


  const handleDeleteCompany = (id) => {
    console.log('submit click');
    axios.post(`${api2}/student/deletePlacementById`, {
      id: id
    })
      .then((response) => {
        console.log(" data : ", Response.data);
        // setCourseList(Response.data.result);
        if (response?.data?.success == true) {
          toast.success("Company details Deleted successfully.", {
            position: "top-center",
          });
          getALLplacementDetails();
        }

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
      getALLplacementDetails();
    } else {
      const filterData = searchres.filter((f) => {
        return (
          (f.company_name && f.company_name.toLowerCase().includes(query.toLowerCase()))
        );
      });
      setAllPlacements(filterData);
    }
  };



  // To get all placements List
  const getALLplacementDetails = () => {
    axios.get(`${api2}/student/getAllPlacement`)
      .then((response) => {
        console.log("get all placement details", response?.data?.result);
        setAllPlacements(response?.data?.result)
        setSearchres(response?.data?.result)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    getALLplacementDetails()
  }, [])


 

  const getCourseList = () => {
    axios.post(`${api2}/course/getCourseList`, {})
      .then((response) => {
        console.log("courseList ", response?.data?.result);
        setCourseListALL(response?.data?.result)
      })
      .catch((error) => {
        console.log(error);
      })
  }


  // useEffect(() => {
  //   getBatchList();
  // }, [])

  useEffect(() => {
    getCourseList();
  }, [])

  // for the page validatin userType

  useEffect(() => {
    const type = localStorage.getItem('userType');
    setIsLoading(false);
    setUserType(type);
  }, []);

 





  const handleADDnewCompany = (e) => {
    const { name, value } = e.target;

    let tempVal = value;

    if (name === 'course' || name === 'batch') {
      // Handle multiple selections by parsing the JSON strings
      tempVal = typeof value === 'string' ? [] : value.map(item => JSON.parse(item));
    }

    setNewCompany(prevState => ({
      ...prevState,
      [name]: tempVal
    }));
  };


  const handleEditNewCompany = (e) => {
    const { name, value } = e.target

    let tempEdit = value;
    if (name === 'course' || name === 'batch') {
      tempEdit = typeof value === 'string' ? [] : value.map(item => JSON.parse(item));
    }
    setEditCompany(() => ({
      ...editCompany,
      [name]: tempEdit
    }))
  }

  const [selectedItemsEdit, setSelectedItemsEdit] = useState([]);
  const [isAllSelectedEdit, setIsAllSelectedEdit] = useState(false);
  const [studentListEdit,setStudentListEdit]=useState([]);

  const handleEditPlacementDetails = (id) => {
    console.log("ID", id)
    axios.post(`${api2}/student/getPlacementById`, { id: id })
      .then((Response) => {
        console.log("get placement by ID ", Response?.data?.data[0])
        setEditCompany(Response?.data?.data[0]);
        setStudentListEdit(Response?.data?.data[0].studentList)
        setSelectedItemsEdit(Response?.data?.data[0].studentList)
      })
      .catch((error) => {
        console.log(error);
      })
  }
  useEffect(()=>{console.log('studentListEdit',studentListEdit)},[studentListEdit])

  const handleBatchStudentListEdit=(batchList)=>{
    
    console.log("batchList", batchList)
    axios.post(`${api2}/student/getStudentListForPlacement`, { batchList: batchList })
      .then((Response) => {
        console.log("get placement by ID ", Response?.data?.result)
        setStudentListEdit(Response?.data?.result);
      })
      .catch((error) => {
        console.log(error);
      })
  }
  useEffect(()=>{console.log(studentListEdit)},[studentListEdit])

useEffect(()=>{
  if(editCompany.batch){
    handleBatchStudentListEdit(editCompany.batch)
  }
  
},[editCompany.batch])

  useEffect(() => {
    setIsAllSelected(selectedItemsEdit.length === studentListEdit.length);
  }, [selectedItemsEdit, studentListEdit.length]);

  // const handleSelectAllEdit = () => {
  //   if (isAllSelectedEdit) {
  //     setSelectedItemsEdit([]);
  //   } else {
  //     setSelectedItemsEdit(studentListEdit);
  //   }
  //   setIsAllSelectedEdit(!isAllSelectedEdit);
  // };

  // const handleChangeEdit = (event) => {
  //   setSelectedItemsEdit(event.target.value);
  // };
  // useEffect(()=>{
  //   console.log('selectedItems',selectedItems)
  //   setNewCompany({...newCompany,studentList:selectedItems})
  // },[selectedItems])

  // useEffect(()=>{
  //   setEditCompany({...editCompany,studentList:selectedItemsEdit})
        
  //     },[selectedItemsEdit])



      const handleSelectAllEdit = () => {
        setIsAllSelectedEdit(!isAllSelectedEdit)
       
        // setIsAllSelected(!isAllSelected);
      };
      useEffect(()=>{
        if (isAllSelectedEdit) {console.log('selectAll clicked')
          setSelectedItemsEdit(studentListEdit);
        } else {
          setSelectedItemsEdit([]);
        }
      },[isAllSelectedEdit])
    
      const handleChangeEdit = (event) => {
        setSelectedItemsEdit(event.target.value);
      };
      useEffect(()=>{
        console.log('selectedItems',selectedItems)
        setEditCompany({...editCompany,studentList:selectedItemsEdit})
      },[selectedItemsEdit])
  





  const saveEditCompanyDetails = (id) => {
    console.log(editCompany)
    axios.post(`${api2}/student/update_placement`, editCompany, { id: id })
      .then((response) => {
        console.log("Updated successfully");
        if (response?.data?.success == true) {
          toast.success("Company details updated successfully.", {
            position: "top-center",
          });
        }

        getALLplacementDetails();
      })
      .catch((error) => {
        console.log(error);
      })
  }



  const handleErrors = (error, setErrors) => {
    if (error.name === "ValidationError") {
      const errorMessages = {};
      error.inner.forEach((err) => {
        errorMessages[err.path] = err.message;
      });
      setErrors(errorMessages);
      toast.error("Please fill out the empty field before submitting.", {
        position: "top-center",
      });
    } else {
      toast.error("An error occurred while saving the company details. Please try again later.", {
        position: "top-center",
      });
      console.error("API error:", error);
    }
  };
  
  const saveCompanyDetails = async () => {
    setErrors({});
    try {
      await validationSchema.validate(newCompany, { abortEarly: false });
  
      const response = await axios.post(`${api2}/student/insert_placement`, newCompany);
  
      if (response?.data?.success) {
        toast.success("Company details saved successfully.", {
          position: "top-center",
        });
        
        getALLplacementDetails();
      } else {
        toast.error("Failed to save company details. Please try again.", {
          position: "top-center",
        });
      }
    } catch (error) {
      handleErrors(error, setErrors);
    }
  };


  // For the formatting of the 10000 to 10,000
  function formatNumberWithCommas(number) {
    const x = number.toString().split('.');
    let lastThree = x[0].slice(-3);
    const otherNumbers = x[0].slice(0, -3);
    if (otherNumbers !== '') {
      lastThree = ',' + lastThree;
    }
    const result = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return result + (x.length > 1 ? '.' + x[1] : '');
  }


  function formatSalaryRange(salaryRange) {
    const [minSalary, maxSalary] = salaryRange.split('-');
    const formattedMinSalary = formatNumberWithCommas(minSalary);
    const formattedMaxSalary = formatNumberWithCommas(maxSalary);
    return `${formattedMinSalary}-${formattedMaxSalary}`;
  }
  // from batch wise student selection

  const [selectedItems, setSelectedItems] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [studentList,setStudentList]=useState([]);

  const handleBatchStudentList=(batchList)=>{
    
    console.log("batchList", batchList)
    axios.post(`${api2}/student/getStudentListForPlacement`, { batchList: batchList })
      .then((Response) => {
        console.log("get placement by ID ", Response?.data?.result)
        setStudentList(Response.data.result);
      })
      .catch((error) => {
        console.log(error);
      })
  }
  useEffect(()=>{console.log(studentList)},[studentList])

useEffect(()=>{
  if(newCompany.batch){
    handleBatchStudentList(newCompany.batch)
  }
  
},[newCompany.batch])

  // useEffect(() => {
  //   setIsAllSelected(selectedItems.length === studentList.length);
  // }, [selectedItems, studentList.length]);

  const handleSelectAll = () => {
    setIsAllSelected(!isAllSelected)
   
    // setIsAllSelected(!isAllSelected);
  };
  useEffect(()=>{
    if (isAllSelected) {console.log('selectAll clicked')
      setSelectedItems(studentList);
    } else {
      setSelectedItems([]);
    }
  },[isAllSelected])

  const handleChange = (event) => {
    setSelectedItems(event.target.value);
  };
  useEffect(()=>{
    console.log('selectedItems',selectedItems)
    setNewCompany({...newCompany,studentList:selectedItems})
  },[selectedItems])

  useEffect(()=>{console.log('selectedItems',selectedItems)},[selectedItems])
 
  

  


// course list add 
const options = ['Option 1', 'Option 2', 'Option 3'];
const [courses,setCourses]=useState([]);
const [selectedCourseOptions, setSelectedCourseOptions] = useState([]);
const handleCourseList=()=>{
    
 
  axios.post(`${api2}/student/getCourseListForPlacement`, { })
    .then((Response) => {
      console.log("courseList ", Response?.data?.result)
      setCourses(Response.data.result);
    })
    .catch((error) => {
      console.log(error);
    })
}

 // calling the batchlist

 const getBatchList = () => {
  axios.post(`${api2}/student/getBatchListForPlacement`,{courseList:selectedCourseOptions})
    .then((response) => {
      console.log("batchlist ", response?.data?.result);
      setBatchList(response?.data?.result)
    })
    .catch((error) => {
      console.log(error);
    })
}
useEffect(()=>{
  getBatchList()
},[selectedCourseOptions])
useState(()=>{
  console.log('showAddBatches',showAddBatches)
  // if(showAddBatches)
  //   {
      handleCourseList()
    // }
  
},[showAddBatches])

  const handleChangeCourse = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedCourseOptions(typeof value === 'string' ? value.split(',') : value);
  };


  if(isLoading){
    return <div>loading ...</div>
  }

  if (userType !== 'Admin') {
    return <PageNotFound />
  }

  return (
    <>
      <div className='row ' style={{ marginTop: '58px' }} >
        <div className='row '>
          <div className='container-fluid'>
            <div className=' col-md-12 col-lg-12 col-sm-12 headLineBox d-flex justify-content-start'>
              <h4>Company's List</h4>
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
            <div className=" col-md-6 col-sm-6 col-lg-6">

              <Stack spacing={2} direction="row" sx={{ justifyContent: 'flex-end' }}>

                <Button variant="contained" onClick={() => {
                  handleAddBatchesShow()
                }}>Add NEW COMPANY <CiCirclePlus size={20} /></Button>

              </Stack>
            </div>
          </div>

          <div className="col-md-12 col-lg-12 col-sm-12">
            <div className="table-container" style={{ height: '90vh', overflowY: 'auto' }}>
              <table className="table table-bordered pt-1" >
                <thead style={{ position: 'sticky', top: -2, zIndex: 3 }}>
                  <tr>
                    <th>Company Name</th>
                    <th>Batch</th>
                    <th>Designation</th>
                    {/* <th>Industry Type</th> */}
                    <th>Employement Type</th>
                    <th>Graduation Year</th>
                    <th >Date Of Arrival</th>
                    <th>Relevant Experience</th>
                    <th>Salary Range(LPA)</th>
                    <th>Location</th>
                    {/* <th>Status</th> */}
                    <th>Placement Co-ordinator</th>
                    <th >Action</th>
                  </tr>
                </thead>

                <tbody style={{ zIndex: 1 }}>
                  {allPlacements && allPlacements?.map(allPlacementsDetails => {
                    return (
                      <>{console.log(allPlacementsDetails)}
                        <tr>
                          <td>{allPlacementsDetails?.companyName}</td>
                          <td>{allPlacementsDetails?.batch?.map((batchNM) => batchNM?.batchName).join(', ')}</td>
                          {/* <td>{allPlacementsDetails?.course?.map((courseNM) => courseNM?.courseName).join(', ')}</td> */}
                          <td>{allPlacementsDetails?.designation}</td>
                          <td>{allPlacementsDetails?.employementType}</td>
                          <td>{allPlacementsDetails?.graduationYear}</td>
                          <td>{allPlacementsDetails?.dateOfArrival}</td>
                          <td>{allPlacementsDetails?.relevantExperience}</td>
                          <td>
                            {allPlacementsDetails?.salaryRange
                              .split('-')
                              .map((salary) =>
                                new Intl.NumberFormat('en-IN').format(salary)
                              )
                              .join('-')}
                          </td>
                          <td>{allPlacementsDetails?.jobLocation}</td>
                          {/* <td>{allPlacementsDetails?.status}</td> */}
                          <td>{allPlacementsDetails?.placementCoOrdinator}</td>
                          <td>
                            {/* <button style={{ background: 'transparent', border: 'none' }} className="custom-button" onClick={() => { handleJobDes() }}><CiCircleInfo style={{ color: 'rgb(212, 139, 2)', fontSize: "18pt", padding: '2px' }} /></button> */}
                            <button style={{ background: 'transparent', border: 'none' }} className="custom-button"><i class="fa fa-edit custom-icon" title='Edit' style={{ color: 'rgb(212, 139, 2)', fontSize: "14pt", padding: '2px' }} onClick={() => {

                              handleEditCompanyShow()
                              handleEditPlacementDetails(allPlacementsDetails?.id)
                              // setEditBatchDetails({
                              //   batchName: BatchDetails?.batchName,
                              //   courseName: BatchDetails?.courseType,
                              //   mentorName: BatchDetails?.mentorName,
                              //   id: BatchDetails?.id,

                              // })
                              // setMentorList(BatchDetails?.mentorName)
                            }}></i></button>
                            <button style={{ background: 'transparent', border: 'none' }} className="custom-button"><i class="fa fa-trash custom-icon" title='Delete' style={{ color: 'rgb(212, 139, 2)', fontSize: "14pt", padding: '2px' }} onClick={() => {
                              handleDeleteCompany(
                                allPlacementsDetails?.id
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
          </div>
        </div>
      </div>


      {/* Add Company  */}

      <Modal show={showAddBatches} onHide={handleAddBatchesClose} backdrop="static"
        keyboard={false}
        size='lg'>
        <Modal.Body>

          <div className='container-fluid'>
            {/* <div className='row'> */}
            <div className=' col-md-12 headLineBox mb-3' >
              <h4>Add New Company Details</h4>
            </div>
            <div className="row">
              <div className='col-md-6'>
                <div className=''>
                  Company Name
                </div>
                <div className=''>
                  <div class="input-group ">
                    <input type="text" class="form-control"
                      name='companyName'
                      value={newCompany?.companyName}
                      onChange={handleADDnewCompany}
                      required
                    />
                  </div>
                </div>
                {errors?.companyName && <div className="error">{errors.companyName}</div>}

              </div>
              <div className='col-md-6'>
                <div className=''>
                  Industry Type
                </div>
                <div className=''>
                  <div class="input-group ">
                    <input type="text" class="form-control"
                      name='industryType'
                      value={newCompany?.industryType}
                      onChange={handleADDnewCompany}
                    // required
                    />
                  </div>
                </div>
                {errors?.industryType && <div className="error">{errors.industryType}</div>}
              </div>
            </div>

            <div className="row pt-4">
              <div className='col-md-6'>
                <div className=''>
                  Date Of Arrival
                </div>
                <div className=''>
                  <div class="input-group ">
                    <input type="date" class="form-control"
                      name='dateOfArrival'
                      value={newCompany?.dateOfArrival}
                      onChange={handleADDnewCompany}
                    // required
                    />
                  </div>
                </div>
                {errors?.dateOfArrival && <div className="error">{errors.dateOfArrival}</div>}
              </div>
              <div className='col-md-6'>
                <div className=''>
                  Salary Range
                </div>
                <div className=''>
                  <div class="input-group ">
                    <input type="text" class="form-control"
                      name='salaryRange'
                      value={newCompany?.salaryRange}
                      onChange={handleADDnewCompany}
                    // required
                    />
                  </div>
                </div>
                {errors?.salaryRange && <div className="error">{errors.salaryRange}</div>}

              </div>
            </div>

            <div className="row pt-4">
              {/* <div className='col-md-6'>
                <div className=''>
                  Course Name
                </div>
                <div className=''>

                  <select name='course' value={newCompany?.course?.courseName} onChange={handleADDnewCompany} class="form-control" id="exampleFormControlSelect1">
                    <option value=''>---select---</option>
                    {courseListALL && courseListALL.map((courseALL) => {
                      return (
                        <>
                          <option value={JSON.stringify({ courseName: courseALL.courseName, id: courseALL.id })}>{courseALL?.courseName}</option>
                        </>
                      )
                    })}
                  </select>
                </div>
              </div> */}
              <div className='col-md-6'>
                <div className=''>
                  Placement Co-ordinator
                </div>
                <div className=''>
                  <div class="input-group ">
                    <input type="text" class="form-control"
                      name='placementCoOrdinator'
                      value={newCompany?.placementCoOrdinator}
                      onChange={handleADDnewCompany}
                    // required
                    />
                  </div>
                </div>
                {errors?.placementCoOrdinator && <div className="error">{errors.placementCoOrdinator}</div>}
              </div>
              <div className='col-md-6'>
                <div className=''>
                  Company's Email Id
                </div>
                <div className=''>
                  <div class="input-group ">
                    <input type="text" class="form-control"
                      name='companyEmail'
                      value={newCompany?.companyEmail}
                      onChange={handleADDnewCompany}
                    // required
                    />
                  </div>
                </div>
                {errors?.placementCoOrdinator && <div className="error">{errors.placementCoOrdinator}</div>}
              </div>
              <div className='col-md-6 pt-4'>
                <div className=''>
                  Job Location
                </div>
                <div className=''>
                  <div class="input-group ">
                    <input type="text" class="form-control"
                      name='jobLocation'
                      value={newCompany?.jobLocation}
                      onChange={handleADDnewCompany}
                    // required
                    />
                  </div>
                </div>
                {errors?.jobLocation && <div className="error">{errors.jobLocation}</div>}
              </div>

            </div>

            <div className="row pt-4">
              {/* <div className='col-md-6'>
                <div className=''>
                  Job Location
                </div>
                <div className=''>
                  <div class="input-group ">
                    <input type="text" class="form-control"
                      name='jobLocation'
                      value={newCompany?.jobLocation}
                      onChange={handleADDnewCompany}
                    // required
                    />
                  </div>
                </div>

              </div> */}

              <div className='col-md-6'>
                <div className=''>
                  Employement Type
                </div>
                <div className=''>

                  <select name='employementType' value={newCompany?.employementType} onChange={handleADDnewCompany} class="form-control" id="exampleFormControlSelect1">
                    <option value=''>---select---</option>
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
                {errors?.employementType && <div className="error">{errors.employementType}</div>}
              </div>

              <div className='col-md-6'>
                <div className=''>
                  Graduation Year
                </div>
                <div className=''>
                  <div class="input-group ">
                    <input type="text" class="form-control"
                      name='graduationYear'
                      value={newCompany?.graduationYear}
                      onChange={handleADDnewCompany}
                    // required
                    />
                  </div>
                </div>
                {errors?.graduationYear && <div className="error">{errors.graduationYear}</div>}
              </div>

            </div>

            <div className="row pt-4">
              <div className='col-md-6'>
                <div className=''>
                  Relevant Experience(no. of years)
                </div>
                <div className=''>
                  <div class="input-group ">
                    <input type="text" class="form-control"
                      name='relevantExperience'
                      value={newCompany?.relevantExperience}
                      onChange={handleADDnewCompany}
                    // required
                    />
                  </div>
                </div>
                {errors?.relevantExperience && <div className="error">{errors.relevantExperience}</div>}

              </div>

              <div className='col-md-6'>
                <div className=''>
                  Total experience (no. of years)
                </div>
                <div className=''>
                  <div class="input-group ">
                    <input type="text" class="form-control"
                      name='totalExperience'
                      value={newCompany?.totalExperience}
                      onChange={handleADDnewCompany}
                    // required
                    />
                  </div>
                </div>
                {errors?.totalExperience && <div className="error">{errors.totalExperience}</div>}
              </div>

            </div>

            <div className="row pt-4">
              <div className='col-md-6'>
                <div className=''>
                  Designation
                </div>
                <div className=''>
                  <div class="input-group ">
                    <input type="text" class="form-control"
                      name='designation'
                      value={newCompany?.designation}
                      onChange={handleADDnewCompany}
                    // required
                    />
                  </div>
                </div>
                {errors?.designation && <div className="error">{errors.designation}</div>}
              </div>

              <div className='col-md-6'>
                <div className=''>
                  Total Rounds
                </div>
                <div className=''>
                  <div class="input-group ">
                    <input type="text" class="form-control"
                      name='totalRounds'
                      value={newCompany?.totalRounds}
                      onChange={handleADDnewCompany}
                    // required
                    />
                  </div>
                </div>
                {errors?.totalRounds && <div className="error">{errors.totalRounds}</div>}
              </div>
            </div>
            <div className="row pt-4">
              <div className='col-md-12'>
                <div className=''>
                  Job Description
                </div>
                <div className=''>
                  <div class="input-group ">
                    <textarea
                      className="form-control"
                      name="jobDescription"
                      value={newCompany?.jobDescription}
                      onChange={handleADDnewCompany}
                    // required
                    />
                  </div>
                </div>
                {errors?.jobDescription && <div className="error">{errors.jobDescription}</div>}
              </div>

            </div>

            <div className='col-md-12 mt-4' style={{ backgroundColor: "#7393B3", color: "white" }}>
              <h4>Who can apply?</h4>
            </div>

            <div className="row pt-4">
              <div className='col-md-6'>
                <div>Courses</div>
                <div>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        {/* <InputLabel>Select Options</InputLabel> */}
                        <Select
                          multiple
                          value={selectedCourseOptions}
                          onChange={handleChangeCourse}
                          renderValue={(selected) => selected.join(', ')}
                        >
                          {courses.map((option) => (
                            <MenuItem key={option} value={option}>
                              <Checkbox checked={selectedCourseOptions.indexOf(option) > -1} />
                              <ListItemText primary={option} />
                            </MenuItem>
                          ))}
                        </Select>
                    </FormControl>
                </div>
              </div>
              <div className='col-md-6'>
                <div>Batch Name</div>
                <div>
                  <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="batch-multiple-checkbox-label">Batch</InputLabel>
                    <Select
                      labelId="batch-multiple-checkbox-label"
                      id="batch-multiple-checkbox"
                      multiple
                      name="batch"
                      value={newCompany?.batch.map(item => JSON.stringify(item)) || []} 
                      onChange={handleADDnewCompany}
                      input={<OutlinedInput label="Batch" />}
                      renderValue={(selected) => selected.map(item => JSON.parse(item).batchName).join(', ')}
                      MenuProps={MenuProps}
                    >
                      {batchList && batchList.map((batchALL) => (
                        <MenuItem key={batchALL.id} value={JSON.stringify({ batchName: batchALL.batchName, id: batchALL.id })}>
                          <Checkbox checked={newCompany?.batch.some(batch => batch.id === batchALL.id)} />
                          <ListItemText primary={batchALL.batchName} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                {errors?.batch && <div className="error">{errors.batch}</div>}
              </div>
              <div className='col-md-6'>
                  <div>Students</div>
              <div>
                    

<FormControl sx={{ m: 1, width: 300 }}>
      <Select
        labelId="select-with-checkbox-label"
        multiple
        value={selectedItems}
        onChange={handleChange}
        renderValue={(selected) => {
          return selected.map(user => user?.fullName).join(', ');
        }}
        MenuProps={{
          PaperProps: {
            style: {
              margin: 1,
              width: 300,
            },
          },
        }}
      >
        {/* "Select All" MenuItem */}
        <MenuItem onClick={handleSelectAll}>
          <Checkbox checked={isAllSelected} />
          <ListItemText primary="Select All" />
        </MenuItem>

        {/* Individual users */}
        {studentList.map(user => (
          <MenuItem key={user.id} value={user}>
            <Checkbox checked={selectedItems.some(val => val?.id === user.id)} />
            <ListItemText primary={user.fullName} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
                    {/* <FormControl fullWidth>
      <InputLabel id="select-with-checkbox-label">Select Users</InputLabel>
      <Select
        labelId="select-with-checkbox-label"
        multiple
        value={selectedItems}
        onChange={handleChange}
        renderValue={(selected) => {
          const selectedUsers = studentList.filter(user => selected.includes(user.id));
          return selectedUsers.map(user => user.fullName).join(', ');
        }}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 400,
              width: 250,
            },
          },
        }}
      >
        <MenuItem onClick={handleSelectAll}>
          <Checkbox checked={isAllSelected} />
          <ListItemText primary="Select All" />
        </MenuItem>
        {studentList.map(user => (
          <MenuItem key={user.id} value={user.id}>
            <Checkbox checked={selectedItems.includes(user.id)} />
            <ListItemText primary={user.fullName} />
          </MenuItem>
        ))}
      </Select>
    </FormControl> */}
                  </div>        
              </div>
            </div>

          </div>
        </Modal.Body>
        <Modal.Footer>

          <Stack spacing={2} direction="row" >
            <Button variant="contained" onClick={saveCompanyDetails}>Add</Button>

            <Button style={{ backgroundColor: "red" }} variant="contained"
              onClick={() => { handleAddBatchesClose() }}
            >
              Close
            </Button>
          </Stack>
        </Modal.Footer>
      </Modal>


      {/* Edit Company */}
      <Modal show={showEditBatches} onHide={handleEditBatchesClose} backdrop="static"
        keyboard={false}
        size='lg'>
        <Modal.Body>

          <div className='container-fluid'>
            {/* <div className='row'> */}
            <div className=' col-md-12 headLineBox mb-3' >
              <h4>Edit Company Details</h4>
            </div>
            <div className="row">
              <div className='col-md-6'>
                <div className=''>
                  Company Name
                </div>
                <div className=''>
                  <div class="input-group ">
                    <input type="text" class="form-control"
                      name='companyName'
                      value={editCompany?.companyName}
                      onChange={handleEditNewCompany}
                      required
                    />
                  </div>
                </div>

              </div>
              <div className='col-md-6'>
                <div className=''>
                  Industry Type
                </div>
                <div className=''>
                  <div class="input-group ">
                    <input type="text" class="form-control"
                      name='industryType'
                      value={editCompany?.industryType}
                      onChange={handleEditNewCompany}
                    // required
                    />
                  </div>
                </div>

              </div>
            </div>

            <div className="row pt-4">
              <div className='col-md-6'>
                <div className=''>
                  Date Of Arrival
                </div>
                <div className=''>
                  <div class="input-group ">
                    <input type="date" class="form-control"
                      name='dateOfArrival'
                      value={editCompany?.dateOfArrival}
                      onChange={handleEditNewCompany}
                    // required
                    />
                  </div>
                </div>

              </div>
              <div className='col-md-6'>
                <div className=''>
                  Salary Range
                </div>
                <div className=''>
                  <div class="input-group ">
                    <input type="text" class="form-control"
                      name='salaryRange'

                      value={editCompany?.salaryRange}
                      onChange={handleEditNewCompany}
                    // required
                    />
                  </div>

                </div>

              </div>
            </div>

            <div className="row pt-4">
              {/* <div className='col-md-6'>
                <div className=''>
                  Course Name
                </div>
                <div className=''>

                  <select name='course' value={newCompany?.course?.courseName} onChange={handleADDnewCompany} class="form-control" id="exampleFormControlSelect1">
                    <option value=''>---select---</option>
                    {courseListALL && courseListALL.map((courseALL) => {
                      return (
                        <>
                          <option value={JSON.stringify({ courseName: courseALL.courseName, id: courseALL.id })}>{courseALL?.courseName}</option>
                        </>
                      )
                    })}
                  </select>
                </div>
              </div> */}
              <div className='col-md-6'>
                <div className=''>
                  Placement Co-ordinator
                </div>
                <div className=''>
                  <div class="input-group ">
                    <input type="text" class="form-control"
                      name='placementCoOrdinator'
                      value={editCompany?.placementCoOrdinator}
                      onChange={handleEditNewCompany}
                    // required
                    />
                  </div>
                </div>

              </div>
              <div className='col-md-6'>
                <div className=''>
                  Job Location
                </div>
                <div className=''>
                  <div class="input-group ">
                    <input type="text" class="form-control"
                      name='jobLocation'
                      value={editCompany?.jobLocation}
                      onChange={handleEditNewCompany}
                    // required
                    />
                  </div>
                </div>

              </div>

            </div>

            <div className="row pt-4">
              {/* <div className='col-md-6'>
                <div className=''>
                  Job Location
                </div>
                <div className=''>
                  <div class="input-group ">
                    <input type="text" class="form-control"
                      name='jobLocation'
                      value={newCompany?.jobLocation}
                      onChange={handleADDnewCompany}
                    // required
                    />
                  </div>
                </div>

              </div> */}

              <div className='col-md-6'>
                <div className=''>
                  Employement Type
                </div>
                <div className=''>
                  <select name='employementType' value={editCompany?.employementType} onChange={handleEditNewCompany} class="form-control" id="exampleFormControlSelect1">
                    <option value=''>---select---</option>
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
              </div>

              <div className='col-md-6'>
                <div className=''>
                  Graduation Year
                </div>
                <div className=''>
                  <div class="input-group ">
                    <input type="text" class="form-control"
                      name='graduationYear'
                      value={editCompany?.graduationYear}
                      onChange={handleEditNewCompany}
                    // required
                    />
                  </div>
                </div>

              </div>

            </div>

            <div className="row pt-4">
              <div className='col-md-6'>
                <div className=''>
                  Relevant Experience(no. of years)
                </div>
                <div className=''>
                  <div class="input-group ">
                    <input type="text" class="form-control"
                      name='relevantExperience'
                      value={editCompany?.relevantExperience}
                      onChange={handleEditNewCompany}
                    // required
                    />
                  </div>
                </div>

              </div>

              <div className='col-md-6'>
                <div className=''>
                  Total experience (no. of years)
                </div>
                <div className=''>
                  <div class="input-group ">
                    <input type="text" class="form-control"
                      name='totalExperience'
                      value={editCompany?.totalExperience}
                      onChange={handleEditNewCompany}
                    // required
                    />
                  </div>
                </div>

              </div>

            </div>

            <div className="row pt-4">
              <div className='col-md-6'>
                <div className=''>
                  Designation
                </div>
                <div className=''>
                  <div class="input-group ">
                    <input type="text" class="form-control"
                      name='designation'
                      value={editCompany?.designation}
                      onChange={handleEditNewCompany}
                    // required
                    />
                  </div>
                </div>

              </div>

              <div className='col-md-6'>
                <div className=''>
                  Total Rounds
                </div>
                <div className=''>
                  <div class="input-group ">
                    <input type="text" class="form-control"
                      name='totalRounds'
                      value={editCompany?.totalRounds}
                      onChange={handleEditNewCompany}
                    // required
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row pt-4">
              <div className='col-md-12'>
                <div className=''>
                  Job Description
                </div>
                <div className=''>
                  <div class="input-group ">
                    <textarea
                      className="form-control"
                      name="jobDescription"
                      value={editCompany?.jobDescription}
                      onChange={handleEditNewCompany}
                    // required
                    />
                  </div>
                </div>

              </div>

            </div>

            <div className='col-md-12 mt-4' style={{ backgroundColor: "lightblue", color: "white" }}>
              <h4>Who can apply?</h4>
            </div>

            <div className="row pt-4">
              <div className='col-md-6'>
                <div>Batch Name</div>
                <div>
                  <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="batch-multiple-checkbox-label">Batch</InputLabel>
                    <Select
                      labelId="batch-multiple-checkbox-label"
                      id="batch-multiple-checkbox"
                      multiple
                      name="batch"
                      value={editCompany?.batch.map(item => JSON.stringify(item)) || []} // Ensure value is an array of strings
                      onChange={handleEditNewCompany}
                      input={<OutlinedInput label="Batch" />}
                      renderValue={(selected) => selected.map(item => JSON.parse(item).batchName).join(', ')}
                      MenuProps={MenuProps}
                    >
                      {batchList && batchList.map((batchALL) => (
                        <MenuItem key={batchALL.id} value={JSON.stringify({ batchName: batchALL.batchName, id: batchALL.id })}>
                          <Checkbox checked={editCompany?.batch.some(batch => batch.id === batchALL.id)} />
                          <ListItemText primary={batchALL.batchName} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>

              </div>
              <div className='col-md-6'>
                  <div>Students</div>
                  <div>
                         <FormControl sx={{ m: 1, width: 300 }}>
                            <Select
                              labelId="select-with-checkbox-label"
                              multiple
                              value={selectedItemsEdit}
                              onChange={handleChangeEdit}
                              renderValue={(selected) => {
                                return selected.map(user => user?.fullName).join(', ');
                              }}
                              MenuProps={{
                                PaperProps: {
                                  style: {
                                    margin: 1,
                                    width: 300,
                                  },
                                },
                              }}
                            >
                              {/* "Select All" MenuItem */}
                              <MenuItem onClick={handleSelectAllEdit}>
                                <Checkbox checked={isAllSelectedEdit} />
                                <ListItemText primary="Select All" />
                              </MenuItem>

                              {/* Individual users */}
                              {studentListEdit.map(user => (
                                <MenuItem key={user.id} value={user}>
                                  <Checkbox checked={selectedItemsEdit.some(val => val?.id === user.id)} />
                                  <ListItemText primary={user.fullName} />
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                    </div>
                </div>
            </div>

          </div>
        </Modal.Body>
        <Modal.Footer>
          <Stack spacing={2} direction="row" >
            <Button variant="contained" onClick={() => {
              // handleEditBatchData(editBatchDetails?.id)
              saveEditCompanyDetails(editCompany?.id)

            }}>Update</Button>

            <Button style={{ backgroundColor: "red" }} variant="contained"
              onClick={() => { handleEditBatchesClose() }}
            >
              Close
            </Button>
          </Stack>
        </Modal.Footer>
      </Modal>



      {/* For the job description */}
      {/* <Modal show={showHideJobModal} onHide={handleJobDesClose} backdrop="static"
        keyboard={false}
        size='lg'>
       
        <Modal.Body>

          <div className='container-fluid'>
           
            <div className=' col-md-12 headLineBox mb-3' >
              <h4>Job Description</h4>
            </div>

            <div className="row pt-4">
              <div className='col-md-12'>
                <div className=''>
                  Job Description
                </div>
                <div className=''>
                  <div class="input-group ">
                    <textarea
                      className="form-control"
                      name="editJobTitle"
                      value={editCompany?.editJobTitle}
                      onChange={handleEditNewCompany}
                
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
              
              saveEditCompanyDetails()

            }}>Update</Button>

            <Button variant="secondary"
              onClick={() => { handleJobDesClose() }}
            >
              Close
            </Button>
          </Stack>
        </Modal.Footer>
      </Modal> */}


      <ToastContainer />
    </>
  )
}