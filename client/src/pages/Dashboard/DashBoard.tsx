import styles from "./Dashboard.module.css";

function Dashboard() {
  return (
    <div className={styles.dashboardContainer}>
      {/* Box 1 */}
      <div className={styles.dashboardBox}>
        <h2 className={styles.dashboardTitle}>Mes Points</h2>
        <div className={styles.dashboardButtons}>
          <div className={styles.buttonLarge}>B1</div>
          <div className={styles.buttonSmall}>B2</div>
          <div className={styles.buttonSmall}>B3</div>
          <div className={styles.buttonSmall}>B4</div>
        </div>
      </div>

      {/* Box 2 */}
      <div className={styles.dashboardBox}>
        <h2 className={styles.dashboardTitle}>Mes événements</h2>
        <input
          type="text"
          className={styles.searchBar}
          placeholder="Recherche"
        />
        <div className={styles.detailsContainer}>
          <div
            className={styles.detailsImage}
            style={{
              backgroundImage: `url('/client/src/assets/images/pictures/contactHeroBanner.jpg')`,
              backgroundSize: "cover",
            }}
          />
          <div className={styles.detailsInputs}>
            <input
              type="text"
              className={styles.detailsInput}
              placeholder="Date"
            />
            <input
              type="text"
              className={styles.detailsInput}
              placeholder="Localisation"
            />
          </div>
        </div>
        <div className={styles.placeholderImagePlus}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            width="24"
            height="24"
          >
            <title>Plus Button</title>
            <path d="M12 5v14m-7-7h14" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
      </div>

      {/* Box 3 */}
      <div className={styles.dashboardBox}>
        <h2 className={styles.dashboardTitle}>Mes véhicules</h2>
        <input
          type="text"
          className={styles.searchBar}
          placeholder="Recherche"
        />
        <div className={styles.imagesContainer}>
          <div className={styles.placeholderImage} />
          <div className={styles.placeholderImage} />
        </div>
        <div className={styles.placeholderImageSmall} />
      </div>

      {/* Box 4 */}
      <div className={styles.dashboardBox}>
        <h2 className={styles.dashboardTitle}>Annonces favorites</h2>
        <input
          type="text"
          className={styles.searchBar}
          placeholder="Recherche"
        />
      </div>
    </div>
  );
}

export default Dashboard;
