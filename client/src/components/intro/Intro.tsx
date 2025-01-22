import "./Intro.css";
import home1 from "../../assets/matiere/intro.jpg";

function Intro() {
  return (
    <>
      <div className="intro-container">
        <div className="prezContainer">
          <p>
            RoadAddict est un service de mise en relation entre propriétaires et
            fans de véhicules. L’objectif est simple : permettre à chacun de
            découvrir et vivre sa passion. Nous sommes nous aussi des fans de
            mécanique et souhaitions pouvoir essayer de nouvelles voitures, sans
            avoir à les acheter. Nous avons quelques fois contacté des vendeurs
            de véhicule sur internet pour leur demander des essais, mais la
            perte de temps pour le vendeur si nous n’étions finalement pas
            acheteur nous dérangé. En effet, pas de rétribution prévue et un
            espoir non réel qui s’évapore. C’est pourquoi nous avons voulu
            permettre à tous de gagner du temps, de la franchise et de l’argent
            non dépensés (tout en gagnant des crédits à échanger, qui sait,
            peut-être nous réservons vous des surprises à l’avenir avec ces
            crédits ?!). Le site est en BETA, n’hésitez pas à nous contacter via
            : ….@.... pour nous remonter vos remarques, suggestions et idées
            d’améliorations !
          </p>
          <img className="imgIntro" src={home1} alt="" />
        </div>
      </div>
    </>
  );
}

export default Intro;
