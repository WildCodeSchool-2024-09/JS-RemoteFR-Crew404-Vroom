import styles from "./Account.module.css";
import Envelope from "../../assets/images/social/envelope.png"
import Profilepic from "../../assets/images/social/person_15439869.png"

function Account() {
  return (
    <div className={styles.accountContainer}>
      <section className={styles.generalContainer}>
        <div className={styles.imgContainer}>
            <img src={Profilepic} alt="profil-picture" />
        </div>
        <span className={styles.idContainer}>
          <input type="text" value="identifiant" />
          <button type="button">changer le mot de passe</button>
        </span>
        <span className={styles.mailContainer}>
          <img src={Envelope} alt="icon-mail" />
          <input type="text" value="Email" />
        </span>
        <span className={styles.fieldContainer}>
          <p>Nom :</p>
          <input type="text" value="Nom" />
        </span>
        <span className={styles.fieldContainer}>
          <p>Prénom :</p>
          <input type="text" value="Prénom" />
        </span>
        <span className={styles.fieldContainer}>
          <p>Date de naissance :</p>
          <input type="date" value="" />
        </span>
        <span className={styles.fieldContainer}>
          <p>Téléphone :</p>
          <input type="text" value="+33" />
        </span>
      </section>
    </div>
  );
}

export default Account;
