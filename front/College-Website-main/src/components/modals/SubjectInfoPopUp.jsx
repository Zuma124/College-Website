import { useSchedule } from '../../providers/ScheduleProvider';
import styles from './SubjectInfoPopUp.module.css';

export default function SubjectInfoPopUp() {
  const { focusedSubject, setFocusedSubject } = useSchedule();
  
  return ( focusedSubject.subject ?
    <>
      <div className={styles.blurBackground}></div>

      <div className={styles.subjInfoPopUp} >
        <button onClick={() => setFocusedSubject({})}>
          <i className='material-symbols-outlined'>close_small</i>
        </button>
        <p><span>Предмет:</span> <br/> { focusedSubject.subject ? focusedSubject.subject : '-' }</p>
        <p><span>Формат:</span> <br/> { focusedSubject.type ? focusedSubject.type : '-' }</p>
        <p><span>Викладач:</span> <br/> { focusedSubject.teacher ? focusedSubject.teacher : '-' }</p>
        <p><span>Аудиторія:</span> <br/> { focusedSubject.place ? focusedSubject.place : '-' }</p>
      </div> 
    </>
    : null 
  );
};

