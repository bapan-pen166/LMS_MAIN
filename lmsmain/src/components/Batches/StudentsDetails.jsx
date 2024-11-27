

export default function BatchStudentDetails({batchStudentDetails}){

    return(
        <>
            
            <div className="col-md-12 col-lg-12 col-sm-12">
                                    <div className="p-0 custom-table-container" style={{paddingTop:"0px", height: '400px', overflowY: 'auto' }}>
                                        <table className="table-bordered custom-table"  >
                                            <thead className="custom-thead " style={{ position: 'sticky', top: 0, zIndex: 3 }}>
                                                <tr>
                                                    
                                                    <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Rank</th>
                                                    <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Name</th>
                                                    <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Overall Performance</th>
                                                    <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Attendance</th>
                                                    <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Test Score</th>
                                                    <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Assignment score</th>
                                                    <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Grade</th>
                                                    <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Placement</th>

                                                </tr>
                                            </thead>

                                            <tbody style={{ zIndex: 1 }} className="custom-tbody">
                                                {batchStudentDetails?.map(batchStudentDetails => {
                                                  
                                                    return (
                                                        <tr>
                                                            <td className="text-center align-middle">{batchStudentDetails?.rank}</td>
                                                            <td className="text-center align-middle">{batchStudentDetails?.studentName}</td>
                                                            <td className="text-center align-middle">{batchStudentDetails?.overallPerformance}</td>
                                                            <td className="text-center align-middle">{batchStudentDetails?.attendancePercentage}</td>
                                                            <td className="text-center align-middle">{batchStudentDetails?.averageTestMarks}</td>
                                                            <td className="text-center align-middle">{batchStudentDetails?.assignmentResultPercentage}</td>
                                                            <td className="text-center align-middle">{batchStudentDetails?.grade}</td>
                                                            <td className="text-center align-middle">{batchStudentDetails?.placementStatus}</td>
                                                            
                                                        </tr>
                                                    )
                                                })}
                                               
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
        </>
    )
}