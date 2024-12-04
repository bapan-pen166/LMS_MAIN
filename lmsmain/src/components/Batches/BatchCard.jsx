import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";

const Avatar = ({ text,bgColor }) => {
    // const avatars = ['#f44336','#2196f3','#4caf50','#ff9800' ];
    return (
      <div
        className="avatar me-3 d-flex align-items-center justify-content-center"
        style={{
          width: '50px',
          height: '50px',
          backgroundColor: bgColor,
          borderRadius: '50%',
          color: 'white',
          fontSize: '20px',
          fontWeight: 'bold',
        }}
      >
        {text.charAt(0).toUpperCase()}
      </div>
    );
  };
  const colorList = [
    '#f87171', '#fbbf24', '#34d399', '#60a5fa', '#f472b6', 
    '#818cf8', '#c084fc', '#facc15', '#f97316', '#38bdf8', 
    '#a3e635', '#10b981', '#f43f5e', '#6366f1', '#ec4899', 
    '#4ade80', '#fb923c', '#3b82f6', '#f59e0b', '#14b8a6'
  ];

const InstructorCard = ({ batchName,courseType,mentorName,mentorDetails,assistantMentorDetails,NoOfStudent,updatedOn,activeFlag,id,handleEditBatchesShow,setEditBatchDetails,setMentorList,setEditCourse,handleDeleteBatch,handleBatchDetailsShow,handlebatchData,setBatchselect,setMentorAssistantList}) => (


  <div className="card shadow-sm mb-4 card-hover">{console.log('batchCard')}
    <div className="card-body">
      <div className="d-flex align-items-center mb-3">
        <div className="avatar me-3">
          {/* <img
            src="https://via.placeholder.com/50"
            alt={batchName}
            className="rounded-circle"
          /> */}
          <Avatar  text={batchName}  bgColor={colorList[Math.floor(Math.random()*colorList.length)]}/>
        </div>
        <div className="px-3" style={{cursor:'pointer'}}>
          <h5 className="card-title mb-0" onClick={()=>{
                handleBatchDetailsShow()
                handlebatchData(id)
                setBatchselect(batchName)
                }}>{batchName}</h5>
          <small className="text-muted">{courseType}</small>
        </div>
      </div>
      <div className="mb-3">
        <div className="d-flex justify-content-between mb-2" >
          <span className="me-2"><i className="bi bi-people-fill"></i> Mentors</span>
          <span> {mentorDetails.filter(mentor => mentor.role === 'Mentor') // Filter by role
                .map(mentor => mentor.name) // Map to names
                .join(", ")}</span>
        </div>
        <div className="d-flex justify-content-between  mb-2" >
          <span className="me-2"><i className="bi bi-people-fill"></i> Assistant Mentors</span>
          <span>{mentorDetails.filter(mentor => mentor.role === 'Mentor_Assistant') // Filter by role
                .map(mentor => mentor.name) // Map to names
                .join(", ")}</span>
        </div>
        <div className="d-flex justify-content-between  mb-2" >
          <span className="me-2"><i className="bi bi-people-fill"></i> Total Students</span>
          <span>{NoOfStudent}</span>
        </div>
        <div className="d-flex justify-content-between " >
          <span className="me-2"><i className="bi bi-book-fill"></i> Status</span>
          <span>{activeFlag == '1' ? 'Active' : 'De-Active'}</span>
        </div>
      </div>
      <div className="d-flex " style={{justifyContent:'end'}} >
        
        <button style={{ background: 'transparent', border: 'none' }} className="custom-button" title='Edit'>
            <i class="fa fa-edit custom-icon" style={{ color: 'green', fontSize: "14pt", padding: '2px' }} onClick={() => {
                        // handleEditCourseData(courseList?.id)
                        handleEditBatchesShow()
                        setEditBatchDetails({
                            batchName: batchName,
                            courseName: courseType,
                            mentorName: mentorName,
                            // content: courseList?.description,
                            activeFlag: activeFlag,
                            id:id,

                        })
                        setMentorList(mentorDetails.filter(mentor => mentor.role === 'Mentor'));
                        setEditCourse(courseType)
                        setMentorAssistantList(mentorDetails.filter(mentor => mentor.role === 'Mentor_Assistant'))
                        // setMentorList(BatchDetails?.mentorName)
                    }}>
                </i>
        </button>
        <button style={{ background: 'transparent', border: 'none' }} className="custom-button" title='Delete'>
            <i class="fa fa-trash custom-icon" style={{ color: 'green', fontSize: "14pt", padding: '2px' }} 
            onClick={() => {
                        handleDeleteBatch(
                            id
                        )
                    }}>
            </i>
        </button>
        <button style={{ background: 'transparent', border: 'none' }} className="custom-button" title=' Batch Details'>
            <i class="fa fa-reply  custom-icon" style={{ color: 'green', fontSize: "14pt", padding: '2px' }} 
            onClick={() => {
                handleBatchDetailsShow()
                handlebatchData(id)
                setBatchselect(batchName)
                    }}>
            </i>
        </button>
      </div>
    </div>
  </div>
);


export default InstructorCard;