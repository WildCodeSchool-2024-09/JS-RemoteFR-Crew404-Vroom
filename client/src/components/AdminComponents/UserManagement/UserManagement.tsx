import { useEffect, useRef, useState } from "react";
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";
import { useData } from "../../../contexts/DataContext";
import api from "../../../helpers/api";
import type { User } from "../../../types/users";
import ExportCSV from "../ExportCSV/ExportCSV";
import styles from "./UserManagement.module.css";

type SortOrder = "none" | "asc" | "desc";

function UserManagement() {
  const { users, setUsers } = useData();
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("none");
  const [isTableExpanded, setIsTableExpanded] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    // Futur appel API ici
    const fetchUsers = async () => {
      try {
        const response = await api.get("/api/users");
        setUsers(response.data);
        setFilteredUsers(response.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des utilisateurs:",
          error,
        );
      }
    };

    fetchUsers();
  }, [setUsers]);

  // Fonction pour l'expension du tableau
  function toggleTableExpansion() {
    setIsTableExpanded(!isTableExpanded);
  }

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

  // Gestion des modales pour éditer un événement
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  function handleEditUser(id: number) {
    // Logique pour éditer un utilisateur
    const userToEdit = users.find((user) => user.id === id);
    if (userToEdit) {
      setCurrentUser(userToEdit);
      setIsModalOpen(true);
    }
  }

  // Gestion du clic en dehors de la modale
  const handleOutsideClick = (event: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setIsModalOpen(false);
    }
  };

  const updateUser = async () => {
    if (currentUser) {
      const formatDateForMySQL = (date: Date | string): string => {
        if (date instanceof Date) {
          return date.toISOString().split("T")[0];
        }
        return new Date(date).toISOString().split("T")[0];
      };

      try {
        const formData = new FormData();
        for (const [key, value] of Object.entries(currentUser)) {
          if (key === "birthdate" && value) {
            formData.append(key, formatDateForMySQL(value as Date | string));
          } else if (value !== null && value !== undefined) {
            formData.append(key, value.toString());
          }
        }

        if (file) {
          formData.append("profile_picture", file);
        }

        const response = await api.put(
          `/api/users/${currentUser.id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          },
        );

        const updatedUsers = users.map((user) =>
          user.id === currentUser.id ? response.data : user,
        );
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers);
        setIsModalOpen(false);
        setCurrentUser(null);
        setFile(null);
        setPreviewImage(null);
      } catch (error) {
        console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
      }
    }
  };

  function handleDeleteUser(id: number) {
    // Logique pour supprimer un utilisateur
    if (
      window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")
    ) {
      api
        .delete(`/api/users/${id}`)
        .then(() => {
          const updatedUsers = users.filter((user) => user.id !== id);
          setUsers(updatedUsers);
          setFilteredUsers(updatedUsers);
        })
        .catch((error) => {
          console.error(
            "Erreur lors de la suppression de l'utilisateur :",
            error,
          );
        });
    }
  }

  //supression de l'image
  const handleImageDelete = async () => {
    if (currentUser) {
      const confirmMessage = "Êtes-vous sûr de vouloir supprimer cette image ?";

      if (window.confirm(confirmMessage)) {
        try {
          // Appel API pour supprimer l'image
          await api.delete(`/api/users/${currentUser.id}/profile-picture`, {
            withCredentials: true,
          });

          // Mettre à jour l'utilisateur avec l'image par défaut
          setCurrentUser({
            ...currentUser,
            profile_picture: "cancel-img.png",
          });

          // Mettre à jour la liste des utilisateurs
          const updatedUsers = users.map((user) =>
            user.id === currentUser.id
              ? { ...user, profile_picture: "cancel-img.png" }
              : user,
          );
          setUsers(updatedUsers);
          setFilteredUsers(updatedUsers);
        } catch (error) {
          console.error("Erreur lors de la suppression de l'image :", error);
        }
      }
    }
  };

  // Calcule le nombre total d'événements filtrés
  const totalUsers = filteredUsers.length;

  return (
    <div className={styles.userManagementContainer}>
      <h2>Gestion des utilisateurs</h2>

      <div className={styles.tableHeader}>
        <p className={styles.eventCounter}>Total : {totalUsers}</p>
        <ExportCSV
          data={filteredUsers.map((user) => ({
            ...user,
            birthdate:
              user.birthdate instanceof Date
                ? user.birthdate.toISOString()
                : user.birthdate,
          }))}
          fileName="data_utilisateurs.csv"
        />
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
            <button
              type="button"
              onClick={handleSort}
              className={styles.sortButton}
            >
              Par solde{" "}
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
                    <button
                      type="button"
                      onClick={() => handleEditUser(user.id)}
                    >
                      Modifier
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteUser(user.id)}
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
      {isModalOpen && (
        <div
          className={styles.modalOverlay}
          onClick={handleOutsideClick}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setIsModalOpen(false);
            }
          }}
          tabIndex={-1}
        >
          <div className={styles.modalContent} ref={modalRef}>
            <h3>Modifier l'utilisateur</h3>
            {currentUser && (
              <>
                {currentUser.profile_picture && (
                  <div className={styles.imageContainer}>
                    <img
                      src={`${import.meta.env.VITE_API_URL}/uploads/${currentUser.profile_picture}`}
                      alt="Avatar utilisateur"
                      className={styles.previewImage}
                      onClick={handleImageDelete}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleImageDelete();
                      }}
                    />
                  </div>
                )}
                {previewImage && (
                  <div className={styles.imageContainer}>
                    <img
                      src={previewImage}
                      alt="Avatar utilisateur"
                      className={styles.previewImage}
                      onClick={handleImageDelete}
                      onKeyDown={(e) => {
                        if (e.key === "Escape") {
                          setIsModalOpen(false);
                        }
                      }}
                      tabIndex={-1}
                    />
                  </div>
                )}
                <input
                  type="text"
                  value={currentUser.username}
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser, username: e.target.value })
                  }
                  className={styles.input}
                />
                <input
                  type="text"
                  value={currentUser.firstname}
                  onChange={(e) =>
                    setCurrentUser({
                      ...currentUser,
                      firstname: e.target.value,
                    })
                  }
                  className={styles.input}
                />
                <input
                  type="text"
                  value={currentUser.lastname}
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser, lastname: e.target.value })
                  }
                  className={styles.input}
                />
                <input
                  type="email"
                  value={currentUser.email}
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser, email: e.target.value })
                  }
                  className={styles.input}
                />
                <input
                  type="text"
                  value={currentUser.phone_number || "+33"}
                  onChange={(e) =>
                    setCurrentUser({
                      ...currentUser,
                      phone_number: e.target.value,
                    })
                  }
                  className={styles.input}
                />
                <input
                  type="date"
                  value={
                    currentUser?.birthdate
                      ? new Date(currentUser.birthdate)
                          .toISOString()
                          .split("T")[0]
                      : ""
                  }
                  onChange={(e) =>
                    setCurrentUser({
                      ...currentUser,
                      birthdate: e.target.value,
                    })
                  }
                  className={styles.input}
                />
                <input
                  type="number"
                  value={currentUser.sold}
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser, sold: +e.target.value })
                  }
                  className={styles.input}
                />
                <div className={styles.modalButtons}>
                  <button
                    type="button"
                    onClick={updateUser}
                    className={styles.largeButton}
                  >
                    Modifier
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className={styles.smallButton}
                  >
                    Annuler
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserManagement;
