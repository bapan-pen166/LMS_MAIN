import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import Student_Join_meeting from './Student_Join_meeting';

const Student_Custom_Dlt_Menu = ({  contextMenuPosition, handleCloseMenu,selectedEvent,firstName,lastName,userID}) => {
  console.log('firstName',firstName)
  console.log('lastName',lastName)
  console.log('userID',userID)
  console.log('selectedEvent',selectedEvent)
  console.log('meetingLink',selectedEvent?.meetingLink)
//   const [anchorEl, setAnchorEl] = useState(null);
const [isOpen, setIsOpen] = useState(false);
const [showJoinMeet, setShowJoinMeet] = useState(false);

        const handleCloseJoinMeet = () => setShowJoinMeet(false);
        const handleShowJoinMeet = () => setShowJoinMeet(true);

        const handleJoin = (meetlink, id, password) => {
          console.log(meetlink);
          console.log('id', id);
          // console.log('password', password);
          handleShowJoinMeet()
      }
      const [meetinfo, setmeetinfo] = useState({  meetlink: '', id: '', firstName: '',lastName: '',userID:''});

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
  <>
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
  {/* <MenuItem onClick={() => { handleDelete(); handleCloseMenu(); }}>Delete</MenuItem> */}
  <MenuItem onClick={() => { 
    handleJoin(selectedEvent.meetingLink, selectedEvent.meeting_id)
    console.log('event.meeting_id', selectedEvent)
    console.log('event.meeting_password', selectedEvent.meeting_password);
    // setmeetinfo({ meetlink: selectedEvent.meetingLink, id: selectedEvent.id})
    setmeetinfo({ meetlink: selectedEvent.meetingLink, id: selectedEvent.id, firstName: firstName,lastName: lastName,userID:userID})
   }}>Join</MenuItem>
   <Student_Join_meeting showJoinMeet={showJoinMeet} handleCloseJoinMeet={handleCloseJoinMeet} meetinfo={meetinfo} />
</Menu>
</>
  );
};

export default Student_Custom_Dlt_Menu;
