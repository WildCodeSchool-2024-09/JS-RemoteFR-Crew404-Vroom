import { useEffect, useRef, useState } from "react";
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";
import ExportCSV from "../ExportCSV/ExportCSV";
import styles from "./UserManagement.module.css";

type User = {
  id: number;
  profile_picture: string | null;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  phone_number: string;
  birthday: string;
  sold: number;
};

type SortOrder = "none" | "asc" | "desc";

function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("none");
  const [isTableExpanded, setIsTableExpanded] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    // Futur appel API ici
    const users: User[] = [
      {
        id: 1,
        profile_picture:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb2y-6Ul5enAPZ-iVCVQcdivNjxvqa5bfobg&s",
        username: "Aldup",
        firstname: "Alice",
        lastname: "Dupont",
        birthday: "01-01-01",
        email: "alice@example.com",
        phone_number: "+33607080910",
        sold: 403,
      },
      {
        id: 2,
        profile_picture: "https://gallerix.fr/gallery/4/5/9/2/36740-800.jpg",
        username: "The B",
        firstname: "Bob",
        lastname: "Martin",
        birthday: "01-01-01",
        email: "bob@example.com",
        phone_number: "+33607080911",
        sold: 404,
      },
    ];
    setUsers(users);
    setFilteredUsers(users);
  }, []);

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

  const updateUser = () => {
    if (currentUser) {
      const updatedUsers = users.map((user) =>
        user.id === currentUser.id ? currentUser : user,
      );
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
    }
    setIsModalOpen(false);
    setCurrentUser(null);
  };

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

  // Fonction pour uploader une image
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPreviewImage(reader.result);
          if (currentUser) {
            setCurrentUser({
              ...currentUser,
              profile_picture: reader.result,
            });
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  //supression de l'image
  const handleImageDelete = () => {
    const confirmMessage = "Êtes-vous sûr de vouloir supprimer cette image ?";

    if (window.confirm(confirmMessage)) {
      if (currentUser) {
        setCurrentUser({
          ...currentUser,
          profile_picture: null,
        });
        setPreviewImage(null);
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
        <ExportCSV data={filteredUsers} fileName="data_utilisateurs.csv" />
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
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className={styles.input}
                />
                {(previewImage || currentUser.profile_picture) && (
                  <div className={styles.imageContainer}>
                    <img
                      src={previewImage || currentUser.profile_picture || ""}
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
                  type="number"
                  value={currentUser.phone_number}
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
                  value={currentUser.birthday}
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser, birthday: e.target.value })
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
