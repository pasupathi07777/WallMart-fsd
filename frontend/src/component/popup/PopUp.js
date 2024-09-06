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
    setTimeout(() => setOpen(false), 2000); 
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
