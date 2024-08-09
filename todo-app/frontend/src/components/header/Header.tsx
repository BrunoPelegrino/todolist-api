import styles from './Header.module.scss';
import logo from '../../assets/logo.svg'

function Header() {
    
  return (
    <header className={styles.headerContainer}>
      <div className={styles.logo}>
        <img src={logo} alt="Logo" />
        <h1>CoreNotes</h1>
      </div>
      <div className={styles.searchBar}>
        <input type="text" placeholder="Search notes"  />
      </div>
    </header>
  );
}

export default Header;
