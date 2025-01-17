import { createContext, useContext } from "react";
import { useState } from "react";

/* Import des différents composants ou img */

/* Déclarations des types */

/* Création du context */

const DataContext = createContext(null);

/* Déclaration des valeurs mise a disposition dans le context */

/* Mise a disposition du contexte */
export function DataProvider({ children }) {
  const [data, setData] = useState([]);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
}
