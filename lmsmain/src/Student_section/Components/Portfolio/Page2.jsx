import React, { useEffect, useState } from 'react'
import profile_dp from "../../../assets/img/student_Portfolio/profile_dppp.jpg"
import "../../../assets/css/googleFont/googleFont.css"
import axios from 'axios'
import { api } from '../../../ApiUrl/ApiUrl'
import CallIcon from '@mui/icons-material/Call';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Revit from '../../../assets/img/student_Portfolio/Revit.jpg'
import Navisworks from "../../../assets/img/student_Portfolio/Navisworks.png"
import construction_cloud from "../../../assets/img/student_Portfolio/construction cloud.png"
import enscape from "../../../assets/img/student_Portfolio/enscape.png"
import bimtrack from "../../../assets/img/student_Portfolio/bimtrack.jpeg"
import robo_stuct from "../../../assets/img/student_Portfolio/robo stuct.png"

import portfolio_photo from '../../../assets/img/student_Portfolio/portfolio_photo.jpeg'

const Page2 = ({data,firstName,lastName,studentEmail}) => {
    // const [secondPageData,setSecondPageData] = useState()
    console.log(data)
    const formattedName = `${firstName?.charAt(0)?.toUpperCase() + firstName?.slice(1)} ${lastName?.charAt(0)?.toUpperCase() + lastName?.slice(1)}`;
    const country = data?.contactDetails?.country ? JSON.parse(data.contactDetails.country) : {};
    const city = data?.contactDetails?.city ? JSON.parse(data.contactDetails.city) : {};
    const state = data?.contactDetails?.state ? JSON.parse(data.contactDetails.state) : {};
  

  return (
    // <div className='font-playfair'>
    //     <div style={{float: "right",display:"flex",flexDirection:"column",marginLeft:"60px"}} className='font-playfair'><img src={`${api}/${data?.aboutMe?.studentProfilePhoto}`} alt={data?.aboutMe?.studentProfilePhoto} style={{width:"350px"}}/> <span style={{fontSize:"50px",textAlign:"CENTER"}}>{formattedName}</span></div>
    //     <h2 className='font-playfair'>About Me!</h2>
    //     {data?.aboutMe?.AboutMe}   
    //     <div className='font-playfair'>
    //         <h3 style={{marginTop:"50PX"}}>CONTACT</h3>
    //     </div>
    //     <div>
    //          <div style={{marginBottom:"4px", fontWeight:"bold"}}><CallIcon/> : - {data?.contactDetails?.mobileNumber}</div>
    //          <div style={{marginBottom:"4px",fontWeight:"bold"}}><LocationOnIcon/> : - {city?.name}, {state?.name} ,{country?.name}</div>
    //          <div style={{marginBottom:"4px",fontWeight:"bold"}}><EmailIcon/> :- {data?.contactDetails?.email}</div>
    //          <div style={{marginBottom:"4px",fontWeight:"bold"}}><LinkedInIcon/> : - {data?.contactDetails?.linkedinLink}</div>
    //     </div>
    // </div>

    <div>
      <div style={{display:'flex'}}>
        <div style={{height:'50%',width :'35%',padding:'5px'}}>
        <p className='font-playfair' style={{fontSize:'35px',fontWeight:'bold',paddingTop:'5px'}}>About Me!</p>
        <p className='font-playfair' style={{fontSize:'18px'}}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque non veniam voluptates eius, similique quo temporibus nesciunt unde perferendis eaque, asperiores provident ea autem explicabo maiores consectetur officiis officia dignissimos. Dolore minus illo cupiditate, quisquam provident quia iure reiciendis soluta qui amet nostrum vero reprehenderit cum totam repellendus molestiae repudiandae esse suscipit. Nihil consequuntur libero sunt quam. Tempora iure minima dicta dolorum illum neque consequuntur laboriosam atque sequi. Fugiat totam beatae vitae commodi optio non laborum aliquam. Minus neque adipisci, aut quas explicabo autem minima ea pariatur, sapiente, labore aliquid ipsum illum officiis id nostrum quibusdam tenetur libero maxime maiores</p>
        </div>
        <div style={{height:'50%',width :'30%', padding:'5px'}}>
          <div style={{display:'flex',justifyContent:'center'}}><img src={portfolio_photo} alt="portfolio_photo" style={{height:'170px',width:'150px'}} /></div>
          <p className='font-playfair'  style={{display:'flex',justifyContent:'center', fontSize:'24px',fontWeight:'bold', }}>CHITRADIP DEY</p>
          <p className='font-playfair'  style={{display:'flex',justifyContent:'center', fontSize:'20px',fontWeight:'bold', margin:'0px' }}>BIM Engineer</p>
        </div>
        <div style={{height:'50%',width :'35%', padding:'5px'}}>
          <p className='font-playfair' style={{fontSize:'35px',fontWeight:'bold',paddingTop:'5px'}}>Work Experience</p>
          <span>
            <p className='font-playfair' style={{fontSize:'20px',fontWeight:'bold',paddingTop:'5px',paddingLeft:'10px'}}>Technostruct LLC</p>
            <p className='font-playfair' style={{fontSize:'16px',paddingTop:'5px',paddingLeft:'10px'}}>03.03.2024 - 31.09.2024 | BIM Intern</p>
          </span>
          <span>
            <p className='font-playfair' style={{fontSize:'20px',fontWeight:'bold',paddingTop:'5px',paddingLeft:'10px'}}>Technostruct LLC</p>
            <p className='font-playfair' style={{fontSize:'16px',paddingTop:'5px',paddingLeft:'10px'}}>03.03.2024 - 31.09.2024 | BIM Intern</p>
          </span>
        </div>
      </div>
      <div style={{display:'flex',height:'50%'}}>
        <div style={{width :'35%',padding:'5px'}}>
          <p className='font-playfair' style={{fontSize:'35px',fontWeight:'bold',paddingTop:'5px'}}>Contact </p>
            <div>
                <div style={{marginBottom:"4px", fontWeight:"bold"}}> 
                {/* {data?.contactDetails?.mobileNumber} */}
                <p className='font-playfair' style={{fontSize:'18px',marginTop:0}}><CallIcon/> :+91 8978656746</p>
                </div>
                
                <div style={{marginBottom:"4px",fontWeight:"bold"}}> 
                {/* {data?.contactDetails?.email} */}
                <p className='font-playfair' style={{fontSize:'18px',marginTop:0}}> <EmailIcon/> :xyz@outlook.com</p>
                </div>
                <div style={{marginBottom:"4px",fontWeight:"bold"}}>
                {/* {data?.contactDetails?.linkedinLink} */}
                <p className='font-playfair' style={{fontSize:'18px',marginTop:0}}><LinkedInIcon/> : Link</p>
                </div>
                <div style={{marginBottom:"4px",fontWeight:"bold"}}> 
                 {/* {city?.name}, {state?.name} ,{country?.name} */}
                  <p className='font-playfair' style={{fontSize:'18px',marginTop:0}}><LocationOnIcon/> :California, USA</p>
                 </div>
            </div>
        </div>
        <div style={{width :'30%',padding:'5px'}}>
          <p className='font-playfair' style={{fontSize:'35px',fontWeight:'bold',paddingTop:'5px'}}>Education </p>
          <div>
            <p className='font-playfair' style={{fontSize:'20px',fontWeight:'bold',paddingTop:'5px',paddingLeft:'10px'}}><span><ArrowForwardIcon/> </span>TechnoStruct Institute of Building Construction and Management</p>
             <p className='font-playfair' style={{fontSize:'16px',paddingTop:'5px',paddingLeft:'10px'}}>2023-2024 | Post Graduation in BIM Management & Documentation(Remote) -From California</p> 
            </div>
            <div>
                <p className='font-playfair' style={{fontSize:'20px',fontWeight:'bold',paddingTop:'5px',paddingLeft:'10px'}}><span><ArrowForwardIcon/> </span>Saffrony Institute of Technology</p>
                <p className='font-playfair' style={{fontSize:'16px',paddingTop:'5px',paddingLeft:'10px'}}>2019-2022 | Bachelor in Civil Engineering</p>
                <p className='font-playfair' style={{fontSize:'16px',paddingTop:'5px',paddingLeft:'10px',marginTop:0}}>(CGPA-9.27)</p> 
            </div>
        </div>
        <div style={{width :'35%',padding:'5px'}}>
          <p className='font-playfair' style={{fontSize:'35px',fontWeight:'bold',paddingTop:'5px'}}>Software Proficiency </p>
           <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr'}}>
             <div style={{padding:'10px'}}>
              <img src={Revit} alt="Revit" height={'40px'} width={'40px'} />
              <p>Revit</p>
             </div>
             <div style={{padding:'10px'}}>
              <img src={Navisworks} alt="Navisworks" height={'40px'} width={'40px'} />
              <p>Revit</p>
             </div>
             <div style={{padding:'10px'}}>
              <img src={construction_cloud} alt="construction_cloud" height={'40px'} width={'40px'} />
              <p>Revit</p>
             </div>
             <div style={{padding:'10px'}}>
              <img src={enscape} alt="Revit" height={'40px'} width={'40px'} />
              <p>Revit</p>
             </div>
             <div style={{padding:'10px'}}>
              <img src={bimtrack} alt="Revit" height={'40px'} width={'40px'} />
              <p>Revit</p>
             </div>
             <div style={{padding:'10px'}}>
              <img src={robo_stuct} alt="Revit" height={'40px'} width={'40px'} />
              <p>Revit</p>
             </div>
           </div>
        </div>

      </div>
    </div>
  )
}

export default Page2