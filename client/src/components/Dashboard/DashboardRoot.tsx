import "./DashboardRoot.css";

/* Impot des composants */
import Advert from "../../pages/Dashboard/Advert/Advert";
import Event from "../../pages/Dashboard/Event/Event";
import Points from "../../pages/Dashboard/Points/Points";
import Vehicule from "../../pages/Dashboard/Vehicule/Vehicle";

function DashboardRoot() {
  return (
    <>
      <Points />
      <Event />
      <Vehicule />
      <Advert />
    </>
  );
}

export default DashboardRoot;
