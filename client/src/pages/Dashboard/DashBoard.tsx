import DashboardRoot from "../../components/Dashboard/DashboardRoot";
import NavRoot from "../../components/NavRoot/NavRoot";

function Dashboard() {
  return (
    <>
      <NavRoot namePage="Tableau de bord" />

      <main>
        <DashboardRoot />
      </main>

      <footer />
    </>
  );
}

export default Dashboard;
