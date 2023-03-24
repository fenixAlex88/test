import stules from'./Preloader.module.scss';

const Preloader = () => {
  return (
    <div className={stules.preloader}>
      <div className={stules.preloader__content}></div>
    </div>
  );
};

export default Preloader;
