
import "../../assets/css/TableStyle/TableStyle.css"
export default function BatchMentorDetails({batchMentorDetails}){

    return(
        <>
            {/* <div className="col-md-12 col-lg-12 col-sm-12">
                        <div className="table-container" style={{ height: '60vh', overflowY: 'auto', zIndex: "1" }}>
                            <table className="table table-bordered pt-1" >
                                <thead style={{ position: 'sticky', top: -2, zIndex: 3 }}>
                                    <tr>
                                        <th>Rank</th>
                                        <th>Name</th>
                                        <th >Mobile No.</th>
                                        <th>Total Lectures Taken</th>
                                        <th>Rating</th>
                                       


                                    </tr>
                                </thead>

                                <tbody style={{ zIndex: 1 }}>
                                    
                                <tr>
                                    <td>1</td>
                                    <td>Harshid Pandey</td>
                                    <td>8987656456</td>
                                    <td>70</td>
                                    <td >8.4</td>
                                    
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Harshid Pandey</td>
                                    <td>8987656456</td>
                                    <td>70</td>
                                    <td >8.4</td>
                                    
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Harshid Pandey</td>
                                    <td>8987656456</td>
                                    <td>70</td>
                                    <td >8.4</td>
                                    
                                </tr>
                                   


                                </tbody>
                            </table>
                        </div>
                    </div> */}

                    
                    {/* <div > */}
                        {/* <div className="row"> */}
                            {/* <div className="container-fluid"> */}
                                {/* <div className='col-md-12 col-lg-12 d-flex justify-content-start'>
                                    <h4>View Tests</h4>
                                </div> */}
                                <div className="col-md-12 col-lg-12 col-sm-12">
                                    <div className="p-0 custom-table-container" style={{paddingTop:"0px", height: '400px', overflowY: 'auto' }}>
                                        <table className="table-bordered custom-table"  >
                                            <thead className="custom-thead " style={{ position: 'sticky', top: 0, zIndex: 3 }}>
                                                <tr>
                                                    <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Rank</th>
                                                    <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Name</th>
                                                    <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Mobile No.</th>
                                                    <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Total Lectures Taken</th>
                                                    <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Rating</th>
                                                    

                                                </tr>
                                            </thead>

                                            <tbody style={{ zIndex: 1 }} className="custom-tbody">
                                                {batchMentorDetails?.map(batchMentorDetails => {
                                                  
                                                    return (
                                                        <tr>
                                                            <td className="text-center align-middle">{batchMentorDetails?.rank}</td>
                                                            <td className="text-center align-middle">{batchMentorDetails?.name}</td>
                                                            <td className="text-center align-middle">{batchMentorDetails?.phoneNumber}</td>
                                                            <td className="text-center align-middle">{batchMentorDetails?.totalLecturesTaken}</td>
                                                            <td className="text-center align-middle">{batchMentorDetails?.averageFeedback}</td>
                                                            
                                                        </tr>
                                                    )
                                                })}
                                               
                                                
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            {/* </div> */}
                        {/* </div> */}
                        {/* <ToastContainer /> */}
                    {/* </div> */}
                    
        </>
    )
}