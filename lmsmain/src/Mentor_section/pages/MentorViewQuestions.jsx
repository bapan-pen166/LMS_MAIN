import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { api } from '../../ApiUrl/ApiUrl';
import { IoMdDownload } from "react-icons/io";
import Button from '@mui/material/Button';

const MentorViewQuestions = () => {
    const [questions,setQuestions] = useState();
    const [forPDF,setForPDF] = useState();
    const { id } = useParams();
    const [email,setEmail] = useState();


    useEffect(()=>{
         setEmail(localStorage.getItem('mentorEmail'))
    },[])

    const getQuestions =()=>{
          axios.post(`${api}/mentor/getQuestionById`,{id:id,email:email})
          .then((response)=>{
            if (response?.data?.tests[0].questionType == "pdf") {
                setForPDF(response?.data?.tests[0]?.uploadFileDes);
                console.log(response?.data?.tests[0]?.uploadFileDes)
            }
               console.log(JSON.parse(response?.data?.tests[0].updQesAndMarks));
            //    console.log("batchNAme",JSON.parse(response?.data?.tests[0].batchName));
               setQuestions(JSON.parse(response?.data?.tests[0].updQesAndMarks))
          })
          .catch((error)=>{
             console.log(error); 
          })
    }

    
    useEffect(()=>{
        if(email){

            getQuestions();
        }
     },[email])


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



    return (
        <div style={{ marginTop: "58px" }}>
            <div className="row">
                <div className="container-fluid">
                    <div className='col-md-12 col-lg-12 headLineBox d-flex justify-content-start'>
                        <h4>View Questions</h4>
                    </div>
                    {forPDF ? <div style={{display:"flex", justifyContent:"center",alignItems:"center",marginTop:"20px"}}>
                        <Button onClick={() => downloadSample(forPDF)} variant="text">Download uploaded question pdf<IoMdDownload size={25} /></Button>
                    </div> : 
                    
                    
                    
                      <div style={{width:"95%",margin:"auto",marginTop:"10px"}}>
                        {questions && questions?.map((questions,index)=>{
                            return (
                                <>
                                   <div style={{display:"flex",justifyContent:"space-between"}}>
                                       <p>Q. {index+1} <span style={{marginRight:"10px"}}></span> {questions?.questionText}</p> 
                                        <p>{questions?.marks}</p>
                                   </div>
                                   <div style={{display:"flex",flexDirection:"column",paddingLeft:"40px"}}>
                                       {questions.options.map((option)=>{
                                          return(
                                            <>
                                               <p>{option?.text}</p>
                                               <p></p>
                                            </>
                                          )
                                       })}
                                   </div>
                                   
                                </>
                            )
                        })}
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default MentorViewQuestions