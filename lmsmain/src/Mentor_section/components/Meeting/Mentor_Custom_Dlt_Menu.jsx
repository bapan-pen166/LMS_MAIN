import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';

const Mentor_Custom_Dlt_Menu = ({ contextMenuPosition, handleDelete, handleCloseMenu }) => {
//   const [anchorEl, setAnchorEl] = useState(null);
const [isOpen, setIsOpen] = useState(false);

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };
// const handleClose = () => {
//     setIsOpen(false); // Close the popup
//     // Your additional handleClose logic here
//     console.log('Menu closed');
//   };

//   return (
//     <div>
//       <Button onClick={handleClick}>Open Menu</Button>
//       <Menu
//         anchorEl={anchorEl}
//         open={Boolean(anchorEl)}
//         onClose={handleClose}
//       >
//         <MenuItem onClick={handleClose}>Delete</MenuItem>
//         {/* <MenuItem onClick={handleClose}>Menu Item 2</MenuItem>
//         <MenuItem onClick={handleClose}>Menu Item 3</MenuItem> */}
//       </Menu>
//     </div>
//   );

// return (
//     <Menu
//       anchorReference="anchorPosition"
//       anchorPosition={
//         contextMenuPosition.y !== 0 && contextMenuPosition.x !== 0
//           ? { top: contextMenuPosition.y, left: contextMenuPosition.x }
//           : undefined
//       }
//       open={contextMenuPosition.y !== 0 && contextMenuPosition.x !== 0}
//       onClose={handleClose}
//     >
//       <MenuItem onClick={
//         ()=>{
//             handleClose()
//             handleDelete()
//         }}>Delete</MenuItem>
//     </Menu>
//   );

return (
    <Menu
      anchorReference="anchorPosition"
      anchorPosition={
        contextMenuPosition.y !== 0 && contextMenuPosition.x !== 0
          ? { top: contextMenuPosition.y, left: contextMenuPosition.x }
          : undefined
      }
      open={contextMenuPosition.y !== 0 && contextMenuPosition.x !== 0}
      onClose={handleCloseMenu} // Close the menu when clicking outside of it
    >
      <MenuItem onClick={() => { handleDelete(); handleCloseMenu(); }}>Delete</MenuItem>
    </Menu>
  );
};

export default Mentor_Custom_Dlt_Menu;
