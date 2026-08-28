import { useState } from 'react';
import { useAuth } from '../providers/AuthProvider';
import styles from './styles/MobileNavbar.module.css';
import { Link } from 'react-router-dom';

export default function MobileNavbar() {
  const auth = useAuth();
  const [dropMenu, setDropMenu] = useState(false);

  return (
    <div className={styles.mobileNavbar}>
        <button onClick={() => setDropMenu(!dropMenu)}>
            <i className='material-symbols-outlined'>menu</i>
        </button>
        <div className={`${styles.dropdown} ${dropMenu ? styles.active : ''}`}>
            <Link to="/settings" className={styles.link}>
              <p>Налаштування</p>
            </Link>
            <Link to="/schedule" className={styles.link}>
              <p>Розклад</p>
            </Link>
            <Link to="/electives" className={styles.link}>
              <p>Вибіркові дисципліни</p>
            </Link>
            <Link className={styles.link} onClick={() => auth.logout()}>
              <p>Вийти</p>
            </Link>
        </div>
    </div>
  );
};

 