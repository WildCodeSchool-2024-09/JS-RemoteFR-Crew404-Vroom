import contactHeroBanner from "../../assets/images/pictures/contactHeroBanner.jpg";
import contactSideImage from "../../assets/images/pictures/contactSideImage.png";
import envelopeIcon from "../../assets/images/social/envelope.png";
import facebookIcon from "../../assets/images/social/facebook.png";
import instagramIcon from "../../assets/images/social/instagram.png";
import NavRoot from "../../components/NavRoot/NavRoot";
import styles from "./Contact.module.css";

function Contact() {
  return (
    <>
      <NavRoot namePage="CONTACT" />
      <div className={styles["contact-container"]}>
        <img
          src={contactHeroBanner}
          alt="Hero banner for contact page"
          className={styles["contact-hero"]}
        />
        <div className={styles["contact-lower-content"]}>
          <img
            src={contactSideImage}
            alt="Contact side pic"
            className={styles["contact-side-image"]}
          />
          <div className={styles["contact-info"]}>
            <div className={styles["contact-item"]}>
              <img
                src={envelopeIcon}
                alt="Envelope icon"
                className={styles.icon}
              />
              <span>vroom@vroom.vroom</span>
            </div>
            <div className={styles["contact-item"]}>
              <img
                src={instagramIcon}
                alt="Instagram icon"
                className={styles.icon}
              />
              <span>@vroom</span>
            </div>
            <div className={styles["contact-item"]}>
              <img
                src={facebookIcon}
                alt="Facebook icon"
                className={styles.icon}
              />
              <span>@vroom</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
