import { BsXLg } from 'react-icons/bs';
import './Modal.scss';

const Modal = ({ active, setActive, children }) => {
  if (active) document.body.style.overflow = 'hidden';
  const closeModalHandler = () => {
    setActive(false);
    document.body.style.removeProperty('overflow');
  };
  return (
    <div className={`modal${active ? ' modal-active' : ''}`} onClick={closeModalHandler}>
      <div
        className={`modal__content${active ? ' modal__content-active' : ''}`}
        onClick={(e) => {
          if (!e.target.className.animVal) e.stopPropagation();
        }}
      >
        {children}
        <BsXLg className="modal__closeBtn" />
      </div>
    </div>
  );
};

export default Modal;
