import { useState } from 'react';
import styles from './styles/WeekButton.module.css'
import { useSchedule } from '../../providers/ScheduleProvider';

export default function WeekButton({isMobile}) {
  const { currWeek, setCurrWeek } = useSchedule();
  const [dropMenu, setDropMenu] = useState(false);

  return (
    <>
      <button 
        className={`${styles.weekBtn} ${isMobile ? 'active' : null}`}
        onClick={() => setDropMenu(!dropMenu)}
      >
        <i className="material-symbols-outlined">view_week</i>
      </button>
      <div className={`${styles.dropdown} ${dropMenu ? styles.active : ''}`}>
        <button onClick={() => setCurrWeek(1)} className={currWeek === 1 ? styles.selectedWeek : styles.week}>
          Тиждень 1
        </button>
        <button onClick={() => setCurrWeek(2)} className={currWeek === 2 ? styles.selectedWeek : styles.week}>
          Тиждень 2
        </button>
      </div>
    </>
  )
};

