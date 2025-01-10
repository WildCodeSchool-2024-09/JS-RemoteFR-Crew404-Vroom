import EventManagement from "../../components/AdminComponents/EventManagement/EventManagement";
import UserManagement from "../../components/AdminComponents/UserManagement/UserManagement";
import VehicleManagement from "../../components/AdminComponents/VehicleManagement/VehicleManagement";
import styles from "./Admin.module.css";

function BackofficeMain() {
  return (
    <div>
      <h1>Tableau de bord administrateur</h1>
      <nav className={styles.backofficeNavContainer}>
        <ul>
          <li>
            <a href="#users">Utilisateurs</a>
          </li>
          <li>
            <a href="#events">Événements</a>
          </li>
          <li>
            <a href="#vehicles">Véhicules</a>
          </li>
        </ul>
      </nav>
      <main>
        <UserManagement />
        <EventManagement />
        <VehicleManagement />
      </main>
    </div>
  );
}

export default BackofficeMain;
