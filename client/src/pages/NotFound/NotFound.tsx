import styles from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={styles.notFoundContainer}>
      <div className={styles.background} />
      <h1 className={styles.title}>404 - Page non trouvée</h1>
      <p className={styles.description}>
        Oops! The page you are looking for doesn&apos;t exist.
      </p>
      <a href="/" className={styles.link}>
        Return to Dashboard
      </a>
    </div>
  );
};

export default NotFound;
