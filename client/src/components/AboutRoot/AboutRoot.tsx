import styles from "./AboutRoot.module.css";

/* Import des Images */
import aboutCar from "../../assets/images/pictures/aboutCar.jpg";
import aboutCarGathering from "../../assets/matiere/about2.jpg";
import aboutImg3 from "../../assets/matiere/car3.jpg";
import aboutImg2 from "../../assets/matiere/home1.jpg";

function AboutRoot() {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Bienvenue sur RoadAddict</h2>

      <div className={styles.content}>
        <img src={aboutCar} alt="Créateur" className={styles.image} />
        <p className={styles.text}>
          Le principe : À la suite de votre inscription sur RoadAddict, vous
          pourrez compléter votre profil et choisir entre deux rôles :
          <br />
          <br />
          <strong>Addictos</strong> : Découvrez et testez de nouveaux véhicules,
          discutez avec les propriétaires et élargissez votre horizon
          automobile.
          <br />
          <br />
          <strong>Addictors</strong> : Faites découvrir votre véhicule aux
          Addictos et accumulez des AddictCoins pour tester à votre tour
          d'autres voitures.
        </p>
      </div>

      <div className={styles.imageGrid}>
        <img
          src={aboutCarGathering}
          alt="Rassemblement de véhicules"
          className={styles.gridImage}
        />
        <img
          src={aboutImg2}
          alt="Passion automobile"
          className={styles.gridImage}
        />
        <img
          src={aboutImg3}
          alt="Expérience automobile"
          className={styles.gridImage}
        />
      </div>

      <p className={styles.text}>
        <strong>Pourquoi rejoindre RoadAddict ?</strong>
        <br />🚗 Testez des véhicules exclusifs.
        <br />🏁 Rencontrez d'autres passionnés.
        <br />💰 Économisez du temps et de l'argent avant un achat.
        <br />🔎 Apprenez à repérer les bons véhicules.
      </p>
    </section>
  );
}

export default AboutRoot;
