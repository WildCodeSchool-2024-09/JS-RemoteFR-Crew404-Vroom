import { Helmet } from "react-helmet-async";
import ContactRoot from "../../components/ContactRoot/ContactRoot";
import Footer from "../../components/Footer/Footer";
import NavRoot from "../../components/NavRoot/NavRoot";
import css from "./Contact.module.css";

function Contact() {
  return (
    <>
      {/* Balise Header présent dans NavRoot */}
      <NavRoot namePage="CONTACT" />

      <main className={css.MainContact}>
        <ContactRoot />
      </main>

      <Footer />
    </>
  );
}

export default Contact;
