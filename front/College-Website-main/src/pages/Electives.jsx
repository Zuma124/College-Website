import styles from './styles/Electives.module.css';

import Sidebar from '../components/Sidebar';
import Header from '../components/ui/Header';
import ElectiveCard from '../components/ElectiveCard';

import { useState, useEffect } from 'react';
import useLocalStorage from 'use-local-storage';

import { saveSelection } from '../hooks/useFetchSave';
import useFetchSubjects from '../hooks/useFetchElect';

export default function Electives() {
  const [isDark, setDark] = useLocalStorage('isDark');
  const [isOpen, setSideBar] = useLocalStorage('isSideBarOpen');

  useEffect(() => {
    const handleResize = () => {  
      if (window.innerWidth < 1300) {
        setSideBar(false);
      }
    };
  
    window.addEventListener('resize', handleResize);
  
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [selected, setSelected] = useState([]);
  const { subjects, focusedSubject, setFocusedSubject } = useFetchSubjects();

  const toggleSelect = (name) => {
    setSelected((prevSelected) => {
      if (prevSelected.includes(name)) {
        return prevSelected.filter((item) => item !== name);
      } else if (prevSelected.length < 2) {
        return [...prevSelected, name];
      } else {
        return prevSelected;
      }
    });
  };

  const handleSave = async () => {
    try {
      await saveSelection(userId, selected);
      alert('Дисципліни успішно збережено!');
    } catch (error) {
      console.error('Помилка збереження:', error);
      alert('Сталася помилка при збереженні вибору.');
    }
  };

  return (
    <>
      <Sidebar 
        isDark={isDark}
        handleTheme={() => setDark(!isDark)}
        isOpen={isOpen}
        handleSize={() => {!setSideBar(!isOpen)}}
      />
      <main className={`${isOpen ? '' : 'wider'}`}>
        <Header/>
        <div className={`container ${isOpen ? '' : 'wider'}`}>
          <div className={styles.content}>
            <div className={styles.header}>
              <h1>Виберіть 2 додаткові дисципліни, які ви хочете вивчати цього року!</h1>
              <p className={styles.counter}> {selected.length} з 2</p>
            </div>

            <div className={styles.cards}>
              {subjects.map((subject) => {
                const isSelected = selected.includes(subject.name);
                const isDisabled = selected.length >= 2 && !isSelected; 
                
                return (
                  <ElectiveCard 
                    key={subject.name}
                    subject={subject}
                    toggleSelect={toggleSelect}
                    isSelected={isSelected}
                    isDisabled={isDisabled}
                  />
                );
              })}
            </div>

            <button
              className={styles.saveButton}
              onClick={handleSave}
              disabled={selected.length !== 2}
            >
              <i className="material-symbols-outlined">place_item</i> 
              Зберегти
            </button>
          </div>
        </div>
      </main>
    </>
  );
};
