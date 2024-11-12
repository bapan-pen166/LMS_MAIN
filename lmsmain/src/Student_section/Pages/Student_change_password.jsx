import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Button from '@mui/material/Button';
import axios from 'axios';
import PageNotFound from '../../ErrorPage/PageNotFound';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { api } from '../../ApiUrl/ApiUrl';

const Student_change_password = () => {
    const [userType, setUserType] = useState('');
    const [adminMail, setAdminMail] = useState('');

    useEffect(() => {
        const type = localStorage.getItem('userType');
        setUserType(type);
        setAdminMail(localStorage.getItem('studentEmail'));
    }, []);

    if (userType !== 'Student') {
        return <PageNotFound />
    }

    const validationSchema = Yup.object().shape({
        currentPassword: Yup.string().required('Current password is required'),
        newPassword: Yup.string()
            .required('New password is required')
            .min(8, 'New password must be at least 8 characters long'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('newPassword'), null], 'Confirm password must match the new password')
            .required('Confirm password is required')
    });

    const handleSubmit = async (values, { setSubmitting, setErrors, resetForm }) => {
        setSubmitting(true);

        try {

            const response = await axios.post(`${api}/user/changeCurrentPwd`, {
                currentPassword: values.currentPassword,
                newPassword: values.newPassword,
                email: adminMail
            });

            if (response.data.success) {
                toast.success("Password updated successfully", {
                    position: "top-center",
                    style: { fontWeight: 'bold' },
                });
                resetForm();
            } else {
                if (response.data.errorType === 'currentPassword') {
                    setErrors({ currentPassword: "Current password is incorrect." });
                } else {
                    setErrors({ submit: "Failed to update password." });
                }
            }
        } catch (error) {
            setErrors({ submit: "An error occurred. Please try again." });
        } finally {
            setSubmitting(false);
        }
    };


    return (
        <div>
            <div >
                <Formik
                    initialValues={{
                        currentPassword: "",
                        newPassword: "",
                        confirmPassword: ""
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, errors }) => (
                        <Form>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <div className="mb-4 form-group">
                                        <label htmlFor="currentPassword">Current Password</label>
                                        <Field
                                            className="form-control-custom"
                                            type="password"
                                            name="currentPassword"
                                            placeholder="Current password"
                                            style={{ border: ".2px solid lightgray", padding: "6px" }}
                                        />
                                        <ErrorMessage name="currentPassword" component="div" className="text-danger" />
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className="mb-4 form-group">
                                        <label htmlFor="newPassword">New Password</label>
                                        <Field
                                            className="form-control-custom"
                                            type="password"
                                            name="newPassword"
                                            placeholder="New Password"
                                            style={{ border: ".2px solid lightgray", padding: "6px" }}
                                        />
                                        <ErrorMessage name="newPassword" component="div" className="text-danger" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className='col-md-6'>
                                    <div className="mb-4 form-group">
                                        <label htmlFor="confirmPassword">Confirm Password</label>
                                        <Field
                                            className="form-control-custom"
                                            type="password"
                                            name="confirmPassword"
                                            placeholder="Confirm Password"
                                            style={{ border: ".2px solid lightgray", padding: "6px" }}
                                        />
                                        <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
                                    </div>
                                </div>
                            </div>
                            {errors.submit && <div className="row">
                                <div className='col-md-6'>
                                    <div className="alert alert-danger">
                                        {errors.submit}
                                    </div>
                                </div>
                            </div>}
                            <div className='col-md-6'>
                                <Button type='submit' variant="contained" color="primary" disabled={isSubmitting}>Update</Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>

            <ToastContainer />
        </div>
    );
}

export default Student_change_password;
