import { createContext, useContext } from "react";
import { useState } from "react";

/* Création du context */

const DataContext = createContext<dataType | null>(null);

/* Import des différents composants ou img */

/* Déclarations des types */

export type Eventdata = {
  id: number;
  title: string;
  event_picture?: string | null;
  type:
    | "type"
    | "salon"
    | "course"
    | "musée"
    | "vente aux enchères"
    | "roadtrip"
    | "rassemblement"
    | "autre";
  date_start: string | Date;
  date_end: string | Date;
  location: {
    x: number;
    y: number;
  };
  address: string;
  description: string;
  link?: string | null;
  user_id: number;
};

type childrenType = {
  children: React.ReactNode;
};

type dataType = {
  events: Eventdata[];
  setEvents: React.Dispatch<React.SetStateAction<Eventdata[]>>;
};

/* Déclaration des Value mise a disposition dans le context */

const initialEvents: Eventdata[] = [];

/* Mise a disposition du contexte */
export function DataProvider({ children }: childrenType) {
  const [events, setEvents] = useState<Eventdata[]>(initialEvents);

  return (
    <DataContext.Provider value={{ events, setEvents }}>
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
