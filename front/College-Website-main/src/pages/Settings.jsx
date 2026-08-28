import styles from './styles/Settings.module.css'

import Sidebar from '../components/Sidebar';
import MobileNavbar from '../components/MobileNavbar';

import useLocalStorage from 'use-local-storage';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 750);

  const [isDark, setDark] = useLocalStorage('isDark');
  const [isOpen, setSideBar] = useLocalStorage('isSideBarOpen');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1300)
        setSideBar(false);

      setIsMobile(window.innerWidth < 750);
    };
  
    window.addEventListener('resize', handleResize);
  
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [navigate]);
  
  return (
    <>
      {!isMobile ?
        <>
          <Sidebar 
            isDark={isDark}
            handleTheme={() => setDark(!isDark)}
            isOpen={isOpen}
            handleSize={() => {!setSideBar(!isOpen)}}
          />
          <main className={`${isOpen ? '' : 'wider'}`}>
            <div className={styles.inDevelopment}>
              <img src="../public/developing.gif" className={styles.inDevelopmentGif} />
              <h3>Сторінка знаходиться в розробці...</h3>
            </div>
          </main>
        </>
        : 
        <>
          <main className='wider'>
            <MobileNavbar/>
            <div className={styles.inDevelopment}>
              <img src="../public/developing.gif" className={styles.inDevelopmentGif} />
              <h3>Сторінка знаходиться в розробці...</h3>
            </div>
          </main>
        </>
      }
    </>
  ); 
};

export default Settings;
