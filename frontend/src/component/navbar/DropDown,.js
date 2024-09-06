import React, {  useContext, useMemo, useState } from 'react';
import { Button, Popover } from 'antd';
import icons from '../../data/navIcons'

import { Link, useNavigate } from 'react-router-dom';
import popUpData from '../../data/navPopUpData';
import { ContextProvider } from '../../service/Context';
import usePopUp from '../popup/PopUp';








const UserPopUp = () => {
    const { triggerPopUp } = usePopUp();
    const { loginUserDetails, logOut } = useContext(ContextProvider)
    const navigate = useNavigate()

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

    const logOutUser = async () => {
        const responce = await logOut({ gamil: loginUserDetails.gmail })
        if (responce.success) {
            triggerPopUp(true, 'Logout Successfully');
            navigate("/")
        }
    }

 

    const content = (
        <div className='px-0 capitalize flex-col  gap-2 font-mono overflow-hidden hidden md:flex'>
            {popUpData.map((e, i) => (
                e.title === "logout" ? (
                    <p key={i} className='flex gap-2 cursor-pointer' onClick={logOutUser}>
                        {e.icon}
                        {e.title}
                    </p>
                ) : e.title === "admin" ? (
                    loginUserDetails.admin &&
                    <Link key={i} to={`/${e.path}`}>
                        <p className={`flex gap-2 ${loginUserDetails.admin ? "flex " : "hidden"}`}>
                            {e.icon}
                            {e.title}
                        </p>
                    </Link>
                ) : (
                    <Link key={i} to={`/${e.path}`}>
                        <p className='flex gap-2'>
                            {e.icon}
                            {e.title}
                        </p>
                    </Link>
                )
            ))}
        </div>
    );

    return (
        <>

            <Popover placement="bottom" className='order-2 cursor-pointer  text-white md:order-3 hidden h-full md:flex' content={content} arrow={mergedArrow}>
                {/* <Button> */}
                <div className='flex gap-1'>
                    {icons.userIcon}
                    <div className="userName  items-start ">{loginUserDetails.userName}</div>
                    <div className="userName flex items-start md:hidden">You</div>
                </div>
                {/* </Button> */}
            </Popover>

            <div className="userProfile md:hidden flex gap-1 justify-center items-start order-2 md:order-3" onClick={() => navigate("/userprofile")}>

                {icons.userIcon}
                {/* <div className="userName hidden items-start sm  :flex">{loginUserDetails.userName}</div>   */}
                <div className="userName flex items-start md:hidden capitalize">{loginUserDetails.userName} </div>



            </div>

        </>


    );
};
export default UserPopUp;








