// import React from 'react';
// import { Spin } from 'antd';

// const CartLoder = ({ spinning=true }) => {
//   return (
//     <div
//       className={`fixed inset-0 flex items-center justify-center bg-opacity-60 z-50 ${spinning ? 'visible' : 'invisible'}`}
//       style={{ width: '50px', height: '50px' }} // Custom width and height
//     >
//       <Spin size="small" spinning={spinning} />
//     </div>
//   );
// };

// export default CartLoder;

import React from 'react';
import { Spin } from 'antd';


const CartLoder = ({ spinning = true }) => {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-opacity-60 z-50 w-fit px-2  ${spinning ? 'visible' : 'invisible'}`}
      style={{ }} // Custom width and height
    >
      <Spin size="small" spinning={spinning} />
    </div>
  );
};

export default CartLoder;
