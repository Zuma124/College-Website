import styles from './styles/WeekToggle.module.css';

import { useState, useEffect } from 'react';
import { useSchedule } from '../../providers/ScheduleProvider';

export default function WeekToggle() {
  const { currWeek, setCurrWeek } = useSchedule();

  const [weekStep, setWeekStep] = useState(60);
  const [weekWidth, setWeekWidth] = useState('110px');
  const [weekTextGap, setWeekTextGap] = useState(19);
  const [translateWeek, setTranslateWeek] = useState('');
  
  function updateDimensions() {
    if (window.innerWidth < 950) {
        setWeekStep(45);
        setWeekWidth('90px');
        setWeekTextGap('10%');
      } else if (window.innerWidth < 1300) {
        setWeekStep(45);
        setWeekWidth('90px');
        setWeekTextGap('10%');
      } else {
        setWeekStep(60);
        setWeekWidth('110px');
        setWeekTextGap('19%');
    }
  }

  useEffect(() => {
    updateDimensions();
    setTranslateWeek(`translateX(${currWeek === 1 ? '-' : ''}${weekStep}px`);

    const handleResize = () => {
      updateDimensions();
      setTranslateWeek(`translateX(${currWeek === 1 ? '-' : ''}${weekStep}px`);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [currWeek, weekStep]);

  return (
    <div className={styles.weekToggle} style={{gap: weekTextGap}}>
      <p  
        className={currWeek === 1 ? styles.selectedWeek : ''} 
        onClick={() => {setCurrWeek(1); setTranslateWeek(`translateX(-${weekStep}px`)}}>
          1 Тиждень
      </p>
      <p  
        className={currWeek === 2 ? styles.selectedWeek : ''} 
        onClick={() => {setCurrWeek(2); setTranslateWeek(`translateX(${weekStep}px`)}}>
          2 Тиждень
      </p>
      <div className={styles.weekTogWrap} style={{transform: translateWeek, width: weekWidth}}></div>
    </div>  
  );
};
