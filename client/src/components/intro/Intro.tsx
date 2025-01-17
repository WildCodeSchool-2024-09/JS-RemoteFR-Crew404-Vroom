import "./Intro.css";
import maps from "../../assets/images/maps.jpg";
import mus from "../../assets/images/mus.jpg";

function Intro() {
  return (
    <>
      <div className="intro-container">
        <div className="prezContainer">
          <p>
            Découvrez facilement des voitures, motos et événements près de chez
            vous. Que vous cherchiez à acheter un nouveau véhicule ou à
            participer à des événements automobiles passionnants, nous vous
            offrons une plateforme intuitive pour tout trouver en un seul
            endroit.
          </p>
          <img className="imgIntro" src={maps} alt="" />
        </div>

        <div className="prezContainertwo">
          <p>
            Participez activement à notre communauté en proposant vos véhicules
            à l'essai. Gagnez des points et profitez d'avantages exclusifs en
            partageant votre passion pour l'automobile. Plus vous proposez
            d'essais, plus vous accumulez de points pour des récompenses uniques
            !.
          </p>
          <img className="imgIntro" src={mus} alt="" />
        </div>
      </div>
    </>
  );
}

export default Intro;
