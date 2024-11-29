import React,{useState,useEffect} from 'react'
import { Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Button from '@mui/material/Button';
import { api2 } from '../../ApiUrl/ApiUrl';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';  



const ApplyLeaveNew = ({showApplyLeave,setShowApplyLeave}) => {
    // for getting mail id and name from the local storage
    const [mailIDFromLoacalStorage, setMailIDFromLoacalStorage] = useState();
    const [firstNameFromLoacalStorage, setFirstNameFromLoacalStorage] = useState();
    const [lastNameFromLoacalStorage, setlastNameFromLoacalStorage] = useState();

    useEffect(() => {
        const mail = localStorage.getItem('mentorEmail');
        const firstName = localStorage.getItem('firstName');
        const lastName = localStorage.getItem('lastName');
    
        setMailIDFromLoacalStorage(mail);
        setFirstNameFromLoacalStorage(firstName);
        setlastNameFromLoacalStorage(lastName);
    
        //
        setApplyLeave(prevState => ({
          ...prevState,
          mail: mail || "",
          firstName: firstName || "",
          lastName: lastName || ""
        }));
      }, [])
  
   


   //For leave 
  const [applyLeave, setApplyLeave] = useState({
    startDate: "",
    endDate: "",
    leaveType: "",
    reasonForLeave: "",
    email: mailIDFromLoacalStorage,
    firstName: firstNameFromLoacalStorage,
    lastName: lastNameFromLoacalStorage
  })







  const handleMentorLeave = () => {
    console.log('applyLeave', applyLeave);
    axios.post(`${api2}/mentor/applyLeaveRequest`, { applyLeave: applyLeave })

      .then((Response) => {
        console.log(" data : ", Response.data);
        if(Response?.data?.success){
          toast.success("Leave applied successfully.", {
            position: "top-center",
        });

        setShowApplyLeave(false)
        }
        else{
          console.log(" data : ", Response.success);
          toast.error("please fill all the fields to apply", {
            position: "top-center",
        });
        }
        setApplyLeave('')
        // handleMetorData();
      })
      .catch((error) => {
        console.error('Error:', error);
      })
  }

  const handleApplyLeave = (e) => {
    const { value, name } = e.target;

    setApplyLeave((prev) => ({
      ...prev,
      [name]: value
    }))

  }




  return (
    <div>
          <Modal
        show={showApplyLeave}
        // onHide={handleCloseMeetingReschedule}
        backdrop="static"
        keyboard={false}
        size='md'
      >

        <Modal.Body closeButton>

          <div className="container">
            <div className="row pt-3">
              {/* <div className="col-md-2 col-sm-2 ">
                Apply leave
              </div> */}

              <div className="col-md-6 p-2">
                <label htmlFor="">Start Date</label>
                <input type="date" id="dob"
                  className="form-control " name="startDate" value={applyLeave.startDate} onChange={handleApplyLeave} />
              </div>


              <div className="col-md-6 p-2">
                <label htmlFor="">End Date</label>
                <input type="date" id="dob"
                  className="form-control" name="endDate" value={applyLeave.endDate} onChange={handleApplyLeave} />
              </div>

              <div className='col-md-10'>
                <Form.Group controlId="formUniversityName" className="mb-4 form-group">
                  <Form.Label>Leave Type</Form.Label>
                  <Form.Control
                    className="form-control-custom"
                    as="select"
                    name="leaveType"
                    value={applyLeave.leaveType}
                    onChange={handleApplyLeave}

                  >
                    <option value="">Select leave type</option>
                    <option value="Casual_leave">Casual </option>
                    <option value="Sick_leave">Sick </option>
                    <option value="planned_leave">Planned</option>
                    <option value="others">Others</option>
                  </Form.Control>
                </Form.Group>
              </div>
              <div className="col-md-12">
                <label htmlFor="reasonForLeave">Reason for leave</label>
                <textarea id="reasonForLeave" className="form-control" name="reasonForLeave" value={applyLeave.reasonForLeave} onChange={handleApplyLeave}></textarea>
              </div>


            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowApplyLeave(false)}>
            Close
          </Button>
          <button className="btn btn-success" onClick={handleMentorLeave} >Apply Leave</button>

        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ApplyLeaveNew