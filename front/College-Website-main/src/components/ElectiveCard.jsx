import styles from './styles/ElectiveCard.module.css';

export default function ElectiveCard({ subject, toggleSelect, isSelected, isDisabled }) {
  return (
    <div
      key={subject.name}
      className={`${styles.card} ${isSelected ? styles.selected : ''}`}
    >
      <h2 className={styles.subjectName}>{subject.name}</h2>
      <p className={styles.subjectDescription}>{subject.description}</p>
      <p className={styles.subjectTeacher}> {subject.teacher || "Не вказано"} </p>
      <button
        className={`${styles.selectButton} ${isSelected ? styles.cancel : ''}`}
        onClick={() => toggleSelect(subject.name)}
        disabled={isDisabled}
      >
        {isSelected ? 'Скасувати' : 'Вибрати'}
      </button>
    </div>
  );
}
