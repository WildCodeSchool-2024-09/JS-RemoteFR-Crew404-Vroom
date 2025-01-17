import Header from "../../components/Header/Header";
import EventManagement from "../../components/AdminComponents/EventManagement/EventManagement";
import UserManagement from "../../components/AdminComponents/UserManagement/UserManagement";
import VehicleManagement from "../../components/AdminComponents/VehicleManagement/VehicleManagement";

function BackofficeMain() {
  return (
    <div>
      <Header title="BACK-OFFICE" />
      <main>
        <UserManagement />
        <EventManagement />
        <VehicleManagement />
      </main>
    </div>
  );
}

export default BackofficeMain;
