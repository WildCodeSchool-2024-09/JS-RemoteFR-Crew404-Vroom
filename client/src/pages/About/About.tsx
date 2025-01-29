import aboutCar from "../../assets/matiere/about1.jpg";
import aboutCarGathering from "../../assets/matiere/about2.jpg";
import NavRoot from "../../components/NavRoot/NavRoot";
import styles from "./About.module.css";

function About() {
  return (
    <>
      <NavRoot namePage="À PROPOS" />
      <div>
        <div className={styles.backgroundAbout}>
          <img src={aboutCar} alt="Créateur." className={styles.aboutCar} />
          <p className={styles.pAbout}>
            Le principe : À la suite de votre inscription sur RoadAddict, vous
            allez pouvoir compléter votre profil. Deux grands groupes vont alors
            s’offrir à vous : Addictos : vous allez chercher à découvrir et
            essayer de nouveaux véhicules. Vous êtes quelqu’un de curieux et
            avez envie de découvrir des véhicules sans les acheter. Vous allez
            avoir l’opportunité de discuter avec les propriétaires des véhicules
            qui vous intéressent et d’ainsi toucher du doigt de nouveaux
            horizons. Addictors : votre rôle est de permettre aux Addictos de
            partager avec vous un moment autour d’un véhicule à essayer. Votre
            objectif est de motiver les Addictos à comprendre et rejoindre votre
            passion. L’intérêt pour vous est de répandre la bonne parole autour
            de votre véhicule et de gagner des AddictCoins vous permettant à
            votre tour de faire des essais. A quoi servent les AddictCoins (AC)
            : À la suite de votre inscription, vous allez recevoir des crédits
            (AC). Ces AC peuvent être utilisés pour essayer des véhicules. La
            totalité des AC utilisés pour un essai par un Addictos reviennent à
            l’Addictors une fois l’essai confirmé par les deux parties. En cas
            de litige, 50% des crédits seront prélevés à l’Addictos et le
            compteur de litige sera augmenté sur le profil de l’Addictos.
            L’Addictors ne touchera pas de crédit suite à ce litige. Vous
            l’aurez compris, votre réputation est importante ! Comment obtenir
            des AddictCoins : Lors de l’inscription, une certaine quantité d’AC
            vous sera versé. Addictors : proposez à l’essai votre véhicule et
            organisez des rencontres avec les Addictos pour gonfler votre
            crédit. Addictos : lorsque vous invitez des personnes à rejoindre la
            communauté, vous recevrez 10AC. Si votre ami rejoint ensuite la
            communauté, hop, 10 AC supplémentaires. Enfin, si votre ami réalise
            un essai, 30AC supplémentaires vous seront reversés. Quels sont les
            avantages à faire partie de la communauté des RoadAddict ? Tester
            des véhicules rare, spécifiques, exclusifs et atypiques sans avoir à
            faire semblant d’être intéressé par une annonce de vente sur un
            budget trop important ou n’ayant pas les spécificités que vous
            recherchez. Partager avec les autres votre passion et apprendre à
            connaitre la passion des Addictors. Rencontrer d’autres passionnés.
            Economiser de l’argent et du temps. En effet, essayer au préalable
            un véhicule proche de chez vous, vous permettra de ne pas perdre de
            temps à aller voir la seule annonce à l’autre bout du pays qui
            réponde à votre recherche. Vous permettre de mieux connaitre les
            modèles et d’apprendre à détecter les éventuels problèmes sur un
            véhicule que vous souhaiteriez ensuite acheter.
          </p>
          <img
            src={aboutCarGathering}
            alt="Rassemblement de véhicules exclusifs."
            className={styles.aboutCarGathering}
          />
        </div>
      </div>
    </>
  );
}

export default About;
