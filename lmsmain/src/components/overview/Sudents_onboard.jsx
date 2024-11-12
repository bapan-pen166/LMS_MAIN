import React from 'react';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Highchart from 'highcharts';
import "../../assets/css/Overview/Overview.css"
import { api } from '../../ApiUrl/ApiUrl';


function Students_onboarded() {

    const [weekdata, setweekdata] = useState([]);
    const [monthdata, setMonthdata] = useState([]);
    const [countList, setCountList] = useState([]);
    const [dateList, setDateList] = useState([]);
    const chartRef = useRef(null);
    const [day_range, setday_range] = useState('7');
    const [render, setrender] = useState(0);

    const handleSelectChange = (event) => {
        setday_range(event.target.value);
        console.log(day_range)

    };

    const handleOnboard = (e) => {
        console.log('submit click');
        // let day_range='30';
        // e.preventDefault();

        axios.post(`${api}/dashboard/getStudentOnBoardedGraph`, { day_range: day_range })
            .then((Response) => { 
                console.log(Response.data);
                setCountList(Response.data.countList);
                setDateList(Response.data.dateList);
                //    chart()


            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const chart = () => {
        if (!chartRef.current) return;

        const chart = Highchart.chart(chartRef.current, {
            chart: {
                type: 'column'
            },
            credits: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            title: {
                text: null
            },
            xAxis: {

                categories: dateList,
                accessibility: {
                    description: '' // for x axis main categories
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: ''
                },
                visible: false, // Hide the y-axis
                gridLineWidth: 0, // Remove grid lines
            },
            plotOptions: {
                series: {
                    dataLabels: {
                        enabled: true,
                    }
                }

            },
            series: [{
                name: 'count',
                data: countList,
                showInLegend: false,
                colorByPoint: true,
            }],
            // legend: {
            //     enabled: false
            // },
            // plotOptions: {
            //     series: {
            //         dataLabels: {
            //             enabled: true,
            //         }
            //     }
            // },
            // series: [{
            //     name: 'count',
            //     colorByPoint: true,
            //     data: countList
            // }]
        })
        // return () => {
        //     // Destroy the chart when the component unmounts
        //     chart.destroy();
        // };
    }

    //    const handleOnWeek=(e)=>{
    //     console.log('submit click');
    //     let day_range='7';
    //     // e.preventDefault();

    //         axios.post("",{day_range:day_range})
    //            .then((Response)=>{
    //                console.log(Response.data);



    //            })
    //            .catch((error) => {
    //             console.error('Error:', error);
    //         });  
    //    }

    async function handleOnWeek() {
        try {
            const Week_data = await axios.get(
                `${api}/dashboard/getThisWeekOnboardedStudents`
            );
            console.log(Week_data.data);
            setweekdata(Week_data.data);
            //   setStudent(sutents_all.data.courseList);
        } catch (error) {
            console.log(error);
        }
    }
    async function handleOnMonth() {
        try {
            const Month_data = await axios.get(
                `${api}/dashboard/getThisMonthOnboardedStudents`
            );
            console.log(Month_data.data);
            setMonthdata(Month_data.data);
            //   setStudent(sutents_all.data.courseList);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        handleOnboard()
        handleOnWeek()
        handleOnMonth()
        // chart()
    }, [])
    useEffect(() => {
        chart()
    }, [dateList])
    useEffect(() => {

    }, [dateList])

    useEffect(() => {
        handleOnboard();
        // chart();
        setrender(render + 1)
    }, [day_range])
    return (
        <> {console.log('render')}
            {console.log(countList)}

            {/* <button >submit</button> */}
            <div className="d-flex flex-wrap justify-content-between mx-3 my-2 ">
                <div className="flex-grow-1">
                    <h6 className="box-heading text-left"><b>Students Onboard</b></h6>
                </div>
                <div className="d-flex align-items-center">
                    <select value={day_range} onChange={handleSelectChange} className="form-select">
                        <option value="7">7</option>
                        <option value="15">15</option>
                        <option value="30">30</option>
                    </select>
                </div>
            </div>

            <div className="row scroll">
                <div className="col-md-3 col-sm-0">
                    {(() => {
                        if (parseInt(weekdata?.weekStudentsOnboarded) > 0) {
                            return (
                                <>
                                    <div className="col-md-12 col-sm-6 p-2 mb-2" style={{ background: 'linear-gradient(45deg, #b4e391 0%,#b4e391 64%,#61c419 79%)', borderRadius: '5px' }}>
                                        <h5><i class="fa fa-arrow-up" style={{ fontSize: '14pt', color: 'green' }}></i>{weekdata?.weekStudentsOnboarded}</h5>
                                        <h5>{weekdata?.weekGrowthDegrowth}%</h5>
                                        This Week
                                    </div>
                                </>
                            )
                        }
                        else {
                            return (
                                <>
                                    <div className="col-md-12 col-sm-6 p-2 mb-2" style={{ background: ' linear-gradient(45deg, #ffc578 73%,#fb9d23 100%)', borderRadius: '5px' }}>
                                        <h5><i class="fa fa-arrow-down" style={{ fontSize: '14pt', color: 'red' }}></i>{weekdata?.weekStudentsOnboarded}</h5>
                                        <h5>{weekdata?.weekGrowthDegrowth}%</h5>
                                        This Week
                                    </div>
                                </>
                            )
                        }
                    })()}

                    {(() => {
                        if (parseInt(monthdata?.monthStudentsOnboarded) > 0) {
                            return (
                                <>
                                    <div className="col-md-12 col-sm-6 p-2 mb-2" style={{ background: 'linear-gradient(45deg, #b4e391 0%,#b4e391 64%,#61c419 79%)', borderRadius: '5px' }}>
                                        <h5><a href=""><i class="fa fa-arrow-up" style={{ fontSize: '14pt', color: 'green' }}></i></a>{monthdata?.monthStudentsOnboarded}</h5>
                                        <h5>{monthdata?.monthGrowthDegrowth}%</h5>
                                        This Month
                                    </div>
                                </>
                            )
                        }
                        else {
                            return (
                                <>
                                    <div className="col-md-12 col-sm-6 p-2 mb-2" style={{ background: ' linear-gradient(45deg, #ffc578 73%,#fb9d23 100%)', borderRadius: '5px' }}>
                                        <h5><i class="fa fa-arrow-down" style={{ fontSize: '14pt', color: 'red' }}></i>{monthdata?.monthStudentsOnboarded}</h5>
                                        <h5>{monthdata?.monthGrowthDegrowth}%</h5>
                                        This month
                                    </div>
                                </>
                            )
                        }
                    })()}

                    {/* <div className="col-md 12 p-2" style={{background: ' linear-gradient(45deg, #f16f5c 54%,#e73827 100%)'}}>
                                        <h5>{monthdata?.monthStudentsOnboarded}</h5>
                                        <h5>{monthdata?.monthGrowthDegrowth}%</h5>
                                        This month
                                    </div> */}
                </div>
                <div className="col-md-9 col-sm-10" style={{ paddingLeft: '0px' }}>


                    {/* <table className="table table-striped">
                                        <thead>
                                        <tr>
                                            <th>Firstname</th>
                                            <th>Lastname</th>
                                            <th>Email</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>John</td>
                                            <td>Doe</td>
                                            <td>john@example.com</td>
                                        </tr>
                                        <tr>
                                            <td>Mary</td>
                                            <td>Moe</td>
                                            <td>mary@example.com</td>
                                        </tr>
                                        <tr>
                                            <td>July</td>
                                            <td>Dooley</td>
                                            <td>july@example.com</td>
                                        </tr>
                                        </tbody>
                                    </table> */}

                    {/* <div id="chart-container" style={{ width: '100%', height: '400px' }}></div> */}

                    <div ref={chartRef} style={{ minHeight: '300px', paddingBottom: '10px' }}></div>
                </div>
            </div>
        </>
    );
}

export default Students_onboarded;