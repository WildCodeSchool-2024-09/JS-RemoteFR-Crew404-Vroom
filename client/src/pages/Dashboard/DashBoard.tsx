import Advert from "./Advert/Advert";
import styles from "./Dashboard.module.css";
import Event from "./Event/Event";
import Points from "./Points/Points";
import Vehicule from "./Vehicule/Vehicule";

function Dashboard() {
  return (
    <div className={styles.dashboardContainer}>
      <Points />
      <Event />
      <Vehicule />
      <Advert />
    </div>
  );
}

export default Dashboard;
