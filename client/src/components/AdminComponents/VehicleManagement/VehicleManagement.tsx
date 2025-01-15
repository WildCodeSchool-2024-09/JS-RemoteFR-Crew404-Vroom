import { useEffect, useState } from "react";
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";
import styles from "./VehicleManagement.module.css";

type Vehicle = {
  id: number;
  model: string;
  brand: string;
  vehicle_picture: string;
  type: "moto" | "voiture";
  status: "vente" | "essai" | "indisponible";
  energy: "essence" | "diesel" | "electrique";
  user: string;
  location: string;
};

function VehicleManagement() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<Event["type"] | "">("");
  const [isTableExpanded, setIsTableExpanded] = useState(false);

  useEffect(() => {
    // Appel API ici
    const mockvehicles: Vehicle[] = [
      {
        id: 1,
        model: "Skyline r34 GT-R 1970",
        brand: "Nissan",
        vehicle_picture:
          "https://www.google.com/imgres?q=nissan%20skyline%20r34%201970&imgurl=https%3A%2F%2Fabcmoteur.fr%2Fwp-content%2Fuploads%2F2012%2F07%2Fskyline-c10-gtr-1970.jpg&imgrefurl=https%3A%2F%2Fabcmoteur.fr%2Fdivertissement%2Fpremiere-nissan-skyline-gt-r-1970-ca-chante%2F&docid=xtKzfF0marxDNM&tbnid=fKKzvjYxjiB2DM&vet=12ahUKEwi6soWaxuiKAxWeQ6QEHbT6B_4QM3oFCIIBEAA..i&w=1000&h=519&hcb=2&ved=2ahUKEwi6soWaxuiKAxWeQ6QEHbT6B_4QM3oFCIIBEAA",
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
        vehicle_picture:
          "https://cdn.shopify.com/s/files/1/0059/3379/3362/files/harley-davidson-xr750.webp?v=1715107648",
        type: "moto",
        status: "vente",
        energy: "essence",
        user: "Johnny l'Hallyday",
        location: "Marseille",
      },
    ];
    setVehicles(mockvehicles);
    setFilteredVehicles(mockvehicles);
  }, []);

  // Fonction pour l'expension du tableau
  function toggleTableExpansion() {
    setIsTableExpanded(!isTableExpanded);
  }

  // Fonction pour la barre de recherche
  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    const filtered = vehicles.filter(
      (vehicle) =>
        vehicle.model.toLowerCase().includes(searchTerm) ||
        vehicle.brand.toLowerCase().includes(searchTerm) ||
        vehicle.location.toLowerCase().includes(searchTerm) ||
        vehicle.user.toLowerCase().includes(searchTerm),
    );
    setFilteredVehicles(filtered);
  }

  // Fonction pour trier les événements par type
  function handleFilterChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const newFilterType = event.target.value as Event["type"] | "";
    setFilterType(newFilterType);

    if (newFilterType === "" || newFilterType === "type") {
      setFilteredVehicles(vehicles);
    } else {
      const filtered = vehicles.filter(
        (vehicle) => vehicle.type === newFilterType,
      );
      setFilteredVehicles(filtered);
    }
  }

  // Fonction pour réinitialiser la recherche
  function handleResetSearch() {
    setSearchTerm("");
    setFilterType("");
    setFilteredVehicles(vehicles);
  }

  function handleEditVehicle(id: number) {
    // Logique pour éditer un véhicule
    alert(`Édition de l'événement ${id}`);
  }

  function handleDeleteVehicle(id: number) {
    // Logique pour supprimer un véhicule
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce véhicule ?")) {
      const updatedVehicles = vehicles.filter((vehicle) => vehicle.id !== id);
      setVehicles(updatedVehicles);
      setFilteredVehicles(updatedVehicles);
    }
  }

  // Calcule le nombre total d'événements filtrés
  const totalVehicles = filteredVehicles.length;

  return (
    <div className={styles.vehicleManagementContainer}>
      <h2>Gestion des véhicules</h2>

      <div className={styles.tableHeader}>
        <p className={styles.eventCounter}>Total : {totalVehicles}</p>
        <button
          type="button"
          onClick={toggleTableExpansion}
          className={styles.expandButton}
        >
          {isTableExpanded ? <SlArrowUp /> : <SlArrowDown />}
        </button>
      </div>

      {isTableExpanded && (
        <>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={handleSearch}
              className={styles.searchBar}
            />
            {searchTerm && ( // Le bouton n'apparaît que si un terme de recherche existe
              <button
                type="button"
                onClick={handleResetSearch}
                className={styles.resetButton}
              >
                ↩ Réinitialiser
              </button>
            )}
            <select
              name="typeVehicle"
              className={styles.selectButton}
              value={filterType}
              onChange={handleFilterChange}
            >
              <option value="type">Type</option>
              <option value="moto">Moto</option>
              <option value="voiture">Voiture</option>
            </select>
          </div>
          <table className={styles.tableContainer}>
            <thead>
              <tr>
                <th className={styles.tableContainer}>Model</th>
                <th className={styles.tableContainer}>Marque</th>
                <th className={styles.tableContainer}>Type</th>
                <th className={styles.tableContainer}>Propriétaire</th>
                <th className={styles.tableContainer}>localisation</th>
                <th className={styles.tableContainer}> </th>
              </tr>
            </thead>
            <tbody>
              {filteredVehicles.map((Vehicle) => (
                <tr key={Vehicle.id}>
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
        </>
      )}
    </div>
  );
}

export default VehicleManagement;
