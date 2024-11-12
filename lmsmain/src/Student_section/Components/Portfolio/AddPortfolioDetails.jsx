import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import { api } from '../../../ApiUrl/ApiUrl';

const AddPortfolioDetails = () => {
   const [studentEmail,setStudentEmail] = useState();
   const [id,setId] = useState();
   const [firstName,setFirstName] = useState();
   const [lastName,setLastName] = useState();


   useEffect(()=>{
    setStudentEmail(localStorage.getItem('studentEmail'))
    setFirstName(localStorage.getItem('firstName'))
    setLastName(localStorage.getItem('lastName'))
    setId(localStorage.getItem('id'))
   },[])
  

    const [addProfileDetails,setAddProfileDetails] = useState({
          aboutMe:"",
          portfolioImage:''
    })

    const handleChange = (e)=>{
        const { name, value, type, files } = e.target;

        if (type === 'file' && files.length > 0) {
            setAddProfileDetails(prevState => ({
                ...prevState,
                portfolioImage: files[0] 
            }));
        } else if (type === 'textarea' || name === 'aboutMe') {
            setAddProfileDetails(prevState => ({
                ...prevState,
                aboutMe: value
            }));
        }
    } 

    const handleSubmit = (e)=>{
        e.preventDefault();
         const data = new FormData()
         data.append('studentEmail',studentEmail)
         data.append('firstName',firstName)
         data.append('lastName',lastName)
         data.append('id',id)
         data.append('file', 'photo');
         data.append('aboutMe',addProfileDetails?.aboutMe)
        data.append('file', addProfileDetails.portfolioImage);



        axios.post(`${api}/portfolio/insertAboutMe`, data)
            .then((response) => {
              console.log(response);
            //   setData(response?.data?.result);
            })
            .catch((error) => {
              console.error(error);
            });
        console.log(data);
    }

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <div className='row'>
                    <div className='col-md-6'>
                        <Form.Group controlId="formName" className="p-0 m-0 mb-4 form-group">
                            <Form.Label className="form-label">About me</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="aboutMe"
                                placeholder='Give details about you'
                                rows={4}
                                value={addProfileDetails?.aboutMe}
                                onChange={handleChange}
                                className="form-control-custom"
                            />
                        </Form.Group>
                    </div>
                    <div className='col-md-6'>
                        <Form.Group controlId="formGender" className="mb-4 form-group">
                            <Form.Label className="form-label">Upload portfolio image</Form.Label>
                            <Form.Control
                                type='file'
                                name="portfolioImage"
                                // value={addProfileDetails?.portfolioImage}
                                onChange={handleChange}
                                className="form-control-custom"
                            >
                                
                            </Form.Control>
                        </Form.Group>
                    </div> 
                    
                </div>
                <div className='col-md-6'>
                    <Button type='submit' variant="contained" color="primary">Update</Button>
                </div>
            </Form>
        </div>
    )
}

export default AddPortfolioDetails