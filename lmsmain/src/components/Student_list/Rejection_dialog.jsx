import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Rejection_dialog({ handlereject,profEmail,setRejectFlag, showreject, handlerejectClose}) {
//   const [show, setShow] = useState(false);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal show={showreject} onHide={handlerejectClose}>
        {/* <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header> */}
        <Modal.Body>Are you sure! You want to Hold</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handlerejectClose}>
            Close
          </Button>
          <Button variant="primary" onClick={
            ()=>{
                // handlereject(profEmail)
                setRejectFlag(true)
                handlerejectClose()}}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Rejection_dialog;