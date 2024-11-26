import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Treemap from 'highcharts/modules/treemap';
import axios from 'axios';
import { api } from '../../ApiUrl/ApiUrl';
import { Modal, Button } from 'react-bootstrap';
import Course_Completion from './mentor_dashboard/Course_Completion';
import Cert_Elegible_chart from './mentor_dashboard/Cert_Elegible_chart';
import Assignment_Summery from './mentor_dashboard/Assignment_Summery';

// Initialize Treemap module
Treemap(Highcharts);

const BatchWiseNoOfClasses = () => {
   const [classes, setClasses] = useState([]);
   const [mail, setMail] = useState('');
   const [showModal, setShowModal] = useState(false);
   const [batchName, setBatchName] = useState('');
   const [batchId, setBatchId] = useState('');

   const batchWiseApi = () => {
      axios
         .post(`${api}/mentor/getBatchWiseStudent`, { email: mail })
         .then((response) => {
            setClasses(response?.data?.result || []);
         })
         .catch((error) => {
            console.log(error);
         });
   };

   useEffect(() => {
      setMail(localStorage.getItem('mentorEmail'));
   }, []);

   useEffect(() => {
      if (mail) {
         batchWiseApi();
      }
   }, [mail]);

   const generateChartData = () => {
      return classes.map((batch) => ({
         name: batch.name,
         value: batch.y || 0,
         colorValue: batch.y || 0,
         events: {
            click: () => {
               setShowModal(true);
               setBatchId(batch.id);
               setBatchName(batch.name);
               // Fetch additional batch-specific data if needed
            },
         },
      }));
   };

   const modalClose = () => setShowModal(false);

   const options = {
      colorAxis: {
         minColor: '#FFFFFF',
         maxColor: Highcharts.getOptions().colors[0],
      },
      series: [
         {
            type: 'treemap',
            layoutAlgorithm: 'squarified',
            data: generateChartData(),
         },
      ],
      title: {
         text: 'Batch Performance Treemap',
      },
      tooltip: {
         pointFormat: '{point.name}: <b>{point.value}</b>',
      },
   };

   return (
      <div>
         <HighchartsReact highcharts={Highcharts} options={options} />
         <Modal show={showModal} onHide={modalClose} backdrop="static" keyboard={false} size="xl">
            <Modal.Body>
               <div className="container-fluid">
                  <div className="row">
                     <div className="col-md-2 p-2">
                        <p
                           style={{
                              fontSize: '24px',
                              fontWeight: 'bold',
                              paddingLeft: '10px',
                              paddingTop: '15px',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              height: '100%',
                           }}
                        >
                           {batchName}
                        </p>
                     </div>
                     <div className="col-md-4" style={{ textAlign: 'center', paddingTop: '25px' }}>
                        <p style={{ fontSize: '18px', fontWeight: 'bold' }}>Course Progress</p>
                        <Course_Completion percentage={85} />
                     </div>
                     <div className="col-md-12 p-2 d-flex justify-content-around">
                        <div
                           style={{
                              minHeight: '150px',
                              minWidth: '150px',
                              background: '#bbf7d0',
                              borderRadius: '20px',
                              textAlign: 'center',
                           }}
                        >
                           <div style={{ paddingTop: '10px' }}>
                              <span style={{ fontSize: '13px', fontWeight: 'bold' }}>Batch Attendance</span>
                              <p style={{ fontSize: '40px', fontWeight: 'bold' }}>85%</p>
                           </div>
                        </div>
                        <div
                           style={{
                              minHeight: '150px',
                              minWidth: '150px',
                              background: '#e0f2fe',
                              borderRadius: '20px',
                              textAlign: 'center',
                           }}
                        >
                           <div style={{ paddingTop: '10px' }}>
                              <span style={{ fontSize: '13px', fontWeight: 'bold' }}>Rating</span>
                              <p style={{ fontSize: '40px', fontWeight: 'bold' }}>4.5</p>
                           </div>
                        </div>
                        <div
                           style={{
                              minHeight: '150px',
                              minWidth: '150px',
                              background: '#fef9c3',
                              borderRadius: '20px',
                              textAlign: 'center',
                           }}
                        >
                           <div style={{ paddingTop: '10px' }}>
                              <span style={{ fontSize: '13px', fontWeight: 'bold' }}>Overall Performance</span>
                              <p style={{ fontSize: '40px', fontWeight: 'bold' }}>92%</p>
                           </div>
                        </div>
                     </div>
                     <div className="col-md-4 p-2">
                        <Cert_Elegible_chart certElgData={{}} />
                     </div>
                     <div className="col-md-4">
                        <Assignment_Summery assignmentPass={80} assignmentFail={20} />
                     </div>
                  </div>
               </div>
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={modalClose}>
                  Close
               </Button>
            </Modal.Footer>
         </Modal>
      </div>
   );
};

export default BatchWiseNoOfClasses;