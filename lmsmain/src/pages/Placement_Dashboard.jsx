import Students_PlacedPercent_Chart from "../components/Placement/Students_PlacedPercent_Chart";
import Placement_Ratio from "../components/Placement/Placement_Ratio";
import CourseStudentCount from "../components/Placement/CourseStudentCount";
import PlacementAndGrade from "../components/Placement/PlacementAndGrade";
import CourseVsPlacementRatio from "../components/Placement/CourseVsPlacementRatio";
import PlacementsCountVsCompany from "../components/Placement/PlacementsCountVsCompany";
import PlacementCountPreYear from "../components/Placement/PlacementCountPreYear";
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
        <div style={{ marginTop: "58px" }} className='row g-3'>
            <div className="row">
                <div className="container-fluid">
                    <div className=' col-md-12 col-lg-12  headLineBox d-flex justify-content-start' >
                        <h4>Placement Dashboard</h4>
                    </div>
                    <div className="row mt-2 mb-2" >
                        <div className='col-md-12 p-2 d-flex justify-content-around'>
                            {/* <div style={{minHeight:'150px', minWidth:'150px',background:'#bbf7d0',borderRadius:'20px',textAlign:'center'}}>
                                <div style={{paddingTop:'10px'}}>
                                <span style={{fontSize:'13px',fontWeight:'bold'}}>Average Students Placed</span>
                                <p style={{fontSize:'40px',fontWeight:'bold'}}>247</p>
                                </div>
                            </div> */}
                            <div style={{
                                minHeight: '150px',
                                maxWidth: '200px', 
                                background: '#89CFF0',
                                borderRadius: '20px',
                                textAlign: 'center',
                                wordBreak: 'break-word', 
                            }}>
                                <div style={{ paddingTop: '10px' }}>
                                    <span style={{ fontSize: '16px', fontWeight: 'bold',fontFamily: 'Georgia, serif',padding:'10px'}}>Average Students Placed</span>
                                    <p style={{ fontSize: '40px', fontWeight: 'bold' }}>{placementDetails?.averagePlaced}</p>
                                </div>
                            </div>
                            <div style={{
                                minHeight: '150px',
                                maxWidth: '200px', 
                                background: '#A1CAF1',
                                borderRadius: '20px',
                                textAlign: 'center',
                                wordBreak: 'break-word', 
                            }}>
                                <div style={{ paddingTop: '10px' }}>
                                    <span style={{ fontSize: '16px', fontWeight: 'bold',fontFamily: 'Georgia, serif'}}>Total Placement Current Year</span>
                                    <p style={{ fontSize: '40px', fontWeight: 'bold' }}>{placementDetails?.totalNoOfPlacement}</p>
                                </div>
                            </div>
                            <div style={{
                                minHeight: '150px',
                                maxWidth: '200px', 
                                background: '#95C1E6',
                                borderRadius: '20px',
                                textAlign: 'center',
                                wordBreak: 'break-word', 
                            }}>
                                <div style={{ paddingTop: '10px' }}>
                                    <span style={{ fontSize: '16px', fontWeight: 'bold',fontFamily: 'Georgia, serif'}}>Company Reached for Placement till date</span>
                                    <p style={{ fontSize: '40px', fontWeight: 'bold' }}>{placementDetails?.companyCountTillDate}</p>
                                </div>
                            </div>
                            {/* <div style={{minHeight:'150px', minWidth:'150px',background:'#fef9c3',borderRadius:'20px',textAlign:'center'}}>
                                <div style={{paddingTop:'10px'}}>
                                <span style={{fontSize:'13px',fontWeight:'bold'}}>Company Reached for Placement till date</span>
                                <p style={{fontSize:'40px',fontWeight:'bold'}}>13</p>
                                </div>
                            </div> */}
                            <div style={{
                                minHeight: '150px',
                                maxWidth: '200px', 
                                background: '#99BADD',
                                borderRadius: '20px',
                                textAlign: 'center',
                                wordBreak: 'break-word', 
                            }}>
                                <div style={{ paddingTop: '10px' }}>
                                    <span style={{ fontSize: '16px', fontWeight: 'bold',fontFamily: 'Georgia, serif'}}>Total Company Reached Current Year</span>
                                    <p style={{ fontSize: '40px', fontWeight: 'bold' }}>{placementDetails?.companyListCurrentYear}</p>
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
                        </div>
                        <div className="col-md-4 pt-5 col-sm-2">
                            <div  className="headLineBox">
                                <h4>Student's Placed</h4>
                            </div>
                            <div  >
                                <Students_PlacedPercent_Chart  avgOfPlacedStudent={placementDetails?.avgOfPlacedStudent}/>
                            </div>
                           
                            
                        </div>
                        <div className="col-md-4 pt-5 col-sm-4">
                            <div  className="headLineBox">
                                <h4>Placement Ratio by Year</h4>
                            </div>
                            <div  >
                            <Placement_Ratio placementRatioYear={placementDetails?.placementRatioYear} placementRatioPercent={placementDetails?.placementRatioPercent} />
                            </div>
                           
                            
                        </div>
                        
                        <div className="col-md-4 pt-5 col-sm-4">
                            <div  className="headLineBox">
                                <h4>Student's count by Grade and Placement</h4>
                            </div>
                            <div  >
                            <PlacementAndGrade studentsCountByGradeAndPlacement={placementDetails?.studentsCountByGradeAndPlacement}/>
                            </div>
                           
                            
                        </div>
                        <div className="col-md-6 pt-5 ">
                            <div  className="headLineBox">
                                <h4>Student's count By Year and Placement</h4>
                            </div>
                            <div  >
                            <PlacementCountPreYear yearList={placementDetails?.yearList} placed={placementDetails?.placed} notPlaced={placementDetails?.notPlaced}/>
                            </div>
                           
                            
                        </div>
                        <div className="col-md-6 pt-5 ">
                            <div  className="headLineBox">
                                <h4>Student's count and Placement Ratio by Course</h4>
                            </div>
                            <div  >
                            <CourseVsPlacementRatio courseList={placementDetails?.courseList} TotalStudentCountINCourse={placementDetails?.TotalStudentCountINCourse} AvgStudentPlacedInCourse={placementDetails?.AvgStudentPlacedInCourse}/>
                            </div>
                           
                            
                        </div>
                        <div className="col-md-6 pt-5 ">
                            <div  className="headLineBox">
                                <h4>Placement Count by Company Name</h4>
                            </div>
                            <div className="pt-5" >
                            <PlacementsCountVsCompany companyData={placementDetails?.companyData}/>
                            </div>
                           
                            
                        </div>
                        {/* <div className="col-md-12 pt-5 d-flex justify-content-center">
                            <CourseStudentCount/>
                        </div> */}
                        {/* <div className="col-md-12 pt-5 d-flex justify-content-center">
                            <PlacementAndGrade/>
                        </div> */}
                        {/* <div className="col-md-12 pt-5 d-flex justify-content-center">
                            <CourseVsPlacementRatio/>
                        </div> */}
                        {/* <div className="col-md-12 pt-5 d-flex justify-content-center">
                            <PlacementsCountVsCompany/>
                        </div> */}
                    </div>
                    
                </div>
            </div>
        </div>
        </>
    )
}