
import React from 'react';
import { Spin } from 'antd';

const Loader = ({ spinning }) => {
  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 ${spinning ? 'visible' : 'invisible'}`}>
      <Spin size="large" spinning={spinning} />
    </div>
  );
};

export default Loader;

