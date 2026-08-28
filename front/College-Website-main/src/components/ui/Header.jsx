import { useEffect, useState } from 'react';
import useLocalStorage from 'use-local-storage';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [isOpen, setSideBar] = useLocalStorage('isSideBarOpen');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 500);
    };
  
    window.addEventListener('resize', handleResize);
  
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [navigate]);

  return (
    <header className={isOpen ? '' : 'wider'}>
      {isMobile ? 
        <>
          <img src='/public/phone-header.png' alt='Header' />
          <img src='/public/logo.png' alt='Logo' />
        </>
        : 
        <>
          <img src='/public/header.png' alt='Header' />
          <img src='/public/header-logo.png' alt='Logo' />
        </>
      }
    </header>
  );
};

export default Header;