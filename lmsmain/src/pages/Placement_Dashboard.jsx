import Students_PlacedPercent_Chart from "../components/Placement/Students_PlacedPercent_Chart";
import Placement_Ratio from "../components/Placement/Placement_Ratio";
import CourseStudentCount from "../components/Placement/CourseStudentCount";
import PlacementAndGrade from "../components/Placement/PlacementAndGrade";
import CourseVsPlacementRatio from "../components/Placement/CourseVsPlacementRatio";
import PlacementsCountVsCompany from "../components/Placement/PlacementsCountVsCompany";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PlacementCountPreYear from "../components/Placement/PlacementCountPreYear";
import { faLineChart, faCheckSquare, faBuilding } from '@fortawesome/free-solid-svg-icons';
import { useState,useEffect } from "react";
import PageNotFound from "../ErrorPage/PageNotFound";
import { api2 } from "../ApiUrl/ApiUrl";
import axios from "axios";

export default function Placement_Dashboard(){
    const [adminEmail,setAdminEmail]=useState('');
    const [userType ,setUserType]=useState('');
    const [placementDetails,setPlacementDetails]=useState({});
    const [isLoading, setIsLoading] = useState(true); 


    const handlePlacementNo = (email) => {
        axios.post(`${api2}/placementDrive/getTotalPlacedStudentListForCurrentYear`, { adminEmail:email  })
            .then((Response) => {
                // console.log("today's meetings : ",Response?.data?.result);
                setPlacementDetails(prevDetails => ({
                    ...prevDetails,
                    totalNoOfPlacement: Response?.data?.result
                }));
            })
            .catch((error) => {
                console.log(error);
            })
    }
    const handlePlacementCompanyNos = () => {
        axios.post(`${api2}/placementDrive/getCompanyListCurrentAndTillDate`, {})
            .then((Response) => {
                // console.log("today's meetings : ",Response?.data?.result);
                setPlacementDetails(prevDetails => ({
                    ...prevDetails,
                    companyCountTillDate: Response?.data?.companyCountTillDate,
                    companyListCurrentYear: Response?.data?.companyListCurrentYear
                }));
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleStudentPlaced = () => {
        axios.post(`${api2}/placementDrive/getTotalStudentPlacedAvgCurrentYear`, {})
            .then((Response) => {
                // console.log("today's meetings : ",Response?.data?.result);
                setPlacementDetails(prevDetails => ({
                    ...prevDetails,
                    avgOfPlacedStudent: Response?.data?.avgOfPlacedStudent,
                    
                }));
            })
            .catch((error) => {
                console.log(error);
            })
    }
    const handlePlacementRatioYear = () => {
        axios.post(`${api2}/placementDrive/getPlacementRatioByYear`, {})
            .then((Response) => {
                // console.log("today's meetings : ",Response?.data?.result); 
                setPlacementDetails(prevDetails => ({
                    ...prevDetails,
                    placementRatioYear: Response?.data?.yearList,
                    placementRatioPercent: Response?.data?.avgOfPlacedStudent
                }));
            })
            .catch((error) => {
                console.log(error);
            })
    }
    const handleStudentsCountByGradeAndPlacement = () => {
        axios.post(`${api2}/placementDrive/getPlacementRatioByGrades`, {})
            .then((Response) => {
                // console.log("today's meetings : ",Response?.data?.result); 
                setPlacementDetails(prevDetails => ({
                    ...prevDetails,
                    studentsCountByGradeAndPlacement: Response?.data?.gradeCounts
                    // placementRatioPercent: Response?.data?.avgOfPlacedStudent
                }));
            })
            .catch((error) => {
                console.log(error);
            })
    }
    const handleStudentsByplacedandNotPlaced = () => {
        axios.post(`${api2}/placementDrive/getPlacementCountByYear`, {})
            .then((Response) => {
                // console.log("today's meetings : ",Response?.data?.result); 
                setPlacementDetails(prevDetails => ({
                    ...prevDetails,
                    yearList: Response?.data?.yearList,
                    placed: Response?.data?.placed,
                    notPlaced: Response?.data?.notPlaced,
                    // placementRatioPercent: Response?.data?.avgOfPlacedStudent
                }));
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleStudentsPlacedByCompanyName = () => {
        axios.post(`${api2}/placementDrive/getPlacementCountByCompany`, {})
            .then((Response) => {
                // console.log("today's meetings : ",Response?.data?.result); 
                setPlacementDetails(prevDetails => ({
                    ...prevDetails,
                    companyData: Response?.data?.result,
                    // placed: Response?.data?.,
                    // notPlaced: Response?.data?.notPlaced,
                    // placementRatioPercent: Response?.data?.avgOfPlacedStudent
                }));
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleStudentsRatioAndStudentsCount = () => {
        axios.post(`${api2}/placementDrive/getPlacementAvgByCourse`, {})
            .then((Response) => {
                // console.log("today's meetings : ",Response?.data?.result); 
                setPlacementDetails(prevDetails => ({
                    ...prevDetails,
                    // companyData: Response?.data?.result,
                    courseList: Response?.data?.courseList,
                    TotalStudentCountINCourse: Response?.data?.TotalStudentCountINCourse,
                    AvgStudentPlacedInCourse: Response?.data?.AvgStudentPlacedInCourse
                }));
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleAvgStudentPlaced = () => {
        axios.post(`${api2}/placementDrive/getAvgPlacedByFinancialYear`, {})
            .then((Response) => {
                // console.log("today's meetings : ",Response?.data?.result); 
                setPlacementDetails(prevDetails => ({
                    ...prevDetails,
                    // companyData: Response?.data?.result,
                    averagePlaced: Response?.data?.averagePlaced,
                    // TotalStudentCountINCourse: Response?.data?.TotalStudentCountINCourse,
                    // AvgStudentPlacedInCourse: Response?.data?.AvgStudentPlacedInCourse
                }));
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        const type = localStorage.getItem('userType');
        setUserType(type);
        setIsLoading(false);
        setAdminEmail(localStorage.getItem('adminEmail'))
        handlePlacementNo(localStorage.getItem('adminEmail'))
        handlePlacementCompanyNos()
        handleStudentPlaced()
        handlePlacementRatioYear()
        handleStudentsCountByGradeAndPlacement()
        handleStudentsByplacedandNotPlaced()
        handleStudentsPlacedByCompanyName()
        handleStudentsRatioAndStudentsCount()
        handleAvgStudentPlaced()
      }, []);




    if(isLoading){
        return <div>loading...</div>;
    }
    
 if (userType !== 'Admin') {
    return <PageNotFound />
  }
    return(
        <>
        <div className='row g-3'>
            <div className="row">
                <div className="container-fluid">
                    <div className=' col-md-12 col-lg-12  rounded bg-theme text-white d-flex justify-content-start' >
                        <h4>Placement Dashboard</h4>
                    </div>
                    <div className="row mt-2 mb-2" >
                            {/* <div style={{minHeight:'150px', minWidth:'150px',background:'#bbf7d0',borderRadius:'20px',textAlign:'center'}}>
                                <div style={{paddingTop:'10px'}}>
                                <span style={{fontSize:'13px',fontWeight:'bold'}}>Average Students Placed</span>
                                <p style={{fontSize:'40px',fontWeight:'bold'}}>247</p>
                                </div>
                            </div> */}
                            <div className="col-lg-3 col-md-3 col-sm-6">
                                <div className="mb-1">
                                    <div className="d-flex justify-content-between align-items-center p-3 hover-effect bg-opacity-15 rounded-3 bg-green-light" style={{borderRadius: '10px',}}>
                                        <div className="icon-lg icon-rounded-circle bg-green text-white" style={{padding:"10px"}}>
                                            <FontAwesomeIcon icon={faLineChart} />
                                        </div>
                                        <div className="ms-4">
                                            <h5 className="purecounter fw-bold pb-2 text-center" style={{ fontSize: "3vw" }}>{placementDetails?.averagePlaced}</h5>
                                            <p className="mb-0 mt-2 fw-light font-12 text-center">Average <br></br>Students Placed</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-3 col-sm-6">
                                <div className="d-flex  justify-content-between align-items-center p-3 hover-effect bg-opacity-15 rounded-3 bg-primary-blue-light" style={{borderRadius: '10px',}}>
                                    <div className="icon-lg icon-rounded-circle bg-blue text-white" style={{padding:"10px"}}>
                                            <FontAwesomeIcon icon={faCheckSquare} />
                                    </div>
                                    <div className="ms-4">
                                            <h5 className="purecounter fw-bold pb-2 text-center" style={{ fontSize: "3vw" }}>{placementDetails?.totalNoOfPlacement}</h5>
                                            <p className="mb-0 mt-2 fw-light font-12 text-center">Total Placement <br></br>Current Year</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-6">
                                <div className="d-flex  justify-content-between align-items-center p-3 hover-effect bg-opacity-15 rounded-3 bg-purple-light" style={{borderRadius: '10px',}}>
                                    <div className="icon-lg icon-rounded-circle bg-purple-dark text-white" style={{padding:"10px"}}>
                                            <FontAwesomeIcon icon={faBuilding} />
                                    </div>
                                    <div className="ms-4">
                                            <h5 className="purecounter fw-bold pb-2 text-center" style={{ fontSize: "3vw" }}>{placementDetails?.companyCountTillDate}</h5>
                                            <p className="mb-0 mt-2 fw-light font-12 text-center">Company Reached <br></br> for Placement till date</p>
                                    </div>
                                </div>
                            </div>

                    
                            {/* <div style={{minHeight:'150px', minWidth:'150px',background:'#fef9c3',borderRadius:'20px',textAlign:'center'}}>
                                <div style={{paddingTop:'10px'}}>
                                <span style={{fontSize:'13px',fontWeight:'bold'}}>Company Reached for Placement till date</span>
                                <p style={{fontSize:'40px',fontWeight:'bold'}}>13</p>
                                </div>
                            </div> */}
                            <div className="col-lg-3 col-md-3 col-sm-6">
                                <div className="d-flex  justify-content-between align-items-center p-3 hover-effect bg-opacity-15 rounded-3 bg-warning-light" style={{borderRadius: '10px',}}>
                                    <div className="icon-lg icon-rounded-circle bg-warning-dark text-white" style={{padding:"10px"}}>
                                            <FontAwesomeIcon icon={faBuilding} />
                                    </div>
                                    <div className="ms-4">
                                            <h5 className="purecounter fw-bold pb-2 text-center" style={{ fontSize: "3vw" }}>{placementDetails?.companyListCurrentYear}</h5>
                                            <p className="mb-0 mt-2 fw-light font-12 text-right">Total Company Reached Current Year</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                            {/* <div style={{minHeight:'150px', minWidth:'150px',background:'#fee2e2',borderRadius:'20px',textAlign:'center'}}>
                                <div style={{paddingTop:'10px'}}>
                                <span style={{fontSize:'13px',fontWeight:'bold'}}>Total Company Reached Current Year</span>
                                <p style={{fontSize:'40px',fontWeight:'bold'}}>11</p>
                                </div>
                            </div> */}
                            {/* <div style={{minHeight:'150px', minWidth:'150px',background:'#ccfbf1',borderRadius:'20px',textAlign:'center'}}>
                                <div style={{paddingTop:'10px'}}>
                                <span style={{fontSize:'13px',fontWeight:'bold'}}>Test Score</span>
                                <p style={{fontSize:'40px',fontWeight:'bold'}}>{testScore}%</p>
                                </div>
                            </div> */}
                    <div className="row mt-2 mb-2" >
                        <div className="col-md-6 pt-5 col-sm-2">
                             <div  className="headLineBox rounded-top py-1">
                                <h5>Student's Placed</h5>
                            </div>
                            <div  >
                                <Students_PlacedPercent_Chart  avgOfPlacedStudent={placementDetails?.avgOfPlacedStudent}/>
                            </div>
                           
                            
                        </div>
                        <div className="col-md-6 pt-5 col-sm-4">
                            <div  className="headLineBox rounded-top py-1">
                                <h5>Placement Ratio by Year</h5>
                            </div>
                            <div className="box-shadow">
                            <Placement_Ratio placementRatioYear={placementDetails?.placementRatioYear} placementRatioPercent={placementDetails?.placementRatioPercent} />
                            </div>
                           
                            
                        </div>
                    </div>
                    <div className="row mt-2 mb-2" > 
                        <div className="col-md-6 pt-5 col-sm-4">
                            <div  className="headLineBox rounded-top py-1">
                                <h5>Student's count by Grade and Placement</h5>
                            </div>
                            <div className="box-shadow" >
                            <PlacementAndGrade studentsCountByGradeAndPlacement={placementDetails?.studentsCountByGradeAndPlacement}/>
                            </div>
                           
                            
                        </div>
                        <div className="col-md-6 pt-5 ">
                            <div  className="headLineBox rounded-top py-1">
                                <h5>Student's count By Year and Placement</h5>
                            </div>
                            <div className="box-shadow" >
                            <PlacementCountPreYear yearList={placementDetails?.yearList} placed={placementDetails?.placed} notPlaced={placementDetails?.notPlaced}/>
                            </div>
                           
                            
                        </div>
                    </div>
                    <div className="row mt-2 mb-2" >
                        <div className="col-md-6 pt-5 ">
                            <div  className="headLineBox rounded-top py-1">
                                <h5>Student's count and Placement Ratio by Course</h5>
                            </div>
                            <div  className="box-shadow" >
                            <CourseVsPlacementRatio courseList={placementDetails?.courseList} TotalStudentCountINCourse={placementDetails?.TotalStudentCountINCourse} AvgStudentPlacedInCourse={placementDetails?.AvgStudentPlacedInCourse}/>
                            </div>
                           
                            
                        </div>
                        <div className="col-md-6 pt-5 ">
                            <div  className="headLineBox rounded-top py-1">
                                <h5>Placement Count by Company Name</h5>
                            </div>
                            <div className="pt-5 box-shadow" >
                            <PlacementsCountVsCompany companyData={placementDetails?.companyData}/>
                            </div>
                           
                            
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
        </>
    )
}