import styles from "./Account.module.css"
import Envelope from "../../assets/images/social/envelope.png"

function Account() {

    return ( 
        <div className={styles.accountContainer}>
            <section className={styles.generalContainer}>
                <img src="/" alt="profil-picture" />
                <span className={styles.idContainer}>
                    <input type="text" value="identifiant"/>
                    <button type="button">changer le mot de passe</button>
                </span>
                <span className={styles.mailContainer}>
                    <img src= "../../assets/images/social/envelope.png" alt="icon-mail" />
                    <input type="text" value="Email" />
                </span>
                <span className={styles.fieldContainer}>
                    <p>Nom :</p>
                    <input type="text" value="Nom"/>
                </span>
                <span className={styles.fieldContainer}>
                    <p>Prénom :</p>
                    <input type="text" value="Prénom"/>
                </span>
                <span className={styles.fieldContainer}>
                    <p>Date de naissance :</p>
                    <input type="date" value=""/>
                </span>
                <span className={styles.fieldContainer}>
                    <p>Téléphone :</p>
                    <input type="text" value="+33"/>
                </span>
            </section>
        </div>
    );
}

export default Account;