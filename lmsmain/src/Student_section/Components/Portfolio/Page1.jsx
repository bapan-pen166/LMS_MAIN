import React from 'react';
import { api } from '../../../ApiUrl/ApiUrl';
import "../../../assets/css/googleFont/googleFont.css";
import Technostruct_logo from "../../../assets/img/Technostruct_Logo/Technostruct_logo.png";
import logo from '../../../assets/img/Login_img/logo.png'

const robotoStyle = {
  fontFamily: 'Roboto, sans-serif',
};

const Page1 = ({ data, firstName, lastName }) => {
  const formattedName = `${firstName?.charAt(0)?.toUpperCase() + firstName?.slice(1)} ${lastName?.charAt(0)?.toUpperCase() + lastName?.slice(1)}`;

  console.log(data);

  return (
    // <div 
    //   style={{
    //     position: 'relative',
    //     width: '80vw',
    //     height: '80vh',
    //     maxWidth: '800px',
    //     maxHeight: '600px',
    //     margin: '0 auto', // Center the container
    //   }}
    // >
    //   {/* Image */}
    //   <img
    //     src={`${api}/${data}`}
    //     alt={data}
    //     style={{
    //       width: '100%',
    //       height: '100%',
    //       objectFit: 'contain',
    //     }}
    //   />

    //   {/* Overlay Text */}
    //   <h5
    //     style={{
    //       color: 'white',
    //       position: 'absolute',
    //       top: '10%',
    //       right: '4%',
    //       transform: 'translateX(-28%)',
    //     }}
    //     className='font-playfair'
    //   >
    //     FDM - Global
    //   </h5>

    //   <h1
    //     style={{
    //       color: 'white',
    //       position: 'absolute',
    //       top: '40%',
    //       right: '0%',
    //       transform: 'translateX(-28%)',
    //     }}
    //     className='font-playfair'
    //   >
    //     BIM Portfolio
    //   </h1>

    //   <p
    //     style={{
    //       color: 'white',
    //       position: 'absolute',
    //       top: '55%',
    //       right: '5%',
    //       transform: 'translateX(-28%)',
    //       ...robotoStyle,
    //     }}
    //     className='font-playfair'
    //   >
    //     --{formattedName}
    //   </p>
    // </div>
    <div style={{display:'flex',width:'100%',height:'100%'}}>
      <div style={{width:'50%', marginTop:'100px'}}>
        <div> <p style={{fontFamily:'cursive', fontSize:'80px'}}>BIM <br />PORTFOLIO</p></div>
        <div style={{display:'flex',justifyContent:'end'}}> <p style={{fontFamily:'cursive', fontSize:'30px',paddingRight:'20px'}}>---Chitradip Dey</p></div>
        <div style={{paddingTop:'200px'}}><img src={logo} alt="logo" style={{height:'100px',width:'200px'}} /></div>
      </div>
      <div style={{width:'50%'}}> <img src={Technostruct_logo} alt="Technostruct_logo" height={'100%'} width={'100%'} /> </div>
    </div>
  );
};

export default Page1;



// import React from 'react'
// import { api } from '../../../ApiUrl/ApiUrl';
// import "../../../assets/css/googleFont/googleFont.css"

// const robotoStyle = {
//     fontFamily: 'Roboto, sans-serif',
//   };
  

// const Page1 = ({data,firstName,lastName}) => {
//     const formattedName = `${firstName?.charAt(0)?.toUpperCase() + firstName?.slice(1)} ${lastName?.charAt(0)?.toUpperCase() + lastName?.slice(1)}`;

//     console.log(data);
//   return (
//     <div style={{position:"relative"}}>
//         <h5 style={{color:"white",position:"absolute",right:"28%",top:"20%", }} className='font-playfair'>FDM - Global</h5>
//         <h1 style={{color:"white",position:"absolute",right:"28%",top:"50%"}} className='font-playfair'>BIM Portfolio</h1>
//         <p style={{color:"white",position:"absolute",right:"28%",top:"58%", ...robotoStyle,}} className='font-playfair'>--{formattedName}</p>
//         <img src={`${api}/${data}`} alt={data} style={{ height: 'auto', width: 'auto', maxWidth: '80vw', maxHeight: '80vh', objectFit: 'contain' }} />
//     </div>
//   )
// }

// export default Page1