import AboutRoot from "../../components/AboutRoot/AboutRoot";
import NavRoot from "../../components/NavRoot/NavRoot";

function About() {
  return (
    <>
      <NavRoot namePage="À PROPOS" />
      <main className="MainAbout">
        <AboutRoot />
      </main>

      <footer />
    </>
  );
}

export default About;
