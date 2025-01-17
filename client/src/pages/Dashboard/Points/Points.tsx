import type React from "react";
import styles from "./Points.module.css";

const Points: React.FC = () => {
  const points = 420; // Example points balance

  return (
    <div className={styles.pointsContainer}>
      <h2 className={styles.title}>Mes Points</h2>
      <div className={styles.pointsContent}>
        <div className={styles.pointsBox}>
          <p className={styles.pointsLabel}>Solde :</p>
          <p className={styles.pointsValue}>{points}</p>
        </div>
        <button type="button" className={styles.actionButton}>
          Faire un essai
        </button>
        <button type="button" className={styles.actionButton}>
          Trouver un événement
        </button>
        <button type="button" className={styles.actionButton}>
          Dépenser mes points
        </button>
      </div>
    </div>
  );
};

export default Points;
