import { useState,useEffect } from "react";
import PageNotFound from '../../ErrorPage/PageNotFound';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { CiCirclePlus } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { api2 } from "../../ApiUrl/ApiUrl";
import axios from "axios";
import '../../assets/css/Custom_Global_Style/Global.css';

export default function Placement_Drives(){

    const [userType, setUserType] = useState('');
    const [placementEmail,setPlacementEmail]=useState('');
    useEffect(() => {
        const type = localStorage.getItem('userType');
        setUserType(type);
      }, [])

      const[allPlacement,setallPlacement]=useState([]);

      const getALLplacementDetails = (email) => {
        axios.post(`${api2}/placementDrive/getAppliedStudentList`,{email:email})
          .then((response) => {
            console.log("get all placement details", response?.data?.result);
            setallPlacement(response?.data?.data)
            // setSearchres(response?.data?.result)
          })
          .catch((error) => {
            console.log(error)
          })
      }
    
      useEffect(() => {
        const email=localStorage.getItem('placementEmail')
        getALLplacementDetails(email)
        setPlacementEmail(email)

      }, [])
      const viewDoc = (foldername) => {
        
        window.open(`${api2}/static/studentResume/${foldername}`);
       
      };

      

      const handlerounds=(index,e)=>{
        let rounds=e.target.value;
        if(rounds)
            {
                const updatedLeaveAll = allPlacement.map((row, i) =>
                    i === index ? { ...row, roundsCleared: rounds } : row
                  );
                  setallPlacement(updatedLeaveAll);  
            }
          
    }

    const handlePlacementStatus=(index,e)=>{
      let status=e.target.value;
      if(status)
          {
              const updatedStatus = allPlacement.map((row, i) =>
                  i === index ? { ...row, status: status } : row
                );
                setallPlacement(updatedStatus);  
          }
        
  }

  const [updatedStatus,setUpdatedStatus]=useState([]);

  const handleUpdatedStatus=(id,status,rounds)=>{
    axios.post(`${api2}/placementDrive/placementDriveProcess`,{id:id,status:status,roundsCleared:rounds})
    .then((response) => {
      console.log("get all placement details", response?.data?.result);
      getALLplacementDetails(placementEmail)
      // setSearchres(response?.data?.result)
    })
    .catch((error) => {
      console.log(error)
    })
  }

      if (userType !== 'Placement') {
        return <PageNotFound />
      }
    return(
        <>
            <div className='row ' style={{ marginTop: '58px' }} >
        <div className='row '>
          <div className='container-fluid'>
            <div className=' col-md-12 col-lg-12 col-sm-12 headLineBox d-flex justify-content-start'>
              <h4>Company's List</h4>
            </div>
          </div>
        </div>
        <div className="row" style={{ marginTop: '20px' }}>
          <div className="row">
            <div className="col-md-6">
              <div className="d-flex align-items-center">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search here"
                //   value={searchquery}
                //   onChange={inputChange}
                />
                <CiSearch className="search-btn" />
              </div>
            </div>
            <div className=" col-md-6 col-sm-6 col-lg-6">

              {/* <Stack spacing={2} direction="row" sx={{ justifyContent: 'flex-end' }}>

                <Button variant="contained" onClick={() => {
                //   handleAddBatchesShow()
                }}>Add NEW COMPANY <CiCirclePlus size={20} /></Button>

              </Stack> */}
            </div>
          </div>

          <div className="col-md-12 col-lg-12 col-sm-12">
            <div className="table-container" style={{ height: '90vh', overflowY: 'auto' }}>
              <table className="table table-bordered pt-1" >
                <thead style={{ position: 'sticky', top: -2, zIndex: 3 }}>
                  <tr>
                    <th>Sr No</th>
                    <th>Student Name</th>
                    <th>Batch</th>
                    {/* <th>Designation</th> */}
                    {/* <th>Industry Type</th> */}
                    {/* <th>Employement Type</th> */}
                    <th>Graduation Year</th>
                    {/* <th >Date Of Arrival</th> */}
                    <th>Graduation %/CGPA</th>
                    <th>Assignment Avg %</th>
                    <th>Test Avg %</th>
                    <th>Resume</th>
                    <th>Rounds Cleared</th>
                    <th>Interview Status</th>
                    <th >Action</th>
                  </tr>
                </thead>

                <tbody style={{ zIndex: 1 }}>
                  {allPlacement?.map((allPlacement,index)=>{
                    return(
                        <tr>
                            <th>{index +1}</th>
                            <th>{allPlacement?.studentName}</th>
                            <th>{allPlacement?.batchName}</th>
                            <th>{allPlacement?.passOutYearGrad}</th>
                            <th>{allPlacement?.graduationInstituteGpaorCgpa}</th>
                            <th>{allPlacement?.assignmentAvgScore?.averageAssignmentMarks}</th>
                            <th>{allPlacement?.testAvgScore[0]?.averageTestMarks}</th>
                            <th><Button onClick={()=>viewDoc(allPlacement?.resume_cv)} variant="outlined">View</Button></th>
                            <th>
                                <select
                                className="form-select"
                                name='roundsCleared'
                                value={ allPlacement?.roundsCleared }
                                onChange={(e) => handlerounds(index,e)}
                                aria-label="Rounds Clear"
                            >
                                <option value="">Select</option>
                                <option value="0">Not Yet</option>
                                <option value="1">Round 1 cleared</option>
                                <option value="2">Round 2 cleared</option>
                                <option value="3">Round 3 cleared</option>
                                <option value="4">Round 4 cleared</option>
                            </select>
                            </th>
                            <th>
                                <select
                                    className="form-select"
                                    name='status'
                                    value={allPlacement?.status }
                                    onChange={(e) => handlePlacementStatus(index,e)}
                                    aria-label="Interview Status"
                                >
                                    <option value="">Select</option>
                                    <option value="0">Applied</option>
                                    <option value="1">Rejected</option>
                                    <option value="2">Proceed</option>
                                    <option value="3">Hold</option>
                                    <option value="4">Placed</option>
                                </select>
                            </th>
                            <th>
                                <td>
                                    <button
                                    onClick={() => {
                                      handleUpdatedStatus(allPlacement?.id,allPlacement?.status,allPlacement?.roundsCleared)
                                        }}
                                    style={{ background: 'transparent', border: 'none' }}
                                    className='custom-button admin-placement-save-button'
                                    title="Save"
                                    >
                                    <i className="fa fa-save custom-icon" style={{ color: 'rgb(212, 139, 2)', fontSize: "14pt", padding: '2px' }}></i>
                                    </button>
                                </td>
                            </th>
                        </tr>
                    )
                  })}

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
        </>
    )
}