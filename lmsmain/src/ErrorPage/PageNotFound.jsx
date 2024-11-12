import "../assets/css/ErrorPage/PageNotFound.css";
import company_image from "../assets/img/image_for_the_error_page/techno_struct_logo.jpg"

const PageNotFound = ()=>{
    return (
        <div style={{ display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",height:"85vh",width:"70vw"}}>
            {/* <div className='container-fluid'> */}
                <div className="error-main">
                     <h3>Error 404</h3>
                     <h4>Requested resource not found.</h4>
                     <h5>Sorry, the page you are looking for does not exist.</h5>

                </div>
                <div className="error-main">
                    <img src={company_image} alt="company iamge" />
                </div>
            {/* </div> */}
        </div>
    )

}

export default PageNotFound;
