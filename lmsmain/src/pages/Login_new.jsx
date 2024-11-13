import React from 'react'
import '../assets/css/Login/Login_new.css';
import bg_image from '../assets/img/Login_img/student_login.svg';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Datacontext } from '../Context';
import { useOutletContext } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { api, api2 } from '../ApiUrl/ApiUrl';
import logo from '../assets/img/Login_img/logo.png';
import * as Yup from 'yup';

function Login_new() {

    const [errors, setErrors] = useState({});
    const [username, setUsername] = useState([]);
    const [password, setPassword] = useState([]);
    // const [log,setlog]=useState('');
    const [data, setdata] = useState('');
    const { setLogedin } = useContext(Datacontext);
    const { setUsertype } = useContext(Datacontext);
    const Navigate = useNavigate();

    const [forgetPage, setForgetPage] = useState(false);

    // for the forgetpassword
    const [emailID, setEmailID] = useState('');
    const [passwordFoget, setPasswordFoget] = useState('');
    const [confirmPasswordFoget, setconfirmPasswordFoget] = useState('');
    const [activeAfterMailVerified, setActiveAfterMailVerified] = useState(false);
    const [verified, setVerified] = useState(false);
    const [verifyotp, setVerifyotp] = useState()
    const [forenterOTP, setForenterOTP] = useState(false)
    const [forTheReadonlyOTPField, setForTheReadonlyOTPField] = useState(false);


    const handleSubmit = (e) => {
        console.log('submit click');
        console.log('username', username);
        console.log('password', password);

        axios.post(`${api}/user/login`, { username: username, passKey: password })
            .then((Response) => {
                console.log("response", Response.data);
                if (Response.data.message != "Logged in successfully") {
                    toast.error(Response.data.message, {
                        position: "top-center",
                        style: { fontWeight: 'bold' },
                    });

                    // alert(Response.data.message)
                    // setUsername("")
                    setPassword("")
                }
                else {
                    console.log(Response.data.success);
                    localStorage.setItem('login', Response.data.success);
                    localStorage.setItem('login id', Response.data.userDetails.id);
                    localStorage.setItem('userType', Response.data.userDetails.userType)
                    localStorage.setItem('id', Response.data.userDetails.id)
                    if (Response.data.userDetails.userType == 'Student') {
                        localStorage.setItem('studentEmail', Response.data.userDetails.email)
                        localStorage.setItem('firstName', Response.data.userDetails.firstName)
                        localStorage.setItem('lastName', Response.data.userDetails.lastName)
                    }
                    else if (Response.data.userDetails.userType == 'Mentor') {
                        localStorage.setItem('mentorEmail', Response.data.userDetails.email)
                        localStorage.setItem('firstName', Response.data.userDetails.firstName)
                        localStorage.setItem('lastName', Response.data.userDetails.lastName)
                    }
                    else if (Response.data.userDetails.userType == 'Admin') {
                        localStorage.setItem('adminEmail', Response.data.userDetails.email)
                        localStorage.setItem('firstName', Response.data.userDetails.firstName)
                        localStorage.setItem('lastName', Response.data.userDetails.lastName)
                    }
                    else {
                        localStorage.setItem('placementEmail', Response.data.userDetails.email)
                        localStorage.setItem('firstName', Response.data.userDetails.firstName)
                        localStorage.setItem('lastName', Response.data.userDetails.lastName)
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
    const handleOTPsendForThe = () => {
        axios.post(`${api}/user/sendOTP`, { email: emailID })
            .then((Response) => {
                console.log(Response?.data?.success)
                if (Response?.data?.success) {
                    toast.success("Otp send successfully", {
                        position: "top-center",
                        style: { fontWeight: 'bold' },
                    });

                    setForenterOTP(true)
                    setActiveAfterMailVerified(true);
                }
                else {
                    toast.error("empty mail id or invalid mail id", {
                        position: "top-center",
                        style: { fontWeight: 'bold' },
                    });

                }

            }).catch((error) => {
                console.log(error);
            })

    }


    const validationSchema = Yup.object({
        passwordFoget: Yup
            .string()
            .required("password is required")
            .min(8, "Password must be 8 characters")
            .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one symbol")
            .matches(/[0-9]/, "password must contain at least one number")
            .matches(/[A-Z]/, "Passwod must contain at least one uppercase")
            .matches(/[a-z]/, "Passwod must contain at least one lowercase"),

        confirmPasswordFoget: Yup.string().oneOf([Yup.ref("passwordFoget")], "password must match")
            .required("confirm password is required"),
    })


    const handlePasswordChangeConfirm = async (e) => {
        e.preventDefault();

        try {
            const formData = { passwordFoget, confirmPasswordFoget };
            await validationSchema.validate(formData, { abortEarly: false });

            setErrors({});

            console.log("Form validated successfully", { email: emailID, password: passwordFoget });
            const response = await axios.post(`${api2}/user/changePassword`, { email: emailID, password: passwordFoget });
            if (response?.data?.success) {
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

    const handleVerifyOtp = () => {
        axios.post(`${api2}/user/verifyOTP`, { email: emailID, otp: verifyotp })
            .then((Response) => {
                console.log("verify status", Response.data.success);
                if (Response.data.success) {
                    toast.success("Otp verified successfully", {
                        position: "top-center",
                        style: { fontWeight: 'bold' },
                    });
                    // sessionStorage.setItem('verify', Response.data.success);
                    setVerified(Response.data.success);
                    setVerified(true);
                    setForTheReadonlyOTPField(true);
                }
                else {
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
            <section className="ftco-section">
                <div className="container">
                    {/* <div className="row justify-content-center">
                        <div className="col-md-6 text-center mb-5">
                            <h2 className="heading-section"></h2>
                        </div>
                    </div> */}
                    <div className="row justify-content-center mt-3">
                        <div className="col-md-12 col-lg-10">
                            <div className="wrap d-md-flex height-95">
                                <div className="img" style={{ backgroundImage: `url(${bg_image})`, backgroundSize: 'contain' }}>
                                </div>
                                <div className="login-wrap p-4 p-md-5">
                                    <div className="d-flex flex-column text-center">
                                        <div className="w-100">
                                            {/* <p className="social-media justify-content-end d-none">
                                                <a href="#" className="social-icon d-flex align-items-center justify-content-center"><span className="fa fa-facebook"></span></a>
                                                <a href="#" className="social-icon d-flex align-items-center justify-content-center"><span className="fa fa-twitter"></span></a>
                                            </p> */}
                                            <img src={logo} alt="" className='nav-logo' />
                                        </div>
                                        <div className="w-100 mt-3">
                                            <h3 className="mb-4">Log In</h3>
                                        </div>
                                    </div>
                                    <form action="#" className="signin-form" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                                        <div className="form-group mb-3 w-100">
                                            <label className="label" htmlFor="name">Username</label>
                                            <input type="text" className="form-control" placeholder="Username" required=""
                                                onChange={(e) => setUsername(e.target.value)}
                                                value={username} // Keep the username in the input field
                                            />
                                        </div>
                                        <div className="form-group mb-3 w-100">
                                            <label className="label" htmlFor="password">Password</label>
                                            <input type="password" className="form-control" placeholder="Password" required=""
                                                onChange={(e) => setPassword(e.target.value)}
                                                value={password} // Keep the password in the input field
                                            />
                                        </div>
                                        <div className="d-flex">
                                            <div className="w-50 text-left">
                                                <label className="checkbox-wrap checkbox-primary mb-0 d-none">Remember Me
                                                    <input type="checkbox" checked="" />
                                                    <span className="checkmark"></span>
                                                </label>
                                            </div>
                                            <div className="w-50 text-md-right">
                                                <a href="#">Forgot Password</a>
                                            </div>
                                        </div>
                                        <div className="form-group w-100">
                                            <button type="submit" className="form-control btn btn-primary rounded submit px-3">Sign In</button>
                                        </div>
                                    </form>
                                    {/* <p className="text-center">Not Registered? <a data-toggle="tab" href="#signup">Register</a></p> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login_new
