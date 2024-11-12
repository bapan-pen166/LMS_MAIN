import React from 'react'

function Test() {
    const handleClick = () => {
        console.log('Button clicked!');
        alert('test');
      };
    
      return (
        <div>
          {/* Call the function when the button is clicked */}
          <button onClick={handleClick}>Click Me</button>
        </div>
      );
}

export default Test;