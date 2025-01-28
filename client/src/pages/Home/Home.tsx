// import LogoVroom from "../../assets/Logos/LogoVroom.png";
import Footer from "../../components/Footer/Footer";
// import Styles from "./Home.module.css";
import NavRoot from "../../components/NavRoot/NavRoot";
import Button from "../../components/button/Button";
import Caroussel from "../../components/caroussel/Caroussel";
import Intro from "../../components/intro/Intro";

function Home() {
  return (
    <>
      <NavRoot namePage="RoadAddict" />
      {/* <img className={Styles.logo} src={LogoVroom} alt="Logo" />
      <h1 className={Styles.welcome}>BIENVENUE SUR RoadAddict</h1> */}
      <Caroussel />
      <Button />
      <Intro />
      <main />
      <Footer />
    </>
  );
}

export default Home;
