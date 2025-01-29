import Footer from "../../components/Footer/Footer";
import NavRoot from "../../components/NavRoot/NavRoot";
import Button from "../../components/button/Button";
import Caroussel from "../../components/caroussel/Caroussel";
import Intro from "../../components/intro/Intro";

function Home() {
  return (
    <>
      <NavRoot namePage="RoadAddict" />
      <Caroussel />
      <Button />
      <Intro />
      <main />
      <Footer />
    </>
  );
}

export default Home;
