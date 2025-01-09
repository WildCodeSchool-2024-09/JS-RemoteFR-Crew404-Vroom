import EventManagement from "../../components/AdminComponents/EventManagement/EventManagement";
import StatisticsComponent from "../../components/AdminComponents/Statistic/Statistic";
import UserManagement from "../../components/AdminComponents/UserManagement/UserManagement";
import VehicleManagement from "../../components/AdminComponents/VehicleManagement/VehicleManagement"
import styles from "./Admin.module.css";

function BackofficeMain() {
  return (
    <div className={styles.backofficeContainer}>
      <h1>Tableau de bord administrateur</h1>
      <nav>
        <ul>
          <li>
            <a href="#stats">Statistiques</a>
          </li>
          <li>
            <a href="#users">Gestion des utilisateurs</a>
          </li>
          <li>
            <a href="#events">Gestion des événements</a>
          </li>
          <li>
            <a href="#vehicles">Gestion des véhicules</a>
          </li>
        </ul>
      </nav>
      <main>
        <StatisticsComponent />
        <UserManagement />
        <EventManagement />
        <VehicleManagement />
      </main>
    </div>
  );
}

export default BackofficeMain;
