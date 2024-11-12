import certificate from '../../assets/img/Student_Certificate/Certificate.png';
import FormControl from '@mui/material/FormControl';
// import '../../src/assets/css/Custom_Global_Style/Global.css'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { api2 } from '../../ApiUrl/ApiUrl';
import axios from 'axios';

export default function  Certification(){
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
    const [qualification, setQualification] =useState([]);
    
    const Qualifucation_list = [
        'High School Details',
        'Graduation Details',
        'Associate’s Details',
        'Bachelor’s Details',
        'Master’s Details',
        'Doctorate Details',
        'Others'
    ];
    const handleChangeForQualification = (event) => {
        const {
            target: { value },
        } = event;
        setQualification(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    const [formData, setFormData] =useState ({})
    const [BasicInfoState,setBasicInfoState]=useState(true);
    const [EduInfoState,setEduInfoState]=useState(false);
    const [ExpInfoState,setExpInfoState]=useState(false);
    const [otherInfoState,setOtherInfoState]=useState(false);
    const [resumeDetails,setResumeDetails]=useState({});

    const handleResumeDetails = (e) => {
        const { name, value, type, files } = e.target;
        console.log(e.target.files)
        setResumeDetails({
            ...resumeDetails,
            [name]: type === 'file' ? files[0] : value
        });
    };

    const [Cirtificate,setCirtificate]=useState('');
    const handleCreateCircificate = () => {
        
        axios.post(`${api2}/cert/generateCertificate`, {studentEmail:localStorage.getItem('studentEmail')})
        // axios.post(`${api2}/mentor/xyz`, data,{})

            .then((Response) => {
                console.log(" data : ", Response.data);
                setCirtificate(Response.data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    useEffect(()=>{
        handleCreateCircificate()
    },[])
    // const viewDoc = (foldername) => {
    //     // window.open(`${api2}/` + foldername)
    //     const link = document.createElement('a');
    //     link.href = `${api2}/` + foldername;
    //     link.download = 'downloaded-image.jpg'; // Set the downloaded file name
    //     link.click();
    //   }
    // const viewDoc = (foldername) => {
    //     const link = document.createElement('a');
        
    //     // Set the URL to the file you want to download
    //     link.href = `${api2}/${foldername}`;
        
    //     // Optional: Extract the filename dynamically if available from the foldername or API response
    //     const fileName = foldername.split('/').pop(); // Extract the actual filename from the foldername string
        
    //     // Set the downloaded file name (fallback to a default if needed)
    //     link.download = fileName || 'downloaded-file';
      
    //     // Append the anchor to the body (required for Firefox)
    //     document.body.appendChild(link);
        
    //     // Programmatically click the link to trigger the download
    //     link.click();
        
    //     // Remove the anchor from the DOM after download
    //     document.body.removeChild(link);
    //   };

      const viewDoc = async (uploadFileDes) => {
        try {
            // Fetch the file from the server using Axios
            const response = await axios({
                url: `${api2}${uploadFileDes}`, // Make sure this URL is correct
                method: 'GET',
                responseType: 'blob', // Important: to handle binary data
            });
    
            // Create a URL for the downloaded file
            const blob = new Blob([response.data], { type: response.headers['content-type'] });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.setAttribute('download', 'Certificate'); // Set the file name
            document.body.appendChild(link);
            link.click(); // Simulate a click on the link
            document.body.removeChild(link); // Remove the link after the download
        } catch (error) {
            console.error('Error downloading the file:', error);
        }
    }

    return(
        <>
       <div className='row ' style={{height:"93vh" ,marginTop: '58px', backgroundColor: "#f2edf3" }} >
                <div className='row '>
                    <div className='container-fluid'>
                        <div className=' col-md-12 col-lg-12 col-sm-12 headLineBox d-flex justify-content-start'  >
                            <h4>Certificatation</h4>
                        </div>
                    </div>
                </div>
                <div className="row" style={{ marginTop: '20px' }}>
                    <div className="row">
                        <div className="col-md-12">
                            <div className='row'>
                                {
                                    Cirtificate.success==true ? 
                                    <>{console.log(Cirtificate.path)}
                                    <div className='col-md-12 d-flex justify-content-center'>
                                    <img src={`${api2}${Cirtificate.path}`} class="img-rounded" alt="Not available" width="650" height="500"/>
                                    </div>
                                    <div className='col-md-12 mt-2 d-flex justify-content-center' >
                                        <Stack spacing={2} direction="row" >
                                            <Button variant="contained" onClick={(()=>{viewDoc(Cirtificate.path)})} >
                                                Download
                                            </Button>
                                            {/* <Button variant="contained"  >
                                                Upload to linkdin
                                            </Button> */}
                                        </Stack> 
                                    </div>
                                    </>:
                                    <>
                                    <div className='col-md-12 d-flex justify-content-center'>
                                    <img src={certificate} class="img-rounded" alt="Not available" width="650" height="500"/>
                                    </div>
                                    <div className='col-md-12 mt-2 d-flex justify-content-center' >
                                        {/* <Stack spacing={2} direction="row" >
                                            <Button variant="contained" >
                                                Download
                                            </Button>
                                            <Button variant="contained"  >
                                                Upload to linkdin
                                            </Button>
                                        </Stack>  */}
                                        Your certificate has not prepared yet as your course is ongoing. This is a demo Certificate
                                    </div>
                                    </>
                                }
                                {/* <div className='col-md-12 d-flex justify-content-center'>
                                    <img src={certificate} class="img-rounded" alt="Not available" width="650" height="500"/>
                                </div>
                                <div className='col-md-12 mt-2 d-flex justify-content-center' >
                                    <Stack spacing={2} direction="row" >
                                        <Button variant="contained" >
                                            Download
                                        </Button>
                                        <Button variant="contained"  >
                                            Upload to linkdin
                                        </Button>
                                    </Stack> 
                                </div> */}
                        
                        
                            </div>
                        </div>
                        
                    </div>

                </div>
        </div>
        </>
    )

}