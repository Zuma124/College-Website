import { useEffect, useRef, useState } from 'react';

import styles from './styles/LoginForm.module.css';
import { toast } from 'sonner';

import { useAuth } from '../providers/AuthProvider';

export default function LoginForm() {
  const auth = useAuth();
  
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  
  const [canLogin, setCanLogin] = useState(false);

  useEffect(() => {
    if (userEmail.trim() != '' && userPassword.trim() != '') setCanLogin(true);
    else setCanLogin(false);
  }, [userEmail, userPassword]);

  const handleUserData = async () => {
    if (!userEmail.endsWith('@chnu.edu.ua')) {
      toast.error('Пошта повинна мати закінчення @chnu.edu.ua');
      return;
    } 
    else auth.login(userEmail, userPassword);
  }

  return (
    <div className={styles.loginForm}>
        <img src="/logo.png" alt="logo" className={styles.logo}/>
        <h1 className={styles.headingText}>Вхід</h1>

        <div>
            <p className={styles.inputLabel}>Електронна пошта</p>
            <input 
              ref={emailRef} 
              onChange={() => setUserEmail(emailRef.current.value)} 
              value={userEmail} 
              type="adress" 
              name="adress" 
              className={styles.input}/>
        </div>
        <div>
            <p className={styles.inputLabel}>Пароль</p>
            <input 
              ref={passwordRef} 
              onChange={() => setUserPassword(passwordRef.current.value)} 
              value={userPassword} 
              type="password" 
              name="password" 
              className={styles.input}/>
        </div>
        <button 
          className={`${styles.loginBtn} ${canLogin ? styles.active : ''}`}
          onClick={canLogin ? handleUserData : null}
        >
          Увійти
        </button>
    </div>
  );
};