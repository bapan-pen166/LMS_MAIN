import React from 'react'
import '../assets/css/Register/Register.css';
import logo from '../assets/img/Login_img/logo.png';
import { useState } from 'react';
import axios from 'axios';
import { api } from '../ApiUrl/ApiUrl';

function Register() {
    const[email,setEmail]=useState('');
    const[verify,setverify]=useState('');
    const[verifyotp,setVerifyOtp]=useState('');
    // const[otp,setOtp]=useState('');
    

    const handleSubmit=(e)=>{
        console.log('submit click');
       
            axios.post(`${api}/reg/sendOtp`,{emailId:email})
               .then((Response)=>{
                   console.log(Response.data);
                   setverify(Response.data.success);    
               })
               .catch((error) => {
                console.error('Error:', error);
            });  
       }

       const handleverify=(e)=>{
        console.log('submit click');
       
            axios.post(`${api}/reg/verifyOtp`,{emailId:email,otp:verifyotp})
               .then((Response)=>{
                   console.log(Response.data);
                //    setverify(Response.data.success);    
               })
               .catch((error) => {
                console.error('Error:', error);
            });  
       }   
    return ( 
        <>
            <div class="container">
                <div class="row">
                <div class="col-md-6 mx-auto center-div">
                    <div class="text-center">
                    {/* <img src={logo} width="80%" alt=""/>
                    <h4 style={{font:'400 14px / 20px Roboto, sans-serif;',marginTop:'5px'}}>Please Verify Your Email Id</h4>
                    <p>This div is centered horizontally and vertically on the page.</p> */}
                    <div class="LoginForm ">
                                    <img src={logo}width="60%" alt=""/>
                                    {/* <!-- <h2>
                
                                        Login 
                                    </h2> --> */}
                                     <div className='text-center' style={{textAlign:'center'}}>
                                        <p  style={{fontSize:'larger',marginTop:'5px'}}><b> Please Verify Your Email Id</b></p>
                                   </div>
                                   <div className='text-center' style={{textAlign:'center'}}>
                                        <p  style={{fontSize:'larger',marginTop:'5px'}}>Please confirm that you want to register your account using this email Id.
                                        We will send a six digit verification code to this email Id.</p>
                                   </div>
                                    <form>
                                    <div class="row  ">
                                        <input type="text" class="lms-login-input-box" name="" id="emailInput" value={email} placeholder=" Email Id" onChange={(e)=>{setEmail(e.target.value)}}  />
                                    </div>
                                  
                                    <div class="row ">
                                        
                                        <input type="button" className="lms-button form-control" value="Send OTP" id="submitButton" disabled={!email.trim() && !verify} onClick={handleSubmit}/>
                                        
                                    </div>

                                    <div class="row  ">
                                        <input type="text" class="lms-login-input-box" name="" id="emailInput" value={verifyotp} placeholder=" Email Id" onChange={(e)=>{setVerifyOtp(e.target.value)}} disabled={ !verify}  />
                                    </div>
                                  
                                    <div class="row ">
                                        
                                        <input type="button" className="lms-button form-control" value="Verify OTP" id="submitButton" disabled={!verify} onClick={handleverify} />
                                        
                                    </div>
                                    </form>
                
                                    
                
                
                                </div>
                    </div>
                </div>
                </div>
            </div>
        </>
     );
}

export default Register;