import logo from '../../../assets/img/Rick-And-Morty-Logo.png';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <img src={logo} alt="logo" className={styles.header__img} />
    </header>
  );
};
export default Header;
