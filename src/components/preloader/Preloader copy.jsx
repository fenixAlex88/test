import './Preloader.module.scss';

const Preloader = () => {

    return (
        <div className='preloader'>
            <div className="preloader__container">
	<div className="preloader__round preloader__round-yellow"></div>
	<div className="preloader__round preloader__round-red"></div>
	<div className="preloader__round preloader__round-blue"></div>
	<div className="preloader__round preloader__round-violet"></div>
</div>
        </div>
    )
};

export default Preloader