import { useSchedule } from '../../providers/ScheduleProvider';
import styles from './styles/SubjectInfo.module.css';

export default function SubjectInfo() {
  const { focusedSubject} = useSchedule();

  return (
    <div className={styles.subjInfo} >
        <h1>Опис</h1>
        <p><span>Предмет:</span> <br/> { focusedSubject.subject ? focusedSubject.subject : '-' }</p>
        <p><span>Формат:</span> <br/> { focusedSubject.type ? focusedSubject.type : '-' }</p>
        <p><span>Викладач:</span> <br/> { focusedSubject.teacher ? focusedSubject.teacher : '-' }</p>
        <p><span>Аудиторія:</span> <br/> { focusedSubject.place ? focusedSubject.place : '-' }</p>
    </div>  
  );
};