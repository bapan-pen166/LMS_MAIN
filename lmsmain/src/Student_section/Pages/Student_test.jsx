import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { api } from '../../ApiUrl/ApiUrl';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import "../../assets/css/TableStyle/TableStyle.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faSliders, faCirclePlay } from '@fortawesome/free-solid-svg-icons';

import {

  Table,

  TableBody,

  TableCell,

  TableContainer,

  TableHead,

  TableRow,

  TableSortLabel,

  TablePagination,

  TextField

} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

import { visuallyHidden } from "@mui/utils";
function descendingComparator(a, b, orderBy) {

  if (b[orderBy] < a[orderBy]) {

    return -1;

  }

  if (b[orderBy] > a[orderBy]) {

    return 1;

  }

  return 0;

}



function getComparator(order, orderBy) {

  return order === "desc"

    ? (a, b) => descendingComparator(a, b, orderBy)

    : (a, b) => -descendingComparator(a, b, orderBy);

}



function stableSort(array, comparator) {

  const stabilizedThis = array.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {

    const order = comparator(a[0], b[0]);

    if (order !== 0) return order;

    return a[1] - b[1];

  });

  return stabilizedThis.map((el) => el[0]);

}
const Student_test = () => {
  const [allTestData, setAllTestData] = useState([]);
  const [mentorEmail, setMentorEmail] = useState('');

  useEffect(() => {
    setMentorEmail(localStorage.getItem('studentEmail'));
  }, []);

  const [order, setOrder] = useState("asc");

  const [orderBy, setOrderBy] = useState("testName");

  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [searchQuery, setSearchQuery] = useState("");



  const handleRequestSort = (event, property) => {

    const isAsc = orderBy === property && order === "asc";

    setOrder(isAsc ? "desc" : "asc");

    setOrderBy(property);

  };



  const handleChangePage = (event, newPage) => {

    setPage(newPage);

  };



  const handleChangeRowsPerPage = (event) => {

    setRowsPerPage(parseInt(event.target.value, 10));

    setPage(0);

  };



  const handleSearchChange = (event) => {

    setSearchQuery(event.target.value);

  };



  const filteredData = allTestData.filter((testDetails) =>

    testDetails.testName.toLowerCase().includes(searchQuery.toLowerCase())

  );
  const sortedData = stableSort(filteredData, getComparator(order, orderBy));
  const getAllTestData = () => {
    axios.post(`${api}/student/getStudTests`, { email: mentorEmail })
      .then((response) => {
        console.log("data,", response.data.data);
        setAllTestData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    if (mentorEmail) {
      getAllTestData();
    }
  }, [mentorEmail]);

  const getTestStatus = (startDate, startTime, endDate, endTime) => {
    // Parse the dates and times into valid Date objects
    const currentTime = new Date();
    const testStart = new Date(`${startDate}T${startTime}:00`); // Added "T" for proper ISO format
    const testEnd = new Date(`${endDate}T${endTime}:00`);

    // Compare the current time with the test start and end times
    console.log("currentTime", currentTime)
    console.log("testStart", testStart)
    if (currentTime < testStart) {
      return "notStarted";
    } else if (currentTime >= testStart && currentTime <= testEnd) {
      return "inProgress";
    } else {
      return "ended";
    }
  };



  return (
    <div >
      <div className='container-fluid'>
        {/* <div className='col-md-12 col-lg-12 headLineBox d-flex justify-content-start'>
          <h4>Scheduled test</h4>
        </div> */}
        <div className="col-md-12 col-lg-12 col-sm-12 " >
          <div className="box-shadow p-2 rounded" >
            <table className="custom-table table-bordered pt-1 d-none" style={{ marginTop: "20px" }}>
              <thead className="custom-thead " style={{ position: 'sticky', top: -2, zIndex: 3 }}>
                <tr>
                  <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Test Name</th>
                  <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Start Date</th>
                  <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>End Date</th>
                  <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Start Time</th>
                  <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>End time</th>
                  <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Total Time</th>
                  <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Marks</th>
                  <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Marks obtained</th>
                  <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Action</th>
                </tr>
              </thead>
              <tbody style={{ zIndex: 1 }} className="custom-tbody">
                {allTestData.map(testDetails => {
                  const { testName, startDate, startTime, endDate, endTime, totalTime, id, test_allowed, totalMarks, marksObtained } = testDetails;
                  const testStatus = getTestStatus(startDate, startTime, endDate, endTime);
                  const testStartTime = new Date(`${startDate} ${startTime}`).toLocaleString();

                  return (
                    <tr key={testName}>
                      <td>{testName}</td>
                      <td>{startDate}</td>
                      <td>{endDate}</td>
                      <td>{startTime}</td>
                      <td>{endTime}</td>
                      <td>{totalTime}</td>
                      <td>{totalMarks}</td>
                      <td>{marksObtained != null ? marksObtained : 'Not Yet'}</td>

                      <td className="text-center align-middle">
                        {testStatus === "notStarted" ? (
                          <p>You can open the test after {testStartTime}</p>
                        ) : (
                          <p>
                            {test_allowed === true ? <Button variant="text" disabled={testStatus === "ended"}>
                              <Link to={`/student-test-details/${id}`}>
                                Start test
                              </Link>
                            </Button> : <p>You have already given the test</p>}
                          </p>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <TextField

              variant="outlined"

              fullWidth

              label="Search Tests"

              value={searchQuery}

              onChange={handleSearchChange}

              InputProps={{

                endAdornment: <SearchIcon />,

              }}

              InputLabelProps={{

                style: { top: '-5px' }

              }}

              style={{ marginBottom: "20px", width: "200px" }}

            />

            <TableContainer>

              <Table className="table-bordered pt-1">

                <TableHead className="bg-theme-green text-white p-0" style={{ position: "sticky", top: -2, zIndex: 3 }}>

                  <TableRow>

                    {[

                      { id: "testName", label: "Test Name" },

                      { id: "startDate", label: "Start Date" },

                      { id: "endDate", label: "End Date" },

                      { id: "startTime", label: "Start Time" },

                      { id: "endTime", label: "End Time" },

                      { id: "totalTime", label: "Total Time" },

                      { id: "marks", label: "Marks" },

                      { id: "marksObtained", label: "Marks Obtained" },

                      { id: "action", label: "Action" },

                    ].map((column) => (

                      <TableCell

                        key={column.id}



                        className='p-1 text-white'

                      >

                        <TableSortLabel

                          // active={orderBy === column.id}

                          direction={orderBy === column.id ? order : "asc"}

                          onClick={(event) => handleRequestSort(event, column.id)}

                        >

                          {column.label}

                          {orderBy === column.id ? (

                            <span style={visuallyHidden}>{order === "desc" ? "sorted descending" : "sorted ascending"}</span>

                          ) : null}

                        </TableSortLabel>

                      </TableCell>

                    ))}

                  </TableRow>

                </TableHead>

                <TableBody>

                  {sortedData

                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

                    .map((testDetails) => {

                      const { testName, startDate, startTime, endDate, endTime, totalTime, id, test_allowed, totalMarks, marksObtained } = testDetails;

                      const testStatus = getTestStatus(startDate, startTime, endDate, endTime);

                      const testStartTime = new Date(`${startDate} ${startTime}`).toLocaleString();



                      return (

                        <TableRow hover key={id}>

                          <TableCell>{testName}</TableCell>

                          <TableCell>{startDate}</TableCell>

                          <TableCell>{endDate}</TableCell>

                          <TableCell>{startTime}</TableCell>

                          <TableCell>{endTime}</TableCell>

                          <TableCell>{totalTime}</TableCell>

                          <TableCell>{totalMarks}</TableCell>

                          <TableCell>{marksObtained!=null?marksObtained:'Not Yet'}</TableCell>

                          <TableCell className="text-center align-middle p-1">

                            {testStatus === "notStarted" ? (

                              <p>You can open the test after {testStartTime}</p>

                            ) : (

                              <p>

                                {test_allowed ? (

                                  <Button variant="contained" className='btn p-0 px-1' color="primary" disabled={testStatus === "ended"}>

                                    <FontAwesomeIcon icon={faCirclePlay} />

                                    <Link to={`/student-test-details/${id}`} style={{ textDecoration: "none", color: "black", padding: '2px' }}>

                                      Start Test

                                    </Link>

                                  </Button>

                                ) : (

                                  <p>You have already given the test</p>

                                )}

                              </p>

                            )}

                          </TableCell>

                        </TableRow>

                      );

                    })}

                </TableBody>

              </Table>

            </TableContainer>

            <TablePagination

              rowsPerPageOptions={[5, 10, 25]}

              component="div"

              count={filteredData.length}

              rowsPerPage={rowsPerPage}

              page={page}

              onPageChange={handleChangePage}

              onRowsPerPageChange={handleChangeRowsPerPage}

            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Student_test;
