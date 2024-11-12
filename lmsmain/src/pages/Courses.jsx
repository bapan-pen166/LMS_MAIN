
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { FormControl, MenuItem, Select, InputLabel } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { api, api2 } from '../ApiUrl/ApiUrl';
import { sampleContentXls } from '../ApiUrl/ApiUrl';

import { button, Modal } from 'react-bootstrap';

import ScheduleEmChip from '../components/Meeting/ScheduleEmChip';
import { Prev } from 'react-bootstrap/esm/PageItem';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../../src/assets/css/Custom_Global_Style/Global.css';
import { CiSearch } from "react-icons/ci";
import PageNotFound from '../ErrorPage/PageNotFound';
import * as Yup from 'yup';
import { Flex } from '@patternfly/react-core';


export default function Courses() {
    // For the search 
    const [searchres, setSearchres] = useState([]);
    const [searchquery, setSearchquery] = useState('');
    const [isLoading, setIsLoading] = useState(true);


    const [courseList, setCourseList] = useState([]);

    const handleAllCourseList = (e) => {
        console.log('submit click');
        axios.post(`${api2}/course/getCourseList`, {})
            .then((Response) => {
                console.log(" data : ", Response.data.result);
                setCourseList(Response.data.result);
                setSearchres(Response.data.result)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    useEffect(() => {
        handleAllCourseList()
    }, [])

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

    // For the validations
    const [errors, setErrors] = useState({});

    const validationSchema = Yup.object({
        courseName: Yup.string().required("Course name is required"),
        code: Yup.string().required("Course Code is required"),
        description: Yup.string().required("Description is required"),
    })


    const handleAddCourse = (e) => {
        const { name, value, type, files } = e.target;
        console.log(e.target.files)
        setAddCourseDetails({
            ...addCourseDetails,
            [name]: type === 'file' ? files[0] : value
        });
    };

    const handleAddCourseData = async (e) => {
        e?.preventDefault(); // Prevent page reload

        // Clear previous errors
        setErrors({});

        try {
            // Validate form data
            await validationSchema.validate(addCourseDetails, { abortEarly: false });
            console.log("Form submitted", addCourseDetails);

            // Submit form data
            const response = await axios.post(`${api2}/course/addCourse`, addCourseDetails);

            // Handle the response
            console.log("Data:", response.data);
            setCourseList(response.data.result);
            handleAllCourseList();
            toast.success("Course content updated Successfully!", {
                position: "top-center",
                style: { fontWeight: 'bold' },
            });
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
                toast.error("An error occurred while updating the course content.", {
                    position: "top-center",
                    style: { fontWeight: 'bold' },
                });
            }
        }
    };


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
    useEffect(() => {
        handleCourseContent()
    }, [addCourseDetails.content])



    // edit course 
    const [showEditCourse, setShowEditCourse] = useState(false);
    const handleEditCourseClose = () => setShowEditCourse(false);
    const handleEditCourseShow = () => {
        console.log('edit click')
        setShowEditCourse(true)
    };

    const [editCourseDetails, setEditCourseDetails] = useState({
        courseName: '',
        code: '',
        description: '',
        content: null,
        activeFlag: '',
        id: '',
        delete: ''
    });
    const handleEditCourse = (e) => {
        const { name, value, type, files } = e.target;
        console.log(e.target.files)
        
       console.log(name)

        setEditCourseDetails({
            ...editCourseDetails,
            [name]: type === 'file' ? files[0] : value
        });
    };
    // const handleCourseContentEdit = (e) => {
    //     const data = new FormData();
    //     data.append('courseName', editCourseDetails.courseName);
    //     // data.append('fileType', 'Co');
    //     data.append('file', editCourseDetails.content);

    //     console.log(data);
    //     axios.post(`${api2}/course/courseDocumentUpload`, data, {})
    //         .then((Response) => {
    //             console.log(Response.data);


    //         }).catch(error => {
    //             console.log(error);
    //         });
    // }
    const handleCourseContentEdit = (e) => {
        const data = new FormData();
        data.append('courseName', editCourseDetails.courseName);
        // data.append('fileType', 'Co');
        data.append('file', editCourseDetails.content);

        console.log(data);
        axios.post(`${api2}/course/courseXlslDocumentUpload`, data, {})
            .then((Response) => {
                console.log(Response.data);


            }).catch(error => {
                console.log(error);
            });
    }
    useEffect(() => {
        handleCourseContentEdit()
    }, [editCourseDetails.content])
    const handleEditCourseData = (e) => {
        console.log('submit click');
        axios.post(`${api2}/course/editDeleteCourse`, {
            courseName: editCourseDetails.courseName,
            code: editCourseDetails.code,
            description: editCourseDetails.description,

            activeFlag: editCourseDetails.activeFlag,
            delete: 0,
            id: editCourseDetails?.id

        })
            .then((Response) => {
                console.log(" data : ", Response.data);
                // setCourseList(Response.data.result);
                handleAllCourseList()
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    const handleDeleteCourse = (courseName, code, description, activeFlag, id) => {
        axios.post(`${api2}/course/editDeleteCourse`, {
            courseName: courseName,
            code: code,
            description: description,

            activeFlag: activeFlag,
            delete: 1,
            id: id

        })
            .then((Response) => {
                console.log(" data : ", Response.data);
                // setCourseList(Response.data.result);
                handleAllCourseList()
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    {/* View Course details  */ }
    const [showViewCourse, setShowViewCourse] = useState(false);
    const handleViewCourseClose = () => setShowViewCourse(false);
    const handleViewCourseShow = () => setShowViewCourse(true)
    const [viewCourse, setViewCourse] = useState({})
    const [individualEm, setIndividualEm] = useState([])
    // const viewDoc= (foldername)=>{
    //     window.open(window.open(`${api2}/static/courseDetails/` + foldername ))
    // }
    const [courseContent, setcourseContent] = useState([]);
    // const handleAllCourseContent = (e) => {
    //     console.log('submit click');
    //     axios.post(`${api2}/course/getCourseContent`, {})
    //         .then((Response) => {
    //             console.log(" data : ",Response.data);
    //             setcourseContent(Response.data.result);
    //         })
    //         .catch((error) => {
    //             console.error('Error:', error);
    //         });
    // }   

    const viewDoc = (foldername) => {
        window.open(window.open(`${api2}/static/courseDetails/` + foldername))
    }

    const sendEmailCourse = (id) => {
        console.log('submit click', id);
        axios.post(`${api2}/course/send-email`, {

            id: id,
            email: individualEm

        })
            .then((Response) => {
                console.log(" data : ", Response.data);
                // setCourseList(Response.data.result);
                handleAllCourseList()
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    // Content add Module 
    const [showViewCourseContent, setShowViewCourseContent] = useState(false);
    const handleViewCourseContentClose = () => setShowViewCourseContent(false);
    const handleViewCourseContentShow = () => setShowViewCourseContent(true)

    const [subContentNo, setSubContentNo] = useState(0);
    const [courseContentData, setCourseContentData] = useState([{
        courseId: '',
        courseName: '',
        contentName: '',
        contentId: '',
        contentDuration: '',
        subModules: [
            {
                subModuleNm: '',
                contentDetails: '',
                moduleDuration: ''
            }
        ]
    }])

    // const handleInputChange = (index, field, value) => {
    //     const newCourseContentData = [...courseContentData];
    //     newCourseContentData[0].Modules[index][field] = value;
    //     setCourseContentData(newCourseContentData);
    //   };

    //   const addSubContent = () => {
    //     const newCourseContentData = [...courseContentData];
    //     newCourseContentData[0].Modules.push({
    //       moduleNm: '',
    //       contentDetails: '',
    //       Duration: '',
    //     });
    //     setCourseContentData(newCourseContentData);
    //     setSubContentNo(subContentNo + 1);
    //   };

    //   const removeSubContent = () => {
    //     if (subContentNo > 0) {
    //       const newCourseContentData = [...courseContentData];
    //       newCourseContentData[0].Modules.pop();
    //       setCourseContentData(newCourseContentData);
    //       setSubContentNo(subContentNo - 1);
    //     }
    //   };
    const handleInputChange = (field, value) => {
        const newCourseContentData = { ...courseContentData[0], [field]: value };
        setCourseContentData([newCourseContentData]);
    };

    const handleSubModuleChange = (index, field, value) => {
        const newSubModules = [...courseContentData[0].subModules];
        newSubModules[index][field] = value;
        const newCourseContentData = { ...courseContentData[0], subModules: newSubModules };
        setCourseContentData([newCourseContentData]);
    };

    const addSubModule = () => {
        const newSubModules = [
            ...courseContentData[0].subModules,
            { subModuleNm: '', contentDetails: '', moduleDuration: '' }
        ];
        const newCourseContentData = { ...courseContentData[0], subModules: newSubModules };
        setCourseContentData([newCourseContentData]);
    };

    const removeSubModule = () => {
        if (courseContentData[0].subModules.length > 1) {
            const newSubModules = courseContentData[0].subModules.slice(0, -1);
            const newCourseContentData = { ...courseContentData[0], subModules: newSubModules };
            setCourseContentData([newCourseContentData]);
        }
    };


    // excel download 
    const handleDownloadXLS = () => {
        const link = document.createElement('a');
        link.href = sampleContentXls; // Replace with the URL of your file
        link.download = 'ContentSample.xls'; // The name for the downloaded file 
        link.click();
    }

    const handleContentDetails = () => {
        // console.log(courseContentData)
        axios.post(`${api2}/course/courseModuleUpload`, courseContentData)
            .then((Response) => {
                console.log(" data : ", Response.data);
                // setCourseList(Response.data.result);
                // handleAllCourseList()
                handleAllCourseList()
                toast.success("Add Content Successfully!", {
                    position: "top-center",
                    style: { fontWeight: 'bold' },
                });
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }

    // Content add Module 
    const [showEditCourseContent, setShowEditCourseContent] = useState(false);
    const handleEditCourseContentClose = () => setShowEditCourseContent(false);
    const handleEditCourseContentShow = () => setShowEditCourseContent(true)
    const [moduleList, setModuleList] = useState();
    const [module, setmodule] = useState('');
    const [submoduleList, setSubModuleList] = useState();
    const [submodule, setSubmodule] = useState('');
    const [subModuleDetails, setSubModuleDetails] = useState('');
    const [subModuleBasicDetails, setSubModuleBasicDetails] = useState({})
    const [contentChk, setContentChk] = useState(false)
    const [submoduleContent, setSubmoduleContent] = useState('')
    const [moduleListView, setModuleListView] = useState();
    const [moduleView, setmoduleView] = useState('');
    const [submoduleListView, setSubModuleListView] = useState();
    const [submoduleView, setSubmoduleView] = useState('');
    const [subModuleContentPdf, setSubmoduleContentPdf] = useState();
    const [course,setCourse] = useState();



    // for the page validation check
    const [userType, setUserType] = useState('');



    const handleModuleName = (courseNm, courseCode) => {
        console.log('content clicked')
        axios.post(`${api2}/course/getCourseModuleList`, {
            courseName: courseNm,
            courseId: courseCode
        })
            .then((Response) => {
                console.log(" data : ", Response.data);
                setModuleList(Response.data);
                setModuleListView(Response.data)

                // handleAllCourseList()
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }
    useEffect(() => {
        // setSubModuleDetails('')
    }, [moduleList])
    useEffect(() => {
        setCourseContentData([{
            courseId: '',
            courseName: '',
            contentName: '',
            contentId: '',
            contentDuration: '',
            subModules: [
                {
                    subModuleNm: '',
                    contentDetails: '',
                    moduleDuration: ''
                }
            ]
        }])
        setIsChecked(false)
        // setSubModuleDetails('')
    }, [submoduleList])

    useEffect(() => {
        if (module) {
            axios.post(`${api2}/course/getCourseModuleData`, JSON.parse(module)
                //     {
                //     contentName:module,
                // }
            )
                .then((Response) => {
                    console.log(" data : ", Response.data);
                    setSubModuleList(Response.data[0].subModules);
                    // setSubModuleListView(Response.data[0].subModules)
                    // setCourseContentData([{
                    //     contentDuration:Response.data[0].contentDuration,
                    //     contentId:Response.data[0].contentId,
                    //     contentName:Response.data[0].contentName,
                    //     courseId:Response.data[0].courseId,
                    //     courseName:Response.data[0].courseName
                    // }])
                    setSubModuleBasicDetails(
                        {
                            contentDuration: Response.data[0].contentDuration,
                            contentId: Response.data[0].contentId,
                            contentName: Response.data[0].contentName,
                            courseId: Response.data[0].courseId,
                            courseName: Response.data[0].courseName,
                            subModules: ''
                        }
                    )
                    // handleAllCourseList()

                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }, [module])
    useEffect(() => {
        if (moduleView) {
            axios.post(`${api2}/course/getCourseModuleData`, JSON.parse(moduleView)
                //     {
                //     contentName:moduleView,
                // }
            )
                .then((Response) => {
                    console.log(" data : ", Response.data);
                    // setSubModuleList(Response.data[0].subModules);
                    setSubModuleListView(Response.data[0].subModules)
                    // setCourseContentData([{
                    //     contentDuration:Response.data[0].contentDuration,
                    //     contentId:Response.data[0].contentId,
                    //     contentName:Response.data[0].contentName,
                    //     courseId:Response.data[0].courseId,
                    //     courseName:Response.data[0].courseName
                    // }])
                    // setSubModuleBasicDetails(
                    //     {
                    //         contentDuration:Response.data[0].contentDuration,
                    //         contentId:Response.data[0].contentId,
                    //         contentName:Response.data[0].contentName,
                    //         courseId:Response.data[0].courseId,
                    //         courseName:Response.data[0].courseName,
                    //         subModules:'' 
                    //     }
                    // )
                    // handleAllCourseList()


                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }, [moduleView])

    useEffect(() => {
        if (submodule) {
            console.log(submodule.subModuleNm)
            axios.post(`${api2}/course/getCourseModuleDataBySubModuleName`, JSON.parse(submodule))
                .then((Response) => {
                    console.log(" data : ", Response.data);
                    setSubModuleDetails(Response.data[0].subModules);
                    // handleAllCourseList()
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }, [submodule])

    const handleEditContentdetails = () => {
        axios.post(`${api2}/course/editCourseModuleData`, subModuleDetails)
            .then((Response) => {
                console.log(" data : ", Response.data);
                // setSubModuleDetails(Response.data);
                // handleAllCourseList()
                handleAllCourseList()
                toast.success("Course content updated Successfully!", {
                    position: "top-center",
                    style: { fontWeight: 'bold' },
                });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
        //    console.log("Checkbox is now: ", event.target.checked);
    };

    const handleAddNewSubContentdetails = () => {
        const dataToSend = [{
            ...subModuleBasicDetails,
            subModules: courseContentData[0].subModules,
        }];
        axios.post(`${api2}/course/editMultipleCourseModuleData`, dataToSend)
            .then((Response) => {
                console.log(" data : ", Response.data);
                // setSubModuleDetails(Response.data);
                // handleAllCourseList()
                handleAllCourseList()
                toast.success("Course content updated Successfully!", {
                    position: "top-center",
                    style: { fontWeight: 'bold' },
                });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const handleuploadSubmoduleContent = (e) => {
        const { name, value, type, files } = e.target;
        console.log(e.target.files)
        setSubmoduleContent({
            ...submoduleContent,
            [name]: type === 'file' ? files[0] : value
        });
    };

    const handleUploadSubModule = () => {
        const data = new FormData();
        data.append('contentId', subModuleDetails.subModuleId);
        data.append('subModuleNm', subModuleDetails.subModuleNm);
        // data.append('fileType', 'Co');
        data.append('file', submoduleContent.subModuleContent);
        axios.post(`${api2}/course/uploadCourseSubModuleDocumnet`, data, {})
            .then((Response) => {
                console.log(" data : ", Response.data);
                // setSubModuleDetails(Response.data);
                // handleAllCourseList()
                toast.success("Document Added Successfully!", {
                    position: "top-center",
                    style: { fontWeight: 'bold' },
                });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    useEffect(() => {
        // console.log(submoduleView);
        if (submoduleView) {
            // const subModuleId=JSON.parse(submoduleView)
            axios.post(`${api2}/course/getSubModuleContentFolderPath`, JSON.parse(submoduleView))
                .then((Response) => {
                    console.log(" data : ", Response.data);
                    setSubmoduleContentPdf(Response.data[0])
                    // setSubModuleDetails(Response.data);
                    // handleAllCourseList()
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }

    }, [submoduleView])
    const viewSubModuleDoc = (foldername) => {
        window.open(window.open(`${api2}/static/subModuleContents/` + foldername))
    }

    useEffect(() => {
        console.log('subModuleContentPdf', subModuleContentPdf)
    }, [subModuleContentPdf])


    // input change for search

    const inputChange = (e) => {
        const query = e.target.value;
        setSearchquery(query);

        if (query === '') {
            handleAllCourseList();
        } else {
            const filterData = searchres.filter((f) => {
                return (
                    (f.courseName && f.courseName.toLowerCase().includes(query.toLowerCase())) ||
                    (f.code && f.code.toLowerCase().includes(query.toLowerCase()))
                );
            });
            setCourseList(filterData);
        }
    };

    // for the page validation userType
    useEffect(() => {
        const type = localStorage.getItem('userType');
        setUserType(type);
        setIsLoading(false);
    }, []);


    useEffect(()=>{
        axios.get(`${api}/student/getCourseList`)
        .then((Response)=>{
            setCourse(Response?.data?.courseList)

        })
        .catch((error)=>{
           console.log(error);   
        })
    },[])


    if (isLoading) {
        return <div>loading...</div>;
    }

    if (userType !== 'Admin') {
        return <PageNotFound />
    }





    return (
        <>
            <div className='row ' style={{ marginTop: '58px',backgroundColor: '#f2edf3' }} >
                {/* <div className='row '>
                    <div className='container-fluid'>
                        <div className=' col-md-12 col-lg-12 col-sm-12 headLineBox d-flex justify-content-start'  >
                            <h4>Courses</h4>
                        </div>
                    </div>
                </div> */}
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
                        <div className="col-md-6 col-sm-6 col-lg-6">

                            <Stack spacing={2} direction="row" sx={{ justifyContent: 'flex-end' }}>
                                {/* <Button variant="contained" onClick={() => {
                                    handleDownloadXLS()
                                }}>Download Content Format</Button> */}
                                <Button variant="contained" onClick={() => {
                                    handleAddCourseShow()
                                }}>Add Course</Button>

                            </Stack>
                        </div>
                    </div>
                    <div className="col-md-12 col-lg-12 col-sm-12">
                        <div className="table-container" style={{ height: '90vh', overflowY: 'auto', zIndex: "1" }}>
                            <table className="table table-bordered pt-1" >
                                <thead style={{ position: 'sticky', top: -2, zIndex: 3 }}>
                                    <tr>
                                        <th>Courses</th>
                                        <th >Code</th>
                                        <th >Updated On</th>
                                        <th >Status</th>
                                        <th >Action</th>


                                    </tr>
                                </thead>

                                <tbody style={{ zIndex: 1 }}>
                                    {courseList?.map(courseList => {
                                        return (
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
                                                    <td><button style={{ background: 'transparent', border: 'none' }} className="custom-button" title='Edit'><i class="fa fa-edit custom-icon" style={{ color: 'rgb(212, 139, 2)', fontSize: "14pt", padding: '2px' }} onClick={() => {
                                                        // handleEditCourseData(courseList?.id)
                                                        handleEditCourseShow()
                                                        setEditCourseDetails({
                                                            courseName: courseList?.courseName,
                                                            code: courseList?.code,
                                                            description: courseList?.description,
                                                            // content: courseList?.description,
                                                            activeFlag: courseList?.activeFlag,
                                                            id: courseList?.id,

                                                        })
                                                    }}></i></button>
                                                        <button style={{ background: 'transparent', border: 'none' }} className="custom-button" title='Delete'><i class="fa fa-trash custom-icon" style={{ color: 'rgb(212, 139, 2)', fontSize: "14pt", padding: '2px' }} onClick={() => {
                                                            handleDeleteCourse(

                                                                courseList?.courseName,
                                                                courseList?.code,
                                                                courseList?.description,
                                                                //  courseList?.description,
                                                                courseList?.activeFlag,
                                                                courseList?.id,


                                                            )
                                                        }}></i></button>
                                                        <button style={{ background: 'transparent', border: 'none' }} className="custom-button" title='View'><i class="fa fa-eye custom-icon" style={{ color: 'rgb(212, 139, 2)', fontSize: "14pt", padding: '2px' }} onClick={() => {
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
                                                                courseName: courseList?.courseName,
                                                                courseCode: courseList?.code,
                                                                courseDesc: courseList?.description,
                                                                courseDocFolder: courseList?.folderName,
                                                                id: courseList?.id
                                                            })
                                                            setcourseContent(courseList?.folderName)
                                                            handleModuleName(courseList?.courseName, courseList?.code)
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

                <Modal.Body>
                    <div className='container-fluid'>
                        <div className='row'>
                            <div className=' col-md-12 headLineBox mb-3' >
                                <h4>Add Course</h4>
                            </div>

                        </div>

                        <div className="row">
                            <div className='col-6 p-2'>
                                <div>
                                    New Course

                                </div>
                                <div class="input-group" >
                                    <input type="text" class="form-control"
                                        name='courseName'
                                        value={addCourseDetails?.courseName}
                                        onChange={handleAddCourse}
                                        required
                                    />

                                </div>
                                <div className="row">

                                    {errors?.courseName && <div className="error">{errors.courseName}</div>}
                                </div>
                            </div>




                            <div className='col-6 p-2'>
                                <div>
                                    Course Code
                                </div>
                                <div class="input-group row">
                                    <input type="text" class="form-control"
                                        name='code'
                                        value={addCourseDetails?.code}
                                        onChange={handleAddCourse}
                                        required
                                    />
                                    {/* {errors?.courseName && <div className="error">{errors.courseName}</div>} */}
                                </div>

                                <div className="row">
                                    {errors?.code && <div className="error">{errors.code}</div>}
                                </div>
                            </div>

                        </div>


                        <div className="row">
                            <div className='col-12 p-2'>
                                <div>
                                    Course Description
                                </div>
                                <div class="input-group ">
                                    <textarea class="form-control" rows="5" id="comment" name='description' onChange={handleAddCourse} value={addCourseDetails?.description}></textarea>
                                </div>
                                {errors?.description && <div className="error">{errors?.description}</div>}
                            </div>
                        </div>
                        <div className="row">
                            <div className='col-3 p-2'>
                                Attach Content
                            </div>
                            <div className='col-5 p-2'>
                                <div class="input-group ">
                                    <input type="file" name='content' class="form-control-file" id="exampleFormControlFile1"
                                        onChange={handleAddCourse}
                                    />
                                </div>
                            </div>
                            <div className="col-4"></div>
                        </div>


                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {/* <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button> */}
                    <Stack spacing={2} direction="row" >
                        <Button variant="contained" onClick={() => {
                            handleAddCourseData()
                            // handleInsReviewClose()
                        }}>Add</Button>
                        {/* <Button variant="contained" color="success">
                    Prev
                    </Button> */}
                        <Button variant="secondary"
                            onClick={() => { handleAddCourseClose() }}
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

                <Modal.Body>

                    <div className='container-fluid'>
                        <div className='row'>


                            <div className=' col-md-12 headLineBox mb-3' >
                                <h4>Edit Course</h4>
                            </div>

                            <div className="row">
                                <div className='col-md-6'>
                                <div>
                                        Select course Name
                                    </div>
                                <select name='courseName' value={editCourseDetails.courseName} style={{ borderRadius: "10px", backgroundColor: "white" }} className="form-select  mb-3 mt-1 w-100" aria-label="Default select example" onChange={handleEditCourse}>
                                <option value="[]" selected>Courses</option>
                                {course?.length > 0 && course.map((data) => {
                                    const Course = data.Course;
                                    return (
                                        <option value={data.Course}>{data.Course}</option>
                                    );
                                })}
                            </select>
                                </div>
                                <div className='col-md-6'>
                                    <div>
                                        Unique Course Code
                                    </div>
                                    <div class="input-group ">
                                        <input type="text" class="form-control"
                                            name='code'
                                            value={editCourseDetails?.code}
                                            onChange={handleEditCourse}

                                        />
                                    </div>

                                </div>

                            </div>

                            <div className="row">
                                <div className='col-md-12 mt-4'>
                                    <div>
                                        Course Description
                                    </div>
                                    <div class="input-group ">
                                        <textarea class="form-control" rows="5" id="comment" name='description' onChange={handleEditCourse} value={editCourseDetails?.description}></textarea>
                                    </div>
                                </div>
                            </div>

                            <div className="row mt-4">
                                <div className='col-md-6'>
                                    <div>
                                        Status
                                    </div>
                                    <div>
                                        <select name='activeFlag' value={editCourseDetails?.activeFlag} onChange={handleEditCourse} class="form-control" id="exampleFormControlSelect1">
                                            <option value=''>---select---</option>
                                            <option value={1}>Active</option>
                                            <option value={0}>De-Active</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div>
                                        Attach Content
                                    </div>
                                    <div class="input-group ">
                                        <input type="file" name='content' class="form-control-file" id="exampleFormControlFile1"
                                            onChange={handleEditCourse}
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
                            // handleAddCourseData()
                            // handleInsReviewClose()
                            handleEditCourseData()
                        }}>Update</Button>
                        <Button variant="contained" onClick={() => {
                            // handleAddCourseData()
                            // handleInsReviewClose()
                            handleViewCourseContentShow()
                            handleEditCourseClose()
                            // setCourseContentData([{...courseContentData,courseContentData.courseName:editCourseDetails?.courseName,}])
                            setCourseContentData(prevState => [{
                                ...prevState[0],
                                courseName: editCourseDetails?.courseName,
                                courseId: editCourseDetails?.code
                            }]);
                        }}>Add Content</Button>
                        <Button variant="contained" onClick={() => {
                            handleEditCourseClose()
                            handleEditCourseContentShow()
                            handleModuleName(editCourseDetails?.courseName, editCourseDetails?.code)
                        }}>Edit Content</Button>

                        <Button variant="secondary"
                            onClick={() => { handleEditCourseClose() }}
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
                        <div className='row'>
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
                            <div className='col-md-2 p-2 d-flex align-items-center' >
                                email
                            </div>
                            <div className='col-md-4 p-2'>

                                <ScheduleEmChip individualEm={individualEm} setIndividualEm={setIndividualEm} />
                            </div>
                            {/* <div className='col-md-2 p-2'>
                                View Doc
                            </div> */}
                            {/* <div className='col-md-4 p-2'>
                                <div class="input-group ">
                                    <button className='btn btn-light' onClick={
                                        ()=>{viewDoc(viewCourse?.courseDocFolder)}}>View Doc</button>
                                </div>
                            </div> */}
                            <div className='col-md-12 p-4 d-flex justify-content-center ' >
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" checked={contentChk === true} onChange={() => { setContentChk(!contentChk) }} />
                                    <label class="form-check-label" for="inlineRadio1">Course Content</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" checked={contentChk === false} onChange={() => { setContentChk(!contentChk) }} />
                                    <label class="form-check-label" for="inlineRadio2">Sub-Module Content</label>
                                </div>
                            </div>

                            {contentChk && <div className='col-md-12 col-lg-12 scroll' style={{ paddingRight: '0px', paddingLeft: '0px' }}>
                                <table className="table table-bordered">
                                    <thead style={{ textAlign: "center" }}>
                                        <tr>
                                            {/* <th>No.</th> */}

                                            <th>Course content</th>
                                            {/* <th>Timestamp</th> */}
                                            <th>View</th>

                                        </tr>
                                    </thead>
                                    <tbody >
                                        {courseContent?.map((val, index) => {
                                            return (
                                                <tr key={index} >
                                                    {/* <td style={{ fontSize: '14px' }}>{index + 1}</td> */}

                                                    <td style={{ fontSize: '14px' }}>{val?.file}</td>
                                                    {/* <td style={{ fontSize: '14px' }}>{val?.status === 1 ? "Active" : "Deactive"}</td> */}
                                                    {/* <td><div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "5px" }}><div><FaEdit onClick={handleShow} style={{ cursor: "pointer" }} /></div></div></td> */}
                                                    {/* <td>{
                                                        (()=>{
                                                            const parts = val?.file.split('_');

                                                            // Step 2: Extract the date and time part (third part)
                                                            if(parts.length>1){console.log
                                                            const datetimePart = parts[2].replace('.pdf', '');
                                                            

                                                            // Step 3: Split the date and time by dash and colon
                                                            const [datePart, timePart] = datetimePart.split('-').join(':').split(':', 6);

                                                            // Combine the date and time parts into a proper format
                                                            const datetime = `${datePart.slice(0, 4)}-${datePart.slice(4, 6)}-${datePart.slice(6)} ${timePart.slice(0, 2)}:${timePart.slice(2, 4)}:${timePart.slice(4)}`;
                                                            return datetime
                                                            }
                                                        })()
                                                        }</td> */}
                                                    <td><button className='btn btn-light' onClick={
                                                        () => { viewDoc(val?.path) }}>View Doc</button></td>

                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>}

                            {!contentChk &&

                                <>

                                    <div className='col-md-2 p-2'>
                                        Select Module Name
                                    </div>
                                    <div className='col-md-4 p-2'>
                                        <select name='gender'
                                            value={moduleView} onChange={(e) => { setmoduleView(e.target.value) }}
                                            class="form-control" id="exampleFormControlSelect1">
                                            <option value=''>---select---</option>
                                            {moduleListView?.map(val => <option value={JSON.stringify(val)}>{val.contentName}</option>)}
                                            {/* <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Others">Others</option> */}
                                        </select>
                                    </div>
                                    <div className='col-md-2 p-2'>
                                        Select Sub-Module Name
                                    </div>
                                    <div className='col-md-4 p-2'>
                                        <select name='gender'
                                            value={submoduleView} onChange={(e) => { setSubmoduleView(e.target.value) }}
                                            class="form-control" id="exampleFormControlSelect1">
                                            <option value=''>---select---</option>
                                            {submoduleListView?.map(val => {
                                                console.log(val)
                                                return (<option value={JSON.stringify(val)}>{val.subModuleNm}</option>)
                                            })}
                                            {/* <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Others">Others</option> */}
                                        </select>
                                    </div>
                                    <div className='col-md-12 col-lg-12 scroll' style={{ paddingRight: '0px', paddingLeft: '0px' }}>
                                        <table className="table table-bordered">
                                            <thead style={{ textAlign: "center" }}>
                                                <tr>
                                                    {/* <th>No.</th> */}

                                                    <th>Course Sub content</th>
                                                    {/* <th>Timestamp</th> */}
                                                    <th>View</th>

                                                </tr>
                                            </thead>
                                            <tbody >{console.log(subModuleContentPdf)}
                                                {subModuleContentPdf?.contentDocPath?.map((val, index) => {
                                                    return (
                                                        <tr key={index} >
                                                            {/* <td style={{ fontSize: '14px' }}>{index + 1}</td> */}

                                                            <td style={{ fontSize: '14px' }}>{val?.file}</td>
                                                            {/* <td style={{ fontSize: '14px' }}>{val?.status === 1 ? "Active" : "Deactive"}</td> */}
                                                            {/* <td><div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "5px" }}><div><FaEdit onClick={handleShow} style={{ cursor: "pointer" }} /></div></div></td> */}
                                                            {/* <td>{
                                                        (()=>{
                                                            const parts = val?.file.split('_');

                                                            // Step 2: Extract the date and time part (third part)
                                                            if(parts.length>1){console.log
                                                            const datetimePart = parts[2].replace('.pdf', '');
                                                            

                                                            // Step 3: Split the date and time by dash and colon
                                                            const [datePart, timePart] = datetimePart.split('-').join(':').split(':', 6);

                                                            // Combine the date and time parts into a proper format
                                                            const datetime = `${datePart.slice(0, 4)}-${datePart.slice(4, 6)}-${datePart.slice(6)} ${timePart.slice(0, 2)}:${timePart.slice(2, 4)}:${timePart.slice(4)}`;
                                                            return datetime
                                                            }
                                                        })()
                                                        }</td> */}
                                                            <td><button className='btn btn-light' onClick={
                                                                () => { viewSubModuleDoc(val?.path) }}>View Doc</button></td>

                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {/* <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button> */}
                    <Stack spacing={2} direction="row" >
                        <Button variant="contained" onClick={() => {
                            sendEmailCourse(viewCourse?.id)
                            // handleInsReviewClose()
                        }}>Send</Button>
                        {/* <Button variant="contained" color="success">
                    Prev
                    </Button> */}
                        <Button variant="secondary"
                            onClick={() => { handleViewCourseClose() }}
                        >
                            Close
                        </Button>
                    </Stack>
                </Modal.Footer>
            </Modal>

            {/* Add Cource Content */}
            <Modal show={showViewCourseContent} onHide={handleViewCourseContentClose} backdrop="static"
                keyboard={false}
                size='xl'>

                <Modal.Body>

                    <div className='container-fluid'>
                        <div className='row'>


                            <div className=' col-md-12 headLineBox mb-3' >
                                <h4>Add Course Content</h4>
                            </div>


                            <div className='col-md-2 p-2'>
                                Course Name
                            </div>
                            <div className='col-md-4 p-2'>
                                {/* <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='courseName'
                                        value={editCourseDetails?.courseName}
                                        onChange={handleEditCourse }
                                    />
                                </div> */}
                                <div>
                                    <p>{editCourseDetails?.courseName}</p>

                                </div>
                            </div>
                            <div className='col-md-2 p-2'>
                                Course Code
                            </div>
                            <div className='col-md-4 p-2'>
                                {/* <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='code'
                                        value={editCourseDetails?.code}
                                        onChange={handleEditCourse }
                                        
                                    />
                                </div> */}
                                <div>
                                    <p>{editCourseDetails?.code}</p>
                                </div>
                            </div>
                            {/* <div className='col-md-2 p-2'>
                                Course Description
                            </div>
                            <div className='col-md-10 p-2'>
                                <div class="input-group ">
                                    <textarea class="form-control" rows="5" id="comment" name='description' onChange={handleEditCourse} value={editCourseDetails?.description}></textarea>
                                </div>
                            </div> */}

                            {/* <div className='col-md-2 p-2'>
                                Content
                            </div>
                            <div className='col-md-4 p-2'>
                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='code'
                                       
                                        
                                    />
                                </div>
                            </div>
                            <div className='col-md-2 p-2'>
                                Duration
                            </div>
                            <div className='col-md-4 p-2'>
                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='code'
                                       
                                        
                                    />
                                </div>
                            </div>
                            
                            <div className='col-md-2 p-2'>
                                Sub-Content
                            </div>
                            <div className='col-md-6 p-2'>
                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='code'
                                        
                                        
                                    />
                                </div>
                            </div>
                            <div className='col-md-2 p-2'>
                                Duration
                            </div>
                            <div className='col-md-2 p-2'>
                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='code'
                                        
                                        
                                    />
                                </div>
                            </div>
                            
                            <div className='col-md-2 p-2'>
                                Description
                            </div>
                            <div className='col-md-10 p-2'>
                            <div class="input-group ">
                                    <textarea class="form-control" rows="5" id="comment" name='description' 
                                    
                                    ></textarea>
                                </div>
                            </div>
                            

                            {subContentNo>1 && 
                            <>
                            
                           
                            <div className='col-md-2 p-2'>
                                Sub-Content 2
                            </div>
                            <div className='col-md-6 p-2'>
                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='code'
                                        
                                        
                                    />
                                </div>
                            </div>
                            <div className='col-md-2 p-2'>
                                Duration
                            </div>
                            <div className='col-md-2 p-2'>
                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='code'
                                       
                                        
                                    />
                                </div>
                            </div>
                            
                            <div className='col-md-2 p-2'>
                                Description
                            </div>
                            <div className='col-md-10 p-2'>
                            <div class="input-group ">
                                    <textarea class="form-control" rows="5" id="comment" name='description' 
                                    
                                    ></textarea>
                                </div>
                            </div>
                            
                            </>
                            }
                            {subContentNo>2 && 
                            <>
                            
                            
                            <div className='col-md-2 p-2'>
                                Sub-Content 2
                            </div>
                            <div className='col-md-6 p-2'>
                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='code'
                                        
                                        
                                    />
                                </div>
                            </div>
                            <div className='col-md-2 p-2'>
                                Duration
                            </div>
                            <div className='col-md-2 p-2'>
                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='code'
                                        
                                        
                                    />
                                </div>
                            </div>
                            
                            <div className='col-md-2 p-2'>
                                Description
                            </div>
                            <div className='col-md-10 p-2'>
                            <div class="input-group ">
                                    <textarea class="form-control" rows="5" id="comment" name='description' 
                                    
                                    ></textarea>
                                </div>
                            </div>
                            
                            </>
                            }
                            {subContentNo>3 && 
                            <>
                            
                            
                            <div className='col-md-2 p-2'>
                                Sub-Content 2
                            </div>
                            <div className='col-md-6 p-2'>
                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='code'
                                       
                                        
                                    />
                                </div>
                            </div>
                            <div className='col-md-2 p-2'>
                                Duration
                            </div>
                            <div className='col-md-2 p-2'>
                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='code'
                                      
                                        
                                    />
                                </div>
                            </div>
                            
                            <div className='col-md-2 p-2'>
                                Description
                            </div>
                            <div className='col-md-10 p-2'>
                            <div class="input-group ">
                                    <textarea class="form-control" rows="5" id="comment" name='description' 
                                    
                                    ></textarea>
                                </div>
                            </div>
                            
                            </>
                            }
                            {subContentNo>4 && 
                            <>
                            
                            
                            <div className='col-md-2 p-2'>
                                Sub-Content 2
                            </div>
                            <div className='col-md-6 p-2'>
                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='code'
                                        
                                        
                                    />
                                </div>
                            </div>
                            <div className='col-md-2 p-2'>
                                Duration
                            </div>
                            <div className='col-md-2 p-2'>
                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='code'
                                    
                                        
                                    />
                                </div>
                            </div>
                            
                            <div className='col-md-2 p-2'>
                                Description
                            </div>
                            <div className='col-md-10 p-2'>
                            <div class="input-group ">
                                    <textarea class="form-control" rows="5" id="comment" name='description' 
                                  
                                    ></textarea>
                                </div>
                            </div>
                            
                            </>
                            }
                            {subContentNo>5 && 
                            <>
                            
                           
                            <div className='col-md-2 p-2'>
                                Sub-Content 2
                            </div>
                            <div className='col-md-6 p-2'>
                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='code'
                                        
                                    />
                                </div>
                            </div>
                            <div className='col-md-2 p-2'>
                                Duration
                            </div>
                            <div className='col-md-2 p-2'>
                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='code'
                                     
                                        
                                    />
                                </div>
                            </div>
                            
                            <div className='col-md-2 p-2'>
                                Description
                            </div>
                            <div className='col-md-10 p-2'>
                            <div class="input-group ">
                                    <textarea class="form-control" rows="5" id="comment" name='description' 
                                   
                                    ></textarea>
                                </div>
                            </div>
                            
                            </>
                            }
                            {subContentNo>6 && 
                            <>
                            
                            
                            <div className='col-md-2 p-2'>
                                Sub-Content 2
                            </div>
                            <div className='col-md-6 p-2'>
                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='code'
                                     
                                        
                                    />
                                </div>
                            </div>
                            <div className='col-md-2 p-2'>
                                Duration
                            </div>
                            <div className='col-md-2 p-2'>
                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='code'
                                       
                                        
                                    />
                                </div>
                            </div>
                            
                            <div className='col-md-2 p-2'>
                                Description
                            </div>
                            <div className='col-md-10 p-2'>
                            <div class="input-group ">
                                    <textarea class="form-control" rows="5" id="comment" name='description' 
                                 
                                    ></textarea>
                                </div>
                            </div>
                            
                            </>
                            }
                            {subContentNo>7 && 
                            <>
                            
                          
                            <div className='col-md-2 p-2'>
                                Sub-Content 2
                            </div>
                            <div className='col-md-6 p-2'>
                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='code'
                                        
                                        
                                    />
                                </div>
                            </div>
                            <div className='col-md-2 p-2'>
                                Duration
                            </div>
                            <div className='col-md-2 p-2'>
                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='code'
                                        
                                        
                                    />
                                </div>
                            </div>
                            
                            <div className='col-md-2 p-2'>
                                Description
                            </div>
                            <div className='col-md-10 p-2'>
                            <div class="input-group ">
                                    <textarea class="form-control" rows="5" id="comment" name='description' 
                                    
                                    ></textarea>
                                </div>
                            </div>
                            
                            </>
                            }
                            {subContentNo>8 && 
                            <>
                            
                            
                            <div className='col-md-2 p-2'>
                                Sub-Content 2
                            </div>
                            <div className='col-md-6 p-2'>
                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='code'
                                        
                                        
                                    />
                                </div>
                            </div>
                            <div className='col-md-2 p-2'>
                                Duration
                            </div>
                            <div className='col-md-2 p-2'>
                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='code'
                                       
                                        
                                    />
                                </div>
                            </div>
                            
                            <div className='col-md-2 p-2'>
                                Description
                            </div>
                            <div className='col-md-10 p-2'>
                            <div class="input-group ">
                                    <textarea class="form-control" rows="5" id="comment" name='description' 
                                    
                                    ></textarea>
                                </div>
                            </div>
                            
                            </>
                            }
                            {subContentNo>9 && 
                            <>
                            
                           
                            <div className='col-md-2 p-2'>
                                Sub-Content 2
                            </div>
                            <div className='col-md-6 p-2'>
                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='code'
                                      
                                        
                                    />
                                </div>
                            </div>
                            <div className='col-md-2 p-2'>
                                Duration
                            </div>
                            <div className='col-md-2 p-2'>
                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='code'
                                        
                                        
                                    />
                                </div>
                            </div>
                            
                            <div className='col-md-2 p-2'>
                                Description
                            </div>
                            <div className='col-md-10 p-2'>
                            <div class="input-group ">
                                    <textarea class="form-control" rows="5" id="comment" name='description' 
                                    
                                    ></textarea>
                                </div>
                            </div>
                            
                            </>
                            } */}
                            {/* {console.log(subContentNo)}
                            <div className='offset-md-11 col-md-1 p-2 d-flex justify-content-end'>
                            <i class="fa fa-plus"  style={{fontWeight:'bold',fontSize:'25px',paddingRight:'2px'}} onClick={() => {setSubContent(parseInt(subContentNo)+parseInt(1)) }} ></i>
                            <i class="fa fa-minus"  style={{fontWeight:'bold',fontSize:'25px',paddingLeft:'2px'}} onClick={() => {setSubContent(parseInt(subContentNo)-parseInt(1)) }} ></i>
                            </div> */}
                            {/* {courseContentData[0].Modules.map((module, index) => (
                                <>
                                    <div className="col-md-2 p-2">Content</div>
                                    <div className="col-md-4 p-2">
                                        <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="moduleNm"
                                            value={module.moduleNm}
                                            onChange={(e) => handleInputChange(index, 'moduleNm', e.target.value)}
                                        />
                                        </div>
                                    </div>
                                    <div className="col-md-2 p-2">Duration</div>
                                    <div className="col-md-4 p-2">
                                        <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="Duration"
                                            value={module.Duration}
                                            onChange={(e) => handleInputChange(index, 'Duration', e.target.value)}
                                        />
                                        </div>
                                    </div>
                                    <div className="col-md-2 p-2">Sub-Content</div>
                                    <div className="col-md-6 p-2">
                                        <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="contentDetails"
                                            value={module.contentDetails}
                                            onChange={(e) => handleInputChange(index, 'contentDetails', e.target.value)}
                                        />
                                        </div>
                                    </div>
                                    <div className="col-md-2 p-2">Duration</div>
                                    <div className="col-md-2 p-2">
                                        <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="Duration"
                                            value={module.Duration}
                                            onChange={(e) => handleInputChange(index, 'Duration', e.target.value)}
                                        />
                                        </div>
                                    </div>
                                    <div className="col-md-2 p-2">Description</div>
                                    <div className="col-md-10 p-2">
                                        <div className="input-group">
                                        <textarea
                                            className="form-control"
                                            rows="5"
                                            id="comment"
                                            name="description"
                                            value={module.description}
                                            onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                                        ></textarea>
                                        </div>
                                    </div>
                                </>
                                    ))}
                                    <div className="offset-md-11 col-md-1 p-2 d-flex justify-content-end">
                                        <i
                                        className="fa fa-plus"
                                        style={{ fontWeight: 'bold', fontSize: '25px', paddingRight: '2px' }}
                                        onClick={addSubContent}
                                        ></i>
                                        <i
                                        className="fa fa-minus"
                                        style={{ fontWeight: 'bold', fontSize: '25px', paddingLeft: '2px' }}
                                        onClick={removeSubContent}
                                        ></i>
                                    </div> */}

                            <div className="col-md-2 p-2 d-flex align-items-center">Module Name</div>
                            <div className="col-md-4 p-2">
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="contentName"
                                        value={courseContentData[0].contentName}
                                        onChange={(e) => handleInputChange('contentName', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="col-md-1 p-2 d-flex align-items-center">Module No</div>
                            <div className="col-md-2 p-2">
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="contentName"
                                        value={courseContentData[0].contentId}
                                        onChange={(e) => handleInputChange('contentId', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className=" col-md-1 p-2 d-flex align-items-center">Total Duration</div>
                            <div className="col-md-2 p-2">
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="contentDuration"
                                        value={courseContentData[0].contentDuration}
                                        onChange={(e) => handleInputChange('contentDuration', e.target.value)}
                                    />
                                </div>
                            </div>

                            {courseContentData[0].subModules.map((subModule, index) => (
                                <>
                                    <div className="col-md-2 p-2 d-flex align-items-center">Sub-Module {index + 1}</div>
                                    <div className="col-md-6 p-2">
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="subModuleNm"
                                                value={subModule.subModuleNm}
                                                onChange={(e) => handleSubModuleChange(index, 'subModuleNm', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-2 p-2 d-flex align-items-center">Sub-Module Duration</div>
                                    <div className="col-md-2 p-2">
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="moduleDuration"
                                                value={subModule.moduleDuration}
                                                onChange={(e) => handleSubModuleChange(index, 'moduleDuration', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-2 p-2 d-flex align-items-center">Description</div>
                                    <div className="col-md-10 p-2">
                                        <div className="input-group">
                                            <textarea
                                                className="form-control"
                                                rows="5"
                                                id="comment"
                                                name="contentDetails"
                                                value={subModule.contentDetails}
                                                onChange={(e) => handleSubModuleChange(index, 'contentDetails', e.target.value)}
                                            ></textarea>
                                        </div>
                                    </div>
                                </>
                            ))}

                            <div className="offset-md-11 col-md-1 p-2 d-flex justify-content-end">
                                {/* <i
                                    className="fa fa-plus"
                                    style={{ fontWeight: 'bold', fontSize: '25px', paddingRight: '2px' }}
                                    onClick={addSubModule}
                                    ></i>
                                    <i
                                    className="fa fa-minus"
                                    style={{ fontWeight: 'bold', fontSize: '25px', paddingLeft: '2px' }}
                                    onClick={removeSubModule}
                                    ></i> */}
                                <Stack spacing={1} direction="row" >
                                    <Button variant="contained" onClick={addSubModule} color='success'>
                                        ADD
                                    </Button>
                                    <Button variant="contained" onClick={removeSubModule} color='error'>
                                        Delete
                                    </Button>
                                </Stack>
                            </div>

                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>

                    <Stack spacing={2} direction="row" >
                        <Button variant="contained" onClick={() => {
                            // handleAddCourseData()
                            // handleInsReviewClose()
                            handleEditCourseShow()
                            handleViewCourseContentClose()
                        }}>PREV</Button>
                        <Button variant="contained" onClick={() => {
                            // handleAddCourseData()
                            // handleInsReviewClose()
                            // handleEditCourseData()
                            handleContentDetails(editCourseDetails?.courseName, editCourseDetails?.code)
                        }}>ADD</Button>

                        <Button variant="secondary"
                            onClick={() => { handleViewCourseContentClose() }}
                        >
                            Close
                        </Button>
                    </Stack>
                </Modal.Footer>
            </Modal>


            {/* Edit Cource Content */}
            <Modal show={showEditCourseContent} onHide={handleEditCourseContentClose} backdrop="static"
                keyboard={false}
                size='lg'>

                <Modal.Body>

                    <div className='container-fluid'>
                        <div className='row'>


                            <div className=' col-md-12 headLineBox mb-3' >
                                <h4>Edit Course Content</h4>
                            </div>


                            <div className='col-md-2 p-2'>
                                Course Name
                            </div>
                            <div className='col-md-4 p-2'>

                                <div>
                                    <p>{editCourseDetails?.courseName}</p>

                                </div>
                            </div>
                            <div className='col-md-2 p-2'>
                                Course Code
                            </div>
                            <div className='col-md-4 p-2'>

                                <div>
                                    <p>{editCourseDetails?.code}</p>
                                </div>
                            </div>

                            <div className='col-md-2 p-2'>
                                Select Module Name
                            </div>
                            <div className='col-md-4 p-2'>
                                <select name='gender'
                                    value={module} onChange={(e) => { setmodule(e.target.value) }}
                                    class="form-control" id="exampleFormControlSelect1">
                                    <option value=''>---select---</option>
                                    {moduleList?.map(val => <option value={JSON.stringify(val)}>{val.contentName}</option>)}
                                    {/* <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Others">Others</option> */}
                                </select>
                            </div>
                            <div className='col-md-2 p-2'>
                                Select Sub-Module Name
                            </div>
                            <div className='col-md-4 p-2'>
                                <select name='gender'
                                    value={submodule} onChange={(e) => { setSubmodule(e.target.value) }}
                                    class="form-control" id="exampleFormControlSelect1">
                                    <option value=''>---select---</option>
                                    {submoduleList?.map(val => {
                                        console.log(val)
                                        return (<option value={JSON.stringify(val)}>{val.subModuleNm}</option>)
                                    })}
                                    {/* <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Others">Others</option> */}
                                </select>
                            </div>
                            <div className="col-md-2 p-2">Duration</div>
                            <div className="col-md-2 p-2">
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="moduleDuration"
                                        // value={subModule.moduleDuration}
                                        value={subModuleDetails.moduleDuration}
                                        // onChange={(e) => handleSubModuleChange(index, 'moduleDuration', e.target.value)}

                                        onChange={(e) => setSubModuleDetails({ ...subModuleDetails, moduleDuration: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="col-md-2 p-2">Description</div>{console.log(subModuleDetails)}
                            <div className="col-md-6 p-2">
                                <div className="input-group">
                                    <textarea
                                        className="form-control"
                                        rows="5"
                                        id="comment"
                                        name="contentDetails"
                                        // value={subModule.contentDetails}
                                        value={subModuleDetails.contentDetails}
                                        // onChange={(e) => handleSubModuleChange(index, 'contentDetails', e.target.value)}
                                        onChange={(e) => setSubModuleDetails({ ...subModuleDetails, contentDetails: e.target.value })}
                                    ></textarea>
                                </div>
                            </div>
                            <div className='col-md-2 p-2'>
                                Choose Sub-Module file
                            </div>
                            <div className='col-md-4 p-2'>
                                {/* <label for="formFile" class="form-label"></label>
                            <input class="form-control" type="file" id="formFile"/> */}
                                <div class="form-group">
                                    {/* <label for="subModuleFile">Choose Sub-Module file</label> */}
                                    <input type="file" class="form-control-file" id="subModuleFile" name='subModuleContent' onChange={handleuploadSubmoduleContent} />
                                </div>
                            </div>
                            <div className='col-md-2 p-2'>
                                <Button variant="contained" onClick={() => { handleUploadSubModule() }}>ADD</Button>
                            </div>
                            <div className=' col-md-4 p-2 d-flex justify-content-end'>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value=""
                                        id="flexCheckDefault"
                                        checked={isChecked}
                                        onChange={handleCheckboxChange}
                                    />
                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                        Add New Sub-Module
                                    </label>
                                </div>
                            </div>
                            {isChecked && courseContentData[0].subModules.map((subModule, index) => (
                                <>
                                    <div className="col-md-2 p-2">New Sub-Module {index + 1}</div>
                                    <div className="col-md-6 p-2">
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="subModuleNm"
                                                value={subModule.subModuleNm}
                                                onChange={(e) => handleSubModuleChange(index, 'subModuleNm', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-2 p-2">Duration</div>
                                    <div className="col-md-2 p-2">
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="moduleDuration"
                                                value={subModule.moduleDuration}
                                                onChange={(e) => handleSubModuleChange(index, 'moduleDuration', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-2 p-2">Description</div>
                                    <div className="col-md-10 p-2">
                                        <div className="input-group">
                                            <textarea
                                                className="form-control"
                                                rows="5"
                                                id="comment"
                                                name="contentDetails"
                                                value={subModule.contentDetails}
                                                onChange={(e) => handleSubModuleChange(index, 'contentDetails', e.target.value)}
                                            ></textarea>
                                        </div>
                                    </div>
                                </>
                            ))}

                            {isChecked && <div className="offset-md-11 col-md-1 p-2 d-flex justify-content-end">
                                {/* <i
                                    className="fa fa-plus"
                                    style={{ fontWeight: 'bold', fontSize: '25px', paddingRight: '2px' }}
                                    onClick={addSubModule}
                                    ></i>
                                    <i
                                    className="fa fa-minus"
                                    style={{ fontWeight: 'bold', fontSize: '25px', paddingLeft: '2px' }}
                                    onClick={removeSubModule}
                                    ></i> */}
                                <Stack spacing={1} direction="row" >
                                    <Button variant="contained" onClick={addSubModule} color='success'>
                                        ADD
                                    </Button>
                                    <Button variant="contained" onClick={removeSubModule} color='error'>
                                        Delete
                                    </Button>
                                </Stack>
                            </div>}
                            {/* <div className="col-md-2 p-2">Module Name</div>
                                <div className="col-md-6 p-2">
                                    <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="contentName"
                                        value={courseContentData[0].contentName}
                                        onChange={(e) => handleInputChange('contentName', e.target.value)}
                                    />
                                    </div>
                                </div>
                                <div className="col-md-2 p-2">Module No</div>
                                <div className="col-md-2 p-2">
                                    <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="contentName"
                                        value={courseContentData[0].contentId}
                                        onChange={(e) => handleInputChange('contentId', e.target.value)}
                                    />
                                    </div>
                                </div>
                                <div className="offset-md-8 col-md-2 p-2">Duration</div>
                                <div className="col-md-2 p-2">
                                    <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="contentDuration"
                                        value={courseContentData[0].contentDuration}
                                        onChange={(e) => handleInputChange('contentDuration', e.target.value)}
                                    />
                                    </div>
                                </div>

                                {courseContentData[0].subModules.map((subModule, index) => (
                                    <>
                                        <div className="col-md-2 p-2">Sub-Module {index + 1}</div>
                                        <div className="col-md-6 p-2">
                                            <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="subModuleNm"
                                                value={subModule.subModuleNm}
                                                onChange={(e) => handleSubModuleChange(index, 'subModuleNm', e.target.value)}
                                            />
                                            </div>
                                        </div>
                                        <div className="col-md-2 p-2">Duration</div>
                                        <div className="col-md-2 p-2">
                                            <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="moduleDuration"
                                                value={subModule.moduleDuration}
                                                onChange={(e) => handleSubModuleChange(index, 'moduleDuration', e.target.value)}
                                            />
                                            </div>
                                        </div>
                                        <div className="col-md-2 p-2">Description</div>
                                        <div className="col-md-10 p-2">
                                            <div className="input-group">
                                            <textarea
                                                className="form-control"
                                                rows="5"
                                                id="comment"
                                                name="contentDetails"
                                                value={subModule.contentDetails}
                                                onChange={(e) => handleSubModuleChange(index, 'contentDetails', e.target.value)}
                                            ></textarea>
                                            </div>
                                        </div>
                                    </>
                                ))}

                                <div className="offset-md-11 col-md-1 p-2 d-flex justify-content-end">
                                    <i
                                    className="fa fa-plus"
                                    style={{ fontWeight: 'bold', fontSize: '25px', paddingRight: '2px' }}
                                    onClick={addSubModule}
                                    ></i>
                                    <i
                                    className="fa fa-minus"
                                    style={{ fontWeight: 'bold', fontSize: '25px', paddingLeft: '2px' }}
                                    onClick={removeSubModule}
                                    ></i>
                                </div> */}

                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>

                    <Stack spacing={2} direction="row" >
                        <Button variant="contained" onClick={() => {
                            // handleAddCourseData()
                            // handleInsReviewClose()
                            handleEditCourseShow()
                            handleEditCourseContentClose()
                        }}>PREV</Button>
                        <Button variant="contained" onClick={() => {
                            // handleAddCourseData()
                            // handleInsReviewClose()
                            // handleEditCourseData()
                            // handleContentDetails(editCourseDetails?.courseName,editCourseDetails?.code)
                            handleEditContentdetails()
                            handleAddNewSubContentdetails()
                        }}>Update</Button>

                        <Button variant="secondary"
                            onClick={() => { handleEditCourseContentClose() }}
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