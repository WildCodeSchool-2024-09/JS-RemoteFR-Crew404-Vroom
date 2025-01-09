import { useState, useEffect } from 'react';
import styles from "./EventManagement.module.css";

type Event = {
  id: number;
  title: string;
  type: 'salon' | 'course' | 'musée' | 'vente aux enchères' | 'roadtrip' | 'rassemblement';
  date: string;
  address: string;
  description: string;
  link: string | null;
};

function EventManagement() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    // Appel API ici
    const mockEvents: Event[] = [
      {
        id: 1,
        title: "Salon Auto Rétro",
        type: "salon",
        date: "2025-06-15",
        address: "123 Rue de l'Exposition, Paris",
        description: "Grand salon des véhicules de collection",
        link: "https://salonautoretro.fr"
      },
      {
        id: 2,
        title: "En route les BG",
        type: "roadtrip",
        date: "2025-03-10",
        address: "123 Rue de la plage, Deauville",
        description: "On débarque en Normandie",
        link: "https://www.facebook.com/ffveofficiel/?locale=fr_FR"
      },
    ];
    setEvents(mockEvents);
  }, []);

  function handleEditEvent(id: number) {
    // Logique pour éditer un événement
    alert(`Édition de l'événement ${id}`);
  }

  function handleDeleteEvent(id: number) {
    // Logique pour supprimer un événement
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet événement ?")) {
      setEvents(events.filter((event) => event.id !== id));
    }
  }

  return (
    <div className={styles.eventManagementContainer}>
      <h2>Gestion des Événements</h2>
      <table className={styles.tableContainer}>
        <thead>
          <tr>
            <th className={styles.tableContainer}>ID</th>
            <th className={styles.tableContainer}>Titre</th>
            <th className={styles.tableContainer}>Type</th>
            <th className={styles.tableContainer}>Date</th>
            <th className={styles.tableContainer}>Adresse</th>
            <th className={styles.tableContainer}> </th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
              <tr key={event.id}>
                <td>{event.id}</td>
                <td>{event.title}</td>
                <td>{event.type}</td>
                <td>{event.date}</td>
                <td>{event.address}</td>
                <td>
                  <button type='button' onClick={() => { handleEditEvent(event.id); }}>Modifier</button>
                  <button type='button' onClick={() => { handleDeleteEvent(event.id); }}>Supprimer</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default EventManagement;