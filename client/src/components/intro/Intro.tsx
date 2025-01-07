import "./Intro.css";
import maps from "../../assets/images/maps.jpg";
import mus from "../../assets/images/mus.jpg";
const Intro = () => {
  return (
    <>
      <div className="intro-container">
        <div className="prezContainer">
          <p>Trouvez des voitures, motos, et évenements autour de vous .</p>
          <img className="imgIntro" src={maps} alt="" />
        </div>

        <div className="prezContainertwo">
          <p>Proposer votre vehicule à l' essai , gagnez des points.</p>
          <img className="imgIntro" src={mus} alt="" />
        </div>
      </div>
    </>
  );
};
export default Intro;
