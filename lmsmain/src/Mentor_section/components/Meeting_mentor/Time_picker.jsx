// 


import React, { useState, useRef } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

function DropdownWithInput({ options, initialValue }) {
  const [selectedOption, setSelectedOption] = useState(initialValue);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const inputRef = useRef(null);

  const handleInputChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      setSelectedOption(e.target.value);
      setIsDropdownOpen(false);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    if (!isDropdownOpen) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 0);
    }
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      
      <div class="input-group ">
      <input
        type="text"
        className="form-control"
        value={selectedOption}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        onClick={toggleDropdown}
        ref={inputRef}
        style={{ width: '200px', padding: '5px', fontFamily: 'inherit' }}
      />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          right: '5px',
          transform: 'translateY(-50%)',
          cursor: 'pointer',
          pointerEvents: 'none',
        }}
        onClick={toggleDropdown}
      >
        {/* <FontAwesomeIcon icon={faAngleDown} /> */}
        <i class="fa fa-angle-down"></i>
      </div>
      {isDropdownOpen && (
        <div  style={{ position: 'absolute', top: '100%', left: 0, zIndex: 999,background:'white',border:'2px solid gray',borderRadius:'5px',width:'100%' }}>
          <ul style={{ listStyle: 'none', padding: 0,height:'50px',overflow:'scroll',fontSize:'12px' }}>
            {options.map((option, index) => (
              <li key={index} onClick={() => handleOptionClick(option)} style={{ cursor: 'pointer', padding: '5px' }}>
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default DropdownWithInput;
