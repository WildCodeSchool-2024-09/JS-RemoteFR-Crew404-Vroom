import LogoVroom from "../../assets/Logos/LogoVroom.png";
import Footer from "../../components/Footer/Footer";
import Button from "../../components/button/Button";
import ButtonConnexion from "../../components/buttonconnexion/ButtonConnexion";
import Caroussel from "../../components/caroussel/Caroussel";
import Intro from "../../components/intro/Intro";
import Styles from "./Home.module.css";

function Home() {
  return (
    <>
      <img className={Styles.logo} src={LogoVroom} alt="Logo" />
      <h1 className={Styles.welcome}>BIENVENUE SUR RoadAddict</h1>
      <Caroussel />
      <Button />
      <Intro />
      <main />
      <ButtonConnexion />
      <Footer />
    </>
  );
}

export default Home;
