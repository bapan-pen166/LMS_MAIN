import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import "../assets/css/Mentor/Update_profile.css";
import Button from '@mui/material/Button';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import { FaCamera } from 'react-icons/fa';
import profile_photo from "../assets/img/profile_photo/profile_photo.png"

const UpdateProfile = () => {
    // const [uploadid, setuploadid] = useState('');
    const [profileImagePreview, setProfileImagePreview] = useState(null);
    const [mentorID, setMentorID] = useState()

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
        profile_photo: null,
        panNo: '',
        upload_certificate: null,
        instructor_id: '',
        phoneNumber: ''
    });

    useEffect(() => {
        setMentorID(localStorage.getItem('id'))
        // console.log(localStorage.getItem('id'))
    }, [])

    useEffect(() => {
        if (mentorID) {
            axios.post('http://192.168.1.12:5000/mentor/getMentorBasicList', { mentorID })
                .then(response => {
                    setFormData(response.data.result[0])
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [mentorID]);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;

        if (type === 'file') {
            const file = files[0];
            setFormData({
                ...formData,
                [name]: file
            });


            if (name === 'profile_photo') {
                const previewUrl = URL.createObjectURL(file);
                setProfileImagePreview(previewUrl);
            }
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };




    useEffect(() => {
        if (formData.profile_photo) {
            handlePhoto();
        }
    }, [formData.profile_photo]);

    useEffect(() => {
        if (formData.upload_certificate) {
            handleId();
        }
    }, [formData.upload_certificate]);


    const handlePhoto = (e) => {
        const data = new FormData();
        data.append('email', formData.emailId);   // sending email id 
        data.append('fileType', 'photo');   // File name
        data.append('file', formData.profile_photo);  // this is actual file

        console.log(data);
        axios.post("http://192.168.1.12:5000/reg/uploadDocument", data, {})
            .then((Response) => {
                console.log(Response.data);


            }).catch(error => {
                console.log(error);
            });
    }

    const handleId = (e) => {
        const data = new FormData();
        data.append('email', formData.emailId);
        data.append('fileType', 'certificate');
        data.append('file', formData.upload_certificate);

        console.log(data);
        axios.post("http://192.168.1.12:5000/reg/uploadDocument", data, {})
            .then((Response) => {
                console.log(Response.data);


            }).catch(error => {
                console.log(error);
            });
    }




    const [errors, setErrors] = useState({});

    const validationSchema = Yup.object({
        emailId: Yup.string()
            .required("Email id is required")
            .email("Invalid email format"),
        universityName: Yup.string()
            .required("University/Institute/College Name is required"),

        Dob: Yup.date().required("Date of birth is required")
    })



    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await validationSchema.validate(formData, { abortEarly: false });

            axios.post(`http://192.168.1.12:5000/mentor/editMentorBasicInfo`, formData)
                .then((response) => {
                    console.log(response.data);
                    toast.success("Updated Successfully!", {
                        position: "top-center",
                    });
                    setErrors({});
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        } catch (error) {
            console.log(error.inner);

            const newErrors = {};
            error.inner.forEach(element => {
                newErrors[element.path] = element.message;
            });
            setErrors(newErrors);
        }
    };





    return (
        <div style={{ marginTop: "58px" }}>
            <div className='row'>
                <div className='container-fluid'>
                    <div className='col-md-12 col-lg-12 headLineBox d-flex justify-content-start'>
                        <h4>Profile details</h4>
                    </div>
                    <div className='main-form-profile'>
                        <Form onSubmit={handleSubmit}>
                            <div style={{marginBottom:"15px"}}>
                        {profileImagePreview && (
                                <div className="image-preview" style={{ width: "200px", marginBottom: "5px",border:"1px solid black",borderRadius:"10px" }}>
                                    <img src={profileImagePreview} alt="Profile Preview" style={{ width: '200px', marginTop: '10px',borderRadius:"10px" }} />
                                </div>
                            ) || <div style={{border:"1px solid black", width: "200px",borderRadius:"10px"}}><img style={{width:"200px",borderRadius:"10px"}} src={profile_photo} alt="profile_photo" /></div>}
                            <Form.Group >
                                <input
                                    type="file"
                                    name="profile_photo"
                                    onChange={handleChange}
                                    id="fileInput"
                                    style={{marginTop:"5px"}}
                                />
                                {/* <label htmlFor="fileInput" className="camera-icon-label">
                                    <FaCamera className="camera-icon" />
                                </label> */}
                            </Form.Group>
                            </div>

                            <Form.Group controlId="formName" className="mb-4">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    placeholder='Name'
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <div>
                                <Form.Group controlId="formGender" className="mb-4">
                                    <Form.Label>Gender</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="Gender"
                                        value={formData.Gender}
                                        onChange={handleChange}
                                    >
                                        <option value="">SELECT</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </Form.Control>
                                </Form.Group>
                            </div>

                            <div>
                                <Form.Group controlId="formDob" className="mb-4">
                                    <Form.Label>Date Of Birth</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="Dob"
                                        value={formData.Dob}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                {errors.Dob && <div className="error">{errors.Dob}</div>}
                            </div>


                            <Form.Group controlId="formHighQuali" className="mb-4">
                                <Form.Label>Highest Qualification</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="highestQualifucation"
                                    value={formData.highestQualifucation}
                                    onChange={handleChange}
                                >
                                    <option value="">SELECT</option>
                                    <option value="civil_engineering">Civil Engineering / BE Civil</option>
                                    <option value="B_Architecture">B.Architecture</option>
                                    <option value="B_Mechanical-Engineering">B.Mechanical Engineering</option>
                                    <option value="B_Electrical-Engineering">B.Electrical Engineering</option>
                                    <option value="B_Tech">B.Tech / Any Other Stream</option>
                                    <option value="Diploma_in_civil">Diploma in Civil/Architect</option>
                                    <option value="M_Architecture">M.Architecture</option>
                                    <option value="M_Mechanical-Engineering">M. Mechanical Engineering</option>
                                    <option value="M_Electrical-Engineering">M Electrical Engineering</option>
                                    <option value="M_Tech">M.tech/Any Other Stream</option>
                                    <option value="M_Civil-Engineering">M.Civil Engineering</option>
                                </Form.Control>
                            </Form.Group>


                            <div>
                                <Form.Group controlId="formCollegeName" className="mb-4">
                                    <Form.Label>University/Institute/College Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="universityName"
                                        value={formData.universityName}
                                        onChange={handleChange}
                                        placeholder='University/Institute/College Name'
                                    />
                                </Form.Group>
                                {errors.universityName && <div className="error">{errors.universityName}</div>}
                            </div>


                            <Form.Group controlId="formTotalExp" className="mb-4">
                                <Form.Label>Total Experience (In Years)</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="yearofExp"
                                    value={formData.yearofExp}
                                    onChange={handleChange}
                                    placeholder='Total Experience (In Years)'
                                />
                            </Form.Group>

                            <div>
                                <Form.Group controlId="formMailId" className="mb-4">
                                    <Form.Label>Email ID</Form.Label>
                                    <Form.Control
                                        type="mail"
                                        name="emailId"
                                        value={formData.emailId}
                                        onChange={handleChange}
                                        placeholder='Email ID'
                                    />
                                </Form.Group>
                                {errors.emailId && <div className="error">{errors.emailId}</div>}
                            </div>


                            <Form.Group controlId="formLinkedIn" className="mb-4">
                                <Form.Label>LinkedIn Profile Link</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="linkedinLink"
                                    value={formData.linkedinLink}
                                    onChange={handleChange}
                                    placeholder='Linked In Profile Link.'
                                />
                            </Form.Group>

                            <Form.Group controlId="formCountry" className="mb-4">
                                <Form.Label>Country</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    placeholder='Country'
                                />
                            </Form.Group>

                            <Form.Group controlId="formPanNo" className="mb-4">
                                <Form.Label>Pan Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="panNo"
                                    value={formData.panNo}
                                    onChange={handleChange}
                                    placeholder='Pan Number'
                                />
                            </Form.Group>

                            <Form.Group controlId="formPanNo" className="mb-4">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    placeholder='Phone Number'
                                />
                            </Form.Group>

                            {/* <Form.Group controlId="formProfilePhoto" className="mb-4">
                                <Form.Label>Upload Profile Photo</Form.Label>
                                <Form.Control
                                    type="file"
                                    name="profile_photo"
                                    onChange={handleChange}
                                />
                                {profileImagePreview && (
                                    <div className="image-preview">
                                        <img src={profileImagePreview} alt="Profile Preview" style={{ width: '150px', marginTop: '10px' }} />
                                    </div>
                                )}
                            </Form.Group> */}

                            <Form.Group controlId="formUploadCertificate" className="mb-4">
                                <Form.Label>Upload University/College Certificate</Form.Label>
                                <Form.Control
                                    type="file"
                                    name="upload_certificate"
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group controlId="formRollNo" className="mb-4">
                                <Form.Label>Instructor Id</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="instructor_id"
                                    value={formData.instructor_id}
                                    onChange={handleChange}
                                    placeholder='instructor Id'
                                />
                            </Form.Group>

                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <Button style={{ width: "50%", textAlign: "center" }} type="submit" variant="contained">Update</Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default UpdateProfile;
