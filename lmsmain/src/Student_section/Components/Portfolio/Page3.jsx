import React from 'react';
import "../../../assets/css/googleFont/googleFont.css";
import CallIcon from '@mui/icons-material/Call';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Page3 = () => {
  return (
    // <div className='row'>
    //     <div className='col-md-6'>
    //             <h1>EDUCATION</h1>
    //         <div>
    //             <h4>TechnoStruct Institute of Building Construction and Management</h4>
    //             <p>2023-2024 | Post Graduation in BIM Management & Documentation(Remote) -From California</p> 
    //         </div>
    //         <div>
    //             <h4>Saffrony Institute of Technology</h4>
    //             <p>2019-2022 | Bachelor in Civil Engineering</p>
    //             <p>(CGPA-9.27)</p> 
    //         </div>
          
    //     </div>
    //     <div className='col-md-6'>
    //         <h1>EXPERIENCE</h1>
    //         <div>
    //             <h4>PSP PROJECTS LIMITED</h4>
    //             <p>01 May 2023 - 31 March | Design Co-ordinator</p> 
    //         </div>

    //     </div>

    // </div>
    <div >
        <div style={{height:'100%',width :'100%',padding:'5px'}}>
            <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%'}}>
                <div style={{display:'block',textAlign:'center'}}>
                <p className='font-playfair' style={{fontSize:'90px'}}>Thank You</p>
                <p className='font-playfair' style={{fontSize:'30px',paddingLeft:'250px'}}>Chitradip Dey</p> 
                </div>
              
            </div>
            <div style={{padding:'5px'}}>
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
        </div>

    </div>
  )
}

export default Page3