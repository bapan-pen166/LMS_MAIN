import React from 'react';
import '../../../assets/css/Mentor_dashboard/mentor_dashboard.css';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { api2 } from '../../../ApiUrl/ApiUrl';
const Course_Completion = ({percentage}) => {
    


  // Clamp percentage between 0 and 100
  const clampedPercentage = Math.min(100, Math.max(0, percentage));
  
  // Length of the arc (half circumference of the circle, radius = 40)
  const arcLength = Math.PI * 40; // This is the total length of the 180-degree arc

  // Calculate the filled part of the arc based on percentage
  const filledArcLength = (clampedPercentage / 100) * arcLength;

  return (
    <div className="gauge-container">
      <svg
        className="gauge"
        viewBox="0 0 100 50"
        width="100%"
        height="100%"
        preserveAspectRatio="none"
      >
        {/* Background arc - full 180 degrees */}
        <path
          d="M 10,50 A 40,40 0 0,1 90,50"
          fill="none"
          stroke="#fcbaba"
          strokeWidth="10"
        />
        {/* Foreground arc - based on percentage */}
        <path
          d="M 10,50 A 40,40 0 0,1 90,50"
          fill="none"
          stroke="#34d399"
          strokeWidth="10"
          strokeDasharray={`${filledArcLength} ${arcLength - filledArcLength}`}
        />
      </svg>
      <div className="gauge-percentage">
        {clampedPercentage}%
      </div>
    </div>
  );
};

export default Course_Completion;
