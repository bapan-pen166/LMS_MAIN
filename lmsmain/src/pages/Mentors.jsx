import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { FormControl, MenuItem, Select, InputLabel } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { button, Modal } from 'react-bootstrap';
import { cleanDigitSectionValue } from '@mui/x-date-pickers/internals/hooks/useField/useField.utils';
import Link, { json } from 'react-router-dom';

import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { api2 } from '../ApiUrl/ApiUrl';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../src/assets/css/Custom_Global_Style/Global.css';
import { CiSearch } from "react-icons/ci";
import verified from "../assets/img/linkedin verify/verified.png";
import not_verified from "../assets/img/linkedin verify/close.png";
import PageNotFound from '../ErrorPage/PageNotFound';
import * as Yup from 'yup';



export default function Mentors() {
    const [course, setCourse] = useState('')
    const [status, setStatus] = useState('')
    const [mentorList, setmentorlist] = useState([]);
    const [editdata, seteditdata] = useState([]);
    const [editedStatus, seteditedStatus] = useState('');
    // const [courseList,setCourseList]=useState([]);
    const [mentorData, setMentorData] = useState([]);
    const [BatchList, setBatchList] = useState([]);
    const [courseMentor, setCousementor] = useState([]);
    const [mentor, setMentor] = useState([]);
    const [batch, setBatch] = useState([]);
    const [batchpayload, setBatchpayload] = useState([]);

    //For linkedIn verify
    const [linkedinProfileLink, setLinkedinProfileLink] = useState('');

    // For linkedin verify for edit mentor part
    const [linkedinProfileLinkEdit, setLinkedinProfileLinkEdit] = useState('');

    // 
    const [verifiedStatus, setVerifiedStatus] = useState(false);
    const [notVerified, setNotVerified] = useState(true)

    // For linkedin for edit mentor part
    const [verifiedStatusEdit, setVerifiedStatusEdit] = useState(false);
    const [notVerifiedEdit, setNotVerifiedEdit] = useState(true)



    // For the search 
    const [searchres, setSearchres] = useState([]);
    const [searchquery, setSearchquery] = useState('');

    //for the page validation userType

    const [userType, setUserType] = useState('');
    const [isLoading, setIsLoading] = useState(true);


    // const handleMentorList = (e) => {
    //     console.log('submit click');
    //     // axios.post(`${api}/student/getStudentList`, { course: coursedata, status: status })
    //     axios.post(`http://192.168.1.7:5000/mentor/getMentorList`, { course: course, status: status })
    //         .then((Response) => {
    //             console.log(" data : ",Response.data);
    //             setmentorlist(Response.data.result);
    //         })
    //         .catch((error) => {
    //             console.error('Error:', error);
    //         });
    // }


    // const handleMentorStatus = (id,status) => {
    //     console.log('submit click');
    //     // axios.post(`${api}/student/getStudentList`, { course: coursedata, status: status })
    //     axios.post(`http://192.168.1.7:5000/mentor/editMentor`, { id,status })
    //         .then((Response) => {
    //             console.log(" data : ",Response.data);
    //             handleMentorList()
    //         })
    //         .catch((error) => {
    //             console.error('Error:', error);
    //         });
    // }

    // const handleCourseList = (e) => {
    //     console.log('submit click');
    //     // axios.post(`${api}/student/getStudentList`, { course: coursedata, status: status })
    //     axios.post(`http://192.168.1.7:5000/course/getCourseList`, {})
    //         .then((Response) => {
    //             console.log(" data : ",Response.data);
    //             setCourseList(Response.data.result);
    //         })
    //         .catch((error) => {
    //             console.error('Error:', error);
    //         });
    // }
    // const handleMentor = (e) => {
    //     console.log('submit click');
    //     // axios.post(`${api}/student/getStudentList`, { course: coursedata, status: status })
    //     axios.post(`http://192.168.1.7:5000/mentor/getMentor`, {})
    //         .then((Response) => {
    //             console.log(" data : ",Response.data);
    //             setMentorData(Response.data.result);
    //         })
    //         .catch((error) => {
    //             console.error('Error:', error);
    //         });
    // }
    // const handleBatchList = (courseMentor) => {
    //     console.log('submit click');
    //     // axios.post(`${api}/student/getStudentList`, { course: coursedata, status: status })
    //     axios.post(`http://192.168.1.7:5000/course/getBatchList`, {course:courseMentor})
    //         .then((Response) => {
    //             console.log(" data : ",Response.data);
    //             setBatchList(Response.data.result);
    //         })
    //         .catch((error) => {
    //             console.error('Error:', error);
    //         });
    // }
    // const handleSaveMentorBatch = (mentor,course,batch) => {
    //     console.log('submit click');
    //     // axios.post(`${api}/student/getStudentList`, { course: coursedata, status: status })
    //     axios.post(`http://192.168.1.7:5000/mentor/addMentorBatch`, {mentor:mentor,batchName:batch,course:course})
    //         .then((Response) => {
    //             console.log(" data : ",Response.data);
    //             handleMentorList()
    //             setCousementor([])
    //             setMentor([])
    //             setBatch([])
    //         })
    //         .catch((error) => {
    //             console.error('Error:', error);
    //         });
    // }






    useEffect(() => {
        // handleMentorList()

    }, [])
    // useEffect(()=>{handleBatchList(courseMentor)},[courseMentor])
    // edit instructor details 
    const [showinsdetails, setShowinsdetails] = useState(false);

    const handleCloseinsdetails = () => setShowinsdetails(false);
    const handleShowinsdetails = () => setShowinsdetails(true);
    const [editmentorDetails, setEditMentorDetails] = useState('');
    const handleEditMetorData = (id) => {
        console.log('submit click');
        // axios.post(`${api}/student/getStudentList`, { course: coursedata, status: status })
        axios.post(`${api2}/mentor/getMentorBasicList`, { mentorID: id })

            .then((Response) => {
                console.log(" data : ", Response.data);
                setEditMentorDetails(Response.data.result[0]);
                setEditMentorData(Response.data.result[0])
                // handleMetorData();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    const handleEditMentor = (e) => {
        const { name, value, type, files } = e.target;
        console.log(e.target.files)
        setEditMentorDetails({
            ...editmentorDetails,
            [name]: type === 'file' ? files[0] : value
        });
    };
    const handleUpdateMetorData = () => {
        console.log('submit click');
        // axios.post(`${api}/student/getStudentList`, { course: coursedata, status: status })
        axios.post(`${api2}/mentor/editMentorBasicInfo`, editmentorDetails)
            .then((Response) => {
                console.log(" data : ", Response.data);
                handleMetorData();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    // edit instructor courses
    const [showinspopup, setShowinspopup] = useState(false);

    const handleCloseinspopup = () => setShowinspopup(false);
    const handleShowinspopup = () => setShowinspopup(true);

    // Add instructor 
    const [showaddIns, setShowaddIns] = useState(false);
    const handleaddInsClose = () => setShowaddIns(false);
    const handleaddInsShow = () => setShowaddIns(true);

    const [addMentor, setAddMentor] = useState({
        name: '',
        gender: '',
        dob: '',
        highest_qualification: '',
        college_name: '',
        total_years_of_exp: '',
        mail_id: '',
        linked_in: linkedinProfileLinkEdit,
        country: '',
        profile_photo: null,
        phn_no: '',
        upload_certificate: null,
        instructor_id: '',
        pan_no: '',
        status: '',
    });


    const [mentorDetails, setMentorDetails] = useState([]);

    function handleMetorData() {
        console.log('submit click');
        // axios.post(`${api}/student/getStudentList`, { course: coursedata, status: status })
        axios.post(`${api2}/mentor/getMentorBasicList`, {})
            .then((Response) => {
                console.log(" data : ", Response.data.result);
                setMentorDetails(Response.data.result);
                setSearchres(Response.data.result);

            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    useEffect(() => {
        handleMetorData();
    }, [])

    // Delete Mentor data
    function handleMentorDelete(id) {
        axios.post(`${api2}/mentor/deleteMentor`, {
            id: id

        })
            .then((Response) => {
                console.log(" data : ", Response.data);
                // setCourseList(Response.data.result);
                handleMetorData()
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }




    const handleAddMentor = (e) => {
        const { name, value, type, files } = e.target;
        console.log(e.target.files)
        setAddMentor({
            ...addMentor,
            [name]: type === 'file' ? files[0] : value
        });
    };
    const handleAddMentorset = (e) => {
        console.log('submit click');
        // axios.post(`${api}/student/getStudentList`, { course: coursedata, status: status })
        axios.post(`${api2}/mentor/addMentor`, addMentor
            //      {
            //     name: addMentor.name,
            //     gender: addMentor.gender,
            //     dob: addMentor.dob,
            //     highest_qualification:addMentor.highest_qualification,
            //     college_name: addMentor.college_name,
            //     total_years_of_exp: addMentor.total_years_of_exp,
            //     mail_id: addMentor.mail_id,
            //     linked_in: addMentor.linked_in,
            //     country: addMentor.country,
            //     profile_photo: addMentor.profile_photo,
            //     phn_no: addMentor.phn_no,
            //     upload_certificate:addMentor.upload_certificate,
            //     instructor_id: addMentor.instructor_id,
            //     pan_no:addMentor.pan_no
            // }
        )
            .then((Response) => {
                console.log(" data : ", Response.data);
                handleMetorData()
                toast.success("Insert Successfully!", {
                    position: "top-center",
                });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }


    // edit course 

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

    const [courselistObj, setCourseListObj] = useState([]);
    const [courselist, setCourseList] = useState([]);
    const [courselistAllObj, setCourseListAllObj] = useState([]);
    const [courselistAll, setCourseListAll] = useState([]);
    const handleCourseData = (id) => {
        console.log('submit click');
        // axios.post(`${api}/student/getStudentList`, { course: coursedata, status: status })
        axios.post(`${api2}/mentor/getBatchesByMentorId`, { id: id })
            .then((Response) => {
                console.log(" data : ", Response.data);
                setCourseListObj(Response.data.result);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
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
    useEffect(() => {
        setCourseList(courselistObj.map(result => result.courseType));
    }, [courselistObj])
    useEffect(() => {
        setCourseListAll(courselistAllObj?.map(result => result.courseName));
    }, [courselistAllObj])




    // const courses = [
    //     'Oliver Hansen',
    //     'Van Henry',
    //     'April Tucker',
    //     'Ralph Hubbard',
    //     'Omar Alexander',
    //     'Carlos Abbott',
    //     'Miriam Wagner',
    //     'Bradley Wilkerson',
    //     'Virginia Andrews',
    //     'Kelly Snyder',
    //   ];
    // const [courseName, setCourseName] = useState(['April Tucker','Carlos Abbott','Bradley Wilkerson']);
    const handleChange = (event) => {
        setCourseList(event.target.value);
    };

    //   mentor course modal 

    const handleMentorCourseList = (id, courselist) => {
        console.log(courselist)
        axios.post(`${api2}/course/assignCourseToMentor`, {
            id: id,
            courseList: courselist
        })
            .then((Response) => {
                console.log(" data : ", Response.data);
                setCourseListAllObj(Response.data.result);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    //   mentor Review 
    const [showInsReview, setShowInsReview] = useState(false);
    const handleInsReviewClose = () => setShowInsReview(false);
    const handleInsReviewShow = () => setShowInsReview(true);

    // Add mentor basic Info 
    const [showaddInsBasicInfo, setShowaddInsBasicInfo] = useState(false);
    const handleaddInsBasicInfoClose = () => setShowaddInsBasicInfo(false);
    const handleaddInsBasicInfoShow = () => setShowaddInsBasicInfo(true);
    const [countryList, setCountryList] = useState([]);
    const [country, setCountry] = useState('');
    const [stateList, setStatelist] = useState([]);
    const [state, setState] = useState('');
    const [cityList, setCitylist] = useState([]);
    const [city, setCity] = useState('')

    const [addMentorEmail, setAddMentorEmail] = useState('');

    const handleChangeCountry = (event) => {
        // setCountry(event.target.value);
        const selectedCountry = event.target.value;
        console.log(selectedCountry.id); // Access the country ID
        console.log(selectedCountry.name); // Access the country name
        setCountry(selectedCountry);
    };

    const handleCountrylist = (e) => {
        //     console.log('submit click');
        //    console.log(email);
        axios.post(`${api2}/reg/getCountryList`, { countryPhrase: '' })
            .then((Response) => {
                console.log(Response.data);
                //    setInfo(Response.data.basicDetails);
                setCountryList(Response.data.countryList);

            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    // useEffect(() => {
    //     axios.post(`${api2}/reg/getCountryList`, { countryPhrase: '' })
    //       .then((response) => {
    //         console.log(response.data);
    //         setCountryList(response.data.countryList);
    //       })
    //       .catch((error) => {
    //         console.error('Error:', error);
    //       });
    //   }, []);
    //    country:[{id:country}]
    useEffect(() => { console.log(country) }, [country])
    useEffect(() => { console.log(state) }, [state])
    useEffect(() => { console.log(city) }, [city])
    useEffect(() => {
        handleStatelist()
    }, [country])
    const handleStatelist = () => {
        axios.post(`${api2}/reg/getStateList`, { country: [country] })
            .then((Response) => {
                console.log(Response.data);
                //    setInfo(Response.data.basicDetails);
                setStatelist(Response.data.stateList);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    const handleChangeState = (event) => {


        setState(event.target.value);
    };
    //  state:[{id:state}]
    useEffect(() => {
        handleCitylist()
    }, [state])
    const handleCitylist = () => {
        axios.post(`${api2}/reg/getCityList`, { state: [state] })
            .then((Response) => {
                console.log(Response.data);
                //    setInfo(Response.data.basicDetails);
                setCitylist(Response.data.cityList);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }
    const handleChangeCity = (event) => {


        setCity(event.target.value);
    };

    const [addMentorBasicInfo, setAddMentorBasicInfo] = useState({
        name: '',
        gender: '',
        dob: '',
        email: '',
        phoneNo: '',
        AlternatePhoneNo: '',
        address1: '',
        address2: '',
        country: country || { id: '', name: "" },
        state: state || { id: '', name: "" },
        city: city || { id: '', name: "" },
        pinNo: '',
        IdType: '',
        idNo: '',
    });
    // For the validations  ==>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    const [errors, setErrors] = useState({});

    const validationSchema = Yup.object({
        name: Yup.string().required("Name is required"),
        gender: Yup.string().required("Gender is required"),
        dob: Yup.date()
            .nullable() // Allows null or empty values
            .required("Date of Birth is required")
            .typeError("Invalid Date") // Handles invalid date formats
            .transform((value, originalValue) => {
                return originalValue === '' ? null : value; // Convert empty string to null
            }),
        email: Yup.string().email("Invalid email address").required("Email is required"),
        phoneNo: Yup.string().required("Phone number is required"),
        AlternatePhoneNo: Yup.string().optional(),
        address1: Yup.string().required("Address 1 is required"),
        address2: Yup.string().optional(),

        country: Yup.object({
            id: Yup.string().required("Country ID is required"),
            name: Yup.string().required("Country name is required")
        }).nullable().test('required', 'Country is required', value =>
            value && value.id && value.name && value.id.trim() !== '' && value.name.trim() !== ''
        ),

        state: Yup.object({
            id: Yup.string().required("State ID is required"),
            name: Yup.string().required("State name is required"),
            country_id: Yup.string().required("Country ID is required"),
        }).nullable().test('required', 'State is required', value =>
            value && value.id && value.name && value.id.trim() !== '' && value.name.trim() !== ''
        ),
        city: Yup.object({
            id: Yup.string().required("City ID is required"),
            name: Yup.string().required("City name is required"),
            state_id: Yup.string().required("State ID is required"),
        }).nullable().test('required', 'City is required', value =>
            value && value.id && value.name && value.id.trim() !== '' && value.name.trim() !== ''
        ).transform((value, originalValue) => {
            return originalValue === '' ? { id: '', name: '' } : value;
        }),

        pinNo: Yup.string().required("PIN code is required"),
        IdType: Yup.string().required("ID Type is required"),
        idNo: Yup.string().required("ID Number is required"),
    });







    const handleAddMentorBasicInfo = (e) => {
        const { name, value, type, files } = e.target;
        console.log(e.target.files)
        setAddMentorBasicInfo({
            ...addMentorBasicInfo,
            [name]: type === 'file' ? files[0] : value
        });
    };
    useEffect(() => { setAddMentorBasicInfo({ ...addMentorBasicInfo, country: country }) }, [country])
    useEffect(() => { setAddMentorBasicInfo({ ...addMentorBasicInfo, state: state }) }, [state])
    useEffect(() => { setAddMentorBasicInfo({ ...addMentorBasicInfo, city: city }) }, [city])

    const handleAddMentorBasicInfoApi = async (e) => {
        e?.preventDefault(); // Prevent default form submission

        console.log('Submit clicked');

        // Clear previous errors
        setErrors({});

        try {
            // Validate form data
            await validationSchema.validate(addMentorBasicInfo, { abortEarly: false });

            // Make API request
            const response = await axios.post(`${api2}/mentor/addMentorBasicDetails`, addMentorBasicInfo);

            // Handle success response
            console.log("Data:", response.data);
            handleMetorData();
            toast.success("Added Mentor Basic Details Successfully!", {
                position: "top-center",
                style: { fontWeight: 'bold' },
            });
        } catch (error) {
            if (error.name === 'ValidationError') {
                // Handle validation errors
                console.log(error.inner);
                const newErrors = {};
                error.inner.forEach(element => {
                    newErrors[element.path] = element.message;
                });
                setErrors(newErrors); // Update error state
            } else {
                // Handle API or other errors
                console.error('Error:', error);
                toast.error("An error occurred while adding the mentor details.", {
                    position: "top-center",
                    style: { fontWeight: 'bold' },
                });
            }
        }
    };



    // Add mentor Education Info 
    const [showaddInsEducationInfo, setShowaddInsEducationInfo] = useState(false);
    const handleaddInsEducationInfoClose = () => setShowaddInsEducationInfo(false);
    const handleaddInsEducationInfoShow = () => setShowaddInsEducationInfo(true);

    const [addMentorEducationInfo, setAddMentorEducationInfo] = useState({
        email: '',
        gradDegree: '',
        gradDept: '',
        gradPassout: '',
        gradInsNm: '',
        gradCgpa: '',
        hsPassout: '',
        hsInsNm: '',
        hsCgpa: '',
        matricPassout: '',
        matricNm: '',
        matricCgpa: '',

    });

    // for the mentor education info
    // For the validations  ==>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    const [errorsEducation, setErrorsEducation] = useState({});

    const validationSchemaEducation = Yup.object({
        email: Yup.string().email("Invalid email address").required("Email is required"),
        gradDegree: Yup.string().required("Graduation degree is required"),
        gradDept: Yup.string().required("Graduation department is required"),
        gradPassout: Yup.string().required("Graduation passout year is required"),
        gradInsNm: Yup.string().required("Graduation institution name is required"),
        gradCgpa: Yup.number().typeError("Graduation CGPA must be a number")
            .min(0, "Graduation CGPA cannot be less than 0")
            .max(10, "Graduation CGPA cannot be more than 10")
            .required("Graduation CGPA is required"),

        hsPassout: Yup.string().required("High school passout year is required"),
        hsInsNm: Yup.string().required("High school institution name is required"),
        hsCgpa: Yup.number().typeError("High school CGPA must be a number")
            .min(0, "High school CGPA cannot be less than 0")
            .max(10, "High school CGPA cannot be more than 10")
            .required("High school CGPA is required"),

        matricPassout: Yup.string().required("Matriculation passout year is required"),
        matricNm: Yup.string().required("Matriculation institution name is required"),
        matricCgpa: Yup.number().typeError("Matriculation CGPA must be a number")
            .min(0, "Matriculation CGPA cannot be less than 0")
            .max(10, "Matriculation CGPA cannot be more than 10")
            .required("Matriculation CGPA is required"),
    });




    useEffect(() => { setAddMentorEducationInfo({ ...addMentorEducationInfo, email: addMentorBasicInfo.email }) }, [addMentorBasicInfo.email])

    const handleAddMentorEducationInfo = (e) => {
        const { name, value, type, files } = e.target;
        console.log(e.target.files)
        setAddMentorEducationInfo({
            ...addMentorEducationInfo,
            [name]: type === 'file' ? files[0] : value
        });
    };
    const handleAddMentorEducationalInfoApi = (e) => {
        console.log('submit click');
        // axios.post(`${api}/student/getStudentList`, { course: coursedata, status: status })
        axios.post(`${api2}/mentor/updateMentorEducationDetails`, addMentorEducationInfo)
            .then((Response) => {
                console.log(" data : ", Response.data);
                handleMetorData()
                toast.success("Added Mentor Educational Info Successfully!", {
                    position: "top-center",
                });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    // Add mentor Proffesional Info 
    const [showaddInsProffesionInfo, setShowaddInsProffesionInfo] = useState(false);
    const handleaddInsProffesionInfoClose = () => setShowaddInsProffesionInfo(false);
    const handleaddInsProffesionInfoShow = () => setShowaddInsProffesionInfo(true);



    const [addMentorProffesionalInfo, setAddMentorProffesionalInfo] = useState({
        email: '',
        totalExp: '',
        currentOrg: '',
        currentDesg: '',
        LinkdinUrl: linkedinProfileLink,
        // profilePhoto: '',
        // uniCirtificate: '',
        activeFlag: '',


    });
    useEffect(() => { setAddMentorProffesionalInfo({ ...addMentorProffesionalInfo, email: addMentorBasicInfo.email }) }, [addMentorBasicInfo.email])
    const handleAddMentorProffesionalInfo = (e) => {
        const { name, value, type, files } = e.target;
        console.log(e.target.files)
        setAddMentorProffesionalInfo({
            ...addMentorProffesionalInfo,
            [name]: type === 'file' ? files[0] : value
        });
    };
    const handleAddMentorProffesionalInfoApi = (e) => {
        console.log('submit click');
        // axios.post(`${api}/student/getStudentList`, { course: coursedata, status: status })
        axios.post(`${api2}/mentor/updateMentorProfessionDetails`, addMentorProffesionalInfo)
            .then((Response) => {
                console.log(" data : ", Response.data);
                handleMetorData()
                toast.success("Added Mentor Proffesional Info Successfully!", {
                    position: "top-center",
                });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    // edit Mentor Details 
    const [showaddInsEditDetails, setShowaddInsEditDetails] = useState(false);
    const handleInsEditDetailsClose = () => setShowaddInsEditDetails(false);
    const handleInsEditDetailsShow = () => setShowaddInsEditDetails(true);
    const [editMentorData, setEditMentorData] = useState([]);
    const handleEditMentorData = (e) => {
        const { name, value, type, files } = e.target;
        console.log(e.target.files)
        setEditMentorData({
            ...editMentorData,
            [name]: type === 'file' ? files[0] : value
        });
    };
    const handleEditMetorDetails = (id) => {
        console.log('submit click');
        // axios.post(`${api}/student/getStudentList`, { course: coursedata, status: status })
        axios.post(`${api2}/mentor/getMentorAllBasicList`, { id: id })

            .then((Response) => {
                console.log(" data : ", Response.data);
                // setEditMentorDetails(Response.data.result[0]);
                setEditMentorData(Response.data.result[0])
                setCountry(Response.data.result[0].country)
                setState(Response.data.result[0].state)
                setCity(Response.data.result[0].city)
                // handleMetorData();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    useEffect(() => { setEditMentorData({ ...editMentorData, country: country }) }, [country])
    useEffect(() => { setEditMentorData({ ...editMentorData, state: state }) }, [state])
    useEffect(() => { setEditMentorData({ ...editMentorData, city: city }) }, [city])




    const handleEditMentorInfoApi = (e) => {
        console.log('submit click');
        // axios.post(`${api}/student/getStudentList`, { course: coursedata, status: status })
        axios.post(`${api2}/mentor/editMentorWholeInfo`, editMentorData)
            .then((Response) => {
                console.log(" data : ", Response.data);
                handleMetorData()
                toast.success("Updated Mentor Details Successfully!", {
                    position: "top-center",
                });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }


    const inputChange = (e) => {
        const query = e.target.value;
        setSearchquery(query);

        if (query === '') {
            handleMetorData();
        } else {
            const filterData = searchres.filter((f) => {
                return (
                    (f.name && f.name.toLowerCase().includes(query.toLowerCase())) ||
                    (f.highestQualifucation && f.highestQualifucation.toLowerCase().includes(query.toLowerCase())) ||
                    (f.phoneNumber && f.phoneNumber.toLowerCase().includes(query.toLowerCase()))
                );
            });
            setMentorDetails(filterData);
        }
    };


    const handleLinkdin = (e) => {
        const newLinkedInUrl = e.target.value;
        setLinkedinProfileLink(newLinkedInUrl);
        setNotVerified(true);
        setAddMentorProffesionalInfo((prevState) => ({
            ...prevState,
            LinkdinUrl: newLinkedInUrl,
        }));
    };



    const handleLinkdinEdiit = (e) => {
        const newLinkedInUrl = e.target.value;
        setLinkedinProfileLinkEdit(newLinkedInUrl);
        setNotVerifiedEdit(true);
        setEditMentorDetails((prevState) => ({
            ...prevState,
            LinkdinUrl: newLinkedInUrl,
        }));
    };


    const verifyLinkedIn = () => {
        axios.post(`${api2}/user/linkedinVerify`, { url: linkedinProfileLink })
            .then((response) => {
                console.log(response.data.success);
                setVerifiedStatus(response.data.success)
            })
            .catch((error) => {
                console.log(error)
                console.log("Error", error.response.data.success);
                setVerifiedStatus(error.response?.data.success)
                setNotVerified(error.response?.data.success);
            })
    }



    //for the page validation userType

    useEffect(() => {
        const type = localStorage.getItem('userType');
        setUserType(type);
        setIsLoading(false)
    }, []);


    if (isLoading) {
        return <div>loading...</div>;
    }

    if (userType !== 'Admin') {
        return <PageNotFound />
    }





    return (
        <>
            {/* <h1 style={{marginTop:'100px'}}>mentor</h1> */}
            <div className='row ' style={{ marginTop: '58px', backgroundColor:"#f2edf3" }} >
                {/* <div className='row '>
                    <div className='container-fluid'>
                        <div className=' col-md-12 col-lg-12 col-sm-12 headLineBox d-flex justify-content-start'  >
                            <h4>Mentor</h4>
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
                            {/* <button className="btn btn-">New Instructor</button> */}
                            <Stack spacing={2} direction="row" sx={{ justifyContent: 'flex-end' }}>
                                {/* <FormControl sx={{width:'200px'}}>
                            <InputLabel id="demo-simple-select-label" >Status</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                // value={age}
                                label="Age"
                                sx={{
                                    paddingTop: '10px', 
                                    paddingBottom: '10px', 
                                    '& .MuiSelect-select': {
                                        paddingLeft: '8px', 
                                        paddingRight: '8px', 
                                    },
                                }}
                                
                            >
                                <MenuItem value={10}>Active</MenuItem>
                                <MenuItem value={20}>De-Active</MenuItem>
                                
                            </Select>
                        </FormControl> */}
                                <Button variant="contained" onClick={() => {
                                    // handleaddInsShow() 
                                    handleaddInsBasicInfoShow()
                                    handleCountrylist()

                                    // handleCourseList()
                                    // handleMentor()
                                    // handleBatchList()
                                }}>Add Mentor</Button>

                            </Stack>
                        </div>
                    </div>
                    <div className="col-md-12 col-lg-12 col-sm-12">
                        <div className="table-container" style={{ height: '90vh', overflowY: 'auto', zIndex: "1" }}>
                            <table className="table table-bordered pt-1" >
                                <thead style={{ position: 'sticky', top: -2, zIndex: 3 }}>
                                    <tr>
                                        <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Mentor Id</th>
                                        <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Name</th>

                                        <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Phone No</th>
                                        <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Total Students</th>
                                        <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Total Batches</th>
                                        <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Status</th>

                                        <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Action</th>

                                    </tr>
                                </thead>
                                {console.log(mentorDetails)}
                                <tbody style={{ zIndex: 1 }}>
                                    {mentorDetails.map(mentorDetails => {
                                        return (
                                            <tr>
                                                <td>{mentorDetails?.id}</td>
                                                <td>{mentorDetails && mentorDetails?.name}</td>

                                                <td>{mentorDetails?.phoneNumber}</td>
                                                <td class="text-center align-middle">{mentorDetails?.NoOfStudents}</td>
                                                {/* <td style={{ display:"flex",justifyContent:"center",alignItems:"center"}}>{mentorDetails?.NoOfBatches}</td> */}
                                                <td class="text-center align-middle" >{mentorDetails?.NoOfBatches}</td>

                                                <td class="text-center align-middle">{mentorDetails?.activeFlag ? <span style={{ backgroundColor: 'green', color: 'white', padding: '5px' }}>Active</span> : <span style={{ backgroundColor: 'red', color: 'white', padding: '5px' }}>De-Active</span>}

                                                </td>
                                                <td className='d-flex' >
                                                    <button style={{ background: 'transparent', border: 'none' }} className="custom-button" title='Edit'><i class="fa fa-edit custom-icon" style={{ color: 'rgb(212, 139, 2)', fontSize: "14pt", padding: '2px' }} onClick={() => {
                                                        // handleShowinsdetails ()
                                                        handleInsEditDetailsShow()
                                                        handleCountrylist()
                                                        // handleEditMetorData(mentorDetails?.id)
                                                        handleEditMetorDetails(mentorDetails?.id)
                                                    }}></i></button>
                                                    <button style={{ background: 'transparent', border: 'none' }} className="custom-button" title='Delete'><i class="fa fa-trash custom-icon" style={{ color: 'rgb(212, 139, 2)', fontSize: "14pt", padding: '2px' }} onClick={() => {

                                                        handleMentorDelete(mentorDetails?.id)
                                                    }}></i></button>
                                                    <button style={{ background: 'transparent', border: 'none' }} className="custom-button" title='View'><i class="fa fa-eye custom-icon" style={{ color: 'rgb(212, 139, 2)', fontSize: "14pt", padding: '2px' }} onClick={() => {

                                                        handleShowinspopup()
                                                        //    handleCloseinsdetails()
                                                        handleCourseData(mentorDetails.id)
                                                        handleAllCourseList()
                                                    }}></i></button>
                                                </td>
                                            </tr>
                                        )

                                    })}



                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* edit instructor details  */}
            <Modal show={showinsdetails} onHide={handleCloseinsdetails} backdrop="static"
                keyboard={false}
                size='lg'>
                {/* <Modal.Header closeButton>
                    <Modal.Title>Modal Heading</Modal.Title>
                </Modal.Header> */}
                <Modal.Body>
                    <div className='container-fluid'>
                        <div className='row'>
                            {/* {console.log(editmentorDetails)} */}
                            <div className=' col-md-12 headLineBox mb-3' >
                                <h4>Edit Mentor</h4>
                            </div>
                            <div className='col-md-3 p-2'>
                                Name
                            </div>
                            <div className='col-md-3 p-2'>
                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='name'
                                        value={editmentorDetails?.name}
                                        onChange={handleEditMentor}

                                    />
                                </div>
                            </div>


                            <div className='col-md-3 p-2'>
                                Gender
                            </div>
                            <div className='col-md-3 p-2'>

                                <select name='Gender' value={editmentorDetails?.Gender} onChange={handleEditMentor} class="form-control" id="exampleFormControlSelect1">
                                    <option value=''>---select---</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                            <div className='col-md-3 p-2'>
                                Date Of Birth
                            </div>
                            <div className='col-md-3 p-2'>
                                <div class="input-group ">
                                    <input type="date" class="form-control"
                                        name='Dob'
                                        value={editmentorDetails?.Dob}
                                        onChange={handleEditMentor}

                                    />
                                </div>
                            </div>
                            <div className='col-md-3 p-2'>
                                Highest Qualification
                            </div>
                            <div className='col-md-3 p-2'>
                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='highestQualifucation'
                                        value={editmentorDetails.highestQualifucation}
                                        onChange={handleEditMentor}

                                    />
                                </div>
                            </div>
                            <div className='col-md-3 p-2'>
                                University/College Name
                            </div>
                            <div className='col-md-3 p-2'>
                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='universityName'
                                        value={editmentorDetails.universityName}
                                        onChange={handleEditMentor}

                                    />
                                </div>
                            </div>
                            <div className='col-md-3 p-2'>
                                Years Of Experience
                            </div>
                            <div className='col-md-3 p-2'>
                                <div class="input-group ">
                                    <input type="number" class="form-control"
                                        name='yearofExp'
                                        value={editmentorDetails.yearofExp}
                                        onChange={handleEditMentor}

                                    />
                                </div>
                            </div>
                            <div className='col-md-3 p-2'>
                                Email
                            </div>
                            <div className='col-md-3 p-2'>
                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='emailId'
                                        value={editmentorDetails.emailId}
                                        onChange={handleEditMentor}

                                    />
                                </div>
                            </div>
                            <div className='col-md-3 p-2'>
                                Phone No
                            </div>
                            <div className='col-md-3 p-2'>
                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='phoneNumber'
                                        value={editmentorDetails.phoneNumber}
                                        onChange={handleEditMentor}

                                    />
                                </div>
                            </div>
                            <div className='col-md-3 p-2'>
                                PAN No
                            </div>
                            <div className='col-md-3 p-2'>
                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='panNo'
                                        value={editmentorDetails.panNo}
                                        onChange={handleEditMentor}

                                    />
                                </div>
                            </div>
                            <div className='col-md-3 p-2'>
                                linkdin Url
                            </div>
                            <div className='col-md-3 p-2'>
                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        // name='linkedinLink'
                                        value={linkedinProfileLink}
                                        onChange={handleLinkdin}


                                    />
                                </div>
                            </div>
                            <div className='col-md-3 p-2'>
                                Upload Profile Photo
                            </div>
                            <div className='col-md-3 p-2'>
                                <div class="form-group" >

                                    <input type="file" name='profile_photo' class="form-control-file" id="exampleFormControlFile1" onChange={handleEditMentor} />
                                </div>
                            </div>
                            <div className='col-md-3 p-2'>
                                Upload University/ College Cirtificate
                            </div>
                            <div className='col-md-3 p-2'>
                                <div class="form-group" >

                                    <input type="file" name='upload_certificate' class="form-control-file" id="exampleFormControlFile1" onChange={handleEditMentor} />
                                </div>
                            </div>
                            <div className='col-md-3 p-2'>
                                Status
                            </div>
                            <div className='col-md-3 p-2'>
                                <select name='activeFlag'
                                    value={editmentorDetails?.activeFlag}
                                    onChange={handleEditMentor}
                                    class="form-control" id="exampleFormControlSelect1">
                                    <option value=''>---select---</option>
                                    <option value={1}>Active</option>
                                    <option value={0}>De-Active</option>
                                </select>
                            </div>

                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Stack spacing={2} direction="row" >
                        <Button variant="contained" onClick={() => {
                            handleCloseinsdetails()
                            handleUpdateMetorData()
                        }}>Update</Button>
                        <Button variant="contained" color="success" onClick={() => {
                            handleShowinspopup()
                            handleCloseinsdetails()
                            handleCourseData(editmentorDetails.id)
                            handleAllCourseList()
                        }}
                        >
                            Next
                        </Button>
                        <Button variant="secondary" onClick={handleCloseinsdetails} >
                            Close
                        </Button>
                    </Stack>
                </Modal.Footer>
            </Modal>

            {/* edit instructor course List */}
            <Modal show={showinspopup} onHide={handleCloseinspopup} backdrop="static"
                keyboard={false}
                size='md'>
                {/* <Modal.Header closeButton>
                    <Modal.Title>Modal Heading</Modal.Title>
                </Modal.Header> */}
                <Modal.Body>

                    <div className='container-fluid'>
                        <div className='row'>
                            <div className=' col-md-12 headLineBox mb-3' >
                                <h4>Mentor Courses List</h4>
                            </div>
                            {/* <div className='col-md-12'>
                                <div className='row'>
                                    <div className='col-md-2'>
                                        Courses
                                    </div>
                                    <div className='col-md-8'>
                                        {console.log('courselist', courselist)}
                                        {console.log('courselistAll', courselistAll)}
                                        <FormControl sx={{ m: 1, width: 250 }}>
                                            <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
                                            <Select
                                                labelId="demo-multiple-checkbox-label"
                                                id="demo-multiple-checkbox"
                                                multiple
                                                value={courselist}
                                                onChange={handleChange}
                                                input={<OutlinedInput label="Tag" />}
                                                renderValue={(selected) => selected.join(', ')}
                                                MenuProps={MenuProps}
                                            >
                                                {courselistAll?.map((name) => (
                                                    <MenuItem key={name} value={name}>
                                                        <Checkbox checked={courselist.indexOf(name) > -1} />
                                                        <ListItemText primary={name} />
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div className='col-md-2'>
                                        <Button variant="contained" onClick={() => { handleMentorCourseList(editMentorData?.id, courselist) }}>UPD</Button>
                                    </div>
                                </div>

                            </div> */}
                            <div className='col-md-12'>
                                <div className="table-container" >
                                    <table className="table table-bordered pt-1" >
                                        <thead style={{ position: 'sticky', top: -2, zIndex: 3 }}>
                                            <tr>
                                                <th>Course</th>
                                                <th>Batch</th>

                                            </tr>
                                        </thead>
                                        <tbody>{console.log(courselistObj)}
                                            {courselistObj?.map((courselist) => {
                                                return (
                                                    <tr>
                                                        <td>{courselist?.courseType}</td>
                                                        <td>{courselist?.batchName}</td>
                                                        {/* <td>{courselist?.status}</td> */}
                                                        {/* <td >{courselist?.status ? 'Active' : 'De-Active'}</td> */}
                                                    </tr>
                                                )
                                            }, [])}
                                            {/* <tr>
                                                <td>Lorem ipsum dolor sit.</td>
                                                <td>active</td>
                                            </tr>
                                            <tr>
                                                <td>Lorem ipsum dolor sit.</td>
                                                <td>active</td>
                                            </tr>
                                            <tr>
                                                <td>Lorem ipsum dolor sit.</td>
                                                <td>active</td>
                                            </tr>
                                            <tr>
                                                <td>Lorem ipsum dolor sit.</td>
                                                <td>active</td>
                                            </tr> */}
                                        </tbody>
                                    </table>
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
                        <Button variant="contained" color="success" onClick={() => {
                            // handleMentorStatus(editdata?.id,editedStatus)
                            handleCloseinspopup()
                            // handleShowinsdetails()
                            handleInsEditDetailsShow()
                        }}>prev</Button>
                        <Button variant="contained" color="success" onClick={() => {
                            handleInsReviewShow()
                            handleCloseinspopup()
                        }}>
                            Next
                        </Button>
                        <Button variant="secondary" onClick={handleCloseinspopup} >
                            Close
                        </Button>
                    </Stack>
                </Modal.Footer>
            </Modal>

            {/* instructor review     */}
            <Modal show={showInsReview} onHide={handleInsReviewClose} backdrop="static"
                keyboard={false}
                size='md'>
                {/* <Modal.Header closeButton>
                    <Modal.Title>Modal Heading</Modal.Title>
                </Modal.Header> */}
                <Modal.Body>

                    <div className='container-fluid'>
                        <div className='row'>
                            {/* <div className='col-md-12'>
                                <div className='row'>
                                    <div className='col-md-3'>
                                        Courses
                                    </div>
                                    <div className='col-md-7'>
                                        
                                        <FormControl sx={{ m: 1, width: 200 }}>
                                            <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
                                            <Select
                                            labelId="demo-multiple-checkbox-label"
                                            id="demo-multiple-checkbox"
                                            multiple
                                            value={courseName}
                                            onChange={handleChange}
                                            input={<OutlinedInput label="Tag" />}
                                            renderValue={(selected) => selected.join(', ')}
                                            MenuProps={MenuProps}
                                            >
                                            {courses.map((name) => (
                                                <MenuItem key={name} value={name}>
                                                <Checkbox checked={courseName.indexOf(name) > -1} />
                                                <ListItemText primary={name} />
                                                </MenuItem>
                                            ))}
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div className='col-md-2'>
                                    <Button variant="contained" >Save</Button>
                                    </div>
                                </div>

                            </div> */}
                            <div className=' col-md-12 headLineBox mb-3' >
                                <h4>Mentor Review</h4>
                            </div>
                            <div className='col-md-12'>
                                <div className="table-container" >
                                    <table className="table table-bordered pt-1" >
                                        <thead style={{ position: 'sticky', top: -2, zIndex: 3 }}>
                                            <tr>
                                                <th>Student</th>
                                                <th>Course Name</th>
                                                <th>Rating</th>
                                                <th>Review</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Lorem ipsum dolor sit.</td>
                                                <td>active</td>
                                                <td>Lorem ipsum dolor sit.</td>
                                                <td>active</td>
                                            </tr>
                                            <tr>
                                                <td>Lorem ipsum dolor sit.</td>
                                                <td>active</td>
                                                <td>Lorem ipsum dolor sit.</td>
                                                <td>active</td>
                                            </tr>
                                            <tr>
                                                <td>Lorem ipsum dolor sit.</td>
                                                <td>active</td>
                                                <td>Lorem ipsum dolor sit.</td>
                                                <td>active</td>
                                            </tr>
                                            <tr>
                                                <td>Lorem ipsum dolor sit.</td>
                                                <td>active</td>
                                                <td>Lorem ipsum dolor sit.</td>
                                                <td>active</td>
                                            </tr>
                                        </tbody>
                                    </table>
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
                        <Button variant="contained" onClick={() => {
                            // handleMentorStatus(editdata?.id,editedStatus)
                            handleInsReviewClose()
                        }}>Save</Button>
                        <Button variant="contained" color="success" onClick={() => {
                            handleShowinspopup()
                            handleInsReviewClose()
                        }}>
                            Prev
                        </Button>
                        <Button variant="secondary" onClick={() => { handleInsReviewClose() }} >
                            Close
                        </Button>
                    </Stack>
                </Modal.Footer>
            </Modal>

            {/* Add Instructor modal  */}
            <Modal show={showaddIns} onHide={handleaddInsClose} backdrop="static"
                keyboard={false}
                size='lg'>
                {/* <Modal.Header closeButton>
                    <Modal.Title>Modal Heading</Modal.Title>
                </Modal.Header> */}
                <Modal.Body>
                    {/* <p>Modal content goes here.</p> */}
                    <div className='container-fluid'>
                        <div className='row'>
                            <div className=' col-md-12 headLineBox mb-3' >
                                <h4>Add Mentor</h4>
                            </div>
                            <div className='col-md-3 p-2'>
                                Name
                            </div>
                            <div className='col-md-3 p-2'>
                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='name'
                                        value={addMentor?.name}
                                        onChange={handleAddMentor}

                                    />
                                </div>
                            </div>


                            <div className='col-md-3 p-2'>
                                Gender
                            </div>
                            <div className='col-md-3 p-2'>

                                <select name='gender' value={addMentor?.gender} onChange={handleAddMentor} class="form-control" id="exampleFormControlSelect1">
                                    <option value=''>---select---</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                            <div className='col-md-3 p-2'>
                                Date Of Birth
                            </div>
                            <div className='col-md-3 p-2'>
                                <div class="input-group ">
                                    <input type="date" class="form-control"
                                        name='dob'
                                        value={addMentor?.dob}
                                        onChange={handleAddMentor}

                                    />
                                </div>
                            </div>
                            <div className='col-md-3 p-2'>
                                Highest Qualification
                            </div>
                            <div className='col-md-3 p-2'>
                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='highest_qualification'
                                        value={addMentor.highest_qualification}
                                        onChange={handleAddMentor}

                                    />
                                </div>
                            </div>
                            <div className='col-md-3 p-2'>
                                University/College Name
                            </div>
                            <div className='col-md-3 p-2'>
                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='college_name'
                                        value={addMentor.college_name}
                                        onChange={handleAddMentor}

                                    />
                                </div>
                            </div>
                            <div className='col-md-3 p-2'>
                                Years Of Experience
                            </div>
                            <div className='col-md-3 p-2'>
                                <div class="input-group ">
                                    <input type="number" class="form-control"
                                        name='total_years_of_exp'
                                        value={addMentor.total_years_of_exp}
                                        onChange={handleAddMentor}

                                    />
                                </div>
                            </div>
                            <div className='col-md-3 p-2'>
                                Email
                            </div>
                            <div className='col-md-3 p-2'>
                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='mail_id'
                                        value={addMentor.mail_id}
                                        onChange={handleAddMentor}

                                    />
                                </div>
                            </div>
                            <div className='col-md-3 p-2'>
                                Phone No
                            </div>
                            <div className='col-md-3 p-2'>
                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='phn_no'
                                        value={addMentor.phn_no}
                                        onChange={handleAddMentor}

                                    />
                                </div>
                            </div>
                            <div className='col-md-3 p-2'>
                                PAN No
                            </div>
                            <div className='col-md-3 p-2'>
                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='pan_no'
                                        value={addMentor.pan_no}
                                        onChange={handleAddMentor}

                                    />
                                </div>
                            </div>
                            <div className='col-md-3 p-2'>
                                Linkdin Url
                            </div>
                            <div className='col-md-3 p-2'>
                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='linked_in'
                                        value={addMentor.linked_in}
                                        onChange={handleAddMentor}

                                    />
                                </div>
                            </div>
                            <div className='col-md-3 p-2'>
                                Upload Profile Photo
                            </div>
                            <div className='col-md-3 p-2'>
                                <div class="form-group" >

                                    <input type="file" name='profile_photo' class="form-control-file" id="exampleFormControlFile1" onChange={handleAddMentor} />
                                </div>
                            </div>
                            <div className='col-md-3 p-2'>
                                Upload University/ College Cirtificate
                            </div>
                            <div className='col-md-3 p-2'>
                                <div class="form-group" >

                                    <input type="file" name='upload_certificate' class="form-control-file" id="exampleFormControlFile1" onChange={handleAddMentor} />
                                </div>
                            </div>
                            <div className='col-md-3 p-2'>
                                Status
                            </div>
                            <div className='col-md-3 p-2'>
                                <select name='activeFlag'
                                    value={addMentor?.activeFlag}
                                    onChange={addMentor}
                                    class="form-control" id="exampleFormControlSelect1">
                                    <option value=''>---select---</option>
                                    <option value={1}>Active</option>
                                    <option value={0}>De-Active</option>
                                </select>
                            </div>

                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Stack spacing={2} direction="row" >
                        <Button variant="contained" onClick={() => {
                            handleAddMentorset()
                            handleaddInsClose()
                        }}>Save</Button>
                        <Button variant="contained" color="success">
                            Next
                        </Button>
                        <Button variant="secondary" onClick={handleaddInsClose}>
                            Close
                        </Button>
                    </Stack>
                    {/* <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button> */}
                </Modal.Footer>
            </Modal>

            {/* Add Mentor Basic Info  */}
            <Modal show={showaddInsBasicInfo} onHide={handleaddInsBasicInfoClose} backdrop="static"
                keyboard={false}
                size='lg'>
                {/* <Modal.Header closeButton>
                    <Modal.Title>Modal Heading</Modal.Title>
                </Modal.Header> */}
                <Modal.Body>
                    {/* <p>Modal content goes here.</p> */}
                    <div className='container-fluid'>
                        <div className='row'>
                            <div className=' col-md-12 headLineBox mb-3' >
                                <h4>Add Mentor Basic Details</h4>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div>
                                        Name
                                    </div>
                                    <div class="input-group ">
                                        <input type="text" class="form-control"
                                            name='name'
                                            value={addMentorBasicInfo?.name}
                                            onChange={handleAddMentorBasicInfo}

                                        />
                                    </div>
                                    {errors?.name && <div className="error">{errors.name}</div>}
                                </div>
                                <div className="col-md-6">
                                    <div>
                                        Gender
                                    </div>
                                    <div>
                                        <select name='gender' value={addMentorBasicInfo?.gender} onChange={handleAddMentorBasicInfo} class="form-control" id="exampleFormControlSelect1">
                                            <option value=''>---select---</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Others">Others</option>
                                        </select>
                                    </div>
                                    {errors?.gender && <div className="error">{errors.gender}</div>}

                                </div>

                            </div>

                            <div className="row mt-4">
                                <div className='col-md-6'>
                                    <div>
                                        Date Of Birth
                                    </div>
                                    <div>
                                        <div class="input-group ">
                                            <input type="date" class="form-control"
                                                name='dob'
                                                value={addMentorBasicInfo?.dob}
                                                onChange={handleAddMentorBasicInfo}

                                            />
                                            {errors?.dob && <div className="error">{errors.dob}</div>}
                                        </div>
                                    </div>

                                </div>
                                <div className='col-md-6'>
                                    <div>
                                        Email
                                    </div>
                                    <div>
                                        <div class="input-group ">
                                            <input type="text" class="form-control"
                                                name='email'
                                                value={addMentorBasicInfo.email}
                                                onChange={handleAddMentorBasicInfo}

                                            />
                                        </div>
                                        {errors?.email && <div className="error">{errors.email}</div>}
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col-md-6">
                                    <div>
                                        Phone No
                                    </div>
                                    <div>
                                        <div class="input-group ">
                                            <input type="text" class="form-control"
                                                name='phoneNo'
                                                value={addMentorBasicInfo.phoneNo}
                                                onChange={handleAddMentorBasicInfo}

                                            />
                                        </div>
                                        {errors?.phoneNo && <div className="error">{errors.phoneNo}</div>}
                                    </div>

                                </div>

                                <div className="col-md-6">
                                    <div>
                                        Alternet Phone No
                                    </div>
                                    <div>
                                        <div class="input-group ">
                                            <input type="text" class="form-control"
                                                name='AlternatePhoneNo'
                                                value={addMentorBasicInfo.AlternatePhoneNo}
                                                onChange={handleAddMentorBasicInfo}
                                            />

                                            {errors?.AlternatePhoneNo && <div className="error">{errors.AlternatePhoneNo}</div>}
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="row mt-4">
                                <div className="col-md-6">
                                    <div>
                                        Address Line 1
                                    </div>
                                    <div class="input-group ">
                                        <input type="text" class="form-control"
                                            name='address1'
                                            value={addMentorBasicInfo.address1}
                                            onChange={handleAddMentorBasicInfo}

                                        />

                                    </div>
                                    {errors?.address1 && <div className="error">{errors.address1}</div>}
                                </div>

                                <div className="col-md-6">
                                    <div>
                                        Address Line 2
                                    </div>
                                    <div>
                                        <div class="input-group ">
                                            <input type="text" class="form-control"
                                                name='address2'
                                                value={addMentorBasicInfo.address2}
                                                onChange={handleAddMentorBasicInfo}

                                            />
                                        </div>
                                        {errors?.address2 && <div className="error">{errors.address2}</div>}

                                    </div>
                                </div>

                            </div>

                            <div className='row mt-4'>
                                <div className="col-md-6">
                                    <div>
                                        Country
                                    </div>
                                    <div>
                                        <FormControl sx={{ minWidth: 350 }}>
                                            <Select
                                                value={country}
                                                onChange={handleChangeCountry}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                            >
                                                <MenuItem value="">
                                                    <em>-----Select-----</em>
                                                </MenuItem>
                                                {countryList.map((val) => (
                                                    <MenuItem key={val.id} value={val}>
                                                        {val.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                            {/* <FormHelperText>Without label</FormHelperText> */}
                                        </FormControl>
                                        {errors?.country && <div className="error">{errors?.country}</div>}
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div>
                                        State
                                    </div>
                                    <div>
                                        <FormControl sx={{ minWidth: 350 }}>
                                            <Select
                                                value={state}
                                                onChange={handleChangeState}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                            >
                                                <MenuItem value="">
                                                    <em>-----Select-----</em>
                                                </MenuItem>
                                                {stateList?.map((val) => (
                                                    <MenuItem key={val.id} value={val}>
                                                        {val.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                            {/* <FormHelperText>Without label</FormHelperText> */}
                                        </FormControl>
                                        {errors?.state && <div className="error">{errors?.state}</div>}

                                    </div>
                                </div>
                            </div>


                            <div className="row mt-4">
                                <div className="col-md-6">
                                    <div>
                                        City
                                    </div>
                                    <div>
                                        <FormControl sx={{ minWidth: 350 }}>
                                            <Select
                                                value={city}
                                                onChange={handleChangeCity}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                            >
                                                <MenuItem value="">
                                                    <em>-----Select-----</em>
                                                </MenuItem>
                                                {cityList?.map((val) => (
                                                    <MenuItem key={val.id} value={val}>
                                                        {val.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                            {/* <FormHelperText>Without label</FormHelperText> */}
                                        </FormControl>
                                        {errors?.city && <div className="error">{errors?.city}</div>}
                                    </div>
                                </div>


                                <div className='col-md-6'>
                                    <div>
                                        Pin Code
                                    </div>
                                    <div>
                                        <div class="input-group ">
                                            <input type="text" class="form-control"
                                                name='pinNo'
                                                value={addMentorBasicInfo.pinNo}
                                                onChange={handleAddMentorBasicInfo}

                                            />
                                        </div>
                                        {errors?.pinNo && <div className="error">{errors?.pinNo}</div>}
                                    </div>
                                </div>
                            </div>


                            <div className='row mt-4'>
                                <div className='col-md-6'>
                                    <div>
                                        ID Type
                                    </div>
                                    <div>
                                        <select name='IdType'
                                            value={addMentorBasicInfo?.IdType}
                                            onChange={handleAddMentorBasicInfo}
                                            class="form-control" id="exampleFormControlSelect1">
                                            <option value=''>---select---</option>
                                            <option value={'pan'}>PAN</option>
                                            <option value={'aadhar'}>AADHAR</option>
                                            <option value={'Passport'}>Passport</option>
                                            <option value={'Drivers_License'}>Driver’s License</option>
                                            <option value={"oth_valid_gov_id"}>Other Government ID</option>

                                        </select>
                                        {errors?.IdType && <div className="error">{errors?.IdType}</div>}
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div>
                                        ID No
                                    </div>
                                    <div>
                                        <div class="input-group ">
                                            <input type="text" class="form-control"
                                                name='idNo'
                                                value={addMentorBasicInfo.idNo}
                                                onChange={handleAddMentorBasicInfo}

                                            />
                                        </div>
                                        {errors?.idNo && <div className="error">{errors?.idNo}</div>}
                                    </div>
                                </div>
                            </div>

                            {/* <div className='col-md-3 p-2'>
                                linkdin Url
                            </div>
                            <div className='col-md-3 p-2'>
                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='linked_in'
                                        value={addMentor.linked_in}
                                        onChange={handleAddMentor }
                                        
                                    />
                                </div>
                            </div> */}
                            {/* <div className='col-md-3 p-2'>
                                Upload Profile Photo
                            </div>
                            <div className='col-md-3 p-2'>
                                <div class="form-group" >
                                    
                                    <input type="file" name='profile_photo' class="form-control-file" id="exampleFormControlFile1"  onChange={handleAddMentor }/>
                                </div>
                            </div>
                            <div className='col-md-3 p-2'>
                                Upload University/ College Cirtificate
                            </div>
                            <div className='col-md-3 p-2'>
                                <div class="form-group" >
                                    
                                    <input type="file" name='upload_certificate' class="form-control-file" id="exampleFormControlFile1"  onChange={handleAddMentor }/>
                                </div>
                            </div> */}
                            {/* <div className='col-md-3 p-2'>
                                Status
                            </div>
                            <div className='col-md-3 p-2'>
                                <select name='activeFlag' 
                                // value={addMentor?.status}  
                                // onChange={addMentor } 
                                class="form-control" id="exampleFormControlSelect1">
                                    <option value=''>---select---</option>
                                        <option value={1}>Active</option>
                                        <option value={0}>De-Active</option>
                                </select>
                            </div> */}

                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Stack spacing={2} direction="row" >
                        <Button variant="contained" onClick={() => {
                            // handleAddMentorset()
                            handleAddMentorBasicInfoApi()
                            // handleaddInsBasicInfoClose()
                        }}>Save</Button>
                        <Button variant="contained" color="success" onClick={() => {
                            handleaddInsEducationInfoShow()
                            handleaddInsBasicInfoClose()
                        }}>
                            Next
                        </Button>
                        <Button variant="secondary" onClick={handleaddInsBasicInfoClose}>
                            Close
                        </Button>
                    </Stack>
                    {/* <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button> */}
                </Modal.Footer>
            </Modal>

            {/* Add Mentor Education Info  */}
            <Modal show={showaddInsEducationInfo} onHide={handleaddInsBasicInfoClose} backdrop="static"
                keyboard={false}
                size='lg'>
                {/* <Modal.Header closeButton>
                    <Modal.Title>Modal Heading</Modal.Title>
                </Modal.Header> */}
                <Modal.Body>
                    {/* <p>Modal content goes here.</p> */}
                    <div className='container-fluid'>
                        <div className='row'>
                            <div className=' col-md-12 headLineBox mb-3' >
                                <h4>Add Mentor Education Info </h4>
                            </div>
                            <div className='col-md-3 p-2'>
                                Graduation Degree
                            </div>
                            <div className='col-md-3 p-2'>
                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='gradDegree'
                                        value={addMentorEducationInfo?.gradDegree}
                                        onChange={handleAddMentorEducationInfo}

                                    />
                                </div>
                                {errorsEducation?.gradDegree && <div className="error">{errorsEducation?.gradDegree}</div>}
                            </div>
                            <div className='col-md-3 p-2'>
                                Graduation Dept
                            </div>
                            <div className='col-md-3 p-2'>
                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='gradDept'
                                        value={addMentorEducationInfo?.gradDept}
                                        onChange={handleAddMentorEducationInfo}

                                    />
                                </div>
                            </div>
                            <div className='col-md-3 p-2'>
                                Graduation Passout Year
                            </div>
                            <div className='col-md-3 p-2'>
                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='gradPassout'
                                        value={addMentorEducationInfo?.gradPassout}
                                        onChange={handleAddMentorEducationInfo}

                                    />
                                </div>
                            </div>


                            <div className='col-md-3 p-2'>
                                Graduation Institution
                            </div>
                            <div className='col-md-3 p-2'>

                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='gradInsNm'
                                        value={addMentorEducationInfo.gradInsNm}
                                        onChange={handleAddMentorEducationInfo}

                                    />
                                </div>
                            </div>
                            <div className='col-md-3 p-2'>
                                Graduation CGPA
                            </div>
                            <div className='col-md-3 p-2'>
                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='gradCgpa'
                                        value={addMentorEducationInfo?.gradCgpa}
                                        onChange={handleAddMentorEducationInfo}

                                    />
                                </div>
                            </div>
                            <div className='offset-md-6'>

                            </div>

                            <div className='col-md-3 p-2'>
                                Associate Passout Year
                            </div>
                            <div className='col-md-3 p-2'>
                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='hsPassout'
                                        value={addMentorEducationInfo.hsPassout}
                                        onChange={handleAddMentorEducationInfo}

                                    />
                                </div>
                            </div>
                            <div className='col-md-3 p-2'>
                                Associate Institution
                            </div>
                            <div className='col-md-3 p-2'>
                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='hsInsNm'
                                        value={addMentorEducationInfo.hsInsNm}
                                        onChange={handleAddMentorEducationInfo}

                                    />
                                </div>
                            </div>
                            <div className='col-md-3 p-2'>
                                Associate CGPA
                            </div>
                            <div className='col-md-3 p-2'>
                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='hsCgpa'
                                        value={addMentorEducationInfo.hsCgpa}
                                        onChange={handleAddMentorEducationInfo}

                                    />
                                </div>
                            </div>
                            <div className='offset-md-6'>
                            </div>
                            <div className='col-md-3 p-2'>
                                HS Passout Year
                            </div>
                            <div className='col-md-3 p-2'>
                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='matricPassout'
                                        value={addMentorEducationInfo.matricPassout}
                                        onChange={handleAddMentorEducationInfo}

                                    />
                                </div>
                            </div>
                            <div className='col-md-3 p-2'>
                                HS Institution
                            </div>
                            <div className='col-md-3 p-2'>
                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='matricNm'
                                        value={addMentorEducationInfo.matricNm}
                                        onChange={handleAddMentorEducationInfo}

                                    />
                                </div>
                            </div>
                            <div className='col-md-3 p-2'>
                                HS CGPA
                            </div>
                            <div className='col-md-3 p-2'>
                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='matricCgpa'
                                        value={addMentorEducationInfo.matricCgpa}
                                        onChange={handleAddMentorEducationInfo}

                                    />
                                </div>
                            </div>
                            {/* <div className='col-md-3 p-2'>
                                linkdin Url
                            </div>
                            <div className='col-md-3 p-2'>
                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='linked_in'
                                        value={addMentor.linked_in}
                                        onChange={handleAddMentor }
                                        
                                    />
                                </div>
                            </div> */}
                            {/* <div className='col-md-3 p-2'>
                                Upload Profile Photo
                            </div>
                            <div className='col-md-3 p-2'>
                                <div class="form-group" >
                                    
                                    <input type="file" name='profile_photo' class="form-control-file" id="exampleFormControlFile1"  onChange={handleAddMentor }/>
                                </div>
                            </div>
                            <div className='col-md-3 p-2'>
                                Upload University/ College Cirtificate
                            </div>
                            <div className='col-md-3 p-2'>
                                <div class="form-group" >
                                    
                                    <input type="file" name='upload_certificate' class="form-control-file" id="exampleFormControlFile1"  onChange={handleAddMentor }/>
                                </div>
                            </div> */}
                            {/* <div className='col-md-3 p-2'>
                                Status
                            </div>
                            <div className='col-md-3 p-2'>
                                <select name='activeFlag' 
                                // value={addMentor?.status}  
                                // onChange={addMentor } 
                                class="form-control" id="exampleFormControlSelect1">
                                    <option value=''>---select---</option>
                                        <option value={1}>Active</option>
                                        <option value={0}>De-Active</option>
                                </select>
                            </div> */}

                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Stack spacing={2} direction="row" >
                        <Button variant="contained" onClick={() => {
                            // handleAddMentorset()
                            handleAddMentorEducationalInfoApi()
                            handleaddInsBasicInfoClose()
                        }}>Save</Button>
                        <Button variant="contained" color="success" onClick={() => {
                            handleaddInsBasicInfoShow()
                            handleaddInsEducationInfoClose()
                        }}>
                            Prev
                        </Button>
                        <Button variant="contained" color="success" onClick={() => {
                            handleaddInsProffesionInfoShow()
                            handleaddInsEducationInfoClose()
                        }}>
                            Next
                        </Button>
                        <Button variant="secondary" onClick={handleaddInsEducationInfoClose}>
                            Close
                        </Button>
                    </Stack>
                    {/* <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button> */}
                </Modal.Footer>
            </Modal>

            {/* Add Mentor Proffesional Info  */}
            <Modal show={showaddInsProffesionInfo} onHide={handleaddInsProffesionInfoClose} backdrop="static"
                keyboard={false}
                size='lg'>
                {/* <Modal.Header closeButton>
                </Modal.Header> */}
                {/* <Modal.Title>Modal Heading</Modal.Title> */}
                <Modal.Body>
                    {/* <p>Modal content goes here.</p> */}
                    <div className='container-fluid'>
                        <div className='row'>
                            <div className=' col-md-12 headLineBox mb-3' >
                                <h4>Add Mentor Proffesional Info </h4>
                            </div>
                            <div className='col-md-3 p-2'>
                                Total year Of Exp
                            </div>
                            <div className='col-md-3 p-2'>
                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='totalExp'
                                        value={addMentorProffesionalInfo?.totalExp}
                                        onChange={handleAddMentorProffesionalInfo}

                                    />
                                </div>
                            </div>


                            <div className='col-md-3 p-2'>
                                Current Organization
                            </div>
                            <div className='col-md-3 p-2'>

                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='currentOrg'
                                        value={addMentorProffesionalInfo?.currentOrg}
                                        onChange={handleAddMentorProffesionalInfo}

                                    />
                                </div>
                            </div>
                            <div className='col-md-3 p-2'>
                                Current Designation
                            </div>
                            <div className='col-md-3 p-2'>
                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='currentDesg'
                                        value={addMentorProffesionalInfo?.currentDesg}
                                        onChange={handleAddMentorProffesionalInfo}

                                    />
                                </div>
                            </div>
                            {/* <div className='col-md-3 p-2'>
                                Highest Qualification
                            </div>
                            <div className='col-md-3 p-2'>
                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='highest_qualification'
                                        value={addMentor.highest_qualification}
                                        onChange={handleAddMentor }
                                        
                                    />
                                </div>
                            </div>
                            <div className='col-md-3 p-2'>
                                University/college Name
                            </div>
                            <div className='col-md-3 p-2'>
                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='college_name'
                                        value={addMentor.college_name}
                                        onChange={handleAddMentor }
                                        
                                    />
                                </div>
                            </div>
                            <div className='col-md-3 p-2'>
                                Years of Experience
                            </div>
                            <div className='col-md-3 p-2'>
                                <div class="input-group ">
                                    <input type="number" class="form-control"
                                        name='total_years_of_exp'
                                        value={addMentor.total_years_of_exp}
                                        onChange={handleAddMentor }
                                        
                                    />
                                </div>
                            </div> */}
                            <div className='col-md-3 p-2'>
                                LinkedIn URL
                            </div>
                            <div className='col-md-3 p-2'>
                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        // name='LinkdinUrl'
                                        value={linkedinProfileLink}
                                        onChange={handleLinkdin}
                                        disabled={verifiedStatus}
                                    />
                                </div>
                            </div>
                            <div className='col-md-12 d-flex justify-content-end'>
                                {!verifiedStatus && notVerified && <button style={{ marginBottom: "5px" }} onClick={verifyLinkedIn} className="bg-primary text-white border-0 p-2 rounded-pill">verify now</button>}
                                {verifiedStatus && <button className="bg-primary text-white border-0 p-2 rounded-pill">Verified <img src={verified} style={{ width: "20px" }} alt="verified" /></button>}
                                {!notVerified && <button className="bg-danger text-white border-0 p-2 rounded-pill" style={{ cursor: "none" }}> Not a valid linkedIn profile <img src={not_verified} style={{ width: "20px" }} alt="not verified" /></button>}

                            </div>

                            <div className='col-md-3 p-2'>
                                Upload Profile Photo
                            </div>
                            <div className='col-md-3 p-2'>
                                <div class="form-group" >

                                    <input type="file" name='profilePhoto' class="form-control-file" id="exampleFormControlFile1" onChange={handleAddMentorProffesionalInfo} />
                                </div>
                            </div>
                            <div className='col-md-3 p-2'>
                                Upload University/ College Cirtificate
                            </div>
                            <div className='col-md-3 p-2'>
                                <div class="form-group" >

                                    <input type="file" name='uniCirtificate' class="form-control-file" id="exampleFormControlFile1" onChange={handleAddMentorProffesionalInfo} />
                                </div>
                            </div>
                            <div className='col-md-3 p-2'>
                                Status
                            </div>
                            <div className='col-md-3 p-2'>
                                <select name='activeFlag'
                                    value={addMentorProffesionalInfo?.activeFlag}
                                    onChange={handleAddMentorProffesionalInfo}
                                    class="form-control" id="exampleFormControlSelect1">
                                    <option value=''>---select---</option>
                                    <option value={1}>Active</option>
                                    <option value={0}>De-Active</option>
                                </select>
                            </div>

                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Stack spacing={2} direction="row" >
                        <Button variant="contained" onClick={() => {
                            // handleAddMentorset()
                            handleAddMentorProffesionalInfoApi()
                            handleaddInsBasicInfoClose()
                        }}>Save</Button>
                        <Button variant="contained" color="success" onClick={() => {
                            // handleaddInsBasicInfoShow()
                            handleaddInsEducationInfoShow()
                            handleaddInsProffesionInfoClose()
                        }}>
                            Prev
                        </Button>
                        {/* <Button variant="contained" color="success">
                    Next
                    </Button> */}
                        <Button variant="secondary" onClick={handleaddInsProffesionInfoClose}>
                            Close
                        </Button>
                    </Stack>
                    {/* <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button> */}
                </Modal.Footer>
            </Modal>

            {/* edit instructor details  */}
            <Modal show={showaddInsEditDetails} onHide={handleInsEditDetailsClose} backdrop="static"
                keyboard={false}
                size='lg'>
                {/* <Modal.Header closeButton>
                    <Modal.Title>Modal Heading</Modal.Title>
                </Modal.Header> */}
                <Modal.Body>
                    <div className='container-fluid'>
                        <div className='row'>
                            {console.log(editMentorData)}
                            <div className=' col-md-12 headLineBox mb-3' >
                                <h4>Add Mentor Basic Details</h4>
                            </div>
                            <div className='col-md-3 p-2'>
                                Name
                            </div>
                            <div className='col-md-3 p-2'>
                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='name'
                                        value={editMentorData?.name}
                                        onChange={handleEditMentorData}
                                    />
                                </div>
                            </div>


                            <div className='col-md-3 p-2'>
                                Gender
                            </div>
                            <div className='col-md-3 p-2'>

                                <select name='gender' value={editMentorData?.gender} onChange={handleEditMentorData} class="form-control" id="exampleFormControlSelect1">
                                    <option value=''>---select---</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Others">Others</option>
                                </select>
                            </div>
                            <div className='col-md-3 p-2'>
                                Date Of Birth
                            </div>
                            <div className='col-md-3 p-2'>
                                <div class="input-group ">
                                    <input type="date" class="form-control"
                                        name='dob'
                                        value={editMentorData?.dob}
                                        onChange={handleEditMentorData}

                                    />
                                </div>
                            </div>

                            <div className='col-md-3 p-2'>
                                Email
                            </div>
                            <div className='col-md-3 p-2'>
                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='email'
                                        value={editMentorData.email}
                                        onChange={handleEditMentorData}

                                    />
                                </div>
                            </div>
                            <div className='col-md-3 p-2'>
                                Phone No
                            </div>
                            <div className='col-md-3 p-2'>
                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='phoneNo'
                                        value={editMentorData.phoneNo}
                                        onChange={handleEditMentorData}

                                    />
                                </div>
                            </div>
                            <div className='col-md-3 p-2'>
                                Alternet Phone No
                            </div>
                            <div className='col-md-3 p-2'>
                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='AlternatePhoneNo'
                                        value={editMentorData.AlternatePhoneNo}
                                        onChange={handleEditMentorData}

                                    />
                                </div>
                            </div>
                            <div className='col-md-3 p-2'>
                                Address Line 1
                            </div>
                            <div className='col-md-3 p-2'>
                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='address1'
                                        value={editMentorData.address1}
                                        onChange={handleEditMentorData}

                                    />
                                </div>
                            </div>
                            <div className='col-md-3 p-2'>
                                Address Line 2
                            </div>
                            <div className='col-md-3 p-2'>
                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='address2'
                                        value={editMentorData.address2}
                                        onChange={handleEditMentorData}

                                    />
                                </div>
                            </div>
                            <div className='col-md-3 p-2'>
                                Country
                            </div>
                            <div className='col-md-3 p-2'>
                                {console.log(country)}
                                <FormControl sx={{ minWidth: 175 }}>
                                    <Select
                                        value={country}
                                        onChange={handleChangeCountry}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                        renderValue={(selected) => selected?.name}
                                    >
                                        <MenuItem value="">
                                            <em>-----Select-----</em>
                                        </MenuItem>
                                        {countryList.map((val) => (
                                            <MenuItem key={val.id} value={val}>
                                                {val.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {/* <FormHelperText>Without label</FormHelperText> */}
                                </FormControl>
                            </div>
                            <div className='col-md-3 p-2'>
                                State
                            </div>
                            <div className='col-md-3 p-2'>
                                {console.log(state)}
                                <FormControl sx={{ minWidth: 175 }}>
                                    <Select
                                        value={state}
                                        onChange={handleChangeState}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                        renderValue={(selected) => selected?.name}
                                    >
                                        <MenuItem value="">
                                            <em>-----Select-----</em>
                                        </MenuItem>
                                        {stateList?.map((val) => (
                                            <MenuItem key={val.id} value={val}>
                                                {val.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {/* <FormHelperText>Without label</FormHelperText> */}
                                </FormControl>
                            </div>
                            <div className='col-md-3 p-2'>
                                City
                            </div>
                            <div className='col-md-3 p-2'>
                                {console.log(city)}
                                <FormControl sx={{ minWidth: 175 }}>
                                    <Select
                                        value={city}
                                        onChange={handleChangeCity}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                        renderValue={(selected) => selected?.name}
                                    >
                                        <MenuItem value="">
                                            <em>-----Select-----</em>
                                        </MenuItem>
                                        {cityList?.map((val) => (
                                            <MenuItem key={val.id} value={val}>
                                                {val.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {/* <FormHelperText>Without label</FormHelperText> */}
                                </FormControl>
                            </div>
                            <div className='col-md-3 p-2'>
                                Pin Code
                            </div>
                            <div className='col-md-3 p-2'>
                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='pinNo'
                                        value={editMentorData.pinNo}
                                        onChange={handleEditMentorData}

                                    />
                                </div>
                            </div>
                            <div className='col-md-3 p-2'>
                                ID Type
                            </div>
                            <div className='col-md-3 p-2'>
                                <select name='IdType'
                                    value={editMentorData?.IdType}
                                    onChange={handleEditMentorData}
                                    class="form-control" id="exampleFormControlSelect1">
                                    <option value=''>---select---</option>
                                    <option value={'pan'}>PAN</option>
                                    <option value={'aadhar'}>AADHAR</option>
                                    <option value={'Passport'}>Passport</option>
                                    <option value={'Drivers_License'}>Driver’s License</option>
                                    <option value={"oth_valid_gov_id"}>Other Government ID</option>

                                </select>
                            </div>
                            <div className='col-md-3 p-2'>
                                ID No
                            </div>
                            <div className='col-md-3 p-2'>
                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='idNo'
                                        value={editMentorData.idNo}
                                        onChange={handleEditMentorData}

                                    />
                                </div>
                            </div>
                            <div className=' col-md-12 headLineBox mb-3' >
                                <h4>Add Mentor Education Info </h4>
                            </div>
                            <div className='col-md-3 p-2'>
                                Graduation Degree
                            </div>
                            <div className='col-md-3 p-2'>
                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='gradDegree'
                                        value={editMentorData?.gradDegree}
                                        onChange={handleEditMentorData}

                                    />
                                </div>
                            </div>
                            <div className='col-md-3 p-2'>
                                Graduation Dept
                            </div>
                            <div className='col-md-3 p-2'>
                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='gradDept'
                                        value={editMentorData?.gradDept}
                                        onChange={handleEditMentorData}

                                    />
                                </div>
                            </div>
                            <div className='col-md-3 p-2'>
                                Graduation Passout Year
                            </div>
                            <div className='col-md-3 p-2'>
                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='gradPassout'
                                        value={editMentorData?.gradPassout}
                                        onChange={handleEditMentorData}

                                    />
                                </div>
                            </div>


                            <div className='col-md-3 p-2'>
                                Graduation Institution
                            </div>
                            <div className='col-md-3 p-2'>

                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='gradInsNm'
                                        value={editMentorData.gradInsNm}
                                        onChange={handleEditMentorData}

                                    />
                                </div>
                            </div>
                            <div className='col-md-3 p-2'>
                                Graduation CGPA
                            </div>
                            <div className='col-md-3 p-2'>
                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='gradCgpa'
                                        value={editMentorData?.gradCgpa}
                                        onChange={handleEditMentorData}

                                    />
                                </div>
                            </div>
                            <div className='offset-md-6'>

                            </div>

                            <div className='col-md-3 p-2'>
                                Associate Passout Year
                            </div>
                            <div className='col-md-3 p-2'>
                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='hsPassout'
                                        value={editMentorData.hsPassout}
                                        onChange={handleEditMentorData}

                                    />
                                </div>
                            </div>
                            <div className='col-md-3 p-2'>
                                Associate Institute
                            </div>
                            <div className='col-md-3 p-2'>
                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='hsInsNm'
                                        value={editMentorData.hsInsNm}
                                        onChange={handleEditMentorData}

                                    />
                                </div>
                            </div>
                            <div className='col-md-3 p-2'>
                                Associate CGPA
                            </div>
                            <div className='col-md-3 p-2'>
                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='hsCgpa'
                                        value={editMentorData.hsCgpa}
                                        onChange={handleEditMentorData}

                                    />
                                </div>
                            </div>
                            <div className='offset-md-6'>
                            </div>
                            <div className='col-md-3 p-2'>
                                HS Passout Year
                            </div>
                            <div className='col-md-3 p-2'>
                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='matricPassout'
                                        value={editMentorData.matricPassout}
                                        onChange={handleEditMentorData}

                                    />
                                </div>
                            </div>
                            <div className='col-md-3 p-2'>
                                HS Instition
                            </div>
                            <div className='col-md-3 p-2'>
                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='matricNm'
                                        value={editMentorData.matricNm}
                                        onChange={handleEditMentorData}

                                    />
                                </div>
                            </div>
                            <div className='col-md-3 p-2'>
                                HS CGPA
                            </div>
                            <div className='col-md-3 p-2'>
                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='matricCgpa'
                                        value={editMentorData.matricCgpa}
                                        onChange={handleEditMentorData}

                                    />
                                </div>
                            </div>
                            <div className=' col-md-12 headLineBox mb-3' >
                                <h4>Add Mentor Proffesional Info </h4>
                            </div>
                            <div className='col-md-3 p-2'>
                                Total year Of Exp
                            </div>
                            <div className='col-md-3 p-2'>
                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='totalExp'
                                        value={editMentorData?.totalExp}
                                        onChange={handleEditMentorData}

                                    />
                                </div>
                            </div>


                            <div className='col-md-3 p-2'>
                                Current Organization
                            </div>
                            <div className='col-md-3 p-2'>

                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='currentOrg'
                                        value={editMentorData?.currentOrg}
                                        onChange={handleEditMentorData}

                                    />
                                </div>
                            </div>
                            <div className='col-md-3 p-2'>
                                Current Designation
                            </div>
                            <div className='col-md-3 p-2'>
                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='currentDesg'
                                        value={editMentorData?.currentDesg}
                                        onChange={handleEditMentorData}

                                    />
                                </div>
                            </div>

                            <div className='col-md-3 p-2'>
                                Linkedin URL
                            </div>
                            <div className='col-md-3 p-2'>
                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                        name='LinkdinUrl'
                                        value={editMentorData.LinkdinUrl}
                                        onChange={handleEditMentorData}

                                    />
                                </div>
                            </div>

                            <div className='col-md-3 p-2'>
                                Upload Profile Photo
                            </div>
                            <div className='col-md-3 p-2'>
                                <div class="form-group" >

                                    <input type="file" name='profilePhoto' class="form-control-file" id="exampleFormControlFile1" onChange={handleAddMentorProffesionalInfo} />
                                </div>
                            </div>
                            <div className='col-md-3 p-2'>
                                Upload University/ College Cirtificate
                            </div>
                            <div className='col-md-3 p-2'>
                                <div class="form-group" >

                                    <input type="file" name='uniCirtificate' class="form-control-file" id="exampleFormControlFile1" onChange={handleAddMentorProffesionalInfo} />
                                </div>
                            </div>
                            <div className='col-md-3 p-2'>
                                Status
                            </div>
                            <div className='col-md-3 p-2'>
                                <select name='activeFlag'
                                    value={editMentorData?.activeFlag}
                                    onChange={handleEditMentorData}
                                    class="form-control" id="exampleFormControlSelect1">
                                    <option value=''>---select---</option>
                                    <option value={1}>Active</option>
                                    <option value={0}>De-Active</option>
                                </select>
                            </div>

                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Stack spacing={2} direction="row" >
                        <Button variant="contained" onClick={() => {
                            // handleCloseinsdetails()
                            // handleUpdateMetorData()
                            handleEditMentorInfoApi()
                        }}>Update</Button>
                        <Button variant="contained" color="success" onClick={() => {
                            handleShowinspopup()
                            handleInsEditDetailsClose()
                            handleCourseData(editMentorData.id)
                            handleAllCourseList()
                        }}
                        >
                            Next
                        </Button>
                        <Button variant="secondary" onClick={handleInsEditDetailsClose} >
                            Close
                        </Button>
                    </Stack>
                </Modal.Footer>
            </Modal>
            <ToastContainer />
        </>
    )
}