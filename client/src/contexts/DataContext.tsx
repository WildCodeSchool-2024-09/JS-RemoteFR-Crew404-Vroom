import { createContext, useContext, useState } from "react";
import type { Eventdata } from "../types/events";
import type { User } from "../types/users";
import type { Vehicle } from "../types/vehicle";

/* Import des différents composants ou img */

/* Déclarations des types */

type childrenType = {
  children: React.ReactNode;
};

type dataType = {
  //tous les utilisateurs
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  //tous les événements
  events: Eventdata[];
  setEvents: React.Dispatch<React.SetStateAction<Eventdata[]>>;
  //utilisateur connecté
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  //tous les véhicules
  vehicles: Vehicle[];
  setVehicles: React.Dispatch<React.SetStateAction<Vehicle[]>>;
};

/* Création du context */

const DataContext = createContext<dataType | null>(null);

/* Déclaration des Value mise a disposition dans le context */

const initialUsers: User[] = [];
const initialEvents: Eventdata[] = [];
const initialVehicles: Vehicle[] = [];

/* Mise a disposition du contexte */
export function DataProvider({ children }: childrenType) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [events, setEvents] = useState<Eventdata[]>(initialEvents);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);

  return (
    <DataContext.Provider
      value={{
        users,
        setUsers,
        events,
        setEvents,
        currentUser,
        setCurrentUser,
        vehicles,
        setVehicles,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error(
      "useData doit être utilisé à l'intérieur d'un DataProvider.",
    );
  }
  return context;
};
