import React, { useState } from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import style from './Nav.module.scss';

const Nav = ({ title = '', children }) => {
  const [isNav, setIsNav] = useState(false);
  if (isNav && window.innerWidth <= 900) document.body.style.overflow = 'hidden';

  const toggleIsNavHandler = () => {
    setIsNav(!isNav);
    if (isNav) document.body.style.removeProperty('overflow');
  };
  return (
      <nav className={style.wrapper}>
        <div className={style.title}>{title}</div>
        <div className={`${style.menu} ${isNav ? style.active : ''}`} onClick={toggleIsNavHandler}>
          {children}
        </div>
        <div onClick={toggleIsNavHandler} className={style.mobile_btn}>
          {isNav ? <AiOutlineClose size={35} /> : <AiOutlineMenu size={35} />}
        </div>
      </nav>
  );
};

export default Nav;
