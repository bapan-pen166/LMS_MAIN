import React, { useEffect } from 'react';
import  { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';


function Student_Join_meeting({showJoinMeet,handleCloseJoinMeet,meetinfo}) {
    
    
    async function handleMeeting(meetingLink,firstName,lastName,userID){
      // const id=meetid;
      // window.location.href='http://localhost:3002/'; https://localhost:3010/join/room=<ID>
      // const url=`http://localhost:3002?id=${id}`;
      window.open(`${meetingLink}?username=${firstName || ''}%20${lastName || ''}_${userID}`,'_blank');
        
    }
   

    return (
        <>
          {/* <Button variant="primary" onClick={showJoinMeet}>
            Launch Modal
          </Button> */}
    
          <Modal show={showJoinMeet} onHide={handleCloseJoinMeet}>
            {/* <Modal.Header closeButton>
              <Modal.Title>Modal Heading</Modal.Title>
            </Modal.Header> */}
            <Modal.Body>
              {/* <p>Modal body text goes here.</p> */}
              <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-12 d-flex justify-content-center align-items-center'>
                        <button type='button' className='btn btn-success' onClick={()=>{handleMeeting(meetinfo?.meetlink,meetinfo?.firstName,meetinfo?.lastName,meetinfo?.userID)}}>Join Meeting</button>
                    </div>
                    <div className='col-md-12 mt-3'>
                        <label style={{fontSize:'16px',fontWeight:'bold'}}>Meeting Id :</label>
                        <span>{meetinfo?.id}</span>
                        </div>
                        {/* <span>bvdOsWNb</span> */}
                       {/* <h4>Meeting Id :</h4> */}
                       <div className='col-md-12 mt-3'>
                      <label htmlFor="" style={{fontSize:'16px',fontWeight:'bold'}}>Password :</label>
                      <span>{meetinfo?.password}</span>
                      {/* <span>359081</span> */}
                        {/* <h4>Password :</h4> */}
                        
                        
                    </div>

                </div>

              </div>
              

            </Modal.Body>
            <Modal.Footer >
              <Button variant="secondary" onClick={handleCloseJoinMeet}>
                Close
              </Button>
              {/* <Button variant="primary" onClick={handleCloseJoinMeet}>
                Save Changes
              </Button> */}
            </Modal.Footer>
          </Modal>
        </>
      );
    
}

export default Student_Join_meeting;