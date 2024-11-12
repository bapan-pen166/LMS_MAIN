import React from 'react';
import '../assets/css/Login/Login.css';
import logo from '../assets/img/Login_img/logo.png';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Datacontext } from '../Context';
import { useOutletContext } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { api, api2 } from '../ApiUrl/ApiUrl';
import * as Yup from 'yup';


function Login() {
    const [errors,setErrors] = useState({});
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // const [log,setlog]=useState('');
    const [data, setdata] = useState('');
    const { setLogedin } = useContext(Datacontext);
    const {setUsertype}=useContext(Datacontext);
    const Navigate = useNavigate();

    const [forgetPage,setForgetPage] = useState(false);

    // for the forgetpassword
    const [emailID,setEmailID]=useState('');
    const [passwordFoget,setPasswordFoget ] = useState('');
    const [confirmPasswordFoget,setconfirmPasswordFoget ] = useState('');
    const [activeAfterMailVerified, setActiveAfterMailVerified] = useState(false);
    const [verified,setVerified] = useState(false);
    const [verifyotp,setVerifyotp] = useState()
    const [forenterOTP,setForenterOTP] = useState(false)
    const [forTheReadonlyOTPField, setForTheReadonlyOTPField] = useState(false);


    const handleSubmit = (e) => {
        console.log('submit click');
        console.log('username', username);
        console.log('password', password);
 
        axios.post(`${api}/user/login`, { username: username, passKey: password })
            .then((Response) => {
                console.log("response",Response.data);
                if(Response.data.message != "Logged in successfully"){
                    toast.error(Response.data.message, {
                        position: "top-center",
                        style: { fontWeight: 'bold' },
                    });

                    // alert(Response.data.message)
                    setUsername("")
                    setPassword("")
                }
                else
                {
                    console.log(Response.data.success);
                    localStorage.setItem('login', Response.data.success);
                    localStorage.setItem('login id', Response.data.userDetails.id);
                    localStorage.setItem('userType',Response.data.userDetails.userType)
                    localStorage.setItem('id',Response.data.userDetails.id)
                    if(Response.data.userDetails.userType == 'Student'){
                        localStorage.setItem('studentEmail',Response.data.userDetails.email)
                        localStorage.setItem('firstName',Response.data.userDetails.firstName)
                        localStorage.setItem('lastName',Response.data.userDetails.lastName)    
                    }
                    else if(Response.data.userDetails.userType == 'Mentor'){
                        localStorage.setItem('mentorEmail',Response.data.userDetails.email)
                        localStorage.setItem('firstName',Response.data.userDetails.firstName)
                        localStorage.setItem('lastName',Response.data.userDetails.lastName)
                    }
                    else if(Response.data.userDetails.userType == 'Admin'){
                        localStorage.setItem('adminEmail',Response.data.userDetails.email)
                        localStorage.setItem('firstName',Response.data.userDetails.firstName)
                        localStorage.setItem('lastName',Response.data.userDetails.lastName)
                    }
                    else{
                        localStorage.setItem('placementEmail',Response.data.userDetails.email)
                        localStorage.setItem('firstName',Response.data.userDetails.firstName)
                        localStorage.setItem('lastName',Response.data.userDetails.lastName)
                    }
                   
                    setLogedin(Response.data.success);
                    setUsertype(Response.data.userDetails.userType);
                    //   setlog(Response.data.success);
                    //   let log=Response.data.success;
                    //   setdata(Response.data.success);
                    setLogedin(localStorage.getItem('login'));
                    // window.location.reload();
                    //   {{setLogin(log)}};
                    //    setusername(" ");
                    //    setpassword(" ");

                }
                

            })
           .catch((error) => {
            console.error('Error:', error.message);
        });  
    }

    //    const handleSubmit1=()=>{
    //     console.log('clicked');
    //    }
    // const loginupdate=()=>{setLogin(log)};

    //    useEffect(()=>{
    //     console.log('useEffect called')
    //     loginupdate();
    //    },[data])
    const handleOTPsendForThe = ()=>{
        axios.post(`${api}/user/sendOTP`,{email:emailID})
         .then((Response)=>{
          console.log(Response?.data?.success)
          if(Response?.data?.success){
                  toast.success("Otp send successfully", {
                      position: "top-center",
                      style: { fontWeight: 'bold' },
                  });
  
              setForenterOTP(true)
              setActiveAfterMailVerified(true);
          }
          else{
              toast.error("empty mail id or invalid mail id", {
                  position: "top-center",
                  style: { fontWeight: 'bold' },
              });
              
          }
             
         }).catch((error)=>{
              console.log(error);
         })
  
     }
   

   const validationSchema = Yup.object({
    passwordFoget:Yup
         .string()
         .required("password is required")
         .min(8,"Password must be 8 characters")
         .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one symbol")
         .matches(/[0-9]/, "password must contain at least one number")
         .matches(/[A-Z]/,"Passwod must contain at least one uppercase")
         .matches(/[a-z]/,"Passwod must contain at least one lowercase"),

    confirmPasswordFoget: Yup.string().oneOf([Yup.ref("passwordFoget")],"password must match")
                        .required("confirm password is required"),                                            
  })


  const handlePasswordChangeConfirm = async (e) => {
    e.preventDefault();
  
    try {
      const formData = { passwordFoget, confirmPasswordFoget };  
      await validationSchema.validate(formData, { abortEarly: false });
      
      setErrors({});

      console.log("Form validated successfully", {email:emailID,password:passwordFoget});
      const response = await axios.post(`${api2}/user/changePassword`, {email:emailID,password:passwordFoget});
      if(response?.data?.success){
        toast.success("Password updated successfully", {
            position: "top-center",
            style: { fontWeight: 'bold' },
        });
        setForgetPage(false)
      }
      
      console.log("Response from server:", response.data);
      
    } catch (error) {
      if (error.inner) {
        console.log(error.inner);
  
        const newErrors = {};
        error.inner.forEach(element => {
          newErrors[element.path] = element.message;
        });
        setErrors(newErrors);
      } else {
        console.error("Error in axios request:", error);
      }
    }
  };

  const handleVerifyOtp=()=>{
    axios.post(`${api2}/user/verifyOTP`, { email: emailID, otp: verifyotp })
            .then((Response) => {
                console.log("verify status",Response.data.success);
                if(Response.data.success){
                    toast.success("Otp verified successfully", {
                        position: "top-center",
                        style: { fontWeight: 'bold' },
                    });
                    // sessionStorage.setItem('verify', Response.data.success);
                    setVerified(Response.data.success);
                    setVerified(true);
                    setForTheReadonlyOTPField(true);
                }
                else{
                    toast.error("Wrong OTP", {
                        position: "top-center",
                    });
                }
                
                //    setverify(Response.data.success);    
            })
            .catch((error) => {
                console.error('Error:', error);
            });
  }


    return (
        <>
            <ng-container>
                {/* <!-- <div class="containerBox bigb"> --> */}
                {!forgetPage && <div class="containerBox" >

                    <div className="loginPage">
                        <div className="loginBox">
                            <div className="LoginForm">
                                <img src={logo} width="60%" alt="" />
                                <form>
                                    <div className="row">
                                        <input type="text" className="lms-login-input-box" id="username" placeholder="Email Id/Mobile No." onChange={(e) => setUsername(e.target.value)} />
                                    </div>
                                    <div className="row">
                                        <input type="password" className="lms-login-input-box" id="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                    <div className="row">
                                        <input type="button" className="lms-button form-control" value="Sign In" onClick={handleSubmit} />
                                    </div>
                                </form>
                                <div className="row inputspace justify-content-center">
                                    <p style={{color:"blue",cursor:"pointer"}} onClick={()=>setForgetPage(true)}> Forgot Password?</p>
                                </div>
                            </div>
                        </div>
                        <div className="loginPageImage"></div>
                    </div>
                </div>}
                {forgetPage && 
                   <div class="containerBox" >
                       {/* forget wala */}
                   <div className="loginPage">
                       <div className="loginBox">
                           <div className="LoginForm">
                               <img src={logo} width="60%" alt="" />
                               <form onSubmit={handlePasswordChangeConfirm}>
                                   <div className="row">
                                       <input type="email" readOnly={activeAfterMailVerified}  className="lms-login-input-box" id="username" placeholder="Email Id" onChange={(e) => setEmailID(e.target.value)} />
                                   </div>
                                   {!activeAfterMailVerified &&<div className="row">
                                       <input type="button" className="lms-button form-control" value="Send OTP" onClick={handleOTPsendForThe} />
                                   </div>}
                                   {forenterOTP && <><div className="row">
                                       <input type="text" readOnly={forTheReadonlyOTPField}  className="lms-login-input-box" id="username" placeholder="Enter OTP" onChange={(e) => setVerifyotp(e.target.value)} />
                                   </div>
                                   <div className='row'>
                                      <input type="button" disabled={forTheReadonlyOTPField} className="lms-button form-control" value="Verify OTP" onClick={handleVerifyOtp} />
                                   </div> </>}

                                   {verified && <><div className="row">
                                       <input type="password" className="lms-login-input-box" id="password" placeholder="Password" onChange={(e) => setPasswordFoget(e.target.value)} />
                                       {errors.passwordFoget && <div style={{ color: 'red' }}>{errors.passwordFoget}</div>}
                                    </div>
                                   <div className="row">
                                       <input type="password" className="lms-login-input-box" id="password" placeholder="Confirm Password" onChange={(e) => setconfirmPasswordFoget(e.target.value)} />
                                       {errors.confirmPasswordFoget && <div style={{ color: 'red' }}>{errors.confirmPasswordFoget}</div>}
                                   </div>
                                   <div className="row">
                                       <input type="submit"  className="lms-button form-control" value="Update"  />
                                   </div> </>}
                               </form>
                               <div className="row inputspace justify-content-center">
                                   <p style={{color:"blue",cursor:"pointer"}} onClick={()=>setForgetPage(false)}>Click here to Login</p>
                               </div>
                           </div>
                       </div>
                       <div className="loginPageImage"></div>
                   </div>
               </div>
                }

                {/* <!-- </div> --> */}


            </ng-container>
            <ToastContainer />
        </>
    );
}

export default Login;