import { Link } from 'react-router-dom';

import '/src/index.css';
import styles from './styles/Sidebar.module.css';
import { useAuth } from '../providers/AuthProvider';

export default function Sidebar({isDark, handleTheme, isOpen, handleSize}) {
  const auth = useAuth();

  const user = JSON.parse(localStorage.getItem('user'));
  const parts = user.name.split(" ");
  const nameSurname = `${parts[0]} ${parts[1]}`;

  return ( 
    <nav className={`${styles.sidebar} ${isOpen ? '' : styles.close}`}>
      <div className={styles.header}>

        <section className={styles.section}>
          <div className={styles.profileCircle}></div>
          <p className={styles.nameSurname}>{nameSurname}</p>
          <div className={styles.sidebarToggle} onClick={handleSize}>
            <i className="material-symbols-outlined">first_page</i>
          </div>
        </section>

        <section className={styles.section}>
          <Link to="/settings" className={styles.settingsLink}>
            <button className={styles.settings}>
              <span>Налаштування</span>
              <i className="material-symbols-outlined">{isOpen ? '' : 'settings'}</i>  
            </button>
          </Link>
          <div className={styles.toggleWrapper}>
            <input
              type="checkbox"
              id="check"
              className={styles.themeToggle} 
              checked={isDark}
              onChange={handleTheme}
            />
            <label htmlFor="check">
              <i className="material-symbols-outlined">{isDark ? 'dark_mode' : 'light_mode'}</i>
            </label>
          </div>
        </section>

      </div>

      <div className={styles.line}></div>

      <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link to="/schedule" className={styles.link}>
              <i className="material-symbols-outlined">ad</i>
            </Link>
            <Link to="/schedule" className={styles.link}>
              <p>Розклад</p>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/electives" className={styles.link}>
              <i className="material-symbols-outlined">priority</i>
            </Link>
            <Link to="/electives" className={styles.link}>
              <p>Вибіркові дисципліни</p>
            </Link>
          </li>
        <li className={styles.navItem}>
          <Link className={styles.link} onClick={() => auth.logout()}>
            <i className="material-symbols-outlined">logout</i>
          </Link>
          <Link className={styles.link} onClick={() => auth.logout()}>
            <p>Вийти</p>
          </Link>
        </li>
      </ul>
    </nav>
  );
}; 
