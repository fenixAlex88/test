import styles from './Header.module.scss';
import logo from '../../img/Rick-And-Morty-Logo.png'
const Header = () =>{
  return (
    <header className={styles.header}>
        <img src={logo} alt="logo" className={styles.header__img}/>
    </header>
  );
}
export default Header;