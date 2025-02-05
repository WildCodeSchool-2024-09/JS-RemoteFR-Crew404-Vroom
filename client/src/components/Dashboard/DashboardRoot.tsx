import "./DashboardRoot.css";

/* Impot des composants */
import Advert from "../../pages/Dashboard/Advert/Advert";
import Event from "../../pages/Dashboard/Event/Event";
import Points from "../../pages/Dashboard/Points/Points";
import Vehicule from "../../pages/Dashboard/Vehicule/Vehicule";

function DashboardRoot() {
  return (
    <>
      <Advert />
      <Event />
      <Points />
      <Vehicule />
    </>
  );
}

export default DashboardRoot;
