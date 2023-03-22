import './Card.scss';
function Card({ id, image, name, showModalInfo }) {
  const infoModalHandler = () =>{
    showModalInfo(id);
  }
  return (
    <div className='card' onClick={infoModalHandler}>
      <img src={image} alt={name} className='card__img'/>
      <p className='card__title'>{name}</p>
    </div>
  );
}
export default Card;
