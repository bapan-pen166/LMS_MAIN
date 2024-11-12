import React from 'react';
import { Outlet } from 'react-router-dom';
import Login from '../pages/Login';

function Login_Layout() {
    // console.log('login',{login,setLogin});
    // let loginstatus={login};
    // let loginmethod={setLogin};
    // setLogin(true);
    return ( 
        <>
            <div>
            <Outlet />
            {/* <Login/> */}
                {/* <Outlet context={{login,setLogin}}/> */}
                {/* <Outlet context={{loginstatus,loginmethod}}/> */}
            </div>

        </>
     );
}

export default Login_Layout;