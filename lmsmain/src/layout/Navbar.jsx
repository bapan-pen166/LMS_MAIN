import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/css/Navbar/Navbar.css';
import Main_arch from '../Main_arch';
import { Datacontext } from '../Context';
import company_logo from "../assets/img/Navbar_img/company_Logo.jpg";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


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
  const [fisrtName,setFisrtName] = useState();
  const [lastName,setLastName] = useState();
  const [emailID,setEmailID] = useState();

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
  };
  // for the logout
  const handleLogout = () => {
    localStorage.removeItem('login');
    localStorage.removeItem('login id');
    localStorage.removeItem('userType');
    localStorage.removeItem('id');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    if(userType == 'Admin'){
      localStorage.removeItem('adminEmail');
    }
    else if(userType == 'Mentor'){
      localStorage.removeItem('mentorEmail');
    }
    else if(userType == 'Student'){
      localStorage.removeItem('studentEmail')
    }
    else{
      localStorage.removeItem('placementEmail')
    }
    navigate('/')
    setLogedin(false);
  }

  const hamburgerToggle = () => {
    sethamburger(!hamburger)
    // console.log("I am from burger   for checking    ",hamburger);
  }

  useEffect(() => {
    setUserType(localStorage.getItem('userType'))
    setFisrtName(localStorage.getItem('firstName'))
    setLastName(localStorage.getItem('lastName'));
    console.log(userType);
  }, [])

  return (
    <>
      <div className={`main-nav ${hamburger ? 'navbar' : 'navbar-for-full-screen'} `} style={{backgroundColor:"#f2edf3"}}>
        <div className='nav-left' style={{ display: 'flex', alignItems: 'center' }}>
         {!hamburger && <button onClick={hamburgerToggle} className="bar_icon mr-3" style={{ backgroundColor: 'transparent', border: 'none' }} >
            {/* <i className="fa fa-bars" style={{ color: '#0c5273', fontSize: '25pt' }} aria-hidden="true"></i> */}
            <ArrowForwardIosIcon/>
          </button>}
          {/* <Link to={"/"}><img style={{ width: "50px", height: "35px" }} src={company_logo} alt="company_logo" /></Link> */}
        </div>
        {userType === "Admin" ? (
          <div className='nav-wel-back'>Welcome Back , {fisrtName} {lastName}</div>
        ) : userType === "Mentor" ? (
          <div className='nav-wel-back'>Welcome Back , {fisrtName} {lastName} !</div>
        ) : userType === "Student" ? (
          <div className='nav-wel-back'>Welcome Back , {fisrtName} {lastName} !</div>
        ) : userType === "Placement" ? (
          <div className='nav-wel-back'>Welcome Back , {fisrtName} {lastName} !</div>
        ) :
         null}
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
            <h5 style={{textAlign:"center"}}>{userType}</h5>
            <hr />
            {userType === 'Mentor' && <MenuItem> <Link onClick={handleClose} style={{textDecoration:"none",color:"black"}} to={"member-profile"}>Update Profile</Link> </MenuItem>}
            {userType === 'Student' && <MenuItem> <Link onClick={handleClose} style={{textDecoration:"none",color:"black"}} to={"student-update-profile"}>Update Profile</Link> </MenuItem>}
            {userType === 'Admin' && <MenuItem> <Link onClick={handleClose} style={{textDecoration:"none",color:"black"}} to={"admin-change-password"}>Change Password</Link> </MenuItem>}
            {/* {userType === 'Mentor' && <MenuItem> <Link onClick={handleClose} style={{textDecoration:"none",color:"black"}} to={"change-password"}>Change Password</Link> </MenuItem>} */}
            <MenuItem onClick={handleLogout}><Logout fontSize="small" /> Logout</MenuItem>
          </Menu>
        </div>
      </div>
    </>
  );
}

export default Navber;
