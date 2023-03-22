import './Header.scss';
import logo from '../../img/Rick-And-Morty-Logo.png'
const Header = () =>{
  return (
    <header className='header'>
        <img src={logo} alt="logo" className='header__img'/>
    </header>
  );
}
export default Header;