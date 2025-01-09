import { useEffect, useState } from "react";
import styles from "./VehicleManagement.module.css";

type Vehicle = {
  id: number;
  model: string;
  brand: string;
  vehicle_picture: string;
  type:
    | "moto"
    | "voiture";
  status:
    | "vente"
    | "essai"
    | "indisponible";
  energy:
    | "essence"
    | "diesel"
    | "electrique";
  user: string;
  location: string;
};

function VehicleManagement() {
  const [vehicles, setvehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    // Appel API ici
    const mockvehicles: Vehicle[] = [
      {
        id: 1,
        model: "Skyline r34 GT-R 1970",
        brand: "Nissan",
        vehicle_picture: "https://www.google.com/imgres?q=nissan%20skyline%20r34%201970&imgurl=https%3A%2F%2Fabcmoteur.fr%2Fwp-content%2Fuploads%2F2012%2F07%2Fskyline-c10-gtr-1970.jpg&imgrefurl=https%3A%2F%2Fabcmoteur.fr%2Fdivertissement%2Fpremiere-nissan-skyline-gt-r-1970-ca-chante%2F&docid=xtKzfF0marxDNM&tbnid=fKKzvjYxjiB2DM&vet=12ahUKEwi6soWaxuiKAxWeQ6QEHbT6B_4QM3oFCIIBEAA..i&w=1000&h=519&hcb=2&ved=2ahUKEwi6soWaxuiKAxWeQ6QEHbT6B_4QM3oFCIIBEAA",
        type: "voiture",
        status: "essai",
        energy: "essence",
        user: "Sasuke-du-38",
        location: "Grenoble",
      },
      {
        id: 2,
        model: "8 - XR750 1970",
        brand: "Harley Davidson",
        vehicle_picture: "https://cdn.shopify.com/s/files/1/0059/3379/3362/files/harley-davidson-xr750.webp?v=1715107648",
        type: "moto",
        status: "vente",
        energy: "essence",
        user: "Johnny l'Hallyday",
        location: "Marseille",
      },
    ];
    setvehicles(mockvehicles);
  }, []);

  function handleEditVehicle(id: number) {
    // Logique pour éditer un véhicule
    alert(`Édition de l'événement ${id}`);
  }

  function handleDeleteVehicle(id: number) {
    // Logique pour supprimer un véhicule
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce véhicule ?")) {
        setvehicles(vehicles.filter((Vehicle) => Vehicle.id !== id));
    }
  }

  return (
    <div className={styles.vehicleManagementContainer}>
      <h2>Gestion des véhicules</h2>
      <table className={styles.tableContainer}>
        <thead>
          <tr>
            <th className={styles.tableContainer}>ID</th>
            <th className={styles.tableContainer}>Model</th>
            <th className={styles.tableContainer}>Marque</th>
            <th className={styles.tableContainer}>Type</th>
            <th className={styles.tableContainer}>Propriétaire</th>
            <th className={styles.tableContainer}>localisation</th>
            <th className={styles.tableContainer}> </th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((Vehicle) => (
            <tr key={Vehicle.id}>
              <td>{Vehicle.id}</td>
              <td>{Vehicle.model}</td>
              <td>{Vehicle.brand}</td>
              <td>{Vehicle.type}</td>
              <td>{Vehicle.user}</td>
              <td>{Vehicle.location}</td>
              <td>
                <button
                  type="button"
                  onClick={() => {
                    handleEditVehicle(Vehicle.id);
                  }}
                >
                  Modifier
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleDeleteVehicle(Vehicle.id);
                  }}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VehicleManagement;