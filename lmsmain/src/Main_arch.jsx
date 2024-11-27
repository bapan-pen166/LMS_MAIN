import React, { useEffect, useLayoutEffect } from 'react';
import Master_Layout from './layout/Master_Layout';
import Login_Layout from './layout/Login_Layout';
import { Navigate, useNavigate } from 'react-router-dom';
import { Datacontext } from './Context';
import { useContext,useState } from 'react';
import { redirect } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
// import Master_Layout_Mentor from './Mentor_section/Layout/Master_Layout_Mentor';

function Main_arch() {
    const [login,setLogin]=useState(false);
    // const [log,setLog]=useState(false);
    const {logedin,log,setLog}=useContext(Datacontext);
    // console.log('logedin',logedin);
    let login_stat=localStorage.getItem('login')
    useEffect(()=>{
    setLogin(login_stat);
    },[logedin])
    
    // const navigate = useNavigate();
    // useEffect(()=>{
    //     setLogin(logedin);
    // },[])
    // if()
    // localStorage.setItem
    // localStorage.setItem('login',logedin);
    // setLogin(localStorage.getItem('login'));
    // if(localStorage.getItem('login')==true)
    // {
        
    // }
    // useLayoutEffect(()=>{
    //     setLog(localStorage.getItem('login'));
    // },[])
    // useEffect(()=>{
    //     setLogin(localStorage.getItem('login'));
    //     console.log('login done')
    // },[logedin])
    // useEffect(()=>{
    // if(logedin)
    // {   console.log('login success')
    //     navigate('/');
    // }
    // else{console.log('Not login')
    //     navigate('/login');
    // }
    // },[logedin])
   
    if(logedin || login_stat)
    {
        // {console.log('1st',localStorage.getItem('login'))
        //  console.log('logedin',logedin)
        // }
      return (
        
        <div className="App">
          {/* {<redirect to='/'/>} */}
          {/* <Context> */}
          <Master_Layout/>
          {/* <Master_Layout_Mentor/> */}
          {/* </Context> */}
        </div>
      );
    }
    else{
      return(
        <div className="App">
          {/* {<Navigate to='/login'/>} */}
        {/* <Context> */}
          {/* <Login_Layout/> */}
          <Login/>
          {/* <ForgetPassword/> */}
          {/* <Register/> */}

        {/* </Context> */}
        </div>
      )
    }

    // return (
        
    //     <div className="App">
    //       {/* {<redirect to='/'/>} */}
    //       {/* <Context> */}
    //       <Master_Layout/>
    //       {/* </Context> */}
    //     </div>
    //   );
   
}

export default Main_arch;