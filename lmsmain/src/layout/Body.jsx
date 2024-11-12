import React from 'react';
import { Outlet } from 'react-router-dom';

function Body() {
    return ( 
        <>
        {/* <h1>This is Body</h1> */}
        <Outlet/>
        </>
     );
}

export default Body;