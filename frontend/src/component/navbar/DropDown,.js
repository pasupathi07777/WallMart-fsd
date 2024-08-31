import React, { useCallback, useContext, useMemo, useState } from 'react';
import { Button, Popover } from 'antd';
import icons from '../../data/navIcons'

import { Link, useNavigate } from 'react-router-dom';
import popUpData from '../../data/navPopUpData';
import { ContextProvider } from '../../service/Context';









const UserPopUp = () => {

    const { loginUserDetails, logOut } = useContext(ContextProvider)
    const navigate=useNavigate()

    const [arrow, setArrow] = useState('Show');
    const mergedArrow = useMemo(() => {
        if (arrow === 'Hide') {
            return false;
        }
        if (arrow === 'Show') {
            return true;
        }
        return {
            pointAtCenter: true,
        };
    }, [arrow])

    const content = (
        <div className='px-0 capitalize  flex-col flex gap-2 font-mono  overflow-hidden ' >
            {popUpData.map((e, i) => (
                e.title === "logout" ?
                    <p key={i} className='flex gap-2 cursor-pointer' onClick={() => logOut({ gamil: loginUserDetails.gmail })} >{e.icon}{e.title}</p>
                    :
                    <Link key={i} to={`/${e.path}`}>  <p className='flex gap-2' >{e.icon}{e.title}</p></Link>


            ))}

        </div>
    );
    return (
        <>

            <Popover placement="bottom" className='order-2  md:order-3 hidden h-full md:flex' content={content} arrow={mergedArrow}>
                <Button>
                    {icons.userIcon}
                    <div className="userName hidden items-start md:flex">{loginUserDetails.userName}</div>
                    <div className="userName flex items-start md:hidden">You</div>
                </Button>
            </Popover>
           
                <div className="userProfile md:hidden flex gap-1 justify-center items-start order-2 md:order-3" onClick={()=>navigate("/userprofile")}>

                    {icons.userIcon}
                    {/* <div className="userName hidden items-start sm  :flex">{loginUserDetails.userName}</div>   */}
                    <div className="userName flex items-start md:hidden">You</div>



                </div>
          
        </>


    );
};
export default UserPopUp;








