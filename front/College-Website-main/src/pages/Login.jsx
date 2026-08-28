import styles from './styles/Login.module.css';

import React from 'react';
import { useEffect } from 'react';

import LoginForm from '../components/LoginForm';

export default function Login() {
  useEffect(() => {
    localStorage.setItem('isDark', window.matchMedia('(prefers-color-scheme: dark)').matches);
  }, []);

  return (
    <>  
      <div className={styles.container}>
        <img src="/college-building.png" alt="College Building" className={styles.collegeBuildingImg}/>
        <div className={styles.formWrapper}>
          <LoginForm/>
        </div>
      </div>
    </> 
  );
};
