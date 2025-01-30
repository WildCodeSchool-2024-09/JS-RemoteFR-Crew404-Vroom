import contactHeroBanner from "../../assets/images/pictures/contactHeroBanner.jpg";
import contactSideImage from "../../assets/images/pictures/contactSideImage.png";
import envelopeIcon from "../../assets/images/social/envelope.png";
import facebookIcon from "../../assets/images/social/facebook.png";
import instagramIcon from "../../assets/images/social/instagram.png";
import styles from "./ContactRoot.module.css";

const contacts = [
  {
    id: 1,
    icon: envelopeIcon,
    alt: "Email icon",
    text: "contact@roadaddict.fr",
  },
  { id: 2, icon: instagramIcon, alt: "Instagram icon", text: "@roadaddict" },
  { id: 3, icon: facebookIcon, alt: "Facebook icon", text: "@roadaddict" },
];

function ContactRoot() {
  return (
    <section className={styles.contactSection}>
      <div className={styles.contactContainer}>
        <img
          src={contactHeroBanner}
          alt="Hero banner"
          className={styles.heroImage}
        />
        <div className={styles.contactContent}>
          <img
            src={contactSideImage}
            alt="Side banner"
            className={styles.sideImage}
          />
          <div className={styles.contactInfo}>
            <h2>Contactez-nous</h2>
            <p>
              Besoin d’informations ? Retrouvez-nous sur nos réseaux ou par
              e-mail.
            </p>
            <div className={styles.contactList}>
              {contacts.map((contact) => (
                <div key={contact.id} className={styles.contactItem}>
                  <img
                    src={contact.icon}
                    alt={contact.alt}
                    className={styles.icon}
                  />
                  <span>{contact.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactRoot;
