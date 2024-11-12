import React, { useEffect, useState } from 'react'
import profile_dp from "../../../assets/img/student_Portfolio/profile_dppp.jpg"
import "../../../assets/css/googleFont/googleFont.css"
import axios from 'axios'
import { api } from '../../../ApiUrl/ApiUrl'
import CallIcon from '@mui/icons-material/Call';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Page2 = ({data,firstName,lastName,studentEmail}) => {
    // const [secondPageData,setSecondPageData] = useState()
    console.log(data)
    const formattedName = `${firstName?.charAt(0)?.toUpperCase() + firstName?.slice(1)} ${lastName?.charAt(0)?.toUpperCase() + lastName?.slice(1)}`;
    const country = data?.contactDetails?.country ? JSON.parse(data.contactDetails.country) : {};
    const city = data?.contactDetails?.city ? JSON.parse(data.contactDetails.city) : {};
    const state = data?.contactDetails?.state ? JSON.parse(data.contactDetails.state) : {};
  

  return (
    <div className='font-playfair'>
        <div style={{float: "right",display:"flex",flexDirection:"column",marginLeft:"60px"}} className='font-playfair'><img src={`${api}/${data?.aboutMe?.studentProfilePhoto}`} alt={data?.aboutMe?.studentProfilePhoto} style={{width:"350px"}}/> <span style={{fontSize:"50px",textAlign:"CENTER"}}>{formattedName}</span></div>
        <h2 className='font-playfair'>About Me!</h2>
        {data?.aboutMe?.AboutMe}   
        <div className='font-playfair'>
            <h3 style={{marginTop:"50PX"}}>CONTACT</h3>
        </div>
        <div>
             <div style={{marginBottom:"4px", fontWeight:"bold"}}><CallIcon/> : - {data?.contactDetails?.mobileNumber}</div>
             <div style={{marginBottom:"4px",fontWeight:"bold"}}><LocationOnIcon/> : - {city?.name}, {state?.name} ,{country?.name}</div>
             <div style={{marginBottom:"4px",fontWeight:"bold"}}><EmailIcon/> :- {data?.contactDetails?.email}</div>
             <div style={{marginBottom:"4px",fontWeight:"bold"}}><LinkedInIcon/> : - {data?.contactDetails?.linkedinLink}</div>
        </div>
    </div>
  )
}

export default Page2