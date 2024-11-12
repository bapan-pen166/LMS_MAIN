import PageNotFound from '../../ErrorPage/PageNotFound';
import { CiSearch } from "react-icons/ci";
import { useState,useEffect } from 'react';
import axios from 'axios';
import { api2 } from '../../ApiUrl/ApiUrl';
import '../../assets/css/Custom_Global_Style/Global.css';

export default  function Placement_Selected(){
    const [userType, setUserType] = useState('');
    const [placementEmail,setPlacementEmail]=useState('');
    useEffect(() => {
        const type = localStorage.getItem('userType');
        setUserType(type);
      }, [])
    

      const[allPlacement,setallPlacement]=useState([]);

      const getALLplacementDetails = (email) => {
        axios.post(`${api2}/placementDrive/getPlacedSelectedStudent`,{email:email})
          .then((response) => {
            console.log("get all placement details", response?.data?.result);
            setallPlacement(response?.data?.result)
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
      const [selectedFile, setSelectedFile] = useState(null);
      
      const [selectedRowIndex, setSelectedRowIndex] = useState(null);
      const handleFileChange = (index, event) => {
        const file = event.target.files[0];
        if (file) {
          // Update the state with the new file and the row index
          setSelectedFile(file);
          setSelectedRowIndex(index);
        }
      };

      const handleOfferLetterSent=(studentName,batchName,companyName,id)=>{
        const data=new FormData();
        data.append('file',selectedFile);
        data.append('studentName',studentName);
        data.append('batchName',batchName);
        data.append('companyName',companyName);
        data.append('studentId',id);
        axios.post(`${api2}/placementDrive/releaseOfferLetter`,data,{})
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
          

          <div className="col-md-12 col-lg-12 col-sm-12">
            <div className="table-container" style={{ height: '90vh', overflowY: 'auto' }}>
              <table className="table table-bordered pt-1" >
                <thead style={{ position: 'sticky', top: -2, zIndex: 3 }}>
                  <tr>
                    <th>Sr No</th>
                    <th>Student Name</th>
                    <th>Batch</th>
                    
                    <th>Offer Letter</th>
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
                            
                            <th>
                                {allPlacement?.offerLetterPath==null? <div class="input-group ">
                                    <input type="file" name='content' class="form-control-file" id="exampleFormControlFile1"
                                    // onChange={(e)=>{setAssignmentFile(e.target.files[0])}}
                                    onChange={(e) => handleFileChange(index, e)} 
                                    />
                                </div>:'Already sent'}
                            </th>
                            <th>
                                {allPlacement?.batchName? 'Selected':''}
                            </th>
                            <th>
                                <td>
                                    {/* <button
                                    onClick={() => {
                                    //   handleUpdatedStatus(allPlacement?.id,allPlacement?.status,allPlacement?.roundsCleared)
                                        }}
                                    style={{ background: 'transparent', border: 'none' }}
                                    className='custom-button admin-placement-save-button'
                                    title="Save"
                                    >
                                    <i className="fa fa-save custom-icon" style={{ color: 'rgb(212, 139, 2)', fontSize: "14pt", padding: '2px' }}></i>
                                    </button> */}
                                    <button className="custom-button"
                                                style={{ 
                                                    background: 'transparent', 
                                                    border: 'none', 
                                                    cursor: selectedFile && selectedRowIndex === index ? 'pointer' : 'not-allowed',
                                                    color: selectedFile && selectedRowIndex === index ? 'rgb(212, 139, 2)' : 'gray'
                                                }} 
                                                onClick={() => 
                                                    handleOfferLetterSent(allPlacement?.studentName,allPlacement?.batchName,allPlacement?.companyName,allPlacement?.id)
                                                } 
                                                disabled={!selectedFile || selectedRowIndex !== index}
                                                title='Save'
                                                >
                                                <i className="fa fa-save" style={{ fontSize: "14pt", padding: '2px',border:'none',background:'transparent' }}></i>
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