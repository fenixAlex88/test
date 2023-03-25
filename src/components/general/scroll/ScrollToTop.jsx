import { useEffect, useState } from 'react';
import { BsFillShiftFill } from 'react-icons/bs';
import styles from './ScrollToTop.module.scss';

function ScrollToTop() {
  const [isVisiable, setIsVisible] = useState(false);

  const toggleVisible = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisible);
    return () => {
      window.removeEventListener('scroll', toggleVisible);
    };
  }, []);
  return (
    <div className={`${styles.scrollToTop} ${!isVisiable ? styles.hide : null}`}>
      <button type="button" onClick={scrollToTop} className={styles.scrollToTop__btn}>
        <BsFillShiftFill />
        <div className={styles.toTop}>to top</div>
      </button>
    </div>
  );
}

export default ScrollToTop;
