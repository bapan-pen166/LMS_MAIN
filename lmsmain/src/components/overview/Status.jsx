import React from 'react'
import { api } from '../../ApiUrl/ApiUrl';

function Status() {

    const [statusdata,setStatusdata]=useState([]);

    async function handleOnStatus() {
        try {
          const course_data = await axios.get(
            `${api}//dashboard/getTopCourse `
          );
          console.log(course_data.data);
          setCoursedata(course_data.data.topCourse);
        //   setStudent(sutents_all.data.courseList);
        } catch (error) {
          console.log(error);
        }
      }

      useEffect(()=>{
        handleOnStatus()
       },[])
    return ( 
        <>
        <div className="row ">
                                <div className="col-md-8 mt-2 mb-2 justify-content-start">
                                    <h6 class="box-heading" style={{textAlign:'left'}}><b>Students Feedback</b></h6>
                                </div>
                                <div className=" col-md-4 mt-2 mb-2 justify-content-end">
                                    <button type="button" class="btn btn-warning flex-end"><b>View</b></button>
                                </div>

                            </div>
                            <table className="table table-striped">
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Course</th>
                                    <th>Bat.Ch</th>
                                    <th>keywords</th>
                                    <th>Sentiment</th>
                                    <th>Mentor</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>Anushree Ray</td>
                                    <td>Bim ready+</td>
                                    <td>1</td>
                                    <td>good,descriptive,ready</td>
                                    <td>Very Positive</td>
                                    <td>Arpan Das</td>
                                </tr>
                                <tr>
                                    <td>Anushree Ray</td>
                                    <td>Bim ready+</td>
                                    <td>1</td>
                                    <td>good,descriptive,ready</td>
                                    <td>Very Positive</td>
                                    <td>Arpan Das</td>
                                </tr>
                                <tr>
                                    <td>Anushree Ray</td>
                                    <td>Bim ready+</td>
                                    <td>1</td>
                                    <td>good,descriptive,ready</td>
                                    <td>Very Positive</td>
                                    <td>Arpan Das</td>
                                </tr>
                                </tbody>
                            </table>
        </>
     );
}

export default Status;