import { useEffect, useState } from 'react';
import { BiArrowToTop } from 'react-icons/bi';
import './ScrollToTop.scss';

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
    <div className={`scrollToTop${isVisiable ? '' : ' hide'}`}>
      <button type="button" onClick={scrollToTop} className="scrollToTop__btn">
        <BiArrowToTop className="scrollTOTop__arrow" />
      </button>
    </div>
  );
}

export default ScrollToTop;
