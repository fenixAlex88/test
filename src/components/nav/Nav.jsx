import styles from './Nav.module.scss';

const Nav = () => {
  return (
    <header>
      <div className="container">
        <div className={styles.box}>
            <div className={styles.logo}></div>
        </div>
      </div>
    </header>
  );
};

export default Nav;
