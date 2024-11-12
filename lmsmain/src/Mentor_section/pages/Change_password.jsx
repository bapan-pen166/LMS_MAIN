import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from '@mui/material/Button';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Change_password = () => {
  const [formData, setFormData] = useState({
    current_password: "",
    new_password: "",
    confirm_new_password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the current password is correct
    try {
      const response = await axios.post('/api/check-password', {
        current_password: formData.current_password
      });

      if (!response.data.valid) {
        toast.error("Current password is incorrect.");
        return;
      }

      // Check if new password and confirm new password match
      if (formData.new_password !== formData.confirm_new_password) {
        toast.error("New password and confirm password do not match.");
        return;
      }

      // Call the API to update the password
      await axios.post('/api/change-password', {
        new_password: formData.new_password
      });

      toast.success("Password changed successfully.");
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleReset = () => {
    setFormData({
      current_password: "",
      new_password: "",
      confirm_new_password: ""
    });
  };

  return (
    <div style={{ marginTop: "58px" }}>
      <div className="row">
        <div className='container-fluid'>
          <div className='col-md-12 col-lg-12 headLineBox d-flex justify-content-start'>
            <h4>Set Password</h4>
          </div>
          <div className='main-form-profile' style={{width:"50%",margin:"20px auto"}}>
            <Form onSubmit={handleSubmit} onReset={handleReset}>
              <Form.Group controlId="formCurrentPassword" className="mb-4">
                <Form.Label>Current Password</Form.Label>
                <Form.Control
                  type="password"
                  name="current_password"
                  placeholder='Current Password'
                  value={formData.current_password}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formNewPassword" className="mb-4">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  name="new_password"
                  placeholder='New Password'
                  value={formData.new_password}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formConfirmNewPassword" className="mb-4">
                <Form.Label>Confirm New Password</Form.Label>
                <Form.Control
                  type="password"
                  name="confirm_new_password"
                  placeholder='Confirm Password'
                  value={formData.confirm_new_password}
                  onChange={handleChange}
                />
              </Form.Group>
              <div style={{ display: 'flex', justifyContent: 'center', gap: "10px" }}>
                <Button style={{ width: "20%", textAlign: "center" }} type="submit" variant="contained">Update</Button>
                <Button style={{ width: "20%", textAlign: "center", backgroundColor: "green" }} type="reset" variant="contained">Reset</Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Change_password;
