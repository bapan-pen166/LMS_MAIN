import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/css/Navbar/Navbar.css';
import Main_arch from '../Main_arch';
import { Datacontext } from '../Context';
// import company_logo from "../assets/img/Navbar_img/company_Logo.jpg";
import user_icon from "../assets/img/Navbar_img/user.png";

import company_logo from "../assets/img/Navbar_img/logo1.png";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faUser, faSignOut, faUserEdit, faCog, faArrowDown } from '@fortawesome/free-solid-svg-icons';

// for the material ui dropdown
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Logout from '@mui/icons-material/Logout';
import { styled } from '@mui/material';

function Navber() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [loadedComponent, setLoadedComponent] = useState(null);
  const { sethamburger, hamburger, setLogedin } = useContext(Datacontext);
  const [userType, setUserType] = useState('');
  const [fisrtName, setFisrtName] = useState();
  const [lastName, setLastName] = useState();
  const [emailID, setEmailID] = useState();

  const load_main_arch = () => { <><Main_arch /></> };

  const loadComponent = async () => {
    // Dynamically import the component
    const dynamicImport = await import('../Main_arch');
    // Set the loaded component to the dynamically imported component
    setLoadedComponent(dynamicImport.default);
  };

  // for the material ui dropdown
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setSupportReq(false)
  };
  // for the logout
  const handleLogout = () => {
    localStorage.removeItem('login');
    localStorage.removeItem('login id');
    localStorage.removeItem('userType');
    localStorage.removeItem('id');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    if (userType == 'Admin') {
      localStorage.removeItem('adminEmail');
    }
    else if (userType == 'Mentor') {
      localStorage.removeItem('mentorEmail');
    }
    else if (userType == 'Student') {
      localStorage.removeItem('studentEmail')
    }
    else if (userType == 'Mentor_Assistant') {
      localStorage.removeItem('mentorAssistantEmail')
    }
    else {
      localStorage.removeItem('placementEmail')
    }
    navigate('/')
    setLogedin(false);
  }

  const hamburgerToggle = () => {
    sethamburger(!hamburger)
    // console.log("I am from burger   for checking    ",hamburger);
  }

  const [SupportRqst, setSupportReq] = useState(false);
  const openInNewTab = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  useEffect(() => {
    setUserType(localStorage.getItem('userType'))
    setFisrtName(localStorage.getItem('firstName'))
    setLastName(localStorage.getItem('lastName'));
    console.log(userType);
  }, [])

  return (
    <>
      <div className={`main-nav ${hamburger ? 'navbar' : 'navbar-for-full-screen'} `} style={{ backgroundColor: "#f2edf3" }}>
        <div className='nav-left' style={{ display: 'flex', alignItems: 'center' }}>
          {!hamburger && <button onClick={hamburgerToggle} className="bar_icon mr-3" style={{ backgroundColor: 'transparent', border: 'none' }} >
            {/* <i className="fa fa-bars" style={{ color: '#0c5273', fontSize: '25pt' }} aria-hidden="true"></i> */}
            <ArrowForwardIosIcon />
          </button>}
          {/* <Link to={"/"}><img style={{ width: "50px", height: "35px" }} src={company_logo} alt="company_logo" /></Link> */}
          <Link to={"/"}><img style={{ width: "140px", height: "40px", marginTop: "-10px" }} src={company_logo} alt="company_logo" /></Link>
        </div>
        {/*{userType === "Admin" ? (*/}
        {/*  <div className='nav-wel-back'>Welcome Back , {fisrtName} {lastName}</div>*/}
        {/*) : userType === "Mentor" ? (*/}
        {/*  <div className='nav-wel-back'>Welcome Back , {fisrtName} {lastName} !</div>*/}
        {/*) : userType === "Student" ? (*/}
        {/*  <div className='nav-wel-back'>Welcome Back , {fisrtName} {lastName} !</div>*/}
        {/*) : userType === "Placement" ? (*/}
        {/*  <div className='nav-wel-back'>Welcome Back , {fisrtName} {lastName} !</div>*/}
        {/*) :*/}
        {/* null}*/}
        <div style={{ display: 'flex', alignItems: 'center', padding: '0' }}>
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            style={{ padding: 0, minWidth: 'auto' }}  // Remove default button padding
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span>
                <i className="fa fa-user-circle-o" style={{ color: '#0c5273', fontSize: '25pt' }} aria-hidden="true"></i>
              </span>
            </div>
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            disableScrollLock  // Prevent the body from locking the scroll
          >
            <div className="d-flex align-items-center px-2">



              <div className="avatar mr-2">

                <img className="avatar-img rounded-circle shadow" src={user_icon} alt="avatar" style={{ width: '35px', height: '35px' }} />

              </div>

              <div>

                <p className="h6" ><span>{fisrtName ? fisrtName : ''}</span> <span>{lastName ? lastName : ''}</span></p>

                <p className="small m-0">{emailID ? emailID : ''}</p>

              </div>

            </div>

            <h6 className='my-2 ml-3' ><FontAwesomeIcon className='mr-15 ' style={{color: "#747579"}} icon={faUser} /><span style={{ fontWeight: '200', color: "#747579" }}>Logged in as: </span><span className='text-black'>{userType}</span></h6>

            <hr className='m-0' />

            {userType === 'Mentor' && <MenuItem> <Link onClick={handleClose} style={{ textDecoration: "none", color: "#747579" }} to={"member-profile"}>Update Profile</Link> </MenuItem>}

            {userType === 'Student' && <MenuItem> <Link onClick={handleClose} style={{ textDecoration: "none", color: "#747579" }} to={"student-update-profile"}><FontAwesomeIcon className='mr-8 ' icon={faUserEdit} />Update Profile</Link> </MenuItem>}

            {userType === 'Admin' && <MenuItem> <Link onClick={handleClose} style={{ textDecoration: "none", color: "#747579" }} to={"admin-change-password"}>Change Password</Link> </MenuItem>}

            {/* {userType === 'Mentor' && <MenuItem> <Link onClick={handleClose} style={{textDecoration:"none",color:"black"}} to={"change-password"}>Change Password</Link> </MenuItem>} */}
            {userType === 'Student' && <MenuItem> <p onClick={()=>{
              console.log('click')
              setSupportReq(!SupportRqst)}} style={{textDecoration:"none",color:"#747579"}} ><FontAwesomeIcon className='mr-12 ' icon={faCog} />Support Request</p> <FontAwesomeIcon className='ml-2 ' style={{color: "#747579"}} icon={faArrowDown} /></MenuItem>}
            {userType === 'Student' && SupportRqst && <MenuItem> <Link onClick={
              ()=>{openInNewTab('https://www.youtube.com')
                setSupportReq(!SupportRqst)
                handleClose()}}
                 style={{textDecoration:"none",color:"black",paddingLeft:'20px', color: "#747579"}} >IT Support</Link> </MenuItem>}
            {userType === 'Student' && SupportRqst && <MenuItem> <Link onClick={
              ()=>{
                openInNewTab('https://www.google.com')
                setSupportReq(!SupportRqst)
                handleClose()}
            } style={{textDecoration:"none",color:"black",paddingLeft:'20px', color: "#747579"}} >Class Support</Link> </MenuItem>}

            <hr className='m-0' />

            <MenuItem onClick={handleLogout} style={{ color: '#747579' }}><FontAwesomeIcon className='mr-12 ' icon={faSignOut} />Logout</MenuItem>
            {userType === 'Admin' && <MenuItem> <Link onClick={handleClose} style={{ textDecoration: "none", color: "black" }} to={"admin-change-password"}>Change Password</Link> </MenuItem>}
            {/* {userType === 'Mentor' && <MenuItem> <Link onClick={handleClose} style={{textDecoration:"none",color:"black"}} to={"change-password"}>Change Password</Link> </MenuItem>} */}
          </Menu>
        </div>
      </div>
    </>
  );
}

export default Navber;
