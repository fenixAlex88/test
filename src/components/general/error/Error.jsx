import styles from './Error.module.scss';

const Error = ({ error }) => {
  return (
    <div className={styles.error}>
      <h3 className={styles.error__title}>
        Something went wrong.
        <br />
        Check the data and try again later.
      </h3>
      <p className={styles.error__message}>{error.message}</p>
    </div>
  );
};

export default Error;
