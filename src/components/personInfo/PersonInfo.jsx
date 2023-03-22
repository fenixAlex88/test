import './PersonInfo.scss';

const PersonInfo = ({ personKeys, person }) => {
  return (
    <div className="person">
      <img src={person.image} alt={person.name} className="person__img" />
      <div className="person__description">
        {personKeys.map((item, i) => {
          return (
            <div key={i} className="person__quality">
              <div className="person__title">{item} </div>
              <div className="person__value">{person[item]}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PersonInfo;
