import { FaCopyright } from 'react-icons/fa';
import './Footer.scss';
const Footer = () => {
  return (
    <footer className="footer">
      <FaCopyright className='footer__copy'/>
      <span>2023 Aleksey Pekar</span>
    </footer>
  );
};
export default Footer;
