



// import React, { useState } from 'react';
// import { Button,message, Popconfirm } from 'antd';

// const PopUp = ({ btnName, mess ,onSubmit,style }) => {
//     const [open, setOpen] = useState(false);
//     const [condition, setCondition] = useState(true);

//     const confirm = () => {
//         setOpen(false);
//         message.success(mess);
//     };

//     const cancel = () => {
//         setOpen(false);
//         message.error('Click on cancel.');
//     };

//     const handleOpenChange = (newOpen) => {
//         if (!newOpen) {
//             setOpen(newOpen);
//             return;
//         }
//         if (condition) {
//             confirm();
//         } else {
//             setOpen(newOpen);
//         }
//     };

//     return (
//         <div>
//             <Popconfirm
//                 title={`Delete the task "${btnName}"?`}
//                 open={open}
//                 onOpenChange={handleOpenChange}
//                 onConfirm={confirm}
//                 onCancel={cancel}
//                 okText="Yes"
//                 cancelText="No"

//             >
//                 <div className={`text-center text-white font-semibold py-1 rounded ${style}`} onClick={onSubmit}>{btnName}</div>
               
//             </Popconfirm>
//         </div>
//     );
// };

// export default PopUp;






// PopUp.js
import { message, Popconfirm } from 'antd';
import React, { useState } from 'react';

const usePopUp = () => {
  const [open, setOpen] = useState(false);
  const [condition, setCondition] = useState(true);

  const triggerPopUp = (status, messageText) => {
    setCondition(status);
    setOpen(true);
    if (status) {
      message.success(messageText);
    } else {
      message.error('Action canceled.');
    }
    setTimeout(() => setOpen(false), 2000); // Close the popup after 2 seconds
  };

  const PopUp = () => (
    <Popconfirm
      title="Delete the task"
      description="Are you sure to delete this task?"
      open={open}
      onConfirm={() => triggerPopUp(true, 'Next step')}
      onCancel={() => triggerPopUp(false, 'Click on cancel')}
      okText="Yes"
      cancelText="No"
    >
      <div />
    </Popconfirm>
  );

  return { triggerPopUp, PopUp };
};

export default usePopUp;
