import Subject from './ui/Subject.jsx';
import WeekButton from './ui/WeekButton.jsx';

import styles from './styles/WeekSchedule.module.css';

import React, { useState, useEffect } from 'react';
import { useSchedule } from '../providers/ScheduleProvider.jsx';

export default function WeekSchedule() {
  const { setFocusedSubject, currDay, setCurrDay } = useSchedule();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 750);
  
  const [dayMoveStart, setDayMoveStart] = useState(-355);
  const [dayMoveStep, setDayMoveStep] = useState(142);
  const [dayWidth, setDayWidth] = useState(100);
  const [translateDay, setTranslateDay] = useState('');

  function updateDimensions() {
    if (window.innerWidth < 750) {
      setDayMoveStart(-97);
      setDayMoveStep(52.3);
      setDayWidth(50);
    } 
    else if (window.innerWidth < 950) {
      setDayMoveStart(-160);
      setDayMoveStep(63.7);
      setDayWidth(50);
    } 
    else if (window.innerWidth < 1300) {
      setDayMoveStart(-227);
      setDayMoveStep(90.5);
      setDayWidth(80);
    } 
    else {
      setDayMoveStart(-355);
      setDayMoveStep(142);
      setDayWidth(100);
    }
  }

  useEffect(() => {
    updateDimensions();
    setTranslateDay(`translateX(calc(${dayMoveStart}px + ${dayMoveStep}px * ${currDay}))`);
    setIsMobile(window.innerWidth < 750);

    const handleResize = () => {
      updateDimensions();
      setTranslateDay(`translateX(calc(${dayMoveStart}px + ${dayMoveStep}px * ${currDay}))`);
      setIsMobile(window.innerWidth < 750);
    };

    window.addEventListener('resize', handleResize); 

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [currDay, dayMoveStart, dayMoveStep]);

  return (
    <div className={styles.schedule}>
      <div className={styles.navigation}>
        <WeekButton isMobile={isMobile}/>
        {['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'].map((day, index) => (
          <p 
            key={day}
            className={`${styles.days} ${currDay === index ? styles.selectedDay : ''}`}
            onClick={() => {
              setCurrDay(index);
              setTranslateDay(`translateX(calc(${dayMoveStart}px + ${dayMoveStep}px * ${index}))`);
              setFocusedSubject({});
            }}
          >
            {day}
          </p>
        ))}
        <div className={styles.selectedWrapper} style={{ transform: translateDay, width: `${dayWidth}px` }}></div>
      </div>

      <div className={styles.navUnderLine}></div>

      <div className={styles.subjectsList}>
        <p className={styles.firstTime}>8:20</p>
        {<Subject time={'8:20'} timeIndex={1} />}
        {['9:50', '11:30', '13:00', '14:40', '16:10', '17:50'].map((time, index) => (
          <React.Fragment key={time}>
            <div className={styles.line}></div>
            <p className={styles.time}>{time}</p>
            <Subject time={time} timeIndex={index + 2} />
          </React.Fragment>
        ))}
        <div className={styles.line}></div>
      </div>
    </div>  
  );
};
