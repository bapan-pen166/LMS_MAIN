import React from 'react'
import '../assets/css/Student_list/student_list.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Country_list from '../components/Student_list/Country_list';
import State_list from '../components/Student_list/State_list';
import City_list from '../components/Student_list/City_list';
import Rejection_dialog from '../components/Student_list/Rejection_dialog';
import SearchIcon from '@mui/icons-material/Search';
import { CiSearch } from "react-icons/ci";
import { api } from '../ApiUrl/ApiUrl';
import FormControl from '@mui/material/FormControl';
import '../../src/assets/css/Custom_Global_Style/Global.css'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import PageNotFound from '../ErrorPage/PageNotFound';
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

const names = [
    'High School Details',
    'Graduation Details',
    'Associate’s Details',
    'Bachelor’s Details',
    'Master’s Details',
    'Doctorate Details',
    'Others'
];


function Student_List() {
    const [personName, setPersonName] = React.useState([]);
    //for education updated one
    const [formData, setFormData] = useState({

        highestSchoolYOP: '',
        highSchoolInstituteName: '',
        highSchoolInstituteCgpaGpaType: '',
        highSchoolInstituteGpaorCgpa: '',

        graduationYOP: '',
        graduationInstituteName: '',
        graduationInstituteCgpaGpaType: '',
        graduationInstituteGpaorCgpa: '',

        associateYOP: '',
        associateInstituteName: '',
        associateInstituteCgpaGpaType: '',
        associateInstituteGpaorCgpa: '',

        bachelorYOP: '',
        bachelorInstituteName: '',
        bachelorInstituteCgpaGpaType: '',
        bachelorInstituteGpaorCgpa: '',

        mastersYOP: '',
        mastersInstituteName: '',
        mastersInstituteCgpaGpaType: '',
        mastersInstituteGpaorCgpa: '',

        doctorsYOP: '',
        doctorsInstituteName: '',
        doctorsInstituteCgpaGpaType: '',
        doctorsInstituteGpaorCgpa: '',
        // email: emailIDFromLocal,

        // highestQualification: '',
        professionalCertificateName: '',
        NoOfYearsOfFieldExperience: '',
    });





    const [course, setCourse] = useState([]);
    const [student, setStudent] = useState([]);
    const [tast, settest] = useState(0);
    const [studentList, setStudentList] = useState([]);
    const [coursedata, setcoursedata] = useState([]);
    const [courseselct, setCourseselect] = useState([]);
    const [status, setstatus] = useState([]);


    // Basic info states
    const [info, setInfo] = useState({});
    const [fname, setFname] = useState('');
    const [mname, setMname] = useState('');
    const [lname, setLname] = useState('');
    const [gender, setGender] = useState('');
    const [Dob, setDob] = useState('');
    const [gardian, setGardian] = useState('');
    const [add1, setAdd1] = useState('');
    const [add2, setAdd2] = useState('');
    const [country, setCountry] = useState('');
    const [countrylist, setCountrylist] = useState([]);
    // const [countryname,setCountryname]=useState('');
    const [state, setState] = useState('');
    const [statelist, setStatelist] = useState([]);
    // const [statename,setStatename]=useState('');
    const [city, setCity] = useState('');
    const [citylist, setCitylist] = useState([]);
    // const [cityname,setCityname]=useState('');
    const [pin, setPin] = useState('');
    const [phone, setphone] = useState('');
    const [altphone, setAltphone] = useState('');
    const [emailid, setEmailid] = useState('');
    const [aadhar, setAadhar] = useState('');
    const [pan, setpan] = useState('');
    const [idType, setidType] = useState('')
    const [idproofNumber,setIdproofNumber]=useState('');
    const [foldername, setFolderName] = useState('');

    const [selectedCountrys, setSelectedCountrys] = useState('');
    const [selectedStates, setSelectedStates] = useState('');
    const [selectedCitys, setSelectedCitys] = useState('');

    // Education list

    const [education, setEducation] = useState({});
    const [gyear, setGyear] = useState('');
    const [gcgpa, setGcgpa] = useState('');
    const [gcollege, setGcollege] = useState('');
    const [c12College, set12College] = useState('');
    const [c12cgpa, set12Cgpa] = useState('');
    const [c12year, setc12year] = useState('');
    const [c10College, set10College] = useState('');
    const [c10cgpa, set10Cgpa] = useState('');
    const [c10year, setc10year] = useState('');
    const [highestQualification, sethighestQualification] = useState('');
    const [graddoc, setgraddoc] = useState('');
    const [hsdoc, sethsddoc] = useState('');
    const [matricdoc, setmatricdoc] = useState('');

    // Profession info states 

    const [profession, setProfession] = useState({});
    const [designation, setdesignation] = useState('');
    const [linkedinProfileLink, setlinkedinProfileLink] = useState('')
    const [workExp, setworkExp] = useState('')
    const [org, setorg] = useState('')
    const [workstatus, setWorkstatus] = useState('');
    const [batchList, setBatchList] = useState([]);
    const [profEmail, setProfEmail] = useState('');
    const [batchname, setBatchname] = useState('');
    const [rejectreason, setRejectReason] = useState('');
    const [rejectflag, setRejectFlag] = useState(false);

    // Modal 1
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Modal 2
    const [showEducation, setShowEducation] = useState(false);
    const handleCloseEducation = () => setShowEducation(false);
    const handleShowEducation = () => setShowEducation(true);

    // Modal 3
    const [showProfession, setShowProfession] = useState(false);
    const handleCloseProfession = () => setShowProfession(false);
    const handleShowProfession = () => setShowProfession(true);

    //hold modal
    const [showreject, setShowreject] = useState(false);

    const handlerejectClose = () => setShowreject(false);
    const handlerejectShow = () => setShowreject(true);

    // For the search 
    const [searchres, setSearchres] = useState([]);
    const [searchquery, setSearchquery] = useState('');


    // for the page validations
    const [userType, setUserType] = useState('');
    const [isLoading, setIsLoading] = useState(true);


    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const [batchdata, setBatchdata] = useState();




    // Basic info function 

    const handleBasicInfo = (email) => {
        console.log('submit click');
        console.log(email);
        axios.post(`${api}/reg/fetchBasicInfo`, { email: email })
            .then((Response) => {
                console.log("From basic info", Response.data);
                setInfo(Response.data)
                console.log("ID PROOF", Response.data.IdproofType)
                setidType(Response.data.IdproofType)
                console.log("folder name :  ", Response?.data?.folderName)
                setFolderName(Response?.data?.folderName)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    const handleCountrylist = (e) => {
        //     console.log('submit click');
        //    console.log(email);
        axios.post(`${api}/reg/getCountryList`, { countryPhrase: '' })
            .then((Response) => {
                console.log(Response.data);
                //    setInfo(Response.data.basicDetails);
                setCountrylist(Response.data.countryList);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    //    country:[{id:country}]
    const handleStatelist = () => {
        axios.post(`${api}/reg/getStateList`, { country: [selectedCountrys] })
            .then((Response) => {
                console.log(Response.data);
                //    setInfo(Response.data.basicDetails);
                setStatelist(Response.data.stateList);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    //  state:[{id:state}]
    const handleCitylist = () => {
        axios.post(`${api}/reg/getCityList`, { state: [selectedStates] })
            .then((Response) => {
                console.log(Response.data);
                //    setInfo(Response.data.basicDetails);
                setCitylist(Response.data.cityList);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }







    useEffect(() => {
        if (info) {
            try{
            setFname(info.firstName);
            setMname(info.middleName);
            setLname(info.lastName);
            setGender(info.gender);
            setDob(info.dob);

            setGardian(info.relation);
            setAdd1(info.fullAddress1);
            setAdd2(info.fullAddress2);

            // const countryJson=JSON.parse(info.country);
            setCountry( JSON.parse(info.country));
            setState(JSON.parse(info.state));
            setCity(JSON.parse(info.city))

            setPin(info.zipCode);
            setphone(info.mobileNumber);
            setAltphone(info.alternateNumber);
            setGardian(info.gurdianName);
            setEmailid(info.email)
            setAadhar(info.aadharNumber)
            setpan(info.panNumber)
            setIdproofNumber(info.idproofNumber)
            }
            catch(error){
                console.log(error)
            }



        }
    }, [info]);

    useEffect(() => {
        // const initialCountry = countrylist.find((val) => val.name == country);
        setSelectedCountrys(country)
    }, [country])

    useEffect(() => {
        console.log(statelist)
        console.log(state)
        if (statelist) {
            // const initialState = statelist.find((val) => val.name == state);
            setSelectedStates(state)
        }

    }, [state, statelist])

    useEffect(() => {
        console.log(citylist)
        console.log(city)
        if (citylist) {
            // const initialCity = citylist.find((val) => val.name == city);
            setSelectedCitys(city)
        }

    }, [city, citylist])



    // For the validations  ==>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    const [errors, setErrors] = useState({});

    // Validation Schema
    const validationSchema = Yup.object({
        firstName: Yup.string().required("First name is required"),
        middleName: Yup.string().optional(),
        lastName: Yup.string().required("Last name is required"),
        gender: Yup.string().required("Gender is required"),
        dob: Yup.date()
            .nullable()
            .required("Date of Birth is required")
            .typeError("Invalid Date")
            .transform((value, originalValue) => {
                return originalValue === '' ? null : value;
            }),
        mobileNumber: Yup.string().required("Mobile number is required"),
        alternateNumber: Yup.string().optional(),
        gurdianName: Yup.string().optional(),
        email: Yup.string().email("Invalid email address").required("Email is required"),
        IdproofType: Yup.string().nullable().optional(),
        idproofNumber: Yup.string().nullable().optional(),
        country: Yup.object().required("Country is required"),
        state: Yup.object().required("State is required"),
        city: Yup.object().required("City is required"),
        zipCode: Yup.string().required("ZIP code is required"),
        fullAddress1: Yup.string().required("Address 1 is required"),
        fullAddress2: Yup.string().optional(),
    });

    const handleBasicInfoSave = () => {
        const formData = {
            firstName: fname,
            middleName: mname,
            lastName: lname,
            gender: gender,
            dob: Dob,
            mobileNumber: phone,
            alternateNumber: altphone,
            gurdianName: gardian,
            email: emailid,
            IdproofType: idType,
            idproofNumber: idproofNumber,
            country: country,
            state: state,
            city: city,
            zipCode: pin,
            fullAddress1: add1,
            fullAddress2: add2,
        };

        validationSchema.validate(formData, { abortEarly: false })
            .then(() => {
                setErrors({}); // Clear errors on successful validation
                axios.post(`${api}/reg/updateBasicDetails`, {
                    info: formData,
                })
                    .then((response) => {
                        toast.success("Updated Successfully!", {
                            position: "top-center",
                        });
                        handleStudentList();
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
            })
            .catch((validationError) => {
                const newErrors = {};
                validationError.inner.forEach((error) => {
                    newErrors[error.path] = error.message;
                });
                setErrors(newErrors); // Set errors to state
            });
    };



    useEffect(() => {
        handleStatelist();
    }, [selectedCountrys])
    useEffect(() => {
        handleCitylist();
    }, [selectedStates])
    useEffect(()=>{
        console.log('country',country)
        console.log('country',state)
        console.log('country',city)
    },[info,country])

    //    const handlePreviousInfo=(e)=>{
    //     console.log('submit click');
    //    console.log(email);
    //         axios.post("http://127.0.0.1:5000/reg/fetchBasicInfo",{email:email})
    //            .then((Response)=>{
    //                console.log(Response.data);
    //                setInfo(Response.data.basicDetails)

    //            })
    //            .catch((error) => {
    //             console.error('Error:', error);
    //         });  
    //    }

    // Education info
    const [doctorateDOC, setDoctorateDOC] = useState()
    const [masterDOC, setMasterDOC] = useState()
    const [bachelorDOC, setbachelorDOC] = useState()
    const [associateDOC, setAssociateDOC] = useState()
    const [graduationDOC, setGraduationDOC] = useState()
    const [highschoolDOC, setHighschoolDOC] = useState()
    const [professionalCER, setProfessionalCER] = useState();


    // for dropout ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const [dropout, setDropout] = useState();



    const handleEducationlist = (email) => {
        axios.post(`${api}/reg/fetchEducationInfo`, { email: email })
            .then((Response) => {
                console.log("Education information :", Response.data.educationDetails)
                setFormData(Response.data.educationDetails);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const handleChangeForSelect = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };


    useEffect(() => {
        if (education) {
            setGyear(education.gYear);
            setGcgpa(education.gCGPA);
            setGcollege(education.gCollege);
            // setorg(education.workOrganization );
            // set12College(education.workStatus);

            set12Cgpa(education.c12CGPA);
            setc12year(education.c12Year);
            set12College(education.c12College);


            set10Cgpa(education.c10CGPA);
            setc10year(education.c10Year);
            set10College(education.c10College)
            sethighestQualification(education.highestQualification);
        }
    }, [education]);

    const handleEducationSave = (email) => {
        axios.post(`${api}/reg/saveEducationDetails`, {
            email: email,
            formData
        })
            .then((Response) => {
                toast.success("Updated Successfully!", {
                    position: "top-center",
                });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        console.log(formData)
    }


    // Profession info function 

    const handleProfessionlist = (email) => {

        axios.post(`${api}/reg/fetchProfessionalInfo`, { email: email })
            .then((Response) => {
                console.log(Response.data);

                setProfession(Response.data.professionalDetails);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    async function handleBatchlist() {

        try {
            const batch_all = await axios.get(
                `${api}/reg/getBatchList`
            );
            console.log(batch_all.data.batchList);
            setBatchList(batch_all.data.batchList);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (profession) {
            setdesignation(profession.designation);
            setlinkedinProfileLink(profession.linkedinProfileLink);
            setworkExp(profession.workExp);
            setorg(profession.workOrganization);
            setWorkstatus(profession.workStatus);
            setdesignation(profession.designation);
            console.log(profession.email);
            setProfEmail(profession.email);
            setBatchname(profession.batch)
            console.log(profession);
        }
    }, [profession]);




    // For the validations  ==>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    const [errorsProfe, setErrorsProfe] = useState({});

    // Validation Schema
    const validationSchemaProf = Yup.object({
        designation: Yup.string().required("Designation is required"),
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        linkedinProfileLink: Yup.string()
            .optional(),
        workExp: Yup.number()
            .typeError("Work experience must be a number")
            .required("Work experience is required"),
        workOrganization: Yup.string().required("Organization is required"),
        workStatus: Yup.string().optional(),
        selectedBatch: Yup.string().required("Batch selection is required"),
    });
    



    const handleProfessionSave = () => {
        // Create the data object
        const data = {
            crmId: 2,
            designation: designation,
            email: profEmail,
            linkedinProfileLink: linkedinProfileLink,
            workExp: parseInt(workExp),
            workOrganization: org,
            workStatus: workstatus,
            selectedBatch: batchname,
        };
    
        // Validate the data using validationSchemaProf
        validationSchemaProf
            .validate(data, { abortEarly: false }) // Validate all fields
            .then(() => {
                // Clear errors if validation passes
                setErrorsProfe({});
    
                // Proceed with API call
                axios.post(`${api}/reg/updateProfessionalDetails`, data)
                    .then((Response) => {
                        console.log(Response.data);
    
                        toast.success("Updated Successfully!", {
                            position: "top-center",
                        });
                        handleStudentList();
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
            })
            .catch((validationErrors) => {
                // Map Yup errors to state-friendly format
                const formattedErrors = validationErrors.inner.reduce((acc, err) => {
                    acc[err.path] = err.message;
                    return acc;
                }, {});
    
                // Set errors in state
                setErrorsProfe(formattedErrors);
            });
    };
    




    
    //    http://localhost:3000/Student-List

    const ViewDoc = () => {
        window.open(window.open(`${api}/static/uploadDocument/` + foldername + '/' + foldername + '.pdf'))
    }

    const handleapprove = (email) => {
        axios.post(`${api}/reg/approveReject`, {

            approveReject: 'approve',
            email: email,


        })
            .then((Response) => {
                console.log(Response.data);
                handleStudentList();
                toast.success("Approved Successfully!", {
                    position: "top-center",
                });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const handlereject = (email) => {
        console.log('handle reject');
        console.log(rejectreason)
        // if(rejectreason!='')
        {
            axios.post(`${api}/reg/approveReject`, {

                approveReject: 'reject',
                email: email,
                rejectionReason: rejectreason


            })
                .then((Response) => {
                    console.log(Response.data);
                    handleStudentList();

                    toast.success("Hold Successfully!", {
                        position: "top-center",
                    });
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }

    //   const handleworkexp = (event) => {
    //     setworkExp(event.target.value);
    //   };
    // const handleorg=(event)=>{
    //     setorg(event.target.value)
    // }
    // const handleDesig = (e)=>{
    //     setdesignation(e.target.value)
    // }
    // const handlelinkdin = (e)=>{
    //     setlinkedinProfileLink(e.target.value)
    // }

    //    main student list function
    async function getAllCourse() {
        try {
            const course_all = await axios.get(
                `${api}/student/getCourseList`
            );
            console.log(course_all.data);
            setCourse(course_all.data.courseList);
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        axios.get(`${api}/student/getBatchList`)
            .then((Response) => {
                console.log("batch List", Response);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])
    // async function getAllstudent() {
    //     try {
    //       const sutents_all = await axios.get(
    //         "http://127.0.0.1:5000/reg/getBatchList"
    //       );
    //       console.log(sutents_all.data);
    //       setStudent(sutents_all.data.courseList);
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }

    const handleStudentList = (e) => {
        axios.post(`${api}/student/getStudentList`, { course: coursedata, status: status })
            .then((Response) => {
                console.log("student list data : ", Response.data);
                setStudentList(Response.data.result);
                setSearchres(Response.data.result);
                console.log("from searches", searchres)
                handleBatchlist()
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }


    const handleStdList = () => {
        console.log(batchdata)


        axios.post(`${api}/student/getStudentListOnBatch`, batchdata)
            .then((Response) => {
                console.log("student list data : ", Response.data);
                setStudentList(Response.data.result);
                setSearchres(Response.data.result);
                console.log("from searches", searchres)
                handleBatchlist()
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }

    useEffect(() => {
        handleStdList()
    }, [batchdata])

    const handleStudentEmail = (email) => {
        console.log('submit click');


        // e.preventDefault();

        axios.post(`${api}/student/sendRegistrationLink`, { email: email })
            .then((Response) => {
                console.log(Response.data);
                toast.success("Registration mail sent successfully.", {
                    position: "top-center",
                });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const handleCourseChange = (event) => {
        setcoursedata(JSON.parse(event.target.value));
        // setCourseselect(JSON.parse(event.target.value))
    }
    const handleStatusChange = (event) => {
        setstatus(JSON.parse(event.target.value));
    }
    useEffect(() => {

        getAllCourse();
        settest(prev => prev + 1);
        // handleStudentList();

    }, []);
    useEffect(() => {
        handleStudentList();
    }, [status, coursedata])

    useEffect(() => {
        console.log(course);
        console.log(student);
    }, [tast])


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    useEffect(() => {
        if (selectedCountrys) {
            setCountry(selectedCountrys)
        }

    }, [selectedCountrys])
    useEffect(() => {
        if (selectedStates) {
            setState(selectedStates)
        }

    }, [selectedStates])
    useEffect(() => {
        if (selectedCitys) {
            setCity(selectedCitys)
        }

    }, [selectedCitys])


    const inputChange = (e) => {

        if (searchquery === '') {
            handleStudentList()
        }

        setSearchquery(e.target.value);
        const filterData = searchres.filter((f) => {
            return (
                (f.Name && f.Name.toLowerCase().includes(searchquery.toLowerCase())) ||
                (f.emailID && f.emailID.toLowerCase().includes(searchquery.toLowerCase())) ||
                (f.contactNo && f.contactNo.includes(searchquery)) ||
                (f.batch && f.batch.toLowerCase().includes(searchquery.toLowerCase()))
            );
        });
        setStudentList(filterData);


    };


    const updateBatch = (mail) => {
        axios.post(`${api}/student/updateStudentList`, { mail: mail, batchname })
            .then((Response) => {
                console.log("student list data : ", Response.data);
                setStudentList(Response.data.result);
                setSearchres(Response.data.result);
                console.log("from searches", searchres)
                // handleBatchlist()
                handleStudentList();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    // initial checking of userType

    useEffect(() => {
        const type = localStorage.getItem('userType');
        setUserType(type);
        setIsLoading(false);
    }, []);


    useEffect(() => {
        axios.post(`${api}/crm/crm`)
            .then((Response) => {
                console.log(Response);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])


    const handledroutStatusChange = (e) => {
        setDropout(e.target.value);
    }





    if (isLoading) {
        return <div style={{ marginTop: "200px" }}>loading...</div>
    }

    if (userType !== 'Admin') {
        return <PageNotFound />
    }

    const handleBatchChange = (event) => {
        setBatchdata(JSON.parse(event.target.value));
    };

    const saveDropoutStatusChange = (email) => {
        console.log(email, dropout)
        axios.post(`${api}/reg/dropoutStudentDetails`, { email: email, dropoutStatus: dropout })
            .then((Response) => {
                console.log(Response);
            })
            .catch((error) => {
                console.log(error);
            })
    }



    return (
        <>
            {/* content body  */}
            <div className='row content-body' style={{ backgroundColor: "#f2edf3" }}>
                <div className='row '>
                    {/* <div className='container-fluid'>

                      
                        <div className=' col-md-12 col-lg-12 col-sm-12 headLineBox d-flex justify-content-start'  >
                            <h4>Student List</h4>
                        </div>

                    </div> */}
                </div>
                <div className="container-fluid mt-4 ml-2 m-r-2" style={{ backgroundColor: "#f2edf3" }}>
                    <div className="d-flex justify-content-center flex-wrap ml-2">
                        <div className="d-flex align-items-center flex-grow-1 ">
                            <input type="text" className="form-control pl-2 pr-5" placeholder='Search here' value={searchquery} onChange={inputChange} />
                            <div className=''>
                                <CiSearch className="search-btn" />
                            </div>
                        </div>
                        <div className="flex-grow-1 mr-4">
                            <select style={{ borderRadius: "10px", backgroundColor: "white" }} className="form-select  mb-3 mt-1 w-100" aria-label="Default select example" onChange={handleBatchChange}>
                                <option value="[]" selected>Batches</option>
                                {batchList?.length > 0 && batchList.map((data) => {
                                    const Batch = data.batchName;
                                    return (
                                        <option value={JSON.stringify([{ Batch }])}>{data.batchName}</option>
                                    );
                                })}
                            </select>
                        </div>

                        <div className="flex-grow-1 mr-4">
                            <select style={{ borderRadius: "10px", backgroundColor: "white" }} className="form-select  mb-3 mt-1 w-100" aria-label="Default select example" onChange={handleCourseChange}>
                                <option value="[]" selected>Courses</option>
                                {course?.length > 0 && course.map((data) => {
                                    const Course = data.Course;
                                    return (
                                        <option value={JSON.stringify([{ Course }])}>{data.Course}</option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="flex-grow-1 mr-2">
                            <select style={{ borderRadius: "10px", backgroundColor: "white" }} className="form-select mb-3 mt-1 w-100" aria-label="Default select example" value={JSON.stringify(status)} onChange={handleStatusChange}>
                                <option value="[]" selected>Status</option>
                                <option value={JSON.stringify([{ "status": 0, "statusDetails": 'Registration Pending' }])}>Registration Pending</option>
                                <option value={JSON.stringify({ "status": 1, "statusDetails": 'Approval Pending' })}>Approval Pending</option>
                                <option value={JSON.stringify([{ "status": 2, "statusDetails": 'Onboarded' }])}>Onboarded</option>
                                <option value={JSON.stringify({ "status": 3, "statusDetails": 'On Hold' })}>On Hold</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className='container-fluid pr-2 pl-2' style={{ minHeight: '100vh' }}>
                    <div className='row'>
                        <div className='col-md-12 col-lg-12 scroll' style={{ paddingRight: '0px', paddingLeft: '0px' }}>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Course</th>
                                        <th>Batch</th>
                                        <th>Mobile No.</th>
                                        <th>Email</th>
                                        <th>Updated on</th>
                                        <th>Status</th>
                                        <th>Registration Link</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(studentList) && studentList.length > 0 && studentList?.map((val) => {
                                        return (
                                            <tr>
                                                <td style={{ fontSize: '14px' }}>{val?.Name}</td>
                                                <td style={{ fontSize: '14px' }}>{val?.Course}</td>
                                                <td style={{ fontSize: '14px' }}>
                                                    {val?.batch ? (
                                                        <span>{val.batch}</span>
                                                    ) : (
                                                        <select
                                                            className="form-control"
                                                            id="exampleSelect"
                                                            onChange={(e) => setBatchname(JSON.parse(e.target.value))}
                                                        >
                                                            <option value="">--select--</option>
                                                            {batchList.map((batch) => (
                                                                <option key={batch.batchName} value={JSON.stringify([{ batchname: batch.batchName }])}>
                                                                    {batch.batchName}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    )}
                                                </td>
                                                <td style={{ fontSize: '14px' }}>{val?.contactNo}</td>
                                                <td style={{ fontSize: '14px' }}>{val?.emailID}</td>
                                                <td style={{ fontSize: '14px' }}>{val?.updatedAt}</td>
                                                <td style={{ fontSize: '14px' }}>{
                                                    (() => {
                                                        if (val?.status == 0) {
                                                            return (
                                                                <>Registration Pending</>
                                                            )
                                                        } else if (val?.status == 1) {
                                                            return (
                                                                <>Approval Pending</>
                                                            )
                                                        } else if (val?.status == 2) {
                                                            return (
                                                                <>Onboarded</>
                                                            )
                                                        } else {
                                                            return (
                                                                <>On Hold</>
                                                            )
                                                        }
                                                    })()
                                                }</td>
                                                <td> <button style={{ background: 'transparent', border: 'none' }} className='custom-button' onClick={() => { handleStudentEmail(val?.emailID) }}><i className='fa fa-reply custom-icon' style={{ color: 'rgb(212, 139, 2)', fontSize: "14pt", padding: '2px' }}></i></button></td>
                                                <td className='d-flex' style={{ border: 'none' }}>
                                                    {/* <button style={{ background: 'transparent', border: 'none' }} className='custom-button' onClick={() => { handleStudentEmail(val?.emailID) }}><i className='fa fa-reply custom-icon' style={{ color: 'rgb(212, 139, 2)', fontSize: "14pt", padding: '2px' }}></i></button> */}
                                                    <button style={{ background: 'transparent', border: 'none' }} className='custom-button'
                                                        onClick={() => {
                                                            handleBasicInfo(val?.emailID)
                                                            handleCountrylist();
                                                            handleShow()
                                                        }}
                                                    ><i className="fa fa-edit custom-icon" style={{ color: 'rgb(212, 139, 2)', fontSize: "14pt", padding: '2px' }}></i></button>
                                                    <button disabled={val?.batch} onClick={() => updateBatch(val?.emailID)} style={{ background: 'transparent', border: 'none' }} className='custom-button'><i class="fa fa-save custom-icon" style={{ color: 'rgb(212, 139, 2)', fontSize: "14pt", padding: '2px' }}></i></button>
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


            {/* Modal */}

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="lg"
            >
                {/* <Modal.Header closeButton> */}
                {/* <Modal.Title>Modal title</Modal.Title> */}
                {/* </Modal.Header> */}
                <Modal.Body closeButton>
                    {/* I will not close if you click outside me. Do not even try to press
          escape key. */}
                    <div className='row '>
                        <div className='row '>
                            <div className='container-fluid'>

                                <div className=' col-md-12 col-lg-12 headLineBox' >
                                    <h4>Basic Information</h4>
                                </div>

                            </div>
                        </div>
                        <div className='container mt-1 ' >

                            <div className='row '>


                                {/* <div className="col-md-12"> */}
                                <div className="col-md-3 subheading p-2">
                                    First Name <i class="fa fa-star"></i>
                                </div>
                                <div className="col-md-3 p-2">
                                    <div class="input-group ">
                                        <input type="text" class="form-control"
                                            // value={info?.firstName} 
                                            value={fname}
                                            id="basic-url" aria-describedby="basic-addon3"
                                            onChange={(e) => { setFname(e.target.value) }}
                                        />
                                    </div>
                                    {errors?.firstName && <div className="error">{errors.firstName}</div>}
                                </div>
                                <div className="col-md-3 subheading p-2">
                                    Middle Name
                                </div>
                                <div className="col-md-3 p-2">
                                    <div class="input-group ">
                                        <input type="text" class="form-control"
                                            // value={info?.middleName}
                                            value={mname}
                                            id="basic-url" aria-describedby="basic-addon3"
                                            onChange={(e) => { setMname(e.target.value) }}
                                        />
                                    </div>
                                    {errors?.middleName && <div className="error">{errors.middleName}</div>}
                                </div>
                                <div className="col-md-3 subheading p-2">
                                    Last Name <i class="fa fa-star"></i>
                                </div>
                                <div className="col-md-3 p-2">
                                    <div class="input-group ">
                                        <input type="text" class="form-control"
                                            // value={info?.lastName}
                                            value={lname}
                                            id="basic-url" aria-describedby="basic-addon3"
                                            onChange={(e) => { setLname(e.target.value) }}
                                        />
                                    </div>
                                    {errors?.lastName && <div className="error">{errors.lastName}</div>}
                                </div>
                                <div className="col-md-3 subheading p-2">
                                    Gender <i class="fa fa-star"></i>
                                </div>
                                <div className="col-md-3 p-2">
                                    <div class="input-group ">
                                        <select className="form-control "
                                            // value={info?.gender}
                                            value={gender}
                                            onChange={(e) => { setGender(e.target.value) }}
                                            id="exampleSelect">
                                            <option value="Female">Female</option>
                                            <option value="Male">Male</option>
                                            <option value='Transgender'>Transgender</option>
                                        </select>
                                    </div>
                                    {errors?.gender && <div className="error">{errors.gender}</div>}
                                </div>
                                {/* </div> */}
                                {/* <div className="col-md-12"> */}
                                <div className="col-md-3 subheading p-2">
                                    Date of Birth <i class="fa fa-star"></i>
                                </div>
                                <div className="col-md-3 p-2">
                                    <div class="input-group ">
                                        <input type="date" id="dob"
                                            // value={info?.dob} 
                                            value={Dob}
                                            class="form-control"
                                            onChange={(e) => { setDob(e.target.value) }}
                                        />

                                    </div>
                                    {errors?.dob && <div className="error">{errors.dob}</div>}
                                </div>
                                <div className="col-md-3 subheading p-2">
                                    Gurdian's Name 
                                </div>
                                <div className="col-md-3 p-2">
                                    <div class="custom-file">
                                        <input type="text"
                                            // value={info?.gurdianName} 
                                            value={gardian}
                                            class="form-control" id="basic-url" aria-describedby="basic-addon3"
                                            onChange={(e) => { setGardian(e.target.value) }}
                                        />
                                    </div>
                                    {errors?.gurdianName && <div className="error">{errors.gurdianName}</div>}
                                </div>
                                {/* </div> */}


                            </div>

                            <div className='row '>

                                {/* <div className="col-md-12 heading">
                        2. Address
                        </div> */}
                                {/* <div className="col-md-12"> */}
                                <div className="col-md-3 subheading p-2">
                                    Address 1 <i class="fa fa-star"></i>
                                </div>
                                <div className="col-md-3 p-2">
                                    <div class="input-group ">
                                        <input type="text" class="form-control"
                                            //  value={info?.fullAddress1}
                                            value={add1}
                                            id="basic-url" aria-describedby="basic-addon3"
                                            onChange={(e) => { setAdd1(e.target.value) }}
                                        />
                                    </div>
                                    {errors?.fullAddress1 && <div className="error">{errors.fullAddress1}</div>}
                                </div>
                                <div className="col-md-3 subheading p-2">
                                    Address 2
                                </div>
                                <div className="col-md-3 p-2">
                                    <div class="input-group ">
                                        <input type="text" class="form-control" id="basic-url"
                                            //  value={info?.fullAddress2}
                                            value={add2}
                                            aria-describedby="basic-addon3"
                                            onChange={(e) => { setAdd2(e.target.value) }}
                                        />
                                    </div>
                                    {errors?.fullAddress2 && <div className="error">{errors.fullAddress2}</div>}
                                </div>
                                {/* </div> */}
                                {/* <div className="col-md-12"> */}
                                <div className="col-md-3 subheading p-2">
                                    Country <i class="fa fa-star"></i>
                                </div>
                                <div className="col-md-3 p-2">
                                    <div class="input-group ">
                                        {/* <input type="text" class="form-control" id="basic-url"
                                    //  value={info?.fullAddress2}
                                    value={country}
                                      aria-describedby="basic-addon3" 
                                      readOnly
                                      /> */}
                                        <Country_list country={country} setCountry={setCountry} countrylist={countrylist} info={info} selectedCountrys={selectedCountrys} setSelectedCountrys={setSelectedCountrys} />
                                        {/* <select className="form-control "
                                    
                                    // value={country}
                                      onChange={(e)=>{setCountry(JSON.parse(e.target.value))}} 
                                      id="exampleSelect">
                                    <option selected>--Select--</option>
                                        {console.log(countrylist)}
                                        {
                                            countrylist?.map((val)=>{
                                                return(
                                                    <>
                                                    
                                                    <option value={ JSON.stringify([{id:val.id,name:val.name}]) } >{val.name}</option>
                                                    
                                                    </>
                                                )
                                            })
                                        }
                                        
                                        
                                    </select> */}
                                    </div>
                                    {errors?.country && <div className="error">{errors.country}</div>}
                                </div>
                                <div className="col-md-3 subheading p-2">
                                    State <i class="fa fa-star"></i>
                                </div>
                                <div className="col-md-3 p-2">
                                    {/* <input type="text" class="form-control" id="basic-url"
                                    //  value={info?.fullAddress2}
                                    // value={state}
                                      aria-describedby="basic-addon3" 
                                      readOnly
                                      /> */}

                                    <div class="custom-file">

                                        {<State_list statelist={statelist} selectedStates={selectedStates} setSelectedStates={setSelectedStates} />}
                                        {/* <select className="form-control " 
                                   
                                    // value={state}
                                     onChange={(e)=>{setState(JSON.parse(e.target.value) )}}
                                      id="exampleSelect">
                                        <option selected>--Select--</option>
                                        {statelist?.map((val)=>{
                                            return(
                                                <>
                                              
                                                <option value={ JSON.stringify([{id:val.id,name:val.name}]) } >{val.name}</option>
                                                
                                                </>
                                            )
                                        })}
                                        
                                    </select> */}
                                    </div>
                                    {errors?.state && <div className="error">{errors.state}</div>}
                                </div>
                                <div className="col-md-3 subheading p-2">
                                    City <i class="fa fa-star"></i>
                                </div>
                                <div className="col-md-3 p-2">
                                    <div class="input-group ">
                                        {/* <input type="text" class="form-control" id="basic-url"
                                    //  value={info?.fullAddress2}
                                    value={city}
                                      aria-describedby="basic-addon3" 
                                      readOnly
                                      /> */}
                                        <City_list citylist={citylist} selectedCitys={selectedCitys} setSelectedCitys={setSelectedCitys} />
                                        {/* <select className="form-control " 
                                    
                                        // value={city}
                                   
                                     id="exampleSelect" onChange={(e)=>{setCity(JSON.parse(e.target.value))}} >
                                        <option selected>--Select--</option>
                                        {citylist?.map((val)=>{
                                            return(
                                                <>
                                                
                                                 <option value={ JSON.stringify([{id:val.id,name:val.name}]) } >{val.name}</option>
                                               
                                                </>
                                            )
                                        })}
                                    
                                    </select> */}
                                    </div>
                                    {errors?.city && <div className="error">{errors.city}</div>}
                                </div>
                                <div className="col-md-3 subheading p-2">
                                    Pin Code <i class="fa fa-star"></i>
                                </div>
                                <div className="col-md-3 p-2">
                                    <div class="input-group ">
                                        <input type="number" class="form-control"
                                            //  value={info?.zipCode} 
                                            value={pin}
                                            onChange={(e) => { setPin(e.target.value) }}
                                            id="basic-url" aria-describedby="basic-addon3" />
                                    </div>
                                    {errors?.zipCode && <div className="error">{errors.zipCode}</div>}
                                </div>
                                {/* </div> */}


                            </div>
                            <div className='row '>

                                {/* <div className="col-md-12 heading">
                        3. Contact Details
                        </div> */}
                                {/* <div className="col-md-12"> */}
                                <div className="col-md-3 subheading p-2">
                                    Phone No. <i class="fa fa-star"></i>
                                </div>
                                <div className="col-md-3 p-2">
                                    <div class="input-group ">
                                        <input type="number" class="form-control"
                                            // value={info?.mobileNumber}
                                            value={phone}
                                            onChange={(e) => { setphone(e.target.value) }}
                                            id="basic-url" aria-describedby="basic-addon3" />
                                    </div>
                                    {errors?.mobileNumber && <div className="error">{errors.mobileNumber}</div>}
                                </div>
                                <div className="col-md-3 subheading p-2">
                                    Alternate Phone No.
                                </div>
                                <div className="col-md-3 p-2">
                                    <div class="input-group ">
                                        <input type="number" class="form-control"
                                            // value={info?.alternateNumber} 
                                            value={altphone}
                                            onChange={(e) => { setAltphone(e.target.value) }}
                                            id="basic-url" aria-describedby="basic-addon3" />
                                    </div>
                                    {errors?.alternateNumber && <div className="error">{errors.alternateNumber}</div>}
                                </div>
                                {/* </div> */}
                                {/* <div className="col-md-12"> */}
                                <div className="col-md-3 subheading p-2">
                                    Email Id <i class="fa fa-star"></i>
                                </div>
                                <div className="col-md-9 p-2">
                                    {/* <div class="input-group ">
                                        <input type="email" class="form-control"
                                            // value={info?.email} 
                                            value={emailid}
                                            readOnly
                                            onChange={(e) => { setEmailid(e.target.value) }}
                                            id="basic-url" aria-describedby="basic-addon3" />
                                    </div> */}
                                    <div>
                                        {/* <p style={{ backgroundColor: "lightblue", width: "220px", padding: "2px", borderRadius: "5px" }}>{emailid}</p> */}
                                        <input type="text" class="form-control"
                                            // value={info?.alternateNumber} 
                                            value={emailid}
                                            // onChange={(e) => { setAltphone(e.target.value) }}
                                            id="basic-url" aria-describedby="basic-addon3" readOnly />
                                    </div>
                                    {errors?.email && <div className="error">{errors.email}</div>}
                                </div>
                                {/* <div className="col-md-3 subheading p-2">
                            Upload Cirtificate
                            </div>
                            <div className="col-md-3 p-2">
                            <div class="custom-file">
                                <input type="file" class="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01"/>
                                <label class="custom-file-label" for="inputGroupFile01"> file</label>
                            </div>
                            </div> */}
                                {/* </div> */}


                            </div>
                            <div className='row '>

                                {/* <div className="col-md-12 heading">
                        4. Id Proof
                        </div> */}
                                {/* <div className="col-md-12"> */}
                                <div className="col-md-3 subheading p-2">
                                    ID Proof Type <i class="fa fa-star"></i>
                                </div>
                                <div className="col-md-3 p-2">
                                    <div class="input-group ">
                                        <input type="text" class="form-control" id="basic-url"
                                            //  value={info?.fullAddress2}
                                            value={idType}
                                            aria-describedby="basic-addon3"
                                            readOnly
                                        />
                                        {/* <select className="form-control " 
                                    value={info?.idProofType}
                                     id="exampleSelect" 
                                     onChange={(e)=>{setIdproof(e.target.value)}}
                                     >
                                        <option selected>--select--</option>
                                        <option value='pan'>Pan</option>
                                        <option value='aadhar'>Aadhar</option>
                                    </select> */}
                                    </div>

                                {errors?.idproofNumber && <div className="error">{errors.idproofNumber}</div>}
                                </div>

                                {(() => {
                                    if (idType == 'aadhar') {
                                        return (
                                            <>
                                                <div className="col-md-3 subheading p-2">
                                                    AADHAR <i class="fa fa-star"></i>
                                                </div>
                                                <div className="col-md-3 p-2">
                                                    <div class="input-group ">
                                                        <input type="text" class="form-control"
                                                            value={idproofNumber}
                                                            onChange={(e) => { setAadhar(e.target.value) }} id="basic-url" aria-describedby="basic-addon3" />
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    }
                                    else if (idType == 'pan') {
                                        return (<>
                                            <div className="col-md-3 subheading p-2">
                                                PAN <i class="fa fa-star"></i>
                                            </div>
                                            <div className="col-md-3 p-2">
                                                <div class="input-group ">

                                                    <input type="text" class="form-control"
                                                        value={idproofNumber}
                                                        onChange={(e) => { setIdproofNumber(e.target.value) }}
                                                        id="basic-url" aria-describedby="basic-addon3" />
                                                </div>
                                            </div>
                                        </>
                                        )
                                    }
                                    else if (idType == 'Drivers_License') {
                                        return (<>
                                            <div className="col-md-3 subheading p-2">
                                                Drivers License <i class="fa fa-star"></i>
                                            </div>
                                            <div className="col-md-3 p-2">
                                                <div class="input-group ">

                                                    <input type="text" class="form-control"
                                                        value={info?.idproofNumber}
                                                        onChange={(e) => { setIdproofNumber(e.target.value) }}
                                                        id="basic-url" aria-describedby="basic-addon3" />
                                                </div>
                                            </div>
                                        </>
                                        )
                                    }
                                    else if (info.IdproofType === "Passport") {
                                        return (<>
                                            <div className="col-md-2 subheading p-2">
                                                PASSPORT <i class="fa fa-star"></i>
                                            </div>
                                            <div className="col-md-3 p-2">
                                                <div class="input-group mb-3">

                                                    <input type="text" class="form-control"
                                                        value={info.idproofNumber}
                                                        name="idproofNumber"
                                                        onChange={(e) => { setAadhar(e.target.value) }} id="basic-url" aria-describedby="basic-addon3" />
                                                </div>
                                            </div>
                                        </>
                                        )
                                    }
                                    else if (info.IdproofType === "oth_valid_gov_id") {
                                        return (<>
                                            <div className="col-md-2 subheading p-2">
                                                Other valid Government ID <i class="fa fa-star"></i>
                                            </div>
                                            <div className="col-md-3 p-2">
                                                <div class="input-group mb-3">

                                                    <input type="text"
                                                        class="form-control"
                                                        value={info.idproofNumber}
                                                        name="idproofNumber"
                                                        onChange={handleChange} id="basic-url" aria-describedby="basic-addon3" />
                                                </div>
                                            </div>
                                        </>
                                        )
                                    }
                                })()}
                                {/* <div className="col-md-3 subheading p-2">
                            AADHAR
                            </div>
                            <div className="col-md-3 p-2">
                                <div class="input-group mb-3">
                                    <input type="text" class="form-control" value={info?.aadharNumber} id="basic-url" aria-describedby="basic-addon3"/>
                                </div>
                            </div> */}
                                {/* </div> */}
                                {/* <div className="col-md-12"> */}
                                {/* <div className="col-md-3 subheading p-2">
                            CGPA
                            </div>
                            <div className="col-md-3 p-2">
                                <div class="input-group mb-3">
                                    <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3"/>
                                </div>
                            </div>
                            <div className="col-md-3 subheading p-2">
                            Upload Cirtificate
                            </div>
                            <div className="col-md-3 p-2">
                            <div class="custom-file">
                                <input type="file" class="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01"/>
                                <label class="custom-file-label" for="inputGroupFile01"> file</label>
                            </div>
                            </div> */}
                                {/* </div> */}


                            </div>
                            <div className='row '>

                                {/* <div className="col-md-12 heading">
                        5. Documents
                        </div> */}
                                {/* <div className="col-md-12"> */}


                                {/* </div> */}
                                {/* <div className="col-md-12"> */}
                                {/* <div className="col-md-3 subheading p-2">
                            CGPA
                            </div>
                            <div className="col-md-3 p-2">
                                <div class="input-group mb-3">
                                    <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3"/>
                                </div>
                            </div>
                            <div className="col-md-3 subheading p-2">
                            Upload Cirtificate
                            </div>
                            <div className="col-md-3 p-2">
                            <div class="custom-file">
                                <input type="file" class="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01"/>
                                <label class="custom-file-label" for="inputGroupFile01"> file</label>
                            </div>
                            </div> */}
                                {/* </div> */}


                            </div>
                            <div className="row">
                                <div className="col-md-8">

                                </div>
                                {/* <div className="col-md-2 jutify-content-end">
                            <button className="btn btn-warning">Save</button>
                            
                        </div> */}
                                <div className="col-md-4 flex-end">
                                    {/* <button className="btn btn-warning pe-2" style={{marginRight:'10px'}} 
                            // onClick={handleSave}
                            >Save</button>
                            <button className="btn btn-success ps-2" onClick={
                                ()=>{
                                    handleClose();
                                    handleShowEducation();
                                }
                                }>Next</button> */}
                                </div>
                            </div>




                        </div>



                    </div>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {/* <Button variant="primary">Understood</Button> */}
                    <button className="btn btn-warning "
                        onClick={() => { handleBasicInfoSave(info?.email) }}
                    >Save</button>
                    <button className="btn btn-success " onClick={
                        () => {
                            handleClose();
                            handleShowEducation();
                            handleEducationlist(info?.email);
                        }
                    }>Next</button>
                </Modal.Footer>
            </Modal>


            {/* modal education */}
            <Modal
                show={showEducation}
                onHide={handleCloseEducation}
                backdrop="static"
                keyboard={false}
                size='xl'
            >
                {/* <Modal.Header > */}
                {/* <Modal.Title>Modal title</Modal.Title> */}
                {/* </Modal.Header> */}
                <Modal.Body closeButton>
                    {/* I will not close if you click outside me. Do not even try to press
          escape key. */}
                    <div className='container ' >
                        <div className='row pt-2'>


                        </div>
                        <div className='row '>
                            <div className='container-fluid'>

                                <div className=' col-md-12 headLineBox' >
                                    <h4>Educational Information</h4>
                                </div>

                            </div>
                        </div>
                        <div className='container ' style={{ marginTop: "20px" }}>
                            <div className='row pt-2'>
                                <div className="col-md-2 subheading align-left" >
                                    Highest Qualification <i className="fa fa-star"></i>
                                </div>
                                <div className="col-md-3">
                                    {/* <div className="form-group">
                                <select className="form-control" value={formData.highestQualification} name="highestQualification" onChange={handleChange}>
                                    <option value="">----SELECT----</option>
                                    <option value='High_School'>High School Details</option>
                                    <option value='Graduation'>Graduation Details</option>
                                    <option value="AssociateDegree">Associate’s Details</option>
                                    <option value="BachelorDegree">Bachelor's Details</option>
                                    <option value="MasterDegree">Master's Details</option>
                                    <option value="DoctorateDegree">Doctorate Details</option>
                                </select>
                            </div> */}
                                    {/*  */}
                                    <FormControl sx={{ m: 1, width: 300 }}>
                                        <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
                                        <Select
                                            labelId="demo-multiple-checkbox-label"
                                            id="demo-multiple-checkbox"
                                            multiple
                                            value={personName}
                                            onChange={handleChangeForSelect}
                                            input={<OutlinedInput label="Select" />}
                                            renderValue={(selected) => selected.join(', ')}
                                            MenuProps={MenuProps}
                                        >
                                            {names.map((name) => (
                                                <MenuItem key={name} value={name}>
                                                    <Checkbox checked={personName.indexOf(name) > -1} />
                                                    <ListItemText primary={name} />
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    {/*  */}
                                </div>
                            </div>

                            {personName?.includes('Doctorate Details') && (
                                <div className='row '>
                                    <div className="col-md-12 heading mt-3 mb-3">
                                        <div className='headLineBox'>
                                            Doctorate Details
                                        </div>
                                    </div>
                                    <div className="col-md-2 subheading p-2 align-left">
                                        Year of passing 
                                    </div>
                                    <div className="col-md-3 col-sm-12 p-2 m-right-80">
                                        <div className="input-group mb-3">
                                            <input type="number" className="form-control" name="doctorsYOP" value={formData?.doctorsYOP} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="col-md-3 subheading p-2 align-left">
                                        University/ College /Institute Name 
                                    </div>
                                    <div className="col-md-3 p-2">
                                        <div className="input-group mb-3">
                                            <input type="text" className="form-control" name="doctorsInstituteName" value={formData?.doctorsInstituteName} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="col-md-2 subheading p-2 align-left">
                                        {formData?.doctorsInstituteCgpaGpaType || 'GPA'} 
                                        <select name="doctorsInstituteCgpaGpaType" value={formData?.doctorsInstituteCgpaGpaType} onChange={handleChange}>
                                            <option value="">select</option>
                                            <option value="CGPA">CGPA</option>
                                            <option value="GPA">GPA</option>
                                        </select>
                                    </div>
                                    <div className="col-md-3 p-2 m-right-80">
                                        <div className="input-group mb-3">
                                            <input type="number" className="form-control" name="doctorsInstituteGpaorCgpa" value={formData?.doctorsInstituteGpaorCgpa} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="col-md-3 subheading p-2 align-left">
                                        Upload Certificate 
                                    </div>
                                    <div className="col-md-3 p-2">
                                        <div className="custom-file">
                                            <input type="file" className="custom-file-input" onChange={(e) => { setDoctorateDOC(e.target.files[0]) }} />
                                            <label className="custom-file-label"> file</label>
                                        </div>
                                    </div>
                                </div>
                            )}


                            {personName?.includes('Master’s Details') && (
                                <div className='row '>
                                    <div className="col-md-12 heading mt-3 mb-3">
                                        <div className='headLineBox'>
                                            Master's  Details
                                        </div>
                                    </div>
                                    <div className="col-md-2 subheading p-2 align-left">
                                        Year of passing 
                                    </div>
                                    <div className="col-md-3 col-sm-12 p-2 m-right-80">
                                        <div className="input-group mb-3">
                                            <input type="number" className="form-control" name="mastersYOP" value={formData?.mastersYOP} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="col-md-3 subheading p-2 align-left">
                                        University/ College /Institute Name 
                                    </div>
                                    <div className="col-md-3 p-2">
                                        <div className="input-group mb-3">
                                            <input type="text" className="form-control" name="mastersInstituteName" value={formData?.mastersInstituteName} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="col-md-2 subheading p-2 align-left">
                                        {formData?.mastersInstituteCgpaGpaType || 'GPA'}  
                                        <select name="mastersInstituteCgpaGpaType" value={formData?.mastersInstituteCgpaGpaType} onChange={handleChange} id="">
                                            <option value="">select</option>
                                            <option value="CGPA">CGPA</option>
                                            <option value="GPA">GPA</option>
                                        </select>
                                    </div>
                                    <div className="col-md-3 p-2 m-right-80">
                                        <div className="input-group mb-3">
                                            <input type="number" className="form-control" name="mastersInstituteGpaorCgpa" value={formData?.mastersInstituteGpaorCgpa} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="col-md-3 subheading p-2 align-left">
                                        Upload Certificate 
                                    </div>
                                    <div className="col-md-3 p-2">
                                        <div className="custom-file">
                                            <input type="file" className="custom-file-input" onChange={(e) => { setMasterDOC(e.target.files[0]) }} />
                                            <label className="custom-file-label"> file</label>
                                        </div>
                                    </div>
                                </div>
                            )}


                            {personName?.includes('Bachelor’s Details') && (
                                <div className='row '>
                                    <div className="col-md-12 heading mt-3 mb-3">
                                        <div className='headLineBox'>
                                            Bachelor's  Details
                                        </div>
                                    </div>
                                    <div className="col-md-2 subheading p-2 align-left">
                                        Year of passing 
                                    </div>
                                    <div className="col-md-3 col-sm-12 p-2 m-right-80">
                                        <div className="input-group mb-3">
                                            <input type="number" className="form-control" name="bachelorYOP" value={formData?.bachelorYOP} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="col-md-3 subheading p-2 align-left">
                                        University/ College /Institute Name 
                                    </div>
                                    <div className="col-md-3 p-2">
                                        <div className="input-group mb-3">
                                            <input type="text" className="form-control" name="bachelorInstituteName" value={formData?.bachelorInstituteName} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="col-md-2 subheading p-2 align-left">
                                        {formData?.bachelorInstituteCgpaGpaType || 'GPA'}  
                                        <select name="bachelorInstituteCgpaGpaType" value={formData?.bachelorInstituteCgpaGpaType} onChange={handleChange} id="">
                                            <option value="">select</option>
                                            <option value="CGPA">CGPA</option>
                                            <option value="GPA">GPA</option>
                                        </select>
                                    </div>
                                    <div className="col-md-3 p-2 m-right-80">
                                        <div className="input-group mb-3">
                                            <input type="number" className="form-control" name="bachelorInstituteGpaorCgpa" value={formData?.bachelorInstituteGpaorCgpa} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="col-md-3 subheading p-2 align-left">
                                        Upload Certificate 
                                    </div>
                                    <div className="col-md-3 p-2">
                                        <div className="custom-file">
                                            <input type="file" className="custom-file-input" onChange={(e) => { setbachelorDOC(e.target.files[0]) }} />
                                            <label className="custom-file-label"> file</label>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {personName?.includes('Associate’s Details') && (
                                <div className='row '>
                                    <div className="col-md-12 heading mt-3 mb-3">
                                        <div className='headLineBox'>
                                            Associate’s Details
                                        </div>
                                    </div>
                                    <div className="col-md-2 subheading p-2 align-left">
                                        Year of passing 
                                    </div>
                                    <div className="col-md-3 col-sm-12 p-2 m-right-80">
                                        <div className="input-group mb-3">
                                            <input type="number" className="form-control" name="associateYOP" value={formData?.associateYOP} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="col-md-3 subheading p-2 align-left">
                                        University/ College /Institute Name 
                                    </div>
                                    <div className="col-md-3 p-2">
                                        <div className="input-group mb-3">
                                            <input type="text" className="form-control" name="associateInstituteName" value={formData?.associateInstituteName} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="col-md-2 subheading p-2 align-left">
                                        {formData?.associateInstituteCgpaGpaType || 'GPA'}  
                                        <select name="associateInstituteCgpaGpaType" value={formData?.associateInstituteCgpaGpaType} onChange={handleChange} id="">
                                            <option value="">select</option>
                                            <option value="CGPA">CGPA</option>
                                            <option value="GPA">GPA</option>
                                        </select>
                                    </div>
                                    <div className="col-md-3 p-2 m-right-80">
                                        <div className="input-group mb-3">
                                            <input type="number" className="form-control" name="associateInstituteGpaorCgpa" value={formData?.associateInstituteGpaorCgpa} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="col-md-3 subheading p-2 align-left">
                                        Upload Certificate 
                                    </div>
                                    <div className="col-md-3 p-2">
                                        <div className="custom-file">
                                            <input type="file" className="custom-file-input" onChange={(e) => { setAssociateDOC(e.target.files[0]) }} />
                                            <label className="custom-file-label"> file</label>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {personName?.includes('Graduation Details') && (
                                <div className='row '>
                                    <div className="col-md-12 heading mt-3 mb-3">
                                        <div className='headLineBox'>
                                            Graduation Details
                                        </div>
                                    </div>
                                    <div className="col-md-2 subheading p-2 align-left">
                                        Year of passing 
                                    </div>
                                    <div className="col-md-3 col-sm-12 p-2 m-right-80">
                                        <div className="input-group mb-3">
                                            <input type="number" className="form-control" name="graduationYOP" value={formData?.graduationYOP} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="col-md-3 subheading p-2 align-left">
                                        University/ College /Institute Name 
                                    </div>
                                    <div className="col-md-3 p-2">
                                        <div className="input-group mb-3">
                                            <input type="text" className="form-control" name="graduationInstituteName" value={formData?.graduationInstituteName} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="col-md-2 subheading p-2 align-left">
                                        {formData?.graduationInstituteCgpaGpaType || 'GPA'}  
                                        <select name="graduationInstituteCgpaGpaType" value={formData?.graduationInstituteCgpaGpaType} onChange={handleChange} id="">
                                            <option value="">select</option>
                                            <option value="CGPA">CGPA</option>
                                            <option value="GPA">GPA</option>
                                        </select>
                                    </div>
                                    <div className="col-md-3 p-2 m-right-80">
                                        <div className="input-group mb-3">
                                            <input type="number" className="form-control" name="graduationInstituteGpaorCgpa" value={formData?.graduationInstituteGpaorCgpa} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="col-md-3 subheading p-2 align-left">
                                        Upload Certificate 
                                    </div>
                                    <div className="col-md-3 p-2">
                                        <div className="custom-file">
                                            <input type="file" className="custom-file-input" onChange={(e) => { setGraduationDOC(e.target.files[0]) }} />
                                            <label className="custom-file-label"> file</label>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {personName?.includes('High School Details') && (
                                <div className='row '>
                                    <div className="col-md-12 heading mt-3 mb-3">
                                        <div className='headLineBox'>
                                            High School Details
                                        </div>
                                    </div>
                                    <div className="col-md-2 subheading p-2 align-left">
                                        Year of passing 
                                    </div>
                                    <div className="col-md-3 p-2 m-right-80">
                                        <div className="input-group mb-3">
                                            <input type="number" className="form-control" name="highestSchoolYOP" value={formData?.highestSchoolYOP} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="col-md-3 subheading p-2 align-left">
                                        School/ College/Institute Name 
                                    </div>
                                    <div className="col-md-3 p-2">
                                        <div className="input-group mb-3">
                                            <input type="text" className="form-control" name="highSchoolInstituteName" value={formData?.highSchoolInstituteName} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="col-md-2 subheading p-2 align-left">
                                        {formData?.highSchoolInstituteCgpaGpaType || 'GPA'}  
                                        <select name="highSchoolInstituteCgpaGpaType" value={formData?.highSchoolInstituteCgpaGpaType} onChange={handleChange} id="">
                                            <option value="">select</option>
                                            <option value="CGPA">CGPA</option>
                                            <option value="GPA">GPA</option>
                                        </select>
                                    </div>
                                    <div className="col-md-3 p-2 m-right-80">
                                        <div className="input-group mb-3">
                                            <input type="number" className="form-control" name="highSchoolInstituteGpaorCgpa" value={formData?.highSchoolInstituteGpaorCgpa} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="col-md-3 subheading p-2 align-left">
                                        Upload Certificate 
                                    </div>
                                    <div className="col-md-3 p-2">
                                        <div className="custom-file">
                                            <input type="file" className="custom-file-input" onChange={(e) => { setHighschoolDOC(e.target.files[0]) }} />
                                            <label className="custom-file-label"> file</label>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {personName?.includes('Others') && (
                                <div className='row '>
                                    <div className="col-md-12 heading mt-3 mb-3">
                                        <div className='headLineBox'>
                                            Others Details
                                        </div>
                                    </div>
                                    <div className="col-md-2 subheading p-2 align-left">
                                        Any Professional Training Certificate or Equivalent 
                                    </div>
                                    <div className="col-md-3 col-sm-12 p-2 m-right-80">
                                        <div className="input-group mb-3">
                                            <input type="text" className="form-control" name="professionalCertificateName" value={formData?.professionalCertificateName} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="col-md-3 subheading p-2 align-left">
                                        No of years of Field Experience 
                                    </div>
                                    <div className="col-md-3 p-2">
                                        <div className="input-group mb-3">
                                            <input type="number" className="form-control" name="NoOfYearsOfFieldExperience" value={formData?.NoOfYearsOfFieldExperience} onChange={handleChange} />
                                        </div>
                                    </div>
                                    {/* <div className="col-md-2 subheading p-2 align-left">
                                {formData.doctorsInstituteCgpaGpaType || 'Gpa'} <i className="fa fa-star"></i>
                                <select name="doctorsInstituteCgpaGpaType" value={formData.doctorsInstituteCgpaGpaType} onChange={handleChange}>
                                    <option value="">select</option>
                                    <option value="Cgpa">Cgpa</option>
                                    <option value="Gpa">Gpa</option>
                                </select>
                            </div>
                            <div className="col-md-3 p-2 m-right-80">
                                <div className="input-group mb-3">
                                    <input type="number" className="form-control" name="doctorsInstituteGpaorCgpa" value={formData.doctorsInstituteGpaorCgpa} onChange={handleChange} />
                                </div>
                            </div> */}
                                    <div className="col-md-2 subheading p-2 align-left">
                                        Upload Certificate 
                                    </div>
                                    <div className="col-md-3 p-2">
                                        <div className="custom-file">
                                            <input type="file" className="custom-file-input" onChange={(e) => { setProfessionalCER(e.target.files[0]) }} />
                                            <label className="custom-file-label"> file</label>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>


                        {/* <div className='row '>

                            <div className="col-md-3 subheading p-2" >
                                Highest Qualification <i class="fa fa-star"></i>
                            </div>
                            <div className="col-md-3 p-2" style={{ height: '55px' }}>
                                <div className="form-group  ">

                                    <select className="form-control"
                                        value={education?.highestQualification}
                                        id="exampleSelect"
                                        onChange={(e) => {
                                            sethighestQualification(e.target.value)
                                        }}
                                    >
                                        <option value='Post Graduation'>Post Graduation</option>
                                        <option value='Graduation'>Graduation</option>
                                    </select>
                            
                                </div>
                            </div>
                            <div className='col-md-6'>

                            </div>


                            <div className="col-md-3 subheading p-2">
                                Grad Passout Year <i class="fa fa-star"></i>
                            </div>
                            <div className="col-md-3 p-2">
                                <div class="input-group ">
                                    <input type="number" class="form-control"
                                        value={gyear}
                                        id="basic-url" aria-describedby="basic-addon3"

                                        onChange={(e) => {
                                            setGyear(e.target.value)
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="col-md-3 subheading p-2">
                                Grad Institution <i class="fa fa-star"></i>
                            </div>
                            <div className="col-md-3 p-2">
                                <div class="input-group ">
                                    <input type="text" class="form-control"
                                       
                                        value={gcollege}
                                        id="basic-url" aria-describedby="basic-addon3"
                                        onChange={(e) => {
                                            setGcollege(e.target.value)
                                        }}
                                    />
                                </div>
                            </div>
                         
                            <div className="col-md-3 subheading ">
                                Grad CGPA <i class="fa fa-star"></i>
                            </div>
                            <div className="col-md-3 p-2">
                                <div class="input-group ">
                                    <input type="number"
                                       
                                        value={gcgpa}
                                        class="form-control" id="basic-url" aria-describedby="basic-addon3"
                                        onChange={(e) => {
                                            setGcgpa(e.target.value)
                                        }}
                                    />
                                </div>
                            </div>

                        </div> */}

                        {/* <div className='row '>
                            <div className="col-md-3 subheading p-2">
                                12th Passout Year <i class="fa fa-star"></i>
                            </div>
                            <div className="col-md-3 p-2">
                                <div class="input-group ">
                                    <input type="number"
                                       
                                        value={c12year}
                                        class="form-control" id="basic-url" aria-describedby="basic-addon3"
                                        onChange={(e) => {
                                            setc12year(e.target.value)
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="col-md-3 subheading p-2">
                                12th Institution <i class="fa fa-star"></i>
                            </div>
                            <div className="col-md-3 p-2">
                                <div class="input-group ">
                                    <input type="text"
                                        
                                        value={c12College}
                                        class="form-control" id="basic-url" aria-describedby="basic-addon3"
                                        onChange={(e) => {
                                            set12College(e.target.value)
                                        }}
                                    />
                                </div>
                            </div>
                            
                            <div className="col-md-3 subheading p-2">
                                12th CGPA <i class="fa fa-star"></i>
                            </div>
                            <div className="col-md-3 p-2">
                                <div class="input-group ">
                                    <input type="number"
                                        
                                        value={c12cgpa}
                                        class="form-control" id="basic-url" aria-describedby="basic-addon3"
                                        onChange={(e) => {
                                            set12Cgpa(e.target.value)
                                        }}
                                    />
                                </div>
                            </div>
                  
                        </div> */}
                        {/* <div className='row '>
                            <div className="col-md-3 subheading p-2">
                                10th Passout Year <i class="fa fa-star"></i>
                            </div>
                            <div className="col-md-3 p-2">
                                <div class="input-group ">
                                    <input type="number"
                                      
                                        value={c10year}
                                        class="form-control" id="basic-url" aria-describedby="basic-addon3"
                                        onChange={(e) => {
                                            setc10year(e.target.value)
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="col-md-3 subheading p-2">
                                10th Institution <i class="fa fa-star"></i>
                            </div>
                            <div className="col-md-3 p-2">
                                <div class="input-group ">
                                    <input type="text"
                                        
                                        value={c10College}
                                        class="form-control" id="basic-url" aria-describedby="basic-addon3"
                                        onChange={(e) => {
                                            set10College(e.target.value)
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="col-md-3 subheading p-2">
                                10th CGPA <i class="fa fa-star"></i>
                            </div>
                            <div className="col-md-3 p-2">
                                <div class="input-group ">
                                    <input type="number"
                                        value={c10cgpa}
                                        class="form-control" id="basic-url" aria-describedby="basic-addon3"
                                        onChange={(e) => {
                                            set10Cgpa(e.target.value)
                                        }}
                                    />
                                </div>
                            </div>



                        </div> */}

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEducation}>
                        Close
                    </Button>
                    <button className="btn btn-warning pe-2"
                        onClick={
                            () => { handleEducationSave(formData?.email) }}
                    >Save</button>
                    <button className="btn btn-success ps-2" onClick={
                        () => {
                            handleCloseEducation()
                            handleShowProfession()
                            handleProfessionlist(formData?.email)
                            handleBatchlist()
                        }
                    } >Next</button>
                    {/* <Button variant="primary">Understood</Button> */}
                </Modal.Footer>
            </Modal>

            {/* modal profession */}

            <Modal
                show={showProfession}
                onHide={handleCloseProfession}
                backdrop="static"
                keyboard={false}
                size='lg'
            >
                {/* <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header> */}
                <Modal.Body closeButton>
                    {/* I will not close if you click outside me. Do not even try to press
          escape key. */}
                    <div className='row '>
                        <div className='row '>
                            <div className='container-fluid'>

                                <div className=' col-md-12 headLineBox' >
                                    <h4>Professional Information</h4>
                                </div>

                            </div>
                        </div>
                        <div className='container ' >

                            <div className='row '>

                                {/* <div className="col-md-12 heading">
                                1. Graduation Details
                                </div> */}
                                {/* <div className="col-md-12"> */}
                                <div className="col-md-3 subheading p-2">
                                    Working Status <i class="fa fa-star"></i>
                                </div>
                                <div className="col-md-3 p-2">
                                    <div className="input-group ">
                                        <select className="form-control " id="exampleSelect"
                                            value={workstatus}
                                            onChange={(e) => {
                                                setWorkstatus(e.target.value)
                                            }}
                                        >
                                            <option>working professional</option>
                                            <option>Student</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-3 subheading p-2">
                                    Total Years of Experience <i class="fa fa-star"></i>
                                </div>
                                <div className="col-md-3 p-2">
                                    <div class="input-group ">
                                        <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3"

                                            // value={}
                                            value={workExp}

                                            // onChange={handleworkexp}
                                            onChange={(e) => {
                                                setworkExp(e.target.value)
                                            }}
                                        />
                                    </div>
                                    {errorsProfe?.workExp && <div className="error">{errorsProfe.workExp}</div>}
                                </div>
                                {/* </div> */}
                                {/* <div className="col-md-12"> */}
                                <div className="col-md-3 subheading p-2">
                                    Current Organization <i class="fa fa-star"></i>
                                </div>
                                <div className="col-md-3 p-2">
                                    <div class="input-group ">
                                        <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3"

                                            value={org}

                                            // onChange={handleorg}
                                            onChange={(e) => {
                                                setorg(e.target.value)
                                            }}
                                        />
                                    </div>
                                    {errorsProfe?.workOrganization && <div className="error">{errorsProfe.workOrganization}</div>}
                                </div>
                                <div className="col-md-3 subheading p-2">
                                    Current Designation <i class="fa fa-star"></i>
                                </div>
                                <div className="col-md-3 p-2">
                                    <div class="custom-file">
                                        <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3"
                                            value={designation}
                                            onChange={(e) => {
                                                setdesignation(e.target.value)
                                            }}
                                        // value={designation} 

                                        // onChange={handleDesig}
                                        />
                                    </div>
                                    {errorsProfe?.designation && <div className="error">{errorsProfe.designation}</div>}
                                </div>
                                {/* </div> */}


                            </div>

                            <div className='row '>

                                {/* <div className="col-md-12 heading">
                                1. 12th Details
                                </div> */}



                                <div className="col-md-3 subheading p-2">
                                    Linkedin Profile Link <i class="fa fa-star"></i>
                                </div>
                                <div className="col-md-3 p-2">
                                    <div className="input-group ">
                                        <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3"
                                            value={linkedinProfileLink}
                                            // onChange={handlelinkdin}
                                            onChange={(e) => {
                                                setlinkedinProfileLink(e.target.value)
                                            }}
                                        />
                                    </div>
                                    {errorsProfe?.linkedinProfileLink && <div className="error">{errorsProfe.linkedinProfileLink}</div>}
                                </div>
                                <div className="col-md-3 subheading p-2">
                                    All Documents
                                </div>
                                <div className="col-md-3 p-2">
                                    <div class="input-group ">
                                        {/* <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3" 
                                            // value={linkedinProfileLink}        
                                            // onChange={handlelinkdin}
                                            /> */}
                                        <button className='btn btn-light' onClick={ViewDoc}>View</button>
                                    </div>
                                </div>
                                {/* <div className="col-md-3 subheading p-2">
                                    Upload Resume
                                    </div> */}
                                {/* <div className="col-md-3 p-2">
                                    <div class="custom-file">
                                        <input type="file" class="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01" 
                                        // onChange={(e)=>{setResume(e.target.files[0])}}
                                        />
                                        <label class="custom-file-label" for="inputGroupFile01"> file</label>
                                    </div>
                                    </div> */}
                                {/* </div> */}


                            </div>
                            <div className='row'>
                                <div className="col-md-3 subheading p-2">
                                    Batch <i class="fa fa-star"></i>
                                </div>
                                <div className="col-md-3 p-2">
                                    <div class="input-group ">
                                        <select className="form-control " id="exampleSelect"
                                            value={batchname}
                                            onChange={(e) => {
                                                //  setBatchList(JSON.parse( e.target.value))
                                                setBatchname(e.target.value)
                                            }}
                                        >
                                            <option selected >--select--</option>
                                            {
                                                batchList?.map((val) => {
                                                    return (
                                                        <>
                                                            <option value={val.batchName}>{val.batchName}</option>
                                                        </>
                                                    )
                                                })
                                            }

                                        </select>
                                    </div>
                                    {errorsProfe?.selectedBatch && <div className="error">{errorsProfe.selectedBatch}</div>}
                                </div>
                                {(() => {
                                    if (rejectflag == true) {
                                        return (
                                            <>
                                                <div className="col-md-3 subheading p-2">
                                                    Reason for Hold <i class="fa fa-star"></i>
                                                </div>
                                                <div className="col-md-3 p-2">
                                                    <div class="input-group ">

                                                        <textarea class="form-control" rows="3" id="comment"
                                                            value={rejectreason}
                                                            // onClick={(e)=>{(e.target.value)}}
                                                            onChange={(e) => {
                                                                setRejectReason(e.target.value)
                                                            }}></textarea>
                                                    </div>
                                                </div>
                                            </>
                                        );
                                    }
                                })()

                                }

                                <div className='col-md-3'>
                                    Dropout Status
                                </div>
                                <div className='col-md-3'>
                                    <select onChange={handledroutStatusChange} name="" id="">
                                        <option disabled value="">SELECT option</option>
                                        <option value="1">Dropped</option>
                                        <option value="0">N/A</option>
                                    </select>
                                    <Button style={{ marginTop: "2px" }} onClick={() => { saveDropoutStatusChange(profEmail) }} variant="secondary">SAVE</Button>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-8">

                                </div>
                                <div className="col-md-4 flex-end">

                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseProfession}>
                        Close
                    </Button>
                    {/* <Button variant="primary">Understood</Button> */}
                    <button className="btn btn-warning pe-2" style={{ marginRight: '10px' }}
                        onClick={
                            () => { handleProfessionSave(profEmail) }}

                    >Save</button>

                    <button className='btn btn-warning' onClick={() => { handleapprove(profEmail) }}>Approve</button>
                    <button className='btn btn-danger' onClick={() => {
                        setRejectFlag(false);
                        if (rejectflag) {
                            handlereject(profEmail)
                        }
                        else {

                            handlerejectShow()
                            // handleCloseProfession()
                        }

                        // handlereject(profEmail)
                    }} >Hold On</button>
                </Modal.Footer>
            </Modal>
            <Rejection_dialog showreject={showreject} handlerejectClose={handlerejectClose} handlerejectShow handlereject={handlereject} profEmail={profEmail} setRejectFlag={setRejectFlag} />
            <ToastContainer />
        </>
    );
}

export default Student_List;