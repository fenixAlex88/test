import './Card.scss';
function Card({ image, name }) {
  return (
    <div className='card'>
      <img src={image} alt={name} className='card__img'/>
      <p className='card__title'>{name}</p>
    </div>
  );
}
export default Card;
