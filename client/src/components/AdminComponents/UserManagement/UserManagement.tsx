import { useState, useEffect } from 'react';
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

function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  
    useEffect(() => {
      // Appel API ici
  const users: User[] = [
    {
      id: 1,
      username: "Aldup",
      firstname: "Alice",
      lastname: "Dupont",
      birthday: "01-01-01",
      email: "alice@example.com",
      phone_number: +33607080910,
      sold: 404,
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
}, []);

function handleEditUser(id: number) {
  // Logique pour éditer un utilisateur
  alert(`Édition de l'utilisateur ${id}`);
}

function handleDeleteUser(id: number) {
  // Logique pour supprimer un utilisateur
  if (window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
    setUsers(users.filter((user) => user.id !== id));
  }
}

  return (
    <div className={styles.userManagementContainer}>
      <h2>Gestion des utilisateurs</h2>
      <table className={styles.tableContainer}>
        <thead >
          <tr>
            <th className={styles.tableContainer}>ID</th>
            <th className={styles.tableContainer}>Pseudo</th>
            <th className={styles.tableContainer}>Prénom</th>
            <th className={styles.tableContainer}>Nom</th>
            <th className={styles.tableContainer}>Date de naissance</th>
            <th className={styles.tableContainer}>Email</th>
            <th className={styles.tableContainer}>Téléphone</th>
            <th className={styles.tableContainer}>Sold</th>
            <th className={styles.tableContainer}> </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
              <td>{user.birthday}</td>
              <td>{user.email}</td>
              <td>{user.phone_number}</td>
              <td>{user.sold}</td>
              <td>
                <button
                  type="button"
                  onClick={() => {
                    handleEditUser(user.id);
                  }}
                >
                  Modifier
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleDeleteUser(user.id);
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

export default UserManagement;
