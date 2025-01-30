import ContactRoot from "../../components/ContactRoot/ContactRoot";
import NavRoot from "../../components/NavRoot/NavRoot";

function Contact() {
  return (
    <>
      {/* Balise Header présent dans NavRoot */}
      <NavRoot namePage="CONTACT" />

      <main>
        <ContactRoot />
      </main>
    </>
  );
}

export default Contact;
