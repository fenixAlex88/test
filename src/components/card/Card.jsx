import styles from './Card.module.scss';

function Card({ id, image, name, showModalInfo }) {
  const infoModalHandler = () => {
    showModalInfo(id);
  };

  return (
    <div className={styles.card} onClick={infoModalHandler}>
      <img src={image} alt={name} className={styles.card__img} />
      <p className={styles.card__title}>{name}</p>
    </div>
  );
}
export default Card;
