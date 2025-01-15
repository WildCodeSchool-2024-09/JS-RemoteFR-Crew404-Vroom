import EventManagement from "../../components/AdminComponents/EventManagement/EventManagement";
import UserManagement from "../../components/AdminComponents/UserManagement/UserManagement";
import VehicleManagement from "../../components/AdminComponents/VehicleManagement/VehicleManagement";

function BackofficeMain() {
  return (
    <div>
      <h1>Tableau de bord administrateur</h1>
      <main>
        <UserManagement />
        <EventManagement />
        <VehicleManagement />
      </main>
    </div>
  );
}

export default BackofficeMain;
