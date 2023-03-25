import React, { useState } from 'react';
import style from './Navbar.module.scss';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

const Navbar = ({ title ='', children }) => {

  const [isNav, setIsNav] = useState(false);

  return (
      <div className="container">
        <div className={style.wrapper}>
          <div className={style.title}>
            {title}
          </div>
          <div className={isNav ? [style.menu, style.active].join(' ') : [style.menu]} onClick={()=>{setIsNav(false)}}>{children}</div>
          <div onClick={() => setIsNav(!isNav)} className={style.mobile_btn}>
            {isNav ? <AiOutlineClose size={35} /> : <AiOutlineMenu size={35} />}
          </div>
        </div>
      </div>
  );
};

export default Navbar;
