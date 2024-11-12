import React, { useEffect, useState } from 'react';
import { Sidenav, Nav } from 'rsuite'; // Correct import
import 'rsuite/dist/rsuite.min.css'; // Ensure styles are applied
import HomeIcon from '@rsuite/icons/legacy/Home'; // Correct icon import
import FileCodeOIcon from '@rsuite/icons/legacy/FileCodeO';
import FileIcon from '@rsuite/icons/legacy/File';
import CodeIcon from '@rsuite/icons/Code';
import Button from '@mui/material/Button'; // Fix for missing Button import
import axios from 'axios';
import { api, api2 } from '../../ApiUrl/ApiUrl';
import '../../assets/css/TableStyle/TableStyle.css';
import { SubmoduleDetails } from '../Components/ForTheCoursePart/SubmoduleDetails';
import Tooltip from '@mui/material/Tooltip';


const Student_courses = () => {
  const [expand, setExpand] = useState(true);
  const [activeKey, setActiveKey] = useState('1');
  const [selectedSubModule, setSelectedSubModule] = useState(null);
  const [courseData, setCourseData] = useState()
  const [ID, setID] = useState();

  useEffect(() => {
    setID(localStorage.getItem('id'))

  }, [])


  const getData = () => {
    axios.post(`${api}/student/getCoursesModuleForStudent`, { id: ID })
      .then((Response) => {
        console.log("ressssssssssssssssssssssssssssponssssssssssseeeeeeeeeeeee", Response?.data);
        setCourseData(Response?.data?.result)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    if (ID) {
      getData();
    }
  }, [ID])



  // data

  // const data = {
  //   "message": "Batches fetched successfully.",
  //   "result": [
  //     {
  //       "contentName": "Java",
  //       "modules": [
  //         {
  //           "contentDetails": "hey  ggddfghjjhggff l064oiuytre",
  //           "contentDocPath": "Basic Introduction of Java/Basic Introduction of Java.pdf",
  //           "contentDuration": "10",
  //           "contentId": "M2",
  //           "contentName": "Java",
  //           "courseId": "C064",
  //           "courseName": "course 199",
  //           "id": 12,
  //           "moduleDuration": "14",
  //           "subModuleNm": "Basic Introduction of Java"
  //         }
  //       ]
  //     },
  //     {
  //       "contentName": "JavaScript",
  //       "modules": [
  //         {
  //           "contentDetails": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text,",
  //           "contentDocPath": "14/14.pdf",
  //           "contentDuration": "10",
  //           "contentId": "M2",
  //           "contentName": "JavaScript",
  //           "courseId": "C064",
  //           "courseName": "course 199",
  //           "id": 14,
  //           "moduleDuration": "4",
  //           "subModuleNm": "JavaScript Basic"
  //         }
  //       ]
  //     },
  //     {
  //       "contentName": "Artificial Inteligenge",
  //       "modules": [
  //         {
  //           "contentDetails": "poiuytre poiuytre",
  //           "contentDocPath": "Computer Science/Artificial Inteligenge/Basic Introduction.pdf",
  //           "contentDuration": "50",
  //           "contentId": "M3",
  //           "contentName": "Artificial Inteligenge",
  //           "courseId": "C064",
  //           "courseName": "course 199",
  //           "id": 296,
  //           "moduleDuration": "10",
  //           "subModuleNm": "Basic Introduction"
  //         },
  //         {
  //           "contentDetails": "poiuytre lkjhgf bvc",
  //           "contentDocPath": "Computer Science/Artificial Inteligenge/Begginer level .pdf",
  //           "contentDuration": "50",
  //           "contentId": "M3",
  //           "contentName": "Artificial Inteligenge",
  //           "courseId": "C064",
  //           "courseName": "course 199",
  //           "id": 297,
  //           "moduleDuration": "10",
  //           "subModuleNm": "Begginer level "
  //         }
  //       ]
  //     },
  //     {
  //       "contentName": "Data science",
  //       "modules": [
  //         {
  //           "contentDetails": "oiuytre kjhgfd new new updated keyword",
  //           "contentDocPath": null,
  //           "contentDuration": "50",
  //           "contentId": "M4",
  //           "contentName": "Data science",
  //           "courseId": "C064",
  //           "courseName": "course 199",
  //           "id": 300,
  //           "moduleDuration": "10",
  //           "subModuleNm": "Basic Introduction"
  //         },
  //         {
  //           "contentDetails": "iuytre jhgfds",
  //           "contentDocPath": null,
  //           "contentDuration": "50",
  //           "contentId": "M4",
  //           "contentName": "Data science",
  //           "courseId": "C064",
  //           "courseName": "course 199",
  //           "id": 321,
  //           "moduleDuration": "10",
  //           "subModuleNm": "Beginner level"
  //         },
  //         {
  //           "contentDetails": "oiuytrew kjhgfds mnbvc erty",
  //           "contentDocPath": "Advance Level/Advance Level.pdf",
  //           "contentDuration": "50",
  //           "contentId": "M4",
  //           "contentName": "Data science",
  //           "courseId": "C064",
  //           "courseName": "course 199",
  //           "id": 333,
  //           "moduleDuration": "3",
  //           "subModuleNm": "Advance Level"
  //         },
  //         {
  //           "contentDetails": "oiuytr kjhgf mnbvc",
  //           "contentDocPath": null,
  //           "contentDuration": "50",
  //           "contentId": "M4",
  //           "contentName": "Data science",
  //           "courseId": "C064",
  //           "courseName": "course 199",
  //           "id": 334,
  //           "moduleDuration": "4",
  //           "subModuleNm": "Advance Pro Level"
  //         },
  //         {
  //           "contentDetails": "iuytr lkjhgfd ,mnbvcx jhgfd iuyt",
  //           "contentDocPath": null,
  //           "contentDuration": "50",
  //           "contentId": "M4",
  //           "contentName": "Data science",
  //           "courseId": "C064",
  //           "courseName": "course 199",
  //           "id": 335,
  //           "moduleDuration": "4",
  //           "subModuleNm": "Data Future"
  //         },
  //         {
  //           "contentDetails": "iuytr kjhgf mnbvc iuytr",
  //           "contentDocPath": null,
  //           "contentDuration": "50",
  //           "contentId": "M4",
  //           "contentName": "Data science",
  //           "courseId": "C064",
  //           "courseName": "course 199",
  //           "id": 336,
  //           "moduleDuration": "4",
  //           "subModuleNm": "Data at baby Steps"
  //         }
  //       ]
  //     }
  //   ],
  //   "success": true
  // }

  // Function to render content based on the active key
  const renderContent = () => {
    if (selectedSubModule) {
      return <SubmoduleDetails subModule={selectedSubModule} />
    }
    return <div style={{fontWeight:"bold",fontSize:"20px",display:"flex",justifyContent:"center",alignItems:"center",marginTop:"10%"}}>Please select the content !</div>;
  };



  return (
    <div style={{ marginTop: '0px', backgroundColor: '#f2edf3', display: 'flex', height: '100vh' }}>
      {/* Sidebar Section */}
      <div style={{ width: 240, height: '100vh', overflow: 'auto' }}>
        <Sidenav expanded={expand} defaultOpenKeys={['1', '4']}>
          <Sidenav.Toggle expanded={expand} onToggle={(expanded) => setExpand(expanded)} />
          <Sidenav.Body>
            <Nav activeKey={activeKey} onSelect={setActiveKey}>
              {/* module map */}
              {courseData?.length >= 0 && courseData?.map((course, index) => (
                <Nav.Menu eventKey={index} title={course?.contentName} icon={<FileIcon />} key={index}>
                  {/* sub module map */}
                  {course?.modules?.map((subModule, subIndex) => {
                    const subModuleName = subModule?.subModuleNm || '';
                    const displayName = subModuleName.length > 10 ? `${subModuleName.slice(0, 20)}...` : subModuleName;

                    return (
                      <Nav.Item
                        eventKey={`${index}-${subIndex}`}
                        key={subIndex}
                        onSelect={() => setSelectedSubModule(subModule)}
                      >
                        <Tooltip title={subModuleName} arrow>
                          <span>{displayName}</span>
                        </Tooltip>
                      </Nav.Item>
                    );
                  })}
                </Nav.Menu>
              ))}


              {/* <Nav.Menu eventKey="3" title="Introduction to BIM" icon={<FileIcon />}>
                <Nav.Item eventKey="3-1">Introduction to BIM Day 1</Nav.Item>
                <Nav.Item eventKey="3-2">Introduction to BIM Day 2</Nav.Item>
              </Nav.Menu>
              <Nav.Menu eventKey="4" title="Autocard" icon={<FileIcon />}>
                <Nav.Item eventKey="4-1">AutoCARD Day 1</Nav.Item>
                <Nav.Item eventKey="4-2">AutoCARD Day 2</Nav.Item>
                <Nav.Item eventKey="4-2">AutoCARD Day 3</Nav.Item>
                <Nav.Item eventKey="4-2">AutoCARD Day 4</Nav.Item>
                <Nav.Item eventKey="4-2">AutoCARD Day 5</Nav.Item>
                <Nav.Item eventKey="4-2">AutoCARD Day 6</Nav.Item>
                <Nav.Item eventKey="4-2">AutoCARD Day 8</Nav.Item>
                <Nav.Item eventKey="4-2">AutoCARD Day 9</Nav.Item>
                <Nav.Item eventKey="4-2">AutoCARD Day 10</Nav.Item>
                <Nav.Item eventKey="4-2">AutoCARD Day 11</Nav.Item>
                <Nav.Item eventKey="4-2">AutoCARD Day 12</Nav.Item>
                <Nav.Item eventKey="4-2">AutoCARD Day 13</Nav.Item>
                <Nav.Item eventKey="4-2">AutoCARD Day 14</Nav.Item>
                <Nav.Item eventKey="4-2">AutoCARD Day 15</Nav.Item>
              </Nav.Menu>
              <Nav.Menu eventKey="5" title="Introduction to Revit" icon={<FileIcon />}>
                <Nav.Item eventKey="5-1">Revit Basics Day 1</Nav.Item>
                <Nav.Item eventKey="5-2">Revit Basics Day 2</Nav.Item>
                <Nav.Item eventKey="5-3">Revit Basics Day 3</Nav.Item>
              </Nav.Menu>

              <Nav.Menu eventKey="5" title="Revit architectire" icon={<FileIcon />}>
                <Nav.Item eventKey="5-1">Revit architectire Day 1</Nav.Item>
                <Nav.Item eventKey="5-2">Revit architectire Day 2</Nav.Item>
                <Nav.Item eventKey="5-3">Revit architectire Day 3</Nav.Item>
                <Nav.Item eventKey="5-3">Revit architectire Day 4</Nav.Item>
                <Nav.Item eventKey="5-3">Revit architectire Day 5</Nav.Item>
              </Nav.Menu>

              <Nav.Menu eventKey="5" title="Revit structure" icon={<FileIcon />}>
                <Nav.Item eventKey="5-1">Revit Structure Day 1</Nav.Item>
                <Nav.Item eventKey="5-2">Revit Structure Day 2</Nav.Item>
                <Nav.Item eventKey="5-3">Revit Structure Day 3</Nav.Item>
                <Nav.Item eventKey="5-3">Revit Structure Day 4</Nav.Item>
                <Nav.Item eventKey="5-3">Revit Structure Day 5</Nav.Item>
              </Nav.Menu>*/}

            </Nav>
          </Sidenav.Body>
        </Sidenav>
      </div>

      {/* Main Content Section */}
      <div style={{ flex: 1, padding: '20px', marginTop: '58px' }}>
        {renderContent()}
      </div>
    </div>
  );
};

export default Student_courses;