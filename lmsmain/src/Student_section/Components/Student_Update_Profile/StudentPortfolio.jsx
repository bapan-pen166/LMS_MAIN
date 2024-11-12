import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { api } from '../../../ApiUrl/ApiUrl';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Page1 from '../Portfolio/Page1';
import Page2 from '../Portfolio/Page2';
import Page3 from '../Portfolio/Page3';

const StudentPortfolio = () => {
  const [data, setData] = useState([]);
  const [studentEmail, setStudentEmail] = useState();
  const [firstName,setFirstName] = useState()
  const [lastName,setLastName] = useState()
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(3); 

  useEffect(() => {
    const email = localStorage.getItem('studentEmail');
    setFirstName(localStorage.getItem('firstName'));
    setLastName(localStorage.getItem('lastName'));
    setStudentEmail(email);
  }, []);

  const getDetails = (pageNum) => {
    axios.post(`${api}/portfolio/getPortfolioPages`, {
      studentEmail: studentEmail,
      firstName : firstName,
      lastName : lastName,
      pageNo: pageNum,
    })
      .then((response) => {
        console.log(`Page ${pageNum} Response:`, response?.data?.result);
        setData(response?.data?.result);
      })
      .catch((error) => {
        console.error(`Error fetching page ${pageNum} details:`, error);
      });
  };

  useEffect(() => {
    if (studentEmail) {
      getDetails(page); 
    }
  }, [studentEmail, page]);

  const handlePageChange = (event, value) => {
    setPage(value); 
  };

  const renderPageComponent = () => {
    switch (page) {
      case 1:
        return <Page1 data={data} firstName={firstName} lastName={lastName}/>;
      case 2:
        return <Page2 data={data} firstName={firstName} lastName={lastName} studentEmail={studentEmail}/>;
      case 3:
        return <Page3 data={data} firstName={firstName} lastName={lastName} studentEmail={studentEmail}/>  
      default:
        return <p>No data available for this page.</p>;
    }
  };

  return (
    <div>
      {renderPageComponent()}

      <Stack spacing={2} sx={{ marginTop: '20px', alignItems: 'center',position:"fixed",display:"flex",right:"35%",bottom:"30px" }}>
        <Pagination
          count={totalPages}
          page={page}
          color="secondary"
          onChange={handlePageChange}
          size="large"
        />
      </Stack>
    </div>
  );
};

export default StudentPortfolio;
