import styles from './PersonInfo.module.scss';

const PersonInfo = ({ personKeys, person }) => {
  return (
    <div className={styles.person}>
      <img src={person.image} alt={person.name} className={styles.person__img} />
      <div className={styles.person__description}>
        {personKeys.map((item, i) => {
          return (
            <div key={i} className={styles.person__quality}>
              <div className={styles.person__title}>{item} </div>
              <div className={styles.person__value}>{person[item]}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PersonInfo;
