import { useCallback, useEffect } from 'react';
import { BsXLg } from 'react-icons/bs';
import styles from './Modal.module.scss';

const Modal = ({ active, setActive, children }) => {
  const closeModalHandler = useCallback(() => {
    setActive(false);
    document.body.style.removeProperty('overflow');
  }, [setActive]);

  const closeModalKeyHandler = useCallback(
    (e) => {
      if (e.code === 'Escape') {
        closeModalHandler();
      }
    },
    [closeModalHandler]
  );

  useEffect(() => {
    window.addEventListener('keydown', closeModalKeyHandler);
    return () => {
      window.removeEventListener('keydown', closeModalKeyHandler);
    };
  }, [closeModalKeyHandler]);

  if (active) document.body.style.overflow = 'hidden';

  return (
    <div className={`${styles.modal} ${active ? styles.active : null}`} onClick={closeModalHandler}>
      <div
        className={`${styles.modal__content} ${active ? styles.active : null}`}
        onClick={(e) => {
          if (!e.target.hasAttribute('data-modal-close')) e.stopPropagation();
        }}
      >
        {children}
        <BsXLg className={styles.modal__closeBtn} data-modal-close />
      </div>
    </div>
  );
};

export default Modal;
