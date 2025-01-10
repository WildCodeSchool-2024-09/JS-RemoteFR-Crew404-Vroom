import { useEffect, useState } from "react";
import styles from "./UserManagement.module.css";

type User = {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  phone_number: number;
  birthday: string;
  sold: number;
};

type SortOrder = "none" | "asc" | "desc";

function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("none");

  useEffect(() => {
    // Futur appel API ici
    const users: User[] = [
      {
        id: 1,
        username: "Aldup",
        firstname: "Alice",
        lastname: "Dupont",
        birthday: "01-01-01",
        email: "alice@example.com",
        phone_number: +33607080910,
        sold: 403,
      },
      {
        id: 2,
        username: "The B",
        firstname: "Bob",
        lastname: "Martin",
        birthday: "01-01-01",
        email: "bob@example.com",
        phone_number: +33607080911,
        sold: 404,
      },
    ];
    setUsers(users);
    setFilteredUsers(users);
  }, []);

  // Fonction pour la barre de recherche
  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    const filtered = users.filter(
      (user) =>
        user.username.toLowerCase().includes(searchTerm) ||
        user.firstname.toLowerCase().includes(searchTerm) ||
        user.lastname.toLowerCase().includes(searchTerm),
    );
    setFilteredUsers(filtered);
  }

  // Fonction pour trier le sold par ordre croissant ou décroissant
  function handleSort() {
    let newSortOrder: SortOrder;
    switch (sortOrder) {
      case "none":
        newSortOrder = "asc";
        break;
      case "asc":
        newSortOrder = "desc";
        break;
      case "desc":
        newSortOrder = "none";
        break;
    }
    setSortOrder(newSortOrder);

    const sorted = [...filteredUsers];
    if (newSortOrder === "asc") {
      sorted.sort((a, b) => a.sold - b.sold);
    } else if (newSortOrder === "desc") {
      sorted.sort((a, b) => b.sold - a.sold);
    }
    setFilteredUsers(sorted);
  }

  // Fonction pour réinitialiser la recherche
  function handleResetSearch() {
    setSearchTerm("");
    setFilteredUsers(users);
    setSortOrder("none");
  }

  function handleEditUser(id: number) {
    // Logique pour éditer un utilisateur
    alert(`Édition de l'utilisateur ${id}`);
  }

  function handleDeleteUser(id: number) {
    // Logique pour supprimer un utilisateur
    if (
      window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")
    ) {
      const updatedUsers = users.filter((user) => user.id !== id);
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
    }
  }

  return (
    <div className={styles.userManagementContainer}>
      <h2>Gestion des utilisateurs</h2>
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
        <button
          type="button"
          onClick={handleSort}
          className={styles.sortButton}
        >
          Trier par solde{" "}
          {sortOrder === "none"
            ? "❌"
            : sortOrder === "asc"
              ? "(Croissant)"
              : "(Décroissant)"}
        </button>
      </div>
      <table className={styles.tableContainer}>
        <thead>
          <tr>
            <th className={styles.tableContainer}>Pseudo</th>
            <th className={styles.tableContainer}>Prénom</th>
            <th className={styles.tableContainer}>Nom</th>
            <th className={styles.tableContainer}>Sold</th>
            <th className={styles.tableContainer}> </th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
              <td>{user.sold}</td>
              <td>
                <button type="button" onClick={() => handleEditUser(user.id)}>
                  Modifier
                </button>
                <button type="button" onClick={() => handleDeleteUser(user.id)}>
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

export default UserManagement;
