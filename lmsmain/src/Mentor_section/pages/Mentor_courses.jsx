import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react'
import Button from '@mui/material/Button';
import { api2 } from '../../ApiUrl/ApiUrl'
import { FaEdit } from "react-icons/fa";
import { RiUpload2Fill } from "react-icons/ri";
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import "../../assets/css/Mentor/Mentor_overview.css"

const Mentor_courses = () => {
    const [userType, setUserType] = useState('');
    const [mail, setMail] = useState();
    const [addFile, setAddFile] = useState();
    const [id, setId] = useState();
    const [modalCoursename,setModalCoursename] = useState();

    const [show, setShow] = useState(false);
    const [modalData,setModalData] = useState()
    const [modaldescription,setModaldescription] = useState()

    const handleClose = () => setShow(false);
    const handleShow = () =>{
        setShow(true);
    } 


  


    // for the form edit
    const [formData, setFormData] = useState({
        batchName: "",
        courseName: "",
        CourseMaterial: null
    })

    // for the form new entry
    const [formDataNewadd, setFormDataNewadd] = useState({
        batchName: "",
        courseName: "",
        // mail :mail,
        CourseMaterial: null
    })

    useEffect(() => {
        setFormDataNewadd((prevData) => ({
            ...prevData,
            mail: mail,
        }));
    }, [mail]);



    //   const handleCourseMaterial = (e) => {
    //     const data = new FormData();
    //     data.append('email', formData.emailId);
    //     data.append('fileType', 'photo');
    //     data.append('file', formData.profile_photo);

    //     axios.post("http://192.168.1.14:5000/reg/uploadDocument", data, {})
    //         .then((Response) => {
    //             console.log(Response.data);
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });
    // };

    useEffect(() => {
        // handleCourseMaterial()

    }, [formData.CourseMaterial, formDataNewadd.CourseMaterial])




    useEffect(() => {
        const type = localStorage.getItem('userType');
        setUserType(type);
        setMail(localStorage.getItem('mentorEmail'))
        const storedId = localStorage.getItem('id');
    if (storedId) {
      const intId = parseInt(storedId, 10);
      setId(intId);
    }
    }, []);




    const [courseslist, setCourseslist] = useState();
    // const [id, setId] = useState()
    // useEffect(() => {
    //     setId(localStorage.getItem('id'))
    //     console.log(localStorage.getItem('id'))
    // }, [])

    useEffect(() => {
        if (id) {
            // axios.post(`${api2}/mentor/mentorWiseCourse`, { id })
            axios.post(`${api2}/mentor/getCoursesForMentor`,{id : id})
                .then((Response) => {
                    console.log("data", Response.data.result);
                    setCourseslist(Response.data.result)
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }, [id])

   

    if (userType !== 'Mentor') {
        return (<>
            <p>This page doesn't exist!</p>
        </>);
    }

    const viewDoc = (foldername) => {
        // const supportedExtensions = ['xls', 'xlsx'];
        // const fileExtension = foldername.split('.').pop().toLowerCase();

        // if (supportedExtensions.includes(fileExtension)) {
            window.open(`${api2}/static/courseDetails/${foldername}`);
        // } else {
            // alert("File unsupported !");
            // console.log('Unsupported file type');
        // }
    };


    // // for file upload
    // const fileInputRef = useRef(null);

    // const handleFileUploadClick = () => {
    //     fileInputRef.current.click();
    // };

    // const handleFileChange = (event) => {
    //     const file = event.target.files[0];
    //     if (file) {
    //         console.log('File selected:', file);
    //         setFileName(file.name);
    //         handleFile(file);  // Send the file to the backend
    //     }
    // };

    // const handleFile = (file) => {
    //     const data = new FormData();
    //     data.append('courseName', modalData); 
    //     data.append('fileType', 'file');
    //     data.append('file', file);

    //     axios.post(`${api2}/mentor/courseMentorDocumentUpload`, data, {})
    //         .then((response) => {
    //             console.log(response.data);
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });
    // };


    return (
        <div style={{ marginTop: "58px" }}>
            <div className='row'>
                <div className='container-fluid'>
                    <div className='col-md-12 col-lg-12 headLineBox d-flex justify-content-start'>
                        <h4>Courses</h4>
                    </div>

                    <div className='container-fluid pr-2 pl-2' style={{ minHeight: '80vh', marginTop: "10px" }}>

                        <div className='row'>
                            <div className='col-md-12 col-lg-12 scroll' style={{ paddingRight: '0px', paddingLeft: '0px' }}>
                                <table className="table table-bordered">
                                    <thead style={{ textAlign: "center",zIndex:'3',position:"sticky",top:"0px" }}>
                                        <tr>
                                            <th>No.</th>
                                            {/* <th>Batch Name</th> */}
                                            <th>Course Name</th>
                                            <th>Status</th>
                                            <th>Course Materials</th>
                                            {/* <th></th> */}
                                        </tr>
                                    </thead>
                                    <tbody style={{ textAlign: "center",zIndex:'1' }}>
                                        {courseslist?.length > 0 && courseslist?.map((val, index) => {
                                            return (
                                                <tr key={index} >
                                                    <td style={{ fontSize: '14px' }}>{index + 1}</td>
                                                    {/* <td style={{ fontSize: '14px' }}>{val?.batchName}</td> */}
                                                    <td style={{ fontSize: '14px' }}>{val?.courseName}</td>
                                                    <td style={{ fontSize: '14px' }}>{val?.courseActiveFlag === 1 ? "Active" : "Deactive"}</td>
                                                    {/* <td><div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "5px" }}><div><FaEdit onClick={()=>{handleShow()
                                                        setModalData(val?.courseName)
                                                        setModaldescription(val?.description)
                                                    } }   style={{ cursor: "pointer" }} /></div></div></td> */}
                                                    <td style={{ width: '20%', whiteSpace: 'nowrap' }}><Button onClick={()=>{handleShow()
                                                        setModalData(val?.folderName)
                                                        // setModaldescription(val?.description)
                                                        setModalCoursename(val?.courseName)
                                                    } } variant="outlined">View</Button></td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* modal for the edit */}
                    <div>
                        <Modal show={show} onHide={handleClose} size="lg">
                            <Modal.Header >
                                <div className='col-md-12 col-lg-12 headLineBox d-flex justify-content-between'>
                                <h4>Course Materials</h4>
                                </div>
                            </Modal.Header>
                            <Modal.Body>
                                <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                                    <h5 style={{textAlign:"center",padding:"10px"}} >Course Name : {modalCoursename}</h5>
                                    <hr />
                                    {/* <p className='col-md-6'>Batch Name :</p> */}
                                </div>

                                {/* <Form>
                                    <div className='row'>
                                        <div className='col-md-3 p-2'>
                                            Course Description :
                                        </div>
                                        <div className='col-md-9 p-2'>
                                            <div class="input-group ">
                                                <textarea class="form-control" rows="5" id="comment" name='modaldescription' value={modaldescription} ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <Button variant="contained" onClick={handleSaveEdit} style={{ marginRight: "10px" }}>
                                    Update course description
                                </Button> 
                                </Form> */}

                                {/* <div className="row">
                                        <div className='col-md-6'>
                                            <Form.Group controlId="formUploadCertificate" className="mb-4">
                                                <Form.Label>Upload Course material</Form.Label>
                                                <Form.Control
                                                    className="form-control-custom file-certificate"
                                                    type="file"
                                                    name="CourseMaterial"
                                                    id="fileInput"
                                                    onChange={handleChange}
                                                // style={{ width: '370px' }}
                                                />
                                            </Form.Group>
                                        </div>
                                    </div> */}
                                {/* <div className='row'>
                                    <div className='col-md-12 col-lg-12 headLineBox d-flex justify-content-between'>
                                        <h4>Course Materials</h4>
                                        
                                        /* <div style={{display:"flex",gap:"2px"}}>
                                        {fileName && (
                                        <div className=''>
                                            <p>File selected: {fileName}</p>
                                        </div>
                                    )}   
                                        <Button variant="contained" color="primary" onClick={handleFileUploadClick}>
                                            Add file +
                                        </Button> 
                                        </div> 
                                        
                                    </div>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        style={{ display: 'none' }}
                                        onChange={handleFileChange}
                                    />
                                    
                                </div> */}
                                <div className='row'>
                                    <div className='col-md-12 col-lg-12 scroll' style={{ paddingRight: '0px', paddingLeft: '0px', maxHeight: '400px', overflowY: 'auto' }}>
                                        <table className="table table-bordered">
                                            <thead style={{ textAlign: "center",position:"sticky",top:"0px",zIndex:'3' }}>
                                                <tr>
                                                    {/* <th>No.</th> */}
                                                    {/* <th>Batch Name</th> */}
                                                    <th>Course content</th>
                                                    <th style={{}}>Course Material</th>
                                                    {/* <th></th> */}
                                                </tr>
                                            </thead>
                                            <tbody style={{ zIndex: '1' }} >
                                                {console.log("modal data",modalData)}
                                                {modalData?.length > 0 && modalData?.map((val, index) => {
                                                    return (
                                                        <tr key={index + 1} >
                                                            {/* <td style={{ fontSize: '14px' }}>{index}</td> */}
                                                            {/* <td style={{ fontSize: '14px' }}>{val?.batchName}</td> */}
                                                            <td style={{ fontSize: '14px'}}>{val?.file}</td>
                                                            <td onClick={()=>viewDoc(val?.path)} style={{ width: '20%', whiteSpace: 'nowrap' }}><Button variant="outlined">View</Button></td>

                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>


                            </Modal.Body>
                            <Modal.Footer>

                                {/* <Button variant="contained" onClick={handleSaveEdit} style={{ marginRight: "10px" }}>
                                    Update
                                </Button> */}
                                <Button variant="contained" onClick={handleClose} style={{ backgroundColor: 'red', color: 'white' }}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Mentor_courses