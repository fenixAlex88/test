import { FaCopyright } from 'react-icons/fa';
import styles  from './Footer.module.scss';
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <FaCopyright className={styles.footer__copy}/>
      <span>2023 Aleksey Pekar</span>
    </footer>
  );
};
export default Footer;
