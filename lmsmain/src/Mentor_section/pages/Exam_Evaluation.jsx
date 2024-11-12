import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import axios from 'axios';
import { api } from '../../ApiUrl/ApiUrl';
import { IoMdDownload } from "react-icons/io";
import { ToastContainer, toast } from 'react-toastify';
import { CiSearch } from "react-icons/ci";


const Exam_Evaluation = () => {
    const [allStudentDetails, setAllStudentDetails] = useState();
    const [mail, setMail] = useState();
    const [marks, setMarks] = useState({}); 

      // For the search 
      const [searchres, setSearchres] = useState([]);
      const [searchquery, setSearchquery] = useState('');

    useEffect(() => {
        setMail(localStorage.getItem('mentorEmail'))
    }, [])


    const getAllData = () => {
        axios.post(`${api}/mentor/getStudentSubmittedAnswers`, { email: mail })
            .then((Response) => {
                console.log("submitted data",Response?.data?.data);
                setAllStudentDetails(Response?.data?.data)
                setSearchres(Response?.data?.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        if (mail) {
            getAllData()
        }
    }, [mail])

    const downloadSample = async (uploadFileDes) => {
        try {
            // Fetch the file from the server using Axios
            const response = await axios({
                url: `${api}/student/download/${uploadFileDes}`, // Make sure this URL is correct
                method: 'GET',
                responseType: 'blob', // Important: to handle binary data
            });
    
            // Create a URL for the downloaded file
            const blob = new Blob([response.data], { type: response.headers['content-type'] });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.setAttribute('download', uploadFileDes); // Set the file name
            document.body.appendChild(link);
            link.click(); // Simulate a click on the link
            document.body.removeChild(link); // Remove the link after the download
        } catch (error) {
            console.error('Error downloading the file:', error);
        }
    };


    

    const downloadAnswer = async (uploadFileDes)=>{
        try {
            // Fetch the file from the server using Axios
            const response = await axios({
                url: `${api}/student/studentdownload/${uploadFileDes}`, // Make sure this URL is correct
                method: 'GET',
                responseType: 'blob', // Important: to handle binary data
            });
    
            // Create a URL for the downloaded file
            const blob = new Blob([response.data], { type: response.headers['content-type'] });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.setAttribute('download', uploadFileDes); // Set the file name
            document.body.appendChild(link);
            link.click(); // Simulate a click on the link
            document.body.removeChild(link); // Remove the link after the download
        } catch (error) {
            console.error('Error downloading the file:', error);
        }

    }

    
    const changeMarks = (e, index) => {
        const updatedMarks = { ...marks, [index]: e.target.value }; // Track marks by index
        setMarks(updatedMarks);
    }

    const addMarks = (index,email,testName,passingMarks) => {
        const studentMarks = marks[index]; // Get marks for the student at the given index
        const all = {studentMarks:studentMarks,email :email, testName:testName,passingMarks:passingMarks}
        console.log(all)
        axios.post(`${api}/mentor/updateMarks`,all)
        .then((Response)=>{
            console.log(Response?.data?.status)
            if(Response?.data?.status){
                toast.success("Marks updated successfully!", {
                    position: "top-center",
                    style: { fontWeight: 'bold' },
                });
            }
            
        })
        .catch((error)=>{
            console.log(error);
        })
        // Send marks to the server here using axios or any other logic.
    }



    // input change for search

    const inputChange = (e) => {
        const query = e.target.value;
        setSearchquery(query);
    
        if (query === '') {
            getAllData();
        } else {
            console.log(searchres)
            const filterData = searchres.filter((f) => {
                return (
                    (f.testName && f.testName.toLowerCase().includes(query.toLowerCase())
                    // f.studentAnswers
                )
                );
            });
            setAllStudentDetails(filterData);
        }
    };
    


    return (
        <div style={{ marginTop: "58px" }}>
            <div className="row">
                <div className="container-fluid">
                    <div className='col-md-12 col-lg-12 headLineBox d-flex justify-content-start'>
                        <h4>Test Evaluation</h4>
                    </div>

                    <div className="row mt-4">
                        <div className="col-md-6">
                            <div className="d-flex align-items-center">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search by Test Name"
                                    value={searchquery}
                                    onChange={inputChange}
                                />
                                <CiSearch className="search-btn" />
                            </div>
                        </div>
                       
                    </div>

                    <div className="col-md-12 col-lg-12 col-sm-12">
                        <div className="table-container" style={{ height: '90vh', overflowY: 'auto' }}>
                            <table className="table table-bordered pt-1">
                                <thead style={{ position: 'sticky', top: -2, zIndex: 3 }}>
                                    <tr>
                                        <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Student Name</th>
                                        <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Test Name</th>
                                        <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Batch Name</th>
                                        {/* <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Start Date</th>
                                    <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>End Date</th>
                                    <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Start Time</th>
                                    <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>End Time</th> */}
                                        <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Uploaded question</th>
                                        <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Uploaded answer</th>
                                        <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Total Marks</th>
                                        <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Passing Marks</th>
                                        <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Status</th>
                                        <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Marks</th>
                                        <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Actions</th>

                                    </tr>
                                </thead>

                                <tbody style={{ zIndex: 1 }}>
                                    {allStudentDetails && allStudentDetails.map((allStudentDetail,index) => {
                                        // Parse the batchName array and extract the first batch object
                                        const batch = allStudentDetail?.batchName ? JSON.parse(allStudentDetail?.batchName)[0]?.batchName : 'N/A';

                                        console.log("Batch Name:", batch);

                                        // Check if any of the studentAnswers has a PDF type
                                        const typeCheck = allStudentDetail?.studentAnswers?.some((std) => std.type === 'pdf');

                                        return (
                                            typeCheck ? (
                                                allStudentDetail.studentAnswers.map((std,stdIndex) => (
                                                    <tr key={std?.id}>
                                                        <td>{std?.name}</td>
                                                        <td>{allStudentDetail?.testName}</td>
                                                        <td>{batch}</td> {/* Display the parsed batchName */}
                                                        <td><div>
                                                            <Button onClick={() => downloadSample(allStudentDetail?.uploadFileDes)} variant="text">Download<IoMdDownload size={25} /></Button>
                                                        </div></td>
                                                        <td><div>
                                                            <Button onClick={() => downloadAnswer(std?.answers)} variant="text">Download<IoMdDownload size={25} /></Button>
                                                        </div></td>
                                                        <td>{allStudentDetail?.totalMarks}</td>
                                                        <td>{allStudentDetail?.passingMarks}</td>
                                                        <td>{std?.status}</td>
                                                        <td>
                                                            <input 
                                                                placeholder='ex: 10'
                                                                style={{ width: "80px" }}
                                                                type="number"
                                                                onChange={(e) => changeMarks(e, `${index}-${stdIndex}`)} 
                                                                value={marks[`${index}-${stdIndex}`] !== undefined ? marks[`${index}-${stdIndex}`] : std?.marksObtained || ''} 
                                                            />
                                                        </td>
                                                        <td><Button onClick={() => addMarks(`${index}-${stdIndex}`,std?.email,allStudentDetail?.testName,allStudentDetail?.passingMarks)} variant="contained">ADD MARKS</Button></td>
                                                    </tr>
                                                ))
                                            ) : null
                                        );
                                    })}
                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Exam_Evaluation