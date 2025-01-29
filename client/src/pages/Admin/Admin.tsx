import EventManagement from "../../components/AdminComponents/EventManagement/EventManagement";
import UserManagement from "../../components/AdminComponents/UserManagement/UserManagement";
import VehicleManagement from "../../components/AdminComponents/VehicleManagement/VehicleManagement";
import Header from "../../components/Header/Header";
import NavRoot from "../../components/NavRoot/NavRoot";

function BackofficeMain() {
  return (
    <div>
      <NavRoot namePage="Back-office" />
      <main>
        <UserManagement />
        <EventManagement />
        <VehicleManagement />
      </main>
    </div>
  );
}

export default BackofficeMain;
