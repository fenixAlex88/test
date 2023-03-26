import { FaCopyright, FaGithub } from 'react-icons/fa';
import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <FaCopyright className={styles.footer__copy} />
      <span>2023 Aleksey Pekar</span>
      <a href="https://github.com/fenixAlex88/test" target="_blank" rel="noreferrer" >
        <FaGithub  className={styles.footer__link}/>
      </a>
    </footer>
  );
};
export default Footer;
