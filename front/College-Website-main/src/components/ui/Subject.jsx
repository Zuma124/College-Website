import { useSchedule } from '../../providers/ScheduleProvider';
import styles from './styles/Subject.module.css';
import { useState, useEffect } from 'react';

export default function Subject({ time, timeIndex }) {
  const { subjects, focusedSubject, setFocusedSubject, currDay, currWeek } = useSchedule();

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  useEffect(() => {
    const firstSubject = subjects.find(subj => 
      subj.week === currWeek &&
      subj.day === days[currDay]
    );
    
    if (firstSubject && window.innerWidth > 750) setFocusedSubject(firstSubject);
    else setFocusedSubject({});

  }, [subjects, currDay, currWeek]);
  
  const [subjToShow, setSubjToShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSubjToShow(true);
    }, 50);

    return () => clearTimeout(timer);
  }, [subjects, currDay, currWeek]);

  const subject = subjects.find(subj => 
    subj.week === currWeek && 
    subj.day === days[currDay] && 
    subj.number === timeIndex
  );
  
  if (!subject) return '';
  
  return (
    <div
      key={subject.subject}
      data-room={ subject.place === null ? 'online' : 'classroom' }
      className={ 
        `${styles.subject} 
        ${subjToShow ? styles.subjectShown : ''} 
        ${focusedSubject === subject ? styles.subjectFocus : ''}` 
      }
      style={ time !== '8:20' ? { transform: `translateY(calc(110px * ${timeIndex - 1}))` } : {} }
      onClick={ () => { setFocusedSubject(subject) } }
    >
      <div className={ styles.verticalLine }></div>
      <p className={ styles.subjName }>{ subject.subject }</p>
      <p className={ styles.subjRoom }>{ subject.place || subject.type }</p>
    </div>
  );
};
