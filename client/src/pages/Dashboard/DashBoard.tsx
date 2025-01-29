import NavRoot from "../../components/NavRoot/NavRoot";
import Advert from "./Advert/Advert";
import Event from "./Event/Event";
import Points from "./Points/Points";
import Vehicule from "./Vehicule/Vehicule";

function Dashboard() {
  return (
    <>
      <NavRoot namePage="Tableau de bord" />
      <Points />
      <Event />
      <Vehicule />
      <Advert />
    </>
  );
}

export default Dashboard;
