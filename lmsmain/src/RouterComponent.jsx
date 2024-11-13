import React, { useState, useEffect } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Overview from './pages/Overview';
import Login from './pages/Login';
import Test from './pages/Test';
import Student_List from './pages/Student_List';
import Meeting from './pages/Meeting';
import Mentor_Overview from './Mentor_section/Mentor_Overview';
import App from './App';
import Login_new from './pages/Login_new.jsx';
const RouterComponent = () => {
  const [defaultRoute, setDefaultRoute] = useState(null);
  

  useEffect(() => {
    const userType = localStorage.getItem("userType");
    console.log("User Type:", userType);

    if (userType === "Admin") {
      setDefaultRoute(<Route index element={<Overview />} />);
    } else if (userType === "Mentor") {
      setDefaultRoute(<Route index element={<Mentor_Overview />} />);
    } else {
      setDefaultRoute(<Route index element={<Login_new />} />);
    }
  }, []);

  if (!defaultRoute) return null; // Wait for the userType to be set

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<App />}>
        {defaultRoute}
        <Route path='Login_new' element={<Login_new />} />
        <Route path='test' element={<Test />} />
        <Route path='Student-List' element={<Student_List />} />
        <Route path='meeting' element={<Meeting />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default RouterComponent;
