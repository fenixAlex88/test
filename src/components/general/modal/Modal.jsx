import { BsXLg } from 'react-icons/bs';
import styles from './Modal.module.scss';

const Modal = ({ active, setActive, children }) => {
  if (active) document.body.style.overflow = 'hidden';
  const closeModalHandler = () => {
    setActive(false);
    document.body.style.removeProperty('overflow');
  };
  return (
    <div className={`${styles.modal} ${active ? styles.active : null}`} onClick={closeModalHandler}>
      <div
        className={`${styles.modal__content} ${active ?  styles.active : null}`}
        onClick={(e) => {
          if (!e.target.hasAttribute('data-modal-close')) e.stopPropagation();
        }}
      >
        {children}
        <BsXLg className={styles.modal__closeBtn} data-modal-close/>
      </div>
    </div>
  );
};

export default Modal;
