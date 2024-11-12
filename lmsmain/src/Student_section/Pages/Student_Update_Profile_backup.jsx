import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import "../../assets/css/Mentor/Update_profile.css";
import Button from '@mui/material/Button';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import profile_photo from "../../assets/img/profile_photo/profile_photo.png";
import { api } from '../../ApiUrl/ApiUrl';
import Student_change_password from './Student_change_password';
import  StudentPortfolio  from '../Components/Student_Update_Profile/StudentPortfolio_backup';
import AddPortfolioDetails from '../Components/Portfolio/AddPortfolioDetails';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const Student_Update_Profile = () => {
    const [value, setValue] = React.useState(0);

    // ........................................................................................................
    const [countrylist, setCountrylist] = useState('');
    const [countryy, setCountryy] = useState([]);
    const [state,setState] = useState()
    const [statelist, setStatelist] = useState();
    const [citylist, setCitylist] = useState();
    const [studentEmail,setstudentEmail] = useState()

    const handleChangeTabs = (event, newValue) => {
        setValue(newValue);
    };

    const [profileImagePreview, setProfileImagePreview] = useState(null);
    const [mentorID, setMentorID] = useState();

    useEffect(()=>{
        setstudentEmail(localStorage.getItem('studentEmail'))
    },[])

    const [formData, setFormData] = useState({
        name: '',
        Gender: '',
        Dob: '',
        highestQualifucation: '',
        universityName: '',
        yearofExp: '',
        emailId: '',

        linkedinLink: '',
        country: '',
        state:'',
        city:'',
        profile_photo: null,
        panNo: '',
        altNo:'',
        pinCode:'',
        IdProofType:'',
        IdNo:'',
        address1:'',
        address2:'',
        upload_certificate: null,
        // instructor_id: '',
        phoneNumber: '',
        Organization_name:''
    });


    useEffect(()=>{
        if(studentEmail){
            axios.post(`${api}/student/getProfilePic`,{studentEmail:studentEmail})
            .then((Response)=>{
                const profilePicPath = Response?.data?.profilePicPath;
                if (profilePicPath) {
                    setProfileImagePreview(`${api}/static/${profilePicPath}`); 
                }
            })
            .catch((error)=>{
               console.log(error);
            })
        }
    },[studentEmail])



    useEffect(() => {
        setMentorID(localStorage.getItem('id'));
    }, []);

    // country list
    const handleCountrylist = (e) => {
        //     console.log('submit click');
        //    console.log(email);
        axios.post(`${api}/reg/getCountryList`, { countryPhrase: "" })
            .then((Response) => {
                console.log("country list ", Response.data.countryList);
                //    setInfo(Response.data.basicDetails);
                setCountrylist(Response.data.countryList);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    // citylist
    const handleStatelist = () => {

        axios.post(`${api}/reg/getStateList`, { country: [countryy] })
            .then((Response) => {
                console.log(Response.data);
                //    setInfo(Response.data.basicDetails);
                setStatelist(Response.data.stateList);
                console.log(Response.data.stateList)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }


    
    const handleCitylist = () => {
        axios.post(`${api}/reg/getCityList`, { state: [state] })
            .then((Response) => {
                console.log(Response.data);
                //    setInfo(Response.data.basicDetails);
                setCitylist(Response.data.cityList);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }


    useEffect(()=>{
        handleCitylist()
      },[formData.state])


    useEffect(() => {
        handleCountrylist();
    }, [])

    useEffect(() => {
        handleStatelist();
    }, [formData.country])



    useEffect(() => {
        if (mentorID) {
            axios.post(`${api}/mentor/getMentorBasicList`, { mentorID })
                .then(response => {
                    setFormData(response.data.result[0]);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [mentorID]);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;

        // if (name === 'country') {
        //     const selectedCountry = JSON.parse(value);
        //     setCountryy(selectedCountry);
        //     setFormData({
        //         ...formData,
        //         [name]: [selectedCountry],
        //     });
        // }
        // else if(name === 'state'){
        //     const selectedState = JSON.parse(value);
        //     setState(selectedState)
        //     setFormData({
        //         ...formData,
        //         [name]: [selectedState],
        //     });
        // }
        if (type === 'file') {
            const file = files[0];
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: file,
            }));

            if (name === 'profile_photo') {
                const previewUrl = URL.createObjectURL(file);
                setProfileImagePreview(previewUrl);
            }
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        }

       
    };

    // useEffect(() => {
    //     if (formData.profile_photo) {
    //         handlePhoto();
    //     }
    // }, [formData.profile_photo]);

    useEffect(() => {
        if (formData.upload_certificate) {
            handleId();
        }
    }, [formData.upload_certificate]);

    const handlePhoto = (e) => {
        const data = new FormData();
        data.append('studentEmail', studentEmail);
        data.append('fileType', 'photo');
        data.append('file', formData.profile_photo);

        axios.post(`${api}/student/uploadProfilePic`, data, {studentEmail:studentEmail})
            .then((Response) => {
                if(Response?.data?.success){
                    toast.success("Updated Successfully!", {
                        position: "top-center",
                    });
                }
                console.log(Response.data?.success);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const handleId = (e) => {
        const data = new FormData();
        data.append('email', formData.emailId);
        data.append('fileType', 'certificate');
        data.append('file', formData.upload_certificate);

        axios.post(`${api}/reg/uploadDocument`, data, {})
            .then((Response) => {
                console.log(Response.data);
                toast.success("Updated Successfully!", {
                    position: "top-center",
                });
            })
            .catch(error => {
                console.log(error);
            });
    };

    const [errors, setErrors] = useState({});

    const validationSchema = Yup.object({
        emailId: Yup.string()
            .required("Email id is required")
            .email("Invalid email format"),
        universityName: Yup.string()
            .required("University/Institute/College Name is required"),
        Dob: Yup.date().required("Date of birth is required"),
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        // try {
        //     await validationSchema.validate(formData, { abortEarly: false });

        //     axios.post(`${api}/mentor/editMentorBasicInfo`, formData)
        //         .then((response) => {
        //             console.log(response.data);
        //             toast.success("Updated Successfully!", {
        //                 position: "top-center",
        //             });
        //             setErrors({});
        //         })
        //         .catch((error) => {
        //             console.error('Error:', error);
        //         });
        // } catch (error) {
        //     const newErrors = {};
        //     error.inner.forEach(element => {
        //         newErrors[element.path] = element.message;
        //     });
        //     setErrors(newErrors);
        // }
    };

   const [resume,setResume]=useState('')
   const uploadResume=()=>{
    const data=new FormData()
    data.append('file',resume)
    data.append('studentEmail',localStorage.getItem('studentEmail'))
    axios.post(`${api}/student/uploadResumeProfile`, data,{})
                .then((response) => {
                    console.log(response.data);
                    toast.success("Update Resume Successfully!", {
                        position: "top-center",
                    });
                    // setErrors({});
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
   }

    return (
        <div style={{ minHeight: 'calc(100vh - 58px)', marginTop: '58px', backgroundColor: "#f2edf3"  }}>
            <div className='container-fluid'>
                {/* <div className='col-md-12 col-lg-12 headLineBox d-flex justify-content-start'>
                    <h4>Profile details</h4>
                </div> */}
                <div className='mt-6' >
                    <Box
                        sx={{ flexGrow: 1, bgcolor: '#f2edf3', display: 'flex', height: 380, PaddingTop: '100px', }}
                    >
                        <Tabs
                            orientation="vertical"
                            // variant="scrollable"
                            value={value}
                            onChange={handleChangeTabs}
                            aria-label="Vertical tabs example"
                            sx={{ borderRight: 1, borderColor: 'divider', alignItems: 'flex-start', width: "280px" }}
                        >
                            <Tab style={{ width: "210px", position: "relative", left: "0px", }} label="Profile picture" {...a11yProps(0)} />
                            <Tab style={{ width: "210px", position: "relative", left: "5px" }} label="Personal Details" {...a11yProps(1)} />
                            <Tab style={{ width: "210px", position: "relative", left: "17px" }} label="Educational Details" {...a11yProps(2)} />
                            <Tab style={{ width: "210px", position: "relative", left: "22px" }} label="Professional Details" {...a11yProps(3)} />
                            <Tab style={{ width: "210px", position: "relative", left: "-35px" }} label="Resume" {...a11yProps(4)} />
                            <Tab style={{ width: "210px", position: "relative", left: "-10px" }} label="Add Portfolio" {...a11yProps(5)} />
                            <Tab style={{ width: "210px", position: "relative", left: "-25px" }} label="Portfolio" {...a11yProps(6)} />
                            <Tab style={{ width: "210px", position: "relative", left: "8px" }} label="Change Password" {...a11yProps(7)} />
                        </Tabs>

                        <TabPanel value={value} index={0} className="tab-panel">
                            <Form onSubmit={handleSubmit}>
                                <div className='row' style={{ marginBottom: "15px" }}>
                                    <div className='col-md-6'>
                                        {profileImagePreview ? (
                                            <div className="image-preview" style={{ width: "150px", marginBottom: "5px", border: "1px solid black", borderRadius: "10px" }}>
                                                <img src={profileImagePreview} alt="Profile Preview" style={{ width: "150px", marginTop: '10px', borderRadius: "10px" }} />
                                            </div>
                                        ) : (
                                            <div style={{ border: "1px solid black", width: "150px", borderRadius: "10px" }}>
                                                <img style={{ width: "200px", borderRadius: "10px" }} src={profile_photo} alt="profile_photo" />
                                            </div>
                                        )}
                                        <Form.Group >
                                            <input
                                                type="file"
                                                name="profile_photo"
                                                // value={formData.profile_photo}
                                                onChange={handleChange}
                                                id="fileInput"
                                                style={{ marginTop: "5px", borderRadius: "0px" }}
                                            />
                                        </Form.Group>
                                       
                                    </div>
                                    
                                </div>
                                <div className='row'>
                                <div className='col-md-12'>
                                    <Button type='button' onClick={()=>handlePhoto()} variant="contained" color="primary">Update Profile picture</Button>
                                </div>
                                </div>
                            </Form>
                        </TabPanel>
                        <TabPanel value={value} index={1} className="tab-panel">
                            <Form onSubmit={handleSubmit}>
                                <div className='row '>
                                    <div className='col-md-6'>
                                        <Form.Group controlId="formName" className="p-0 m-0 mb-4 form-group">
                                            <Form.Label className="form-label">Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="name"
                                                placeholder='Name'
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="form-control-custom"
                                            />
                                        </Form.Group>
                                    </div>
                                    <div className='col-md-6'>
                                        <Form.Group controlId="formGender" className="mb-4 form-group">
                                            <Form.Label className="form-label">Gender</Form.Label>
                                            <Form.Control
                                                as="select"
                                                name="Gender"
                                                value={formData.Gender}
                                                onChange={handleChange}
                                                className="form-control-custom"
                                            >
                                                <option value="">SELECT</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="others">Others</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </div>
                                    <div className='col-md-6'>
                                        <Form.Group controlId="formDob" className="mb-4 form-group">
                                            <Form.Label className="form-label">Date Of Birth</Form.Label>
                                            <Form.Control
                                                type="date"
                                                name="Dob"
                                                value={formData.Dob}
                                                onChange={handleChange}
                                                className="form-control-custom"
                                            />
                                            {errors.Dob && <div className="error">{errors.Dob}</div>}
                                        </Form.Group>
                                    </div>
                                    {/* <div className='col-md-6'>
                                        <Form.Group controlId="formPanNo" className="mb-4 form-group">
                                            <Form.Label className="form-label">Pan Number</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="panNo"
                                                value={formData.panNo}
                                                onChange={handleChange}
                                                className="form-control-custom"
                                                placeholder='Pan Number'
                                            />
                                        </Form.Group>
                                    </div> */}
                                    <div className='col-md-6'>
                                        <Form.Group controlId="formMailId" className="mb-4 form-group">
                                            <Form.Label className="form-label">Email ID</Form.Label>
                                            <Form.Control
                                                type="email"
                                                name="emailId"
                                                value={formData.emailId}
                                                onChange={handleChange}
                                                className="form-control-custom"
                                                placeholder='Email ID'
                                            />
                                            {errors.emailId && <div className="error">{errors.emailId}</div>}
                                        </Form.Group>
                                    </div>
                                    <div className='col-md-6'>
                                        <Form.Group controlId="formPhoneNumber" className="mb-4 form-group">
                                            <Form.Label className="form-label">Phone Number</Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="phoneNumber"
                                                value={formData.phoneNumber}
                                                onChange={handleChange}
                                                className="form-control-custom"
                                                placeholder='Phone Number'
                                            />
                                        </Form.Group>
                                    </div>
                                    <div className='col-md-6'>
                                        <Form.Group controlId="formPhoneNumber" className="mb-4 form-group">
                                            <Form.Label className="form-label"> Alternate Phone Number</Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="altNo"
                                                value={formData?.altNo}
                                                onChange={handleChange}
                                                className="form-control-custom"
                                                placeholder='Phone Number'
                                            />
                                        </Form.Group>
                                    </div>
                                    <div className="row">
                                        <div className='col-md-6'>
                                            <Form.Group controlId="formName" className="p-0 m-0 mb-4 form-group">
                                                <Form.Label className="form-label">Address Line 1</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="address1"
                                                    placeholder='Address 1'
                                                    value={formData?.address1}
                                                    onChange={handleChange}
                                                    className="form-control-custom"
                                                />
                                            </Form.Group>
                                        </div>
                                        <div className='col-md-6'>
                                            <Form.Group controlId="formName" className="p-0 m-0 mb-4 form-group">
                                                <Form.Label className="form-label">Address Line 2</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="address2"
                                                    placeholder='address 2'
                                                    value={formData?.address2}
                                                    onChange={handleChange}
                                                    className="form-control-custom"
                                                />
                                            </Form.Group>
                                        </div>
                                    </div>

                                    <div className='col-md-6'>
                                        <Form.Group controlId="formGender" className="mb-4 form-group">
                                            <Form.Label className="form-label">Country</Form.Label>
                                            <Form.Control
                                                as="select"
                                                name="country"
                                                value={formData.country}
                                                onChange={handleChange}
                                                className="form-control-custom"
                                            >
                                                <option value="">---SELECT---</option>

                                                {countrylist && countrylist.map((val) => (
                                                    <option key={val.id} value={JSON.stringify(val)}>{val.name}</option>
                                                ))}
                                            </Form.Control>
                                        </Form.Group>
                                    </div>
                                    <div className='col-md-6'>
                                        <Form.Group controlId="formGender" className="mb-4 form-group">
                                            <Form.Label className="form-label">State</Form.Label>
                                            <Form.Control
                                                as="select"
                                                name="state"
                                                value={formData?.state}
                                                onChange={handleChange}
                                                className="form-control-custom"
                                            >
                                                <option value="">---SELECT---</option>

                                                {statelist && statelist?.map((val) => (
                                                    <option value={JSON.stringify(val)} >{val.name}</option>
                                                ))}
                                            </Form.Control>
                                        </Form.Group>
                                    </div>
                                    <div className='col-md-6'>
                                        <Form.Group controlId="formGender" className="mb-4 form-group">
                                            <Form.Label className="form-label">City</Form.Label>
                                            <Form.Control
                                                as="select"
                                                name="city"
                                                value={formData?.city}
                                                onChange={handleChange}
                                                className="form-control-custom"
                                            >

                                                <option value="">---SELECT---</option>
                                                {citylist?.map((val) => (
                                                <option value={JSON.stringify(val)} >{val.name}</option>
                                                 ))} 
                                            </Form.Control>
                                        </Form.Group>
                                    </div>
                                    <div className='col-md-6'>
                                        <Form.Group controlId="formName" className="p-0 m-0 mb-4 form-group">
                                            <Form.Label className="form-label">Pin No</Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="pinCode"
                                                placeholder='Pin number'
                                                value={formData?.pinCode}
                                                onChange={handleChange}
                                                className="form-control-custom"
                                            />
                                        </Form.Group>
                                    </div>
                                    <div className='col-md-6'>
                                        <Form.Group controlId="formGender" className="mb-4 form-group">
                                            <Form.Label className="form-label">ID proof</Form.Label>
                                            <Form.Control
                                                as="select"
                                                name="IdProofType"
                                                value={formData?.IdProofType}
                                                onChange={handleChange}
                                                className="form-control-custom"
                                            >
                                                <option value=''>---select---</option>
                                                <option value={'pan'}>PAN</option>
                                                <option value={'aadhar'}>AADHAR</option>
                                                <option value={'Passport'}>Passport</option>
                                                <option value={'Drivers_License'}>Driver’s License</option>
                                                <option value={"oth_valid_gov_id"}>Other Government ID</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </div>
                                    <div className='col-md-6'>
                                        <Form.Group controlId="formName" className="p-0 m-0 mb-4 form-group">
                                            <Form.Label className="form-label">ID No</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="IdNo"
                                                placeholder='ID number'
                                                value={formData?.IdNo}
                                                onChange={handleChange}
                                                className="form-control-custom"
                                            />
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <Button type='submit' variant="contained" color="primary">Update</Button>
                                </div>
                            </Form>
                        </TabPanel>

                        <TabPanel value={value} index={2} className="tab-panel">
                            <Form onSubmit={handleSubmit}>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <Form.Group controlId="formHighestQualification" className="mb-4 form-group">
                                            <Form.Label>Highest Qualification</Form.Label>
                                            <Form.Control
                                                className="form-control-custom"
                                                type="text"
                                                name="highestQualifucation"
                                                placeholder='Highest Qualification'
                                                value={formData.highestQualifucation}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </div>

                                    <div className='col-md-6'>
                                        <Form.Group controlId="formUniversityName" className="mb-4 form-group">
                                            <Form.Label>University/ Institute /College Name</Form.Label>
                                            <Form.Control
                                                className="form-control-custom"
                                                type="text"
                                                name="universityName"
                                                placeholder='University/Institute/College Name'
                                                value={formData.universityName}
                                                onChange={handleChange}

                                            />
                                        </Form.Group>
                                    </div>

                                </div>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <Form.Group controlId="formUploadCertificate" className="mb-4">
                                            <Form.Label>Upload Certificate</Form.Label>
                                            <Form.Control
                                                className="form-control-custom file-certificate"
                                                type="file"
                                                name="upload_certificate"
                                                onChange={handleChange}
                                            // style={{ width: '370px' }}
                                            />
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <Button type='submit' variant="contained" color="primary">Update</Button>
                                </div>
                            </Form>
                        </TabPanel>
                        
                        <TabPanel value={value} index={3} className="tab-panel">
                            <Form onSubmit={handleSubmit}>
                                <div className='row'>

                                    <div className='col-md-6'>
                                        <Form.Group controlId="formUniversityName" className="mb-4 form-group">
                                            <Form.Label>Total Experience(Years)</Form.Label>
                                            <Form.Control
                                                className="form-control-custom"
                                                type="text"
                                                name="yearofExp"
                                                placeholder='Years of Experience'
                                                value={formData.yearofExp}
                                                onChange={handleChange}

                                            />
                                        </Form.Group>
                                    </div>

                                    <div className='col-md-6'>
                                        <Form.Group controlId="formUniversityName" className="mb-4 form-group">
                                            <Form.Label>Organization </Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="Organization_name"
                                                value={formData.Organization_name}
                                                onChange={handleChange}
                                                placeholder='Organization name'

                                            />
                                        </Form.Group>
                                    </div>
                                </div>

                                <div className='col-md-6'>
                                    <Button type='submit' variant="contained" color="primary">Update</Button>
                                </div>
                            </Form>
                        </TabPanel>
                        <TabPanel value={value} index={4} className="tab-panel">
                        <div className='row'>

                            <div className='col-md-6'>
                                <Form.Group controlId="formUniversityName" className="mb-4 form-group">
                                    <Form.Label>Upload Resume</Form.Label>
                                    {/* <Form.Control
                                        className="form-control-custom"
                                        type="file"
                                        name="yearofExp"
                                        placeholder='Years of Experience'
                                        // value={formData.yearofExp}
                                        // onChange={handleChange}

                                    /> */}
                                    <div class="input-group ">
                                        <input type="file" name='content' class="form-control-file" id="exampleFormControlFile1"
                                        onChange={(e)=>setResume(e.target.files[0])}
                                        />
                                    </div>
                                    {/* <Box display="flex" alignItems="center" gap={2}>
                                        <input
                                            type="file"
                                            id="file-upload"
                                            style={{ display: 'none' }}
                                            onChange={handleFileChange}
                                        />
                                        <Button variant="contained" 
                                        onClick={handleUploadClick}
                                        >
                                            Upload File
                                        </Button>

                                        {selectedFile && (
                                            <TextField
                                            value={selectedFile.name}
                                            variant="outlined"
                                            disabled
                                            fullWidth
                                            />
                                        )}
                                    </Box> */}
                                </Form.Group>
                            </div>
                            <div className='col-md-6'>

                            </div>
                            <div className='col-md-6'>
                                    {/* <Button type='button' variant="contained" color="primary" onClick={uploadResume}>Update</Button> */}
                                    <Button variant="contained" onClick={uploadResume}>Upload</Button>
                            </div>
                        </div>
                            
                        </TabPanel>


                        <TabPanel value={value} index={5} className="tab-panel">
                           <AddPortfolioDetails/>
                        </TabPanel>
                         
                        <TabPanel value={value} index={6} className="tab-panel">
                            <StudentPortfolio/>
                        </TabPanel>
                        <TabPanel value={value} index={7} className="tab-panel">
                            {/* <Form onSubmit={handleSubmit}>
                                <div className='row'>

                                    <div className='col-md-6'>
                                        <Form.Group controlId="formUniversityName" className="mb-4 form-group">
                                            <Form.Label>Current password</Form.Label>
                                            <Form.Control
                                                className="form-control-custom"
                                                type="password"
                                                name="currentPassword"
                                                placeholder='Current password'
                                            // value={formData.yearofExp}
                                            // onChange={handleChange}

                                            />
                                        </Form.Group>
                                    </div>

                                    <div className='col-md-6'>
                                        <Form.Group controlId="formUniversityName" className="mb-4 form-group">
                                            <Form.Label>New Password</Form.Label>
                                            <Form.Control
                                                className="form-control-custom"
                                                type="password"
                                                name="mewPassword"
                                                placeholder='New Password'
                                            // value={formData.yearofExp}
                                            // onChange={handleChange}

                                            />
                                        </Form.Group>
                                    </div>

                                </div>
                                <div className="row">

                                    <div className='col-md-6'>
                                        <Form.Group controlId="formUniversityName" className="mb-4 form-group">
                                            <Form.Label>Confirm Password</Form.Label>
                                            <Form.Control
                                                className="form-control-custom"
                                                type="password"
                                                name="mewPassword"
                                                placeholder='Confirm Password'
                                            // value={formData.yearofExp}
                                            // onChange={handleChange}

                                            />
                                        </Form.Group>
                                    </div>
                                </div>

                                <div className='col-md-6'>
                                    <Button type='submit' variant="contained" color="primary">Update</Button>
                                </div>
                            </Form> */}
                            <Student_change_password/>
                        </TabPanel>
                    </Box>
                    <ToastContainer />
                </div>
            </div>
        </div>
    );
}

export default Student_Update_Profile;
